import { useEffect, useRef } from "react"

type Node = {
  id: string
  x: number
  y: number
  r: number
  label?: string
  kind: "hub" | "primary" | "leaf"
  phase: number
}

const NODES: Node[] = [
  { id: "hub", x: 0.5, y: 0.5, r: 30, label: "Saber", kind: "hub", phase: 0 },
  { id: "calls", x: 0.5, y: 0.13, r: 17, label: "Calls", kind: "primary", phase: 0.6 },
  { id: "chat", x: 0.86, y: 0.34, r: 17, label: "Live Chat", kind: "primary", phase: 1.2 },
  { id: "flows", x: 0.78, y: 0.84, r: 17, label: "Workflows", kind: "primary", phase: 1.9 },
  { id: "browser", x: 0.22, y: 0.84, r: 17, label: "Browser", kind: "primary", phase: 2.6 },
  { id: "approve", x: 0.14, y: 0.34, r: 17, label: "Approvals", kind: "primary", phase: 3.3 },
  { id: "l1", x: 0.64, y: 0.05, r: 5, kind: "leaf", phase: 0.2 },
  { id: "l2", x: 0.38, y: 0.04, r: 5, kind: "leaf", phase: 1.1 },
  { id: "l3", x: 0.97, y: 0.18, r: 5, kind: "leaf", phase: 2.0 },
  { id: "l4", x: 0.96, y: 0.52, r: 5, kind: "leaf", phase: 2.8 },
  { id: "l5", x: 0.9, y: 0.95, r: 5, kind: "leaf", phase: 0.9 },
  { id: "l6", x: 0.6, y: 0.97, r: 5, kind: "leaf", phase: 1.6 },
  { id: "l7", x: 0.36, y: 0.97, r: 5, kind: "leaf", phase: 3.0 },
  { id: "l8", x: 0.08, y: 0.92, r: 5, kind: "leaf", phase: 0.4 },
  { id: "l9", x: 0.03, y: 0.5, r: 5, kind: "leaf", phase: 2.3 },
  { id: "l10", x: 0.04, y: 0.16, r: 5, kind: "leaf", phase: 1.4 },
]

const EDGES: Array<[string, string]> = [
  ["hub", "calls"],
  ["hub", "chat"],
  ["hub", "flows"],
  ["hub", "browser"],
  ["hub", "approve"],
  ["calls", "chat"],
  ["chat", "flows"],
  ["flows", "browser"],
  ["browser", "approve"],
  ["approve", "calls"],
  ["calls", "l1"],
  ["calls", "l2"],
  ["chat", "l3"],
  ["chat", "l4"],
  ["flows", "l5"],
  ["flows", "l6"],
  ["browser", "l7"],
  ["browser", "l8"],
  ["approve", "l9"],
  ["approve", "l10"],
]

const nodeMap = new Map(NODES.map((n) => [n.id, n]))

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

    // Position helper with gentle bob
    const pos = (n: Node, time: number) => {
      const bob = reduceMotion ? 0 : Math.sin(time * 0.0008 + n.phase) * (n.kind === "leaf" ? 4 : 6)
      const sway = reduceMotion ? 0 : Math.cos(time * 0.0006 + n.phase) * (n.kind === "leaf" ? 3 : 4)
      return {
        x: n.x * width + sway,
        y: n.y * height + bob,
      }
    }

    // Pulses traveling along hub<->primary edges
    const pulseEdges = EDGES.filter(
      ([a, b]) => a === "hub" || b === "hub",
    )
    const pulses: Pulse[] = pulseEdges.map((edge, i) => ({
      edge,
      t: i / pulseEdges.length,
      speed: 0.0004 + Math.random() * 0.0003,
      dir: Math.random() > 0.5 ? 1 : -1,
    }))

    const red = "220, 38, 38"

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height)

      // Edges
      for (const [a, b] of EDGES) {
        const na = nodeMap.get(a)!
        const nb = nodeMap.get(b)!
        const pa = pos(na, time)
        const pb = pos(nb, time)
        const isHub = a === "hub" || b === "hub"
        ctx.beginPath()
        ctx.moveTo(pa.x, pa.y)
        ctx.lineTo(pb.x, pb.y)
        ctx.strokeStyle = isHub
          ? `rgba(${red}, 0.18)`
          : "rgba(9, 9, 11, 0.07)"
        ctx.lineWidth = isHub ? 1.4 : 1
        ctx.stroke()
      }

      // Pulses
      if (!reduceMotion) {
        for (const p of pulses) {
          p.t += p.speed * 16 * p.dir
          if (p.t > 1) p.t = 0
          if (p.t < 0) p.t = 1
          const na = nodeMap.get(p.edge[0])!
          const nb = nodeMap.get(p.edge[1])!
          const pa = pos(na, time)
          const pb = pos(nb, time)
          const x = pa.x + (pb.x - pa.x) * p.t
          const y = pa.y + (pb.y - pa.y) * p.t
          const glow = ctx.createRadialGradient(x, y, 0, x, y, 7)
          glow.addColorStop(0, `rgba(${red}, 0.9)`)
          glow.addColorStop(1, `rgba(${red}, 0)`)
          ctx.beginPath()
          ctx.fillStyle = glow
          ctx.arc(x, y, 7, 0, Math.PI * 2)
          ctx.fill()
          ctx.beginPath()
          ctx.fillStyle = `rgba(${red}, 1)`
          ctx.arc(x, y, 2.4, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Nodes
      for (const n of NODES) {
        const p = pos(n, time)
        const pulse = reduceMotion ? 0 : Math.sin(time * 0.002 + n.phase) * 0.5 + 0.5

        if (n.kind === "hub") {
          // halo
          const halo = ctx.createRadialGradient(p.x, p.y, n.r * 0.4, p.x, p.y, n.r * 2.4)
          halo.addColorStop(0, `rgba(${red}, 0.22)`)
          halo.addColorStop(1, `rgba(${red}, 0)`)
          ctx.beginPath()
          ctx.fillStyle = halo
          ctx.arc(p.x, p.y, n.r * 2.4, 0, Math.PI * 2)
          ctx.fill()

          ctx.beginPath()
          ctx.fillStyle = `rgb(${red})`
          ctx.arc(p.x, p.y, n.r, 0, Math.PI * 2)
          ctx.fill()
        } else if (n.kind === "primary") {
          // soft ring
          ctx.beginPath()
          ctx.fillStyle = `rgba(${red}, ${0.08 + pulse * 0.06})`
          ctx.arc(p.x, p.y, n.r + 6 + pulse * 3, 0, Math.PI * 2)
          ctx.fill()

          ctx.beginPath()
          ctx.fillStyle = "#ffffff"
          ctx.arc(p.x, p.y, n.r, 0, Math.PI * 2)
          ctx.fill()
          ctx.lineWidth = 1.5
          ctx.strokeStyle = `rgba(${red}, 0.55)`
          ctx.stroke()

          ctx.beginPath()
          ctx.fillStyle = `rgb(${red})`
          ctx.arc(p.x, p.y, n.r * 0.4, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.beginPath()
          ctx.fillStyle = "rgba(9, 9, 11, 0.22)"
          ctx.arc(p.x, p.y, n.r, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Labels (drawn last, on top)
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      for (const n of NODES) {
        if (!n.label) continue
        const p = pos(n, time)
        if (n.kind === "hub") {
          ctx.font = "600 14px 'Space Grotesk', system-ui, sans-serif"
          ctx.fillStyle = "#ffffff"
          ctx.fillText(n.label, p.x, p.y)
        } else {
          ctx.font = "500 11px 'Geist Mono', ui-monospace, monospace"
          ctx.fillStyle = "rgba(24, 24, 27, 0.7)"
          const ly = p.y > height * 0.55 ? p.y + n.r + 14 : p.y - n.r - 12
          ctx.fillText(n.label, p.x, ly)
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
    <div className="relative mx-auto aspect-[16/11] w-full max-w-[680px] sm:aspect-[16/9]">
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
    </div>
  )
}
