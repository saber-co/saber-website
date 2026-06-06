# Saber

Marketing landing page for Saber — an OpenClaw implementation partner that deploys AI operators (calls, chat, workflows, browser actions, approvals) in a customer's own infrastructure. Ported from a Vercel/Next.js project to the Replit pnpm-workspace stack.

## Run & Operate

- App runs via Replit **workflows**, not root-level `pnpm dev`:
  - `artifacts/landing: web` — the Vite + React landing site
  - `artifacts/api-server: API Server` — Express API (serves `/api`)
- `pnpm --filter @workspace/landing run typecheck` — typecheck the landing app
- `pnpm --filter @workspace/api-server run typecheck` — typecheck the API server
- `pnpm --filter @workspace/api-spec run codegen` — regenerate Zod schemas + React Query hooks from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string (provisioned)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: Vite 7 + React 19, Tailwind CSS v4 (`@tailwindcss/vite`), shadcn/ui, GSAP (ScrollTrigger), wouter
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod, `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)

## Where things live

- `artifacts/landing/` — landing site. Page is assembled in `src/App.tsx` (Hero → Stats → TweetsMarquee → FeatureBubbles → Contact). Global styles + theme tokens + animations in `src/index.css`. Fonts loaded via Google Fonts `<link>` in `index.html`.
- `artifacts/api-server/src/routes/` — Express routes. `demoRequests.ts` handles the contact-form submission.
- `lib/api-spec/openapi.yaml` — source of truth for API contracts.
- `lib/api-zod/` — generated Zod schemas (do not edit `generated/`).
- `lib/db/src/schema/` — Drizzle tables (source of truth for DB schema).
- `.migration-backup/` — the original imported Vercel project (landing = Next.js source, chat-ui = separate, out of scope).

## Architecture decisions

- Ported **only** the landing page from the original Next.js repo. `chat-ui/` was excluded — it depends on an external tenant backend and can't run standalone.
- The contact form originally POSTed to Supabase; it was reimplemented against Replit's built-in Postgres (`demo_requests` table) so it works without external secrets.
- Next.js patterns were converted: `next/link` → `<a>`, `next/font/google` → Google Fonts `<link>` + CSS `--font-*` vars, `app/api/*` route → Express route, `@vercel/analytics` removed.
- Always-dark theme: dark color tokens live directly in `:root` (no `.dark` toggle needed).

## Product

A single-page marketing site: animated hero, stats, tweet marquee, capability bento grid, and a contact/demo-request form that persists submissions to Postgres.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Frontend fetches `/api/demo-requests`; the Replit proxy routes `/api` to the api-server. Keep API calls under `/api`.
- After changing `lib/db/src/schema/` or `lib/api-spec/openapi.yaml`, run the codegen / push commands and `pnpm run typecheck:libs` so the built lib types stay in sync.
- The original v0 export shipped several `public/` images as base64 **text**; they were decoded to real binaries. New binary assets from such exports need `base64 -d`.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
