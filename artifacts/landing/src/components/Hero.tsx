import { AgentGraph } from "./AgentGraph"

export function Hero() {
  return (
    <section id="top" className="page-rails relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 pb-10 pt-16 md:pt-24">
        <div className="flex flex-col items-center text-center">
          {/* Eyebrow */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-3.5 py-1.5 text-xs font-medium text-zinc-600 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#dc2626]" />
            AI Agent Implementation Partner
          </div>

          {/* Headline */}
          <h1 className="max-w-4xl font-display text-4xl font-semibold leading-[1.18] tracking-tight text-zinc-900 sm:text-5xl md:text-6xl lg:text-[4.25rem]">
            Deploy AI operators in <span className="hl whitespace-nowrap">your own</span> infrastructure.
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
            Saber implements AI agents for inbound calls, live chat, multi-step
            workflows, browser actions, and follow-ups — with approvals where
            needed. You keep the infrastructure, credentials, and control.
          </p>

          {/* CTAs */}
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
            <a href="#contact" className="btn-accent px-7 py-3.5 text-sm">
              Book a Demo
            </a>
            <a href="#capabilities" className="btn-ghost px-7 py-3.5 text-sm">
              See capabilities
            </a>
          </div>
        </div>

        {/* Animated agent network graph */}
        <div className="mt-12 md:mt-16">
          <AgentGraph />
        </div>
      </div>
    </section>
  )
}
