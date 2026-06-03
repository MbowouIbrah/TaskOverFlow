import React, { useEffect, useState } from 'react';

const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [animationPhase, setAnimationPhase] = useState<'logo' | 'title' | 'subtitle' | 'loading' | 'exit'>('logo');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Logo appears
    setTimeout(() => setAnimationPhase('title'), 0);
    // Title slides up
    setTimeout(() => setAnimationPhase('subtitle'), 300);
    // Subtitle fades in
    setTimeout(() => setAnimationPhase('loading'), 500);
    // Start loading animation
    setTimeout(() => {
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setAnimationPhase('exit');
            setTimeout(() => {
              setIsVisible(false);
              onComplete();
            }, 500);
            return 100;
          }
          return prev + 1;
        });
      }, 35);
    }, 700);

    return () => {
      // Cleanup
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col bg-white dark:bg-[#111821] transition-opacity duration-500 ${
      animationPhase === 'exit' ? 'opacity-0' : 'opacity-100'
    }`}>
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-8 max-w-md mx-auto px-6">
        {/* Logo */}
        <div className="relative">
          <div className={`transition-all duration-500 ${
            animationPhase !== 'logo' ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}>
            <img
              src="/images/Logo simple.png"
              alt="SMED Logo"
              className="w-20 h-20 object-contain drop-shadow-2xl"
            />
          </div>
          {/* Ping effect */}
          <div className="absolute inset-0 border-2 border-primary/30 rounded-lg animate-ping"></div>
        </div>

        {/* Title SMART EDUCATION */}
        <div className="overflow-hidden max-w-xs">
          <h1 className={`text-2xl font-black text-primary tracking-wider transition-all duration-700 transform ${
            animationPhase === 'title' || animationPhase === 'subtitle' || animationPhase === 'loading' || animationPhase === 'exit'
              ? 'translate-y-0 opacity-100'
              : 'translate-y-full opacity-0'
          }`}>
            SMART EDUCATION
          </h1>
        </div>

        {/* Subtitle */}
        <div className={`transition-all duration-500 max-w-sm ${
          animationPhase === 'subtitle' || animationPhase === 'loading' || animationPhase === 'exit'
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4'
        }`}>
          <p className="text-xs text-gray-500 dark:text-gray-400 tracking-wider font-medium">
            Une éducation de qualité pour tous
          </p>
        </div>

        {/* Progress Bar */}
        <div className={`w-full transition-all duration-300 ${
          animationPhase === 'loading' || animationPhase === 'exit'
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-95'
        }`}>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        </div>
      </div>

      {/* Signature */}
      <div className="pb-8 flex justify-center">
        <div className={`flex items-center gap-1.5 text-xs text-gray-500 transition-all duration-300 ${
          animationPhase === 'loading' || animationPhase === 'exit'
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4'
        }`}>
          <span>Website</span>
          <span className="font-['Pinyon_Script'] text-lg text-primary italic pt-0.5">by</span>
          <span className="font-semibold text-gray-400 tracking-wide">Trigenys Group</span>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;