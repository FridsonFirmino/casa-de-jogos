import snakeImg from "./assets/snake.jpeg";
import type { GameConfig } from "@/types/game";

export const config: GameConfig = {
  id: "snake",
  slug: "snake",
  title: "Snake",
  description:
    "O clássico jogo da cobrinha. Coma, cresça e não bata na parede.",
  shortDescription: "Coma, cresça e não bata na parede.",
  thumbnail: snakeImg.src,
  cover: snakeImg.src,
  categoryId: "classicos",
  category: "Clássicos",
  difficulty: "Easy",
  players: "1",
  averagePlayTime: "N/D",
  averagePlayTimeMinutes: 5,
  tags: ["Clássico", "Arcade"],
  featured: true,
  popular: true,
  isNew: false,
  status: "published",
  version: "1.0.0",
  rating: 4.5,
  gradient: "from-emerald-500 to-teal-600",
  releaseDate: "2026-07-18",
};
