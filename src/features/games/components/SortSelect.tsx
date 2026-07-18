'use client'

import { useCallback } from 'react'
import type { SortOption } from '@/types/game'

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'recent', label: 'Mais Recentes' },
  { value: 'a-z', label: 'A-Z' },
  { value: 'z-a', label: 'Z-A' },
  { value: 'popular', label: 'Mais Bem Avaliados' },
  { value: 'playtime', label: 'Menor Tempo' },
]

interface SortSelectProps {
  value: SortOption
  onChange: (value: SortOption) => void
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => onChange(e.target.value as SortOption),
    [onChange],
  )

  return (
    <div className="relative">
      <select
        value={value}
        onChange={handleChange}
        className="w-full appearance-none rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-2.5 pr-10 text-sm text-zinc-100 outline-none transition-all focus:border-accent/50 focus:bg-zinc-900 focus:shadow-[0_0_0_1px_rgba(18,145,133,0.15)]"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}
