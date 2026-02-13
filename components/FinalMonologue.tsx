
import React from 'react';
import { POEM } from '../constants';

const FinalMonologue: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto text-center px-4 py-12 md:py-20 space-y-16 md:space-y-24 min-h-screen">
      
      {/* Featured Narrative Quote */}
      <div className="relative group max-w-2xl">
        <div className="absolute -inset-4 bg-gradient-to-r from-rose-100/50 to-orange-100/50 blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
        <div className="relative bg-white/40 backdrop-blur-sm p-8 md:p-12 rounded-[2.5rem] border border-white/60 shadow-inner">
          <p className="text-2xl md:text-4xl font-serif italic leading-tight text-rose-950 font-medium tracking-tight">
            "Our love is not just a chapter in a book, but the very ink with which 
            I write my soul's purpose."
          </p>
        </div>
      </div>

      {/* Poem Section with Enhanced Spacing */}
      <div className="relative w-full">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 text-4xl md:text-5xl text-rose-400/30 select-none pointer-events-none italic font-serif">
          ❦
        </div>
        
        <div className="flex flex-col items-center justify-center space-y-4 md:space-y-7">
          {POEM.map((line, i) => (
            <p 
              key={i} 
              className="text-lg md:text-3xl font-serif text-rose-900/90 italic tracking-wide leading-relaxed px-4 max-w-3xl"
            >
              {line}
            </p>
          ))}
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-12 text-4xl md:text-5xl text-rose-400/30 select-none pointer-events-none italic font-serif">
          ❦
        </div>
      </div>

      {/* Final Signature Section - Balanced Layout */}
      <div className="flex flex-col items-center justify-center space-y-10 md:space-y-14 w-full pt-12">
        <div className="flex flex-col items-center space-y-4">
          <p className="text-3xl md:text-6xl font-serif text-rose-950 uppercase tracking-[0.3em] md:tracking-[0.5em] font-bold drop-shadow-sm">
            Muthu Sundari
          </p>
          <div className="h-[2px] w-24 md:w-40 bg-gradient-to-r from-transparent via-rose-400 to-transparent opacity-60" />
          <p className="text-base md:text-2xl text-rose-800/80 italic font-light tracking-widest">
            Across lifetimes • Every storm • Forever
          </p>
        </div>
        
        <div className="relative inline-block group">
          <div className="absolute -inset-8 bg-rose-200/20 blur-3xl rounded-full animate-pulse" />
          <h2 className="relative text-5xl md:text-8xl font-serif italic text-rose-900 drop-shadow-md animate-[gentleGlow_5s_infinite_ease-in-out]">
            Forever Yours, Partha
          </h2>
        </div>
      </div>

      {/* Extra space for scrolling comfort */}
      <div className="h-20" />

      <style>{`
        @keyframes gentleGlow {
          0%, 100% { 
            opacity: 0.9; 
            transform: scale(1) translateY(0); 
            text-shadow: 0 0 10px rgba(225, 29, 72, 0);
          }
          50% { 
            opacity: 1; 
            transform: scale(1.03) translateY(-5px); 
            text-shadow: 0 0 30px rgba(225, 29, 72, 0.15);
          }
        }
      `}</style>
    </div>
  );
};

export default FinalMonologue;
