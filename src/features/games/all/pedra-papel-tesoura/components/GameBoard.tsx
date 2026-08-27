'use client'

import { useCallback, useState } from 'react'
import ChoiceButton from './ChoiceButton'
import ResultDisplay from './ResultDisplay'
import CountdownTimer from './CountdownTimer'
import ScoreBoard from './ScoreBoard'
import RoundHistory from './RoundHistory'
import GameOverPanel from './GameOverPanel'
import { useSingleplayerGame } from '../hooks/useSingleplayerGame'
import { CHOICES, TOTAL_ROUNDS } from '../constants'
import type { Choice } from '../types'

interface DifficultySelectProps {
  onSelect: (difficulty: 'easy' | 'medium' | 'hard') => void
}

function DifficultySelect({ onSelect }: DifficultySelectProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-zinc-800/50 bg-zinc-900/50 p-8">
      <h2 className="font-display text-lg text-zinc-100">Escolha a dificuldade</h2>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => onSelect('easy')}
          className="rounded-xl border border-zinc-700/50 bg-zinc-800/50 px-6 py-3 text-sm text-zinc-300 transition-all hover:border-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-400"
        >
          Fácil
        </button>
        <button
          type="button"
          onClick={() => onSelect('medium')}
          className="rounded-xl border border-zinc-700/50 bg-zinc-800/50 px-6 py-3 text-sm text-zinc-300 transition-all hover:border-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-400"
        >
          Médio
        </button>
        <button
          type="button"
          onClick={() => onSelect('hard')}
          className="rounded-xl border border-zinc-700/50 bg-zinc-800/50 px-6 py-3 text-sm text-zinc-300 transition-all hover:border-red-500 hover:bg-red-500/10 hover:text-red-400"
        >
          Difícil
        </button>
      </div>
    </div>
  )
}

export default function GameBoard() {
  const [showDifficulty, setShowDifficulty] = useState(true)
  const game = useSingleplayerGame()

  const handleDifficultySelect = useCallback((difficulty: 'easy' | 'medium' | 'hard') => {
    game.setDifficulty(difficulty)
    setShowDifficulty(false)
  }, [game])

  const handleChoice = useCallback((choice: Choice) => {
    game.makeChoice(choice)
  }, [game])

  const handlePlayAgain = useCallback(() => {
    setShowDifficulty(true)
    game.reset()
  }, [game])

  if (showDifficulty) {
    return <DifficultySelect onSelect={handleDifficultySelect} />
  }

  return (
    <div className="flex flex-1 flex-col items-center gap-6 py-4">
      <ScoreBoard
        score={game.score}
        playerName="Você"
        opponentName="Computador"
        currentRound={game.currentRound}
        totalRounds={TOTAL_ROUNDS}
      />

      <div className="flex flex-1 items-center justify-center">
        {game.phase === 'reveal' && game.playerChoice && game.computerChoice && (
          <ResultDisplay
            playerChoice={game.playerChoice}
            opponentChoice={game.computerChoice}
            result={game.lastResult!}
            playerName="Você"
            opponentName="Computador"
          />
        )}

        {game.phase === 'playing' && !game.playerChoice && (
          <div className="flex flex-col items-center gap-6">
            <CountdownTimer duration={3} onComplete={() => {}} />
            <div className="flex gap-4">
              {CHOICES.map((choice) => (
                <ChoiceButton
                  key={choice}
                  choice={choice}
                  onClick={() => handleChoice(choice)}
                  disabled={game.phase !== 'playing'}
                />
              ))}
            </div>
          </div>
        )}

        {game.phase === 'playing' && game.playerChoice && (
          <div className="flex flex-col items-center gap-4">
            <span className="text-sm text-zinc-500">Aguardando resultado...</span>
            <div className="flex gap-4">
              {CHOICES.map((choice) => (
                <ChoiceButton
                  key={choice}
                  choice={choice}
                  onClick={() => {}}
                  disabled
                  selected={choice === game.playerChoice}
                />
              ))}
            </div>
          </div>
        )}

        {game.phase === 'finished' && (
          <GameOverPanel
            score={game.score}
            playerName="Você"
            opponentName="Computador"
            onPlayAgain={handlePlayAgain}
          />
        )}
      </div>

      <RoundHistory history={game.history} />
    </div>
  )
}
