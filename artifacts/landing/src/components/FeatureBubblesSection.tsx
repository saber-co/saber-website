import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    index: "01",
    title: "Persistent memory",
    description:
      "Your agent remembers your accounts, tools, and past decisions — and gets sharper the longer it runs alongside your team.",
  },
  {
    index: "02",
    title: "Builds its own skills",
    description:
      "After each task it writes reusable playbooks, so work it figures out once it can repeat reliably from then on.",
  },
  {
    index: "03",
    title: "Wired into your tools",
    description:
      "Reliable function calling, JSON, and MCP connect it to your CRM, repositories, databases, and internal APIs.",
  },
  {
    index: "04",
    title: "Works where your team is",
    description:
      "Slack, Discord, Telegram, WhatsApp, and email — one agent across every channel, carrying full context.",
  },
  {
    index: "05",
    title: "Runs on a schedule",
    description:
      'Natural-language cron turns "every weekday at 8" into briefings, reports, and monitoring that just happen.',
  },
  {
    index: "06",
    title: "Your infra, your control",
    description:
      "Self-hosted inference on your servers, your data boundary, and human approval gates wherever you want them.",
  },
]

export function FeatureBubblesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 60, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            end: "top 40%",
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
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div>
            <p className="kicker">Capabilities</p>
            <h2 className="mt-4 max-w-xl font-display text-3xl font-medium tracking-tight text-ink md:text-5xl">
              One agent, shaped around how your team actually works.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink/65 lg:max-w-xs lg:text-right">
            We design, build, and operate it end to end — you get the outcomes
            without standing up an ML team.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 border-t border-ink/15 sm:grid-cols-2">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`group flex gap-5 border-ink/15 py-8 pr-4 sm:py-10 ${
                i % 2 === 0 ? "sm:border-r sm:pr-10" : "sm:pl-10"
              } border-b`}
            >
              <span className="font-display text-3xl font-medium leading-none text-vermilion">
                {feature.index}
              </span>
              <div>
                <h3 className="font-display text-xl font-medium text-ink">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a href="#contact" className="btn-outline px-7 py-3.5">
            Start a project
          </a>
        </div>
      </div>
    </section>
  )
}
