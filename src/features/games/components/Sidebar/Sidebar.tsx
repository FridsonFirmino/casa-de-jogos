'use client'

import { X } from 'lucide-react'
import { SidebarDivider } from './SidebarDivider'
import { SidebarSection } from './SidebarSection'
import { SidebarCategory } from './SidebarCategory'

const DIFFICULTIES = [
  { value: 'Easy', label: 'Fácil' },
  { value: 'Medium', label: 'Médio' },
  { value: 'Hard', label: 'Difícil' },
]

interface SidebarProps {
  categoryFilter: string
  difficultyFilter: string
  categoriesWithCount: { id: string; slug: string; icon: string; name: string; count: number }[]
  onCategoryChange: (slug: string) => void
  onDifficultyChange: (value: string) => void
  onClose?: () => void
}

export function Sidebar({
  categoryFilter,
  difficultyFilter,
  categoriesWithCount,
  onCategoryChange,
  onDifficultyChange,
  onClose,
}: SidebarProps) {
  return (
    <aside className="flex h-full flex-col gap-6 overflow-y-auto">
      {onClose && (
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-zinc-100">Filtros</h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300">
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      <SidebarSection title="Categorias">
        <button
          onClick={() => onCategoryChange('')}
          className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-all ${
            categoryFilter === ''
              ? 'bg-accent/10 text-accent font-medium'
              : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800/50'
          }`}
        >
          <span className="flex items-center gap-2.5">
            <span>📋</span>
            <span>Todas</span>
          </span>
          <span className={`text-xs ${categoryFilter === '' ? 'text-accent' : 'text-zinc-600'}`}>
            {categoriesWithCount.reduce((acc, c) => acc + c.count, 0)}
          </span>
        </button>
        {categoriesWithCount.map((cat) => (
          <SidebarCategory
            key={cat.id}
            icon={cat.icon}
            name={cat.name}
            count={cat.count}
            active={categoryFilter === cat.slug}
            onClick={() => onCategoryChange(cat.slug)}
          />
        ))}
      </SidebarSection>

      <SidebarDivider />

      <SidebarSection title="Dificuldade">
        <button
          onClick={() => onDifficultyChange('')}
          className={`flex w-full items-center rounded-lg px-3 py-2 text-sm transition-all ${
            difficultyFilter === ''
                ? 'bg-accent/10 text-accent font-medium'
              : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800/50'
          }`}
        >
          Todas
        </button>
        {DIFFICULTIES.map((d) => (
          <button
            key={d.value}
            onClick={() => onDifficultyChange(d.value)}
            className={`flex w-full items-center rounded-lg px-3 py-2 text-sm transition-all ${
              difficultyFilter === d.value
              ? 'bg-accent/10 text-accent font-medium'
                : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800/50'
            }`}
          >
            {d.label}
          </button>
        ))}
      </SidebarSection>
    </aside>
  )
}
