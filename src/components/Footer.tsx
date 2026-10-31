import React from 'react';
import { Ghost, Heart, Cpu, Sparkles, Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-purple-900/40 bg-[#080312] mt-20 py-10 px-4 text-center text-xs text-purple-300/60 font-normal">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Ghost icon & divider */}
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-purple-800" />
          <Ghost className="w-5 h-5 text-purple-400 animate-pulse" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-purple-800" />
        </div>

        <p className="text-sm font-heading text-purple-200">
          GhostTales AI • Halloween & The Ghost in the Machine
        </p>

        <p className="max-w-md mx-auto text-xs text-purple-400/70 leading-relaxed">
          Crafted with Google's open-weight <strong className="text-purple-200 font-semibold">Gemma</strong> models.
          All stories are summoned via secure server-side inference.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-purple-400/80 pt-2 font-code">
          <span className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Open-Weight Gemma 4</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Halloween 2026</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-purple-400" />
            <span>No Browser API Keys Exposed</span>
          </span>
        </div>
      </div>
    </footer>
  );
};
