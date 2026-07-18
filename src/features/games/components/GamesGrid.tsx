import type { GameConfig } from "@/types/game";
import { GameCard } from "./GameCard";

interface GamesGridProps {
  games: GameConfig[];
}

export function GamesGrid({ games }: GamesGridProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}
