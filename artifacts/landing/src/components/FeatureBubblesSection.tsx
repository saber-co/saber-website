import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    title: "AI agent deployment in your stack",
    description: "We architect and implement AI agents in your own infrastructure with your security model and integrations.",
    image: "/capabilities/chatops.svg",
    area: "a",
  },
  {
    title: "Live chat & messaging operations",
    description: "Engage website visitors and support tickets instantly. AI agents handle common issues and route complex cases to the right person.",
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
      className="page-rails relative px-6 pt-20 pb-28 md:px-12 lg:px-20"
    >
      <div ref={contentRef} className="relative z-10 mx-auto max-w-[1200px]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#dc2626]">
              What Saber does
            </p>
            <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl">
              We implement AI agents for your team, not as hosted SaaS.
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-zinc-600">
              Each capability runs in your environment, escalates intelligently, and logs every action for your audit trail.
            </p>
          </div>
          <a
            href="#contact"
            className="btn-ghost self-start px-6 py-3 text-sm md:self-auto"
          >
            See it in action
          </a>
        </div>

        {/* Mobile: 2-col uniform grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              ref={(el) => { cardsRef.current[index] = el }}
              className="soft-card group relative flex flex-col overflow-hidden p-5"
            >
              <div className="mb-3 h-16 w-full overflow-hidden rounded-lg border border-black/[0.07] bg-zinc-50">
                <img src={feature.image} alt="" className="h-full w-full object-cover" loading="lazy" />
              </div>
              <h3 className="font-display text-sm font-semibold text-zinc-900">
                {feature.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-zinc-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Desktop: bento layout */}
        <div
          className="mt-12 hidden gap-4 md:grid md:grid-cols-6"
          style={{
            gridTemplateAreas: `"a a b b c c" "d d d e e f"`,
            gridAutoRows: "260px",
          }}
        >
          {features.map((feature, index) => (
            <div
              key={feature.title}
              ref={(el) => { cardsRef.current[index] = el }}
              className="soft-card group relative flex flex-col overflow-hidden p-6"
              style={{ gridArea: feature.area }}
            >
              <div className="mb-4 h-20 w-full overflow-hidden rounded-lg border border-black/[0.07] bg-zinc-50">
                <img src={feature.image} alt="" className="h-full w-full object-cover" loading="lazy" />
              </div>
              <h3 className="font-display text-base font-semibold text-zinc-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
