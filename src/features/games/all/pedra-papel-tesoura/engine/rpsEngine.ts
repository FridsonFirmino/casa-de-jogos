import type { Choice, Difficulty, RoundResult } from '../types'

const WIN_MAP: Record<Choice, Choice> = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper',
}

export function getWinner(player: Choice, opponent: Choice): RoundResult {
  if (player === opponent) return 'draw'
  if (WIN_MAP[player] === opponent) return 'win'
  return 'lose'
}

export function beats(choice: Choice): Choice {
  return WIN_MAP[choice]
}

export function getComputerChoice(difficulty: Difficulty, history: Choice[]): Choice {
  if (difficulty === 'easy') {
    return randomChoice()
  }

  if (difficulty === 'medium') {
    if (history.length > 0 && Math.random() < 0.4) {
      const lastPlayerChoice = history[history.length - 1]
      return beats(lastPlayerChoice)
    }
    return randomChoice()
  }

  // hard: 60% counter + pattern analysis on last 3
  if (history.length >= 2 && Math.random() < 0.6) {
    const last3 = history.slice(-3)
    const freq: Record<Choice, number> = { rock: 0, paper: 0, scissors: 0 }
    for (const c of last3) {
      freq[c]++
    }
    const mostFrequent = (Object.entries(freq) as [Choice, number][]).sort((a, b) => b[1] - a[1])[0][0]
    return beats(mostFrequent)
  }

  if (history.length > 0 && Math.random() < 0.6) {
    const lastPlayerChoice = history[history.length - 1]
    return beats(lastPlayerChoice)
  }

  return randomChoice()
}

function randomChoice(): Choice {
  const idx = Math.floor(Math.random() * 3)
  return (['rock', 'paper', 'scissors'] as Choice[])[idx]
}

export function generateRoomCode(alphabet: string, length: number): string {
  let code = ''
  for (let i = 0; i < length; i++) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)]
  }
  return code
}
