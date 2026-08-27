'use client'

import { useEffect, useState } from 'react'

interface CountdownTimerProps {
  duration: number
  onComplete: () => void
}

export default function CountdownTimer({ duration, onComplete }: CountdownTimerProps) {
  const [count, setCount] = useState(duration)

  useEffect(() => {
    if (count <= 0) {
      onComplete()
      return
    }

    const timer = setTimeout(() => setCount((c) => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [count, onComplete])

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-20 w-20">
        <svg className="h-20 w-20 -rotate-90" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-zinc-700/50"
          />
          <circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray={`${2 * Math.PI * 36}`}
            strokeDashoffset={`${2 * Math.PI * 36 * (1 - count / duration)}`}
            strokeLinecap="round"
            className="text-highlight transition-all duration-1000"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-display text-2xl text-zinc-100">
          {count}
        </span>
      </div>
      <span className="text-xs text-zinc-500">Escolha sua jogada!</span>
    </div>
  )
}
