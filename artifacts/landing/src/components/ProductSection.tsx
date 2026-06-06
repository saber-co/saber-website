"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    title: "Autonomous Chat-Driven Workflows",
    description:
      "Deploy intelligent agents that interpret intent, orchestrate tasks, and close loops without manual intervention.",
  },
  {
    title: "Cross-Industry Integration",
    description:
      "Seamlessly plug into logistics, finance, healthcare, and retail systems through a single abstraction layer.",
  },
  {
    title: "Efficiency Engineering",
    description:
      "Reduce redundant processes by up to 80% with precision-tuned automation pipelines built for your stack.",
  },
]

export function ProductSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current) return

    const ctx = gsap.context(() => {
      // Heading scrubs in from below
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 95%",
            end: "top 55%",
            scrub: 0.8,
          },
          y: 0,
          opacity: 1,
          ease: "none",
        }
      )

      // Cards scrub in with staggered start positions
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            scrollTrigger: {
              trigger: card,
              start: `top ${95 - i * 3}%`,
              end: `top ${55 - i * 3}%`,
              scrub: 0.8,
            },
            y: 0,
            opacity: 1,
            ease: "none",
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="product"
      className="relative px-6 py-28 md:px-12 lg:px-20"
      style={{ background: "#050505" }}
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-mono uppercase tracking-widest text-[#2D5BFF] mb-3">
          Product
        </p>
        <h2
          ref={headingRef}
          className="text-balance text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-16"
        >
          The AI Agent Engine.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              ref={(el) => { cardsRef.current[i] = el }}
              className="group relative rounded-2xl p-[1px] overflow-hidden"
            >
              {/* Grainy gradient border */}
              <div
                className="absolute inset-0 rounded-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(45,91,255,0.4) 0%, rgba(255,255,255,0.06) 50%, rgba(45,91,255,0.2) 100%)",
                  filter: "url(#noise)",
                }}
              />

              {/* Card body */}
              <div className="relative rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/[0.08] p-8 h-full flex flex-col">
                <span className="text-xs font-mono text-white/30 mb-6">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-semibold text-white mb-3 leading-snug">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SVG noise filter for grainy borders */}
      <svg className="absolute w-0 h-0">
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
    </section>
  )
}
