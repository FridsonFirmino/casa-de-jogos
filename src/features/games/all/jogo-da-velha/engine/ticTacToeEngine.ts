import { WIN_LINES } from '../constants'
import type { Board, Symbol, WinResult } from '../types'

export function checkWinner(board: Board): WinResult {
  for (const line of WIN_LINES) {
    const [a, b, c] = line
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line }
    }
  }
  return { winner: null, line: null }
}

export function isDraw(board: Board): boolean {
  return board.every((cell) => cell !== null) && checkWinner(board).winner === null
}

export function isGameOver(board: Board): boolean {
  return checkWinner(board).winner !== null || isDraw(board)
}

function opponentOf(symbol: Symbol): Symbol {
  return symbol === 'X' ? 'O' : 'X'
}

function minimax(board: Board, currentTurn: Symbol, aiSymbol: Symbol): number {
  const { winner } = checkWinner(board)
  if (winner === aiSymbol) return 10
  if (winner === opponentOf(aiSymbol)) return -10
  if (isDraw(board)) return 0

  const scores: number[] = []
  for (let i = 0; i < board.length; i++) {
    if (board[i] !== null) continue
    const next = [...board]
    next[i] = currentTurn
    scores.push(minimax(next, opponentOf(currentTurn), aiSymbol))
  }

  return currentTurn === aiSymbol ? Math.max(...scores) : Math.min(...scores)
}

export function getBestMove(board: Board, aiSymbol: Symbol): number {
  let bestScore = -Infinity
  let bestIndex = -1

  for (let i = 0; i < board.length; i++) {
    if (board[i] !== null) continue
    const next = [...board]
    next[i] = aiSymbol
    const score = minimax(next, opponentOf(aiSymbol), aiSymbol)
    if (score > bestScore) {
      bestScore = score
      bestIndex = i
    }
  }

  return bestIndex
}

export function generateRoomCode(alphabet: string, length: number): string {
  let code = ''
  for (let i = 0; i < length; i++) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)]
  }
  return code
}
