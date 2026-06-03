import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Eye, Edit3, CheckCircle2, AlertCircle } from 'lucide-react';

interface InvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InvitationModal({ isOpen, onClose }: InvitationModalProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [customMessage, setCustomMessage] = useState('');

  const defaultPassword = 'Trigenys2026!';
  
  const generateEmailContent = () => {
    return `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        <div style="background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; letter-spacing: -0.025em; text-transform: uppercase;">TaskFlow</h1>
          <p style="color: rgba(255, 255, 255, 0.8); margin-top: 8px; font-size: 16px;">Pilotage Stratégique Trigenys Group</p>
        </div>
        
        <div style="padding: 40px 30px;">
          <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 22px;">Bonjour ${name || 'Collaborateur'},</h2>
          <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
            Vous avez été invité à rejoindre le portail de pilotage de <strong>Trigenys Group</strong>. 
            Cette plateforme vous permet de suivre l'avancement des projets stratégiques, de gérer vos tâches et de consulter la roadmap 2026.
          </p>
          
          ${customMessage ? `<p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 24px; padding-left: 16px; border-left: 4px solid #6366f1; font-style: italic;">"${customMessage}"</p>` : ''}

          <div style="background-color: #f8fafc; border-radius: 12px; padding: 24px; margin-bottom: 30px; border: 1px dashed #cbd5e1;">
            <p style="margin: 0 0 12px 0; font-weight: 600; color: #1e293b; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Vos accès temporaires :</p>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <p style="margin: 0; color: #475569; font-size: 15px;"><strong>Utilisateur :</strong> ${email || 'votre-email@exemple.com'}</p>
              <p style="margin: 0; color: #475569; font-size: 15px;"><strong>Mot de passe :</strong> <code style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px; color: #4f46e5;">${defaultPassword}</code></p>
            </div>
          </div>

          <div style="text-align: center;">
            <a href="http://localhost:3001" style="display: inline-block; background-color: #6366f1; color: #ffffff; padding: 14px 32px; border-radius: 8px; font-weight: 600; text-decoration: none; transition: background-color 0.2s;">Accéder au Portail</a>
          </div>
        </div>

        <div style="background-color: #f1f5f9; padding: 20px; text-align: center;">
          <p style="margin: 0; color: #94a3b8; font-size: 12px;">© 2026 Trigenys Group SAS. Tous droits réservés.</p>
          <p style="margin: 8px 0 0 0; color: #94a3b8; font-size: 11px;">Ceci est une invitation automatique pour test environnement.</p>
        </div>
      </div>
    `;
  };

  const handleSend = async () => {
    if (!email || !name) return;
    
    setStatus('loading');
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/dev/send-invitation`, {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          customMessage,
          html: generateEmailContent()
        })
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          onClose();
          setStatus('idle');
          setEmail('');
          setName('');
          setCustomMessage('');
        }, 2000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200"
          >
            {/* Header */}
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Invitation Testeur</h3>
                <p className="text-sm text-slate-500">Envoyez des accès par email pour le test de l'environnement</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-slate-200/50 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex flex-col md:flex-row h-[500px]">
              {/* Form Side */}
              <div className="w-full md:w-1/2 p-8 border-r border-slate-100 overflow-y-auto">
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Nom du destinataire</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Jennifer"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Email de destination</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="testeur@exemple.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Message personnalisé (Optionnel)</label>
                    <textarea 
                      value={customMessage}
                      onChange={(e) => setCustomMessage(e.target.value)}
                      placeholder="Ajoutez une note personnelle..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                    />
                  </div>
                  <div className="pt-4">
                    <button 
                      onClick={() => setIsPreview(!isPreview)}
                      className="flex items-center gap-2 text-primary font-semibold text-sm hover:underline"
                    >
                      {isPreview ? <Edit3 className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      {isPreview ? "Modifier le contenu" : "Voir l'aperçu du mail"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Preview Side */}
              <div className="w-full md:w-1/2 bg-slate-50 p-6 overflow-y-auto flex flex-col items-center">
                <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 p-4 scale-[0.85] origin-top">
                  <div dangerouslySetInnerHTML={{ __html: generateEmailContent() }} />
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="px-8 py-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {status === 'success' && (
                  <span className="flex items-center gap-1.5 text-emerald-600 text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4" /> Envoyé avec succès
                  </span>
                )}
                {status === 'error' && (
                  <span className="flex items-center gap-1.5 text-rose-600 text-sm font-medium">
                    <AlertCircle className="h-4 w-4" /> Échec de l'envoi
                  </span>
                )}
              </div>
              
              <button 
                onClick={handleSend}
                disabled={!email || !name || status === 'loading'}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20
                  ${status === 'loading' ? 'bg-slate-400 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary/90 active:scale-95'}
                `}
              >
                {status === 'loading' ? (
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : (
                  <Send className="h-5 w-5" />
                )}
                Envoyer l'invitation
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
