import Link from 'next/link'
import type { CategoryInfo } from '@/registry/categories'

interface CategoryCardProps {
  category: CategoryInfo
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/games?categoria=${category.slug}`}
      className="group flex flex-col items-center gap-4 rounded-2xl border border-zinc-800/50 bg-zinc-900/30 p-8 transition-all duration-500 hover:scale-105 hover:border-accent/30 hover:bg-zinc-900/60 hover:shadow-xl hover:shadow-highlight/5"
    >
      <span className="text-5xl transition-transform duration-500 group-hover:scale-110 group-hover:animate-pulse">
        {category.icon}
      </span>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-zinc-100">{category.name}</h3>
        <p className="mt-1 text-sm text-zinc-500">{category.description}</p>
      </div>
    </Link>
  )
}
