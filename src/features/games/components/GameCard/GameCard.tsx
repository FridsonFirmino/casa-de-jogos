import Image from 'next/image'
import { Play } from 'lucide-react'
import type { GameConfig } from '@/types/game'

interface GameCardProps {
  game: GameConfig
}

export function GameCard({ game }: GameCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-900 transition-all duration-500 hover:scale-[1.02] hover:border-zinc-700/50 hover:shadow-2xl hover:shadow-violet-500/5">
      <div className="relative aspect-[3/4]">
        <Image
          src={game.thumbnail}
          alt={game.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />

        {game.isNew && (
          <div className="absolute left-3 top-3 z-10 rounded-full bg-emerald-500 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white shadow-lg">
            Novo
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/80 backdrop-blur-sm shadow-lg shadow-violet-500/30 transition-all duration-500 group-hover:scale-110">
            <Play className="h-7 w-7 text-white translate-x-0.5" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-3 p-4">
          <h3 className="text-lg font-bold text-white drop-shadow-sm line-clamp-1">
            {game.title}
          </h3>

          <div className="flex flex-wrap gap-1.5">
            {game.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-white/10 backdrop-blur-sm px-2 py-0.5 text-[11px] font-medium text-zinc-200"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-300">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < Math.floor(game.rating) ? 'text-amber-400' : 'text-zinc-600'}>
                  ★
                </span>
              ))}
              <span className="ml-1">{game.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-3">
              <span>⏱ {game.averagePlayTime}</span>
              <span>👤 {game.players}</span>
            </div>
          </div>

          <button className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 backdrop-blur-sm py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-violet-600 hover:shadow-lg hover:shadow-violet-500/25 active:scale-[0.98]">
            <Play className="h-4 w-4" />
            Jogar Agora
          </button>
        </div>
      </div>
    </article>
  )
}
