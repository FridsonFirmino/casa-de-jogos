export type Choice = 'rock' | 'paper' | 'scissors'

export type GameMode = 'menu' | 'single' | 'multiplayer'

export type Difficulty = 'easy' | 'medium' | 'hard'

export type RoundResult = 'win' | 'lose' | 'draw'

export type SingleplayerPhase = 'playing' | 'reveal' | 'finished'

export type MultiplayerPhase =
  | 'name-entry'
  | 'waiting-for-opponent'
  | 'choosing'
  | 'reveal'
  | 'finished'
  | 'opponent-left'

export interface RoundRecord {
  round: number
  playerChoice: Choice
  opponentChoice: Choice
  result: RoundResult
}

export interface Score {
  player: number
  opponent: number
  draws: number
}

export interface ChoicePayload {
  choice: Choice
}

export interface PresenceMeta {
  name: string
}
