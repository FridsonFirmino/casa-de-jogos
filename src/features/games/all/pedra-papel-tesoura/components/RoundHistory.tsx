'use client'

import { CHOICE_ICONS } from '../constants'
import type { RoundRecord } from '../types'

interface RoundHistoryProps {
  history: RoundRecord[]
}

export default function RoundHistory({ history }: RoundHistoryProps) {
  if (history.length === 0) return null

  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <span className="text-center text-xs text-zinc-500">Histórico</span>
      <div className="flex flex-wrap justify-center gap-2">
        {history.map((round) => (
          <RoundBadge key={round.round} round={round} />
        ))}
      </div>
    </div>
  )
}

function RoundBadge({ round }: { round: RoundRecord }) {
  const borderColor = {
    win: 'border-emerald-500/50',
    lose: 'border-red-500/50',
    draw: 'border-yellow-500/50',
  }

  const bgColor = {
    win: 'bg-emerald-500/10',
    lose: 'bg-red-500/10',
    draw: 'bg-yellow-500/10',
  }

  return (
    <div
      className={`flex items-center gap-1.5 rounded-lg border px-2 py-1 ${borderColor[round.result]} ${bgColor[round.result]}`}
    >
      <span className="text-xs">{CHOICE_ICONS[round.playerChoice]}</span>
      <span className="text-[10px] text-zinc-500">vs</span>
      <span className="text-xs">{CHOICE_ICONS[round.opponentChoice]}</span>
    </div>
  )
}
