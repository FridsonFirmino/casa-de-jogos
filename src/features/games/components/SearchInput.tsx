'use client'

import { Search } from 'lucide-react'
import { useCallback } from 'react'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
    [onChange],
  )

  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
      <input
        type="text"
        placeholder="Pesquisar um jogo..."
        value={value}
        onChange={handleChange}
        className="w-full rounded-xl border border-zinc-800 bg-zinc-900/70 py-2.5 pl-10 pr-4 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-all focus:border-violet-500/50 focus:bg-zinc-900 focus:shadow-[0_0_0_1px_rgba(139,92,246,0.15)]"
      />
    </div>
  )
}
