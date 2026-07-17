'use client'

import { useMemo, useState } from 'react'
import { GAMES, GAMES_PER_PAGE } from '@/constants/games'
import { CATEGORIES } from '@/constants/categories'
import type { SortOption } from '@/types/game'

interface UseGamesOptions {
  initialCategory?: string
}

export function useGames({ initialCategory }: UseGamesOptions = {}) {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState(initialCategory ?? '')
  const [difficultyFilter, setDifficultyFilter] = useState('')
  const [sort, setSort] = useState<SortOption>('recent')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    let result = [...GAMES]

    if (categoryFilter) {
      result = result.filter((g) => g.categoryId === categoryFilter)
    }

    if (difficultyFilter) {
      result = result.filter((g) => g.difficulty === difficultyFilter)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter((g) =>
        g.title.toLowerCase().includes(q) ||
        g.tags.some((t) => t.toLowerCase().includes(q)),
      )
    }

    switch (sort) {
      case 'a-z':
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'z-a':
        result.sort((a, b) => b.title.localeCompare(a.title))
        break
      case 'popular':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'playtime':
        result.sort((a, b) => a.playTimeMinutes - b.playTimeMinutes)
        break
      case 'recent':
      default:
        result.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
        break
    }

    return result
  }, [search, categoryFilter, difficultyFilter, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / GAMES_PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const paginated = useMemo(
    () => filtered.slice((safePage - 1) * GAMES_PER_PAGE, safePage * GAMES_PER_PAGE),
    [filtered, safePage],
  )

  const categoriesWithCount = useMemo(
    () =>
      CATEGORIES.map((cat) => ({
        ...cat,
        count: GAMES.filter((g) => g.categoryId === cat.id).length,
      })),
    [],
  )

  function resetFilters() {
    setCategoryFilter('')
    setDifficultyFilter('')
    setSearch('')
    setSort('recent')
    setPage(1)
  }

  function goToPage(p: number) {
    setPage(Math.max(1, Math.min(totalPages, p)))
  }

  return {
    games: paginated,
    total: filtered.length,
    totalPages,
    page: safePage,
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
  }
}
