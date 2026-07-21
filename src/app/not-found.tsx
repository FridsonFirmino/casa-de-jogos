import { Container } from "@/components/ui/Container";
import { CopyrightFooter } from "@/components/ui/CopyrightFooter";
import { ROUTES } from "@/constants/routes";
import { Home } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página não encontrada - Casa de Jogos",
  description:
    "A página que você procura não existe ou foi movida. Volte para a página inicial e continue explorando.",
};

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col">
      <div className="flex flex-1 items-center justify-center">
        <Container className="text-center">
          <span className="mb-6 block font-arcade text-8xl font-bold text-accent">
            404
          </span>
          <h1 className="mb-4 font-display text-3xl font-bold text-zinc-100">
            Página não encontrada
          </h1>
          <p className="mx-auto mb-8 max-w-md text-zinc-400">
            A página que você está procurando não existe, foi movida ou está
            temporariamente indisponível.
          </p>
          <Link
            href={ROUTES.HOME}
            className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-accent-dark to-accent px-6 py-3 text-sm font-medium text-white shadow-lg shadow-accent/25 transition-all duration-300 hover:shadow-accent/40 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Home className="h-5 w-5" />
            Voltar ao início
          </Link>
        </Container>
      </div>
      <CopyrightFooter />
    </section>
  );
}
