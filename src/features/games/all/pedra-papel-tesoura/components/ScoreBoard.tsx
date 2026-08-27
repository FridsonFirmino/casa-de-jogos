'use client'

import type { Score } from '../types'

interface ScoreBoardProps {
  score: Score
  playerName: string
  opponentName: string
  currentRound: number
  totalRounds: number
}

export default function ScoreBoard({
  score,
  playerName,
  opponentName,
  currentRound,
  totalRounds,
}: ScoreBoardProps) {
  return (
    <div className="flex w-full max-w-md flex-col items-center gap-3">
      <div className="flex w-full items-center justify-between">
        <PlayerScore name={playerName} score={score.player} side="left" />
        <div className="flex flex-col items-center">
          <span className="text-xs text-zinc-500">Rodada</span>
          <span className="font-display text-sm text-zinc-300">
            {currentRound}/{totalRounds}
          </span>
        </div>
        <PlayerScore name={opponentName} score={score.opponent} side="right" />
      </div>
      {score.draws > 0 && (
        <span className="text-xs text-zinc-500">
          {score.draws} {score.draws === 1 ? 'empate' : 'empates'}
        </span>
      )}
    </div>
  )
}

function PlayerScore({ name, score, side }: { name: string; score: number; side: 'left' | 'right' }) {
  return (
    <div className={`flex flex-col items-center ${side === 'right' ? 'text-right' : 'text-left'}`}>
      <span className="max-w-[6rem] truncate text-xs text-zinc-500">{name}</span>
      <span className="font-display text-3xl text-zinc-100">{score}</span>
    </div>
  )
}
