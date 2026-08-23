'use client'

import { useState } from 'react'
import { Check, Copy, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface WaitingRoomProps {
  inviteLink: string
}

export default function WaitingRoom({ inviteLink }: WaitingRoomProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(inviteLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col items-center gap-5 rounded-2xl border border-zinc-800/50 bg-zinc-900/50 p-10 text-center">
      <Loader2 className="h-8 w-8 animate-spin text-highlight" />
      <div>
        <h2 className="font-display text-xl text-zinc-100">Aguardando oponente...</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Envie o link abaixo para um amigo entrar na sala.
        </p>
      </div>

      <div className="flex w-full max-w-md items-center gap-2 rounded-xl border border-zinc-700/50 bg-zinc-800/50 px-4 py-2.5">
        <span className="flex-1 truncate text-sm text-zinc-300">{inviteLink}</span>
        <Button type="button" variant="ghost" size="sm" onClick={handleCopy}>
          {copied ? <Check className="h-4 w-4 text-highlight" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}
