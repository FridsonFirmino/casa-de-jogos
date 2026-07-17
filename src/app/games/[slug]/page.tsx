import { getGameBySlug, registry } from "@/registry/games";
import type { Metadata } from "next";
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
    <section className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-zinc-100">{game.title}</h1>
        <p className="mt-2 text-zinc-500">{game.description}</p>
        <div className="mt-8 rounded-2xl border border-zinc-800/50 bg-zinc-900/50 p-12">
          <p className="text-center text-zinc-500">Em breve...</p>
        </div>
      </div>
    </section>
  );
}
