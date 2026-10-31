/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { GhostIllustration } from './components/GhostIllustration';
import { StoryForm } from './components/StoryForm';
import { StoryCard } from './components/StoryCard';
import { LoadingGrimoire } from './components/LoadingGrimoire';
import { ErrorMessage } from './components/ErrorMessage';
import { StoryHistoryModal } from './components/StoryHistoryModal';
import { GeneratedStory, StoryGenerationParams, GhostMood } from './types/story';
import { spookyAudio } from './utils/audio';
import { Sparkles, Terminal, Flame, Ghost, BookOpen } from 'lucide-react';

const STORAGE_KEY = 'ghosttales_saved_grimoire_v1';

export default function App() {
  const [currentStory, setCurrentStory] = useState<GeneratedStory | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [ghostMood, setGhostMood] = useState<GhostMood>('idle');
  const [grimoire, setGrimoire] = useState<GeneratedStory[]>([]);
  const [isGrimoireOpen, setIsGrimoireOpen] = useState<boolean>(false);
  const [isAmbientActive, setIsAmbientActive] = useState<boolean>(false);
  const [lastParams, setLastParams] = useState<StoryGenerationParams | null>(null);

  const readingSectionRef = useRef<HTMLDivElement>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);

  // Load saved tales from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setGrimoire(parsed);
        }
      }
    } catch (e) {
      console.warn('Could not load grimoire from localStorage', e);
    }
  }, []);

  // Sync saved tales to localStorage
  const saveGrimoireToStorage = (updated: GeneratedStory[]) => {
    setGrimoire(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not save grimoire to localStorage', e);
    }
  };

  const handleGenerateStory = async (params: StoryGenerationParams) => {
    setIsLoading(true);
    setError(null);
    setLastParams(params);
    setGhostMood('thinking');

    try {
      const response = await fetch('/api/stories/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'The spirits failed to weave your story.');
      }

      setCurrentStory(data.story);
      setGhostMood('celebrate');
      spookyAudio.playSpookyChime();

      // Automatically add to Grimoire history if not already there
      const existing = grimoire.find((s) => s.id === data.story.id);
      if (!existing) {
        saveGrimoireToStorage([data.story, ...grimoire]);
      }

      // Smooth scroll to reading card
      setTimeout(() => {
        readingSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Return ghost to happy after celebration
        setTimeout(() => setGhostMood('happy'), 3000);
      }, 250);
    } catch (err: any) {
      console.error('Generation error:', err);
      setError(err?.message || 'An error occurred while summoning the story from Google Gemma.');
      setGhostMood('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastParams) {
      handleGenerateStory(lastParams);
    } else {
      setError(null);
      setGhostMood('idle');
    }
  };

  const handleGenerateAnother = () => {
    setGhostMood('idle');
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSaveToGrimoire = (story: GeneratedStory) => {
    const exists = grimoire.some((s) => s.id === story.id);
    if (!exists) {
      saveGrimoireToStorage([story, ...grimoire]);
    }
  };

  const handleDeleteFromGrimoire = (id: string) => {
    const updated = grimoire.filter((s) => s.id !== id);
    saveGrimoireToStorage(updated);
  };

  const handleClearGrimoire = () => {
    saveGrimoireToStorage([]);
  };

  const handleToggleAmbient = () => {
    const active = spookyAudio.toggleAmbient();
    setIsAmbientActive(active);
  };

  return (
    <div className="min-h-screen bg-[#070311] text-purple-100 flex flex-col relative selection:bg-purple-800 selection:text-white">
      {/* Background Ambience: Subtle Scanlines and Glowing Orbs */}
      <div className="fixed inset-0 scanlines opacity-30 pointer-events-none z-10" />
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-950/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-fuchsia-950/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header */}
      <Header
        savedCount={grimoire.length}
        onOpenGrimoire={() => setIsGrimoireOpen(true)}
        isAmbientActive={isAmbientActive}
        onToggleAmbient={handleToggleAmbient}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-20">
        {/* Hero Section with Friendly Animated Ghost */}
        <div className="text-center mb-10 sm:mb-14">
          {/* Animated Ghost Illustration */}
          <div className="inline-block mb-4 sm:mb-6">
            <GhostIllustration
              mood={ghostMood}
              size="lg"
              showSpeechBubble={!isLoading && !currentStory}
              customMessage={
                isLoading
                  ? 'Gemma is consulting the machine spirits...'
                  : currentStory
                  ? 'Here is your spooky tale! Read below 👻'
                  : 'Hello mortal! Give me an idea to summon a Halloween tale!'
              }
            />
          </div>

          {/* Title and Thematic Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/40 text-purple-200 text-xs font-semibold uppercase tracking-wider mb-3 shadow-[0_0_20px_rgba(168,85,247,0.25)]">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Halloween 2026 Edition • Ghost in the Machine</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white tracking-tight leading-tight">
            Summon Spooky AI Tales
          </h2>

          <p className="mt-3 text-sm sm:text-base text-purple-300/80 max-w-xl mx-auto leading-relaxed">
            Where gothic Halloween folklore clashes with the digital phantoms of cyberspace.
            Powered exclusively by Google's open-weight <span className="text-purple-200 font-semibold underline decoration-purple-500/60 underline-offset-4">Gemma</span> model.
          </p>
        </div>

        {/* Story Generation Form Section */}
        <section ref={formSectionRef} className="scroll-mt-24 mb-12">
          <StoryForm
            onGenerate={handleGenerateStory}
            isLoading={isLoading}
            onPromptChange={(txt) => {
              if (txt.trim().length > 0 && ghostMood === 'idle') {
                setGhostMood('happy');
              }
            }}
          />
        </section>

        {/* Loading State Animation */}
        {isLoading && <LoadingGrimoire />}

        {/* Error Message with Sympathetic Ghost & Retry */}
        {error && !isLoading && (
          <ErrorMessage
            message={error}
            onRetry={handleRetry}
            onClear={() => {
              setError(null);
              setGhostMood('idle');
            }}
          />
        )}

        {/* Reading Card Display */}
        {currentStory && !isLoading && (
          <section ref={readingSectionRef} className="scroll-mt-24 mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs uppercase tracking-widest font-semibold text-purple-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Conjured Reading Parchment</span>
              </h3>
              <span className="text-xs text-purple-400/80 font-code">
                Model: {currentStory.model}
              </span>
            </div>

            <StoryCard
              story={currentStory}
              onGenerateAnother={handleGenerateAnother}
              onSaveToGrimoire={handleSaveToGrimoire}
              isSaved={grimoire.some((s) => s.id === currentStory.id)}
            />
          </section>
        )}
      </main>

      {/* Grimoire / History Modal */}
      <StoryHistoryModal
        isOpen={isGrimoireOpen}
        onClose={() => setIsGrimoireOpen(false)}
        stories={grimoire}
        onSelectStory={(story) => {
          setCurrentStory(story);
          setGhostMood('happy');
          setTimeout(() => {
            readingSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 150);
        }}
        onDeleteStory={handleDeleteFromGrimoire}
        onClearAll={handleClearGrimoire}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
