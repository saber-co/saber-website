# saber-website

Repo layout:

- `landing/` → landing page frontend (Next.js)
- `chat-ui/` → chat UI frontend (Vite/React)

Current production routing (via `vercel.json` at repo root):

- `/` serves current site deployment
- `/dashboard/*` proxies to backend magic-link/chat flow
- `/t/*` proxies to backend tenant chat routes
- `/assets/*` proxies backend-served chat assets
