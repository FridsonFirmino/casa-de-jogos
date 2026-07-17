import type { ReactNode } from 'react'

interface GameCardContentProps {
  children: ReactNode
}

export function GameCardContent({ children }: GameCardContentProps) {
  return <div className="flex flex-1 flex-col gap-3 p-4">{children}</div>
}
