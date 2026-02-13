
import React, { useState, useEffect } from 'react';
import { NEXT_MEETING_DATE } from '../constants';

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = NEXT_MEETING_DATE.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center px-4 w-full">
      <h3 className="text-xl md:text-2xl font-serif mb-6 md:mb-8 italic">Until I hold you in my arms again...</h3>
      <div className="flex gap-4 md:gap-10 justify-center">
        {Object.entries(timeLeft).map(([label, value]) => (
          <div key={label} className="flex flex-col items-center">
            <span className="text-3xl md:text-7xl font-serif text-rose-600 tabular-nums">
              {value.toString().padStart(2, '0')}
            </span>
            <span className="text-[10px] md:text-xs uppercase tracking-widest opacity-60">{label}</span>
          </div>
        ))}
      </div>
      <p className="mt-8 md:mt-12 text-base md:text-lg italic opacity-80">"And every second, I love you more."</p>
    </div>
  );
};

export default Countdown;
