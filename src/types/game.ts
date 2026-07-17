export interface Game {
  id: string
  title: string
  slug: string
  description: string
  categoryId: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  playTime: string
  playTimeMinutes: number
  gradient: string
  featured: boolean
  rating: number
  players: string
  tags: string[]
  new: boolean
  popular: boolean
  releaseDate: string
  urlPhoto?: string
}

export type SortOption =
  | 'recent'
  | 'a-z'
  | 'z-a'
  | 'popular'
  | 'playtime'

export interface FiltersState {
  category: string
  difficulty: string
  search: string
  sort: SortOption
  page: number
}
