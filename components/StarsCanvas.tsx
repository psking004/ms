
import React, { useRef, useEffect } from 'react';
import { AppPhase, Particle } from '../types';

interface StarsCanvasProps {
  phase: AppPhase;
}

const StarsCanvas: React.FC<StarsCanvasProps> = ({ phase }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  // Fix: Provide initial value to useRef to avoid "Expected 1 arguments, but got 0" error in strict TypeScript
  const requestRef = useRef<number | null>(null);

  const initParticles = (width: number, height: number) => {
    const count = 150;
    particles.current = [];
    for (let i = 0; i < count; i++) {
      particles.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.7 + 0.3,
        color: '#ffffff',
        type: 'star'
      });
    }
  };

  const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, opacity: number) => {
    ctx.save();
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.scale(size / 10, size / 10);
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-5, -5, -10, 0, 0, 10);
    ctx.bezierCurveTo(10, 0, 5, -5, 0, 0);
    ctx.fillStyle = color;
    ctx.globalAlpha = opacity;
    ctx.fill();
    ctx.restore();
  };

  const animate = (time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.current.forEach((p) => {
      p.x += p.speedX;
      p.y += p.speedY;

      // Wrap around
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      if (phase === AppPhase.INITIAL) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      } else {
        // Transition to hearts
        const heartColor = phase === AppPhase.REVEALED ? '#fb7185' : '#ef4444';
        drawHeart(ctx, p.x, p.y, p.size * 3, heartColor, p.opacity);
      }
    });

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas.width, canvas.height);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [phase]);

  return <canvas ref={canvasRef} className="opacity-60" />;
};

export default StarsCanvas;
