import React from 'react';
import { GhostIllustration } from './GhostIllustration';
import { AlertTriangle, RefreshCw, Key, Lightbulb } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
  onClear: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry, onClear }) => {
  const isKeyError =
    message.toLowerCase().includes('key') ||
    message.toLowerCase().includes('permission') ||
    message.toLowerCase().includes('403') ||
    message.toLowerCase().includes('401');

  return (
    <div className="w-full my-6 p-6 sm:p-8 bg-rose-950/40 border border-rose-500/40 rounded-3xl backdrop-blur-xl shadow-lg relative overflow-hidden">
      {/* Decorative red glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="shrink-0">
          <GhostIllustration
            mood="error"
            size="md"
            showSpeechBubble
            customMessage="Oh no, the digital spirit realm had a glitch!"
          />
        </div>

        <div className="flex-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-900/60 border border-rose-500/30 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            <span>Spiritual Connection Anomaly</span>
          </div>

          <h3 className="text-lg sm:text-xl font-heading font-bold text-rose-100 mb-2">
            Failed to Summon Ghost Story
          </h3>

          <p className="text-sm text-rose-200/90 leading-relaxed mb-4 bg-rose-950/60 p-3 rounded-xl border border-rose-900/60 font-code text-xs">
            {message}
          </p>

          {/* Helpful suggestions */}
          <div className="bg-[#120616]/70 p-3 rounded-xl border border-rose-900/40 text-xs text-purple-200/90 mb-5 space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-amber-300">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Helpful Troubleshooting Tips:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-purple-300/80 pl-1">
              {isKeyError ? (
                <>
                  <li>Verify that your API key is configured in the AI Studio <strong>Settings &gt; Secrets</strong> panel.</li>
                  <li>Ensure the key has access to standard generative models.</li>
                </>
              ) : (
                <>
                  <li>The open-weight Gemma model might have experienced a momentary server timeout.</li>
                  <li>Try simplifying your story idea or picking another category.</li>
                  <li>Click <strong>Retry Summoning</strong> to attempt again.</li>
                </>
              )}
            </ul>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry Summoning</span>
            </button>

            <button
              type="button"
              onClick={onClear}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 text-purple-300 hover:text-white border border-purple-800/50 text-xs sm:text-sm transition-all"
            >
              <span>Dismiss & Edit Idea</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
