
import React, { useState, useRef, useEffect } from 'react';

interface ProposeButtonProps {
  onTrigger: () => void;
}

const NO_TEXTS = [
  "No", "Nope!", "Catch me", "Not today", "Try again", 
  "Maybe later", "Error 404", "Nice try!", "Too slow!", "Wait!",
  "Are you sure?", "Think twice!", "Pondatii please?", "I'm shy!",
  "Wrong button!", "Oops!", "Distance is calling!", "Is that a bird?"
];

const ProposeButton: React.FC<ProposeButtonProps> = ({ onTrigger }) => {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  // Initial position: noticeably offset to the right
  const [noButtonPos, setNoButtonPos] = useState({ x: 120, y: 0 });
  const [noButtonText, setNoButtonText] = useState("No");
  const [isBoing, setIsBoing] = useState(false);
  
  const holdTimer = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // On small screens, start closer so it doesn't overflow immediately
    if (window.innerWidth < 768) {
      setNoButtonPos({ x: 80, y: 120 });
    }
  }, []);

  const startHold = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsHolding(true);
    let start = Date.now();
    holdTimer.current = window.setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / 3000, 1);
      setProgress(p);
      if (p >= 1) {
        if (holdTimer.current) clearInterval(holdTimer.current);
        onTrigger();
      }
    }, 10);
  };

  const endHold = () => {
    setIsHolding(false);
    setProgress(0);
    if (holdTimer.current) clearInterval(holdTimer.current);
  };

  const moveNoButton = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const isMobile = window.innerWidth < 768;
    
    // Constraints to keep button visible in container
    const padding = isMobile ? 60 : 120; 
    // On mobile, the avoidance radius must be smaller than the screen width
    const minAvoidance = isMobile ? Math.min(120, rect.width * 0.35) : 280;
    
    const maxX = (rect.width / 2) - padding;
    const maxY = (rect.height / 2) - padding;

    let newX = 0;
    let newY = 0;
    let attempts = 0;
    let valid = false;

    while (attempts < 200 && !valid) {
      // Pick random point in container coordinate space (center is 0,0)
      newX = (Math.random() - 0.5) * (rect.width - padding * 2);
      newY = (Math.random() - 0.5) * (rect.height - padding * 2);

      const distanceToCenter = Math.sqrt(newX * newX + newY * newY);
      const distanceToPrevious = Math.sqrt(Math.pow(newX - noButtonPos.x, 2) + Math.pow(newY - noButtonPos.y, 2));

      // Validation: Far from center, far from prev pos, and within bounds
      if (distanceToCenter > minAvoidance && distanceToPrevious > (isMobile ? 100 : 200) && Math.abs(newX) < maxX && Math.abs(newY) < maxY) {
        valid = true;
      }
      attempts++;
    }

    if (!valid) {
      newX = Math.random() > 0.5 ? maxX : -maxX;
      newY = Math.random() > 0.5 ? maxY : -maxY;
    }
    
    setNoButtonPos({ x: newX, y: newY });
    
    let nextText = noButtonText;
    while (nextText === noButtonText) {
      nextText = NO_TEXTS[Math.floor(Math.random() * NO_TEXTS.length)];
    }
    setNoButtonText(nextText);
    
    setIsBoing(true);
    setTimeout(() => setIsBoing(false), 400);
  };

  return (
    <div ref={containerRef} className="relative flex flex-col items-center justify-center w-full h-full max-w-6xl mx-auto overflow-hidden px-4">
      {/* Header Text */}
      <div className="text-center space-y-4 z-10 select-none mb-8 md:mb-12">
        <h3 className="text-3xl md:text-6xl font-serif opacity-90 italic drop-shadow-sm">The choice is always yours...</h3>
        <p className="text-xs md:text-sm uppercase tracking-[0.4em] opacity-50">Hold your heart's desire to proceed</p>
      </div>

      {/* Action Area */}
      <div className="relative flex items-center justify-center w-full flex-1 min-h-[350px]">
        
        {/* Central 'Yes' Button */}
        <div className="relative z-20">
          <div className="absolute inset-[-30px] md:inset-[-50px] pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-rose-300 rounded-full animate-pulse"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `sparkle-float ${2.5 + Math.random() * 3}s infinite ease-in-out`,
                  animationDelay: `${Math.random() * 2}s`,
                  opacity: 0.5
                }}
              />
            ))}
          </div>

          <button
            onMouseDown={startHold}
            onMouseUp={endHold}
            onMouseLeave={endHold}
            onTouchStart={startHold}
            onTouchEnd={endHold}
            className={`relative group px-8 md:px-16 py-6 md:py-10 rounded-full border-2 border-rose-400/30 overflow-hidden transition-all duration-500 
              ${isHolding ? 'scale-105 md:scale-110 shadow-[0_0_80px_rgba(244,63,94,0.5)]' : 'hover:border-rose-400/60 shadow-xl'}`}
          >
            <div 
              className="absolute inset-0 bg-rose-500/40 origin-left transition-transform duration-100 ease-linear" 
              style={{ transform: `scaleX(${progress})` }}
            />
            
            <span className="relative z-10 text-lg md:text-4xl font-serif tracking-widest text-white drop-shadow-lg block whitespace-nowrap">
              {progress >= 1 ? "Forever Yours" : "Will you choose me?"}
            </span>
          </button>
        </div>

        {/* Playful 'No' Button */}
        <button
          onMouseEnter={moveNoButton}
          onClick={moveNoButton}
          onTouchStart={(e) => { e.preventDefault(); moveNoButton(); }}
          style={{
            transform: `translate(calc(-50% + ${noButtonPos.x}px), calc(-50% + ${noButtonPos.y}px))`,
            position: 'absolute',
            left: '50%',
            top: '50%',
            transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
            zIndex: 30,
            opacity: 1,
            cursor: 'pointer'
          }}
          className={`px-6 md:px-10 py-3 md:py-4 rounded-full border-2 border-slate-300/40 text-slate-200 font-serif italic bg-slate-800/40 backdrop-blur-xl transition-all hover:border-slate-100/60 whitespace-nowrap shadow-xl ${isBoing ? 'animate-boing' : ''}`}
        >
          {noButtonText}
        </button>
      </div>

      {/* Instruction Footer */}
      <div className="text-sm md:text-base italic opacity-40 z-10 select-none mt-8 md:mt-12 text-center">
        "Hold this like you'd hold my hand."
      </div>

      <style>{`
        @keyframes sparkle-float {
          0%, 100% { transform: translate(0, 0) scale(0); opacity: 0; }
          50% { transform: translate(${Math.random() * 30 - 15}px, ${-30 - Math.random() * 30}px) scale(1.2); opacity: 0.8; }
        }
        @keyframes boing {
          0% { transform: translate(calc(-50% + ${noButtonPos.x}px), calc(-50% + ${noButtonPos.y}px)) scale(1); }
          50% { transform: translate(calc(-50% + ${noButtonPos.x}px), calc(-50% + ${noButtonPos.y}px)) scale(1.2); }
          100% { transform: translate(calc(-50% + ${noButtonPos.x}px), calc(-50% + ${noButtonPos.y}px)) scale(1); }
        }
        .animate-boing {
          animation: boing 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
    </div>
  );
};

export default ProposeButton;
