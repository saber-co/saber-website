"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    title: "OpenClaw deployment in your stack",
    description: "We architect and implement OpenClaw in your own infrastructure with your security model and integrations.",
    image: "/capabilities/chatops.svg",
    area: "a",
  },
  {
    title: "Live chat & messaging operations",
    description: "Engage website visitors and support tickets instantly. OpenClaw handles common issues and routes complex cases to the right person.",
    image: "/capabilities/integrations.svg",
    area: "b",
  },
  {
    title: "Multi-step workflow automation",
    description: "Chain tasks across CRM, email, Slack, and internal tools. One trigger fires a complete process — no manual hand-offs.",
    image: "/capabilities/workflow.svg",
    area: "c",
  },
  {
    title: "Browser actions & data entry",
    description: "Saber navigates web apps, fills forms, pulls data, and completes repetitive browser tasks your team shouldn't be doing.",
    image: "/capabilities/sop.svg",
    area: "d",
  },
  {
    title: "Automated follow-ups",
    description: "No lead goes cold. Saber sends timely follow-up emails, SMS, and Slack nudges based on your playbook.",
    image: "/capabilities/reporting.svg",
    area: "e",
  },
  {
    title: "Human-in-the-loop approvals",
    description: "Saber handles the work, but your team stays in control. Approval checkpoints for anything that needs a human call.",
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
          "radial-gradient(1000px 700px at 5% 0%, rgba(255,255,255,0.025), transparent 55%), radial-gradient(900px 700px at 95% 50%, rgba(220,38,38,0.16), transparent 55%), linear-gradient(180deg, rgba(6,5,5,1) 0%, rgba(6,5,5,1) 100%)",
      }}
    >
      <div ref={contentRef} className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/50">
              What Saber does
            </p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
              We implement OpenClaw for your team, not as hosted SaaS.
            </h2>
            <p className="mt-4 max-w-lg text-sm/relaxed text-white/45">
              Each capability runs in your environment, escalates intelligently, and logs every action for your audit trail.
            </p>
          </div>
          <Link
            href="#contact"
            className="mechanical inline-flex items-center justify-center border-2 border-white/90 bg-[#0a0a0a] px-8 py-3 text-xs font-semibold uppercase tracking-wider text-white self-start md:self-auto"
          >
            See it in action
          </Link>
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
            gridAutoRows: "260px",
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
              <p className="mt-2 text-xs/relaxed text-white/60 group-hover:text-black/80">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
