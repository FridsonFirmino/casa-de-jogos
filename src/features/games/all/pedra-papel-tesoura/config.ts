import type { GameConfig } from "@/types/game";
import thumb from "./assets/thumbnail.svg";

export const config: GameConfig = {
  id: "pedra-papel-tesoura",
  slug: "pedra-papel-tesoura",
  title: "Pedra, Papel e Tesoura",
  description:
    "O clássico jogo de mãos. Jogue sozinho contra o computador com diferentes níveis de dificuldade ou convide um amigo para jogar em tempo real.",
  shortDescription: "Contra o computador ou online com um amigo.",
  thumbnail: thumb,
  cover: thumb,
  categoryId: "classicos",
  category: "Clássicos",
  difficulty: "Easy",
  players: "1-2",
  averagePlayTime: "N/D",
  averagePlayTimeMinutes: 3,
  tags: ["Clássico", "Multiplayer", "Lógica"],
  featured: true,
  popular: false,
  isNew: true,
  status: "published",
  version: "1.0.0",
  rating: 4.5,
  gradient: "from-teal-500 to-purple-500",
  releaseDate: "2026-08-26",
  githubUsername: "fridsonfirmino",
};
