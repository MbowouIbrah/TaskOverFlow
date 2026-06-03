import nodemailer from 'nodemailer';

/**
 * Service d'envoi d'emails simple et sécurisé
 */
class EmailService {
  private transporter;

  constructor() {
    // Configuration du transporteur
    // On utilise les variables d'environnement pour la sécurité
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: false, // true pour le port 465, false pour les autres ports (STARTTLS)
      auth: {
        user: process.env.EMAIL_USER, // Votre adresse email
        pass: process.env.EMAIL_PASS, // Votre "Mot de passe d'application"
      },
    });
  }

  /**
   * Envoie un email générique
   */
  async sendEmail(to: string, subject: string, html: string) {
    try {
      const info = await this.transporter.sendMail({
        from: `"Trigenys Group" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
      });

      console.log('Message envoyé : %s', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email :", error);
      throw new Error("Échec de l'envoi de l'email");
    }
  }

  /**
   * Exemple : Email de notification de nouvelle tâche
   */
  async sendTaskNotification(userEmail: string, userName: string, taskTitle: string) {
    const html = `
      <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #6366f1;">Bonjour ${userName},</h2>
        <p>Une nouvelle tâche vous a été assignée dans le projet <strong>Trigenys Group</strong>.</p>
        <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0;"><strong>Tâche :</strong> ${taskTitle}</p>
        </div>
        <p>Connectez-vous à votre portail pour commencer à travailler.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="font-size: 12px; color: #999;">Ceci est un email automatique, merci de ne pas y répondre.</p>
      </div>
    `;

    return this.sendEmail(userEmail, 'Nouvelle tâche assignée', html);
  }
}

export const emailService = new EmailService();
