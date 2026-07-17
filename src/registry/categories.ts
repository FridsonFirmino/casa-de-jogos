import { registry } from './games'

export interface CategoryInfo {
  id: string
  name: string
  slug: string
  icon: string
  description: string
  count: number
}

const CATEGORY_ICONS: Record<string, { icon: string; description: string }> = {
  reflexo: { icon: '🎯', description: 'Teste seus reflexos em desafios rápidos' },
  puzzle: { icon: '🧩', description: 'Monte, encaixe e resolva quebra-cabeças' },
  estrategia: { icon: '♟', description: 'Pense, planeje e conquiste a vitória' },
  classicos: { icon: '👾', description: 'Relembre os jogos que marcaram época' },
  esportes: { icon: '🏀', description: 'Compita nas mais diversas modalidades' },
  sorte: { icon: '🎲', description: 'Teste sua sorte em jogos imprevisíveis' },
  arcade: { icon: '🚀', description: 'Ação rápida e diversão sem limites' },
  memoria: { icon: '🧠', description: 'Desafie sua mente e sua capacidade de lembrar' },
}

function buildCategories(): CategoryInfo[] {
  const map = new Map<string, { name: string; count: number }>()

  for (const entry of registry) {
    const { categoryId, category } = entry.config
    const existing = map.get(categoryId)
    if (existing) {
      existing.count++
    } else {
      map.set(categoryId, { name: category, count: 1 })
    }
  }

  return Array.from(map.entries())
    .map(([id, data]) => {
      const meta = CATEGORY_ICONS[id]
      return {
        id,
        name: data.name,
        slug: id,
        icon: meta?.icon ?? '🎮',
        description: meta?.description ?? '',
        count: data.count,
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name))
}

export const categories = buildCategories()
