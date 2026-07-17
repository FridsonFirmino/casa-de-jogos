import { CopyrightFooter } from "@/components/ui/CopyrightFooter";
import { GamesList } from "@/features/games/components/GamesList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Todos os Jogos - Casa de Jogos",
  description:
    "Explore todos os jogos disponíveis na Casa de Jogos. Filtre por categoria, busque por nome e descubra seu próximo jogo favorito.",
};

export default async function GamesPage(props: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const searchParams = await props.searchParams;
  return (
    <>
      <GamesList initialCategory={searchParams.categoria} />
      <CopyrightFooter />
    </>
  );
}
