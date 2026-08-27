'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { RealtimeChannel } from '@supabase/supabase-js'
import { getSupabaseClient } from '@/lib/supabaseClient'
import { getWinner } from '../engine/rpsEngine'
import {
  TOTAL_ROUNDS,
  ROOM_CODE_ALPHABET,
  ROOM_CODE_LENGTH,
  REALTIME_CHANNEL_PREFIX,
  BROADCAST_EVENTS,
} from '../constants'
import {
  generateRoomCode,
} from '../engine/rpsEngine'
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

  const effectivePhase: MultiplayerPhase =
    phase === 'finished'
      ? 'finished'
      : phase === 'reveal' && currentRound >= TOTAL_ROUNDS
        ? 'finished'
        : phase

  const connect = useCallback(
    (code: string, name: string) => {
      let channel: RealtimeChannel
      try {
        channel = getSupabaseClient().channel(`${REALTIME_CHANNEL_PREFIX}${code}`)
      } catch {
        return
      }

      channelRef.current = channel

      channel
        .on('broadcast', { event: BROADCAST_EVENTS.CHOICE }, ({ payload }) => {
          const { choice } = payload as ChoicePayload

          setOpponentChoice(choice)
          setMyChoice((prev) => {
            if (prev === null) return prev

            const result = getWinner(prev, choice)
            setLastResult(result)
            setScore((s) => ({
              player: s.player + (result === 'win' ? 1 : 0),
              opponent: s.opponent + (result === 'lose' ? 1 : 0),
              draws: s.draws + (result === 'draw' ? 1 : 0),
            }))
            setHistory((h) => [
              ...h,
              { round: h.length + 1, playerChoice: prev, opponentChoice: choice, result },
            ])

            return prev
          })

          setPhase((prev) => {
            if (prev === 'choosing') return 'reveal'
            return prev
          })

          setTimeout(() => {
            setMyChoice(null)
            setOpponentChoice(null)
            setLastResult(null)
            setCurrentRound((r) => {
              const next = r + 1
              if (next > TOTAL_ROUNDS) {
                setPhase('finished')
              } else {
                setPhase('choosing')
              }
              return next
            })
          }, 2000)
        })
        .on('broadcast', { event: BROADCAST_EVENTS.PLAY_AGAIN }, () => {
          setMyChoice(null)
          setOpponentChoice(null)
          setLastResult(null)
          setCurrentRound(1)
          setScore({ player: 0, opponent: 0, draws: 0 })
          setHistory([])
          setPhase('choosing')
        })
        .on('presence', { event: 'sync' }, () => {
          const state = channel.presenceState<PresenceMeta>()
          const members = Object.values(state).flat()
          const opponent = members.find((m) => m.name !== name)

          if (opponent) {
            setOpponentName(opponent.name)
            setPhase((current) => (current === 'waiting-for-opponent' ? 'choosing' : current))
          } else {
            setPhase((current) =>
              current === 'choosing' || current === 'reveal' ? 'opponent-left' : current,
            )
          }
        })
        .subscribe(async (status) => {
          if (status === 'SUBSCRIBED') {
            await channel.track({ name } satisfies PresenceMeta)
          }
        })

      setMyName(name)
      setRoomCode(code)
      setPhase('waiting-for-opponent')
    },
    [],
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
      if (myChoice !== null) return

      setMyChoice(choice)

      channelRef.current?.send({
        type: 'broadcast',
        event: BROADCAST_EVENTS.CHOICE,
        payload: { choice } satisfies ChoicePayload,
      })
    },
    [myChoice],
  )

  const playAgain = useCallback(() => {
    setMyChoice(null)
    setOpponentChoice(null)
    setLastResult(null)
    setCurrentRound(1)
    setScore({ player: 0, opponent: 0, draws: 0 })
    setHistory([])
    setPhase('choosing')
    channelRef.current?.send({ type: 'broadcast', event: BROADCAST_EVENTS.PLAY_AGAIN, payload: {} })
  }, [])

  const leaveRoom = useCallback(() => {
    channelRef.current?.unsubscribe()
    channelRef.current = null
  }, [])

  useEffect(() => {
    return () => {
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
