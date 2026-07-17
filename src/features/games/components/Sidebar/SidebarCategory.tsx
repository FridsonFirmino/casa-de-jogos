interface SidebarCategoryProps {
  icon: string
  name: string
  count: number
  active: boolean
  onClick: () => void
}

export function SidebarCategory({ icon, name, count, active, onClick }: SidebarCategoryProps) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-all ${
        active
          ? 'bg-violet-500/10 text-violet-400 font-medium'
          : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800/50'
      }`}
    >
      <span className="flex items-center gap-2.5">
        <span>{icon}</span>
        <span>{name}</span>
      </span>
      <span className={`text-xs ${active ? 'text-violet-400' : 'text-zinc-600'}`}>
        {count}
      </span>
    </button>
  )
}
