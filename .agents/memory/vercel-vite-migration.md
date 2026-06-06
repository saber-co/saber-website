---
name: Vercel/Next.js → Vite migration (Saber)
description: Non-obvious decisions and gotchas from porting the imported Saber landing page into the pnpm-workspace stack.
---

# Saber landing port

- Source lives in `.migration-backup/`. Only `landing/` (Next.js) was ported; `chat-ui/` was excluded because it needs an external tenant backend and can't run standalone.
- **Why Postgres instead of Supabase:** the original contact form POSTed to Supabase REST. Reimplemented against Replit's built-in Postgres (`demo_requests` table + Express route) so the form works with no external secrets and integrates with Replit rollback/publish.

## Conversion gotchas
- v0 exports ship some `public/` images as **base64 text** (file reports "ASCII text"). Must `base64 -d` them to real binaries. capabilities/*.svg + favicon were already real.
- `next/font/google` → Google Fonts `<link>` in index.html + define `--font-space-grotesk/--font-public-sans/--font-geist-mono` in `:root` (globals.css `@theme inline` references those vars).
- Always-dark theme: dark tokens are in `:root` directly, no `.dark` class toggle.
- `"use client"` directives and `next-themes` imports are harmless in Vite (no-op string / installed dep) — don't need removal.

## Build/install gotchas
- `lib/*` package devDeps (orval, drizzle-kit) may not be installed after scaffold — run `pnpm install` at root before codegen/push.
- `pnpm add` can leave a broken symlink without fetching (lockfile/store empty) — verify the dep lands in `pnpm-lock.yaml` and `node_modules/.pnpm/`. Pinning an exact existing version fixed it (gsap floating range resolved to a nonexistent version).
- After editing `lib/db` schema, run `pnpm run typecheck:libs` (tsc --build) so api-server sees the rebuilt declaration types, else `db.insert` etc. appear missing.
