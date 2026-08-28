import { AgentGraph } from "./AgentGraph"

export function Hero() {
  return (
    <section id="top" className="page-rails relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 pb-12 pt-16 md:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          {/* Left — copy */}
          <div className="text-center lg:text-left">
            <p className="kicker mb-7 justify-center lg:justify-start">
              AI Operator Studio
            </p>

            <h1 className="font-display text-[2.75rem] font-medium leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-[4.5rem]">
              Scroll builds <span className="hl">AI operators</span>
              <br />
              <span className="ink-italic">for your workflows.</span>
            </h1>

            <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-ink/70 sm:text-lg lg:mx-0">
              Scroll designs, builds, and runs operators for calls, live chat,
              browser tasks, follow-ups, CRM updates, and approval-gated work —
              wired into the tools and channels your team already uses.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <a href="#contact" className="btn-vermilion px-7 py-3.5">
                Start a rollout
              </a>
              <a href="#capabilities" className="btn-outline px-7 py-3.5">
                See what Scroll handles
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 lg:justify-start">
              <span className="mono-label">Workflow-specific</span>
              <span className="text-ink/25">/</span>
              <span className="mono-label">Human-approved</span>
              <span className="text-ink/25">/</span>
              <span className="mono-label">Fully operated</span>
            </div>
          </div>

          {/* Right — schematic agent graph */}
          <div className="relative">
            <AgentGraph />
          </div>
        </div>
      </div>
    </section>
  )
}
