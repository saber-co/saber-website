"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: "01",
    title: "Discovery Call",
    description:
      "We audit your current operations to pinpoint bottlenecks, redundancies, and high-friction handoffs that cost you time and revenue.",
  },
  {
    number: "02",
    title: "Architecture Mapping",
    description:
      "Our engineers design a custom OpenClaw blueprint tailored to your workflows, integrations, and scaling requirements.",
  },
  {
    number: "03",
    title: "Deployment",
    description:
      "Full technical setup, testing, and go-live. We handle the infrastructure so your team can focus on what matters.",
  },
]

export function FrameworkSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Heading scrubs in
      if (headingRef.current) {
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
      }

      // Vertical line grows with scroll
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scrollTrigger: {
              trigger: lineRef.current,
              start: "top 85%",
              end: "bottom 50%",
              scrub: 0.8,
            },
            scaleY: 1,
            transformOrigin: "top",
            ease: "none",
          }
        )
      }

      // Steps slide in from left, tied to scroll
      stepsRef.current.forEach((step, i) => {
        if (!step) return
        gsap.fromTo(
          step,
          { x: -60, opacity: 0 },
          {
            scrollTrigger: {
              trigger: step,
              start: `top ${92 - i * 4}%`,
              end: `top ${55 - i * 4}%`,
              scrub: 0.8,
            },
            x: 0,
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
      id="framework"
      className="relative px-6 py-28 md:px-12 lg:px-20"
      style={{ background: "#050505" }}
    >
      {/* Top divider */}
      <div className="absolute top-0 left-6 right-6 md:left-12 md:right-12 lg:left-20 lg:right-20 h-px bg-white/[0.08]" />

      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-mono uppercase tracking-widest text-[#2D5BFF] mb-3">
          Process
        </p>
        <h2
          ref={headingRef}
          className="text-balance text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-20"
        >
          The Saber Framework.
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="absolute left-[19px] top-0 bottom-0 w-px bg-white/[0.08]"
          />

          <div className="flex flex-col gap-16">
            {steps.map((step, i) => (
              <div
                key={step.number}
                ref={(el) => { stepsRef.current[i] = el }}
                className="relative flex gap-8 items-start"
              >
                {/* Dot */}
                <div className="relative z-10 flex items-center justify-center w-10 h-10 shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#2D5BFF]" />
                  <div className="absolute inset-0 rounded-full border border-[#2D5BFF]/30" />
                </div>

                <div className="pb-2">
                  <span className="text-xs font-mono text-white/30 block mb-2">
                    {step.number}
                  </span>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed max-w-lg">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
