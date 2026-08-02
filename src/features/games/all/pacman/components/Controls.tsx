"use client";

import type { Direction } from "../engine/pacmanEngine";

interface ControlsProps {
  onDirection: (dir: Direction) => void;
  volume: number;
  onVolumeChange: (v: number) => void;
}

export default function Controls({
  onDirection,
  volume,
  onVolumeChange,
}: ControlsProps) {
  const arrow: Record<string, string> = {
    UP: "\u2191",
    DOWN: "\u2193",
    LEFT: "\u2190",
    RIGHT: "\u2192",
  };

  const dirBtn = (d: Direction) => (
    <button
      type="button"
      className="flex h-12 w-12 items-center justify-center rounded-lg border border-zinc-700/50 bg-zinc-800/50 text-zinc-300 active:bg-zinc-700/50 sm:hidden"
      onPointerDown={() => onDirection(d)}
      aria-label={d}
    >
      <span className="text-lg">{arrow[d]}</span>
    </button>
  );

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-4 text-sm text-zinc-500">
        <span className="hidden sm:inline">Setas / WASD para mover</span>
        <span className="hidden sm:inline">|</span>
        <span className="hidden sm:inline">Espaço para pausar</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="grid grid-cols-3 gap-2">
          <div />
          {dirBtn("UP")}
          <div />
          {dirBtn("LEFT")}
          {dirBtn("DOWN")}
          {dirBtn("RIGHT")}
        </div>

        <div className="h-16 w-px bg-zinc-800" />

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="text-xs text-zinc-500 transition-colors hover:text-zinc-300"
            onClick={() => onVolumeChange(Math.max(0, volume - 0.1))}
            aria-label="Diminuir volume"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          </button>

          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={(e) => onVolumeChange(Number(e.target.value))}
            className="h-1 w-20 cursor-pointer appearance-none rounded-full bg-zinc-700 accent-accent"
            aria-label="Volume"
          />

          <button
            type="button"
            className="text-xs text-zinc-500 transition-colors hover:text-zinc-300"
            onClick={() => onVolumeChange(Math.min(1, volume + 0.1))}
            aria-label="Aumentar volume"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          </button>

          <span className="min-w-[3ch] text-xs text-zinc-500 tabular-nums">
            {Math.round(volume * 100)}
          </span>
        </div>
      </div>
    </div>
  );
}
