import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import {
  Download,
  RefreshCw,
  Smartphone,
  Smile,
  UserPlus,
  Zap,
} from "lucide-react";

const BENEFITS = [
  {
    icon: Download,
    title: "Sem downloads",
    description: "Jogue instantaneamente sem ocupar espaço no seu dispositivo.",
  },
  {
    icon: UserPlus,
    title: "Sem cadastro",
    description: "Pule a burocracia. Escolha um jogo e comece a jogar agora.",
  },
  {
    icon: Smartphone,
    title: "Funciona no celular",
    description: "Todos os jogos são otimizados para dispositivos móveis.",
  },
  {
    icon: Zap,
    title: "Jogos rápidos",
    description: "Partidas curtas perfeitas para qualquer momento do seu dia.",
  },
  {
    icon: RefreshCw,
    title: "Atualizações frequentes",
    description: "Novos jogos adicionados toda semana para você explorar.",
  },
  {
    icon: Smile,
    title: "Gratuito",
    description: "100% gratuito. Sem taxas escondidas ou planos premium.",
  },
];

export function BenefitsSection() {
  return (
    <section className="py-24">
      <Container>
        <SectionTitle
          title="Por que jogar na Casa de Jogos?"
          subtitle="Tudo que você precisa para uma experiência incrível"
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((benefit) => (
            <div
              key={benefit.title}
              className="group rounded-2xl border border-zinc-800/50 bg-zinc-900/30 p-6 transition-all duration-300 hover:border-zinc-700/50 hover:bg-zinc-900/60"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 transition-colors group-hover:bg-violet-500/20">
                <benefit.icon className="h-6 w-6 text-violet-400" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-100">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
