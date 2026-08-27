import type { Choice } from '../types'

export const CHOICES: Choice[] = ['rock', 'paper', 'scissors']

export const CHOICE_LABELS: Record<Choice, string> = {
  rock: 'Pedra',
  paper: 'Papel',
  scissors: 'Tesoura',
}

export const CHOICE_ICONS: Record<Choice, string> = {
  rock: '🪨',
  paper: '📄',
  scissors: '✂️',
}

export const TOTAL_ROUNDS = 5

export const REVEAL_DELAY_MS = 1200

export const ROOM_CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
export const ROOM_CODE_LENGTH = 6

export const REALTIME_CHANNEL_PREFIX = 'rps-room-'

export const BROADCAST_EVENTS = {
  CHOICE: 'choice',
  PLAY_AGAIN: 'play-again',
} as const
