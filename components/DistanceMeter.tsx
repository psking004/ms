
import React, { useState, useEffect, useRef } from 'react';

const DistanceMeter: React.FC = () => {
  const [distance, setDistance] = useState(1430);
  const [isGlitched, setIsGlitched] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        startCounting();
      }
    }, { threshold: 0.5 });

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const startCounting = () => {
    let current = 1430;
    const interval = setInterval(() => {
      if (current > 0) {
        current -= Math.floor(Math.random() * 20) + 5;
        if (current < 0) current = 0;
        setDistance(current);
      } else {
        clearInterval(interval);
        setTimeout(() => setIsGlitched(true), 1000);
      }
    }, 30);
  };

  return (
    <div ref={sectionRef} className="text-center">
      <div className="text-sm uppercase tracking-widest mb-4 opacity-70">Long Distance Connection</div>
      <div className="text-6xl md:text-8xl font-serif min-h-[120px] flex items-center justify-center">
        {!isGlitched ? (
          <span className="tabular-nums">{distance} <small className="text-3xl">km</small></span>
        ) : (
          <span className="animate-[glitch_0.5s_infinite] text-rose-500">
            Distance cannot measure love.
          </span>
        )}
      </div>
      <div className="mt-8 max-w-md mx-auto italic text-lg opacity-80">
        "I count the kilometers only because they are steps I will eventually take to find you."
      </div>
      <style>{`
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
      `}</style>
    </div>
  );
};

export default DistanceMeter;
