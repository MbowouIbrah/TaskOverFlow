import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Clock, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { useTasks } from '@/src/hooks/useTasks';
import { useAuthStore } from '@/src/store/useAuthStore';

export default function TaskList() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showOnlyMine, setShowOnlyMine] = useState(false);
  const { user } = useAuthStore();

  const { data: tasks, isLoading } = useTasks({
    search: search || undefined,
    status: statusFilter === 'all' ? undefined : statusFilter as any,
    assigneeId: showOnlyMine ? user?.id : undefined
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'TERMINE': return <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">Terminé</Badge>;
      case 'EN_COURS': return <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">En cours</Badge>;
      case 'BLOQUE': return <Badge className="bg-red-500/10 text-red-600 border-red-500/20">Bloqué</Badge>;
      case 'EN_ATTENTE': return <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">En attente</Badge>;
      default: return <Badge className="bg-slate-500/10 text-slate-600 border-slate-500/20 uppercase text-[9px]">À faire</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <main className="mx-auto max-w-7xl px-6 pt-24">

        <header className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight text-foreground uppercase">Suivi des <span className="text-primary italic">Tâches</span></h1>
              <p className="text-muted-foreground">Gestion opérationnelle et assignations quotidiennes.</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowOnlyMine(!showOnlyMine)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-bold uppercase tracking-widest transition-all",
                  showOnlyMine ? "bg-primary text-white border-primary shadow-lg" : "bg-white/50 border-black/5 text-foreground/60 hover:bg-white"
                )}
              >
                {showOnlyMine ? "Mes Tâches Affichées" : "Toutes les Tâches"}
              </button>

              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  className="pl-9 bg-white/50 border-black/5" 
                  placeholder="Rechercher une tâche..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-1 rounded-lg border border-black/5 bg-white/50 p-1">
                {[
                  { id: 'all', label: 'Tous' },
                  { id: 'A_FAIRE', label: 'À faire' },
                  { id: 'EN_COURS', label: 'En cours' },
                  { id: 'TERMINE', label: 'Terminé' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setStatusFilter(f.id)}
                    className={cn(
                      "px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-md transition-all",
                      statusFilter === f.id ? "bg-black text-white shadow-lg" : "text-foreground/40 hover:text-foreground hover:bg-black/5"
                    )}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks?.map((task, idx) => (
            <motion.div 
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <div className="relative h-full p-6 rounded-2xl bg-white/30 border border-white/60 backdrop-blur-sm shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">{task.project.name}</span>
                    <h3 className="text-lg font-black text-foreground uppercase italic leading-tight group-hover:text-primary transition-colors">{task.title}</h3>
                  </div>
                  <span className="text-[10px] font-black text-foreground/20 uppercase">{task.id}</span>
                </div>

                <p className="text-sm text-foreground/60 font-medium mb-8 line-clamp-2 italic">
                  "{task.description}"
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-black flex items-center justify-center text-[9px] font-black text-white italic">
                      {task.assignee.firstName[0]}{task.assignee.lastName[0]}
                    </div>
                    <span className="text-[11px] font-bold text-foreground/80">{task.assignee.firstName} {task.assignee.lastName}</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end">
                      <span className="text-[8px] font-black uppercase text-foreground/30">Échéance</span>
                      <div className="flex items-center gap-1 text-[11px] font-black text-foreground/60">
                        <Clock className="h-2.5 w-2.5" />
                        {task.deadline ? new Date(task.deadline).toLocaleDateString() : 'N/A'}
                      </div>
                    </div>
                    <div className="h-8 w-[1px] bg-foreground/5" />
                    {getStatusBadge(task.status)}
                  </div>
                </div>

                <div className={cn(
                  "absolute -bottom-1 -right-1 h-3 w-3 rounded-full blur-[2px]",
                  task.priority === 'CRITIQUE' ? "bg-red-500" : task.priority === 'HAUTE' ? "bg-orange-500" : "bg-blue-500"
                )} />
              </div>
            </motion.div>
          ))}
        </div>

        {tasks?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="h-20 w-20 rounded-full bg-foreground/5 flex items-center justify-center mb-6">
              <AlertCircle className="h-10 w-10 text-foreground/20" />
            </div>
            <h3 className="text-xl font-black uppercase italic">Aucune tâche trouvée</h3>
            <p className="text-foreground/40 font-medium mt-2">Ajustez vos filtres pour explorer davantage.</p>
          </div>
        )}
      </main>
    </div>
  );
}

