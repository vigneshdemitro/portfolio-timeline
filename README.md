# portfolio-timeline

A chronological career timeline built with **Vite + React + TypeScript + Tailwind CSS v4**. Timeline data is fetched from a separate [portfolio-data](https://github.com/vigneshdemitro/portfolio-data) repo at runtime, so updates to the data don't require a redeploy.

## Stack

- [Vite](https://vitejs.dev) — build tool
- [React 19](https://react.dev) — UI
- [TanStack Query](https://tanstack.com/query) — data fetching & caching
- [Tailwind CSS v4](https://tailwindcss.com) — styling
- [Lucide React](https://lucide.dev) — icons
- Deployed on [Cloudflare Pages](https://pages.cloudflare.com)

## Data

Timeline entries live in a separate repo as a JSON file:

```
https://github.com/vigneshdemitro/portfolio-data
```

The app fetches `timeline.json` at runtime — edit the data there and the page reflects it on next load, no redeploy needed.

## Getting Started

```bash
npm install
npm run dev        # http://localhost:5173
```

### Environment variables

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

| Variable | Description |
|---|---|
| `VITE_TIMELINE_DATA_URL` | URL to your `timeline.json` raw file (defaults to the public GitHub raw URL) |

## Build & Deploy

```bash
npm run build      # outputs to dist/
```

**Cloudflare Pages** — connect the repo and set:
- Build command: `npm run build`
- Build output directory: `dist`

Or deploy manually:

```bash
npx wrangler pages deploy dist
```

## Project Structure

```
src/
  App.tsx                  # main page (header, stats, filter, timeline, footer)
  components/
    TimelineItem.tsx        # individual card (work / education / milestone)
    TimelineFilter.tsx      # filter pill buttons
    ScrollReveal.tsx        # intersection observer scroll animation wrapper
    BackToTop.tsx           # floating back-to-top button
  lib/
    timeline-data.ts        # fetch helper
    utils.ts                # date formatting utilities
  types/
    index.ts                # TimelineEntry, TimelineMeta, TimelineData types
  index.css                 # global styles, animations, Tailwind import
```
