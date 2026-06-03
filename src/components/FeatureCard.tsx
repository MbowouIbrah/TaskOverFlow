import React from 'react';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { FeatureCard as FeatureCardType } from '@/src/types';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  card: FeatureCardType;
  color: string;
}

export function FeatureCardItem({ card, color }: FeatureCardProps) {
  const Icon = (Icons as any)[card.icon] || Icons.HelpCircle;

  const isHashPath = card.path.startsWith('#');

  const content = (
    <div className="group relative w-full min-h-[110px] overflow-hidden rounded-2xl bg-white/30 border border-white/60 backdrop-blur-sm p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-center">
      <div className="flex items-center gap-4 relative z-10">
        <div 
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm transition-transform duration-300 group-hover:scale-110"
          style={{ color }}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex flex-col justify-center min-w-0">
          <h4 className="font-semibold text-sm text-foreground leading-tight group-hover:text-foreground/90 transition-colors">
            {card.title}
          </h4>
          <p className="mt-1.5 text-[11px] text-foreground/50 line-clamp-2 leading-relaxed group-hover:text-foreground/70 transition-colors">
            {card.description}
          </p>
        </div>
      </div>
      
      {/* Hover Glow Effect */}
      <div className="absolute -inset-px opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />
      </div>
    </div>
  );

  if (isHashPath) {
    return (
      <a href={card.path} className="flex h-full w-full">
        {content}
      </a>
    );
  }

  return (
    <Link to={card.path} className="flex h-full w-full">
      {content}
    </Link>
  );
}

