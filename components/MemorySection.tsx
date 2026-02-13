
import React from 'react';

const MemorySection: React.FC = () => {
  return (
    <div className="max-w-4xl w-full grid md:grid-cols-2 gap-12 items-center">
      <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-2xl group border border-white/10">
        <img 
          src="https://picsum.photos/seed/proposal/800/1066" 
          alt="Proposal Memory" 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <div className="text-3xl font-serif">22nd December 2025</div>
          <div className="text-sm opacity-70 italic">The day the world changed</div>
        </div>
      </div>
      
      <div className="space-y-6">
        <h2 className="text-4xl font-serif mb-4 leading-tight">The Moment Time Stood Still</h2>
        <p className="text-lg opacity-90 leading-relaxed font-light">
          "The air was crisp, the lights were soft, and my heart was hammering against my ribs. 
          The distance between our cities suddenly felt like nothing compared to the gravity 
          of the words I was about to say."
        </p>
        <p className="text-lg opacity-90 leading-relaxed font-light italic">
          "I didn't just ask you to be mine. I asked you to let me spend a lifetime 
          proving that you're the best thing that ever happened to this universe."
        </p>
        <div className="flex gap-4">
          <div className="h-[1px] w-20 bg-rose-500/50 mt-4 self-start" />
          <p className="text-sm opacity-60 uppercase tracking-widest">A Promise Etched in Time</p>
        </div>
      </div>
    </div>
  );
};

export default MemorySection;
