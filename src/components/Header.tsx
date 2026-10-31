import React from 'react';
import { Ghost, BookOpen, Sparkles, Cpu, Radio } from 'lucide-react';
import { spookyAudio } from '../utils/audio';

interface HeaderProps {
  savedCount: number;
  onOpenGrimoire: () => void;
  isAmbientActive: boolean;
  onToggleAmbient: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  savedCount,
  onOpenGrimoire,
  isAmbientActive,
  onToggleAmbient,
}) => {
  return (
    <header className="w-full border-b border-purple-900/50 bg-[#0a0414]/80 backdrop-blur-xl sticky top-0 z-40 transition-all">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-purple-700 via-fuchsia-600 to-amber-500 p-0.5 shadow-glow-purple flex items-center justify-center">
              <div className="w-full h-full bg-[#0d051c] rounded-[14px] flex items-center justify-center">
                <Ghost className="w-6 h-6 text-purple-300 group-hover:scale-110 transition-transform duration-200" />
              </div>
            </div>
            {/* Jack-o'-lantern dot */}
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-orange-500 border-2 border-black flex items-center justify-center text-[8px]">
              🎃
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black font-heading tracking-tight text-white flex items-center gap-1.5">
                <span>GhostTales</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400">
                  AI
                </span>
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-emerald-300 bg-emerald-950/70 border border-emerald-500/40 px-2 py-0.5 rounded-full font-code">
                <Cpu className="w-3 h-3 text-emerald-400" />
                Gemma Model
              </span>
            </div>
            <p className="text-[11px] text-purple-300/70 hidden sm:block">
              Halloween & "Ghost in the Machine" Spooky Story Generator
            </p>
          </div>
        </div>

        {/* Right Navigation & Tools */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Ambient Sound shortcut */}
          <button
            type="button"
            onClick={onToggleAmbient}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all ${
              isAmbientActive
                ? 'bg-purple-800 text-white border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                : 'bg-purple-950/60 text-purple-300 hover:text-white border-purple-800/60'
            }`}
            title="Toggle Spooky Ambient Sound (Web Audio Synthesizer)"
          >
            <Radio className={`w-3.5 h-3.5 ${isAmbientActive ? 'animate-pulse text-amber-300' : ''}`} />
            <span className="hidden md:inline">{isAmbientActive ? 'Drone Active' : 'Atmosphere'}</span>
          </button>

          {/* Grimoire / History Button */}
          <button
            type="button"
            onClick={onOpenGrimoire}
            className="px-3.5 py-1.5 rounded-xl bg-purple-900/60 hover:bg-purple-800/80 text-purple-200 hover:text-white border border-purple-700/50 text-xs font-semibold flex items-center gap-2 transition-all active:scale-95"
          >
            <BookOpen className="w-4 h-4 text-amber-300" />
            <span className="hidden xs:inline">Grimoire</span>
            {savedCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] flex items-center justify-center font-bold">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
