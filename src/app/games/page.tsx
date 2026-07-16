import type { Metadata } from 'next'
import { GamesList } from '@/features/games/components/GamesList'
import { CopyrightFooter } from '@/components/ui/CopyrightFooter'

export const metadata: Metadata = {
  title: 'Todos os Jogos - Games Hub',
  description: 'Explore todos os jogos disponíveis no Games Hub. Filtre por categoria, busque por nome e descubra seu próximo jogo favorito.',
}

export default async function GamesPage(props: {
  searchParams: Promise<{ categoria?: string }>
}) {
  const searchParams = await props.searchParams
  return (
    <>
      <GamesList initialCategory={searchParams.categoria} />
      <CopyrightFooter />
    </>
  )
}
