"use client";

import Controls from "./components/Controls";
import GameBoard from "./components/GameBoard";
import GameOverOverlay from "./components/GameOverOverlay";
import { useSnakeGame } from "./hooks/useSnakeGame";

export default function Game() {
  const {
    canvasRef,
    status,
    score,
    highScore,
    volume,
    setVolume,
    start,
    restart,
    handleDirection,
    togglePause,
  } = useSnakeGame();

  return (
    <div className="flex flex-1 flex-col items-stretch gap-3 py-4 min-h-0">
      <div className="flex shrink-0 items-center justify-center gap-8">
        <div className="text-center">
          <p className="text-xs text-zinc-500 uppercase tracking-wider">
            Score
          </p>
          <p className="font-display text-2xl text-zinc-100 tabular-nums">
            {String(score).padStart(3, "0")}
          </p>
        </div>

        <div className="text-center">
          <p className="text-xs text-zinc-500 uppercase tracking-wider">
            Recorde
          </p>
          <p className="font-display text-2xl text-highlight tabular-nums">
            {String(highScore).padStart(3, "0")}
          </p>
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center">
        <GameBoard canvasRef={canvasRef} />

        {status === "idle" && (
          <div className="absolute inset-0 flex items-center justify-center p-2">
            <div className="flex flex-col items-center gap-4 rounded-xl border border-zinc-800/50 bg-zinc-900/80 p-8 backdrop-blur-sm">
              <p className="font-display text-lg text-zinc-100">Snake</p>
              <p className="max-w-[200px] text-center text-sm text-zinc-500">
                Use as setas para mover e comer a comida. Não bata na parede ou
                em si mesmo.
              </p>
              <button
                type="button"
                className="rounded-lg bg-accent px-6 py-2 font-display text-sm text-white transition-colors hover:bg-accent-dark"
                onClick={start}
              >
                Jogar
              </button>
            </div>
          </div>
        )}

        {status === "paused" && (
          <div className="absolute inset-0 flex items-center justify-center p-2">
            <div className="flex flex-col items-center gap-4 rounded-xl border border-zinc-800/50 bg-zinc-900/80 p-8 backdrop-blur-sm">
              <p className="font-display text-lg text-zinc-100">Pausado</p>
              <button
                type="button"
                className="rounded-lg bg-accent px-6 py-2 font-display text-sm text-white transition-colors hover:bg-accent-dark"
                onClick={togglePause}
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {status === "gameOver" && (
          <div className="absolute inset-0 flex items-center justify-center p-2">
            <GameOverOverlay
              score={score}
              highScore={highScore}
              onRestart={restart}
            />
          </div>
        )}
      </div>

      <Controls
        onDirection={handleDirection}
        volume={volume}
        onVolumeChange={setVolume}
      />
    </div>
  );
}
