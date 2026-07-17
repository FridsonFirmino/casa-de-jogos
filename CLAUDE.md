# Casa de Jogos — Architecture & Development Guide

This document defines the architecture, conventions, and standards for the Casa de Jogos project. Every contribution must follow these rules.

---

## Stack (Mandatory)

- **Next.js 16** (App Router)
- **React**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **Lucide Icons**
- **Framer Motion** (only where it makes sense)

Do not add unnecessary libraries.

---

## Folder Structure (Feature-Based)

```
src/
├── app/
├── components/
│   ├── ui/        # shadcn/ui components
│   ├── layout/    # Navbar, Footer, Sidebar, etc.
│   └── shared/    # Reusable app-specific components
├── features/
│   ├── home/
│   ├── games/
│   ├── categories/
│   └── search/
├── hooks/
├── lib/
├── services/
├── types/
├── constants/
├── utils/
├── assets/
└── styles/
```

### Per-Feature Structure

Each feature may contain:

```
feature/
├── components/
├── hooks/
├── types/
├── constants/
├── utils/
├── services/
└── index.ts
```

---

## Componentization

- **Small components** — one responsibility per component.
- Avoid giant components. Break them down.
- Examples: `GameCard`, `GameGrid`, `CategoryCard`, `HeroSection`, `Navbar`, `Footer`, `SearchBar`, `FeaturedGames`, `StatsSection`, `CTASection`, `SectionTitle`, `Button`, `Container`, `Badge`, `GameThumbnail`, `GameInfo`, `GameDifficulty`, `GameTime`.

---

## Reusability

- No duplication. If a component is used twice, make it reusable.
- Shared components go in `components/ui/` or `components/shared/`.
- Never duplicate buttons, cards, or inputs.

---

## Imports

- Use absolute imports with `@/` prefix:
  - `@/components`
  - `@/features`
  - `@/lib`
  - `@/hooks`
- Avoid long relative paths.

---

## Server vs Client Components

- **Prefer Server Components** by default.
- Only add `"use client"` when necessary:
  - `useState` / `useEffect`
  - Event handlers
  - Animations
  - Canvas
  - Browser-only interactions
- Do not turn the whole app into a Client Component.

---

## Performance

- Lazy load when it makes sense.
- Use dynamic imports for heavy components.
- Do not load unnecessary code.
- Avoid unnecessary re-renders.

---

## State Management

- Use **React State** and **Context API** (when needed).
- **No Redux, Zustand, or similar** for now.

---

## Typing

- **Never use `any`**.
- Create specific, well-defined interfaces and types.
- Prefer `interface` over `type` where applicable.

---

## Code Quality

- Clean, self-explanatory code.
- Small functions with clear names.
- Single responsibility per function/component.
- Avoid unnecessary comments — code should speak for itself.

**Principles to follow:**

- SOLID (where applicable)
- DRY
- KISS
- Clean Code
- Composition over Inheritance
- Single Responsibility

---

## Constants

- No magic strings scattered around.
- Create constant files:
  - `constants/navigation.ts`
  - `constants/categories.ts`
  - `constants/games.ts`
  - `constants/routes.ts`

---

## Utilities

- Reusable utility functions go in `utils/`.
- Never duplicate utility functions.

---

## Hooks

- Custom hooks go in `hooks/` or `features/**/hooks`.
- Always prefix with `use` (e.g., `useSearch`, `useGames`, `useCategories`, `useLocalStorage`).

---

## Styles

- **Tailwind only**.
- Do not create unnecessary CSS files.
- Avoid inline styles.
- Use reusable classes when appropriate.

---

## Responsiveness

- **Mobile First**.
- Ensure flawless behavior on mobile, tablet, and desktop.

---

## Accessibility

- Semantic HTML.
- Correct `<button>` elements.
- Labels on inputs.
- `alt` attributes on images.
- ARIA attributes where needed.
- Good keyboard navigation.

---

## SEO

Use Next.js Metadata API:

- `title`
- `description`
- `keywords`
- Open Graph
- Twitter Card
- Favicons
- Manifest
- `robots.txt`
- Sitemap

---

## Visual Quality

- Consistent spacing, grid, and padding.
- Consistent typography.
- Smooth animations (avoid overdoing effects).

---

## Game Organization

Each game is an **independent feature**:

```
features/
└── games/
    ├── snake/
    ├── pong/
    ├── memory/
    └── tictactoe/
```

- Each game has its own internal structure.
- No game depends directly on another.

---

## Scalability

The architecture must support **50+, 100+, 200+ games** without major refactoring.

Adding a new game requires only:

1. Create a new feature folder.
2. Register the game in the catalog.
3. Add its route.

**Nothing else.**

---

## Final Goal

A codebase that feels built by an experienced team — focused on scalability, organization, maintainability, and great developer experience (DX).

The Casa de Jogos must grow continuously, where adding a new game is simple, predictable, and consistent — without impacting existing games or requiring structural changes.
