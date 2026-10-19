// Audio & Synthesizer system: Relaxing Grand Piano & Luxury Royal Ambience
class SoundManager {
  private audioCtx: AudioContext | null = null;
  private isEnabled: boolean = true; // Sound ON by default
  private isMusicPlaying: boolean = false;
  private musicInterval: number | null = null;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private currentStep: number = 0;

  constructor() {
    this.isEnabled = true;
  }

  private initContext() {
    if (!this.audioCtx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();

      // Master dynamics compressor to ensure loud, crystal-clear sound without any distortion
      const compressor = this.audioCtx.createDynamicsCompressor();
      compressor.threshold.setValueAtTime(-14, this.audioCtx.currentTime);
      compressor.knee.setValueAtTime(6, this.audioCtx.currentTime);
      compressor.ratio.setValueAtTime(3.5, this.audioCtx.currentTime);
      compressor.attack.setValueAtTime(0.005, this.audioCtx.currentTime);
      compressor.release.setValueAtTime(0.2, this.audioCtx.currentTime);

      // Master gain for full, rich volume across all phones and speakers
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.value = 1.0; // Increased to 1.0 for full audibility
      this.masterGain.connect(compressor);
      compressor.connect(this.audioCtx.destination);

      // Music gain specifically for the peaceful piano ambient track (raised significantly)
      this.musicGain = this.audioCtx.createGain();
      this.musicGain.gain.value = 0.95; // Increased from 0.55 to 0.95
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
      this.playInvitationOpen();
    } else {
      this.stopAmbientMusic();
      if (this.masterGain && this.audioCtx) {
        this.masterGain.gain.setTargetAtTime(0, this.audioCtx.currentTime, 0.25);
        setTimeout(() => {
          if (this.masterGain) this.masterGain.gain.value = 1.0;
        }, 800);
      }
    }
    return this.isEnabled;
  }

  // Safe autostart on first user gesture
  public tryAutoStart() {
    if (this.isEnabled && !this.isMusicPlaying) {
      try {
        this.initContext();
        this.startAmbientMusic();
      } catch {
        // silently handled
      }
    }
  }

  /**
   * Physically modeled acoustic piano note synthesizer:
   * - Fundamental frequency + unison micro-detune (+1.2 cents)
   * - Harmonic overtones (2nd & 3rd harmonics with authentic acoustic decay)
   * - Gentle wooden soundboard lowpass filter (tuned for crystal clarity on phones)
   * - Soft percussive hammer strike transient
   * - Realistic sustain pedal resonance
   */
  private playPianoNote(
    freq: number,
    startTime: number,
    duration: number = 3.5,
    velocity: number = 0.55,
    pan: number = 0
  ) {
    if (!this.audioCtx || !this.musicGain) return;
    const ctx = this.audioCtx;

    // Filter to emulate warm piano soundboard wood resonance with clear projection
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(Math.min(freq * 4.2, 3600), startTime);
    filter.frequency.exponentialRampToValueAtTime(Math.min(freq * 2.0, 1600), startTime + duration * 0.7);
    filter.Q.value = 0.9;

    // Master envelope for the note
    const noteGain = ctx.createGain();
    noteGain.gain.setValueAtTime(0, startTime);
    // Soft organic hammer attack (18ms)
    noteGain.gain.linearRampToValueAtTime(velocity, startTime + 0.018);
    // Initial attack-to-body decay (60ms)
    noteGain.gain.exponentialRampToValueAtTime(velocity * 0.8, startTime + 0.075);
    // Smooth natural exponential string decay
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    // Fundamental string 1
    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, startTime);

    // Fundamental string 2 (slight unison detune for acoustic shimmer)
    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 1.0014, startTime);

    // 2nd Harmonic (octave above at full rich presence)
    const oscHarm2 = ctx.createOscillator();
    const harm2Gain = ctx.createGain();
    oscHarm2.type = 'sine';
    oscHarm2.frequency.setValueAtTime(freq * 2, startTime);
    harm2Gain.gain.setValueAtTime(velocity * 0.42, startTime);
    harm2Gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 0.65);

    // 3rd Harmonic (twelfth above)
    const oscHarm3 = ctx.createOscillator();
    const harm3Gain = ctx.createGain();
    oscHarm3.type = 'sine';
    oscHarm3.frequency.setValueAtTime(freq * 3, startTime);
    harm3Gain.gain.setValueAtTime(velocity * 0.16, startTime);
    harm3Gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 0.45);

    // Soft percussive hammer strike transient (short low-frequency thud)
    const hammer = ctx.createOscillator();
    const hammerGain = ctx.createGain();
    hammer.type = 'triangle';
    hammer.frequency.setValueAtTime(freq * 0.5, startTime);
    hammerGain.gain.setValueAtTime(velocity * 0.22, startTime);
    hammerGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.035);

    // Connections
    osc1.connect(filter);
    osc2.connect(filter);
    oscHarm2.connect(harm2Gain);
    harm2Gain.connect(filter);
    oscHarm3.connect(harm3Gain);
    harm3Gain.connect(filter);
    hammer.connect(hammerGain);
    hammerGain.connect(filter);

    filter.connect(noteGain);

    // Stereo panning for natural spatial presence
    if (ctx.createStereoPanner) {
      const panner = ctx.createStereoPanner();
      panner.pan.setValueAtTime(Math.max(-0.6, Math.min(0.6, pan)), startTime);
      noteGain.connect(panner);
      panner.connect(this.musicGain);
    } else {
      noteGain.connect(this.musicGain);
    }

    // Start & stop oscillators
    const stopTime = startTime + duration;
    osc1.start(startTime);
    osc1.stop(stopTime);
    osc2.start(startTime);
    osc2.stop(stopTime);
    oscHarm2.start(startTime);
    oscHarm2.stop(stopTime);
    oscHarm3.start(startTime);
    oscHarm3.stop(stopTime);
    hammer.start(startTime);
    hammer.stop(startTime + 0.05);
  }

  /**
   * Warm ambient pad layer: provides a soothing harmonic cushion
   * so the background always feels lush, relaxing, and cinematic.
   */
  private playPadChord(frequencies: number[], startTime: number, duration: number = 5.0) {
    if (!this.audioCtx || !this.musicGain) return;
    const ctx = this.audioCtx;

    frequencies.forEach((f) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(700, startTime);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.12, startTime + 1.2); // Raised from 0.045 to 0.12
      gain.gain.setValueAtTime(0.12, startTime + duration - 1.2);
      gain.gain.linearRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.musicGain!);

      osc.start(startTime);
      osc.stop(startTime + duration);
    });
  }

  /**
   * Relaxing, calming, emotional piano music composition:
   * Peaceful progression in F Major / C Major / D minor / A minor
   * with flowing arpeggios, gentle rubato, and warm pedal sustain.
   */
  private startAmbientMusic() {
    if (this.isMusicPlaying) return;
    this.isMusicPlaying = true;
    this.currentStep = 0;

    // Frequencies (Hz)
    // F2: 87.31, C3: 130.81, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, B3: 246.94
    // C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88
    // C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99, A5: 880.00
    const chords = [
      // Bar 1: Fmaj9 (Dreamy & Peaceful)
      {
        bass: 87.31, // F2
        pad: [174.61, 261.63, 329.63], // F3, C4, E4
        arpeggio: [
          { f: 87.31, t: 0.0, v: 0.65, p: -0.35, d: 4.8 },  // F2
          { f: 130.81, t: 0.45, v: 0.52, p: -0.2, d: 4.2 }, // C3
          { f: 220.00, t: 0.90, v: 0.52, p: -0.1, d: 3.8 }, // A3
          { f: 261.63, t: 1.35, v: 0.56, p: 0.0, d: 3.6 },  // C4
          { f: 329.63, t: 1.80, v: 0.55, p: 0.15, d: 3.5 }, // E4
          { f: 392.00, t: 2.25, v: 0.52, p: 0.25, d: 3.4 }, // G4
          { f: 329.63, t: 2.70, v: 0.46, p: 0.15, d: 3.2 }, // E4
          { f: 261.63, t: 3.15, v: 0.44, p: 0.0, d: 3.0 },  // C4
        ],
        duration: 3.8,
      },
      // Bar 2: Cmaj7/E (Warm, Grounding)
      {
        bass: 82.41, // E2
        pad: [164.81, 246.94, 261.63], // E3, B3, C4
        arpeggio: [
          { f: 82.41, t: 0.0, v: 0.64, p: -0.35, d: 4.8 },  // E2
          { f: 130.81, t: 0.45, v: 0.50, p: -0.2, d: 4.2 }, // C3
          { f: 196.00, t: 0.90, v: 0.52, p: -0.1, d: 3.8 }, // G3
          { f: 246.94, t: 1.35, v: 0.55, p: 0.05, d: 3.6 }, // B3
          { f: 261.63, t: 1.80, v: 0.52, p: 0.15, d: 3.5 }, // C4
          { f: 329.63, t: 2.25, v: 0.56, p: 0.25, d: 3.4 }, // E4
          { f: 246.94, t: 2.70, v: 0.44, p: 0.05, d: 3.2 }, // B3
          { f: 196.00, t: 3.15, v: 0.42, p: -0.1, d: 3.0 }, // G3
        ],
        duration: 3.8,
      },
      // Bar 3: Dm9 (Deep, Romantic & Calming)
      {
        bass: 73.42, // D2
        pad: [146.83, 220.00, 261.63], // D3, A3, C4
        arpeggio: [
          { f: 73.42, t: 0.0, v: 0.65, p: -0.4, d: 4.8 },   // D2
          { f: 146.83, t: 0.45, v: 0.52, p: -0.2, d: 4.2 }, // D3
          { f: 220.00, t: 0.90, v: 0.52, p: -0.1, d: 3.8 }, // A3
          { f: 261.63, t: 1.35, v: 0.56, p: 0.0, d: 3.6 },  // C4
          { f: 293.66, t: 1.80, v: 0.54, p: 0.15, d: 3.5 }, // D4
          { f: 349.23, t: 2.25, v: 0.58, p: 0.25, d: 3.4 }, // F4
          { f: 293.66, t: 2.70, v: 0.46, p: 0.15, d: 3.2 }, // D4
          { f: 220.00, t: 3.15, v: 0.44, p: -0.1, d: 3.0 }, // A3
        ],
        duration: 3.8,
      },
      // Bar 4: Am9 (Intimate & Soothing)
      {
        bass: 110.00, // A2
        pad: [164.81, 220.00, 293.66], // E3, A3, D4
        arpeggio: [
          { f: 110.00, t: 0.0, v: 0.62, p: -0.3, d: 4.8 },  // A2
          { f: 164.81, t: 0.45, v: 0.50, p: -0.15, d: 4.2 },// E3
          { f: 220.00, t: 0.90, v: 0.52, p: 0.0, d: 3.8 },  // A3
          { f: 246.94, t: 1.35, v: 0.55, p: 0.1, d: 3.6 },  // B3
          { f: 261.63, t: 1.80, v: 0.56, p: 0.18, d: 3.5 }, // C4
          { f: 329.63, t: 2.25, v: 0.52, p: 0.28, d: 3.4 }, // E4
          { f: 261.63, t: 2.70, v: 0.46, p: 0.18, d: 3.2 }, // C4
          { f: 220.00, t: 3.15, v: 0.42, p: 0.0, d: 3.0 },  // A3
        ],
        duration: 3.8,
      },
      // Bar 5: Gsus4 to G (Gentle uplifting resolution)
      {
        bass: 98.00, // G2
        pad: [196.00, 246.94, 293.66], // G3, B3, D4
        arpeggio: [
          { f: 98.00, t: 0.0, v: 0.62, p: -0.35, d: 4.8 },  // G2
          { f: 146.83, t: 0.45, v: 0.50, p: -0.2, d: 4.2 }, // D3
          { f: 196.00, t: 0.90, v: 0.52, p: -0.05, d: 3.8 },// G3
          { f: 261.63, t: 1.35, v: 0.55, p: 0.1, d: 3.6 },  // C4
          { f: 293.66, t: 1.80, v: 0.56, p: 0.2, d: 3.5 },  // D4
          { f: 392.00, t: 2.25, v: 0.52, p: 0.3, d: 3.4 },  // G4
          { f: 329.63, t: 2.70, v: 0.44, p: 0.18, d: 3.2 }, // E4
          { f: 246.94, t: 3.15, v: 0.42, p: 0.05, d: 3.0 }, // B3
        ],
        duration: 3.8,
      },
      // Bar 6: Cadd9 (Lush Serenity)
      {
        bass: 65.41, // C2
        pad: [130.81, 196.00, 293.66], // C3, G3, D4
        arpeggio: [
          { f: 65.41, t: 0.0, v: 0.65, p: -0.4, d: 5.0 },   // C2
          { f: 130.81, t: 0.45, v: 0.52, p: -0.2, d: 4.4 }, // C3
          { f: 196.00, t: 0.90, v: 0.52, p: -0.05, d: 4.0 },// G3
          { f: 261.63, t: 1.35, v: 0.56, p: 0.1, d: 3.8 },  // C4
          { f: 293.66, t: 1.80, v: 0.56, p: 0.2, d: 3.6 },  // D4
          { f: 329.63, t: 2.25, v: 0.58, p: 0.3, d: 3.5 },  // E4
          { f: 261.63, t: 2.70, v: 0.48, p: 0.1, d: 3.2 },  // C4
          { f: 196.00, t: 3.15, v: 0.44, p: -0.05, d: 3.0 },// G3
        ],
        duration: 3.8,
      },
    ];

    const playNextBar = () => {
      if (!this.isEnabled || !this.isMusicPlaying || !this.audioCtx || !this.musicGain) return;
      const ctx = this.audioCtx;
      const now = ctx.currentTime;

      const chord = chords[this.currentStep % chords.length];
      this.currentStep++;

      // Play soft ambient background cushion
      this.playPadChord(chord.pad, now, chord.duration + 1.2);

      // Play the peaceful arpeggiated piano notes
      chord.arpeggio.forEach((note) => {
        this.playPianoNote(
          note.f,
          now + note.t,
          note.d,
          note.v,
          note.p
        );
      });
    };

    // Play immediately and schedule subsequent bars seamlessly
    playNextBar();
    this.musicInterval = window.setInterval(playNextBar, 3650);
  }

  private stopAmbientMusic() {
    this.isMusicPlaying = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  /**
   * Premium Calm Wedding Invitation Reveal Sound Effect:
   * When the user clicks "Open Wedding Invitation", triggers a deeply soothing,
   * ethereal, warm harp-and-celesta cascading chord with a gentle golden swell.
   * Feels calm, opulent, relaxing, and ultra-premium.
   */
  public playInvitationOpen() {
    if (!this.isEnabled) return;
    try {
      this.initContext();
      if (!this.audioCtx || !this.masterGain) return;
      const ctx = this.audioCtx;
      const now = ctx.currentTime;

      // 1. Warm foundation acoustic bass pedal (soft, grounding, peaceful)
      [130.81, 196.00, 261.63].forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(650, now);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.40 - idx * 0.05, now + 0.12);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(now);
        osc.stop(now + 3.8);
      });

      // 2. Cascading ethereal celestial harp & crystalline celesta notes
      // C4, E4, G4, B4, D5, E5, G5, C6 (Lush Cmaj9 celestial arpeggio)
      const harpNotes = [
        { f: 261.63, delay: 0.04, vol: 0.48 }, // C4
        { f: 329.63, delay: 0.11, vol: 0.46 }, // E4
        { f: 392.00, delay: 0.18, vol: 0.45 }, // G4
        { f: 493.88, delay: 0.25, vol: 0.44 }, // B4
        { f: 587.33, delay: 0.33, vol: 0.42 }, // D5
        { f: 659.25, delay: 0.42, vol: 0.40 }, // E5
        { f: 783.99, delay: 0.52, vol: 0.38 }, // G5
        { f: 1046.50, delay: 0.64, vol: 0.34 }, // C6
      ];

      harpNotes.forEach((n) => {
        const osc = ctx.createOscillator();
        const oscHarm = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        filter.type = 'lowpass';
        // Warm lowpass filter to remove harshness and ensure a calm, gentle timbre
        filter.frequency.setValueAtTime(2400, now + n.delay);
        filter.frequency.exponentialRampToValueAtTime(1000, now + n.delay + 3.0);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(n.f, now + n.delay);

        // 2nd harmonic for rich celesta chime shimmer
        oscHarm.type = 'sine';
        oscHarm.frequency.setValueAtTime(n.f * 2, now + n.delay);

        const harmGain = ctx.createGain();
        harmGain.gain.setValueAtTime(n.vol * 0.30, now + n.delay);
        harmGain.gain.exponentialRampToValueAtTime(0.0001, now + n.delay + 1.8);

        // Smooth 40ms attack so it enters gently like silk, zero clicks
        gain.gain.setValueAtTime(0, now + n.delay);
        gain.gain.linearRampToValueAtTime(n.vol, now + n.delay + 0.04);
        // Long, calming 3.2s exponential decay
        gain.gain.exponentialRampToValueAtTime(0.0001, now + n.delay + 3.2);

        osc.connect(filter);
        oscHarm.connect(harmGain);
        harmGain.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(now + n.delay);
        osc.stop(now + n.delay + 3.3);
        oscHarm.start(now + n.delay);
        oscHarm.stop(now + n.delay + 2.0);
      });

      // 3. Subtle golden shimmer swell (ambient breath of royal silk)
      const shimmer = ctx.createOscillator();
      const shimmerGain = ctx.createGain();
      const shimmerFilter = ctx.createBiquadFilter();

      shimmerFilter.type = 'bandpass';
      shimmerFilter.frequency.setValueAtTime(800, now);
      shimmerFilter.frequency.exponentialRampToValueAtTime(1600, now + 0.6);
      shimmerFilter.Q.value = 1.2;

      shimmer.type = 'sine';
      shimmer.frequency.setValueAtTime(523.25, now);

      shimmerGain.gain.setValueAtTime(0, now);
      shimmerGain.gain.linearRampToValueAtTime(0.12, now + 0.35);
      shimmerGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

      shimmer.connect(shimmerFilter);
      shimmerFilter.connect(shimmerGain);
      shimmerGain.connect(this.masterGain!);

      shimmer.start(now);
      shimmer.stop(now + 2.6);
    } catch {
      // safe fallback
    }
  }

  // Soft, calming button tap
  public playClick() {
    if (!this.isEnabled) return;
    try {
      this.initContext();
      if (!this.audioCtx || !this.masterGain) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(650, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, this.audioCtx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.45, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.1);
    } catch {
      // safe fallback
    }
  }

  // Backwards-compatible chime (now relaxing & warm)
  public playChime() {
    this.playInvitationOpen();
  }

  // Celebratory Mangal Fanfare (harmonious warm bells)
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
        gain.gain.linearRampToValueAtTime(0.45, now + idx * 0.08 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 2.2);

        osc.connect(gain);
        gain.connect(this.masterGain!);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 2.2);
      });
    } catch {
      // safe fallback
    }
  }
}

export const soundManager = new SoundManager();
