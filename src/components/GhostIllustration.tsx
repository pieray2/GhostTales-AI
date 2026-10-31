import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GhostMood } from '../types/story';
import { spookyAudio } from '../utils/audio';

interface GhostIllustrationProps {
  mood?: GhostMood;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSpeechBubble?: boolean;
  customMessage?: string;
  className?: string;
}

const GHOST_QUIPS = [
  "Booo! ...Did I scare you? Just kidding! 👻",
  "I linger in the cache between midnight and 3 AM!",
  "Gemma is weaving your spooky tale right now...",
  "Don't worry, I'm a friendly machine phantom!",
  "Every glitch is just a ghost saying hello in binary.",
  "Check under your keyboard... a pumpkin crumb!",
  "Beware of recursive loops and haunted null pointers!",
];

export const GhostIllustration: React.FC<GhostIllustrationProps> = ({
  mood = 'idle',
  size = 'lg',
  showSpeechBubble = false,
  customMessage,
  className = '',
}) => {
  const [clickCount, setClickCount] = useState(0);
  const [bubbleText, setBubbleText] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const sizeClasses = {
    sm: 'w-24 h-28',
    md: 'w-36 h-42',
    lg: 'w-48 h-56',
    xl: 'w-64 h-72',
  }[size];

  const handleGhostClick = () => {
    setIsSpinning(true);
    setClickCount((prev) => prev + 1);
    spookyAudio.playSpookyChime();

    // Pick a fun quip
    const nextQuip = GHOST_QUIPS[clickCount % GHOST_QUIPS.length];
    setBubbleText(nextQuip);

    setTimeout(() => {
      setIsSpinning(false);
    }, 800);

    setTimeout(() => {
      setBubbleText(null);
    }, 4500);
  };

  const currentMessage = customMessage || bubbleText;

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* Speech Bubble */}
      <AnimatePresence>
        {(showSpeechBubble || currentMessage) && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="absolute -top-16 z-20 max-w-xs px-4 py-2 text-xs md:text-sm font-medium text-purple-200 bg-purple-950/90 border border-purple-500/40 rounded-2xl shadow-glow-purple backdrop-blur-md text-center"
          >
            {currentMessage || "Whisper a story idea, and I'll summon it with Gemma!"}
            {/* Speech bubble tail */}
            <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-purple-900" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Orbiting spectral orbs for thinking or celebrate */}
      {(mood === 'thinking' || mood === 'celebrate') && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="w-44 h-44 rounded-full border border-purple-500/20 relative"
          >
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-purple-400 rounded-full shadow-[0_0_12px_#c084fc] animate-pulse" />
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-amber-400 rounded-full shadow-[0_0_10px_#f59e0b]" />
            <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_#34d399]" />
          </motion.div>
        </div>
      )}

      {/* Interactive Ghost SVG Character */}
      <motion.div
        animate={
          isSpinning
            ? { rotate: [0, -20, 360], scale: [1, 1.15, 1] }
            : mood === 'thinking'
            ? { y: [-6, 6, -6], scale: [1, 1.03, 1] }
            : mood === 'celebrate'
            ? { y: [0, -18, 0], scale: [1, 1.1, 1] }
            : { y: [-8, 8, -8] }
        }
        transition={
          isSpinning
            ? { duration: 0.8, ease: 'easeInOut' }
            : { duration: mood === 'thinking' ? 2 : 4, repeat: Infinity, ease: 'easeInOut' }
        }
        onClick={handleGhostClick}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className={`${sizeClasses} cursor-pointer relative group transition-all duration-300 filter drop-shadow-[0_10px_25px_rgba(168,85,247,0.45)]`}
        title="Click the friendly ghost!"
      >
        <svg
          viewBox="0 0 200 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
        >
          <defs>
            {/* Ghost body gradient */}
            <linearGradient id="ghostBodyGrad" x1="100" y1="20" x2="100" y2="230" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="45%" stopColor="#f3e8ff" />
              <stop offset="85%" stopColor="#d8b4fe" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>

            {/* Glowing Ectoplasmic Aura */}
            <radialGradient id="ghostGlow" cx="50%" cy="50%" r="50%">
              <stop offset="40%" stopColor="#c084fc" stopOpacity="0.8" />
              <stop offset="80%" stopColor="#9333ea" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#6b21a8" stopOpacity="0" />
            </radialGradient>

            {/* Witch Hat / Cyber Ribbon gradient */}
            <linearGradient id="witchHatGrad" x1="50" y1="0" x2="150" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3b0764" />
              <stop offset="100%" stopColor="#1e0538" />
            </linearGradient>

            <linearGradient id="pumpkinGold" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>

            {/* Shadow filter */}
            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Under-glow circle */}
          <ellipse cx="100" cy="225" rx="55" ry="12" fill="#000000" opacity="0.35" filter="blur(6px)" />

          {/* Ectoplasmic Background Halo */}
          <circle cx="100" cy="115" r="75" fill="url(#ghostGlow)" opacity="0.65" filter="blur(14px)" />

          {/* Little Cyber Antenna / Sparkle on top */}
          <g>
            <line x1="100" y1="42" x2="100" y2="22" stroke="#c084fc" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="100" cy="20" r="4.5" fill="#38bdf8" className="animate-ping" opacity="0.75" />
            <circle cx="100" cy="20" r="4" fill="#67e8f9" />
          </g>

          {/* Ghost Main Body */}
          <path
            d="M 52 110 
               C 52 60, 72 38, 100 38 
               C 128 38, 148 60, 148 110 
               C 148 150, 154 185, 145 208 
               C 140 220, 132 212, 126 218 
               C 118 226, 110 215, 100 222 
               C 90 215, 82 226, 74 218 
               C 68 212, 60 220, 55 208 
               C 46 185, 52 150, 52 110 Z"
            fill="url(#ghostBodyGrad)"
            stroke="#e9d5ff"
            strokeWidth="1.5"
            className="transition-all duration-300"
          />

          {/* Left Cute Arm */}
          <motion.path
            d={
              mood === 'celebrate'
                ? 'M 54 125 C 32 105, 20 85, 28 80 C 35 75, 48 95, 56 112'
                : mood === 'thinking'
                ? 'M 54 125 C 38 120, 32 110, 42 102 C 50 96, 55 110, 56 120'
                : 'M 54 128 C 36 132, 28 142, 34 148 C 42 154, 50 145, 56 138'
            }
            fill="url(#ghostBodyGrad)"
            stroke="#e9d5ff"
            strokeWidth="1.2"
          />

          {/* Right Cute Arm (Waving or casting) */}
          <motion.path
            d={
              mood === 'celebrate'
                ? 'M 146 125 C 168 105, 180 85, 172 80 C 165 75, 152 95, 144 112'
                : mood === 'thinking'
                ? 'M 146 125 C 162 115, 170 100, 162 95 C 154 90, 148 105, 144 118'
                : 'M 146 128 C 166 120, 175 105, 168 100 C 160 95, 150 115, 144 135'
            }
            fill="url(#ghostBodyGrad)"
            stroke="#e9d5ff"
            strokeWidth="1.2"
          />

          {/* Blushing cheeks */}
          <ellipse cx="74" cy="118" rx="7" ry="4.5" fill="#f472b6" opacity="0.55" filter="blur(1px)" />
          <ellipse cx="126" cy="118" rx="7" ry="4.5" fill="#f472b6" opacity="0.55" filter="blur(1px)" />

          {/* Big Expressive Eyes */}
          {mood === 'thinking' ? (
            /* Starry or swirling magical eyes */
            <g>
              <circle cx="78" cy="106" r="8" fill="#3b0764" />
              <circle cx="122" cy="106" r="8" fill="#3b0764" />
              <polygon
                points="78,100 80,105 85,106 80,107 78,112 76,107 71,106 76,105"
                fill="#facc15"
              />
              <polygon
                points="122,100 124,105 129,106 124,107 122,112 120,107 115,106 120,105"
                fill="#facc15"
              />
            </g>
          ) : mood === 'celebrate' ? (
            /* Joyful happy crescent eyes ^ ^ */
            <g>
              <path d="M 70 108 Q 78 98 86 108" stroke="#2e1065" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              <path d="M 114 108 Q 122 98 130 108" stroke="#2e1065" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            </g>
          ) : mood === 'error' ? (
            /* Puzzled eyes o.O */
            <g>
              <circle cx="78" cy="106" r="7.5" fill="#3b0764" />
              <circle cx="76" cy="104" r="2.5" fill="#ffffff" />
              <circle cx="122" cy="106" r="9.5" fill="#3b0764" />
              <circle cx="120" cy="103" r="3.5" fill="#ffffff" />
            </g>
          ) : (
            /* Friendly standard big shiny eyes */
            <g>
              {/* Left Eye */}
              <circle cx="78" cy="106" r="8.5" fill="#2e1065" />
              <circle cx="76" cy="103" r="3.2" fill="#ffffff" />
              <circle cx="81" cy="108" r="1.5" fill="#ffffff" />

              {/* Right Eye */}
              <circle cx="122" cy="106" r="8.5" fill="#2e1065" />
              <circle cx="120" cy="103" r="3.2" fill="#ffffff" />
              <circle cx="125" cy="108" r="1.5" fill="#ffffff" />
            </g>
          )}

          {/* Sweet friendly mouth */}
          {mood === 'celebrate' ? (
            /* Big open happy mouth */
            <path
              d="M 92 118 Q 100 132 108 118 Z"
              fill="#ec4899"
              stroke="#2e1065"
              strokeWidth="1.8"
            />
          ) : mood === 'thinking' ? (
            /* Cute tiny 'o' mouth */
            <ellipse cx="100" cy="120" rx="3.5" ry="4.5" fill="#3b0764" />
          ) : mood === 'error' ? (
            /* Wobbly sympathetic mouth */
            <path d="M 93 124 Q 100 119 107 123" stroke="#2e1065" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          ) : (
            /* Friendly gentle smile */
            <path
              d="M 92 118 Q 100 126 108 118"
              stroke="#2e1065"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          )}

          {/* Floating tiny Jack-o'-Lantern badge */}
          <g transform="translate(136, 160) scale(0.85)">
            <ellipse cx="15" cy="15" rx="14" ry="12" fill="url(#pumpkinGold)" />
            {/* Pumpkin ribs */}
            <path d="M 15 3 Q 7 15 15 27" stroke="#b45309" strokeWidth="1" fill="none" opacity="0.6" />
            <path d="M 15 3 Q 23 15 15 27" stroke="#b45309" strokeWidth="1" fill="none" opacity="0.6" />
            {/* Stem */}
            <path d="M 15 3 Q 16 -2 18 -4" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Carved eyes & smile */}
            <polygon points="9,12 12,14 8,15" fill="#451a03" />
            <polygon points="21,12 18,14 22,15" fill="#451a03" />
            <path d="M 10 19 Q 15 24 20 19 Z" fill="#451a03" />
          </g>
        </svg>

        {/* Click hint tooltip on hover */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] tracking-wider text-purple-300/80 uppercase font-code">
          [Click Specter Byte]
        </div>
      </motion.div>
    </div>
  );
};
