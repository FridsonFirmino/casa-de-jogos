'use client'

import { Button } from '@/components/ui/Button'

interface GameOverOverlayProps {
  score: number
  highScore: number
  onRestart: () => void
}

export default function GameOverOverlay({ score, highScore, onRestart }: GameOverOverlayProps) {
  const isNewRecord = score >= highScore && score > 0

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-zinc-800/50 bg-zinc-900/80 p-8 backdrop-blur-sm">
      <h2 className="font-display text-2xl text-red-400">Game Over</h2>

      <div className="flex gap-8 text-center">
        <div>
          <p className="text-sm text-zinc-500">Score</p>
          <p className="font-display text-3xl text-zinc-100">{score}</p>
        </div>
        <div>
          <p className="text-sm text-zinc-500">Recorde</p>
          <p className="font-display text-3xl text-highlight">{highScore}</p>
        </div>
      </div>

      {isNewRecord && (
        <p className="font-display text-sm text-highlight animate-pulse">
          Novo recorde!
        </p>
      )}

      <Button variant="primary" onClick={onRestart}>
        Jogar Novamente
      </Button>
    </div>
  )
}
