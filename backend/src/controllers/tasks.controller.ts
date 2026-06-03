import { Response } from 'express';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middlewares/auth.middleware';
import { z } from 'zod';
import { TaskStatus } from '@prisma/client';

const taskSchema = z.object({
  id: z.string().min(1, 'L\'identifiant est requis (ex: TSK-001)'),
  title: z.string().min(1, 'Le titre est requis').max(200),
  description: z.string().max(2000).optional(),
  status: z.nativeEnum(TaskStatus).default(TaskStatus.A_FAIRE),
  priority: z.enum(['BASSE', 'MOYENNE', 'HAUTE', 'CRITIQUE']).default('MOYENNE'),
  plannedMonths: z.array(z.string()), // ex: ["2026-05"]
  deadline: z.string().optional().transform(str => str ? new Date(str) : null),
  projectId: z.string(),
  assigneeId: z.string().uuid(),
});

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId, assigneeId, month, status, priority } = req.query;

    const where: any = {};
    if (projectId) where.projectId = String(projectId);
    if (assigneeId) where.assigneeId = String(assigneeId);
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (month) {
      where.plannedMonths = {
        array_contains: String(month)
      };
    }

    const tasks = await prisma.task.findMany({
      where,
      include: {
        assignee: {
          select: { id: true, firstName: true, lastName: true }
        },
        project: {
          select: { id: true, name: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(tasks);
  } catch (error) {
    console.error('getTasks error:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des tâches' });
  }
};

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const validatedData = taskSchema.parse(req.body);
    const userId = req.user?.userId;

    if (!userId) return res.status(401).json({ message: 'Non authentifié' });

    // Check if project exists
    const project = await prisma.project.findUnique({
      where: { id: validatedData.projectId },
      include: { members: true }
    });

    if (!project) return res.status(404).json({ message: 'Projet introuvable' });

    // RG-01: Assignee must be a member of the project
    const isMember = project.members.some(m => m.userId === validatedData.assigneeId);
    if (!isMember) {
      return res.status(400).json({ message: 'L\'assignataire doit être membre du projet' });
    }

    const task = await prisma.task.create({
      data: {
        ...validatedData,
        createdById: userId,
      }
    });

    res.status(201).json(task);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    console.error('createTask error:', error);
    res.status(500).json({ message: 'Erreur lors de la création de la tâche' });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;
    const userRole = req.user?.role;

    const currentTask = await prisma.task.findUnique({ where: { id } });
    if (!currentTask) return res.status(404).json({ message: 'Tâche introuvable' });

    // EF-TASK-04: Collaborator can only update status of their own task
    if (userRole === 'COLLABORATOR') {
      if (currentTask.assigneeId !== userId) {
        return res.status(403).json({ message: 'Vous ne pouvez modifier que vos propres tâches' });
      }

      // If collaborator, only allow status update
      const { status, comment } = req.body;
      if (!status) return res.status(400).json({ message: 'Seul le changement de statut est autorisé pour un collaborateur' });

      // EF-TASK-05: Validation of status transitions could be added here
      // RG-03: Terminé is irreversible for Collaborator
      if (currentTask.status === TaskStatus.TERMINE) {
        return res.status(403).json({ message: 'Une tâche terminée ne peut être réouverte que par un Manager' });
      }

      return updateTaskStatus(id, userId!, currentTask.status, status as TaskStatus, comment, res);
    }

    // Manager/Admin can update everything
    const validatedData = taskSchema.partial().parse(req.body);
    const { status, ...otherData } = validatedData;

    if (status && status !== currentTask.status) {
      // Logic for status change tracking
      await prisma.$transaction([
        prisma.task.update({ where: { id }, data: validatedData as any }),
        prisma.statusChange.create({
          data: {
            taskId: id,
            fromStatus: currentTask.status,
            toStatus: status,
            changedById: userId!,
            comment: (req.body as any).comment || 'Mis à jour par un Manager'
          }
        })
      ]);
    } else {
      await prisma.task.update({ where: { id }, data: validatedData as any });
    }

    // Update project progress
    await updateProjectProgress(currentTask.projectId);

    res.json({ message: 'Tâche mise à jour' });
  } catch (error) {
    console.error('updateTask error:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la tâche' });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) return res.status(404).json({ message: 'Tâche introuvable' });

    await prisma.task.delete({ where: { id } });
    await updateProjectProgress(task.projectId);

    res.json({ message: 'Tâche supprimée' });
  } catch (error) {
    console.error('deleteTask error:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la tâche' });
  }
};

// Helpers
async function updateTaskStatus(taskId: string, userId: string, from: TaskStatus, to: TaskStatus, comment: string | undefined, res: Response) {
  await prisma.$transaction([
    prisma.task.update({ where: { id: taskId }, data: { status: to } }),
    prisma.statusChange.create({
      data: {
        taskId,
        fromStatus: from,
        toStatus: to,
        changedById: userId,
        comment: comment || 'Changement de statut par l\'assignataire'
      }
    })
  ]);

  const task = await prisma.task.findUnique({ where: { id: taskId } });
  if (task) await updateProjectProgress(task.projectId);

  return res.json({ message: 'Statut mis à jour' });
}

async function updateProjectProgress(projectId: string) {
  const totalTasks = await prisma.task.count({ where: { projectId } });
  if (totalTasks === 0) {
    await prisma.project.update({ where: { id: projectId }, data: { progress: 0 } });
    return;
  }

  const doneTasks = await prisma.task.count({ 
    where: { projectId, status: TaskStatus.TERMINE } 
  });

  const progress = (doneTasks / totalTasks) * 100;
  await prisma.project.update({ 
    where: { id: projectId }, 
    data: { progress: Math.round(progress) } 
  });
}
