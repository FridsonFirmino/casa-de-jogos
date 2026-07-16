import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { GAMES } from '@/constants/games'
import { GameCard } from './GameCard'

export function ContinueExploring() {
  return (
    <section className="py-24">
      <Container>
        <SectionTitle
          title="Continue Explorando"
          subtitle="Descubra mais jogos incríveis"
        />
      </Container>

      <div className="flex gap-4 overflow-x-auto px-4 pb-4 sm:px-6 lg:px-8 scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex shrink-0 w-[calc(100vw-theme(spacing.8)-20rem)] sm:w-8 lg:w-16" />

        {GAMES.map((game) => (
          <div key={game.id} className="min-w-[260px] max-w-[300px] shrink-0">
            <GameCard game={game} />
          </div>
        ))}

        <div className="flex shrink-0 w-8 lg:w-16" />
      </div>
    </section>
  )
}
