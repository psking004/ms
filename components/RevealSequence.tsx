
import React, { useEffect, useState, useRef } from 'react';

const RevealSequence: React.FC = () => {
  const [step, setStep] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 3000),
      setTimeout(() => setStep(2), 7000),
      setTimeout(() => setStep(3), 11000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const isMobile = window.innerWidth < 768;
    let particles: any[] = [];
    const count = isMobile ? 150 : 300;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * (isMobile ? 10 : 15),
        vy: (Math.random() - 0.5) * (isMobile ? 10 : 15),
        size: Math.random() * (isMobile ? 3 : 5) + 2,
        color: `hsl(${Math.random() * 30 + 340}, 100%, 65%)`,
        opacity: 1
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(2, 6, 23, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const heartScale = isMobile ? 100 : 160;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;
        
        if (step === 1) {
           const t = Math.random() * Math.PI * 2;
           const targetX = canvas.width / 2 + heartScale * Math.pow(Math.sin(t), 3);
           const targetY = canvas.height / 2 - (heartScale * 0.8 * Math.cos(t) - heartScale * 0.3 * Math.cos(2*t) - heartScale * 0.12 * Math.cos(3*t) - heartScale * 0.06 * Math.cos(4*t));
           p.vx = (targetX - p.x) * 0.05;
           p.vy = (targetY - p.y) * 0.05;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [step]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-slate-950 px-4">
      <canvas ref={canvasRef} className="absolute inset-0" />
      
      <div className="relative z-10 text-center w-full">
        {step >= 2 && (
          <div className="space-y-4">
            <h2 className="text-4xl md:text-8xl font-serif text-rose-300 animate-[nameReveal_3s_ease-out_forwards] break-words">
              Muthu Sundari
            </h2>
            {step >= 3 && (
               <div className="space-y-3 mt-8 md:mt-12 max-w-lg mx-auto px-4">
                 <p className="text-xl md:text-2xl font-serif italic text-white/90 animate-[type_2s_steps(20)_forwards] overflow-hidden whitespace-nowrap mx-auto">She said yes...</p>
                 <p className="text-lg md:text-xl font-serif italic text-white/70 delay-1000 animate-[type_2s_steps(20)_forwards] overflow-hidden whitespace-nowrap mx-auto">In every lifetime.</p>
                 <p className="text-xl md:text-2xl font-serif mt-6 md:mt-8 text-rose-200 animate-[fadeIn_2s_ease-in_forwards]">Forever Yours, Partha</p>
               </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes nameReveal {
          from { opacity: 0; letter-spacing: 15px; filter: blur(10px); }
          to { opacity: 1; letter-spacing: 2px; filter: blur(0); }
        }
        @keyframes type {
          from { width: 0; opacity: 0; }
          to { width: 100%; opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default RevealSequence;
