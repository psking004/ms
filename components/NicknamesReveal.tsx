
import React, { useState, useEffect } from 'react';
import { NICKNAMES } from '../constants';

const NicknamesReveal: React.FC = () => {
  const [visibleIndex, setVisibleIndex] = useState(-1);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleIndex(prev => (prev < NICKNAMES.length - 1 ? prev + 1 : prev));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center">
      <p className="text-sm uppercase tracking-widest opacity-60 mb-8">She has many names in this world...</p>
      <div className="flex flex-col gap-6 items-center">
        {NICKNAMES.map((name, i) => (
          <div 
            key={i}
            className={`text-4xl md:text-6xl font-serif transition-all duration-1000 
              ${i <= visibleIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
              ${i === visibleIndex ? 'text-rose-500 scale-110 drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]' : 'text-slate-800'}`}
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NicknamesReveal;
