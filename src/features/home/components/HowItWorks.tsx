import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Search, MousePointerClick, Sparkles } from 'lucide-react'

const STEPS = [
  {
    icon: Search,
    title: 'Escolha um jogo',
    description: 'Navegue por nossa coleção e encontre o jogo perfeito para você.',
  },
  {
    icon: MousePointerClick,
    title: 'Clique em Jogar',
    description: 'Sem downloads, sem instalação. Apenas clique e comece.',
  },
  {
    icon: Sparkles,
    title: 'Divirta-se',
    description: 'Aproveite momentos de diversão direto no seu navegador.',
  },
]

export function HowItWorks() {
  return (
    <section id="como-funciona" className="scroll-mt-24 py-24">
      <Container>
        <SectionTitle
          title="Como Funciona"
          subtitle="Começar a jogar é mais fácil do que você imagina"
        />

        <div className="grid gap-8 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <div key={step.title} className="relative text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/50">
                <step.icon className="h-10 w-10 text-violet-400" />
              </div>

              <div className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-violet-500/10 text-sm font-medium text-violet-400">
                {index + 1}
              </div>

              <h3 className="mt-4 text-xl font-semibold text-zinc-100">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
