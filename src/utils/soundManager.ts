// Audio & Synthesizer system for traditional Indian royal wedding ambience
class SoundManager {
  private audioCtx: AudioContext | null = null;
  private isEnabled: boolean = true; // Sound ON by default
  private isMusicPlaying: boolean = false;
  private musicInterval: number | null = null;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;

  constructor() {
    // Sound is ON by default — we attempt to init on first user gesture
    this.isEnabled = true;
  }

  private initContext() {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();

      // Master gain — significantly increased to 0.85 for full audibility
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.value = 0.85;
      this.masterGain.connect(this.audioCtx.destination);

      // Music gain — raised to 0.6 for clear ambient melody
      this.musicGain = this.audioCtx.createGain();
      this.musicGain.gain.value = 0.6;
      this.musicGain.connect(this.masterGain);
    }

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public getSoundState(): boolean {
    return this.isEnabled;
  }

  public toggleSound(): boolean {
    this.isEnabled = !this.isEnabled;
    if (this.isEnabled) {
      this.initContext();
      this.startAmbientMusic();
      this.playChime();
    } else {
      this.stopAmbientMusic();
      if (this.masterGain) {
        this.masterGain.gain.setTargetAtTime(0, this.audioCtx!.currentTime, 0.3);
        setTimeout(() => {
          if (this.masterGain) this.masterGain.gain.value = 0.85;
        }, 1200);
      }
    }
    return this.isEnabled;
  }

  // Called on first user interaction to safely start audio (browser policy)
  public tryAutoStart() {
    if (this.isEnabled && !this.isMusicPlaying) {
      try {
        this.initContext();
        this.startAmbientMusic();
      } catch {
        // silently handle — user must tap
      }
    }
  }

  // Soft but clearly audible click sound for buttons
  public playClick() {
    if (!this.isEnabled) return;
    try {
      this.initContext();
      if (!this.audioCtx || !this.masterGain) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(900, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(450, this.audioCtx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.55, this.audioCtx.currentTime);  // MUCH louder
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.12);
    } catch {
      // safe fallback
    }
  }

  // Prominent temple bell / gold chime sound
  public playChime() {
    if (!this.isEnabled) return;
    try {
      this.initContext();
      if (!this.audioCtx || !this.masterGain) return;

      const now = this.audioCtx.currentTime;
      [587.33, 880, 1174.66, 1760].forEach((freq, idx) => {
        const osc = this.audioCtx!.createOscillator();
        const gain = this.audioCtx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);

        gain.gain.setValueAtTime(0, now + idx * 0.05);
        gain.gain.linearRampToValueAtTime(0.55, now + idx * 0.05 + 0.02); // was 0.15
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 1.5);

        osc.connect(gain);
        gain.connect(this.masterGain!);
        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 1.5);
      });
    } catch {
      // safe fallback
    }
  }

  // Celebratory Mangal Fanfare — full volume
  public playCelebration() {
    if (!this.isEnabled) return;
    try {
      this.initContext();
      if (!this.audioCtx || !this.masterGain) return;

      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      const now = this.audioCtx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.audioCtx!.createOscillator();
        const gain = this.audioCtx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.65, now + idx * 0.08 + 0.04); // was 0.18
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 1.8);

        osc.connect(gain);
        gain.connect(this.masterGain!);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 1.8);
      });
    } catch {
      // safe fallback
    }
  }

  // Ambient Shehnai / Sitar Raga notes
  private startAmbientMusic() {
    if (this.isMusicPlaying) return;
    this.isMusicPlaying = true;

    // Raga Yaman / Bhupali scale frequencies
    const ragaFrequencies = [261.63, 293.66, 329.63, 369.99, 392.00, 440.00, 493.88, 523.25];

    let noteIdx = 0;
    const playNextNote = () => {
      if (!this.isEnabled || !this.isMusicPlaying || !this.audioCtx || !this.musicGain) return;

      const freq = ragaFrequencies[noteIdx % ragaFrequencies.length];
      noteIdx = (noteIdx + Math.floor(Math.random() * 3) + 1) % ragaFrequencies.length;

      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now);

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.linearRampToValueAtTime(freq * 1.012, now + 1.2);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.22, now + 0.4); // was 0.06
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.musicGain);

      osc.start(now);
      osc.stop(now + 2.8);
    };

    playNextNote();
    this.musicInterval = window.setInterval(playNextNote, 2200);
  }

  private stopAmbientMusic() {
    this.isMusicPlaying = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }
}

export const soundManager = new SoundManager();
