import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppDefinition } from '@/src/types';
import { FeatureCardItem } from './FeatureCard';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface AppSectionProps {
  app: AppDefinition;
  nextAppName?: string;
}

export function AppSection({ app, nextAppName }: AppSectionProps) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const checkTruncation = () => {
    if (textRef.current) {
      const { scrollHeight, clientHeight } = textRef.current;
      setIsTruncated(scrollHeight > clientHeight);
    }
  };

  useEffect(() => {
    checkTruncation();
    window.addEventListener('resize', checkTruncation);
    return () => window.removeEventListener('resize', checkTruncation);
  }, [app.tagline]);

  return (
    <section
      id={app.id}
      className="relative flex min-h-screen w-full snap-start flex-col items-center justify-center overflow-hidden px-6 py-24 xl:pl-32 xl:pr-20"
    >
      {/* Parallax Background Element */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.15 }}
        className="absolute -right-20 -top-20 pointer-events-none"
        style={{ color: app.color }}
      >
        <div className="h-[600px] w-[600px] rounded-full bg-current blur-[120px]" />
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col md:flex-row md:items-end gap-6 md:gap-12"
        >
          <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-7xl shrink-0 uppercase">
            {app.name}
          </h2>
          <div 
            className="flex-1 max-w-2xl md:border-l-2 border-primary/5 md:pl-10 h-min py-2 group/desc relative"
            onMouseEnter={() => isTruncated && setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <p 
              ref={textRef}
              className="text-base md:text-lg text-foreground/50 font-light leading-relaxed line-clamp-2"
            >
              {app.tagline}
            </p>
            
            {/* Discrete Hover Tooltip for full description - Only shown if truncated */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute left-10 -top-4 pointer-events-none z-50 w-full max-w-md"
                >
                  <div className="bg-white/40 backdrop-blur-2xl border border-white/60 shadow-lg rounded-2xl p-5 text-[15px] leading-relaxed text-foreground/80 -translate-y-full ring-1 ring-black/[0.03]">
                    {app.tagline}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {app.categories.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-foreground/30">
                {category.title}
              </h3>
              <div className="grid gap-4">
                {category.cards.map((card) => (
                  <FeatureCardItem key={card.id} card={card} color={app.color} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Next Section Hint */}
      {nextAppName && (
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-foreground/20 xl:left-[calc(50%+40px)]"
        >
          <span className="text-[10px] uppercase tracking-[0.2em]">Suivant : {nextAppName}</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </motion.div>
      )}
    </section>
  );
}
