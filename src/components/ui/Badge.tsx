import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'accent'
  className?: string
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const baseStyles =
    'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium'

  const variants = {
    default: 'bg-zinc-800/50 text-zinc-400 border border-zinc-700/50',
    accent: 'bg-violet-500/10 text-violet-400 border border-violet-500/20',
  }

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
