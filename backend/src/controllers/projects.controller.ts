import { Response } from 'express';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middlewares/auth.middleware';
import { z } from 'zod';

const projectSchema = z.object({
  id: z.string().min(3, 'L\'identifiant est requis (ex: PRJ-001)'),
  name: z.string().min(1, 'Le nom est requis').max(150),
  description: z.string().max(1000).optional(),
  status: z.enum(['PLANIFIE', 'EN_COURS', 'URGENT', 'SUSPENDU', 'TERMINE']).default('PLANIFIE'),
  category: z.string().optional(),
  startDate: z.string().transform((str) => new Date(str)),
  endDate: z.string().transform((str) => new Date(str)),
  managerId: z.string().uuid(),
  teamIds: z.array(z.string().uuid()).optional(),
});

export const getProjects = async (req: AuthRequest, res: Response) => {
  try {
    const { status, category, managerId, search } = req.query;

    const where: any = {};
    if (status) where.status = status;
    if (category) where.category = category;
    if (managerId) where.managerId = managerId;
    if (search) {
      where.OR = [
        { name: { contains: String(search), mode: 'insensitive' } },
        { description: { contains: String(search), mode: 'insensitive' } },
        { id: { contains: String(search), mode: 'insensitive' } },
      ];
    }

    const projects = await prisma.project.findMany({
      where,
      include: {
        manager: {
          select: { id: true, firstName: true, lastName: true, email: true }
        },
        _count: {
          select: { tasks: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(projects);
  } catch (error) {
    console.error('getProjects error:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des projets' });
  }
};

export const getProjectById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        manager: {
          select: { id: true, firstName: true, lastName: true, email: true }
        },
        members: {
          include: {
            user: {
              select: { id: true, firstName: true, lastName: true, email: true, role: true }
            }
          }
        },
        tasks: {
          include: {
            assignee: {
              select: { id: true, firstName: true, lastName: true }
            }
          }
        }
      }
    });

    if (!project) {
      return res.status(404).json({ message: 'Projet introuvable' });
    }

    res.json(project);
  } catch (error) {
    console.error('getProjectById error:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération du projet' });
  }
};

export const createProject = async (req: AuthRequest, res: Response) => {
  try {
    const validatedData = projectSchema.parse(req.body);
    const userId = req.user?.userId;

    if (!userId) return res.status(401).json({ message: 'Non authentifié' });

    const { teamIds, ...projectData } = validatedData;

    const project = await prisma.project.create({
      data: {
        ...projectData,
        createdById: userId,
        members: {
          create: teamIds?.map(id => ({ userId: id })) || []
        }
      }
    });

    res.status(201).json(project);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    console.error('createProject error:', error);
    res.status(500).json({ message: 'Erreur lors de la création du projet' });
  }
};

export const updateProject = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = projectSchema.partial().parse(req.body);
    const { teamIds, ...projectData } = validatedData;

    // Logic to update members if teamIds is provided
    const updateData: any = { ...projectData };
    if (teamIds) {
      updateData.members = {
        deleteMany: {},
        create: teamIds.map(userId => ({ userId }))
      };
    }

    const project = await prisma.project.update({
      where: { id },
      data: updateData
    });

    res.json(project);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    console.error('updateProject error:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du projet' });
  }
};

export const deleteProject = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.project.delete({ where: { id } });
    res.json({ message: 'Projet supprimé avec succès' });
  } catch (error) {
    console.error('deleteProject error:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du projet' });
  }
};
