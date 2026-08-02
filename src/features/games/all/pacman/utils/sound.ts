class SoundManager {
  private ctx: AudioContext | null = null;
  private _volume = 0.3;
  private bgOsc: OscillatorNode | null = null;
  private bgGain: GainNode | null = null;

  get volume(): number {
    return this._volume;
  }

  set volume(value: number) {
    this._volume = Math.max(0, Math.min(1, value));
    if (this.bgGain) {
      this.bgGain.gain.value = this._volume * 0.08;
    }
  }

  private getContext(): AudioContext {
    if (!this.ctx) {
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === "suspended") {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  private blip(
    freqStart: number,
    freqEnd: number,
    duration: number,
    type: OscillatorType,
    gainMul: number,
  ): void {
    if (this._volume === 0) return;
    const ctx = this.getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freqStart, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(
      freqEnd,
      ctx.currentTime + duration,
    );
    gain.gain.setValueAtTime(this._volume * gainMul, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  }

  playEat(): void {
    this.blip(400, 900, 0.09, "square", 0.2);
  }

  playPellet(): void {
    this.blip(250, 1200, 0.25, "square", 0.25);
  }

  playGhostEaten(): void {
    this.blip(600, 200, 0.3, "square", 0.3);
  }

  playDeath(): void {
    const ctx = this.getContext();
    if (this._volume === 0) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.8);
    gain.gain.setValueAtTime(this._volume * 0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.8);
  }

  startBackground(): void {
    if (this.bgOsc) return;
    const ctx = this.getContext();
    this.bgOsc = ctx.createOscillator();
    this.bgGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    this.bgOsc.type = "triangle";
    this.bgOsc.frequency.setValueAtTime(60, ctx.currentTime);
    this.bgGain.gain.value = this._volume * 0.08;
    filter.type = "lowpass";
    filter.frequency.value = 140;
    this.bgOsc.connect(filter);
    filter.connect(this.bgGain);
    this.bgGain.connect(ctx.destination);
    this.bgOsc.start();
  }

  stopBackground(): void {
    if (this.bgOsc) {
      try {
        this.bgOsc.stop();
      } catch {
        // ignore
      }
      this.bgOsc = null;
      this.bgGain = null;
    }
  }
}

export const soundManager = new SoundManager();
