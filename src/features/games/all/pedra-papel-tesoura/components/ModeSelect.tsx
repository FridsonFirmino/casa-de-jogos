'use client'

import { Bot, Users } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface ModeSelectProps {
  onSelectSingle: () => void
  onSelectMultiplayer: () => void
}

export default function ModeSelect({ onSelectSingle, onSelectMultiplayer }: ModeSelectProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-zinc-800/50 bg-zinc-900/50 p-10">
      <h2 className="font-display text-xl text-zinc-100">Como você quer jogar?</h2>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button variant="primary" size="lg" onClick={onSelectSingle}>
          <Bot className="h-5 w-5" />
          Jogar contra o computador
        </Button>
        <Button variant="secondary" size="lg" onClick={onSelectMultiplayer}>
          <Users className="h-5 w-5" />
          Jogar com um amigo
        </Button>
      </div>
    </div>
  )
}
