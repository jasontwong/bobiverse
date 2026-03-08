# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server**: `pnpm dev`
- **Build**: `pnpm build`
- **Start production**: `pnpm start`

No separate lint or test commands are configured yet.

## Architecture

This is the **Bobiverse Interactive Timeline Website** — a server-side rendered React application displaying an interactive chronological timeline of events from Dennis E. Taylor's Bobiverse sci-fi book series.

### Tech Stack

- **Framework**: TanStack Start (`@tanstack/react-start`) for SSR, using Vite + Nitro
- **Routing**: TanStack Router with file-based routing (`app/routes/`)
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite` plugin
- **Language**: TypeScript (strict mode, Bundler module resolution)
- **Deployment**: Vercel (via Nitro vercel preset in `vite.config.ts`)
- **Package Manager**: pnpm (requires Node.js 22+)

### Key Design Decisions

- **File-based routing**: Routes live in `app/routes/`. The route tree is auto-generated to `app/routeTree.gen.ts` (gitignored).
- **Data layer**: Static TypeScript data files in `app/data/` — `books.ts` defines the 6 books with colors, `events.ts` defines 20 timeline events referencing books by ID.
- **Client-side interactivity**: Book filter (toggle which books' events appear) and event card expansion are managed with React `useState` in the index route.
- **No manual entry points**: `@tanstack/react-start` handles client/SSR entry automatically via the Vite plugin.

### Directory Structure

```
app/
  router.tsx          # TanStack Router setup (getRouter function)
  routes/
    __root.tsx        # Root layout (HTML shell, meta tags, CSS link via shellComponent)
    index.tsx         # Home page with filter + timeline
  components/
    BookFilter.tsx    # Book toggle buttons
    EventCard.tsx     # Expandable event card
    Timeline.tsx      # Vertical timeline with year markers
  data/
    books.ts          # Book definitions (id, title, year, color)
    events.ts         # Timeline events (20 events across 6 books)
  styles/
    app.css           # Tailwind v4 import + global resets
vite.config.ts        # Vite config with TanStack Start, Tailwind, Nitro plugins
tsconfig.json         # TypeScript config with ~/ path alias for app/
```
