import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { HeroFloatingElements } from './HeroFloatingElements'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-500/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent" />

      <Container className="relative z-10 py-32 sm:py-40">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-violet-400 animate-pulse" />
              <span className="text-sm font-medium text-violet-400">
                +121 jogos gratuitos
              </span>
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-zinc-100 sm:text-5xl lg:text-6xl">
              Os clássicos da infância reunidos em um só lugar.{' '}
              <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                Escolha um jogo e comece a jogar
              </span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-zinc-400 sm:text-xl">
              Sem downloads. Sem cadastro. Sem complicação.
              <br />
              Escolha um jogo e comece a jogar.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/#jogos">
                <Button size="xl">
                  <span className="text-xl">🎮</span>
                  Jogar Agora
                </Button>
              </Link>
              <Link href="/games">
                <Button size="xl" variant="secondary">
                  Explorar Jogos
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <HeroFloatingElements />
          </div>
        </div>
      </Container>
    </section>
  )
}
