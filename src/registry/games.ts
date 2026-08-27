import type { GameConfig, GameRegistryEntry } from "@/types/game";

import { config as jogoDaVelha } from "@/features/games/all/jogo-da-velha/config";
import { config as pacman } from "@/features/games/all/pacman/config";
import { config as pedraPapelTesoura } from "@/features/games/all/pedra-papel-tesoura/config";
import { config as snake } from "@/features/games/all/snake/config";

const gamesList: GameRegistryEntry[] = [
  { config: pedraPapelTesoura },
  { config: jogoDaVelha },
  { config: pacman },
  { config: snake },
  // { config: pong },
  // { config: memory },
  // { config: spaceInvaders },
  // { config: breakout },
  // { config: tetris },
  // { config: flappyBird },
  // { config: dinoRun },
  // { config: sudoku },
  // { config: xadrez },
  // { config: pixelQuest },
  // { config: colorMatch },
  // { config: campoMinado },
  // { config: forca },
];

export const registry: ReadonlyArray<GameRegistryEntry> = gamesList;

export function getGameBySlug(slug: string): GameConfig | undefined {
  return gamesList.find((g) => g.config.slug === slug)?.config;
}

export function getGamesByCategory(categoryId: string): GameConfig[] {
  return gamesList
    .filter((g) => g.config.categoryId === categoryId)
    .map((g) => g.config);
}

export function getFeaturedGames(): GameConfig[] {
  return gamesList.filter((g) => g.config.isNew === true).map((g) => g.config);
}

export function getPopularGames(): GameConfig[] {
  return gamesList.filter((g) => g.config.popular).map((g) => g.config);
}

export function getNewGames(): GameConfig[] {
  return gamesList.filter((g) => g.config.isNew).map((g) => g.config);
}

export const GAMES_PER_PAGE = 8;
export const GAMES_TOTAL = gamesList.length;
