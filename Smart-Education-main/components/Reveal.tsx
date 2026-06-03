import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Delay in ms
  threshold?: number; // 0 to 1, how much of the element must be visible
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

const Reveal: React.FC<RevealProps> = ({ 
  children, 
  className = "", 
  delay = 0, 
  threshold = 0.1,
  direction = 'up'
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect(); // Only animate once
      }
    }, {
      threshold: threshold,
      rootMargin: "0px 0px -50px 0px" // Trigger slightly before the bottom of the screen
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up': return 'translate-y-8';
        case 'down': return '-translate-y-8';
        case 'left': return 'translate-x-8';
        case 'right': return '-translate-x-8';
        case 'none': return '';
        default: return 'translate-y-8';
      }
    }
    return 'translate-y-0 translate-x-0';
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out will-change-transform ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${getTransform()} ${className}`}
    >
      {children}
    </div>
  );
};

export default Reveal;