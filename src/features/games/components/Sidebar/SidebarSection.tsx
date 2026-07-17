import type { ReactNode } from 'react'

interface SidebarSectionProps {
  title: string
  children: ReactNode
}

export function SidebarSection({ title, children }: SidebarSectionProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
        {title}
      </h3>
      {children}
    </div>
  )
}
