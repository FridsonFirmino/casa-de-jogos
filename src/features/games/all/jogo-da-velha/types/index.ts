export type Symbol = 'X' | 'O'
export type Cell = Symbol | null
export type Board = Cell[]

export type GameMode = 'menu' | 'single' | 'multiplayer'

export type MultiplayerPhase =
  | 'name-entry'
  | 'waiting-for-opponent'
  | 'playing'
  | 'finished'
  | 'opponent-left'

export interface WinResult {
  winner: Symbol | null
  line: number[] | null
}

export interface MovePayload {
  index: number
  symbol: Symbol
}

export interface PresenceMeta {
  name: string
  symbol: Symbol
}
