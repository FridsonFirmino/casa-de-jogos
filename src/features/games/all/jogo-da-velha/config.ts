import type { GameConfig } from "@/types/game";
import thumb from "./assets/thumbnail.svg";

export const config: GameConfig = {
  id: "jogo-da-velha",
  slug: "jogo-da-velha",
  title: "Jogo da Velha",
  description:
    "O clássico jogo da velha. Jogue sozinho contra o computador ou crie uma sala e convide um amigo para jogar em tempo real.",
  shortDescription: "Sozinho contra o computador ou online com um amigo.",
  thumbnail: thumb,
  cover: thumb,
  categoryId: "estrategia",
  category: "Estratégia",
  difficulty: "Easy",
  players: "1-2",
  averagePlayTime: "N/D",
  averagePlayTimeMinutes: 3,
  tags: ["Clássico", "Multiplayer", "Estratégia"],
  featured: true,
  popular: false,
  isNew: true,
  status: "published",
  version: "1.0.0",
  rating: 4.5,
  gradient: "from-sky-500 to-orange-500",
  releaseDate: "2026-08-23",
  githubUsername: "nuelst",
};
