import { Play } from 'lucide-react'

export function GameCardButton() {
  return (
    <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-800 py-2.5 text-sm font-medium text-zinc-100 transition-all duration-300 hover:bg-gradient-to-r hover:from-accent-dark hover:to-accent hover:shadow-lg hover:shadow-accent/25 active:scale-[0.98]">
      <Play className="h-4 w-4" />
      Jogar Agora
    </button>
  )
}
