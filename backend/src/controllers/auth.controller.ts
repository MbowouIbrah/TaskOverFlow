import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Mot de passe trop court')
});

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.isActive) {
      return res.status(401).json({ message: 'Identifiants incorrects ou compte inactif' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Identifiants incorrects ou compte inactif' });
    }

    // Update lastLoginAt
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() }
    });

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '8h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    console.error('Erreur lors du login:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

export const logout = (req: Request, res: Response) => {
  // En mode stateless JWT, la déconnexion se fait côté client (suppression du token).
  // Si nous utilisions des cookies httpOnly, nous l'effacerions ici.
  res.json({ message: 'Déconnexion réussie' });
};
