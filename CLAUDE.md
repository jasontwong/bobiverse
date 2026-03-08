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

- **Framework**: TanStack Start (built on Vinxi/Nitro) for SSR
- **Routing**: TanStack Router with file-based routing (`app/routes/`)
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite` plugin
- **Language**: TypeScript (strict mode, Bundler module resolution)
- **Deployment**: Vercel (via Nitro vercel preset in `app.config.ts`)
- **Package Manager**: pnpm

### Key Design Decisions

- **File-based routing**: Routes live in `app/routes/`. The route tree is auto-generated to `app/routeTree.gen.ts` (gitignored).
- **Data layer**: Static TypeScript data files in `app/data/` — `books.ts` defines the 6 books with colors, `events.ts` defines 20 timeline events referencing books by ID.
- **Client-side interactivity**: Book filter (toggle which books' events appear) and event card expansion are managed with React `useState` in the index route.
- **SSR entry points**: `app/client.tsx` (hydration) and `app/ssr.tsx` (server handler).

### Directory Structure

```
app/
  client.tsx          # Client-side hydration entry
  ssr.tsx             # Server-side rendering entry
  router.tsx          # TanStack Router setup
  routes/
    __root.tsx        # Root layout (HTML shell, meta tags, CSS link)
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
app.config.ts         # Vinxi/TanStack Start config (Tailwind plugin, Vercel preset)
tsconfig.json         # TypeScript config with ~/ path alias for app/
```
