"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    title: "Workflow automation across teams",
    description: "Connect ops, finance, and support into a single automation spine.",
    image: "/capabilities/workflow.svg",
    area: "a",
  },
  {
    title: "Chatbot-first ops support",
    description: "A single interface that routes work, approvals, and answers.",
    image: "/capabilities/chatops.svg",
    area: "b",
  },
  {
    title: "Fast integration with existing tools",
    description: "Plug into your current stack without replatforming.",
    image: "/capabilities/integrations.svg",
    area: "c",
  },
  {
    title: "Custom SOP encoding",
    description: "Translate your best processes into reliable automation.",
    image: "/capabilities/sop.svg",
    area: "d",
  },
  {
    title: "Real-time reporting + audit trails",
    description: "Track every automation decision with clean visibility.",
    image: "/capabilities/reporting.svg",
    area: "e",
  },
  {
    title: "Human-in-the-loop approvals",
    description: "Add checkpoints where decisions still need people.",
    image: "/capabilities/approvals.svg",
    area: "f",
  },
]

export function FeatureBubblesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
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

      gsap.fromTo(
        cardsRef.current,
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

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="parallax-section relative px-6 pt-16 pb-32 md:px-12 lg:px-20"
      style={{
        background:
          "radial-gradient(1000px 700px at 5% 0%, rgba(255,255,255,0.025), transparent 55%), radial-gradient(900px 700px at 95% 50%, rgba(220,38,38,0.16), transparent 55%), linear-gradient(180deg, rgba(8,6,6,1) 0%, rgba(6,5,5,1) 100%)",
      }}
    >
      <div ref={contentRef} className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/50">
              Capabilities
            </p>
            <h2 className="mt-3 text-balance text-3xl md:text-4xl font-semibold tracking-tight text-white">
              Built to automate, tuned to your operations.
            </h2>
          </div>
        </div>

        {/* Mobile: 2-col uniform grid */}
        <div className="lego-grid mt-12 grid grid-cols-2 gap-0 md:hidden">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              ref={(el) => { cardsRef.current[index] = el }}
              className="lego-widget mechanical group relative flex flex-col overflow-hidden p-4"
            >
              <div className="mb-3 h-16 w-full overflow-hidden border-2 border-white/80 bg-black/30">
                <img src={feature.image} alt="" className="h-full w-full object-cover opacity-90" loading="lazy" />
              </div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-white group-hover:text-black">
                {feature.title}
              </h3>
              <p className="mt-1 text-[11px] text-white/60 group-hover:text-black/80">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Desktop: bento layout */}
        <div
          className="lego-grid mt-12 hidden md:grid md:grid-cols-6"
          style={{
            gridTemplateAreas: `"a a b b c c" "d d d e e f"`,
            gridAutoRows: "240px",
          }}
        >
          {features.map((feature, index) => (
            <div
              key={feature.title}
              ref={(el) => { cardsRef.current[index] = el }}
              className="lego-widget mechanical group relative flex flex-col overflow-hidden p-5"
              style={{ gridArea: feature.area }}
            >
              <div className="mb-4 h-20 w-full overflow-hidden border-2 border-white/80 bg-black/30">
                <img src={feature.image} alt="" className="h-full w-full object-cover opacity-90" loading="lazy" />
              </div>
              <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-white group-hover:text-black">
                {feature.title}
              </h3>
              <p className="mt-2 text-xs text-white/60 group-hover:text-black/80">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
