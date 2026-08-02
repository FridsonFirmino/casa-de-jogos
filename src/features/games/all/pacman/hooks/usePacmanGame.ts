"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { COLORS, MAZE_COLS, MAZE_ROWS } from "../constants";
import {
  createInitialState,
  getHighScore,
  pauseGame,
  saveHighScore,
  stepGame,
  type Direction,
  type GameState,
  type GameStatus,
  type Ghost,
} from "../engine/pacmanEngine";
import { soundManager } from "../utils/sound";

const TICK_MS = 115;

interface UsePacmanGameReturn {
  canvasRef: (node: HTMLCanvasElement | null) => void;
  status: GameStatus;
  score: number;
  highScore: number;
  lives: number;
  volume: number;
  setVolume: (v: number) => void;
  start: () => void;
  restart: () => void;
  handleDirection: (dir: Direction) => void;
  togglePause: () => void;
}

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

export function usePacmanGame(): UsePacmanGameReturn {
  const stateRef = useRef<GameState>(createInitialState());
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTickRef = useRef<number>(0);
  const desiredRef = useRef<Direction>("NONE");
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const [status, setStatus] = useState<GameStatus>("idle");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(getHighScore);
  const [lives, setLives] = useState(3);
  const [volume, setVolumeState] = useState(0.3);

  const syncCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const w = Math.round(rect.width);
    const h = Math.round(rect.height);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
  }, []);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    syncCanvasSize();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const s = stateRef.current;
    const tile = Math.min(canvas.width / MAZE_COLS, canvas.height / MAZE_ROWS);
    const ox = (canvas.width - tile * MAZE_COLS) / 2;
    const oy = (canvas.height - tile * MAZE_ROWS) / 2;

    ctx.fillStyle = COLORS.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const now = performance.now();
    const t = clamp01((now - lastTickRef.current) / TICK_MS);
    const open = 0.5 + 0.5 * Math.sin(now / 90);

    for (let y = 0; y < MAZE_ROWS; y++) {
      for (let x = 0; x < MAZE_COLS; x++) {
        const px = ox + x * tile;
        const py = oy + y * tile;
        const cx = px + tile / 2;
        const cy = py + tile / 2;
        if (s.walls[y][x]) {
          drawWall(ctx, px, py, tile);
        } else if (s.doors[y][x]) {
          ctx.fillStyle = COLORS.door;
          ctx.fillRect(
            px + tile * 0.12,
            py + tile * 0.42,
            tile * 0.76,
            tile * 0.18,
          );
        } else if (s.pellets[y][x]) {
          const pulse = 1 + Math.sin(now / 200) * 0.18;
          ctx.fillStyle = COLORS.pellet;
          ctx.beginPath();
          ctx.arc(cx, cy, tile * 0.34 * pulse, 0, Math.PI * 2);
          ctx.fill();
        } else if (s.dots[y][x]) {
          ctx.fillStyle = COLORS.dot;
          ctx.beginPath();
          ctx.arc(cx, cy, tile * 0.14, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    for (const g of s.ghosts) {
      const gx = ox + lerp(g.from.x, g.tile.x, t) * tile + tile / 2;
      const gy = oy + lerp(g.from.y, g.tile.y, t) * tile + tile / 2;
      drawGhost(ctx, g, gx, gy, tile, s.frightenedTicks);
    }

    const p = s.player;
    const px = ox + lerp(p.from.x, p.tile.x, t) * tile + tile / 2;
    const py = oy + lerp(p.from.y, p.tile.y, t) * tile + tile / 2;
    drawPac(ctx, px, py, tile, p.dir, open);
  }, [syncCanvasSize]);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const runTick = useCallback(() => {
    const prevScore = stateRef.current.score;
    const prevLives = stateRef.current.lives;

    lastTickRef.current = performance.now();
    stepGame(stateRef.current, desiredRef.current);

    const diff = stateRef.current.score - prevScore;
    if (diff > 0) {
      if (diff === 50) soundManager.playPellet();
      else if (diff >= 200) soundManager.playGhostEaten();
      else soundManager.playEat();
    }

    if (stateRef.current.lives < prevLives) {
      soundManager.playDeath();
      soundManager.stopBackground();
    }

    if (
      stateRef.current.status === "won" ||
      stateRef.current.status === "gameOver"
    ) {
      soundManager.stopBackground();
      saveHighScore(stateRef.current.score);
      setHighScore((h) => Math.max(h, stateRef.current.score));
      clearTimer();
      setStatus(stateRef.current.status);
      setScore(stateRef.current.score);
      return;
    }

    setScore(stateRef.current.score);
    setLives(stateRef.current.lives);
  }, [clearTimer]);

  const beginPlaying = useCallback(() => {
    lastTickRef.current = performance.now();
    clearTimer();
    soundManager.startBackground();
    timerRef.current = setInterval(runTick, TICK_MS);
    setStatus("playing");
  }, [runTick, clearTimer]);

  const start = useCallback(() => {
    if (stateRef.current.status === "playing") return;
    stateRef.current = { ...createInitialState(), status: "playing" };
    setScore(0);
    setLives(3);
    runTick();
    beginPlaying();
  }, [beginPlaying, runTick]);

  const restart = useCallback(() => {
    stateRef.current = createInitialState();
    setScore(0);
    setLives(3);
    runTick();
    beginPlaying();
  }, [beginPlaying, runTick]);

  const handleDirection = useCallback((dir: Direction) => {
    if (stateRef.current.status === "idle") return;
    desiredRef.current = dir;
  }, []);

  const togglePause = useCallback(() => {
    if (stateRef.current.status === "playing") {
      pauseGame(stateRef.current);
      clearTimer();
      setStatus("paused");
    } else if (stateRef.current.status === "paused") {
      pauseGame(stateRef.current);
      beginPlaying();
    }
  }, [clearTimer, beginPlaying]);

  const setVolume = useCallback((v: number) => {
    soundManager.volume = v;
    setVolumeState(v);
  }, []);

  useEffect(() => {
    const rafLoop = () => {
      render();
      rafRef.current = requestAnimationFrame(rafLoop);
    };
    rafRef.current = requestAnimationFrame(rafLoop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [render]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const map: Record<string, Direction> = {
        ArrowUp: "UP",
        ArrowDown: "DOWN",
        ArrowLeft: "LEFT",
        ArrowRight: "RIGHT",
        w: "UP",
        W: "UP",
        s: "DOWN",
        S: "DOWN",
        a: "LEFT",
        A: "LEFT",
        d: "RIGHT",
        D: "RIGHT",
      };

      if (e.key === " " || e.key === "Escape") {
        e.preventDefault();
        if (status === "playing" || status === "paused") togglePause();
        return;
      }

      const dir = map[e.key];
      if (dir) {
        e.preventDefault();
        if (status === "idle" || status === "won" || status === "gameOver") {
          start();
        }
        handleDirection(dir);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [status, start, togglePause, handleDirection]);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const startPoint = touchStartRef.current;
      if (!startPoint) return;
      const touch = e.changedTouches[0];
      const dx = touch.clientX - startPoint.x;
      const dy = touch.clientY - startPoint.y;
      touchStartRef.current = null;
      if (Math.abs(dx) < 30 && Math.abs(dy) < 30) return;
      let dir: Direction;
      if (Math.abs(dx) > Math.abs(dy)) dir = dx > 0 ? "RIGHT" : "LEFT";
      else dir = dy > 0 ? "DOWN" : "UP";
      if (status === "idle") start();
      handleDirection(dir);
    };
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    canvas.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchend", handleTouchEnd);
    };
  }, [status, start, handleDirection]);

  useEffect(() => {
    return () => {
      clearTimer();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (resizeObserverRef.current) resizeObserverRef.current.disconnect();
      soundManager.stopBackground();
    };
  }, [clearTimer]);

  const setCanvasRef = useCallback(
    (node: HTMLCanvasElement | null) => {
      if (resizeObserverRef.current) resizeObserverRef.current.disconnect();
      canvasRef.current = node;
      if (node) {
        resizeObserverRef.current = new ResizeObserver(() => render());
        resizeObserverRef.current.observe(node);
        render();
      }
    },
    [render],
  );

  return {
    canvasRef: setCanvasRef,
    status,
    score,
    highScore,
    lives,
    volume,
    setVolume,
    start,
    restart,
    handleDirection,
    togglePause,
  };
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function drawWall(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
): void {
  ctx.fillStyle = COLORS.wall;
  ctx.fillRect(x, y, size, size);
  ctx.fillStyle = COLORS.wallBright;
  ctx.fillRect(x + size * 0.12, y + size * 0.1, size * 0.76, size * 0.2);
}

function drawPac(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  tile: number,
  dir: Direction,
  openness: number,
): void {
  const r = tile * 0.44;
  const angle = 0.3 + openness * 0.7;
  let start = 0;
  if (dir === "UP") start = -Math.PI / 2;
  else if (dir === "DOWN") start = Math.PI / 2;
  else if (dir === "LEFT") start = Math.PI;
  ctx.fillStyle = COLORS.player;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.arc(x, y, r, start + angle, start - angle, false);
  ctx.closePath();
  ctx.fill();
}

function drawGhost(
  ctx: CanvasRenderingContext2D,
  g: Ghost,
  x: number,
  y: number,
  tile: number,
  frightTicks: number,
): void {
  const r = tile * 0.4;
  const isFrightened = g.mode === "frightened";

  if (g.mode === "house") return;

  if (isFrightened) {
    const flash =
      frightTicks < 8 && Math.floor(performance.now() / 120) % 2 === 0;
    ctx.fillStyle = flash ? COLORS.frightenedFlash : COLORS.frightened;
    ctx.beginPath();
    ghostBody(ctx, x, y, r);
    ctx.fill();
    ctx.fillStyle = "#1e1b4b";
    ctx.beginPath();
    ctx.arc(x - r * 0.3, y - r * 0.15, r * 0.12, 0, Math.PI * 2);
    ctx.arc(x + r * 0.3, y - r * 0.15, r * 0.12, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#1e1b4b";
    ctx.lineWidth = tile * 0.05;
    ctx.beginPath();
    ctx.moveTo(x - r * 0.3, y + r * 0.05);
    ctx.lineTo(x - r * 0.2, y + r * 0.12);
    ctx.lineTo(x - r * 0.1, y + r * 0.05);
    ctx.lineTo(x, y + r * 0.12);
    ctx.lineTo(x + r * 0.1, y + r * 0.05);
    ctx.stroke();
    return;
  }

  ctx.fillStyle = g.color;
  ctx.beginPath();
  ghostBody(ctx, x, y, r);
  ctx.fill();

  ctx.fillStyle = COLORS.eyes;
  ctx.beginPath();
  ctx.arc(x - r * 0.3, y - r * 0.15, r * 0.2, 0, Math.PI * 2);
  ctx.arc(x + r * 0.3, y - r * 0.15, r * 0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#1e1b4b";
  ctx.beginPath();
  ctx.arc(x - r * 0.3, y - r * 0.15, r * 0.1, 0, Math.PI * 2);
  ctx.arc(x + r * 0.3, y - r * 0.15, r * 0.1, 0, Math.PI * 2);
  ctx.fill();
}

function ghostBody(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
): void {
  ctx.arc(x, y, r, Math.PI, 0, false);
  ctx.lineTo(x + r, y + r * 0.6);
  ctx.quadraticCurveTo(x + r * 0.66, y + r, x + r * 0.33, y + r * 0.6);
  ctx.lineTo(x, y + r * 0.85);
  ctx.quadraticCurveTo(x - r * 0.33, y + r, x - r * 0.66, y + r * 0.6);
  ctx.lineTo(x - r, y + r * 0.6);
  ctx.closePath();
}
