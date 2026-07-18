import { Badge } from "@/components/ui/Badge";
import type { GameConfig } from "@/types/game";

const difficultyLabel: Record<string, string> = {
  Easy: "Fácil",
  Medium: "Médio",
  Hard: "Difícil",
};

const difficultyColor: Record<string, string> = {
  Easy: "text-emerald-400",
  Medium: "text-yellow-400",
  Hard: "text-red-400",
};

interface GameDetailsProps {
  game: GameConfig;
}

export default function GameDetails({ game }: GameDetailsProps) {
  return (
    <div className="shrink-0 space-y-3 pb-6">
      <h1 className="font-display text-3xl text-zinc-100">{game.title}</h1>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
        <Badge variant="accent">{game.category}</Badge>

        <span
          className={`font-medium uppercase tracking-wider ${difficultyColor[game.difficulty]}`}
        >
          {difficultyLabel[game.difficulty]}
        </span>

        <span className="text-zinc-600">•</span>

        <span className="text-zinc-500">{game.averagePlayTime}</span>

        <span className="text-zinc-600">•</span>

        <span className="text-zinc-500">{game.players} jogador</span>

        <span className="text-zinc-600">•</span>

        <span className="text-zinc-600">
          Versão <span className="text-zinc-500">{game.version}</span>
        </span>

        <span className="text-zinc-600">•</span>

        <span className="text-zinc-600">
          {new Date(game.releaseDate).toLocaleDateString("pt-BR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>

      <p className="max-w-2xl text-sm text-zinc-500">{game.description}</p>

      {game.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {game.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-zinc-800/50 bg-zinc-900/50 px-2.5 py-0.5 text-xs text-zinc-500"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
