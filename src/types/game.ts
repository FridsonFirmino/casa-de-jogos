export interface Game {
  id: string
  title: string
  slug: string
  description: string
  categoryId: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  playTime: string
  gradient: string
  featured: boolean
}
