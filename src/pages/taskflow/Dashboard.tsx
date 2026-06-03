import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'motion/react';
import { Activity, Target, CheckCircle2, Clock, ListTodo, ExternalLink } from 'lucide-react';
import { useDashboardMe } from '@/src/hooks/useDashboard';
import { useAuthStore } from '@/src/store/useAuthStore';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { data, isLoading } = useDashboardMe();
  const { user } = useAuthStore();

  const statsCurrentMonth = data?.statsCurrentMonth || { total: 0, done: 0, todo: 0, inProgress: 0 };
  const completionRate = statsCurrentMonth.total > 0 
    ? Math.round((statsCurrentMonth.done / statsCurrentMonth.total) * 100) 
    : 0;

  const stats = [
    { label: 'Tâches totales (Mois)', value: statsCurrentMonth.total, icon: ListTodo, color: 'bg-blue-500' },
    { label: 'Tâches Terminées', value: statsCurrentMonth.done, icon: CheckCircle2, color: 'bg-emerald-500' },
    { label: 'À Faire / En cours', value: statsCurrentMonth.todo + statsCurrentMonth.inProgress, icon: Clock, color: 'bg-orange-500' },
    { label: 'Taux de Complétion', value: `${completionRate}%`, icon: Target, color: 'bg-indigo-500' }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <main className="mx-auto max-w-7xl px-6 pt-24">

        <header className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-foreground uppercase">Mon <span className="text-primary italic">Cockpit</span></h1>
          <p className="text-muted-foreground">Bienvenue, {user?.firstName}. Voici un aperçu de vos objectifs ce mois-ci.</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="rounded-2xl bg-white/30 border border-white/60 backdrop-blur-sm shadow-sm p-6 flex flex-col items-center text-center">
                <div className={`${stat.color} p-3 rounded-2xl text-white mb-4 shadow-lg shadow-black/5`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <span className="text-3xl font-black mb-1">{stat.value}</span>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Projects Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Activity className="h-4 w-4" /> Projets Actifs
              </h2>
            </div>
            
            <div className="space-y-4">
              {data?.activeProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="group relative overflow-hidden rounded-2xl bg-white/30 border border-white/60 backdrop-blur-sm p-5 transition-all hover:bg-white/50 hover:shadow-md">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-sm font-bold tracking-tight uppercase">{project.name}</h3>
                        <p className="text-[10px] text-muted-foreground font-medium">{project.id}</p>
                      </div>
                      <Badge className="bg-indigo-500/10 text-indigo-500 border-indigo-500/20 text-[10px] font-bold">
                        {project._count.tasks} Tâches
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-bold uppercase">
                        <span className="text-muted-foreground">Progression</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${project.progress}%` }}
                          className="h-full bg-primary"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              {data?.activeProjects.length === 0 && (
                <p className="text-center py-8 text-xs text-muted-foreground italic">Aucun projet actif pour le moment.</p>
              )}
            </div>
          </div>

          {/* Tasks Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <ListTodo className="h-4 w-4" /> Mes tâches du mois
              </h2>
              <Link to="/taches" className="text-[10px] font-bold uppercase text-primary hover:underline flex items-center gap-1">
                Tout voir <ExternalLink className="h-3 w-3" />
              </Link>
            </div>

            <div className="space-y-3">
              {data?.allTasks.filter(t => t.status !== 'TERMINE').map((task, idx) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <div className="flex items-center gap-4 rounded-xl bg-white/30 border border-white/60 backdrop-blur-sm p-4 hover:bg-white/50 transition-colors">
                    <div className={`h-2 w-2 rounded-full ${
                      task.priority === 'CRITIQUE' ? 'bg-red-500 animate-pulse' : 
                      task.priority === 'HAUTE' ? 'bg-orange-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold truncate leading-none mb-1.5">{task.title}</h4>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold uppercase text-primary/60">{task.project.name}</span>
                        <span className="text-[10px] font-medium text-muted-foreground flex items-center gap-1">
                          <Clock className="h-2.5 w-2.5" /> {task.id}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase border ${
                        task.status === 'EN_COURS' ? 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20' : 'bg-black/5 text-muted-foreground border-black/10'
                      }`}>
                        {task.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
              {data?.allTasks.filter(t => t.status !== 'TERMINE').length === 0 && (
                <div className="text-center py-12 rounded-2xl border-2 border-dashed border-black/5">
                  <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto mb-3 opacity-50" />
                  <p className="text-xs font-medium text-muted-foreground italic">Félicitations ! Vous n'avez aucune tâche en cours.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`px-2 py-0.5 rounded-full ${className}`}>
      {children}
    </span>
  );
}

