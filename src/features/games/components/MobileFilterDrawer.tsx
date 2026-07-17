'use client'

import { useEffect, type ReactNode } from 'react'

interface MobileFilterDrawerProps {
  open: boolean
  onClose: () => void
  children: ReactNode
}

export function MobileFilterDrawer({ open, onClose, children }: MobileFilterDrawerProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 left-0 z-50 w-72 bg-zinc-950 border-r border-zinc-800/50 p-6 shadow-2xl lg:hidden">
        {children}
      </div>
    </>
  )
}
