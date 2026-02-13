
import React, { useState } from 'react';

const ParallelUniverse: React.FC = () => {
  const [isMerged, setIsMerged] = useState(false);

  return (
    <div 
      onClick={() => setIsMerged(!isMerged)}
      className="w-full max-w-5xl h-[50vh] md:h-[60vh] flex relative group overflow-hidden rounded-3xl border border-rose-200/50 shadow-2xl cursor-pointer"
    >
      {/* Loneliness Side */}
      <div className={`flex-1 bg-slate-900 flex flex-col items-center justify-center p-6 md:p-8 transition-transform duration-1000 ${isMerged ? '-translate-x-full' : 'group-hover:-translate-x-full'}`}>
        <div className="text-3xl md:text-4xl mb-4">🌑</div>
        <p className="text-slate-400 italic text-center text-sm md:text-base">Without you, time is a desert where I wander alone.</p>
      </div>

      {/* Presence Side */}
      <div className={`flex-1 bg-rose-50 flex flex-col items-center justify-center p-6 md:p-8 transition-transform duration-1000 ${isMerged ? 'translate-x-full' : 'group-hover:translate-x-full'}`}>
        <div className="text-3xl md:text-4xl mb-4">✨</div>
        <p className="text-rose-900 italic text-center text-sm md:text-base">With you, every breath feels like a sunrise.</p>
      </div>

      {/* Merged Heart Center */}
      <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-1000 delay-500 ${isMerged ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
        <div className="text-[8rem] md:text-[12rem] animate-bounce text-rose-500">❤️</div>
        <div className="absolute text-xl md:text-3xl font-serif text-white mt-12 drop-shadow-lg">We are one.</div>
      </div>
      
      <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] md:text-xs uppercase tracking-[0.2em] opacity-40 transition-opacity ${isMerged ? 'opacity-0' : 'group-hover:opacity-0'}`}>
        {window.innerWidth < 768 ? 'Tap to see our worlds merge' : 'Hover to see our worlds merge'}
      </div>
    </div>
  );
};

export default ParallelUniverse;
