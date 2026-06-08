import { useEffect, useRef } from "react"

type Node = {
  id: string
  x: number
  y: number
  r: number
  label?: string
  index?: string
  kind: "hub" | "primary" | "leaf"
  phase: number
}

const NODES: Node[] = [
  { id: "hub", x: 0.5, y: 0.5, r: 30, label: "Agent", kind: "hub", phase: 0 },
  { id: "memory", x: 0.5, y: 0.12, r: 16, label: "Memory", index: "01", kind: "primary", phase: 0.6 },
  { id: "skills", x: 0.87, y: 0.32, r: 16, label: "Skills", index: "02", kind: "primary", phase: 1.2 },
  { id: "tools", x: 0.79, y: 0.82, r: 16, label: "Tools", index: "03", kind: "primary", phase: 1.9 },
  { id: "channels", x: 0.21, y: 0.82, r: 16, label: "Channels", index: "04", kind: "primary", phase: 2.6 },
  { id: "schedules", x: 0.13, y: 0.32, r: 16, label: "Schedules", index: "05", kind: "primary", phase: 3.3 },
  { id: "l1", x: 0.64, y: 0.04, r: 4, kind: "leaf", phase: 0.2 },
  { id: "l2", x: 0.37, y: 0.04, r: 4, kind: "leaf", phase: 1.1 },
  { id: "l3", x: 0.98, y: 0.16, r: 4, kind: "leaf", phase: 2.0 },
  { id: "l4", x: 0.97, y: 0.5, r: 4, kind: "leaf", phase: 2.8 },
  { id: "l5", x: 0.9, y: 0.95, r: 4, kind: "leaf", phase: 0.9 },
  { id: "l6", x: 0.6, y: 0.97, r: 4, kind: "leaf", phase: 1.6 },
  { id: "l7", x: 0.37, y: 0.97, r: 4, kind: "leaf", phase: 3.0 },
  { id: "l8", x: 0.09, y: 0.94, r: 4, kind: "leaf", phase: 0.4 },
  { id: "l9", x: 0.03, y: 0.5, r: 4, kind: "leaf", phase: 2.3 },
  { id: "l10", x: 0.03, y: 0.16, r: 4, kind: "leaf", phase: 1.4 },
]

const EDGES: Array<[string, string]> = [
  ["hub", "memory"],
  ["hub", "skills"],
  ["hub", "tools"],
  ["hub", "channels"],
  ["hub", "schedules"],
  ["memory", "skills"],
  ["skills", "tools"],
  ["tools", "channels"],
  ["channels", "schedules"],
  ["schedules", "memory"],
  ["memory", "l1"],
  ["memory", "l2"],
  ["skills", "l3"],
  ["skills", "l4"],
  ["tools", "l5"],
  ["tools", "l6"],
  ["channels", "l7"],
  ["channels", "l8"],
  ["schedules", "l9"],
  ["schedules", "l10"],
]

const nodeMap = new Map(NODES.map((n) => [n.id, n]))

const INK = "26, 22, 17"
const VERM = "255, 74, 35"

type Pulse = { edge: [string, string]; t: number; speed: number; dir: 1 | -1 }

export function AgentGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    const pad = 26

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const pos = (n: Node, time: number) => {
      const bob = reduceMotion ? 0 : Math.sin(time * 0.0007 + n.phase) * (n.kind === "leaf" ? 3 : 4)
      const sway = reduceMotion ? 0 : Math.cos(time * 0.0005 + n.phase) * (n.kind === "leaf" ? 2.5 : 3)
      const innerW = width - pad * 2
      const innerH = height - pad * 2
      return {
        x: pad + n.x * innerW + sway,
        y: pad + n.y * innerH + bob,
      }
    }

    const pulseEdges = EDGES.filter(([a, b]) => a === "hub" || b === "hub")
    const pulses: Pulse[] = pulseEdges.map((edge, i) => ({
      edge,
      t: i / pulseEdges.length,
      speed: 0.00045 + Math.random() * 0.0003,
      dir: Math.random() > 0.5 ? 1 : -1,
    }))

    const drawTicks = () => {
      ctx.strokeStyle = `rgba(${INK}, 0.45)`
      ctx.lineWidth = 1.25
      const s = 9
      const corners = [
        [pad, pad, 1, 1],
        [width - pad, pad, -1, 1],
        [pad, height - pad, 1, -1],
        [width - pad, height - pad, -1, -1],
      ]
      for (const [cx, cy, dx, dy] of corners) {
        ctx.beginPath()
        ctx.moveTo(cx, cy + dy * s)
        ctx.lineTo(cx, cy)
        ctx.lineTo(cx + dx * s, cy)
        ctx.stroke()
      }
    }

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height)

      drawTicks()

      // Edges
      for (const [a, b] of EDGES) {
        const pa = pos(nodeMap.get(a)!, time)
        const pb = pos(nodeMap.get(b)!, time)
        const isHub = a === "hub" || b === "hub"
        ctx.beginPath()
        ctx.moveTo(pa.x, pa.y)
        ctx.lineTo(pb.x, pb.y)
        if (isHub) {
          ctx.setLineDash([4, 4])
          ctx.strokeStyle = `rgba(${VERM}, 0.45)`
          ctx.lineWidth = 1.1
        } else {
          ctx.setLineDash([])
          ctx.strokeStyle = `rgba(${INK}, 0.2)`
          ctx.lineWidth = 1
        }
        ctx.stroke()
      }
      ctx.setLineDash([])

      // Pulses — small vermilion squares
      if (!reduceMotion) {
        for (const p of pulses) {
          p.t += p.speed * 16 * p.dir
          if (p.t > 1) p.t = 0
          if (p.t < 0) p.t = 1
          const pa = pos(nodeMap.get(p.edge[0])!, time)
          const pb = pos(nodeMap.get(p.edge[1])!, time)
          const x = pa.x + (pb.x - pa.x) * p.t
          const y = pa.y + (pb.y - pa.y) * p.t
          ctx.fillStyle = `rgb(${VERM})`
          ctx.fillRect(x - 2.5, y - 2.5, 5, 5)
        }
      }

      // Nodes
      for (const n of NODES) {
        const p = pos(n, time)
        if (n.kind === "hub") {
          ctx.beginPath()
          ctx.fillStyle = `rgb(${INK})`
          ctx.arc(p.x, p.y, n.r, 0, Math.PI * 2)
          ctx.fill()
          ctx.lineWidth = 1.5
          ctx.strokeStyle = `rgb(${INK})`
          ctx.beginPath()
          ctx.arc(p.x, p.y, n.r + 5, 0, Math.PI * 2)
          ctx.stroke()
        } else if (n.kind === "primary") {
          ctx.beginPath()
          ctx.fillStyle = "#fbf7ec"
          ctx.arc(p.x, p.y, n.r, 0, Math.PI * 2)
          ctx.fill()
          ctx.lineWidth = 1.5
          ctx.strokeStyle = `rgb(${INK})`
          ctx.stroke()
          ctx.beginPath()
          ctx.fillStyle = `rgb(${VERM})`
          ctx.arc(p.x, p.y, 3, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.beginPath()
          ctx.fillStyle = `rgba(${INK}, 0.35)`
          ctx.arc(p.x, p.y, n.r, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Labels
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      for (const n of NODES) {
        const p = pos(n, time)
        if (n.kind === "hub") {
          ctx.font = "600 15px 'Fraunces', Georgia, serif"
          ctx.fillStyle = "#f2ede1"
          ctx.fillText(n.label ?? "", p.x, p.y + 1)
        } else if (n.kind === "primary" && n.label) {
          const below = p.y > height * 0.52
          const ly = below ? p.y + n.r + 14 : p.y - n.r - 13
          ctx.font = "700 10px 'Space Mono', monospace"
          ctx.fillStyle = `rgba(${INK}, 0.85)`
          ctx.fillText(`${n.index}  ${n.label.toUpperCase()}`, p.x, ly)
        }
      }
    }

    let raf = 0
    const loop = (time: number) => {
      draw(time)
      raf = requestAnimationFrame(loop)
    }

    if (reduceMotion) {
      draw(0)
    } else {
      raf = requestAnimationFrame(loop)
    }

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return (
    <div className="relative mx-auto aspect-[5/6] w-full max-w-[480px] sm:aspect-square">
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
      <span className="pointer-events-none absolute bottom-1 left-1 font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40">
        Fig. 01 — Agent topology
      </span>
    </div>
  )
}
