import { Clock, Play, Shield } from 'lucide-react'
import type { Game } from '@/types/game'
import { Badge } from '@/components/ui/Badge'
import { CATEGORIES } from '@/constants/categories'

interface GameCardProps {
  game: Game
  featured?: boolean
}

const difficultyConfig = {
  Easy: { label: 'Fácil', color: 'text-emerald-400' },
  Medium: { label: 'Médio', color: 'text-amber-400' },
  Hard: { label: 'Difícil', color: 'text-red-400' },
}

export function GameCard({ game, featured }: GameCardProps) {
  const category = CATEGORIES.find((c) => c.id === game.categoryId)
  const difficulty = difficultyConfig[game.difficulty]

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-900/50 transition-all duration-500 hover:scale-[1.02] hover:border-zinc-700/50 hover:shadow-2xl hover:shadow-violet-500/5">
      <div className="relative aspect-[16/10] overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${game.gradient} opacity-80 transition-opacity duration-500 group-hover:opacity-100`}>
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-white/20">
            <Play className="h-8 w-8 text-white" />
          </div>
        </div>

        {featured && (
          <div className="absolute left-3 top-3">
            <Badge variant="accent">Em destaque</Badge>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-zinc-100">{game.title}</h3>
        </div>

        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-zinc-500">
          {game.description}
        </p>

        <div className="mt-auto pt-4">
          <div className="mb-4 flex flex-wrap items-center gap-3 text-xs">
            {category && (
              <span className="text-zinc-500">
                {category.icon} {category.name}
              </span>
            )}

            {game.difficulty && (
              <span className={`flex items-center gap-1 ${difficulty.color}`}>
                <Shield className="h-3 w-3" />
                {difficulty.label}
              </span>
            )}

            {game.playTime && (
              <span className="flex items-center gap-1 text-zinc-500">
                <Clock className="h-3 w-3" />
                {game.playTime}
              </span>
            )}
          </div>

          <button className="w-full rounded-xl bg-zinc-800 py-2.5 text-sm font-medium text-zinc-100 transition-all duration-300 hover:bg-gradient-to-r hover:from-violet-600 hover:to-blue-600 hover:shadow-lg hover:shadow-violet-500/25 active:scale-[0.98]">
            Jogar
          </button>
        </div>
      </div>
    </article>
  )
}
