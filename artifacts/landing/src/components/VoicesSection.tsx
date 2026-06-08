"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface Tweet {
  name: string
  handle: string
  quote: string
  url: string
}

const tweetsTop: Tweet[] = [
  {
    name: "Andrej Karpathy",
    handle: "@karpathy",
    quote:
      "Projects like OpenAI's Operator are to the digital world as Humanoid robots are to the physical world. One general setting (monitor keyboard and mouse, or human body) that can in principle gradually perform arbitrarily general tasks.",
    url: "https://x.com/karpathy/status/1882544526033924438",
  },
  {
    name: "Sam Altman",
    handle: "@sama",
    quote:
      "Today we launched a new product called ChatGPT Agent. Agent represents a new level of capability for AI systems and can accomplish some remarkable, complex tasks for you using its own computer. It combines the spirit of Deep Research and Operator, but is more powerful than that.",
    url: "https://x.com/sama/status/1945900345378697650",
  },
  {
    name: "Aravind Srinivas",
    handle: "@AravSrinivas",
    quote:
      "We've silently been working on the next big thing: Perplexity Computer. Computer unifies every current capability of AI into a single system. Files, tools, memory, and models, orchestrated together, working for you.",
    url: "https://x.com/AravSrinivas/status/2026695864039911684",
  },
  {
    name: "Garry Tan",
    handle: "@garrytan",
    quote:
      "Requests for Startups are up for Spring 2025! YC wants founders who treat AI agents not as features but as the core operating system of brand-new companies and industries.",
    url: "https://x.com/garrytan/status/1920153493492674984",
  },
]

const tweetsBottom: Tweet[] = [
  {
    name: "Andrej Karpathy",
    handle: "@karpathy",
    quote:
      "It's hard to communicate how much programming has changed due to AI in the last 2 months.",
    url: "https://x.com/karpathy/status/2026731645169185220",
  },
  {
    name: "Logan Kilpatrick",
    handle: "@OfficialLoganK",
    quote:
      "2026 is very much the year of agents and AI coding, lots to happen still!",
    url: "https://x.com/OfficialLoganK/status/2056206893803356337",
  },
  {
    name: "Garry Tan",
    handle: "@garrytan",
    quote:
      "People are going to dramatically prefer AI to humans for more and more things over the next 10 years, mainly because the agents will be smarter, more responsive, ask better questions and will always be available.",
    url: "https://x.com/garrytan/status/1966233807545360799",
  },
]

function TweetCard({ tweet }: { tweet: Tweet }) {
  return (
    <a
      href={tweet.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flat-card block w-[340px] flex-shrink-0 px-5 py-5 transition-transform hover:-translate-y-1 sm:w-[400px]"
      aria-label={`Tweet by ${tweet.name}`}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink font-display text-sm font-semibold text-paper">
            {tweet.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">{tweet.name}</p>
            <p className="font-mono text-xs text-ink/50">{tweet.handle}</p>
          </div>
        </div>
        <span aria-hidden className="font-display text-base font-semibold text-ink">
          𝕏
        </span>
      </div>
      <p className="mb-4 text-sm leading-relaxed text-ink/80">{tweet.quote}</p>
      <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/40">
        <span className="text-vermilion-deep">View on X ↗</span>
      </div>
    </a>
  )
}

export function VoicesSection() {
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

  return (
    <section
      ref={sectionRef}
      id="signal"
      className="page-rails relative overflow-hidden py-20 md:py-28"
    >
      <div
        ref={contentRef}
        className="relative z-10 mx-auto mb-12 max-w-[1200px] px-6 md:px-12 lg:px-20"
      >
        <p className="kicker mb-4">Signal</p>
        <h2 className="max-w-3xl font-display text-3xl font-medium tracking-tight text-ink md:text-5xl">
          The people building this future, in their own words.
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink/65">
          Not our marketing — real posts from the founders and researchers shaping
          where AI agents are headed.
        </p>
      </div>

      <div className="marquee-container mb-4">
        <div className="marquee-track marquee-left">
          {[...tweetsTop, ...tweetsTop].map((tweet, i) => (
            <TweetCard key={`top-${i}-${tweet.url}`} tweet={tweet} />
          ))}
        </div>
      </div>

      <div className="marquee-container">
        <div className="marquee-track marquee-right">
          {[...tweetsBottom, ...tweetsBottom].map((tweet, i) => (
            <TweetCard key={`bottom-${i}-${tweet.url}`} tweet={tweet} />
          ))}
        </div>
      </div>
    </section>
  )
}
