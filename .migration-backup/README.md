# saber-website

Repo layout:

- `landing/` → landing page code (Next.js)
- `chat-ui/` → chat UI code (Vite/React)

Root no longer contains duplicate landing source.

Production routing is controlled by root `vercel.json`:

- `/dashboard/*` → backend magic-link/chat flow
- `/t/*` → backend tenant chat routes
- `/assets/*` → backend-served chat assets

If deploying landing directly from this repo in Vercel, set **Root Directory** to `landing`.
