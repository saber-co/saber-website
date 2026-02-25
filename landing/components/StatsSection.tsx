"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const stats = [
  {
    value: 87,
    suffix: "%",
    decimals: 0,
    label: "of leads lost due to response times over 5 minutes",
    source: "Harvard Business Review",
  },
  {
    value: 4.5,
    suffix: " hrs",
    decimals: 1,
    label: "per week wasted on tasks employees say should be automated",
    source: "Automation Anywhere",
  },
  {
    value: 100,
    suffix: "%",
    decimals: 0,
    label: "OpenClaw deployed in your own environment and controls",
    source: "Saber Implementation Standard",
  },
]

export function StatsSection() {
  const [animateDigits, setAnimateDigits] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry.isIntersecting || hasAnimated.current) return
        hasAnimated.current = true
        setAnimateDigits(true)
      },
      { threshold: 0.4 },
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current,
        { y: 80, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            end: "top 35%",
            scrub: 0.7,
          },
          y: 0,
          opacity: 1,
          ease: "none",
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const renderOdometer = (stat: (typeof stats)[number]) => {
    const formatted = stat.value.toFixed(stat.decimals)
    const chars = formatted.split("")

    return (
      <span className="telemetry-value">
        {chars.map((char, i) => {
          if (char === ".") {
            return (
              <span key={`${stat.label}-dot-${i}`} className="inline-block w-[0.4em] text-center">
                .
              </span>
            )
          }
          return (
            <span
              key={`${stat.label}-digit-${i}`}
              className="odometer-digit"
              data-digit={char}
              style={{ ["--digit" as string]: Number(char) }}
            >
              <span
                className={`odometer-stack ${animateDigits ? "" : "translate-y-0"}`}
                style={{ animationPlayState: animateDigits ? "running" : "paused" }}
              >
                {Array.from({ length: 10 }).map((_, index) => (
                  <span key={index}>{index}</span>
                ))}
              </span>
            </span>
          )
        })}
        {stat.suffix ? <span>{stat.suffix}</span> : null}
      </span>
    )
  }

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="parallax-section relative px-6 pt-16 pb-36 md:px-12 lg:px-20"
      style={{
        background:
          "radial-gradient(900px 700px at 0% 50%, rgba(220,38,38,0.18), transparent 55%), radial-gradient(700px 600px at 100% 50%, rgba(255,255,255,0.025), transparent 55%), linear-gradient(180deg, rgba(5,5,5,1) 0%, rgba(8,6,6,1) 100%)",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-white/50">
          The problem
        </p>
        <h2 className="mb-12 max-w-2xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Your team is losing deals while doing busywork.
        </h2>
        <div ref={gridRef} className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="stat-card group border border-white/70 bg-[#0a0a0a] px-6 py-6 font-mono transition-none hover:bg-white hover:text-black hover:shadow-[4px_4px_0_#ffffff]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="text-4xl md:text-5xl font-semibold">
                  {renderOdometer(stat)}
                </div>
                <div className="sparkline" aria-hidden="true" />
              </div>
              <p className="mt-3 text-xs uppercase tracking-[0.14em] text-white/70 group-hover:text-black/70">
                {stat.label}
              </p>
              <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-white/35 group-hover:text-black/50">
                Source: {stat.source}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
