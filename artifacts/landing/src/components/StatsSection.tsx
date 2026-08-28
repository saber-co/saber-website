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
    label: "of inbound leads go cold when the first reply takes longer than five minutes",
    source: "Harvard Business Review",
  },
  {
    value: 40,
    suffix: "%",
    decimals: 0,
    label: "of the average team's week goes to repetitive work that never needed a human",
    source: "McKinsey Global Institute",
  },
  {
    value: 100,
    suffix: "%",
    decimals: 0,
    label: "of customer-facing actions stay approval-gated in the default rollout",
    source: "Scroll build standard",
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
        {stat.suffix ? <span className="text-vermilion">{stat.suffix}</span> : null}
      </span>
    )
  }

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="page-rails relative px-6 pt-20 pb-24 md:px-12 lg:px-20"
    >
      <div className="relative z-10 mx-auto max-w-[1200px]">
        <p className="kicker mb-4">The problem</p>
        <h2 className="mb-12 max-w-2xl font-display text-3xl font-medium tracking-tight text-ink md:text-5xl">
          Your team is doing work a Scroll operator could already own.
        </h2>
        <div ref={gridRef} className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flat-card flex flex-col px-7 py-7">
              <span className="mono-label mb-5">{String(i + 1).padStart(2, "0")} / 03</span>
              <div className="font-display text-6xl font-medium text-ink md:text-7xl">
                {renderOdometer(stat)}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-ink/70">{stat.label}</p>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/40">
                Source: {stat.source}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
