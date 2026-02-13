
import React, { useState } from 'react';

const HiddenSecret: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-12 left-12 z-[200]">
      <button 
        onClick={() => setIsOpen(true)}
        className="text-3xl hover:scale-125 transition-transform animate-pulse"
      >
        ❤️
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/90 backdrop-blur-lg flex items-center justify-center p-6 z-[201]"
          onClick={() => setIsOpen(false)}
        >
          <div className="max-w-md bg-white p-12 rounded-lg shadow-2xl relative text-slate-900 transform rotate-1">
             <div className="absolute top-0 left-0 w-full h-4 bg-rose-500 rounded-t-lg" />
             <h4 className="text-2xl font-serif mb-4">The Secret File</h4>
             <p className="font-light italic leading-relaxed">
               "If you found this, know that I'm probably thinking about you right now. 
               Not because I have to, but because my mind has a permanent tab open 
               for everything that involves your smile. You are the logic behind 
               my happiest days."
             </p>
             <p className="mt-6 font-serif text-right">— P.</p>
             <button className="mt-8 text-xs uppercase tracking-widest text-rose-500 font-bold">Close Secret</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HiddenSecret;
