// Web Audio API procedural sound engine & Text-to-Speech helper for GhostTales AI

class SpookySoundEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private gainNode: GainNode | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private filterNode: BiquadFilterNode | null = null;

  public toggleAmbient(): boolean {
    if (this.isPlaying) {
      this.stopAmbient();
      return false;
    } else {
      this.startAmbient();
      return true;
    }
  }

  public getAmbientState(): boolean {
    return this.isPlaying;
  }

  public startAmbient(): void {
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        this.ctx = new AudioCtx();
      }

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.001, now);
      // Smooth fade in
      this.gainNode.gain.exponentialRampToValueAtTime(0.18, now + 2);
      this.gainNode.connect(this.ctx.destination);

      // Deep drone oscillator (A1 ~ 55Hz)
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = 'sawtooth';
      this.osc1.frequency.setValueAtTime(55, now);

      // Sub-harmonic drone (E2 ~ 82.4Hz)
      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = 'sine';
      this.osc2.frequency.setValueAtTime(82.4, now);

      // Low pass filter to make it dark and muffled like a haunted crypt or server room
      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(160, now);
      this.filterNode.Q.setValueAtTime(3, now);

      this.osc1.connect(this.filterNode);
      this.osc2.connect(this.filterNode);
      this.filterNode.connect(this.gainNode);

      // Eerie white noise ghostly wind
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      noise.loop = true;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(320, now);
      noiseFilter.Q.setValueAtTime(2, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.04, now);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.gainNode);

      this.osc1.start(now);
      this.osc2.start(now);
      noise.start(now);
      this.noiseNode = noise;

      this.isPlaying = true;
    } catch (e) {
      console.warn('AudioContext not allowed or supported yet', e);
      this.isPlaying = false;
    }
  }

  public stopAmbient(): void {
    if (!this.gainNode || !this.ctx) {
      this.isPlaying = false;
      return;
    }

    try {
      const now = this.ctx.currentTime;
      this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, now);
      this.gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      setTimeout(() => {
        try {
          this.osc1?.stop();
          this.osc2?.stop();
          this.noiseNode?.stop();
        } catch (_) {}
        this.isPlaying = false;
      }, 1300);
    } catch (e) {
      this.isPlaying = false;
    }
  }

  // Friendly spooky chime when story is conjured or ghost is clicked
  public playSpookyChime(): void {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const now = ctx.currentTime;
      const notes = [440, 554.37, 659.25, 880]; // A major ethereal arpeggio

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.001, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.09, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.9);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 1.0);
      });
    } catch (_) {}
  }
}

export const spookyAudio = new SpookySoundEngine();

// Text to speech manager
export class SpookyNarrator {
  private static synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
  private static currentUtterance: SpeechSynthesisUtterance | null = null;

  public static isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  public static speak(text: string, onEnd?: () => void): void {
    if (!this.synth) return;
    this.stop();

    const cleanText = text.replace(/\[.*?\]/g, '').replace(/[\*_~#]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Eerie ghost narration pitch & rate
    utterance.rate = 0.92;
    utterance.pitch = 0.88;

    // Pick English voice if available
    const voices = this.synth.getVoices();
    const spookyVoice = voices.find(
      (v) =>
        v.lang.startsWith('en') &&
        (v.name.includes('Natural') || v.name.includes('David') || v.name.includes('George') || v.name.includes('UK'))
    );
    if (spookyVoice) {
      utterance.voice = spookyVoice;
    }

    utterance.onend = () => {
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public static stop(): void {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }

  public static isSpeaking(): boolean {
    return Boolean(this.synth && this.synth.speaking);
  }
}
