'use client'

import type { Symbol } from '../types'

interface StatusBarProps {
  leftName: string
  leftSymbol: Symbol
  rightName: string
  rightSymbol: Symbol
  currentTurn: Symbol
  isOver: boolean
}

export default function StatusBar({
  leftName,
  leftSymbol,
  rightName,
  rightSymbol,
  currentTurn,
  isOver,
}: StatusBarProps) {
  return (
    <div className="flex w-full max-w-sm items-center justify-between">
      <PlayerBadge name={leftName} symbol={leftSymbol} active={!isOver && currentTurn === leftSymbol} />
      <span className="text-sm text-zinc-500">vs</span>
      <PlayerBadge name={rightName} symbol={rightSymbol} active={!isOver && currentTurn === rightSymbol} />
    </div>
  )
}

function PlayerBadge({ name, symbol, active }: { name: string; symbol: Symbol; active: boolean }) {
  return (
    <div
      className={`flex flex-col items-center rounded-xl border px-4 py-2 transition-colors ${
        active ? 'border-highlight bg-highlight/10' : 'border-zinc-700/50 bg-zinc-800/50'
      }`}
    >
      <span className={`text-lg font-bold ${active ? 'text-highlight' : 'text-zinc-300'}`}>{symbol}</span>
      <span className="max-w-[6rem] truncate text-xs text-zinc-500">{name}</span>
    </div>
  )
}
