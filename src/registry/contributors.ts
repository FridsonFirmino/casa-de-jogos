import { registry } from "./games";

export interface Contributor {
  username: string
  name: string
  avatarUrl: string
  bio: string | null
  games: string[]
}

export function getUniqueUsernames(): string[] {
  const usernames = new Set<string>()
  for (const entry of registry) {
    if (entry.config.githubUsername) {
      usernames.add(entry.config.githubUsername)
    }
  }
  return Array.from(usernames)
}

export function getContributorsFromGames(): Contributor[] {
  const map = new Map<string, Contributor>()

  for (const entry of registry) {
    const username = entry.config.githubUsername
    if (!username) continue

    if (!map.has(username)) {
      map.set(username, {
        username,
        name: entry.config.urlPhoto ? username : username,
        avatarUrl:
          entry.config.urlPhoto ||
          `https://avatars.githubusercontent.com/${username}?s=200`,
        bio: null,
        games: [],
      })
    }

    map.get(username)!.games.push(entry.config.title)
  }

  return Array.from(map.values())
}

export async function fetchContributorProfile(
  username: string,
): Promise<{ name: string; avatarUrl: string; bio: string | null }> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      return {
        name: username,
        avatarUrl: `https://avatars.githubusercontent.com/${username}?s=200`,
        bio: null,
      }
    }

    const data = await res.json()
    return {
      name: data.name || data.login,
      avatarUrl: data.avatar_url,
      bio: data.bio,
    }
  } catch {
    return {
      name: username,
      avatarUrl: `https://avatars.githubusercontent.com/${username}?s=200`,
      bio: null,
    }
  }
}

export async function getContributorsWithProfiles(): Promise<Contributor[]> {
  const usernames = getUniqueUsernames()
  const profiles = await Promise.all(
    usernames.map(async (username) => {
      const profile = await fetchContributorProfile(username)
      const games = registry
        .filter((g) => g.config.githubUsername === username)
        .map((g) => g.config.title)

      return {
        username,
        name: profile.name,
        avatarUrl: profile.avatarUrl,
        bio: profile.bio,
        games,
      }
    }),
  )

  return profiles
}