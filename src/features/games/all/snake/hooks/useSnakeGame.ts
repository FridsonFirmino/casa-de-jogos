'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  createInitialState,
  moveSnake,
  changeDirection,
  saveHighScore,
  getHighScore,
  type Direction,
  type GameState,
  type GameStatus,
} from '../engine/snakeEngine'
import { GRID_SIZE } from '../constants'
import { soundManager } from '../utils/sound'

interface UseSnakeGameReturn {
  canvasRef: (node: HTMLCanvasElement | null) => void
  status: GameStatus
  score: number
  highScore: number
  volume: number
  setVolume: (v: number) => void
  start: () => void
  restart: () => void
  handleDirection: (dir: Direction) => void
  togglePause: () => void
}

export function useSnakeGame(): UseSnakeGameReturn {
  const stateRef = useRef<GameState>(createInitialState())
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const gameLoopRef = useRef<() => void>(() => {})
  const resizeObserverRef = useRef<ResizeObserver | null>(null)

  const [status, setStatus] = useState<GameStatus>('idle')
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(getHighScore)
  const [volume, setVolumeState] = useState(0.3)

  const getSpeed = useCallback((currentScore: number): number => {
    const speedUpCount = Math.floor(currentScore / 50)
    const speed = 150 - speedUpCount * 5
    return Math.max(speed, 60)
  }, [])

  const syncCanvasSize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const size = Math.round(rect.width)
    if (canvas.width !== size || canvas.height !== size) {
      canvas.width = size
      canvas.height = size
    }
  }, [])

  const render = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    syncCanvasSize()

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const cellSize = canvas.width / GRID_SIZE
    const { snake, food } = stateRef.current

    ctx.fillStyle = '#18181b'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.strokeStyle = '#27272a'
    ctx.lineWidth = 0.5
    for (let i = 1; i < GRID_SIZE; i++) {
      ctx.beginPath()
      ctx.moveTo(i * cellSize, 0)
      ctx.lineTo(i * cellSize, canvas.height)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, i * cellSize)
      ctx.lineTo(canvas.width, i * cellSize)
      ctx.stroke()
    }

    ctx.shadowBlur = Math.max(4, cellSize * 0.6)
    ctx.shadowColor = '#ef4444'
    ctx.fillStyle = '#ef4444'
    const foodRadius = cellSize / 2 - Math.max(1, cellSize * 0.1)
    ctx.beginPath()
    ctx.arc(
      food.x * cellSize + cellSize / 2,
      food.y * cellSize + cellSize / 2,
      foodRadius,
      0,
      Math.PI * 2,
    )
    ctx.fill()
    ctx.shadowBlur = 0

    snake.forEach((segment, index) => {
      const t = snake.length > 1 ? index / (snake.length - 1) : 0
      ctx.fillStyle = `rgb(${Math.round(16 + t * 5)},${Math.round(185 - t * 40)},${Math.round(129 - t * 50)})`
      ctx.shadowBlur = index === 0 ? Math.max(2, cellSize * 0.4) : 0
      ctx.shadowColor = '#10b981'
      const padding = Math.max(1, cellSize * 0.05)
      ctx.fillRect(
        segment.x * cellSize + padding,
        segment.y * cellSize + padding,
        cellSize - padding * 2,
        cellSize - padding * 2,
      )
      ctx.shadowBlur = 0
    })
  }, [syncCanvasSize])

  useEffect(() => {
    gameLoopRef.current = () => {
      const prevScore = stateRef.current.score
      const prevStatus = stateRef.current.status

      stateRef.current = moveSnake(stateRef.current)

      if (stateRef.current.status === 'gameOver' && prevStatus === 'playing') {
        const head = stateRef.current.snake[0]
        const isWall =
          head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE
        if (isWall) soundManager.playWallHit()
        else soundManager.playSelfHit()
        soundManager.stopBackground()

        saveHighScore(stateRef.current.score)
        setHighScore(prev => Math.max(prev, stateRef.current.score))
        setScore(stateRef.current.score)
        setStatus('gameOver')
        return
      }

      if (stateRef.current.score > prevScore) {
        soundManager.playEat()
      }

      setScore(stateRef.current.score)
      render()

      if (stateRef.current.status === 'playing') {
        const speed = getSpeed(stateRef.current.score)
        timerRef.current = setTimeout(() => gameLoopRef.current(), speed)
      }
    }
  })

  const scheduleNext = useCallback(() => {
    if (stateRef.current.status !== 'playing') return
    const speed = getSpeed(stateRef.current.score)
    timerRef.current = setTimeout(() => gameLoopRef.current(), speed)
  }, [getSpeed])

  const start = useCallback(() => {
    stateRef.current = { ...stateRef.current, status: 'playing' }
    soundManager.startBackground()
    setStatus('playing')
    setScore(0)
    syncCanvasSize()
    render()
    scheduleNext()
  }, [render, scheduleNext, syncCanvasSize])

  const restart = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    soundManager.stopBackground()

    stateRef.current = createInitialState()
    setScore(0)
    syncCanvasSize()
    render()

    stateRef.current = { ...stateRef.current, status: 'playing' }
    soundManager.startBackground()
    setStatus('playing')
    scheduleNext()
  }, [render, scheduleNext, syncCanvasSize])

  const togglePause = useCallback(() => {
    if (stateRef.current.status === 'playing') {
      stateRef.current = { ...stateRef.current, status: 'paused' }
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
      setStatus('paused')
    } else if (stateRef.current.status === 'paused') {
      stateRef.current = { ...stateRef.current, status: 'playing' }
      setStatus('playing')
      scheduleNext()
    }
  }, [scheduleNext])

  const handleDirection = useCallback((dir: Direction) => {
    stateRef.current = changeDirection(stateRef.current, dir)
  }, [])

  const setVolume = useCallback((v: number) => {
    soundManager.volume = v
    setVolumeState(v)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const dirMap: Record<string, Direction> = {
        ArrowUp: 'UP',
        ArrowDown: 'DOWN',
        ArrowLeft: 'LEFT',
        ArrowRight: 'RIGHT',
        w: 'UP',
        W: 'UP',
        s: 'DOWN',
        S: 'DOWN',
        a: 'LEFT',
        A: 'LEFT',
        d: 'RIGHT',
        D: 'RIGHT',
      }

      if (e.key === ' ' || e.key === 'Escape') {
        e.preventDefault()
        if (status === 'playing' || status === 'paused') {
          togglePause()
        }
        return
      }

      const dir = dirMap[e.key]
      if (dir) {
        e.preventDefault()
        if (status === 'idle') {
          start()
        }
        if (stateRef.current.status === 'playing') {
          handleDirection(dir)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [status, start, togglePause, handleDirection])

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
      soundManager.stopBackground()
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect()
      }
    }
  }, [])

  const setCanvasRef = useCallback(
    (node: HTMLCanvasElement | null) => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect()
      }

      canvasRef.current = node

      if (node) {
        resizeObserverRef.current = new ResizeObserver(() => {
          render()
        })
        resizeObserverRef.current.observe(node)
        render()
      }
    },
    [render],
  )

  useEffect(() => {
    if (status === 'idle') {
      render()
    }
  }, [status, render])

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0]
    touchStartRef.current = { x: touch.clientX, y: touch.clientY }
  }, [])

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (!touchStartRef.current) return
      const touch = e.changedTouches[0]
      const dx = touch.clientX - touchStartRef.current.x
      const dy = touch.clientY - touchStartRef.current.y
      touchStartRef.current = null

      const minSwipe = 30
      if (Math.abs(dx) < minSwipe && Math.abs(dy) < minSwipe) return

      if (Math.abs(dx) > Math.abs(dy)) {
        handleDirection(dx > 0 ? 'RIGHT' : 'LEFT')
      } else {
        handleDirection(dy > 0 ? 'DOWN' : 'UP')
      }

      if (status === 'idle') start()
    },
    [handleDirection, start, status],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.addEventListener('touchstart', handleTouchStart, { passive: true })
    canvas.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart)
      canvas.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchEnd])

  return {
    canvasRef: setCanvasRef,
    status,
    score,
    highScore,
    volume,
    setVolume,
    start,
    restart,
    handleDirection,
    togglePause,
  }
}
