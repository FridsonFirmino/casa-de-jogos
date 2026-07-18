import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { HeroFloatingElements } from "./HeroFloatingElements";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-zinc-950 via-zinc-900 to-zinc-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent" />

      <Container className="relative z-10 py-32 sm:py-40">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-highlight animate-pulse" />
              <span className="font-arcade text-sm text-accent">
                +0 jogos gratuitos
              </span>
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-zinc-100 sm:text-5xl lg:text-6xl">
              Os clássicos da infância reunidos em um só lugar.{" "}
              <span className="font-display bg-linear-to-r from-accent to-highlight bg-clip-text text-transparent">
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
  );
}
