import type { ComponentType } from 'react'

export type Difficulty = 'Easy' | 'Medium' | 'Hard'
export type GameStatus = 'published' | 'draft' | 'coming-soon'

export interface GameConfig {
  id: string
  slug: string
  title: string
  description: string
  shortDescription: string
  thumbnail: string
  cover: string
  categoryId: string
  category: string
  difficulty: Difficulty
  players: string
  averagePlayTime: string
  averagePlayTimeMinutes: number
  tags: string[]
  featured: boolean
  popular: boolean
  isNew: boolean
  status: GameStatus
  version: string
  rating: number
  gradient: string
  releaseDate: string
  urlPhoto?: string
  component?: ComponentType
}

export interface GameRegistryEntry {
  config: GameConfig
  component?: ComponentType
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
