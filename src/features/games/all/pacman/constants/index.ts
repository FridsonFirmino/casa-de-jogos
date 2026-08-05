export const TILE = 24;

export const MAZE_COLS = 20;
export const MAZE_ROWS = 15;
export const CANVAS_WIDTH = MAZE_COLS * TILE;
export const CANVAS_HEIGHT = MAZE_ROWS * TILE;

export const PACMAN_START: [number, number] = [10, 12];

export const GHOST_SPAWNS: Array<[number, number]> = [
  [9, 6],
  [10, 6],
  [8, 6],
  [11, 6],
];

export const GHOST_EXIT: [number, number] = [10, 5];

export const SCORES = {
  dot: 10,
  pellet: 50,
  ghost: 200,
} as const;

export const GHOST_NAMES = ["Blinky", "Pinky", "Inky", "Clyde"] as const;

export const COLORS = {
  background: "#030712",
  wall: "#2563eb",
  wallBright: "#60a5fa",
  dot: "#93c5fd",
  pellet: "#fec42f",
  player: "#fec42f",
  door: "#f472b6",
  frightened: "#312e81",
  frightenedFlash: "#e0e7ff",
  ghostRed: "#ef4444",
  ghostPink: "#ec4899",
  ghostCyan: "#22d3ee",
  ghostOrange: "#fb923c",
  eyes: "#f8fafc",
} as const;

export const GHOST_COLORS = [
  COLORS.ghostRed,
  COLORS.ghostPink,
  COLORS.ghostCyan,
  COLORS.ghostOrange,
] as const;

export const MAP = [
  "####################",
  "####################",
  "##o..#........#..o##",
  "##.#...##..##...#.##",
  "##.##.#......#.##.##",
  "##..#...#--#...#..##",
  "###.##.#    #.##.###",
  "#......######......#",
  "###.##........##.###",
  "###.#####..#####.###",
  "##...##......##...##",
  "##.#....####....#.##",
  "##o..##......##..o##",
  "####################",
  "####################",
];
