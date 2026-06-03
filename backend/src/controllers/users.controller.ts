import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middlewares/auth.middleware';

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: 'Non authentifié' });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        isActive: true,
        lastLoginAt: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }

    res.json(user);
  } catch (error) {
    console.error('Erreur getMe:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        isActive: true
      },
      orderBy: { firstName: 'asc' }
    });

    res.json(users);
  } catch (error) {
    console.error('Erreur getAllUsers:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

