import React, { useState, useEffect } from 'react';
import {
  Copy,
  Check,
  RotateCcw,
  Volume2,
  VolumeX,
  Radio,
  BookOpen,
  Share2,
  Download,
  Terminal,
  Clock,
  Sparkles,
  Bookmark,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { GeneratedStory } from '../types/story';
import { spookyAudio, SpookyNarrator } from '../utils/audio';
import confetti from 'canvas-confetti';

interface StoryCardProps {
  story: GeneratedStory;
  onGenerateAnother: () => void;
  onSaveToGrimoire?: (story: GeneratedStory) => void;
  isSaved?: boolean;
}

export const StoryCard: React.FC<StoryCardProps> = ({
  story,
  onGenerateAnother,
  onSaveToGrimoire,
  isSaved = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [isNarrating, setIsNarrating] = useState(false);
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);
  const [fontSizeLevel, setFontSizeLevel] = useState<'normal' | 'large' | 'huge'>('normal');

  useEffect(() => {
    // Trigger spooky celebratory confetti (bats/purple sparkles) on mount
    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#c084fc', '#a855f7', '#f59e0b', '#38bdf8', '#ffffff'],
      });
    } catch (_) {}

    return () => {
      SpookyNarrator.stop();
    };
  }, [story.id]);

  const handleCopyStory = async () => {
    const fullText = `${story.title}\nCategory: ${story.category}\n\n${story.story}\n\n${story.ghostLog}\n-- Generated with GhostTales AI (Powered by ${story.model})`;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(fullText);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = fullText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleToggleNarration = () => {
    if (isNarrating) {
      SpookyNarrator.stop();
      setIsNarrating(false);
    } else {
      setIsNarrating(true);
      SpookyNarrator.speak(`${story.title}. ${story.story}`, () => {
        setIsNarrating(false);
      });
    }
  };

  const handleToggleAmbient = () => {
    const state = spookyAudio.toggleAmbient();
    setIsAmbientPlaying(state);
  };

  const handleDownload = () => {
    const textContent = `${story.title.toUpperCase()}\n${'='.repeat(story.title.length)}\nCategory: ${story.category}\nDate: ${new Date(story.generatedAt).toLocaleString()}\nModel: ${story.model}\n\n${story.story}\n\nSYSTEM LOG:\n${story.ghostLog}\n\n-- Created with GhostTales AI`;
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${story.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const fontSizeClass = {
    normal: 'text-sm sm:text-base leading-relaxed',
    large: 'text-base sm:text-lg leading-loose',
    huge: 'text-lg sm:text-xl leading-loose',
  }[fontSizeLevel];

  // Divide story into paragraphs for readable styling
  const paragraphs = story.story
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const getCategoryStyles = () => {
    switch (story.category) {
      case 'Horror':
        return {
          badge: 'bg-rose-950/80 text-rose-300 border-rose-500/40',
          accent: 'from-rose-500/20 to-purple-900/10',
          border: 'border-rose-500/30',
        };
      case 'Mystery':
        return {
          badge: 'bg-amber-950/80 text-amber-300 border-amber-500/40',
          accent: 'from-amber-500/20 to-purple-900/10',
          border: 'border-amber-500/30',
        };
      case 'Supernatural':
      default:
        return {
          badge: 'bg-purple-950/80 text-purple-300 border-purple-500/40',
          accent: 'from-purple-500/20 to-indigo-900/10',
          border: 'border-purple-500/30',
        };
    }
  };

  const catStyle = getCategoryStyles();

  return (
    <article
      id="reading-card"
      className="w-full bg-[#110722]/95 border border-purple-500/40 rounded-3xl p-5 sm:p-8 md:p-10 backdrop-blur-2xl shadow-[0_0_50px_rgba(88,28,135,0.35)] relative overflow-hidden transition-all duration-300"
    >
      {/* Gothic Ornate Corner Accents */}
      <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-purple-400/50 pointer-events-none" />
      <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-purple-400/50 pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-purple-400/50 pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-purple-400/50 pointer-events-none" />

      {/* Atmospheric Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-purple-900/60">
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Badge */}
          <span
            className={`text-xs px-3 py-1 rounded-full font-semibold border tracking-wide uppercase ${catStyle.badge}`}
          >
            {story.category}
          </span>

          {/* Reading Time */}
          <span className="text-xs text-purple-300/80 flex items-center gap-1 bg-purple-950/50 px-2.5 py-1 rounded-full border border-purple-900/40 font-code">
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            {story.readingTimeMinutes} min read ({story.wordCount} words)
          </span>

          {/* Gemma Model Badge */}
          <span className="text-xs text-emerald-300/90 flex items-center gap-1.5 bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-500/30 font-code">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Gemma Open-Weight AI
          </span>
        </div>

        {/* Reader Customization Tools (Font size, ambient audio, narration) */}
        <div className="flex items-center gap-1.5">
          {/* Ambient Spooky Drone */}
          <button
            type="button"
            onClick={handleToggleAmbient}
            className={`p-2 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all ${
              isAmbientPlaying
                ? 'bg-purple-800 text-white border-purple-400 shadow-glow-purple'
                : 'bg-purple-950/50 text-purple-300 hover:text-white border-purple-800/60 hover:bg-purple-900/50'
            }`}
            title={isAmbientPlaying ? 'Stop Ambient Spooky Sound' : 'Play Ambient Spooky Sound'}
          >
            <Radio className={`w-3.5 h-3.5 ${isAmbientPlaying ? 'animate-pulse text-amber-300' : ''}`} />
            <span className="hidden md:inline">{isAmbientPlaying ? 'Drone: ON' : 'Ambient Drone'}</span>
          </button>

          {/* Read Aloud Narration */}
          {SpookyNarrator.isSupported() && (
            <button
              type="button"
              onClick={handleToggleNarration}
              className={`p-2 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all ${
                isNarrating
                  ? 'bg-rose-900 text-white border-rose-400 shadow-md'
                  : 'bg-purple-950/50 text-purple-300 hover:text-white border-purple-800/60 hover:bg-purple-900/50'
              }`}
              title={isNarrating ? 'Stop Narration' : 'Narrate Story Aloud'}
            >
              {isNarrating ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-rose-300" />
                  <span className="hidden md:inline">Stop Voice</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Read Aloud</span>
                </>
              )}
            </button>
          )}

          {/* Font Resizing */}
          <div className="flex items-center bg-purple-950/50 border border-purple-900/60 rounded-xl p-0.5">
            <button
              type="button"
              onClick={() => setFontSizeLevel('normal')}
              className={`p-1.5 rounded-lg text-xs ${
                fontSizeLevel === 'normal' ? 'bg-purple-800 text-white' : 'text-purple-400 hover:text-white'
              }`}
              title="Standard text size"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setFontSizeLevel('large')}
              className={`p-1.5 rounded-lg text-xs ${
                fontSizeLevel === 'large' ? 'bg-purple-800 text-white' : 'text-purple-400 hover:text-white'
              }`}
              title="Large text size"
            >
              A
            </button>
            <button
              type="button"
              onClick={() => setFontSizeLevel('huge')}
              className={`p-1.5 rounded-lg text-xs ${
                fontSizeLevel === 'huge' ? 'bg-purple-800 text-white' : 'text-purple-400 hover:text-white'
              }`}
              title="Huge text size"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Story Title */}
      <header className="mb-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-100 via-purple-200 to-amber-200 tracking-tight leading-tight">
          {story.title}
        </h2>

        {/* Spooky Hook / Teaser */}
        {story.spookyHook && (
          <p className="mt-3 text-sm sm:text-base italic text-purple-300/80 border-l-2 border-purple-500/60 pl-3.5 py-0.5">
            "{story.spookyHook}"
          </p>
        )}
      </header>

      {/* Ghost in the Machine System Log Snippet */}
      {story.ghostLog && (
        <div className="mb-6 p-3 sm:p-4 rounded-2xl bg-[#090314]/90 border border-cyan-500/30 text-cyan-300 font-code text-xs sm:text-sm flex items-start gap-3 shadow-inner">
          <Terminal className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
          <div className="flex-1 overflow-x-auto">
            <span className="text-cyan-500 font-semibold uppercase tracking-wider block text-[10px] mb-1">
              [GHOST_IN_THE_MACHINE_TELEMETRY]
            </span>
            <span className="leading-relaxed">{story.ghostLog}</span>
          </div>
        </div>
      )}

      {/* Story Content Body with Elegant Typography */}
      <div className={`space-y-5 text-purple-100/90 font-normal ${fontSizeClass} selection:bg-purple-800 selection:text-white`}>
        {paragraphs.map((para, index) => {
          // If first paragraph, add subtle gothic drop cap feel
          const isFirst = index === 0;
          return (
            <p key={index} className="leading-relaxed tracking-normal">
              {isFirst && para.length > 0 ? (
                <>
                  <span className="float-left text-4xl sm:text-5xl font-heading font-bold text-amber-300 mr-2.5 leading-none mt-1">
                    {para.charAt(0)}
                  </span>
                  {para.slice(1)}
                </>
              ) : (
                para
              )}
            </p>
          );
        })}
      </div>

      {/* Atmosphere Tags */}
      {story.atmosphereTags && story.atmosphereTags.length > 0 && (
        <div className="mt-8 pt-5 border-t border-purple-900/50 flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-purple-400/70 uppercase tracking-widest font-code">Atmosphere:</span>
          {story.atmosphereTags.map((tag, i) => (
            <span
              key={i}
              className="text-xs px-2.5 py-0.5 rounded-md bg-purple-950/70 border border-purple-800/40 text-purple-300/80"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Bottom Action Buttons (Copy Story & Generate Another as requested!) */}
      <div className="mt-8 pt-6 border-t border-purple-900/60 flex flex-wrap items-center justify-between gap-3">
        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Copy Story Button */}
          <button
            type="button"
            onClick={handleCopyStory}
            className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-semibold text-sm transition-all duration-200 shadow-md ${
              copied
                ? 'bg-emerald-600 text-white shadow-glow-green border border-emerald-400'
                : 'bg-purple-900/70 hover:bg-purple-800 text-purple-100 hover:text-white border border-purple-500/40 hover:border-purple-400 active:scale-95'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Story Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-purple-300" />
                <span>Copy Story</span>
              </>
            )}
          </button>

          {/* Generate Another Button */}
          <button
            type="button"
            onClick={onGenerateAnother}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-semibold text-sm bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-glow-purple border border-purple-400/40 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-amber-300" />
            <span>Generate Another</span>
          </button>
        </div>

        {/* Secondary Actions (Save & Download) */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {onSaveToGrimoire && (
            <button
              type="button"
              onClick={() => onSaveToGrimoire(story)}
              className={`p-2.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all ${
                isSaved
                  ? 'bg-amber-900/40 text-amber-300 border-amber-500/40'
                  : 'bg-purple-950/40 text-purple-300 hover:text-white border-purple-900/60 hover:bg-purple-900/40'
              }`}
              title={isSaved ? 'Story is in your Grimoire' : 'Save to Grimoire archive'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span className="hidden sm:inline">{isSaved ? 'Archived' : 'Save Story'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleDownload}
            className="p-2.5 rounded-xl border border-purple-900/60 bg-purple-950/40 text-purple-300 hover:text-white hover:bg-purple-900/40 transition-all text-xs font-medium flex items-center gap-1.5"
            title="Download story as .txt file"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>
    </article>
  );
};
