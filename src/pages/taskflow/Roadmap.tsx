import React from 'react';
import { Milestone, Flag, CalendarRange, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { useProjects } from '@/src/hooks/useProjects';

const MONTHS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

export default function Roadmap() {
  const { data: projects, isLoading } = useProjects();
  
  const currentYear = 2026;

  return (
    <div className="min-h-screen bg-background pb-32">
      <main className="mx-auto max-w-7xl px-6 pt-24">

        <header className="mb-16 text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider mb-6"
          >
            <Sparkles className="h-3 w-3" />
            Trajectoire Stratégique {currentYear}
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground uppercase mb-4">Roadmap <span className="text-primary italic">Mensuelle</span></h1>
          <p className="text-muted-foreground text-lg font-light leading-relaxed">Vision globale des jalons et objectifs prioritaires sur les 12 mois de l'exercice.</p>
        </header>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/10 to-transparent hidden md:block" />

          <div className="space-y-16">
            {MONTHS.map((monthName, idx) => {
              const isEven = idx % 2 === 0;
              const monthProjects = projects?.filter(p => {
                const date = new Date(p.startDate);
                return date.getMonth() === idx && date.getFullYear() === currentYear;
              }) || [];

              return (
                <motion.div 
                  key={monthName}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className={cn(
                    "relative flex flex-col md:flex-row items-center gap-8 md:gap-12",
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  )}
                >
                  {/* Content Side */}
                  <div className={cn("w-full md:w-1/2", isEven ? "md:text-right" : "md:text-left")}>
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">{currentYear}</span>
                      <h2 className="text-2xl font-black text-foreground uppercase italic">{monthName}</h2>
                    </div>

                    <div className={cn("mt-4 flex flex-wrap gap-3", isEven ? "justify-end" : "justify-start")}>
                      {monthProjects.map(p => (
                        <div key={p.id} className="px-3 py-1.5 rounded-xl bg-white/30 border border-white/60 backdrop-blur-sm shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 inline-flex flex-col text-left">
                          <span className="text-[8px] font-black text-primary/60 uppercase tracking-widest">{p.id}</span>
                          <span className="text-[11px] font-bold truncate max-w-[150px]">{p.name}</span>
                        </div>
                      ))}
                      {monthProjects.length === 0 && (
                        <span className="text-[10px] font-medium text-muted-foreground italic uppercase tracking-widest opacity-30">RAS</span>
                      )}
                    </div>
                  </div>

                  {/* Icon Node */}
                  <div className={cn(
                    "relative z-10 flex h-12 w-12 items-center justify-center rounded-xl shadow-xl text-white transition-all",
                    monthProjects.length > 0 ? "bg-black scale-110" : "bg-neutral-200"
                  )}>
                    <CalendarRange className={cn("h-5 w-5", monthProjects.length > 0 ? "text-white" : "text-neutral-400")} />
                  </div>

                  {/* Empty Side for Spacing */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Legend / Key Milestones */}
        <section className="mt-32 p-8 md:p-12 rounded-3xl bg-neutral-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Flag className="h-40 w-40" />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-end justify-between gap-8">
            <div className="max-w-xl">
              <h3 className="text-2xl font-bold uppercase mb-4">Objectifs <span className="text-primary italic">Stratégiques</span></h3>
              <p className="text-white/50 text-sm font-medium leading-relaxed mb-6">
                Chaque mois est une opportunité de franchir un nouveau jalon vers l'excellence opérationnelle. 
                Le cockpit personnel est votre boussole quotidienne.
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-[10px] font-bold uppercase text-white/70">Démarré</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-neutral-600" />
                  <span className="text-[10px] font-bold uppercase text-white/30">Planifié</span>
                </div>
              </div>
            </div>
            
            <button className="group flex items-center gap-3 px-6 py-3 rounded-full bg-white text-black font-bold uppercase tracking-tight hover:scale-105 transition-all">
              Générer le rapport PDF <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

