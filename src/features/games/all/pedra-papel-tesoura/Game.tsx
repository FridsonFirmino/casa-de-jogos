"use client";

import { Button } from "@/components/ui/Button";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import ChoiceButton from "./components/ChoiceButton";
import CountdownTimer from "./components/CountdownTimer";
import GameBoard from "./components/GameBoard";
import GameOverPanel from "./components/GameOverPanel";
import ModeSelect from "./components/ModeSelect";
import NameEntryForm from "./components/NameEntryForm";
import ResultDisplay from "./components/ResultDisplay";
import RoundHistory from "./components/RoundHistory";
import ScoreBoard from "./components/ScoreBoard";
import WaitingRoom from "./components/WaitingRoom";
import { CHOICES, TOTAL_ROUNDS } from "./constants";
import { useMultiplayerGame } from "./hooks/useMultiplayerGame";
import type { GameMode } from "./types";

function GameInner() {
  const searchParams = useSearchParams();
  const roomCodeFromUrl = searchParams.get("room") ?? undefined;

  const [mode, setMode] = useState<GameMode>(
    roomCodeFromUrl ? "multiplayer" : "menu",
  );

  const multiplayer = useMultiplayerGame({ joinRoomCode: roomCodeFromUrl });

  function backToMenu() {
    multiplayer.leaveRoom();
    setMode("menu");
  }

  if (mode === "menu") {
    return (
      <ModeSelect
        onSelectSingle={() => setMode("single")}
        onSelectMultiplayer={() => setMode("multiplayer")}
      />
    );
  }

  if (mode === "single") {
    return (
      <div className="flex flex-1 flex-col items-center gap-6 py-6">
        <GameBoard />
      </div>
    );
  }

  const inviteLink =
    typeof window !== "undefined"
      ? `${window.location.origin}${window.location.pathname}?room=${multiplayer.roomCode}`
      : "";

  return (
    <div className="flex flex-1 flex-col items-center gap-6 py-6">
      {multiplayer.phase !== "name-entry" && (
        <Button
          variant="ghost"
          size="sm"
          onClick={backToMenu}
          className="self-start"
        >
          Sair da sala
        </Button>
      )}

      {multiplayer.phase === "name-entry" && (
        <NameEntryForm
          title={roomCodeFromUrl ? "Entrar na sala" : "Criar sala"}
          onSubmit={(name) =>
            roomCodeFromUrl
              ? multiplayer.joinRoom(name)
              : multiplayer.createRoom(name)
          }
        />
      )}

      {multiplayer.phase === "waiting-for-opponent" && (
        <WaitingRoom inviteLink={inviteLink} />
      )}

      {multiplayer.phase === "opponent-left" && (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-zinc-800/50 bg-zinc-900/50 p-10 text-center">
          <h2 className="font-display text-xl text-zinc-100">
            O oponente saiu da sala.
          </h2>
          <Button variant="primary" onClick={backToMenu}>
            Voltar ao menu
          </Button>
        </div>
      )}

      {(multiplayer.phase === "choosing" ||
        multiplayer.phase === "reveal" ||
        multiplayer.phase === "finished") && (
        <div className="flex flex-1 flex-col items-center gap-6 py-4">
          <ScoreBoard
            score={multiplayer.score}
            playerName={multiplayer.myName}
            opponentName={multiplayer.opponentName}
            currentRound={multiplayer.currentRound}
            totalRounds={TOTAL_ROUNDS}
          />

          <div className="flex flex-1 items-center justify-center">
            {multiplayer.phase === "reveal" &&
              multiplayer.myChoice &&
              multiplayer.opponentChoice &&
              multiplayer.lastResult && (
                <ResultDisplay
                  playerChoice={multiplayer.myChoice}
                  opponentChoice={multiplayer.opponentChoice}
                  result={multiplayer.lastResult}
                  playerName={multiplayer.myName}
                  opponentName={multiplayer.opponentName}
                />
              )}

            {multiplayer.phase === "choosing" && !multiplayer.myChoice && (
              <div className="flex flex-col items-center gap-6">
                <CountdownTimer duration={5} onComplete={() => {}} />
                <div className="flex gap-4">
                  {CHOICES.map((choice) => (
                    <ChoiceButton
                      key={choice}
                      choice={choice}
                      onClick={() => multiplayer.makeChoice(choice)}
                    />
                  ))}
                </div>
              </div>
            )}

            {multiplayer.phase === "choosing" && multiplayer.myChoice && (
              <div className="flex flex-col items-center gap-4">
                <span className="text-sm text-zinc-500">
                  Esperando o oponente...
                </span>
                <div className="flex gap-4">
                  {CHOICES.map((choice) => (
                    <ChoiceButton
                      key={choice}
                      choice={choice}
                      onClick={() => {}}
                      disabled
                      selected={choice === multiplayer.myChoice}
                    />
                  ))}
                </div>
              </div>
            )}

            {multiplayer.phase === "finished" && (
              <GameOverPanel
                score={multiplayer.score}
                playerName={multiplayer.myName}
                opponentName={multiplayer.opponentName}
                onPlayAgain={multiplayer.playAgain}
                onLeaveRoom={backToMenu}
              />
            )}
          </div>

          <RoundHistory history={multiplayer.history} />
        </div>
      )}
    </div>
  );
}

export default function Game() {
  return (
    <Suspense fallback={null}>
      <GameInner />
    </Suspense>
  );
}
