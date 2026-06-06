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
    label: "AI agents deployed in your own environment and controls",
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
        { y: 60, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            end: "top 45%",
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
      className="page-rails relative px-6 pt-20 pb-24 md:px-12 lg:px-20"
    >
      <div className="relative z-10 mx-auto max-w-[1200px]">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.28em] text-[#dc2626]">
          The problem
        </p>
        <h2 className="mb-12 max-w-2xl font-display text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl">
          Your team is losing deals while doing busywork.
        </h2>
        <div ref={gridRef} className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="soft-card px-7 py-7"
            >
              <div className="font-display text-5xl font-semibold text-zinc-900 md:text-6xl">
                {renderOdometer(stat)}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-zinc-600">
                {stat.label}
              </p>
              <p className="mt-4 text-[10px] uppercase tracking-[0.18em] text-zinc-400">
                Source: {stat.source}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
