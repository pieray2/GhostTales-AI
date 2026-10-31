import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { GhostIllustration } from './GhostIllustration';
import { Cpu, Sparkles } from 'lucide-react';

const SPOOKY_PHRASES = [
  'Awakening the machine phantoms...',
  'Google Gemma is weaving your spooky narrative...',
  'Interpreting haunted memory registers...',
  'Compiling ectoplasmic static from port 666...',
  'Whispering eerie secrets into digital circuits...',
  'Binding the digital ghosts to parchment...',
];

export const LoadingGrimoire: React.FC = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % SPOOKY_PHRASES.length);
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full my-8 p-8 sm:p-12 bg-[#120824]/90 border border-purple-500/40 rounded-3xl flex flex-col items-center justify-center text-center shadow-glow-purple relative overflow-hidden">
      {/* Background magical pulse */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-purple-950/20 to-transparent pointer-events-none" />

      {/* Ghost casting spells */}
      <div className="relative mb-6">
        <GhostIllustration mood="thinking" size="lg" />
      </div>

      {/* Animated status text */}
      <div className="relative z-10 max-w-md">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/50 border border-purple-500/30 text-purple-200 text-xs font-code mb-3">
          <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Inference: Google Gemma (Open-Weight)</span>
        </div>

        <motion.p
          key={phraseIndex}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="text-lg sm:text-xl font-heading font-semibold text-purple-100 mb-2"
        >
          {SPOOKY_PHRASES[phraseIndex]}
        </motion.p>

        <p className="text-xs text-purple-400/80">
          The spirits take about 5 to 10 seconds to conjure a full original tale.
        </p>
      </div>

      {/* Glowing progress line */}
      <div className="w-48 h-1 bg-purple-950 rounded-full mt-6 overflow-hidden relative">
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-1/2 h-full bg-gradient-to-r from-transparent via-purple-400 to-transparent"
        />
      </div>
    </div>
  );
};
