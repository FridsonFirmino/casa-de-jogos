'use client'

import { Button } from '@/components/ui/Button'
import type { Symbol } from '../types'

interface GameOverPanelProps {
  winner: Symbol | null
  isDraw: boolean
  winnerName?: string
  onPlayAgain: () => void
  onLeaveRoom?: () => void
}

export default function GameOverPanel({
  winner,
  isDraw,
  winnerName,
  onPlayAgain,
  onLeaveRoom,
}: GameOverPanelProps) {
  const message = isDraw ? 'Empate!' : `${winnerName ?? winner} venceu!`

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-zinc-800/50 bg-zinc-900/80 p-8 backdrop-blur-sm">
      <h2 className="font-display text-2xl text-highlight">{message}</h2>
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
