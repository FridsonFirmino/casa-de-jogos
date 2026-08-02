"use client";

import Controls from "./components/Controls";
import GameBoard from "./components/GameBoard";
import GameOverOverlay from "./components/GameOverOverlay";
import { usePacmanGame } from "./hooks/usePacmanGame";

export default function Game() {
  const {
    canvasRef,
    status,
    score,
    highScore,
    lives,
    volume,
    setVolume,
    start,
    restart,
    handleDirection,
    togglePause,
  } = usePacmanGame();

  return (
    <div className="flex min-h-0 flex-1 flex-col items-stretch gap-3 py-4">
      <div className="flex shrink-0 items-center justify-center gap-10">
        <div className="text-center">
          <p className="text-xs uppercase tracking-wider text-zinc-500">
            Pontos
          </p>
          <p className="font-display text-2xl tabular-nums text-zinc-100">
            {String(score).padStart(5, "0")}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs uppercase tracking-wider text-zinc-500">
            Recorde
          </p>
          <p className="font-display text-2xl tabular-nums text-highlight">
            {String(highScore).padStart(5, "0")}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs uppercase tracking-wider text-zinc-500">
            Vidas
          </p>
          <p className="font-display text-2xl tabular-nums text-zinc-100">
            {"\u25cf".repeat(Math.max(0, lives))}
          </p>
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center">
        <GameBoard canvasRef={canvasRef} />

        {status === "idle" && (
          <div className="absolute inset-0 flex items-center justify-center p-2">
            <div className="flex flex-col items-center gap-4 rounded-xl border border-zinc-800/50 bg-zinc-900/80 p-8 backdrop-blur-sm">
              <p className="font-display text-lg text-zinc-100">Pac-Man</p>
              <p className="max-w-[240px] text-center text-sm text-zinc-500">
                Coma todos os pontos e fuja dos fantasmas. Pegue as pílulas
                luminosas para virar o jogo e devorar os fantasmas.
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

        {(status === "gameOver" || status === "won") && (
          <div className="absolute inset-0 flex items-center justify-center p-2">
            <GameOverOverlay
              score={score}
              highScore={highScore}
              won={status === "won"}
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
