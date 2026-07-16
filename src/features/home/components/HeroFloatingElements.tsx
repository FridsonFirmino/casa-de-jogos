export function HeroFloatingElements() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-lg">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-64 w-64 rounded-full bg-gradient-to-br from-violet-500/20 to-blue-500/20 blur-3xl animate-pulse" />
      </div>

      <div className="relative grid h-full w-full grid-cols-3 grid-rows-3 gap-4">
        <div className="animate-float-slow col-start-2 row-start-1 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-700/50 bg-zinc-800/50 backdrop-blur-sm shadow-lg">
            <GamepadIcon />
          </div>
        </div>

        <div className="animate-float col-start-1 row-start-2 flex items-center justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-zinc-700/50 bg-zinc-800/50 backdrop-blur-sm shadow-lg">
            <JoystickIcon />
          </div>
        </div>

        <div className="animate-float-slow col-start-3 row-start-2 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 backdrop-blur-sm shadow-lg shadow-violet-500/10">
            <PuzzleIcon />
          </div>
        </div>

        <div className="animate-float col-start-1 row-start-3 flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 backdrop-blur-sm shadow-lg shadow-cyan-500/10">
            <PixelIcon />
          </div>
        </div>

        <div className="animate-float-slow col-start-3 row-start-3 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 backdrop-blur-sm shadow-lg shadow-emerald-500/10">
            <TrophyIcon />
          </div>
        </div>

        <div className="animate-float col-start-2 row-start-2 flex items-center justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-zinc-700/50 bg-zinc-800/50 backdrop-blur-sm shadow-lg">
            <ControllerIcon />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
    </div>
  )
}

function GamepadIcon() {
  return (
    <svg className="h-8 w-8 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.75L12 18l8.25-8.25" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function JoystickIcon() {
  return (
    <svg className="h-10 w-10 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
    </svg>
  )
}

function PuzzleIcon() {
  return (
    <svg className="h-6 w-6 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  )
}

function PixelIcon() {
  return (
    <svg className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h5v5H4V4zM15 4h5v5h-5V4zM4 15h5v5H4v-5zM15 15h5v5h-5v-5z" />
    </svg>
  )
}

function TrophyIcon() {
  return (
    <svg className="h-7 w-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
    </svg>
  )
}

function ControllerIcon() {
  return (
    <svg className="h-12 w-12 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h12M12 6v12" />
    </svg>
  )
}
