'use client'

import Cell from './Cell'
import type { Board as BoardValue } from '../types'

interface BoardProps {
  board: BoardValue
  onCellClick: (index: number) => void
  disabled: boolean
  winningLine: number[] | null
}

export default function Board({ board, onCellClick, disabled, winningLine }: BoardProps) {
  return (
    <div className="grid w-full max-w-sm grid-cols-3 gap-3">
      {board.map((value, index) => (
        <Cell
          key={index}
          value={value}
          onClick={() => onCellClick(index)}
          disabled={disabled}
          isWinning={winningLine?.includes(index) ?? false}
        />
      ))}
    </div>
  )
}
