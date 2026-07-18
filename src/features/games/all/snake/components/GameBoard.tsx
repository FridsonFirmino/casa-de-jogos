"use client";

interface GameBoardProps {
  canvasRef: (node: HTMLCanvasElement | null) => void;
}

export default function GameBoard({ canvasRef }: GameBoardProps) {
  return (
    <div className="container flex h-full w-full items-center justify-center">
      <div
        className=""
        style={{
          width: "30%",
          height: "100%",
          maxWidth: "100%",
          maxHeight: "100%",
          aspectRatio: "1 / 1",
        }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full rounded-lg"
        />
      </div>
    </div>
  );
}
