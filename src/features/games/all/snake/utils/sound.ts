class SoundManager {
  private ctx: AudioContext | null = null
  private _volume = 0.3
  private bgOsc: OscillatorNode | null = null
  private bgGain: GainNode | null = null

  get volume(): number {
    return this._volume
  }

  set volume(value: number) {
    this._volume = Math.max(0, Math.min(1, value))
    if (this.bgGain) {
      this.bgGain.gain.value = this._volume * 0.12
    }
  }

  private getContext(): AudioContext {
    if (!this.ctx) {
      this.ctx = new AudioContext()
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
    return this.ctx
  }

  playEat(): void {
    if (this._volume === 0) return
    const ctx = this.getContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'square'
    osc.frequency.setValueAtTime(500, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.08)
    gain.gain.setValueAtTime(this._volume * 0.25, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.12)
  }

  playWallHit(): void {
    if (this._volume === 0) return
    const ctx = this.getContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(120, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.25)
    gain.gain.setValueAtTime(this._volume * 0.35, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.25)
  }

  playSelfHit(): void {
    if (this._volume === 0) return
    const ctx = this.getContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'square'
    osc.frequency.setValueAtTime(250, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.35)
    gain.gain.setValueAtTime(this._volume * 0.35, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.35)
  }

  startBackground(): void {
    if (this.bgOsc) return
    const ctx = this.getContext()

    this.bgOsc = ctx.createOscillator()
    this.bgGain = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    this.bgOsc.type = 'triangle'
    this.bgOsc.frequency.setValueAtTime(55, ctx.currentTime)
    this.bgGain.gain.value = this._volume * 0.12

    filter.type = 'lowpass'
    filter.frequency.value = 150

    this.bgOsc.connect(filter)
    filter.connect(this.bgGain)
    this.bgGain.connect(ctx.destination)
    this.bgOsc.start()
  }

  stopBackground(): void {
    if (this.bgOsc) {
      try {
        this.bgOsc.stop()
      } catch {
      }
      this.bgOsc = null
      this.bgGain = null
    }
  }
}

export const soundManager = new SoundManager()
