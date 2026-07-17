# Game Template

This is the base template for creating new games.

## How to use

1. Copy this folder: `cp -r src/game-template src/features/games/my-game`
2. Edit `config.ts` with the game's metadata.
3. Implement the game in `Game.tsx`.
4. Register in `src/registry/games.ts`.

## Structure

- `config.ts` — All metadata (id, title, description, category, etc.)
- `Game.tsx` — Main game component (default export)
- `index.ts` — Re-exports config and component
- `components/` — Game-specific components
- `constants/` — Game-specific constants
- `engine/` — Game logic
- `hooks/` — Game-specific hooks
- `utils/` — Game-specific utilities
- `assets/` — Images, sounds, etc.
