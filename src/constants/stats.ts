import { totalCategories } from "@/registry/categories";
import { GAMES_TOTAL } from "@/registry/games";
import type { Stat } from "@/types/stats";

export const STATS: Stat[] = [
  { value: GAMES_TOTAL ?? 0, suffix: "+", label: "Jogos" },
  { value: totalCategories ?? 0, suffix: "", label: "Categorias" },
  { value: 100, suffix: "%", label: "Gratuito", prefix: "" },
  { value: 0, suffix: "", label: "Downloads", prefix: "0" },
];
