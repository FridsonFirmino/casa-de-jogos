'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import Board from './components/Board'
import ModeSelect from './components/ModeSelect'
import NameEntryForm from './components/NameEntryForm'
import WaitingRoom from './components/WaitingRoom'
import StatusBar from './components/StatusBar'
import GameOverPanel from './components/GameOverPanel'
import { useSingleplayerGame } from './hooks/useSingleplayerGame'
import { useMultiplayerGame } from './hooks/useMultiplayerGame'
import type { GameMode } from './types'

function GameInner() {
  const searchParams = useSearchParams()
  const roomCodeFromUrl = searchParams.get('room') ?? undefined

  const [mode, setMode] = useState<GameMode>(roomCodeFromUrl ? 'multiplayer' : 'menu')

  const single = useSingleplayerGame()
  const multiplayer = useMultiplayerGame({ joinRoomCode: roomCodeFromUrl })

  function backToMenu() {
    multiplayer.leaveRoom()
    setMode('menu')
  }

  if (mode === 'menu') {
    return (
      <ModeSelect
        onSelectSingle={() => setMode('single')}
        onSelectMultiplayer={() => setMode('multiplayer')}
      />
    )
  }

  if (mode === 'single') {
    return (
      <div className="flex flex-1 flex-col items-center gap-6 py-6">
        <StatusBar
          leftName="Você"
          leftSymbol={single.playerSymbol}
          rightName="Computador"
          rightSymbol={single.aiSymbol}
          currentTurn={single.currentTurn}
          isOver={single.isOver}
        />
        <div className="relative flex w-full flex-1 items-center justify-center">
          <Board
            board={single.board}
            onCellClick={single.handleCellClick}
            disabled={single.isOver || single.currentTurn !== single.playerSymbol}
            winningLine={single.winningLine}
          />
          {single.isOver && (
            <div className="absolute inset-0 flex items-center justify-center p-2">
              <GameOverPanel
                winner={single.winner}
                isDraw={single.isDraw}
                winnerName={single.winner === single.playerSymbol ? 'Você' : 'Computador'}
                onPlayAgain={single.reset}
              />
            </div>
          )}
        </div>
      </div>
    )
  }

  const inviteLink =
    typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}?room=${multiplayer.roomCode}`
      : ''

  return (
    <div className="flex flex-1 flex-col items-center gap-6 py-6">
      {multiplayer.phase !== 'name-entry' && (
        <Button variant="ghost" size="sm" onClick={backToMenu} className="self-start">
          Sair da sala
        </Button>
      )}

      {multiplayer.phase === 'name-entry' && (
        <NameEntryForm
          title={roomCodeFromUrl ? 'Entrar na sala' : 'Criar sala'}
          error={multiplayer.error}
          onSubmit={(name) =>
            roomCodeFromUrl ? multiplayer.joinRoom(name) : multiplayer.createRoom(name)
          }
        />
      )}

      {multiplayer.phase === 'waiting-for-opponent' && <WaitingRoom inviteLink={inviteLink} />}

      {multiplayer.phase === 'opponent-left' && (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-zinc-800/50 bg-zinc-900/50 p-10 text-center">
          <h2 className="font-display text-xl text-zinc-100">O oponente saiu da sala.</h2>
          <Button variant="primary" onClick={backToMenu}>
            Voltar ao menu
          </Button>
        </div>
      )}

      {(multiplayer.phase === 'playing' || multiplayer.phase === 'finished') && (
        <>
          <StatusBar
            leftName={multiplayer.myName}
            leftSymbol={multiplayer.mySymbol}
            rightName={multiplayer.opponentName}
            rightSymbol={multiplayer.opponentSymbol}
            currentTurn={multiplayer.currentTurn}
            isOver={multiplayer.phase === 'finished'}
          />
          <div className="relative flex w-full flex-1 items-center justify-center">
            <Board
              board={multiplayer.board}
              onCellClick={multiplayer.handleCellClick}
              disabled={multiplayer.phase !== 'playing' || multiplayer.currentTurn !== multiplayer.mySymbol}
              winningLine={multiplayer.winningLine}
            />
            {multiplayer.phase === 'finished' && (
              <div className="absolute inset-0 flex items-center justify-center p-2">
                <GameOverPanel
                  winner={multiplayer.winner}
                  isDraw={multiplayer.isDraw}
                  winnerName={
                    multiplayer.winner === multiplayer.mySymbol ? 'Você' : multiplayer.opponentName
                  }
                  onPlayAgain={multiplayer.playAgain}
                  onLeaveRoom={backToMenu}
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default function Game() {
  return (
    <Suspense fallback={null}>
      <GameInner />
    </Suspense>
  )
}
