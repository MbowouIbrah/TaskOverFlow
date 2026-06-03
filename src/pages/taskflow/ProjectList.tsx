import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, FolderKanban, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { useProjects } from '@/src/hooks/useProjects';

export default function ProjectList() {
  const [search, setSearch] = useState('');
  const { data: projects, isLoading } = useProjects(search ? { search } : undefined);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'EN_COURS': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'URGENT': return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'TERMINE': return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
      case 'PLANIFIE': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      case 'SUSPENDU': return 'bg-slate-500/10 text-slate-600 border-slate-500/20';
      default: return 'bg-slate-500/10 text-slate-600 border-slate-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <main className="mx-auto max-w-7xl px-6 pt-24">

        <header className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight text-foreground uppercase">Portefeuille <span className="text-primary italic">Projets</span></h1>
              <p className="text-muted-foreground">Vue d'ensemble de toutes les initiatives en cours et planifiées.</p>
            </div>
            
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                className="pl-9 bg-white/50 backdrop-blur-sm border-black/5 focus:ring-primary/20" 
                placeholder="Rechercher un projet..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects?.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Card className="group relative h-full overflow-hidden rounded-2xl bg-white/30 border border-white/60 backdrop-blur-sm shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ring-0">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <CardHeader className="pb-4 relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <Badge variant="outline" className={cn("px-3 py-1 text-[10px] uppercase tracking-widest font-black border-2", getStatusColor(project.status))}>
                      {project.status.replace('_', ' ')}
                    </Badge>
                    <span className="text-[10px] font-black text-foreground/20 uppercase tracking-[0.3em]">{project.id}</span>
                  </div>
                  <CardTitle className="text-2xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors uppercase italic leading-none">
                    {project.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-8 relative z-10">
                  <p className="text-sm text-foreground/60 font-medium leading-relaxed min-h-[3rem]">
                    {project.description}
                  </p>

                  <div className="space-y-3">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] font-black uppercase tracking-widest text-foreground/30">Progression</span>
                      <span className="text-sm font-black italic text-primary">{Math.round(project.progress)}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-foreground/5 overflow-hidden backdrop-blur-sm">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        className="h-full bg-gradient-to-r from-primary to-primary/60"
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-foreground/5">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-black flex items-center justify-center text-[10px] font-bold text-white uppercase italic">
                        {project.manager.firstName[0]}{project.manager.lastName[0]}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase text-foreground/40 leading-none mb-1">Manager</span>
                        <span className="text-xs font-bold">{project.manager.firstName} {project.manager.lastName}</span>
                      </div>
                    </div>
                    <button className="h-10 w-10 rounded-full bg-foreground/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all transform group-hover:rotate-[-45deg]">
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {projects?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="h-16 w-16 rounded-full bg-black/5 flex items-center justify-center mb-4">
              <FolderKanban className="h-8 w-8 text-black/20" />
            </div>
            <h3 className="text-lg font-bold">Aucun projet trouvé</h3>
            <p className="text-muted-foreground">Essayez d'ajuster vos critères de recherche.</p>
          </div>
        )}
      </main>
    </div>
  );
}

