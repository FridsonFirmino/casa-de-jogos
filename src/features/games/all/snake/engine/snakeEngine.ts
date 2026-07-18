import { GRID_SIZE, SCORE_PER_FOOD } from '../constants'

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

export interface Position {
  x: number
  y: number
}

export type GameStatus = 'idle' | 'playing' | 'paused' | 'gameOver'

export interface GameState {
  snake: Position[]
  food: Position
  direction: Direction
  nextDirection: Direction
  score: number
  status: GameStatus
}

function positionKey(pos: Position): string {
  return `${pos.x},${pos.y}`
}

export function createInitialState(): GameState {
  const center = Math.floor(GRID_SIZE / 2)
  const snake: Position[] = [
    { x: center, y: center },
    { x: center - 1, y: center },
    { x: center - 2, y: center },
  ]
  return {
    snake,
    food: generateFood(snake),
    direction: 'RIGHT',
    nextDirection: 'RIGHT',
    score: 0,
    status: 'idle',
  }
}

export function isOppositeDirection(a: Direction, b: Direction): boolean {
  return (
    (a === 'UP' && b === 'DOWN') ||
    (a === 'DOWN' && b === 'UP') ||
    (a === 'LEFT' && b === 'RIGHT') ||
    (a === 'RIGHT' && b === 'LEFT')
  )
}

export function changeDirection(state: GameState, newDirection: Direction): GameState {
  if (isOppositeDirection(state.direction, newDirection)) {
    return state
  }
  return { ...state, nextDirection: newDirection }
}

export function moveSnake(state: GameState): GameState {
  const direction = state.nextDirection
  const head = state.snake[0]
  const newHead: Position = { x: head.x, y: head.y }

  switch (direction) {
    case 'UP':
      newHead.y -= 1
      break
    case 'DOWN':
      newHead.y += 1
      break
    case 'LEFT':
      newHead.x -= 1
      break
    case 'RIGHT':
      newHead.x += 1
      break
  }

  if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
    return { ...state, status: 'gameOver', direction }
  }

  if (state.snake.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
    return { ...state, status: 'gameOver', direction }
  }

  const newSnake = [newHead, ...state.snake]

  if (newHead.x === state.food.x && newHead.y === state.food.y) {
    return {
      ...state,
      snake: newSnake,
      food: generateFood(newSnake),
      score: state.score + SCORE_PER_FOOD,
      direction,
    }
  }

  newSnake.pop()
  return { ...state, snake: newSnake, direction }
}

export function generateFood(snake: Position[]): Position {
  const occupied = new Set(snake.map(positionKey))
  let food: Position
  do {
    food = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    }
  } while (occupied.has(positionKey(food)))
  return food
}

export function getHighScore(): number {
  if (typeof window === 'undefined') return 0
  const stored = localStorage.getItem('snake-high-score')
  return stored ? parseInt(stored, 10) : 0
}

export function saveHighScore(score: number): void {
  const current = getHighScore()
  if (score > current) {
    localStorage.setItem('snake-high-score', score.toString())
  }
}
