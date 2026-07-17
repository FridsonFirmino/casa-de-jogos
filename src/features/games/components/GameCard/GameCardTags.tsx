interface GameCardTagsProps {
  tags: string[]
}

export function GameCardTags({ tags }: GameCardTagsProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-md bg-zinc-800/80 px-2 py-0.5 text-[11px] font-medium text-zinc-400"
        >
          {tag}
        </span>
      ))}
    </div>
  )
}
