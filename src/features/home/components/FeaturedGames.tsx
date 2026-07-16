import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { FEATURED_GAMES } from '@/constants/games'
import { GameCard } from './GameCard'

export function FeaturedGames() {
  return (
    <section className="relative py-24">
      <Container>
        <SectionTitle
          title="Jogos Populares"
          subtitle="Os jogos mais jogados pelos nossos usuários"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_GAMES.slice(0, 8).map((game) => (
            <GameCard key={game.id} game={game} featured />
          ))}
        </div>
      </Container>
    </section>
  )
}
