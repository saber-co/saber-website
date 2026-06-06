---
name: Saber landing — light theme + agent graph
description: The landing page is a clean light theme (not dark). Where the design system and the hero's animated network graph live.
---

# Saber landing visual system

- The page is **light** (white bg, dark text, red `#dc2626` accent). The old dark/red liquid-metal video hero and brutalist `mechanical`/`lego-grid` styles were removed.
- Design tokens live in `:root` in `src/index.css` (light values, no `.dark` toggle). Custom utility classes there: `.btn-primary` (dark pill), `.btn-accent` (red pill), `.btn-ghost` (outline pill), `.hl` (red highlight box behind a hero phrase), `.soft-card` (white rounded card w/ hover lift), `.page-rails` (subtle vertical guide lines, Browserbase-style), plus marquee/odometer keyframes.
- **Why this layout:** modeled on the Browserbase reference — top nav with wordmark + links + CTA, hero with highlighted phrase + two CTAs, a placeholder logo strip ("Companies building with Saber"), then the existing sections restyled.

## Animated agent graph (hero centerpiece)
- `src/components/AgentGraph.tsx` — self-contained `<canvas>` network: central "Saber" hub, 5 labeled operator nodes (Calls/Live Chat/Workflows/Browser/Approvals) + leaf nodes, with red pulses flowing along hub edges and gentle node bob.
- Node positions are **normalized 0–1** and scaled to the canvas; labels are drawn on canvas (DPR-scaled). Honors `prefers-reduced-motion` (renders one static frame, no rAF). Uses ResizeObserver.

## Gotchas
- Contact form is unchanged and still POSTs to `/api/demo-requests` (verified 201). Backend was explicitly out of scope.
- `.whitespace-nowrap` is on the `.hl` span so the highlighted phrase doesn't break mid-box.
