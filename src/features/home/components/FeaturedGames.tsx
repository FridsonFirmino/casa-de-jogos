import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FEATURED_GAMES } from "@/constants/games";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { GameCard } from "./GameCard";

export function FeaturedGames() {
  return (
    <section id="jogos" className="relative scroll-mt-24 py-24">
      <Container>
        <div className="flex items-end justify-between">
          <SectionTitle
            title="Jogos em destaque"
            subtitle="Alguns dos jogos adicionados recentemente"
          />
          <Link
            href="/games"
            className="mb-10 hidden items-center gap-1 text-sm font-medium text-violet-400 transition-colors hover:text-violet-300 sm:flex"
          >
            Ver todos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_GAMES.slice(0, 4).map((game) => (
            <GameCard key={game.id} game={game} featured />
          ))}
        </div>

        <div className="mt-8 flex justify-center sm:hidden">
          <Link
            href="/games"
            className="inline-flex items-center gap-1 rounded-xl border border-zinc-800 bg-zinc-900/50 px-5 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-700"
          >
            Ver todos os jogos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
