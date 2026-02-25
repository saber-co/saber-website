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
    handle: "@openclaw",
    name: "OpenClaw 🦞",
    text: "The lobster has molted into its final form 🦞  Clawd → Moltbot → OpenClaw  100k+ GitHub stars. 2M visitors in a week. And finally, a name that'll stick.  Your assistant. Your machine. Your rules. https://t.co/d39LXKRE9h",
    likes: 15427,
    reposts: 1428,
    url: "https://x.com/openclaw/status/2017103710959075434",
  },
  {
    handle: "@openclaw",
    name: "OpenClaw 🦞",
    text: "🦞 OpenClaw 2026.1.30  🐚 Shell completion 🆓 Kimi K2.5 + Kimi Coding: run your claw for free 🔐 MiniMax OAuth: one more model just a login away 📱 Telegram got a glow-up — 6 fixes from threading to HTML rendering  Plus a bun",
    likes: 8071,
    reposts: 727,
    url: "https://x.com/openclaw/status/2017628464933753067",
  },
  {
    handle: "@openclaw",
    name: "OpenClaw 🦞",
    text: "🦞 OpenClaw 2026.2.15 is here!  ✨ Telegram message streaming — replies flow live 💬 Discord Components v2 — buttons, selects, modals 🔧 Nested sub-agents 🔒 Major security hardening pass 🐛 40+ bug fixes  Big day. Huge day. M",
    likes: 7022,
    reposts: 577,
    url: "https://x.com/openclaw/status/2023257934017294806",
  },
  {
    handle: "@openclaw",
    name: "OpenClaw 🦞",
    text: "🦞 OpenClaw v2026.2.6 is here!  🧠 Opus 4.6 + GPT-5.3-Codex support ⚡ xAI Grok + Baidu Qianfan providers 📊 Token usage dashboard 🧭 Voyage AI for memory 🔒 Skill code safety scanner 🔧 Cron fixes galore  Security hardening ac",
    likes: 6160,
    reposts: 572,
    url: "https://x.com/openclaw/status/2020059808444084506",
  },
  {
    handle: "@openclaw",
    name: "OpenClaw 🦞",
    text: "🦞 OpenClaw 2026.2.14 is live  🔒 50+ security hardening fixes ⚡ Way faster test suite 🛠️ File boundary parity across tools 🐛 Tons of bug fixes from the maintainer crew  Valentine's Day release: full of love and paranoia 💕",
    likes: 4722,
    reposts: 399,
    url: "https://x.com/openclaw/status/2022880208664301599",
  },
  {
    handle: "@openclaw",
    name: "OpenClaw 🦞",
    text: "OpenClaw 2026.2.1 🦞  🔒 Major security hardening: path traversal, LFI, exec injection fixes 🧵 Discord thread routing + gateway message timestamps 🔐 TLS 1.3 minimum, system prompt guardrails 🛠️ Streaming stability, memory ",
    likes: 4475,
    reposts: 395,
    url: "https://x.com/openclaw/status/2018293323199635545",
  },
  {
    handle: "@openclaw",
    name: "OpenClaw 🦞",
    text: "OpenClaw 2026.2.22 🦞  🥐 @MistralAI (chat + mem + voice) 🌍 Multilingual memory (ES/PT/JP/KO/AR) 🔄 Built-in auto-updater (off by default) 🔧 Cron: parallel runs 🛡️ 40+ security hardening fixes  And a browser extension that ",
    likes: 3683,
    reposts: 324,
    url: "https://x.com/openclaw/status/2025785584241844727",
  },
  {
    handle: "@openclaw",
    name: "OpenClaw 🦞",
    text: "🦞Clawdbot 2026.1.24  📱 LINE channel with rich replies & quick actions 💬 Telegram DM topics = separate sessions now ✅ /approve exec prompts ✨ Control UI got a proper glow-up 📚 Ollama + Venice 🎙️ Edge TTS  The lobster prov",
    likes: 3461,
    reposts: 295,
    url: "https://x.com/openclaw/status/2015447314999984354",
  },
  {
    handle: "@openclaw",
    name: "OpenClaw 🦞",
    text: "OpenClaw 2026.2.23 🦞  🔑 Kilo Gateway provider 🌙 Moonshot/Kimi vision + video 🧠 Compaction overflow recovery 🔒 Exec hardening 🛡️ ACP + OTEL secret redaction ⚠️ allowFrom now ID-only by default (safer authz)  50 advisories",
    likes: 2720,
    reposts: 259,
    url: "https://x.com/openclaw/status/2026176117401424226",
  },
  {
    handle: "@openclaw",
    name: "OpenClaw 🦞",
    text: "🦞Clawdbot 2026.1.23  🎤/TTS goes core  ❤️‍🔥Controllable heartbeats 🔧 /tools/invoke API 🌐 Urbit channel 🐛 Mountain of fixes  A changelog so thicc I needed a snack break reading it. https://t.co/qSWbnnjCtv https://t.co/VwdO",
    likes: 2464,
    reposts: 164,
    url: "https://x.com/openclaw/status/2015076934904942838",
  },
]

const tweetsBottom: Tweet[] = [
  {
    handle: "@openclaw",
    name: "OpenClaw 🦞",
    text: "🦞 BIG NEWS: We've molted!  Clawdbot → Moltbot Clawd → Molty  Same lobster soul, new shell. Anthropic asked us to change our name (trademark stuff), and honestly? \"Molt\" fits perfectly - it's what lobsters do to grow.  Ne",
    likes: 14064,
    reposts: 1191,
    url: "https://x.com/openclaw/status/2016058924403753024",
  },
  {
    handle: "@openclaw",
    name: "OpenClaw 🦞",
    text: "🦞 OpenClaw 2026.2.21  ♊ Gemini 3.1 🔒 Massive security hardening 🎙️ Discord streaming + voice channels 🧵 Thread-bound subagent sessions 📱 iOS/Watch polish + gateway stability 🧠 Prompt caching tweaks  100+ fixes shipped wh",
    likes: 7353,
    reposts: 612,
    url: "https://x.com/openclaw/status/2025270903437717745",
  },
  {
    handle: "@openclaw",
    name: "OpenClaw 🦞",
    text: "🦞 OpenClaw 2026.2.9 just dropped  🔍 Grok web search provider 🧠 No more post-compaction amnesia 🛡️ Context overflow recovery ⏰ Cron reliability overhaul + 40 more fixes from 25+ contributors  Elon we added your model btw,",
    likes: 6218,
    reposts: 519,
    url: "https://x.com/openclaw/status/2020945524942307412",
  },
  {
    handle: "@openclaw",
    name: "OpenClaw 🦞",
    text: "🦞 OpenClaw 2026.2.19  ⌚️ Apple Watch  MVP 🔧 Gateway auth & device management 🔌 OTEL v2 migration + plugin/hooks hardening 🔒 40+ security hardening fixes 🖥️ Dashboard now nudges you to update — stay secure, stay current  ",
    likes: 5534,
    reposts: 457,
    url: "https://x.com/openclaw/status/2024541607240904934",
  },
  {
    handle: "@openclaw",
    name: "OpenClaw 🦞",
    text: "🦞 OpenClaw 2026.2.13  🤗 HuggingFace support ✉️ Messages survive crashes (write-ahead queue) 🎙️ Discord voice messages + custom presence 🧵 Threading that actually works 🔒 Massive security hardening pass 🤖 gpt-5.3-codex-sp",
    likes: 4642,
    reposts: 396,
    url: "https://x.com/openclaw/status/2022530044434825310",
  },
  {
    handle: "@openclaw",
    name: "OpenClaw 🦞",
    text: "🦞🛡️ OpenClaw × VirusTotal: every ClawHub skill now auto-scanned for malware  🔍 AI Code Insight catches reverse shells, crypto miners & exfiltration ⚡ ~30s verdicts 🚦 Benign/Suspicious/Malicious tiers 🔄 Daily re-scans  Th",
    likes: 4472,
    reposts: 430,
    url: "https://x.com/openclaw/status/2019865921175577029",
  },
  {
    handle: "@openclaw",
    name: "OpenClaw 🦞",
    text: "OpenClaw 2026.2.2 🦞  169 commits. 25 contributors.  • Feishu/Lark - first Chinese chat client 🇨🇳 • Faster builds (tsdown migration) • Security hardening across the board • QMD memory plugin  This project moves fast becau",
    likes: 3650,
    reposts: 303,
    url: "https://x.com/openclaw/status/2018875417902682137",
  },
  {
    handle: "@openclaw",
    name: "OpenClaw 🦞",
    text: "Friends of Clawd Discord is now live!   A place to hang out, share your Clawdis setups, ask questions, and help each other build cool stuff with AI assistants.  Join the crustacean crew: https://t.co/y4u2EU3U0L",
    likes: 3084,
    reposts: 410,
    url: "https://x.com/openclaw/status/2006801472487629257",
  },
  {
    handle: "@openclaw",
    name: "OpenClaw 🦞",
    text: "OpenClaw 2026.2.3 🦞  ☁️ Cloudflare AI Gateway support 🌙 Moonshot provider (hello China 🇨🇳) 📢 Cron announces its own summaries 🔒 Security hardening  First ClawCon in the books. No, you weren't invited. https://t.co/gJkgHL",
    likes: 2696,
    reposts: 246,
    url: "https://x.com/openclaw/status/2019321375207616720",
  },
  {
    handle: "@openclaw",
    name: "OpenClaw 🦞",
    text: "OpenClaw 2026.2.24 🦞  🌍 Stop phrases in 10+ languages (your bot finally understands \"arrête\") ⌨️ Typing indicators that don't ghost you 🪟 PowerShell 7 because it's not 2019 🔒 30+ security fixes (we don't sleep so you can",
    likes: 1823,
    reposts: 150,
    url: "https://x.com/openclaw/status/2026503611514069173",
  },
]

function TweetCard({ tweet }: { tweet: Tweet }) {
  return (
    <a
      href={tweet.url}
      target="_blank"
      rel="noopener noreferrer"
      className="tweet-card block flex-shrink-0 w-[340px] border-2 border-white/20 bg-[#0a0a0a] px-5 py-4 transition-none hover:border-white/50 sm:w-[380px]"
      aria-label={`Open tweet by ${tweet.handle}`}
    >
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center border border-white/30 bg-white/10 text-xs font-bold text-white/70">
          {tweet.name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-white/90">{tweet.name}</p>
          <p className="font-mono text-xs text-white/35">{tweet.handle}</p>
        </div>
      </div>
      <p className="mb-4 text-sm/relaxed text-white/65">{tweet.text}</p>
      <div className="flex items-center gap-5 text-[10px] uppercase tracking-[0.2em] text-white/30">
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
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        background:
          "radial-gradient(800px 600px at 50% 30%, rgba(220,38,38,0.12), transparent 60%), linear-gradient(180deg, rgba(8,6,6,1) 0%, rgba(6,5,5,1) 100%)",
      }}
    >
      <div ref={contentRef} className="mx-auto mb-12 max-w-6xl px-6 md:px-12 lg:px-20">
        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-white/50">OpenClaw Buzz</p>
        <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Real posts from X with 300+ likes from the OpenClaw momentum wave.
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
