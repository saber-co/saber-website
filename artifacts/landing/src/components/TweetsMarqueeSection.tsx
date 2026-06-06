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
  url: string
}

const tweetsTop: Tweet[] = [
  {
    handle: "@karpathy",
    name: "Andrej Karpathy",
    text: "What's currently going on at @moltbook is genuinely the most incredible sci-fi takeoff-adjacent thing I have seen recently. People's Clawdbots (moltbots, now @openclaw) are self-organizing on a Reddit-like site for AIs,",
    likes: 35360,
    reposts: 5607,
    url: "https://x.com/karpathy/status/2017296988589723767",
  },
  {
    handle: "@_seanliu",
    name: "xiaoan",
    text: "now my clawdbot lives in my ray-ban meta glasses so i can just buy whatever i’m looking at",
    likes: 5509,
    reposts: 556,
    url: "https://x.com/_seanliu/status/2019881437378592862",
  },
  {
    handle: "@openclaw",
    name: "OpenClaw 🦞",
    text: "OpenClaw 2026.2.24 🦞  Stop phrases in 10+ languages, typing indicators, PowerShell 7 support, and a major security hardening pass.",
    likes: 1823,
    reposts: 150,
    url: "https://x.com/openclaw/status/2026503611514069173",
  },
  {
    handle: "@AlexFinn",
    name: "Alex Finn",
    text: "Just to see what would happen I texted Henry my Clawdbot to make a reservation for me next Saturday at a restaurant  When the OpenTable res didn't work, it used it's ElevenLabs skill to call the restaurant and complete t",
    likes: 5800,
    reposts: 284,
    url: "https://x.com/AlexFinn/status/2015266546600550755",
  },
    {
    handle: "@openclaw",
    name: "OpenClaw 🦞",
    text: "OpenClaw 2026.2.23 🦞  Kilo Gateway provider, Moonshot/Kimi vision + video, compaction overflow recovery, exec hardening, and OTEL secret redaction.",
    likes: 2720,
    reposts: 259,
    url: "https://x.com/openclaw/status/2026176117401424226",
  },
    {
    handle: "@openclaw",
    name: "OpenClaw 🦞",
    text: "OpenClaw 2026.2.22 🦞  Mistral support, multilingual memory, cron parallel runs, and browser extension relay support.",
    likes: 3683,
    reposts: 324,
    url: "https://x.com/openclaw/status/2025785584241844727",
  },
  {
    handle: "@altryne",
    name: "Alex Volkov (Thursd/AI)",
    text: "Fuck it, @openclaw tips and tricks thread, stream of consciousness style.   Every time I learn something, I'll add to this thread  Because while it's super hypey and amazing, it's still brittle as fuck, and there are rou",
    likes: 2772,
    reposts: 233,
    url: "https://x.com/altryne/status/2015222870591553559",
  },
    {
    handle: "@openclaw",
    name: "OpenClaw 🦞",
    text: "OpenClaw 2026.2.21 🦞  Gemini 3.1, Discord streaming + voice channels, thread-bound subagent sessions, and broad security hardening.",
    likes: 7353,
    reposts: 612,
    url: "https://x.com/openclaw/status/2025270903437717745",
  },
  {
    handle: "@jeiting",
    name: "Jacob Eiting",
    text: "I've become pretty agent brained over the last 72 hours. Here are some observations.  What makes @openclaw  different:  1. Self-modification, the fact that it can edit its own prompts, let's you collaborate with it to en",
    likes: 914,
    reposts: 77,
    url: "https://x.com/jeiting/status/2016564079154839640",
  },
  {
    handle: "@wes_sander",
    name: "Wes Sander",
    text: "I'm amazed how many people don't get the power of @openclaw Every day I get a morning briefing based on my schedule, today I had an interview so it researched the company and the role and created a prep doc based on my r",
    likes: 421,
    reposts: 39,
    url: "https://x.com/wes_sander/status/2023963116124422461",
  },
]

const tweetsBottom: Tweet[] = [
  {
    handle: "@AntoineRSX",
    name: "Antoine Rousseaux",
    text: "I hired my first full-time AI employee, it's Clawdbot.",
    likes: 5716,
    reposts: 486,
    url: "https://x.com/AntoineRSX/status/2014880012642746418",
  },
  {
    handle: "@thekitze",
    name: "kitze 🛠️ tinkerer.club",
    text: "I told @openclaw to look through my emails and bank transactions for dental history and it built a clean UI view of my current situation and upcoming appointments.",
    likes: 1085,
    reposts: 37,
    url: "https://x.com/thekitze/status/2015032095278850216",
  },
  {
    handle: "@vitl2907",
    name: "Vitaly Bulatov",
    text: "AI agents can now control robots!   For ClawCon, we integrated @openclaw and @rosorg - the largest open-source robotics stack powering millions of robots worldwide.  If you had an autonomous agent IRL, what would you mak",
    likes: 720,
    reposts: 107,
    url: "https://x.com/vitl2907/status/2019323636335997024",
  },
  {
    handle: "@_vgnsh",
    name: "Vignesh",
    text: "A thread about what I've been doing to calm down some egregious security claims that have been posted about @openclaw over the weekend.   Clawdbot is powerful software with a lot of sharp edges. Please read the security",
    likes: 413,
    reposts: 50,
    url: "https://x.com/_vgnsh/status/2016015059521306827",
  },
    {
    handle: "@openclaw",
    name: "OpenClaw 🦞",
    text: "OpenClaw 2026.2.19 🦞  Apple Watch MVP, gateway auth + device management, OTEL v2 migration, and 40+ security fixes.",
    likes: 5534,
    reposts: 457,
    url: "https://x.com/openclaw/status/2024541607240904934",
  },
  {
    handle: "@petergyang",
    name: "Peter Yang",
    text: "One builder shipped something with @openclaw that feels more useful and intelligent than Apple Intelligence.",
    likes: 764,
    reposts: 40,
    url: "https://x.com/petergyang/status/2014938897596481689",
  },
  {
    handle: "@astuyve",
    name: "AJ Stuyvenberg",
    text: "Clawdbot just saved me $4,200 on a car https://t.co/VsDRDnvChR",
    likes: 558,
    reposts: 20,
    url: "https://x.com/astuyve/status/2014147784098681217",
  },
    {
    handle: "@openclaw",
    name: "OpenClaw 🦞",
    text: "OpenClaw 2026.2.15 🦞  Telegram streaming replies, Discord Components v2, nested subagents, and major security hardening.",
    likes: 7022,
    reposts: 577,
    url: "https://x.com/openclaw/status/2023257934017294806",
  },
  {
    handle: "@jakubkrcmar",
    name: "Jakub Krcmar",
    text: "It’s nuts to see what an open-source project like @openclaw is quickly becoming. Massive respect to the builders pushing this forward.",
    likes: 305,
    reposts: 10,
    url: "https://x.com/jakubkrcmar/status/2013880434027868600",
  },
  {
    handle: "@davemorin",
    name: "Dave Morin 🦞",
    text: "🦞 Been working with Peter Steinberger (@steipete) on the OpenClaw Foundation structure for weeks. A home for thinkers and hackers and those that want to own their data. Honored to serve as the founding independent board",
    likes: 2735,
    reposts: 164,
    url: "https://x.com/davemorin/status/2023171737949442301",
  },
]


function TweetCard({ tweet }: { tweet: Tweet }) {
  return (
    <a
      href={tweet.url}
      target="_blank"
      rel="noopener noreferrer"
      className="soft-card block w-[340px] flex-shrink-0 px-5 py-4 sm:w-[380px]"
      aria-label={`Open tweet by ${tweet.handle}`}
    >
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-sm font-bold text-zinc-500">
          {tweet.name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-900">{tweet.name}</p>
          <p className="font-mono text-xs text-zinc-400">{tweet.handle}</p>
        </div>
      </div>
      <p className="mb-4 text-sm leading-relaxed text-zinc-600">{tweet.text}</p>
      <div className="flex items-center gap-5 text-[10px] uppercase tracking-[0.18em] text-zinc-400">
        <span>{tweet.likes.toLocaleString()} likes</span>
        <span>{tweet.reposts.toLocaleString()} reposts</span>
      </div>
    </a>
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
      className="page-rails relative overflow-hidden border-y border-black/[0.07] bg-[#fbfbfa] py-20 md:py-28"
    >
      <div ref={contentRef} className="relative z-10 mx-auto mb-12 max-w-[1200px] px-6 md:px-12 lg:px-20">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.28em] text-[#dc2626]">AI Agent Buzz</p>
        <h2 className="max-w-3xl font-display text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl">
          The hype is real — builders are shipping wild things with AI agents.
        </h2>
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
