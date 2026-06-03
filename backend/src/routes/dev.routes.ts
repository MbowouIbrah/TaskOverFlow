import { Router } from 'express';
import { emailService } from '../services/emailService';

const router = Router();

router.post('/send-invitation', async (req, res) => {
  const { email, name, customMessage, html } = req.body;

  if (!email || !name || !html) {
    return res.status(400).json({ error: 'Email, nom et contenu requis' });
  }

  try {
    await emailService.sendEmail(
      email,
      `Invitation Spéciale : Testez le portail TaskFlow`,
      html
    );

    res.json({ success: true, message: 'Invitation envoyée avec succès' });
  } catch (error: any) {
    console.error('Erreur invitation:', error);
    res.status(500).json({ error: 'Échec de l\'envoi de l\'invitation' });
  }
});

export default router;
