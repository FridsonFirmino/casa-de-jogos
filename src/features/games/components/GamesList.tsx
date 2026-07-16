"use client";

import { Container } from "@/components/ui/Container";
import { CATEGORIES } from "@/constants/categories";
import { GAMES, GAMES_PER_PAGE } from "@/constants/games";
import { GameCard } from "@/features/home/components/GameCard";
import { ArrowLeft, ChevronLeft, ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

interface GamesListProps {
  initialCategory?: string;
}

const DIFFICULTIES = [
  { value: "", label: "Todos" },
  { value: "Easy", label: "Fácil" },
  { value: "Medium", label: "Médio" },
  { value: "Hard", label: "Difícil" },
] as const;

export function GamesList({ initialCategory }: GamesListProps) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(initialCategory ?? "");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = GAMES;

    if (categoryFilter) {
      result = result.filter((g) => g.categoryId === categoryFilter);
    }

    if (difficultyFilter) {
      result = result.filter((g) => g.difficulty === difficultyFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((g) => g.title.toLowerCase().includes(q));
    }

    return result;
  }, [search, categoryFilter, difficultyFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / GAMES_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * GAMES_PER_PAGE,
    safePage * GAMES_PER_PAGE,
  );

  function handleCategoryClick(slug: string) {
    setCategoryFilter(slug);
    setPage(1);
  }

  function handleDifficultyClick(value: string) {
    setDifficultyFilter(value);
    setPage(1);
  }

  return (
    <section className="min-h-screen pt-28 pb-20">
      <Container>
        <div className="mb-10">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
          <h1 className="text-4xl font-bold text-zinc-100">Todos os Jogos</h1>
          <p className="mt-2 text-zinc-500">
            {filtered.length} jogo{filtered.length !== 1 && "s"} encontrado
            {filtered.length !== 1 && "s"}
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="relative max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                placeholder="Buscar jogos..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 py-2.5 pl-10 pr-4 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-colors focus:border-violet-500/50"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="mr-1 self-center text-xs font-medium uppercase tracking-wider text-zinc-600">
              Categoria:
            </span>
            <button
              onClick={() => handleCategoryClick("")}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-all ${
                categoryFilter === ""
                  ? "bg-violet-500/20 text-violet-400 border border-violet-500/30"
                  : "bg-zinc-800/50 text-zinc-400 border border-zinc-700/50 hover:border-zinc-600/50 hover:text-zinc-300"
              }`}
            >
              Todos
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.slug)}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-all ${
                  categoryFilter === cat.slug
                    ? "bg-violet-500/20 text-violet-400 border border-violet-500/30"
                    : "bg-zinc-800/50 text-zinc-400 border border-zinc-700/50 hover:border-zinc-600/50 hover:text-zinc-300"
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="mr-1 self-center text-xs font-medium uppercase tracking-wider text-zinc-600">
              Dificuldade:
            </span>
            {DIFFICULTIES.map((d) => (
              <button
                key={d.value}
                onClick={() => handleDifficultyClick(d.value)}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-all ${
                  difficultyFilter === d.value
                    ? "bg-violet-500/20 text-violet-400 border border-violet-500/30"
                    : "bg-zinc-800/50 text-zinc-400 border border-zinc-700/50 hover:border-zinc-600/50 hover:text-zinc-300"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {paginated.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginated.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-4 text-5xl">🔍</div>
            <p className="text-lg font-medium text-zinc-300">
              Nenhum jogo encontrado
            </p>
            <p className="mt-1 text-sm text-zinc-500">
              Tente buscar por outro termo ou limpe os filtros.
            </p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-4">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage <= 1}
              className="flex items-center gap-1 rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-sm font-medium text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </button>

            <span className="text-sm text-zinc-500">
              {safePage} de {totalPages}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage >= totalPages}
              className="flex items-center gap-1 rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-sm font-medium text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Próximo
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
