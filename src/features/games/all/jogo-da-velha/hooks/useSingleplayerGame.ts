'use client'

import { useEffect, useState } from 'react'
import { EMPTY_BOARD, AI_MOVE_DELAY_MS } from '../constants'
import { checkWinner, isDraw, getBestMove } from '../engine/ticTacToeEngine'
import type { Board, Symbol } from '../types'

const PLAYER_SYMBOL: Symbol = 'X'
const AI_SYMBOL: Symbol = 'O'

export function useSingleplayerGame() {
  const [board, setBoard] = useState<Board>(EMPTY_BOARD)
  const [currentTurn, setCurrentTurn] = useState<Symbol>(PLAYER_SYMBOL)

  const { winner, line } = checkWinner(board)
  const draw = isDraw(board)
  const isOver = winner !== null || draw

  useEffect(() => {
    if (isOver || currentTurn !== AI_SYMBOL) return

    const timeout = setTimeout(() => {
      setBoard((current) => {
        const index = getBestMove(current, AI_SYMBOL)
        if (index === -1) return current
        const next = [...current]
        next[index] = AI_SYMBOL
        return next
      })
      setCurrentTurn(PLAYER_SYMBOL)
    }, AI_MOVE_DELAY_MS)

    return () => clearTimeout(timeout)
  }, [currentTurn, isOver])

  function handleCellClick(index: number) {
    if (isOver || currentTurn !== PLAYER_SYMBOL || board[index] !== null) return
    const next = [...board]
    next[index] = PLAYER_SYMBOL
    setBoard(next)
    setCurrentTurn(AI_SYMBOL)
  }

  function reset() {
    setBoard(EMPTY_BOARD)
    setCurrentTurn(PLAYER_SYMBOL)
  }

  return {
    board,
    currentTurn,
    winner,
    winningLine: line,
    isDraw: draw,
    isOver,
    playerSymbol: PLAYER_SYMBOL,
    aiSymbol: AI_SYMBOL,
    handleCellClick,
    reset,
  }
}
