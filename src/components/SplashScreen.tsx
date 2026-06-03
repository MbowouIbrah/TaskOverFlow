import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'genome' | 'loading' | 'exit'>('genome');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Brand Book Colors
  const p = '#872341'; // Bourguignon
  const s = '#22A699'; // Jade
  const a = '#F8B6C3'; // Rose Doux
  const white = '#FFFFFF';
  const dark = '#1A0A0E';

  useEffect(() => {
    let animationFrameId: number;
    let t = 0;

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const rows = 5;
      const cols = 18;
      const spacing = W / (cols + 1);
      const cy = H / 2;
      const amplitude = H * 0.25;
      const rowGap = H * 0.15;
      const seq = '010111001010001101110100010011001010';

      t += 0.02;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const bit = seq[(row * cols + col) % seq.length];
          const px = spacing + col * spacing;
          const wave = Math.sin((col / cols) * Math.PI * 2 + t + row * 0.8) * amplitude;
          const py = cy + (row - rows / 2) * rowGap + wave;
          
          // Alpha based on wave position
          const alpha = 0.1 + 0.4 * Math.abs(Math.sin((col / cols) * Math.PI + t * 0.5));
          
          ctx.globalAlpha = alpha;
          ctx.fillStyle = bit === '1' ? p : s;
          ctx.font = `bold 10px "JetBrains Mono", monospace`;
          ctx.textAlign = 'center';
          ctx.fillText(bit, px, py);
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    // Progress logic
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setPhase('exit');
          setTimeout(onComplete, 1000);
          return 100;
        }
        if (prev > 80) return prev + 0.5;
        return prev + 1.5;
      });
    }, 40);

    setTimeout(() => setPhase('loading'), 800);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(progressInterval);
    };
  }, [onComplete, p, s]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center font-['Plus_Jakarta_Sans']"
      style={{ background: white }}
    >
      {/* Subtle background glow - very soft for light theme */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{ 
          background: `radial-gradient(circle at 50% 50%, ${p} 0%, transparent 70%)` 
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-16 max-w-lg w-full px-8">
        
        {/* Logo Section matching Brand Book */}
        <div className="flex flex-col items-center">
          <div className="relative h-32 w-full flex items-center justify-center">
            <canvas 
              ref={canvasRef} 
              width={400} 
              height={140} 
              className="absolute pointer-events-none opacity-40"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative z-20 text-center"
            >
              <h1 className="text-4xl font-black tracking-tighter text-[#1A0A0E] font-['Urbanist'] uppercase">
                Trigenys
              </h1>
              {/* Decorative Underline */}
              <div 
                className="h-[2px] w-full mt-1 rounded-full"
                style={{ background: `linear-gradient(to right, ${p}, ${s})` }}
              />
              <div className="flex justify-between items-center mt-2 px-1">
                <span className="text-[10px] font-light tracking-[0.4em] text-slate-400 font-['Plus_Jakarta_Sans']">
                  G R O U P
                </span>
                <span style={{ color: s }} className="text-[7px] font-mono opacity-20">
                  01010100 01010010
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Loading Section */}
        <div className="w-full max-w-[280px] space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-end text-[9px] font-mono tracking-widest uppercase">
              <span className="text-slate-400">System Initializing</span>
              <span style={{ color: p }} className="font-bold">{Math.round(progress)}%</span>
            </div>
            
            <div className="h-[1px] w-full bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                className="h-full origin-left"
                animate={{ width: `${progress}%` }}
                style={{ 
                  background: `linear-gradient(to right, ${p}, ${s})`,
                }}
              />
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'loading' ? 1 : 0 }}
            className="text-center"
          >
            <p className="text-[10px] italic text-slate-400 font-['Urbanist'] tracking-wider">
              "La tech, simple comme YouTube"
            </p>
          </motion.div>
        </div>
      </div>

      {/* Identical Signature from Smart-Education */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-12 flex justify-center"
      >
        <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
          <span className="font-bold tracking-widest text-[#1A0A0E]">TASKOVERFLOW</span>
          <span className="font-['Pinyon_Script'] text-lg text-[#872341] italic pt-0.5">by</span>
          <span className="font-bold text-slate-500 tracking-tight">Trigenys Group</span>
        </div>

      </motion.div>

    </motion.div>
  );
}

