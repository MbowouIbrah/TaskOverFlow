import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ChevronLeft, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  User, 
  Ticket, 
  Filter,
  MoreHorizontal,
  Send
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

// --- Types ---
interface Ticket {
  id: string;
  title: string;
  category: string;
  status: 'open' | 'pending' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  description: string;
  author: string;
  updates: TicketUpdate[];
}

interface TicketUpdate {
  id: string;
  author: string;
  date: string;
  message: string;
  isTechnical?: boolean;
}

// --- Mock Data ---
const MOCK_TICKETS: Ticket[] = [
  {
    id: 'T-1024',
    title: 'Problème accès MEDACAP',
    category: 'Accès / Authentification',
    status: 'open',
    priority: 'high',
    createdAt: '2024-04-16T10:00:00Z',
    author: 'Jean Dupont',
    description: 'Impossible de me connecter à la plateforme MEDACAP ce matin. Le message d\'erreur indique "Identifiants invalides" alors que mes codes sont corrects.',
    updates: [
      { id: 'u1', author: 'Jean Dupont', date: '2024-04-16T10:00:00Z', message: 'Ticket créé.' }
    ]
  },
  {
    id: 'T-1025',
    title: 'Bug affichage planning Academix',
    category: 'Affichage',
    status: 'pending',
    priority: 'medium',
    createdAt: '2024-04-15T14:30:00Z',
    author: 'Marie Martin',
    description: 'Le planning de la semaine prochaine ne s\'affiche pas correctement sur tablette. Les colonnes se chevauchent.',
    updates: [
      { id: 'u1', author: 'Marie Martin', date: '2024-04-15T14:30:00Z', message: 'Signalement du bug avec capture d\'écran.' },
      { id: 'u2', author: 'Support Tech', date: '2024-04-15T16:00:00Z', message: 'Nous avons reproduit le bug. Nos développeurs sont sur le coup.', isTechnical: true }
    ]
  },
  {
    id: 'T-1026',
    title: 'Demande de formation React',
    category: 'Contenu',
    status: 'resolved',
    priority: 'low',
    createdAt: '2024-04-14T09:15:00Z',
    author: 'Pierre Durand',
    description: 'Je souhaiterais savoir si une formation sur React 19 est prévue prochainement dans le catalogue.',
    updates: [
      { id: 'u1', author: 'Pierre Durand', date: '2024-04-14T09:15:00Z', message: 'Question envoyée.' },
      { id: 'u2', author: 'Formateur Expert', date: '2024-04-15T10:00:00Z', message: 'Oui Pierre, une session est prévue pour juin 2024 !', isTechnical: true }
    ]
  },
  {
    id: 'T-1027',
    title: 'Climatisation Salle 302',
    category: 'Infrastructure',
    status: 'open',
    priority: 'medium',
    createdAt: '2024-04-17T08:00:00Z',
    author: 'Alice Lefebvre',
    description: 'La climatisation fait un bruit anormal et ne semble plus refroidir la salle 302.',
    updates: [
      { id: 'u1', author: 'Alice Lefebvre', date: '2024-04-17T08:00:00Z', message: 'Signalement effectué via Academy Reserve.' }
    ]
  }
];

// --- Sub-components ---

const StatusBadge = ({ status }: { status: Ticket['status'] }) => {
  const styles = {
    open: 'bg-orange-50 text-orange-600 border-orange-100',
    pending: 'bg-blue-50 text-blue-600 border-blue-100',
    resolved: 'bg-emerald-50 text-emerald-600 border-emerald-100'
  };
  const labels = { open: 'Ouvert', pending: 'En cours', resolved: 'Résolu' };
  const icons = { open: Clock, pending: AlertCircle, resolved: CheckCircle2 };
  const Icon = icons[status];

  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider", styles[status])}>
      <Icon className="h-3 w-3" />
      {labels[status]}
    </span>
  );
};

const PriorityBadge = ({ priority }: { priority: Ticket['priority'] }) => {
  const styles = {
    low: 'text-foreground/40',
    medium: 'text-orange-400',
    high: 'text-rose-500'
  };
  return (
    <div className={cn("flex items-center gap-0.5", styles[priority])}>
      <div className="h-1.5 w-1.5 rounded-full bg-current" />
      <span className="text-[10px] font-bold uppercase tracking-wider">{priority}</span>
    </div>
  );
};

// --- Main Component ---

export default function MyTickets() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(MOCK_TICKETS[0].id);
  const [showMobileDetail, setShowMobileDetail] = useState(false);

  const filteredTickets = useMemo(() => {
    return MOCK_TICKETS.filter(t => 
      t.title.toLowerCase().includes(search.toLowerCase()) || 
      t.id.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const selectedTicket = MOCK_TICKETS.find(t => t.id === selectedId);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setShowMobileDetail(true);
  };

  return (
    <div className="flex h-screen flex-col bg-[#F8F9FA]">
      {/* Breadcrumb & Header */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b bg-white px-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/portail')}
            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-black/5"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <nav className="flex items-center gap-2 text-sm">
            <span className="text-foreground/40">Portail</span>
            <span className="text-foreground/20">/</span>
            <span className="font-bold uppercase tracking-tight">Mes Tickets</span>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs uppercase">
            AD
          </div>
        </div>
      </header>

      {/* Main Pattern: Master-Detail */}
      <main className="flex flex-1 overflow-hidden relative">
        
        {/* Left Side: List (Master) */}
        <section className={cn(
          "flex h-full w-full flex-col border-r bg-white transition-all duration-300 md:w-[400px] shrink-0",
          showMobileDetail ? "max-md:-translate-x-full" : "max-md:translate-x-0"
        )}>
          {/* List Search/Filters */}
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/30" />
              <input 
                type="text"
                placeholder="Rechercher un ticket..."
                className="w-full rounded-xl border-none bg-[#F3F4F6] py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-orange-500/20"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-widest text-foreground/40">
                {filteredTickets.length} Résultat{filteredTickets.length > 1 ? 's' : ''}
              </span>
              <button className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-foreground/60 hover:text-orange-500">
                <Filter className="h-3 w-3" />
                Filtres
              </button>
            </div>
          </div>

          {/* List Scroll Area */}
          <div className="flex-1 overflow-y-auto divide-y divide-black/[0.03]">
            {filteredTickets.map((t) => (
              <button
                key={t.id}
                onClick={() => handleSelect(t.id)}
                className={cn(
                  "flex w-full flex-col items-start gap-2 p-5 text-left transition-all hover:bg-[#F8F9FA]",
                  selectedId === t.id && "bg-orange-50/50 ring-1 ring-inset ring-orange-500/10"
                )}
              >
                <div className="flex w-full items-start justify-between">
                  <span className="text-[10px] font-mono font-medium text-foreground/30">{t.id}</span>
                  <PriorityBadge priority={t.priority} />
                </div>
                <h4 className={cn(
                  "text-[15px] font-bold leading-snug text-foreground/80",
                  selectedId === t.id && "text-orange-600"
                )}>
                  {t.title}
                </h4>
                <div className="mt-1 flex items-center gap-3">
                  <StatusBadge status={t.status} />
                  <span className="text-[11px] text-foreground/40">{t.category}</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Right Side: Detail (Detail) */}
        <section className={cn(
          "flex h-full flex-1 flex-col bg-[#F8F9FA] transition-all duration-300",
          !showMobileDetail ? "max-md:translate-x-full" : "max-md:translate-x-0 absolute inset-0 md:relative"
        )}>
          {selectedTicket ? (
            <div className="flex h-full flex-col">
              {/* Detail Header */}
              <div className="flex min-h-[80px] items-center justify-between border-b bg-white px-8">
                <div className="flex items-center gap-4">
                  {/* Mobile Back Button */}
                  <button 
                    onClick={() => setShowMobileDetail(false)}
                    className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl bg-[#F3F4F6]"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-mono font-medium text-foreground/30">{selectedTicket.id}</span>
                      <StatusBadge status={selectedTicket.status} />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-foreground/90 uppercase">{selectedTicket.title}</h3>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F3F4F6] hover:bg-black/5 text-foreground/40">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                  <button className="hidden sm:inline-flex items-center justify-center rounded-xl bg-orange-600 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white hover:bg-orange-700">
                    Répondre
                  </button>
                </div>
              </div>

              {/* Detail Content */}
              <div className="flex-1 overflow-y-auto p-8">
                <div className="mx-auto max-w-4xl space-y-8">
                  {/* Info Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 mb-1">Auteur</p>
                      <p className="text-sm font-semibold">{selectedTicket.author}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 mb-1">Priorité</p>
                      <PriorityBadge priority={selectedTicket.priority} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 mb-1">Catégorie</p>
                      <p className="text-sm font-semibold">{selectedTicket.category}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 mb-1">Créé le</p>
                      <p className="text-sm font-semibold">{new Date(selectedTicket.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {/* Description Card */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-foreground/40">
                      <Ticket className="h-4 w-4" />
                      <h4 className="text-[11px] font-bold uppercase tracking-widest">Description initiale</h4>
                    </div>
                    <div className="rounded-2xl bg-white p-8 shadow-sm border border-black/5">
                      <p className="text-[15px] leading-relaxed text-foreground/70">
                        {selectedTicket.description}
                      </p>
                    </div>
                  </div>

                  {/* Activity / Chat */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-foreground/40">
                      <User className="h-4 w-4" />
                      <h4 className="text-[11px] font-bold uppercase tracking-widest">Activité</h4>
                    </div>
                    
                    <div className="relative space-y-4 pb-20">
                      {selectedTicket.updates.map((update, i) => (
                        <div 
                          key={update.id}
                          className={cn(
                            "flex flex-col gap-2 rounded-2xl p-6 border",
                            update.isTechnical 
                              ? "ml-8 bg-blue-50/50 border-blue-100 ring-1 ring-blue-500/5" 
                              : "mr-8 bg-white border-black/5"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-tight text-foreground/60">{update.author}</span>
                            <span className="text-[10px] text-foreground/30">{new Date(update.date).toLocaleTimeString()}</span>
                          </div>
                          <p className="text-sm leading-relaxed text-foreground/80">{update.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Detail Footer (Reply) */}
              <div className="border-t bg-white p-6">
                 <div className="mx-auto max-w-4xl relative">
                    <textarea 
                      placeholder="Ajouter une réponse..."
                      className="w-full rounded-2xl border-none bg-[#F3F4F6] p-4 text-sm focus:ring-2 focus:ring-orange-500/20 pr-16"
                      rows={3}
                    />
                    <button className="absolute right-3 bottom-3 h-10 w-10 flex items-center justify-center rounded-xl bg-orange-600 text-white hover:bg-orange-700">
                      <Send className="h-5 w-5" />
                    </button>
                 </div>
              </div>
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-center p-10">
              <div className="h-20 w-20 rounded-full bg-black/[0.03] flex items-center justify-center mb-6">
                <Search className="h-10 w-10 text-black/10" />
              </div>
              <h3 className="text-lg font-bold text-foreground/40 uppercase tracking-widest">Aucun ticket sélectionné</h3>
              <p className="mt-2 text-sm text-foreground/30 max-w-xs uppercase">Sélectionnez un ticket dans la liste pour consulter ses détails et échanger avec le support.</p>
            </div>
          )}
        </section>

      </main>
    </div>
  );
}
