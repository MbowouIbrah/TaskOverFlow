import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppSection } from '@/src/components/AppSection';
import * as Icons from 'lucide-react';
import portalConfig from '@/src/portal.access.json';
import { AppDefinition } from '@/src/types';
import { motion } from 'motion/react';
import { InvitationModal } from '@/src/components/InvitationModal';

export default function Portal() {
  const apps = portalConfig.apps as AppDefinition[];
  const location = useLocation();
  const navigate = useNavigate();
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      
      if (id === 'invite') {
        setIsInviteModalOpen(true);
        // Clear hash after opening to allow re-opening
        navigate('/portail', { replace: true });
        return;
      }

      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location, navigate]);

  return (
    <div className="relative h-screen w-full overflow-y-auto overflow-x-hidden bg-background scroll-smooth snap-y snap-mandatory">
      <main className="w-full">
        
        <InvitationModal 
          isOpen={isInviteModalOpen} 
          onClose={() => setIsInviteModalOpen(false)} 
        />

        {/* Hero Section */}
        <section 
          id="hero"
          className="relative flex min-h-screen w-full snap-start flex-col items-center justify-center py-20 px-6 xl:pl-32 xl:pr-20"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-primary/5 blur-[120px]" />
            <div className="absolute -left-20 top-1/4 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[100px]" />
            <div className="absolute -right-20 bottom-1/4 h-[400px] w-[400px] rounded-full bg-orange-500/10 blur-[100px]" />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center relative z-10 max-w-4xl"
          >
            <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-foreground mb-6 uppercase">
              Pilotage <span className="text-primary italic">TaskFlow</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-foreground/60 font-light leading-relaxed max-w-3xl mx-auto mb-16">
              Votre plateforme centrale pour la coordination stratégique et opérationnelle des initiatives de Trigenys Group.
            </p>

            {/* Flexible App Grid/Blocks in Hero */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 w-full">
              {apps.map((app, idx) => {
                const Icon = (Icons as any)[app.icon] || Icons.HelpCircle;
                return (
                  <motion.a
                    key={app.id}
                    href={`#${app.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + (idx * 0.1) }}
                    className="group p-4 md:p-6 rounded-2xl bg-white/30 border border-white/60 backdrop-blur-sm flex flex-col items-center justify-center text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="h-10 w-10 md:h-12 md:w-12 mb-3 md:mb-4 rounded-xl flex items-center justify-center bg-white shadow-sm text-primary group-hover:scale-110 transition-transform">
                      <Icon className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <span className="text-[10px] md:text-xs font-bold text-foreground/80 uppercase tracking-widest leading-tight">{app.name}</span>
                  </motion.a>
                );
              })}
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="flex flex-col items-center gap-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-foreground/30 max-w-sm">
                Faites défiler pour découvrir l’ensemble des outils mis à votre disposition.
              </p>
              <div className="relative h-12 w-6 rounded-full border-2 border-foreground/10 flex justify-center">
                <motion.div
                  animate={{
                    y: [4, 24, 4],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="mt-2 h-2 w-2 rounded-full bg-primary/40"
                />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* App Sections */}
        {apps.map((app, index) => (
          <AppSection 
            key={app.id} 
            app={app} 
            nextAppName={index < apps.length - 1 ? apps[index + 1].name : undefined}
          />
        ))}
      </main>

      {/* Global Atmospheric Overlays */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-multiply" />
      </div>
    </div>
  );
}
