'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { RealtimeChannel } from '@supabase/supabase-js'
import { getSupabaseClient } from '@/lib/supabaseClient'
import { getWinner } from '../engine/rpsEngine'
import {
  TOTAL_ROUNDS,
  REVEAL_DELAY_MS,
  ROOM_CODE_ALPHABET,
  ROOM_CODE_LENGTH,
  REALTIME_CHANNEL_PREFIX,
  BROADCAST_EVENTS,
} from '../constants'
import { generateRoomCode } from '../engine/rpsEngine'
import type {
  Choice,
  MultiplayerPhase,
  RoundRecord,
  RoundResult,
  Score,
  ChoicePayload,
  PresenceMeta,
} from '../types'

interface UseMultiplayerGameOptions {
  joinRoomCode?: string
}

function createSessionId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`
}

export function useMultiplayerGame({ joinRoomCode }: UseMultiplayerGameOptions) {
  const [phase, setPhase] = useState<MultiplayerPhase>('name-entry')
  const [roomCode, setRoomCode] = useState(joinRoomCode ?? '')
  const [myName, setMyName] = useState('')
  const [opponentName, setOpponentName] = useState('')
  const [myChoice, setMyChoice] = useState<Choice | null>(null)
  const [opponentChoice, setOpponentChoice] = useState<Choice | null>(null)
  const [lastResult, setLastResult] = useState<RoundResult | null>(null)
  const [currentRound, setCurrentRound] = useState(1)
  const [score, setScore] = useState<Score>({ player: 0, opponent: 0, draws: 0 })
  const [history, setHistory] = useState<RoundRecord[]>([])

  const channelRef = useRef<RealtimeChannel | null>(null)
  const phaseRef = useRef<MultiplayerPhase>('name-entry')
  const myChoiceRef = useRef<Choice | null>(null)
  const opponentChoiceRef = useRef<Choice | null>(null)
  const pendingOpponentChoiceRef = useRef<{ round: number; choice: Choice } | null>(null)
  const roundRef = useRef(1)
  const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const effectivePhase: MultiplayerPhase =
    phase === 'reveal' && currentRound > TOTAL_ROUNDS ? 'finished' : phase

  const applyPhase = useCallback((next: MultiplayerPhase) => {
    phaseRef.current = next
    setPhase(next)
  }, [])

  const clearRevealTimer = useCallback(() => {
    if (revealTimerRef.current !== null) {
      clearTimeout(revealTimerRef.current)
      revealTimerRef.current = null
    }
  }, [])

  const clearRoundState = useCallback(() => {
    clearRevealTimer()
    myChoiceRef.current = null
    opponentChoiceRef.current = null
    setMyChoice(null)
    setOpponentChoice(null)
    setLastResult(null)
  }, [clearRevealTimer])

  const applyPendingOpponentChoice = useCallback((round: number) => {
    const pending = pendingOpponentChoiceRef.current
    if (!pending || pending.round !== round) return
    pendingOpponentChoiceRef.current = null
    opponentChoiceRef.current = pending.choice
    setOpponentChoice(pending.choice)
  }, [])

  const scheduleAdvance = useCallback(() => {
    clearRevealTimer()
    revealTimerRef.current = setTimeout(() => {
      revealTimerRef.current = null
      if (phaseRef.current !== 'reveal') return
      const next = roundRef.current + 1
      roundRef.current = next
      setCurrentRound(next)
      myChoiceRef.current = null
      opponentChoiceRef.current = null
      setMyChoice(null)
      setOpponentChoice(null)
      setLastResult(null)
      if (next > TOTAL_ROUNDS) {
        applyPhase('finished')
      } else {
        applyPhase('choosing')
        applyPendingOpponentChoice(next)
      }
    }, REVEAL_DELAY_MS)
  }, [applyPhase, applyPendingOpponentChoice, clearRevealTimer])

  const completeRound = useCallback(
    (mine: Choice, theirs: Choice) => {
      if (phaseRef.current !== 'choosing') return

      const result = getWinner(mine, theirs)
      setLastResult(result)
      setScore((s) => ({
        player: s.player + (result === 'win' ? 1 : 0),
        opponent: s.opponent + (result === 'lose' ? 1 : 0),
        draws: s.draws + (result === 'draw' ? 1 : 0),
      }))
      setHistory((h) => [
        ...h,
        { round: roundRef.current, playerChoice: mine, opponentChoice: theirs, result },
      ])
      applyPhase('reveal')
      scheduleAdvance()
    },
    [applyPhase, scheduleAdvance],
  )

  const resetMatch = useCallback(() => {
    clearRoundState()
    pendingOpponentChoiceRef.current = null
    roundRef.current = 1
    setCurrentRound(1)
    setScore({ player: 0, opponent: 0, draws: 0 })
    setHistory([])
    applyPhase('choosing')
  }, [applyPhase, clearRoundState])

  const connect = useCallback(
    (code: string, name: string) => {
      let channel: RealtimeChannel
      try {
        channel = getSupabaseClient().channel(`${REALTIME_CHANNEL_PREFIX}${code}`)
      } catch {
        return
      }

      channelRef.current = channel
      const sessionId = createSessionId()

      channel
        .on('broadcast', { event: BROADCAST_EVENTS.CHOICE }, ({ payload }) => {
          const { choice, round } = payload as ChoicePayload

          if (round < roundRef.current) return

          if (round > roundRef.current) {
            pendingOpponentChoiceRef.current = { round, choice }
            return
          }

          if (phaseRef.current !== 'choosing') return
          if (opponentChoiceRef.current !== null) return

          opponentChoiceRef.current = choice
          setOpponentChoice(choice)

          const mine = myChoiceRef.current
          if (mine !== null) completeRound(mine, choice)
        })
        .on('broadcast', { event: BROADCAST_EVENTS.PLAY_AGAIN }, () => {
          resetMatch()
        })
        .on('presence', { event: 'sync' }, () => {
          const state = channel.presenceState<PresenceMeta>()
          const members = Object.values(state).flat()
          const opponent = members.find((m) => m.id !== sessionId)

          if (opponent) {
            setOpponentName(opponent.name)
            if (phaseRef.current === 'waiting-for-opponent') applyPhase('choosing')
          } else if (phaseRef.current === 'choosing' || phaseRef.current === 'reveal') {
            applyPhase('opponent-left')
          }
        })
        .subscribe(async (status) => {
          if (status === 'SUBSCRIBED') {
            await channel.track({ name, id: sessionId } satisfies PresenceMeta)
          }
        })

      setMyName(name)
      setRoomCode(code)
      applyPhase('waiting-for-opponent')
    },
    [applyPhase, completeRound, resetMatch],
  )

  const createRoom = useCallback(
    (name: string) => {
      const code = generateRoomCode(ROOM_CODE_ALPHABET, ROOM_CODE_LENGTH)
      connect(code, name)
    },
    [connect],
  )

  const joinRoom = useCallback(
    (name: string) => {
      if (!joinRoomCode) return
      connect(joinRoomCode, name)
    },
    [connect, joinRoomCode],
  )

  const makeChoice = useCallback(
    (choice: Choice) => {
      if (phaseRef.current !== 'choosing') return
      if (myChoiceRef.current !== null) return

      myChoiceRef.current = choice
      setMyChoice(choice)

      channelRef.current?.send({
        type: 'broadcast',
        event: BROADCAST_EVENTS.CHOICE,
        payload: { choice, round: roundRef.current } satisfies ChoicePayload,
      })

      const theirs = opponentChoiceRef.current
      if (theirs !== null) completeRound(choice, theirs)
    },
    [completeRound],
  )

  const playAgain = useCallback(() => {
    if (phaseRef.current !== 'finished') return
    resetMatch()
    channelRef.current?.send({ type: 'broadcast', event: BROADCAST_EVENTS.PLAY_AGAIN, payload: {} })
  }, [resetMatch])

  const leaveRoom = useCallback(() => {
    channelRef.current?.unsubscribe()
    channelRef.current = null
    clearRoundState()
    pendingOpponentChoiceRef.current = null
    roundRef.current = 1
    setCurrentRound(1)
    setScore({ player: 0, opponent: 0, draws: 0 })
    setHistory([])
    setMyName('')
    setOpponentName('')
    setRoomCode('')
    applyPhase('name-entry')
  }, [applyPhase, clearRoundState])

  useEffect(() => {
    return () => {
      if (revealTimerRef.current !== null) clearTimeout(revealTimerRef.current)
      channelRef.current?.unsubscribe()
    }
  }, [])

  return {
    phase: effectivePhase,
    roomCode,
    myName,
    opponentName,
    myChoice,
    opponentChoice,
    lastResult,
    currentRound,
    score,
    history,
    createRoom,
    joinRoom,
    makeChoice,
    playAgain,
    leaveRoom,
  }
}
