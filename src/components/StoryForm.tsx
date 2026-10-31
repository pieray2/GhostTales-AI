import React, { useState } from 'react';
import { Skull, Compass, Ghost, Sparkles, Wand2, RefreshCw, Cpu, Flame } from 'lucide-react';
import { StoryCategory, StoryGenerationParams, StoryLength, SpookinessLevel } from '../types/story';

interface StoryFormProps {
  onGenerate: (params: StoryGenerationParams) => void;
  isLoading: boolean;
  onPromptChange?: (prompt: string) => void;
}

const CATEGORIES: {
  id: StoryCategory;
  name: string;
  icon: React.ElementType;
  desc: string;
  color: string;
  badgeBg: string;
  accentBorder: string;
}[] = [
  {
    id: 'Horror',
    name: 'Horror',
    icon: Skull,
    desc: 'Creeping dread, visceral terror & spine-tingling shocks',
    color: 'text-rose-400',
    badgeBg: 'bg-rose-950/60',
    accentBorder: 'hover:border-rose-500/60 peer-checked:border-rose-500 peer-checked:shadow-[0_0_20px_rgba(244,63,94,0.35)]',
  },
  {
    id: 'Mystery',
    name: 'Mystery',
    icon: Compass,
    desc: 'Cryptic anomalies, haunted cipher logs & dark secrets',
    color: 'text-amber-400',
    badgeBg: 'bg-amber-950/60',
    accentBorder: 'hover:border-amber-500/60 peer-checked:border-amber-500 peer-checked:shadow-[0_0_20px_rgba(245,158,11,0.35)]',
  },
  {
    id: 'Supernatural',
    name: 'Supernatural',
    icon: Ghost,
    desc: 'Phantoms crossing the veil & machine poltergeists',
    color: 'text-purple-400',
    badgeBg: 'bg-purple-950/60',
    accentBorder: 'hover:border-purple-500/60 peer-checked:border-purple-500 peer-checked:shadow-[0_0_20px_rgba(168,85,247,0.35)]',
  },
];

const MACHINE_TROPES = [
  'Haunted Server Farm',
  '90s Dial-Up Ghost',
  'Smart Home Poltergeist',
  'Cursed Code Repository',
  'Autonomous Hearse',
  'Arcade Cabinet Curse',
  'Phantom Radio Signal',
  'Neural Chip Apparition',
];

const SAMPLE_STARTERS = [
  'A vintage 1999 cathode ray monitor in an abandoned computer lab powers on at 3:00 AM, broadcasting a live camera feed of whoever is reading this prompt...',
  'An IT engineer investigating a mysterious memory leak discovers that 13MB of RAM has been occupied by an antique Victorian ghost who speaks in ASCII art.',
  'A smart home system begins locking doors and whispering through the baby monitor, claiming the digital house was built on an ancient server burial ground.',
  'A programmer receives a pull request on Halloween night containing code that predicts tragic events three minutes before they happen.',
  'An old tape drive found in a flooded cellar begins singing a haunting nursery rhyme whenever the room temperature drops below freezing.',
];

export const StoryForm: React.FC<StoryFormProps> = ({ onGenerate, isLoading, onPromptChange }) => {
  const [prompt, setPrompt] = useState('');
  const [category, setCategory] = useState<StoryCategory>('Horror');
  const [length, setLength] = useState<StoryLength>('standard');
  const [spookiness, setSpookiness] = useState<SpookinessLevel>('eerie');
  const [selectedTrope, setSelectedTrope] = useState<string>('');

  const handlePromptChange = (val: string) => {
    setPrompt(val);
    if (onPromptChange) onPromptChange(val);
  };

  const handleInspireMe = () => {
    const randomStarter = SAMPLE_STARTERS[Math.floor(Math.random() * SAMPLE_STARTERS.length)];
    handlePromptChange(randomStarter);
  };

  const handleTropeClick = (trope: string) => {
    if (selectedTrope === trope) {
      setSelectedTrope('');
    } else {
      setSelectedTrope(trope);
      if (!prompt.includes(trope)) {
        const separator = prompt.trim() ? ' ' : '';
        handlePromptChange(`${prompt.trim()}${separator}[Theme: ${trope}]`);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    onGenerate({
      prompt: prompt.trim(),
      category,
      length,
      spookiness,
      atmosphere: selectedTrope ? `Includes theme: ${selectedTrope}` : undefined,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-[#120822]/90 border border-purple-500/30 rounded-3xl p-5 sm:p-7 md:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden transition-all duration-300"
    >
      {/* Decorative cyber-gothic corners */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-purple-500/50 rounded-tl-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-purple-500/50 rounded-tr-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-purple-500/50 rounded-bl-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-purple-500/50 rounded-br-3xl pointer-events-none" />

      {/* Step 1: Select Category */}
      <div className="mb-6">
        <label className="block text-xs uppercase tracking-widest font-semibold text-purple-300 mb-3 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            1. Choose Your Realm of Terror
          </span>
          <span className="text-[11px] text-purple-400/80 font-normal">Select 1 of 3</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = category === cat.id;

            return (
              <label
                key={cat.id}
                className={`relative flex flex-col p-4 rounded-2xl cursor-pointer border transition-all duration-200 select-none ${
                  isSelected
                    ? `bg-purple-950/70 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)]`
                    : 'bg-[#180d2d]/60 border-purple-900/50 hover:bg-[#1f103b]/80 hover:border-purple-600/50'
                }`}
              >
                <input
                  type="radio"
                  name="story_category"
                  value={cat.id}
                  checked={isSelected}
                  onChange={() => setCategory(cat.id)}
                  className="sr-only"
                />

                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`inline-flex items-center justify-center p-2 rounded-xl ${cat.badgeBg} ${cat.color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </span>
                  <span
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-purple-400 bg-purple-400' : 'border-purple-700'
                    }`}
                  >
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                  </span>
                </div>

                <div className="font-semibold text-sm sm:text-base text-white tracking-wide">{cat.name}</div>
                <p className="text-xs text-purple-300/70 mt-1 line-clamp-2 leading-relaxed">{cat.desc}</p>
              </label>
            );
          })}
        </div>
      </div>

      {/* Step 2: Story Idea Input */}
      <div className="mb-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <label htmlFor="story-prompt" className="text-xs uppercase tracking-widest font-semibold text-purple-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            2. Describe Your Spooky Story Idea
          </label>

          <button
            type="button"
            onClick={handleInspireMe}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-purple-300 hover:text-white bg-purple-900/40 hover:bg-purple-800/60 border border-purple-500/30 px-3 py-1 rounded-full transition-all duration-200 active:scale-95"
            title="Randomize a spooky story prompt"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
            <span>Whisper an Idea</span>
          </button>
        </div>

        <div className="relative">
          <textarea
            id="story-prompt"
            value={prompt}
            onChange={(e) => handlePromptChange(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={4}
            maxLength={1000}
            placeholder="E.g., An antique 1980s computer terminal in an attic powers up on Halloween night and types out messages from a spirit trapped in the binary..."
            className="w-full bg-[#0a0414]/90 border border-purple-500/40 focus:border-purple-400 rounded-2xl p-4 text-sm sm:text-base text-purple-100 placeholder-purple-400/40 focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all resize-none font-normal leading-relaxed shadow-inner"
          />

          <div className="absolute right-3 bottom-3 flex items-center gap-2">
            {prompt.length > 0 && (
              <button
                type="button"
                onClick={() => handlePromptChange('')}
                className="text-[11px] text-purple-400 hover:text-purple-200 px-2 py-0.5 rounded bg-purple-950/80 border border-purple-800/40 transition-colors"
              >
                Clear
              </button>
            )}
            <span className={`text-[11px] font-code ${prompt.length > 800 ? 'text-amber-400' : 'text-purple-400/60'}`}>
              {prompt.length}/1000
            </span>
          </div>
        </div>
      </div>

      {/* Ghost in the Machine Themes Chips */}
      <div className="mb-6">
        <div className="text-[11px] uppercase tracking-wider text-purple-400/80 mb-2 flex items-center gap-1.5 font-medium">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span>Ghost in the Machine Themes (Click to add):</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {MACHINE_TROPES.map((trope) => {
            const isPicked = selectedTrope === trope || prompt.includes(trope);
            return (
              <button
                key={trope}
                type="button"
                onClick={() => handleTropeClick(trope)}
                className={`text-xs px-2.5 py-1 rounded-lg border transition-all duration-150 ${
                  isPicked
                    ? 'bg-purple-600/40 border-purple-400 text-purple-100 shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                    : 'bg-[#1a0f30]/60 border-purple-800/50 text-purple-300/80 hover:text-purple-100 hover:border-purple-500/40'
                }`}
              >
                + {trope}
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 3: Story Customizers (Length & Spookiness) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7 p-4 bg-[#0d061c]/70 rounded-2xl border border-purple-900/40">
        {/* Story Length */}
        <div>
          <label className="block text-xs font-medium text-purple-300 mb-2">Story Length</label>
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-black/40 rounded-xl border border-purple-900/60">
            {(
              [
                { id: 'short', label: 'Flash (~250w)' },
                { id: 'standard', label: 'Tale (~450w)' },
                { id: 'epic', label: 'Deep (~650w)' },
              ] as const
            ).map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => setLength(l.id)}
                className={`text-xs py-1.5 px-2 rounded-lg font-medium transition-all ${
                  length === l.id
                    ? 'bg-purple-700 text-white shadow-md'
                    : 'text-purple-300/70 hover:text-purple-100'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Spookiness Level */}
        <div>
          <label className="block text-xs font-medium text-purple-300 mb-2 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>Spookiness Level</span>
          </label>
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-black/40 rounded-xl border border-purple-900/60">
            {(
              [
                { id: 'campy', label: 'PG-13 Spooky' },
                { id: 'eerie', label: 'Creeping Dread' },
                { id: 'nightmare', label: 'Dark Chills' },
              ] as const
            ).map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSpookiness(s.id)}
                className={`text-xs py-1.5 px-2 rounded-lg font-medium transition-all ${
                  spookiness === s.id
                    ? 'bg-gradient-to-r from-purple-700 to-rose-700 text-white shadow-md'
                    : 'text-purple-300/70 hover:text-purple-100'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Generate Story Button */}
      <button
        type="submit"
        disabled={isLoading || !prompt.trim()}
        className={`w-full relative group overflow-hidden py-4 px-6 rounded-2xl font-bold text-base sm:text-lg tracking-wide uppercase flex items-center justify-center gap-3 transition-all duration-300 ${
          isLoading || !prompt.trim()
            ? 'bg-purple-950/40 text-purple-400/40 border border-purple-900/30 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:via-fuchsia-500 hover:to-indigo-500 text-white shadow-glow-purple border border-purple-300/30 active:scale-[0.99] cursor-pointer'
        }`}
      >
        {/* Glow overlay */}
        <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        {isLoading ? (
          <>
            <RefreshCw className="w-5 h-5 animate-spin text-purple-200" />
            <span>Summoning Gemma's Phantoms...</span>
          </>
        ) : (
          <>
            <Wand2 className="w-5 h-5 text-amber-300 transition-transform group-hover:rotate-12 duration-300" />
            <span className="font-heading">Generate Story</span>
            <span className="text-xs font-normal normal-case opacity-70 tracking-normal hidden sm:inline">
              (⌘+Enter)
            </span>
          </>
        )}
      </button>

      {/* Powered by Open-weight Gemma footer badge */}
      <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-purple-300/60 font-code">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        <span>Powered by Google Gemma Open-Weight AI (Server-Side Inference)</span>
      </div>
    </form>
  );
};
