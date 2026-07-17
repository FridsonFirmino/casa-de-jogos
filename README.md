# Casa de Jogos

A modern, scalable games hub built with Next.js 16. Play classic browser games instantly — no downloads, no sign-ups.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4)
![License](https://img.shields.io/badge/license-MIT-green)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | [TypeScript 5](https://www.typescriptlang.org) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| Icons | [Lucide React](https://lucide.dev) |
| UI Primitives | Custom components |
| Package Manager | [pnpm](https://pnpm.io) |

---

## Architecture

Feature-Based Architecture organized for scalability. Each game lives as an independent feature — adding a new game requires zero changes to the core structure.

```
src/
├── app/                    # Next.js App Router pages
├── registry/               # Central game registry (single source of truth)
│   ├── games.ts            #   - Game catalog import & export
│   └── categories.ts       #   - Auto-generated categories from registry
├── game-template/          # Template for creating new games
├── components/
│   ├── ui/                 # Shared primitives (Button, Container, Badge...)
│   ├── layout/             # Navbar, Footer
│   └── shared/             # App-level shared components
├── features/               # Feature modules
│   ├── home/               # Homepage sections
│   ├── games/              # Game catalog, filters, game cards
│   │   ├── components/     #   - Shared game UI components
│   │   ├── hooks/          #   - Game-related hooks
│   │   └── all/            #   - All individual games
│   │       ├── snake/      #   - Individual game module
│   │       ├── pong/       #   - Individual game module
│   │       ├── memory/     #   - Individual game module
│   │       └── ...         #   - Each game is self-contained
│   └── categories/         # Category browsing
├── hooks/                  # Shared custom hooks
├── constants/              # Constants (routes, navigation...)
├── types/                  # TypeScript interfaces
├── utils/                  # Utility functions
├── lib/                    # Library configurations
├── services/               # API services
├── assets/                 # Static assets
└── styles/                 # Global styles
```

### Per-Game Structure

Every game follows an identical structure for consistency:

```
features/games/all/<game-name>/
├── assets/          # Game-specific images, sounds
├── components/      # Game-specific components
├── constants/       # Game-specific constants
├── engine/          # Game logic/engine
├── hooks/           # Game-specific hooks
├── utils/           # Game-specific utilities
├── Game.tsx         # Main game component (default export)
├── config.ts        # All metadata lives here
└── index.ts         # Public API (exports config + component)
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) >= 20
- [pnpm](https://pnpm.io/installation) >= 9

### Install

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
pnpm build
```

### Lint

```bash
pnpm lint
```

### Type Check

```bash
npx tsc --noEmit
```

---

## Adding a New Game

Adding a new game requires **zero structural changes**. The entire app consumes the game registry — no component, page, or hook needs editing.

### Step-by-step

#### 1. Copy the template

```bash
cp -r src/game-template src/features/games/all/my-game
```

#### 2. Configure metadata

Edit `src/features/games/all/my-game/config.ts`:

```ts
export const config: GameConfig = {
  id: 'my-game',
  slug: 'my-game',
  title: 'My Game',
  description: 'A fun new game description.',
  shortDescription: 'A fun new game.',
  thumbnail: 'https://picsum.photos/id/42/400/300',
  cover: 'https://picsum.photos/id/42/800/600',
  categoryId: 'arcade',
  category: 'Arcade',
  difficulty: 'Medium',
  players: '1',
  averagePlayTime: '10 min',
  averagePlayTimeMinutes: 10,
  tags: ['Arcade', 'Novo'],
  featured: true,
  popular: true,
  isNew: true,
  status: 'published',
  version: '1.0.0',
  rating: 4.5,
  gradient: 'from-indigo-500 to-violet-600',
  releaseDate: '2025-01-01',
}
```

#### 3. Implement the game

Build your game logic and UI in `Game.tsx`.

#### 4. Register in the registry

Add one line to `src/registry/games.ts`:

```ts
import { config as myGame } from '@/features/games/all/my-game/config'

const gamesList: GameRegistryEntry[] = [
  // ... existing games
  { config: myGame },
]
```

**That's it.** The game automatically appears in:
- The catalog grid with search, filter, and sort
- Sidebar category counts
- Featured/popular/new sections (based on config flags)
- Its own page at `/games/my-game` (dynamic route)

Categories are auto-generated from the registry — no manual category updates needed.

---

## Project Guidelines

### Code Quality

- **No `any`** — every value must have a specific type.
- Small functions with a single responsibility.
- Self-explanatory code over comments.
- Follow **SOLID**, **DRY**, **KISS**, and **Clean Code** principles.
- Composition over inheritance.

### Components

- One component = one responsibility.
- Reusable components live in `components/ui/` or `components/shared/`.
- Never duplicate code — if it's used twice, extract it.

### Server Components

- Prefer Server Components by default.
- Only add `"use client"` when using `useState`, `useEffect`, events, animations, canvas, or browser APIs.

### Styling

- Tailwind CSS only — no CSS modules or inline styles.
- Mobile-first responsive design.
- Consistent spacing, grid, and typography.

### Imports

- Always use absolute imports with `@/` prefix (e.g., `@/components/ui/Button`).
- No long relative paths.

### State

- React state + Context API only.
- No Redux, Zustand, or external state libraries.

---

## Project Structure Overview

| Directory | Purpose |
|---|---|
| `src/app/` | Pages and routes |
| `src/registry/` | Central game registry (single source of truth) |
| `src/game-template/` | Template for scaffolding new games |
| `src/components/ui/` | Reusable UI primitives |
| `src/components/layout/` | Navbar, Footer |
| `src/features/home/` | Homepage sections |
| `src/features/games/` | Game catalog + individual game modules |
| `src/constants/` | Application constants |
| `src/types/` | TypeScript interfaces (GameConfig, etc.) |
| `src/hooks/` | Custom React hooks |

## Key Principles

- **Registry as single source of truth** — all game metadata comes from `registry/games.ts`
- **Auto-generated categories** — derived from the registry, never written manually
- **Zero structural changes** to add a game — no components, pages, or hooks need editing
- **Isolated game modules** — each game in its own folder with `config.ts` + `Game.tsx`
- **Dynamic routing** — `/games/[slug]` loads the correct game automatically
- **Home doesn't know individual games** — it only consumes the registry

---

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/my-feature`).
3. Make your changes following the project conventions above.
4. Run lint and type check:

```bash
pnpm lint
npx tsc --noEmit
```

5. Ensure the build passes:

```bash
pnpm build
```

6. Commit with a clear, descriptive message.
7. Push to your branch and open a Pull Request.

---

## License

This project is licensed under the MIT License.
