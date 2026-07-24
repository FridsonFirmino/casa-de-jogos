import Image from "next/image";
import Link from "next/link";

interface ContributorAvatarProps {
  username: string
  name: string
  avatarUrl: string
  size?: number
}

export function ContributorAvatar({
  username,
  name,
  avatarUrl,
  size = 112,
}: ContributorAvatarProps) {
  return (
    <Link
      href={`https://github.com/${username}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex"
    >
      <div
        className="relative overflow-hidden rounded-full border-2 border-zinc-700 transition-all duration-300 group-hover:scale-110 group-hover:border-highlight group-hover:shadow-xl group-hover:shadow-highlight/20"
        style={{ width: size, height: size }}
      >
        <Image
          src={avatarUrl}
          alt={name}
          fill
          className="object-cover"
          sizes={`${size}px`}
        />
      </div>

      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 translate-y-full whitespace-nowrap rounded-lg border border-zinc-700/50 bg-zinc-900/90 px-3 py-1.5 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-0 group-hover:opacity-100">
        <p className="text-sm font-semibold text-zinc-100">{name}</p>
        <p className="text-xs text-zinc-500">@{username}</p>
      </div>
    </Link>
  );
}
