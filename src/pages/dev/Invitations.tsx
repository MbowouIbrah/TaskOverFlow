import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, Mail, Search, User as UserIcon, CheckCircle2, 
  AlertCircle, Send, Eye, Edit3, ArrowLeft, Terminal
} from 'lucide-react';
import { Link } from 'react-router-dom';
import apiClient from '@/src/api/apiClient';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isActive: boolean;
}

export default function Invitations() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [customMessage, setCustomMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isPreview, setIsPreview] = useState(true);

  const defaultPassword = 'Trigenys2026!';

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await apiClient.get('/users');
      setUsers(response.data);
      if (response.data.length > 0) {
        setSelectedUsers([response.data[0]]);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleUser = (user: User) => {
    setSelectedUsers(prev => {
      const isSelected = prev.find(u => u.id === user.id);
      if (isSelected) {
        // Unselect if it's not the only one
        if (prev.length === 1) return prev; 
        return prev.filter(u => u.id !== user.id);
      } else {
        return [...prev, user];
      }
    });
  };

  const filteredUsers = users.filter(u => 
    `${u.firstName} ${u.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  // The preview always shows the LAST selected user
  const previewUser = selectedUsers[selectedUsers.length - 1];

  const generateEmailContent = (user: User) => {
    if (!user) return '';
    const p = '#872341'; // Bourguignon
    const s = '#22A699'; // Jade
    const a = '#F8B6C3'; // Rose Doux
    
    return `
      <div style="font-family: 'Plus Jakarta Sans', 'Urbanist', Segoe UI, Tahoma, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #E8E0E3; box-shadow: 0 10px 25px -5px rgba(135, 35, 65, 0.1);">
        <!-- Header with Trigenys Gradient -->
        <div style="background: linear-gradient(135deg, ${p} 0%, ${s} 100%); padding: 50px 30px; text-align: center; position: relative;">
          <div style="font-family: 'Urbanist', sans-serif; color: #ffffff; margin: 0; font-size: 32px; font-weight: 900; letter-spacing: -0.04em; text-transform: uppercase;">
            TRIGENYS <span style="color: ${a}; font-weight: 300; font-style: italic;">GROUP</span>
          </div>
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 9px; color: rgba(255,255,255,0.4); margin-top: 8px; letter-spacing: 0.2em;">
            01010100 01010010 01001001 01000111
          </div>
        </div>
        
        <div style="padding: 40px 35px; background-color: #ffffff;">
          <h2 style="font-family: 'Urbanist', sans-serif; color: #1A0A0E; margin: 0 0 20px 0; font-size: 24px; font-weight: 800;">Bonjour ${user.firstName},</h2>
          
          <p style="color: #4A3A3E; font-size: 15px; line-height: 1.7; margin-bottom: 24px;">
            Bienvenue dans l'écosystème <strong>Trigenys</strong>. Votre accès au portail de pilotage stratégique 2026 a été activé. 
            Suivez l'évolution de vos projets avec la simplicité qui nous définit.
          </p>
          
          ${customMessage ? `
            <div style="margin-bottom: 30px; padding: 20px; background-color: #F5F2F3; border-radius: 12px; border-left: 4px solid ${p};">
              <p style="color: #4A3A3E; font-size: 14px; line-height: 1.6; margin: 0; font-style: italic;">"${customMessage}"</p>
            </div>
          ` : ''}

          <!-- Access Card -->
          <div style="background-color: #F5F2F3; border-radius: 16px; padding: 28px; margin-bottom: 35px; border: 1px solid #E8E0E3;">
            <p style="margin: 0 0 16px 0; font-weight: 700; color: ${p}; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; font-family: 'Urbanist', sans-serif;">Vos accès sécurisés :</p>
            
            <div style="margin-bottom: 15px;">
              <span style="display: block; font-size: 11px; color: #9A8A8E; text-transform: uppercase; margin-bottom: 4px;">Identifiant</span>
              <span style="font-size: 15px; color: #1A0A0E; font-weight: 600;">${user.email}</span>
            </div>
            
            <div style="margin-bottom: 20px;">
              <span style="display: block; font-size: 11px; color: #9A8A8E; text-transform: uppercase; margin-bottom: 4px;">Mot de passe temporaire</span>
              <code style="font-family: 'JetBrains Mono', monospace; background: #ffffff; padding: 6px 12px; border-radius: 6px; color: ${s}; border: 1px solid #E8E0E3; font-size: 14px; font-weight: 700;">${defaultPassword}</code>
            </div>

            <div style="padding-top: 15px; border-top: 1px solid #E8E0E3;">
              <p style="margin: 0; color: ${p}; font-size: 13px; font-weight: 700; line-height: 1.4;">
                ⚠️ Action requise : Pour votre sécurité, vous devrez modifier ce mot de passe dès votre première connexion.
              </p>
            </div>
          </div>

          <div style="text-align: center;">
            <a href="${import.meta.env.VITE_APP_URL}/login" style="display: inline-block; background-color: ${p}; color: #ffffff; padding: 16px 40px; border-radius: 12px; font-weight: 700; text-decoration: none; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; transition: background-color 0.2s; font-family: 'Urbanist', sans-serif; box-shadow: 0 8px 20px -5px rgba(135, 35, 65, 0.4);">Accéder à TaskFlow</a>
          </div>

        </div>

        <!-- Footer -->
        <div style="background-color: #1A0A0E; padding: 35px 30px; text-align: center;">
          <div style="font-family: 'Urbanist', sans-serif; color: ${a}; font-size: 18px; font-weight: 900; font-style: italic; margin-bottom: 12px;">
            "La tech, simple comme YouTube"
          </div>
          <p style="margin: 0; color: #9A8A8E; font-size: 11px; letter-spacing: 0.05em;">
            © 2026 Trigenys Group SAS · Séquence Binaire 01101000<br>
            Document confidentiel · Tous droits réservés
          </p>
        </div>
      </div>
    `;
  };

  const handleSend = async () => {
    if (selectedUsers.length === 0) return;
    
    setStatus('loading');
    try {
      // Send invitations to all selected users
      await Promise.all(selectedUsers.map(user => 
        apiClient.post('/dev/send-invitation', {
          email: user.email,
          name: user.firstName,
          customMessage,
          html: generateEmailContent(user)
        })
      ));

      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pt-20 pb-12 px-6 lg:px-20">
      {/* Header Area */}
      <div className="max-w-7xl mx-auto mb-10">
        <Link to="/portail" className="group inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-6 font-medium">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Retour au Portail
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-500/20">
              <Terminal className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Invitations par mail</h1>
              <p className="text-slate-500 font-medium">Gérez et envoyez des accès aux collaborateurs de Trigenys Group</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Environnement Connecté</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: User List */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[700px]">
            <div className="p-6 border-b border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 flex items-center gap-2 uppercase tracking-widest text-xs">
                  <Users className="h-4 w-4 text-primary" />
                  Liste des Utilisateurs ({users.length})
                </h3>
                {selectedUsers.length > 0 && (
                  <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-1 rounded-full uppercase">
                    {selectedUsers.length} Sélectionnés
                  </span>
                )}
              </div>
              
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Rechercher Jennifer, Ibrah..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <div key={i} className="h-20 w-full rounded-2xl bg-slate-50 animate-pulse" />
                ))
              ) : filteredUsers.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                  <Users className="h-12 w-12 mb-4 opacity-20" />
                  <p className="text-sm font-medium">Aucun utilisateur trouvé</p>
                </div>
              ) : (
                filteredUsers.map((user) => {
                  const isSelected = selectedUsers.some(u => u.id === user.id);
                  return (
                    <button
                      key={user.id}
                      onClick={() => toggleUser(user)}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 border backdrop-blur-sm group outline-none ${
                        isSelected 
                        ? 'bg-white/70 border-primary/30 shadow-xl -translate-y-1' 
                        : 'bg-white/20 border-white/40 shadow-sm hover:bg-white/40 hover:border-white/60 hover:shadow-lg hover:-translate-y-0.5'
                      }`}
                    >
                      <div className={`h-12 w-12 rounded-xl flex items-center justify-center shadow-sm transition-all duration-300 ${
                        isSelected 
                        ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/20' 
                        : 'bg-white text-slate-400 group-hover:scale-110 group-hover:text-primary group-hover:shadow-md'
                      }`}>
                        {isSelected ? <CheckCircle2 className="h-5 w-5" /> : <UserIcon className="h-5 w-5" />}
                      </div>
                      <div className="text-left min-w-0">
                        <h4 className={`font-bold text-sm truncate transition-colors ${
                          isSelected ? 'text-slate-900' : 'text-slate-700 group-hover:text-slate-900'
                        }`}>
                          {user.firstName} {user.lastName}
                        </h4>
                        <p className={`text-[11px] font-medium truncate transition-colors ${
                          isSelected ? 'text-primary/70' : 'text-slate-400 group-hover:text-slate-500'
                        }`}>
                          {user.email}
                        </p>
                      </div>
                      <div className="ml-auto">
                        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md transition-all ${
                          isSelected 
                          ? 'bg-primary/10 text-primary' 
                          : 'bg-slate-100/50 text-slate-500 group-hover:bg-white group-hover:text-slate-700'
                        }`}>
                          {user.role}
                        </span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Preview & Customization */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[700px]">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">
                    Aperçu {selectedUsers.length > 1 ? `(${previewUser?.firstName})` : ''}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">Dernier utilisateur sélectionné</p>
                </div>
              </div>
              
              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button 
                  onClick={() => setIsPreview(true)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    isPreview ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Eye className="h-3.5 w-3.5" /> Aperçu
                </button>
                <button 
                  onClick={() => setIsPreview(false)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    !isPreview ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Edit3 className="h-3.5 w-3.5" /> Éditer
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 bg-slate-50/30">
              <AnimatePresence mode="wait">
                {isPreview ? (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="w-full"
                  >
                    {previewUser ? (
                      <div dangerouslySetInnerHTML={{ __html: generateEmailContent(previewUser) }} />
                    ) : (
                      <div className="bg-white p-20 text-center text-slate-400 rounded-2xl border border-slate-100">
                        Sélectionnez au moins un utilisateur
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="edit"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Note personnelle</label>
                      <textarea
                        value={customMessage}
                        onChange={(e) => setCustomMessage(e.target.value)}
                        placeholder="Ajoutez une note qui s'affichera dans l'email..."
                        className="w-full p-6 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none transition-all h-40 resize-none text-slate-700"
                      />
                    </div>
                    <div className="p-6 rounded-2xl bg-amber-50 border border-amber-100 text-amber-800 text-sm">
                      <p className="font-bold mb-1 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" /> Envoi groupé ({selectedUsers.length} destinataires)
                      </p>
                      Tous les utilisateurs recevront la même note personnalisée, mais avec leurs propres accès individuels. 
                      <strong className="block mt-2 text-rose-700">Le message de changement obligatoire de mot de passe sera automatiquement inclus.</strong>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="p-8 border-t border-slate-100 bg-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                {status === 'success' && (
                  <motion.span 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-1.5 text-emerald-600 text-sm font-bold"
                  >
                    <CheckCircle2 className="h-5 w-5" /> Invitations envoyées !
                  </motion.span>
                )}
                {status === 'error' && (
                  <motion.span 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-1.5 text-rose-600 text-sm font-bold"
                  >
                    <AlertCircle className="h-5 w-5" /> Échec de l'envoi
                  </motion.span>
                )}
              </div>

              <button
                onClick={handleSend}
                disabled={selectedUsers.length === 0 || status === 'loading'}
                className={`flex items-center gap-3 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl
                  ${status === 'loading' ? 'bg-slate-400 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary/90 hover:-translate-y-0.5 active:scale-95 shadow-primary/30'}
                `}
              >
                {status === 'loading' ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full" />
                ) : <Send className="h-4 w-4" />}
                Envoyer à {selectedUsers.length > 1 ? `${selectedUsers.length} personnes` : previewUser?.firstName}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
