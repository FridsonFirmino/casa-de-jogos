import { GameCardSkeleton } from './GameCard/GameCardSkeleton'

export function GamesLoading() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 9 }).map((_, i) => (
        <GameCardSkeleton key={i} />
      ))}
    </div>
  )
}
