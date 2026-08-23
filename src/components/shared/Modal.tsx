import type { ReactNode } from 'react'

interface ModalProps {
  title: string
  children: ReactNode
  className?: string
}

export function Modal({ title, children, className = '' }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`w-full max-w-sm rounded-2xl border border-zinc-800/50 bg-zinc-900 p-6 shadow-xl ${className}`}
      >
        <h2 id="modal-title" className="mb-4 text-lg font-semibold text-zinc-100">
          {title}
        </h2>
        {children}
      </div>
    </div>
  )
}
