'use client'

import { CHOICE_ICONS, CHOICE_LABELS } from '../constants'
import type { Choice, RoundResult } from '../types'

interface ResultDisplayProps {
  playerChoice: Choice
  opponentChoice: Choice
  result: RoundResult
  playerName: string
  opponentName: string
}

export default function ResultDisplay({
  playerChoice,
  opponentChoice,
  result,
  playerName,
  opponentName,
}: ResultDisplayProps) {
  const resultMessage = {
    win: 'Você venceu!',
    lose: 'Você perdeu!',
    draw: 'Empate!',
  }

  const resultColor = {
    win: 'text-emerald-400',
    lose: 'text-red-400',
    draw: 'text-yellow-400',
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-6 sm:gap-10">
        <ChoiceDisplay
          choice={playerChoice}
          name={playerName}
          won={result === 'win'}
        />
        <span className="text-lg font-bold text-zinc-500">VS</span>
        <ChoiceDisplay
          choice={opponentChoice}
          name={opponentName}
          won={result === 'lose'}
        />
      </div>
      <span className={`font-display text-2xl ${resultColor[result]}`}>
        {resultMessage[result]}
      </span>
    </div>
  )
}

function ChoiceDisplay({ choice, name, won }: { choice: Choice; name: string; won: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`flex h-20 w-20 items-center justify-center rounded-2xl border-2 text-4xl sm:h-24 sm:w-24 sm:text-5xl ${
          won ? 'border-emerald-500 bg-emerald-500/15' : 'border-zinc-700/50 bg-zinc-800/50'
        }`}
      >
        <span className="select-none">{CHOICE_ICONS[choice]}</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-xs text-zinc-500">{name}</span>
        <span className="text-sm text-zinc-300">{CHOICE_LABELS[choice]}</span>
      </div>
    </div>
  )
}
