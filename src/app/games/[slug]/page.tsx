import GameDetails from "@/components/games/GameDetails";
import GameRenderer from "@/components/games/GameRenderer";
import { CopyrightFooter } from "@/components/ui/CopyrightFooter";
import { getGameBySlug, registry } from "@/registry/games";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return registry.map((g) => ({ slug: g.config.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) return {};

  return {
    title: `${game.title} - Casa de Jogos`,
    description: game.description,
  };
}

export default async function GamePage({ params }: PageProps) {
  const { slug } = await params;
  const game = getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  return (
    <section className="flex min-h-screen flex-col">
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pt-24 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="my-4 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-300"
        >
          <ArrowLeft className="h-5 w-5" />
          Voltar ao inicio
        </Link>
        <GameDetails game={game} />
        <GameRenderer slug={slug} />
      </div>
      <CopyrightFooter />
    </section>
  );
}
