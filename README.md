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
├── components/
│   ├── ui/                 # Shared primitives (Button, Container, Badge...)
│   ├── layout/             # Navbar, Footer
│   └── shared/             # App-level shared components
├── features/               # Feature modules
│   ├── home/               # Homepage sections
│   ├── games/              # Game catalog, filters, game cards
│   ├── categories/         # Category browsing
│   └── search/             # Global search
├── hooks/                  # Shared custom hooks
├── constants/              # Constants (games, categories, routes...)
├── types/                  # TypeScript interfaces
├── utils/                  # Utility functions
├── lib/                    # Library configurations
├── services/               # API services
├── assets/                 # Static assets
└── styles/                 # Global styles
```

### Per-Feature Structure

```
feature/
├── components/     # Feature-specific components
├── hooks/          # Feature-specific hooks
├── types/          # Feature-specific types
├── constants/      # Feature-specific constants
├── utils/          # Feature-specific utilities
└── index.ts        # Public API
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

The architecture is designed so that adding a new game requires **zero structural changes**. Follow these three steps:

### 1. Create the game feature

```
src/features/games/<game-name>/
├── components/
├── hooks/
├── types/
├── constants/
└── index.ts
```

All game-specific logic, components, and state live inside this folder.

### 2. Register in the catalog

Add an entry to `src/constants/games.ts`:

```ts
{
  id: 'my-game',
  title: 'My Game',
  slug: 'my-game',
  description: 'A fun new game.',
  categoryId: 'arcade',
  difficulty: 'Medium',
  playTime: '10 min',
  playTimeMinutes: 10,
  gradient: 'from-indigo-500 to-violet-600',
  featured: true,
  rating: 4.5,
  players: '1',
  tags: ['Arcade', 'Novo'],
  new: true,
  popular: false,
  releaseDate: '2025-01-01',
  urlPhoto: 'https://picsum.photos/id/42/800/600',
}
```

### 3. Add its route

Create `src/app/games/<game-name>/page.tsx` using the App Router.

**That's it.** No changes to the sidebar, filters, search, homepage, or layout are needed. The new game appears automatically in the catalog.

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
| `src/components/ui/` | Reusable UI primitives |
| `src/components/layout/` | Navbar, Footer |
| `src/features/home/` | Homepage sections |
| `src/features/games/` | Game catalog, filters, cards |
| `src/constants/` | Application constants |
| `src/types/` | TypeScript interfaces |
| `src/hooks/` | Custom React hooks |

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
