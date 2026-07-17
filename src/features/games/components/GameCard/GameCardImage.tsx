import { Play } from 'lucide-react'

interface GameCardImageProps {
  title: string
  gradient: string
  new: boolean
}

export function GameCardImage({ title, gradient, new: isNew }: GameCardImageProps) {
  return (
    <div className={`relative aspect-[16/9] overflow-hidden bg-gradient-to-br ${gradient}`}>
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/10 to-transparent opacity-60" />

      {isNew && (
        <div className="absolute left-3 top-3 z-10 rounded-full bg-emerald-500 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white">
          Novo
        </div>
      )}

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-violet-500/30 group-hover:shadow-lg group-hover:shadow-violet-500/25">
          <Play className="h-7 w-7 text-white translate-x-0.5" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-lg font-bold text-white drop-shadow-sm line-clamp-2">
          {title}
        </h3>
      </div>
    </div>
  )
}
