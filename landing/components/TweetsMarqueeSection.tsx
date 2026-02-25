"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface Tweet {
  handle: string
  name: string
  text: string
  likes: number
  reposts: number
}

const tweetsTop: Tweet[] = [
  {
    handle: "@alexkarp_ai",
    name: "Alex Karp",
    text: "OpenClaw is genuinely the most interesting infra play in agent tooling right now. Not even close.",
    likes: 342,
    reposts: 87,
  },
  {
    handle: "@priya_ops",
    name: "Priya Sharma",
    text: "We plugged OpenClaw into our support flow and cut first-response from 14 min to under 90 seconds. Actual numbers.",
    likes: 518,
    reposts: 134,
  },
  {
    handle: "@marcusbuild",
    name: "Marcus Chen",
    text: "The human-in-the-loop piece is what sells it. AI handles the grunt work, humans approve the important stuff. This is how it should work.",
    likes: 276,
    reposts: 62,
  },
  {
    handle: "@sarahfoundr",
    name: "Sarah Mitchell",
    text: "Replaced 3 separate tools with one Saber workflow. My ops team went from reactive firefighting to actually building.",
    likes: 891,
    reposts: 203,
  },
  {
    handle: "@devesh_vc",
    name: "Devesh Patel",
    text: "Every founder I talk to about their ops stack — I just tell them to look at OpenClaw. The architecture is right.",
    likes: 445,
    reposts: 112,
  },
]

const tweetsBottom: Tweet[] = [
  {
    handle: "@jenny_cto",
    name: "Jenny Zhao",
    text: "Finally an AI tool that doesn't hallucinate my workflows. OpenClaw actually follows the SOPs we give it.",
    likes: 623,
    reposts: 158,
  },
  {
    handle: "@tombuilds",
    name: "Tom Nakamura",
    text: "Our missed-lead rate dropped 73% in the first month. Not an exaggeration — we measured it obsessively.",
    likes: 389,
    reposts: 95,
  },
  {
    handle: "@lisa_revenue",
    name: "Lisa Okonkwo",
    text: "Saber picked up our after-hours calls and booked 12 demos while we slept. Literally paid for itself in a week.",
    likes: 734,
    reposts: 189,
  },
  {
    handle: "@rajops",
    name: "Raj Mehta",
    text: "The browser automation is underrated. It fills forms, pulls data, triggers follow-ups — no custom code needed.",
    likes: 267,
    reposts: 71,
  },
  {
    handle: "@kate_scale",
    name: "Kate Rivera",
    text: "Went from 2 ops hires planned to 0, and we're handling 4x the volume. OpenClaw is the real deal.",
    likes: 556,
    reposts: 142,
  },
]

function TweetCard({ tweet }: { tweet: Tweet }) {
  return (
    <div className="tweet-card flex-shrink-0 w-[340px] border-2 border-white/20 bg-[#0a0a0a] px-5 py-4 transition-none hover:border-white/50 sm:w-[380px]">
      <div className="flex items-center gap-3 mb-3">
        <div className="h-8 w-8 border border-white/30 bg-white/10 flex items-center justify-center text-xs font-bold text-white/70">
          {tweet.name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-white/90">{tweet.name}</p>
          <p className="text-xs text-white/35 font-mono">{tweet.handle}</p>
        </div>
      </div>
      <p className="text-sm/relaxed text-white/65 mb-4">{tweet.text}</p>
      <div className="flex items-center gap-5 text-[10px] uppercase tracking-[0.2em] text-white/30">
        <span>{tweet.likes.toLocaleString()} likes</span>
        <span>{tweet.reposts} reposts</span>
      </div>
    </div>
  )
}

export function TweetsMarqueeSection() {
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
      id="buzz"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        background:
          "radial-gradient(800px 600px at 50% 30%, rgba(220,38,38,0.12), transparent 60%), linear-gradient(180deg, rgba(8,6,6,1) 0%, rgba(6,5,5,1) 100%)",
      }}
    >
      <div ref={contentRef} className="mx-auto max-w-6xl px-6 md:px-12 lg:px-20 mb-12">
        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-white/50">
          OpenClaw Buzz
        </p>
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Operators are paying attention.
        </h2>
      </div>

      {/* Top lane - scrolls left */}
      <div className="marquee-container mb-4">
        <div className="marquee-track marquee-left">
          {[...tweetsTop, ...tweetsTop].map((tweet, i) => (
            <TweetCard key={`top-${i}`} tweet={tweet} />
          ))}
        </div>
      </div>

      {/* Bottom lane - scrolls right */}
      <div className="marquee-container">
        <div className="marquee-track marquee-right">
          {[...tweetsBottom, ...tweetsBottom].map((tweet, i) => (
            <TweetCard key={`bottom-${i}`} tweet={tweet} />
          ))}
        </div>
      </div>
    </section>
  )
}
