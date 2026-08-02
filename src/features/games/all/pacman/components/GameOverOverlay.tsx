"use client";

import { Button } from "@/components/ui/Button";

interface GameOverOverlayProps {
  score: number;
  highScore: number;
  won: boolean;
  onRestart: () => void;
}

export default function GameOverOverlay({
  score,
  highScore,
  won,
  onRestart,
}: GameOverOverlayProps) {
  const isNewRecord = score >= highScore && score > 0;

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-zinc-800/50 bg-zinc-900/80 p-8 backdrop-blur-sm">
      <h2
        className={`font-display text-2xl ${won ? "text-highlight" : "text-red-400"}`}
      >
        {won ? "Nível completo!" : "Game Over"}
      </h2>

      <div className="flex gap-8 text-center">
        <div>
          <p className="text-sm text-zinc-500">Pontos</p>
          <p className="font-display text-3xl text-zinc-100">{score}</p>
        </div>
        <div>
          <p className="text-sm text-zinc-500">Recorde</p>
          <p className="font-display text-3xl text-highlight">{highScore}</p>
        </div>
      </div>

      {isNewRecord && (
        <p className="animate-pulse font-display text-sm text-highlight">
          Novo recorde!
        </p>
      )}

      <Button variant="primary" onClick={onRestart}>
        Jogar Novamente
      </Button>
    </div>
  );
}
