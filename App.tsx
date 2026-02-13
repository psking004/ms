
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AppPhase } from './types';
import StarsCanvas from './components/StarsCanvas';
import SectionWrapper from './components/SectionWrapper';
import DistanceMeter from './components/DistanceMeter';
import MemorySection from './components/MemorySection';
import ProposeButton from './components/ProposeButton';
import RevealSequence from './components/RevealSequence';
import NicknamesReveal from './components/NicknamesReveal';
import ParallelUniverse from './components/ParallelUniverse';
import HiddenSecret from './components/HiddenSecret';
import FinalMonologue from './components/FinalMonologue';

const App: React.FC = () => {
  const [phase, setPhase] = useState<AppPhase>(AppPhase.INITIAL);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleStartReveal = useCallback(() => {
    setPhase(AppPhase.TRANSFORMING);
    // Smooth scroll to reveal sequence
    setTimeout(() => {
      setPhase(AppPhase.REVEALED);
    }, 15000); // Duration of the whole transformation
  }, []);

  useEffect(() => {
    // Initial audio setup (requires user interaction usually)
    const playAudio = () => setIsAudioPlaying(true);
    window.addEventListener('click', playAudio, { once: true });
    return () => window.removeEventListener('click', playAudio);
  }, []);

  return (
    <div className={`relative min-h-screen transition-colors duration-[3000ms] ${phase === AppPhase.REVEALED ? 'bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 text-rose-950' : 'bg-slate-950 text-slate-100'}`}>
      
      {/* Background Layer */}
      <StarsCanvas phase={phase} />

      {/* Audio Placeholder (UX requirement) */}
      <div className="fixed top-6 right-6 z-50">
        <button 
          onClick={() => setIsAudioPlaying(!isAudioPlaying)}
          className="p-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all shadow-lg"
        >
          {isAudioPlaying ? '🔊' : '🔇'}
        </button>
      </div>

      <main className="relative z-10 snap-y snap-mandatory h-screen overflow-y-scroll hidden-scrollbar" ref={scrollContainerRef}>
        
        {/* Section 1: Opening */}
        <SectionWrapper id="opening">
          <div className="max-w-3xl text-center px-6">
            <h1 className="text-4xl md:text-6xl font-serif mb-8 opacity-0 animate-[fadeIn_2s_ease-out_forwards]">
              My Dear Muthu Sundari,
            </h1>
            <p className="text-xl md:text-2xl italic font-light leading-relaxed opacity-0 animate-[fadeIn_2s_ease-out_1s_forwards]">
              "Every night, I look at the moon and wonder if you're looking at it too. The distance is a physical ache, a silence that only your voice can fill. Without you, the stars are just cold lights in a vast, empty sky."
            </p>
          </div>
        </SectionWrapper>

        {/* Section 2: Distance */}
        <SectionWrapper id="distance">
          <DistanceMeter />
        </SectionWrapper>

        {/* Section 3: Memory */}
        <SectionWrapper id="memory">
          <MemorySection />
        </SectionWrapper>

        {/* Section 4: The Proposal Interaction */}
        <SectionWrapper id="propose">
          <ProposeButton onTrigger={handleStartReveal} />
        </SectionWrapper>

        {phase === AppPhase.REVEALED && (
          <>
            {/* Section 5: Nicknames */}
            <SectionWrapper id="nicknames">
              <NicknamesReveal />
            </SectionWrapper>

            {/* Section 6: Parallel Universe */}
            <SectionWrapper id="universe">
              <ParallelUniverse />
            </SectionWrapper>

            {/* Section 7: Final Monologue */}
            <SectionWrapper id="final">
              <FinalMonologue />
            </SectionWrapper>
          </>
        )}
      </main>

      {/* Overlay Sequence for Transformation */}
      {phase === AppPhase.TRANSFORMING && (
        <RevealSequence />
      )}

      {/* Section 8: Hidden Secret */}
      <HiddenSecret />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default App;
