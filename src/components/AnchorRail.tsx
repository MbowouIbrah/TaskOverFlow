import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavItem {
  id: string;
  name: string;
  tagline?: string;
  icon?: string;
  path?: string;
}

interface AnchorRailProps {
  items: NavItem[];
}

export function AnchorRail({ items }: AnchorRailProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const location = useLocation();

  const getPathActiveId = () => {
    const found = items.find(item => {
      if (location.pathname === '/portail') {
        return location.hash === `#${item.id}`;
      }
      return item.path === location.pathname;
    });
    return found?.id || (location.pathname === '/portail' ? 'hero' : '');
  };

  const [activeId, setActiveId] = useState<string>(getPathActiveId);

  // Mettre à jour l'ID actif si le chemin ou le hash URL change (ex: clic sur un lien)
  useEffect(() => {
    setActiveId(getPathActiveId());
  }, [location.pathname, location.hash]);

  // Détection de la section active au défilement (Scroll Spy)
  useEffect(() => {
    if (location.pathname !== '/portail') return;

    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // Se déclenche quand la section occupe la zone centrale de l'écran
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Observer chaque élément de section par son ID
    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [location.pathname, items]);

  return (
    <nav 
      aria-label="Navigation rapide"
      className="fixed right-8 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-6 xl:flex"
    >
      {items.map((item) => {
        const isActive = activeId === item.id;
        const isHovered = hoveredId === item.id;
        const Icon = item.icon ? (Icons as any)[item.icon] : null;

        const isAtPortal = location.pathname === '/portail';
        
        // Si on est déjà sur le portail, on utilise une ancre native pour le scroll
        // Sinon on utilise Link pour revenir au portail avec l'ancre
        const Component = isAtPortal ? 'a' : Link;
        const linkProps = isAtPortal 
          ? { href: `#${item.id}` } 
          : { to: `/portail#${item.id}` };

        return (
          <Component
            key={item.id}
            {...(linkProps as any)}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="group relative flex items-center justify-center p-2"
          >
            {/* Tooltip */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: 10, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 5, scale: 0.95 }}
                  className="absolute right-14 flex items-center pointer-events-none"
                >
                  <div className="relative rounded-2xl border border-black/10 bg-white shadow-2xl p-4 min-w-[180px] text-center">
                    <p className="text-sm font-bold text-foreground leading-tight uppercase tracking-tight">{item.name}</p>
                    {item.tagline && (
                      <p className="mt-1.5 text-[11px] text-foreground/50 leading-snug">
                        {item.tagline}
                      </p>
                    )}
                    
                    {/* Thought Bubble Pointer */}
                    <div className="absolute top-1/2 -right-2 h-4 w-4 -translate-y-1/2 rotate-45 border-t border-r border-black/10 bg-white" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dot or Icon */}
            <div className="relative flex items-center justify-center">
              {Icon ? (
                <motion.div
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    color: isActive ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0.2)",
                  }}
                  className={cn(
                    "transition-colors duration-300",
                    isActive && "drop-shadow-[0_0_8px_rgba(0,0,0,0.1)]"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </motion.div>
              ) : (
                <motion.div
                  animate={{
                    scale: isActive ? 1.2 : 1,
                    backgroundColor: isActive ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0.1)",
                  }}
                  className={cn(
                    "h-2 w-2 rounded-full transition-colors duration-300",
                    isActive ? "shadow-[0_0_12px_rgba(0,0,0,0.1)]" : "group-hover:bg-black/20"
                  )}
                />
              )}
              
              {isActive && (
                <motion.div
                  layoutId="active-dot-ring"
                  className="absolute h-6 w-6 rounded-full border border-black/10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </div>
          </Component>
        );
      })}
    </nav>
  );
}



