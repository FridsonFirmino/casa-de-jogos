'use client'

import { CHOICE_ICONS, CHOICE_LABELS } from '../constants'
import type { Choice } from '../types'

interface ChoiceButtonProps {
  choice: Choice
  onClick: () => void
  disabled?: boolean
  selected?: boolean
  size?: 'md' | 'lg'
}

export default function ChoiceButton({
  choice,
  onClick,
  disabled = false,
  selected = false,
  size = 'lg',
}: ChoiceButtonProps) {
  const sizeClasses = size === 'lg' ? 'h-28 w-28 text-5xl sm:h-36 sm:w-36 sm:text-6xl' : 'h-20 w-20 text-4xl'

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 transition-all duration-200 ${
        sizeClasses
      } ${
        selected
          ? 'border-highlight bg-highlight/15 scale-110 shadow-lg shadow-highlight/20'
          : 'border-zinc-700/50 bg-zinc-800/50 hover:border-zinc-500 hover:bg-zinc-700/50 hover:scale-105'
      } ${disabled ? 'cursor-not-allowed opacity-50 hover:scale-100 hover:border-zinc-700/50 hover:bg-zinc-800/50' : 'cursor-pointer'}`}
    >
      <span className="select-none">{CHOICE_ICONS[choice]}</span>
      <span className={`text-xs font-medium ${selected ? 'text-highlight' : 'text-zinc-400'}`}>
        {CHOICE_LABELS[choice]}
      </span>
    </button>
  )
}
