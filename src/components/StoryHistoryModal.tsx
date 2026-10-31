import React from 'react';
import { X, BookOpen, Trash2, Calendar, Skull, Compass, Ghost, Download } from 'lucide-react';
import { GeneratedStory } from '../types/story';

interface StoryHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  stories: GeneratedStory[];
  onSelectStory: (story: GeneratedStory) => void;
  onDeleteStory: (id: string) => void;
  onClearAll: () => void;
}

export const StoryHistoryModal: React.FC<StoryHistoryModalProps> = ({
  isOpen,
  onClose,
  stories,
  onSelectStory,
  onDeleteStory,
  onClearAll,
}) => {
  if (!isOpen) return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Horror':
        return <Skull className="w-3.5 h-3.5 text-rose-400" />;
      case 'Mystery':
        return <Compass className="w-3.5 h-3.5 text-amber-400" />;
      case 'Supernatural':
      default:
        return <Ghost className="w-3.5 h-3.5 text-purple-400" />;
    }
  };

  const handleExportAll = () => {
    const jsonStr = JSON.stringify(stories, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ghosttales_grimoire_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-[#110722] border border-purple-500/40 rounded-3xl shadow-[0_0_50px_rgba(147,51,234,0.3)] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-purple-900/60 bg-[#170a2e]">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-purple-900/50 text-purple-300 border border-purple-700/40">
              <BookOpen className="w-5 h-5 text-amber-300" />
            </span>
            <div>
              <h3 className="font-heading font-bold text-lg text-white">Grimoire of Haunted Tales</h3>
              <p className="text-xs text-purple-300/70">
                {stories.length} {stories.length === 1 ? 'tale' : 'tales'} saved in your machine archives
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {stories.length > 0 && (
              <button
                type="button"
                onClick={handleExportAll}
                className="p-2 rounded-xl text-purple-300 hover:text-white bg-purple-900/40 hover:bg-purple-800/50 border border-purple-800/40 text-xs flex items-center gap-1.5 transition-colors"
                title="Export all stories as JSON"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export All</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-purple-400 hover:text-white bg-purple-950/80 hover:bg-purple-900 border border-purple-800/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stories List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {stories.length === 0 ? (
            <div className="text-center py-16 px-4">
              <Ghost className="w-12 h-12 text-purple-500/40 mx-auto mb-3 animate-bounce" />
              <p className="text-purple-200 font-medium">Your Grimoire is currently empty</p>
              <p className="text-xs text-purple-400/70 mt-1 max-w-sm mx-auto">
                Generate your first spooky Halloween story and click "Save Story" to preserve it here!
              </p>
            </div>
          ) : (
            stories.map((s) => (
              <div
                key={s.id}
                className="p-4 rounded-2xl bg-[#180d31]/80 hover:bg-[#201140] border border-purple-900/50 hover:border-purple-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => {
                    onSelectStory(s);
                    onClose();
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-purple-300">
                      {getCategoryIcon(s.category)}
                      {s.category}
                    </span>
                    <span className="text-[10px] text-purple-400/50 font-code">•</span>
                    <span className="text-[11px] text-purple-400/70 flex items-center gap-1 font-code">
                      <Calendar className="w-3 h-3" />
                      {new Date(s.generatedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h4 className="font-heading font-semibold text-white group-hover:text-amber-200 transition-colors">
                    {s.title}
                  </h4>
                  <p className="text-xs text-purple-300/70 line-clamp-1 mt-0.5">{s.spookyHook || s.story}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectStory(s);
                      onClose();
                    }}
                    className="text-xs px-3 py-1.5 rounded-xl bg-purple-700/60 hover:bg-purple-600 text-white font-medium transition-colors"
                  >
                    Read
                  </button>

                  <button
                    type="button"
                    onClick={() => onDeleteStory(s.id)}
                    className="p-2 rounded-xl text-purple-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                    title="Delete from Grimoire"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {stories.length > 0 && (
          <div className="p-4 border-t border-purple-900/60 bg-[#170a2e] flex items-center justify-between">
            <button
              type="button"
              onClick={onClearAll}
              className="text-xs text-rose-400/80 hover:text-rose-300 flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All Tales</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-purple-200 text-xs font-medium"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
