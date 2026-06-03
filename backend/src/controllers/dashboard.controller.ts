import { Response } from 'express';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middlewares/auth.middleware';
import { TaskStatus } from '@prisma/client';

export const getMyDashboard = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ message: 'Non authentifié' });

    // 1. All active projects for the user (member or manager)
    const activeProjects = await prisma.project.findMany({
      where: {
        OR: [
          { managerId: userId },
          { members: { some: { userId } } }
        ],
        status: { not: 'TERMINE' }
      },
      include: {
        _count: {
          select: { tasks: { where: { assigneeId: userId } } }
        }
      }
    });

    // 2. All tasks assigned to the user
    const tasks = await prisma.task.findMany({
      where: { assigneeId: userId },
      include: {
        project: { select: { name: true, id: true } }
      }
    });

    // 3. Stats for the current month
    const currentMonth = new Date().toISOString().slice(0, 7); // ex: "2026-05"
    
    const statsCurrentMonth = {
      total: tasks.filter(t => (t.plannedMonths as string[]).includes(currentMonth)).length,
      done: tasks.filter(t => (t.plannedMonths as string[]).includes(currentMonth) && t.status === TaskStatus.TERMINE).length,
      todo: tasks.filter(t => (t.plannedMonths as string[]).includes(currentMonth) && t.status === TaskStatus.A_FAIRE).length,
      inProgress: tasks.filter(t => (t.plannedMonths as string[]).includes(currentMonth) && t.status === TaskStatus.EN_COURS).length,
    };

    res.json({
      activeProjects,
      statsCurrentMonth,
      allTasks: tasks
    });
  } catch (error) {
    console.error('getMyDashboard error:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération du tableau de bord' });
  }
};
