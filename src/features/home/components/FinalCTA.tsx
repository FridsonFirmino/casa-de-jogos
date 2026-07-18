import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/15 via-highlight/5 to-transparent" />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-accent/10 blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-highlight/10 blur-3xl animate-pulse" />
      </div>

      <Container className="relative text-center">
        <h2 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl lg:text-6xl">
          Pronto para{' '}
          <span className="font-display bg-gradient-to-r from-accent to-highlight bg-clip-text text-transparent">
            jogar
          </span>
          ?
        </h2>

        <p className="mx-auto mt-6 max-w-lg text-lg text-zinc-400">
          Junte-se a milhares de jogadores e descubra seu próximo jogo favorito.
        </p>

        <div className="mt-10">
          <Button size="xl">
            Começar Agora
          </Button>
        </div>
      </Container>
    </section>
  )
}
