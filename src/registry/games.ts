import type { GameConfig, GameRegistryEntry } from "@/types/game";

import { config as breakout } from "@/features/games/all/breakout/config";
import { config as campoMinado } from "@/features/games/all/campo-minado/config";
import { config as colorMatch } from "@/features/games/all/color-match/config";
import { config as dinoRun } from "@/features/games/all/dino-run/config";
import { config as flappyBird } from "@/features/games/all/flappy-bird/config";
import { config as forca } from "@/features/games/all/forca/config";
import { config as memory } from "@/features/games/all/memory/config";
import { config as pacman } from "@/features/games/all/pacman/config";
import { config as pixelQuest } from "@/features/games/all/pixel-quest/config";
import { config as pong } from "@/features/games/all/pong/config";
import { config as snake } from "@/features/games/all/snake/config";
import { config as spaceInvaders } from "@/features/games/all/space-invaders/config";
import { config as sudoku } from "@/features/games/all/sudoku/config";
import { config as tetris } from "@/features/games/all/tetris/config";
import { config as tictactoe } from "@/features/games/all/tictactoe/config";
import { config as xadrez } from "@/features/games/all/xadrez/config";

const gamesList: GameRegistryEntry[] = [
  { config: snake },
  { config: pong },
  { config: memory },
  { config: tictactoe },
  { config: spaceInvaders },
  { config: pacman },
  { config: breakout },
  { config: tetris },
  { config: flappyBird },
  { config: dinoRun },
  { config: sudoku },
  { config: xadrez },
  { config: pixelQuest },
  { config: colorMatch },
  { config: campoMinado },
  { config: forca },
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
  return gamesList.filter((g) => g.config.featured).map((g) => g.config);
}

export function getPopularGames(): GameConfig[] {
  return gamesList.filter((g) => g.config.popular).map((g) => g.config);
}

export function getNewGames(): GameConfig[] {
  return gamesList.filter((g) => g.config.isNew).map((g) => g.config);
}

export const GAMES_PER_PAGE = 8;
