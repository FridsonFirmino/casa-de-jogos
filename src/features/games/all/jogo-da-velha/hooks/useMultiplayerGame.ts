'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { RealtimeChannel } from '@supabase/supabase-js'
import { getSupabaseClient } from '@/lib/supabaseClient'
import {
  EMPTY_BOARD,
  ROOM_CODE_ALPHABET,
  ROOM_CODE_LENGTH,
  REALTIME_CHANNEL_PREFIX,
  BROADCAST_EVENTS,
} from '../constants'
import { checkWinner, isDraw, generateRoomCode } from '../engine/ticTacToeEngine'
import type { Board, MovePayload, MultiplayerPhase, PresenceMeta, Symbol } from '../types'

const STARTING_TURN: Symbol = 'X'

interface UseMultiplayerGameOptions {
  joinRoomCode?: string
}

export function useMultiplayerGame({ joinRoomCode }: UseMultiplayerGameOptions) {
  const isHost = !joinRoomCode
  const mySymbol: Symbol = isHost ? 'X' : 'O'
  const opponentSymbol: Symbol = isHost ? 'O' : 'X'

  const [phase, setPhase] = useState<MultiplayerPhase>('name-entry')
  const [roomCode, setRoomCode] = useState(joinRoomCode ?? '')
  const [myName, setMyName] = useState('')
  const [opponentName, setOpponentName] = useState('')
  const [board, setBoard] = useState<Board>(EMPTY_BOARD)
  const [currentTurn, setCurrentTurn] = useState<Symbol>(STARTING_TURN)
  const [error, setError] = useState<string | null>(null)

  const channelRef = useRef<RealtimeChannel | null>(null)

  const { winner, line } = checkWinner(board)
  const draw = isDraw(board)
  const effectivePhase: MultiplayerPhase =
    phase === 'playing' && (winner !== null || draw) ? 'finished' : phase

  const connect = useCallback(
    (code: string, name: string) => {
      let channel: RealtimeChannel
      try {
        channel = getSupabaseClient().channel(`${REALTIME_CHANNEL_PREFIX}${code}`)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Não foi possível conectar ao multiplayer.')
        return
      }
      setError(null)
      channelRef.current = channel

      channel
        .on('broadcast', { event: BROADCAST_EVENTS.MOVE }, ({ payload }) => {
          const { index, symbol } = payload as MovePayload
          setBoard((current) => {
            const next = [...current]
            next[index] = symbol
            return next
          })
          setCurrentTurn(mySymbol)
        })
        .on('broadcast', { event: BROADCAST_EVENTS.RESET }, () => {
          setBoard(EMPTY_BOARD)
          setCurrentTurn(STARTING_TURN)
          setPhase('playing')
        })
        .on('presence', { event: 'sync' }, () => {
          const state = channel.presenceState<PresenceMeta>()
          const members = Object.values(state).flat()
          const opponent = members.find((m) => m.symbol === opponentSymbol)

          if (opponent) {
            setOpponentName(opponent.name)
            setPhase((current) => (current === 'waiting-for-opponent' ? 'playing' : current))
          } else {
            setPhase((current) => (current === 'playing' ? 'opponent-left' : current))
          }
        })
        .subscribe(async (status) => {
          if (status === 'SUBSCRIBED') {
            await channel.track({ name, symbol: mySymbol } satisfies PresenceMeta)
          }
        })

      setMyName(name)
      setRoomCode(code)
      setPhase('waiting-for-opponent')
    },
    [mySymbol, opponentSymbol],
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

  const handleCellClick = useCallback(
    (index: number) => {
      if (phase !== 'playing' || currentTurn !== mySymbol || board[index] !== null) return

      setBoard((current) => {
        const next = [...current]
        next[index] = mySymbol
        return next
      })
      setCurrentTurn(opponentSymbol)

      channelRef.current?.send({
        type: 'broadcast',
        event: BROADCAST_EVENTS.MOVE,
        payload: { index, symbol: mySymbol } satisfies MovePayload,
      })
    },
    [phase, currentTurn, mySymbol, opponentSymbol, board],
  )

  const playAgain = useCallback(() => {
    setBoard(EMPTY_BOARD)
    setCurrentTurn(STARTING_TURN)
    setPhase('playing')
    channelRef.current?.send({ type: 'broadcast', event: BROADCAST_EVENTS.RESET, payload: {} })
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
    error,
    roomCode,
    myName,
    opponentName,
    board,
    currentTurn,
    winner,
    winningLine: line,
    isDraw: draw,
    mySymbol,
    opponentSymbol,
    createRoom,
    joinRoom,
    handleCellClick,
    playAgain,
    leaveRoom,
  }
}
