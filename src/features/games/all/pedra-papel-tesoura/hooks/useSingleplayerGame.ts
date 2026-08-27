'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { getWinner, getComputerChoice } from '../engine/rpsEngine'
import { REVEAL_DELAY_MS, TOTAL_ROUNDS } from '../constants'
import type { Choice, Difficulty, RoundRecord, RoundResult, Score, SingleplayerPhase } from '../types'

export function useSingleplayerGame() {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [phase, setPhase] = useState<SingleplayerPhase>('playing')
  const [currentRound, setCurrentRound] = useState(1)
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null)
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null)
  const [lastResult, setLastResult] = useState<RoundResult | null>(null)
  const [score, setScore] = useState<Score>({ player: 0, opponent: 0, draws: 0 })
  const [history, setHistory] = useState<RoundRecord[]>([])
  const choiceHistoryRef = useRef<Choice[]>([])
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const makeChoice = useCallback(
    (choice: Choice) => {
      if (phase !== 'playing' || playerChoice !== null) return

      setPlayerChoice(choice)
      choiceHistoryRef.current.push(choice)

      const computer = getComputerChoice(difficulty, choiceHistoryRef.current)
      setComputerChoice(computer)

      const result = getWinner(choice, computer)
      setLastResult(result)

      setScore((prev) => ({
        player: prev.player + (result === 'win' ? 1 : 0),
        opponent: prev.opponent + (result === 'lose' ? 1 : 0),
        draws: prev.draws + (result === 'draw' ? 1 : 0),
      }))

      setHistory((prev) => [
        ...prev,
        { round: currentRound, playerChoice: choice, opponentChoice: computer, result },
      ])

      timeoutRef.current = setTimeout(() => {
        if (currentRound >= TOTAL_ROUNDS) {
          setPhase('finished')
        } else {
          setPhase('reveal')
          timeoutRef.current = setTimeout(() => {
            setCurrentRound((r) => r + 1)
            setPlayerChoice(null)
            setComputerChoice(null)
            setLastResult(null)
            setPhase('playing')
          }, 1500)
        }
      }, REVEAL_DELAY_MS)
    },
    [phase, playerChoice, difficulty, currentRound],
  )

  const reset = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    choiceHistoryRef.current = []
    setCurrentRound(1)
    setPlayerChoice(null)
    setComputerChoice(null)
    setLastResult(null)
    setScore({ player: 0, opponent: 0, draws: 0 })
    setHistory([])
    setPhase('playing')
  }, [])

  return {
    phase,
    difficulty,
    currentRound,
    playerChoice,
    computerChoice,
    lastResult,
    score,
    history,
    setDifficulty,
    makeChoice,
    reset,
  }
}
