import {
  COLORS,
  GHOST_COLORS,
  GHOST_NAMES,
  GHOST_SPAWNS,
  MAP,
  MAZE_COLS,
  MAZE_ROWS,
  PACMAN_START,
  SCORES,
} from "../constants";

export type GridCoord = { x: number; y: number };
export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT" | "NONE";
export type GameStatus = "idle" | "playing" | "paused" | "gameOver" | "won";
export type GhostMode = "house" | "active" | "frightened" | "returning";

export interface Ghost {
  name: string;
  color: string;
  tile: GridCoord;
  from: GridCoord;
  dir: Direction;
  mode: GhostMode;
}

export interface GameState {
  walls: boolean[][];
  dots: boolean[][];
  pellets: boolean[][];
  doors: boolean[][];
  player: {
    tile: GridCoord;
    from: GridCoord;
    dir: Direction;
    desired: Direction;
  };
  ghosts: Ghost[];
  score: number;
  lives: number;
  dotsRemaining: number;
  ghostCombo: number;
  frightenedTicks: number;
  spawnTicks: number;
  status: GameStatus;
}

interface Vec {
  dir: Direction;
  dx: number;
  dy: number;
}

const DIRS: Vec[] = [
  { dir: "UP", dx: 0, dy: -1 },
  { dir: "DOWN", dx: 0, dy: 1 },
  { dir: "LEFT", dx: -1, dy: 0 },
  { dir: "RIGHT", dx: 1, dy: 0 },
];

const HOUSE_TILE: GridCoord = { x: 9, y: 6 };
const EXIT_TILE: GridCoord = { x: 10, y: 5 };

export function inBounds(x: number, y: number): boolean {
  return x >= 0 && x < MAZE_COLS && y >= 0 && y < MAZE_ROWS;
}

function isOpposite(a: Direction, b: Direction): boolean {
  return (
    (a === "UP" && b === "DOWN") ||
    (a === "DOWN" && b === "UP") ||
    (a === "LEFT" && b === "RIGHT") ||
    (a === "RIGHT" && b === "LEFT") ||
    a === "NONE" ||
    b === "NONE"
  );
}

function buildGrid() {
  const walls: boolean[][] = [];
  const dots: boolean[][] = [];
  const pellets: boolean[][] = [];
  const doors: boolean[][] = [];
  for (let y = 0; y < MAZE_ROWS; y++) {
    const w: boolean[] = [];
    const d: boolean[] = [];
    const p: boolean[] = [];
    const dr: boolean[] = [];
    for (let x = 0; x < MAZE_COLS; x++) {
      const c = MAP[y][x];
      w.push(c === "#");
      d.push(c === ".");
      p.push(c === "o");
      dr.push(c === "-");
    }
    walls.push(w);
    dots.push(d);
    pellets.push(p);
    doors.push(dr);
  }
  return { walls, dots, pellets, doors };
}

function playerCanEnter(state: GameState, x: number, y: number): boolean {
  if (!inBounds(x, y)) return false;
  return !state.walls[y][x] && !state.doors[y][x];
}

function manhattan(a: GridCoord, b: GridCoord): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function chooseDirection(
  state: GameState,
  from: GridCoord,
  target: GridCoord,
  prevDir: Direction,
  allowDoor: boolean,
  random: boolean,
): Direction {
  const options: Vec[] = [];
  for (const v of DIRS) {
    if (isOpposite(v.dir, prevDir)) continue;
    const nx = from.x + v.dx;
    const ny = from.y + v.dy;
    if (!inBounds(nx, ny)) continue;
    if (!state.walls[ny][nx] && (allowDoor || !state.doors[ny][nx])) {
      options.push(v);
    }
  }
  if (options.length === 0) return prevDir;
  if (random) {
    return options[Math.floor(Math.random() * options.length)].dir;
  }
  let best = options[0];
  let bestDist = Infinity;
  for (const v of options) {
    const d = manhattan({ x: from.x + v.dx, y: from.y + v.dy }, target);
    if (d < bestDist) {
      bestDist = d;
      best = v;
    }
  }
  return best.dir;
}

function stepCell(tile: GridCoord, dir: Direction): GridCoord {
  const v = DIRS.find((d) => d.dir === dir);
  if (!v) return { ...tile };
  return { x: tile.x + v.dx, y: tile.y + v.dy };
}

export function createInitialState(): GameState {
  const { walls, dots, pellets, doors } = buildGrid();
  let dotsRemaining = 0;
  for (let y = 0; y < MAZE_ROWS; y++) {
    for (let x = 0; x < MAZE_COLS; x++) {
      if (dots[y][x] || pellets[y][x]) dotsRemaining++;
    }
  }
  const ghosts: Ghost[] = GHOST_SPAWNS.map(([x, y], i) => ({
    name: GHOST_NAMES[i],
    color: GHOST_COLORS[i],
    tile: { x, y },
    from: { x, y },
    dir: "NONE",
    mode: "house",
  }));
  return {
    walls,
    dots,
    pellets,
    doors,
    player: {
      tile: { x: PACMAN_START[0], y: PACMAN_START[1] },
      from: { x: PACMAN_START[0], y: PACMAN_START[1] },
      dir: "NONE",
      desired: "NONE",
    },
    ghosts,
    score: 0,
    lives: 3,
    dotsRemaining,
    ghostCombo: 0,
    frightenedTicks: 0,
    spawnTicks: 0,
    status: "idle",
  };
}

export function startGame(state: GameState): GameState {
  state.status = "playing";
  return state;
}

export function pauseGame(state: GameState): GameState {
  if (state.status === "playing") {
    state.status = "paused";
  } else if (state.status === "paused") {
    state.status = "playing";
  }
  return state;
}

export function resetGame(): GameState {
  return createInitialState();
}

export function stepGame(state: GameState, desired: Direction): GameState {
  if (state.status !== "playing") return state;
  const p = state.player;

  if (desired !== "NONE" && !isOpposite(p.desired, desired)) {
    p.desired = desired;
  }

  p.from = { ...p.tile };

  const wanted = stepCell(p.tile, p.desired);
  if (playerCanEnter(state, wanted.x, wanted.y)) {
    p.tile = wanted;
    p.dir = p.desired;
    p.desired = "NONE";
  } else {
    const fwd = stepCell(p.tile, p.dir);
    if (playerCanEnter(state, fwd.x, fwd.y)) {
      p.tile = fwd;
    }
  }

  eatAt(state, p.tile.x, p.tile.y);

  state.frightenedTicks = Math.max(0, state.frightenedTicks - 1);
  if (state.frightenedTicks === 0) {
    for (const g of state.ghosts) {
      if (g.mode === "frightened") g.mode = "active";
    }
  }

  state.spawnTicks++;
  releaseGhosts(state);

  for (const g of state.ghosts) {
    moveGhost(state, g);
  }

  checkCollisions(state);

  if (state.dotsRemaining <= 0) {
    state.status = "won";
  }

  return state;
}

function eatAt(state: GameState, x: number, y: number): void {
  if (state.dots[y][x]) {
    state.dots[y][x] = false;
    state.dotsRemaining--;
    state.score += SCORES.dot;
  }
  if (state.pellets[y][x]) {
    state.pellets[y][x] = false;
    state.dotsRemaining--;
    state.score += SCORES.pellet;
    state.frightenedTicks = 45;
    state.ghostCombo = 0;
    for (const g of state.ghosts) {
      if (g.mode === "active") g.mode = "frightened";
    }
  }
}

function releaseGhosts(state: GameState): void {
  const releaseTimes = [0, 12, 24, 36];
  state.ghosts.forEach((g, i) => {
    if (g.mode === "house" && state.spawnTicks >= releaseTimes[i]) {
      g.mode = "active";
      g.tile = { x: EXIT_TILE.x, y: EXIT_TILE.y };
      g.from = { ...g.tile };
      g.dir = "UP";
    }
  });
}

function moveHouseGhost(state: GameState, g: Ghost): void {
  g.from = { ...g.tile };
  const options: Vec[] = DIRS.filter((v) => {
    if (g.dir !== "NONE" && isOpposite(v.dir, g.dir)) return false;
    const nx = g.tile.x + v.dx;
    const ny = g.tile.y + v.dy;
    if (!inBounds(nx, ny)) return false;
    return !state.walls[ny][nx] && !state.doors[ny][nx];
  });
  if (options.length === 0) return;
  const chosen = options[Math.floor(Math.random() * options.length)];
  g.tile = { x: g.tile.x + chosen.dx, y: g.tile.y + chosen.dy };
  g.dir = chosen.dir;
}

function moveGhost(state: GameState, g: Ghost): void {
  g.from = { ...g.tile };

  if (g.mode === "returning") {
    const dir = chooseDirection(state, g.tile, HOUSE_TILE, g.dir, true, false);
    g.dir = dir;
    g.tile = stepCell(g.tile, dir);
    if (g.tile.x === HOUSE_TILE.x && g.tile.y === HOUSE_TILE.y) {
      g.mode = "active";
    }
    return;
  }

  if (g.mode === "house") {
    moveHouseGhost(state, g);
    return;
  }

  const frightened = g.mode === "frightened";
  const target = frightened
    ? HOUSE_TILE
    : { x: state.player.tile.x, y: state.player.tile.y };
  const dir = chooseDirection(state, g.tile, target, g.dir, true, frightened);
  g.dir = dir;
  g.tile = stepCell(g.tile, dir);
}

function checkCollisions(state: GameState): void {
  const px = state.player.tile.x;
  const py = state.player.tile.y;
  for (const g of state.ghosts) {
    if (g.mode === "house" || g.mode === "returning") continue;
    if (g.tile.x === px && g.tile.y === py) {
      if (g.mode === "frightened") {
        state.ghostCombo++;
        state.score += SCORES.ghost * Math.pow(2, state.ghostCombo - 1);
        g.mode = "returning";
        g.dir = "UP";
        g.tile = stepCell({ x: HOUSE_TILE.x, y: HOUSE_TILE.y }, "UP");
        g.from = { ...g.tile };
      } else if (g.mode === "active") {
        state.lives--;
        if (state.lives <= 0) {
          state.status = "gameOver";
        } else {
          resetEntityPositions(state);
        }
      }
    }
  }
}

function resetEntityPositions(state: GameState): void {
  state.player.tile = { x: PACMAN_START[0], y: PACMAN_START[1] };
  state.player.from = { ...state.player.tile };
  state.player.dir = "NONE";
  state.player.desired = "NONE";
  state.ghosts = GHOST_SPAWNS.map(([x, y], i) => ({
    name: GHOST_NAMES[i],
    color: GHOST_COLORS[i],
    tile: { x, y },
    from: { x, y },
    dir: "NONE",
    mode: "house",
  }));
  state.spawnTicks = 0;
  state.frightenedTicks = 0;
  state.ghostCombo = 0;
}

export function getHighScore(): number {
  if (typeof window === "undefined") return 0;
  const stored = window.localStorage.getItem("pacman-high-score");
  return stored ? parseInt(stored, 10) : 0;
}

export function saveHighScore(score: number): void {
  const current = getHighScore();
  if (score > current) {
    window.localStorage.setItem("pacman-high-score", score.toString());
  }
}

export { COLORS };
