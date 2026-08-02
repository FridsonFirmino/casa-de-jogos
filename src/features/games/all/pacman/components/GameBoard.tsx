"use client";

interface GameBoardProps {
  canvasRef: (node: HTMLCanvasElement | null) => void;
}

export default function GameBoard({ canvasRef }: GameBoardProps) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        className="relative w-full"
        style={{ maxWidth: "100%", maxHeight: "100%", aspectRatio: "20 / 15" }}
      >
        <canvas ref={canvasRef} className="h-full w-full rounded-lg" />
      </div>
    </div>
  );
}
