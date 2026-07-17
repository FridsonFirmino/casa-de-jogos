"use client";

import type { SortOption } from "@/types/game";
import { SlidersHorizontal } from "lucide-react";
import { SearchInput } from "./SearchInput";
import { SortSelect } from "./SortSelect";

interface GamesHeaderProps {
  total: number;
  search: string;
  sort: SortOption;
  onSearchChange: (value: string) => void;
  onSortChange: (value: SortOption) => void;
  onOpenFilters: () => void;
}

export function GamesHeader({
  total,
  search,
  sort,
  onSearchChange,
  onSortChange,
  onOpenFilters,
}: GamesHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Todos os Jogos</h1>
          <p className="mt-0.5 text-sm text-zinc-500">
            {total} jogo{total !== 1 && "s"} encontrado{total !== 1 && "s"}
          </p>
        </div>

        <button
          onClick={onOpenFilters}
          className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-300 lg:hidden"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filtros
        </button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <SearchInput value={search} onChange={onSearchChange} />
        </div>
        <div className="w-full sm:w-48">
          <SortSelect value={sort} onChange={onSortChange} />
        </div>
      </div>
    </div>
  );
}
