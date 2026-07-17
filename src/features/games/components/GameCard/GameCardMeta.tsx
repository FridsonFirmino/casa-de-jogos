import { Clock, Users } from 'lucide-react'

interface GameCardMetaProps {
  rating: number
  playTime: string
  players: string
}

export function GameCardMeta({ rating, playTime, players }: GameCardMetaProps) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating - fullStars >= 0.5

  return (
    <div className="flex items-center justify-between text-xs text-zinc-500">
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={i < fullStars ? 'text-amber-400' : hasHalfStar && i === fullStars ? 'text-amber-400' : 'text-zinc-700'}
          >
            ★
          </span>
        ))}
        <span className="ml-1 text-zinc-400">{rating.toFixed(1)}</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {playTime}
        </span>
        <span className="flex items-center gap-1">
          <Users className="h-3 w-3" />
          {players}
        </span>
      </div>
    </div>
  )
}
