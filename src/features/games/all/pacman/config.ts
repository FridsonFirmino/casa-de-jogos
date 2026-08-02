import type { GameConfig } from "@/types/game";
import thumb from "./assets/thumbnail.svg";

export const config: GameConfig = {
  id: "pacman",
  slug: "pacman",
  title: "Pac-Man",
  description:
    "O clássico dos arcades: coma todos os pontos, fuja dos fantasmas e vire o jogo com as pílulas de poder.",
  shortDescription: "Fuja dos fantasmas no labirinto clássico.",
  thumbnail: thumb.src,
  cover: thumb.src,
  categoryId: "classicos",
  category: "Clássicos",
  difficulty: "Medium",
  players: "1",
  averagePlayTime: "N/D",
  averagePlayTimeMinutes: 5,
  tags: ["Clássico", "Arcade"],
  featured: true,
  popular: true,
  isNew: true,
  status: "published",
  version: "1.0.0",
  rating: 4.7,
  gradient: "from-yellow-400 to-yellow-600",
  releaseDate: "2026-08-02",
  githubUsername: "fridsonfirmino",
};
