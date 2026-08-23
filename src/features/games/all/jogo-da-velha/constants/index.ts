export const WIN_LINES: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

export const EMPTY_BOARD: null[] = Array(9).fill(null)

export const ROOM_CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
export const ROOM_CODE_LENGTH = 6

export const REALTIME_CHANNEL_PREFIX = 'tictactoe-room-'

export const BROADCAST_EVENTS = {
  MOVE: 'move',
  RESET: 'reset',
} as const

export const AI_MOVE_DELAY_MS = 500
