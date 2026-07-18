'use client'

import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'

const gameComponents: Record<string, ComponentType> = {
  snake: dynamic(() => import('@/features/games/all/snake/Game'), { ssr: false }),
}

interface GameRendererProps {
  slug: string
}

export default function GameRenderer({ slug }: GameRendererProps) {
  const Component = gameComponents[slug]

  if (!Component) {
    return (
      <div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/50 p-12">
        <p className="text-center text-zinc-500">Em breve...</p>
      </div>
    )
  }

  return <Component />
}
