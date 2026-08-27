'use client'

import { Button } from '@/components/ui/Button'
import type { Score } from '../types'

interface GameOverPanelProps {
  score: Score
  playerName: string
  opponentName: string
  onPlayAgain: () => void
  onLeaveRoom?: () => void
}

export default function GameOverPanel({
  score,
  playerName,
  opponentName,
  onPlayAgain,
  onLeaveRoom,
}: GameOverPanelProps) {
  const isWinner = score.player > score.opponent
  const isDraw = score.player === score.opponent

  const message = isDraw
    ? 'Empate!'
    : isWinner
      ? `${playerName} venceu!`
      : `${opponentName} venceu!`

  const emoji = isDraw ? '🤝' : isWinner ? '🏆' : '😤'

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-zinc-800/50 bg-zinc-900/80 p-8 backdrop-blur-sm">
      <span className="text-5xl">{emoji}</span>
      <h2 className="font-display text-2xl text-highlight">{message}</h2>
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-center">
          <span className="text-xs text-zinc-500">{playerName}</span>
          <span className="font-display text-3xl text-zinc-100">{score.player}</span>
        </div>
        <span className="text-sm text-zinc-500">x</span>
        <div className="flex flex-col items-center">
          <span className="text-xs text-zinc-500">{opponentName}</span>
          <span className="font-display text-3xl text-zinc-100">{score.opponent}</span>
        </div>
      </div>
      <div className="flex gap-3">
        <Button variant="primary" onClick={onPlayAgain}>
          Jogar Novamente
        </Button>
        {onLeaveRoom && (
          <Button variant="secondary" onClick={onLeaveRoom}>
            Sair da sala
          </Button>
        )}
      </div>
    </div>
  )
}
