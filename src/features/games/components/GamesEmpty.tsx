'use client'

interface GamesEmptyProps {
  onReset: () => void
}

export function GamesEmpty({ onReset }: GamesEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="mb-6 text-6xl">🔍</div>
      <h3 className="text-xl font-semibold text-zinc-300">Nenhum jogo encontrado</h3>
      <p className="mt-2 max-w-sm text-sm text-zinc-500">
        Tente ajustar sua pesquisa ou limpar os filtros para encontrar mais jogos.
      </p>
      <button
        onClick={onReset}
        className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/50 px-5 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-zinc-800/50"
      >
        Limpar filtros
      </button>
    </div>
  )
}
