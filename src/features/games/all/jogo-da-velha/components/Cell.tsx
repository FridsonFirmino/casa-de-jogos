'use client'

import type { Cell as CellValue } from '../types'

interface CellProps {
  value: CellValue
  onClick: () => void
  disabled: boolean
  isWinning: boolean
}

export default function Cell({ value, onClick, disabled, isWinning }: CellProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || value !== null}
      aria-label={value ? `Célula ocupada por ${value}` : 'Célula vazia'}
      className={`flex aspect-square items-center justify-center rounded-xl border text-4xl font-bold transition-colors sm:text-5xl ${
        isWinning
          ? 'border-highlight bg-highlight/10 text-highlight'
          : 'border-zinc-700/50 bg-zinc-800/50 text-zinc-100'
      } ${!disabled && value === null ? 'hover:bg-zinc-700/50' : ''} disabled:cursor-not-allowed`}
    >
      {value}
    </button>
  )
}
