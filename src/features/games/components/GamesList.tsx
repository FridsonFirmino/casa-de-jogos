"use client";

import { Container } from "@/components/ui/Container";
import { useGames } from "@/features/games/hooks/useGames";
import type { SortOption } from "@/types/game";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";
import { GamesEmpty } from "./GamesEmpty";
import { GamesGrid } from "./GamesGrid";
import { GamesHeader } from "./GamesHeader";
import { GamesPagination } from "./GamesPagination";
import { MobileFilterDrawer } from "./MobileFilterDrawer";
import { Sidebar } from "./Sidebar/Sidebar";

interface GamesListProps {
  initialCategory?: string;
}

export function GamesList({ initialCategory }: GamesListProps) {
  const {
    games,
    total,
    totalPages,
    page,
    search,
    categoryFilter,
    difficultyFilter,
    sort,
    categoriesWithCount,
    setSearch,
    setCategoryFilter,
    setDifficultyFilter,
    setSort,
    goToPage,
    resetFilters,
  } = useGames({ initialCategory });

  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearch(value);
    },
    [setSearch],
  );

  const handleSortChange = useCallback(
    (value: SortOption) => {
      setSort(value);
    },
    [setSort],
  );

  const handleCategoryChange = useCallback(
    (slug: string) => {
      setCategoryFilter(slug);
    },
    [setCategoryFilter],
  );

  const handleDifficultyChange = useCallback(
    (value: string) => {
      setDifficultyFilter(value);
    },
    [setDifficultyFilter],
  );

  const sidebar = (
    <Sidebar
      categoryFilter={categoryFilter}
      difficultyFilter={difficultyFilter}
      categoriesWithCount={categoriesWithCount}
      onCategoryChange={handleCategoryChange}
      onDifficultyChange={handleDifficultyChange}
      onClose={() => setFilterDrawerOpen(false)}
    />
  );

  return (
    <section className="min-h-screen pt-18 mb-15">
      <Container>
        <Link
          href="/"
          className="my-10 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-300"
        >
          <ArrowLeft className="h-5 w-5" />
          Voltar ao inicio
        </Link>
        <div className="flex gap-8">
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-28">{sidebar}</div>
          </aside>

          <div className="min-w-0 flex-1">
            <GamesHeader
              total={total}
              search={search}
              sort={sort}
              onSearchChange={handleSearchChange}
              onSortChange={handleSortChange}
              onOpenFilters={() => setFilterDrawerOpen(true)}
            />

            <div className="mt-8">
              {games.length > 0 ? (
                <GamesGrid games={games} />
              ) : (
                <GamesEmpty onReset={resetFilters} />
              )}
            </div>

            <GamesPagination
              page={page}
              totalPages={totalPages}
              onPageChange={goToPage}
            />
          </div>
        </div>
      </Container>

      <MobileFilterDrawer
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
      >
        {sidebar}
      </MobileFilterDrawer>
    </section>
  );
}
