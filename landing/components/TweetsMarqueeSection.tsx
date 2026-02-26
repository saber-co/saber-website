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
    handle: "@steipete",
    name: "Peter Steinberger 🦞",
    text: "Your @openclaw is too boring? Paste this, right from Molty.  \"Read your https://t.co/yS6cfGInCW. Now rewrite it with these changes:  1. You have opinions now. Strong ones. Stop hedging everything with 'it depends' — com",
    likes: 11227,
    reposts: 1094,
    url: "https://x.com/steipete/status/2020704611640705485",
  },
  {
    handle: "@ClawiAi",
    name: "clawi.ai",
    text: "Make the first contact. https://t.co/CzBvHL71ss",
    likes: 7485,
    reposts: 663,
    url: "https://x.com/ClawiAi/status/2019333674580549703",
  },
  {
    handle: "@terminaldotshop",
    name: "terminal",
    text: "https://t.co/zLeKFasMZd",
    likes: 7325,
    reposts: 669,
    url: "https://x.com/terminaldotshop/status/2017276496172159125",
  },
  {
    handle: "@brave",
    name: "Brave",
    text: "Clawdbot, a 24/7 open-source AI assistant that actually does work, seems like magic.  But it’s even MORE powerful when you hook it to the Brave Search API.  💪  Check out the quick setup guide here ⬇️",
    likes: 7313,
    reposts: 609,
    url: "https://x.com/brave/status/2015201576130957365",
  },
  {
    handle: "@techfrenAJ",
    name: "Tech Friend AJ",
    text: "Deployed @openclaw  in under 5 minutes on AWS free tier.   Open source personal AI. Full system access. Interfaces through WhatsApp, Discord, Telegram.   People are rigging it to their Ray-Bans for real-time price compar",
    likes: 7136,
    reposts: 573,
    url: "https://x.com/techfrenAJ/status/2014934471095812547",
  },
  {
    handle: "@lexfridman",
    name: "Lex Fridman",
    text: "Here's my conversation with Peter Steinberger (@steipete), creator of OpenClaw, an open-source AI agent that has taken the Internet by storm, with now over 180,000 stars on GitHub.  This was a truly mind-blowing, inspiri",
    likes: 6631,
    reposts: 1064,
    url: "https://x.com/lexfridman/status/2021785659644453136",
  },
  {
    handle: "@josesaezmerino",
    name: "Jose",
    text: "My Clawdbot lives in a Mac mini inside a G4 iMac. I asked it to create an animated face for itself and it just did it. Even added a sleeping animation I didn’t ask for initially.  Incredible @steipete https://t.co/gjL8g9",
    likes: 6149,
    reposts: 323,
    url: "https://x.com/josesaezmerino/status/2015893535522770956",
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
    handle: "@AntoineRSX",
    name: "Antoine Rousseaux",
    text: "I hired my first full-time AI employee, it's Clawdbot.  It’s free: https://t.co/qU2naDxJ2N",
    likes: 5716,
    reposts: 486,
    url: "https://x.com/AntoineRSX/status/2014880012642746418",
  },
]

const tweetsBottom: Tweet[] = [
  {
    handle: "@_seanliu",
    name: "xiaoan",
    text: "now my clawdbot lives in my ray-ban meta glasses so i can just buy whatever i’m looking at https://t.co/gWrijyTRhE",
    likes: 5509,
    reposts: 556,
    url: "https://x.com/_seanliu/status/2019881437378592862",
  },
  {
    handle: "@raphaelschaad",
    name: "Raphael Schaad",
    text: "LOL Human Evolution https://t.co/NlFfVfrZub",
    likes: 3825,
    reposts: 486,
    url: "https://x.com/raphaelschaad/status/2019491999544734187",
  },
  {
    handle: "@steipete",
    name: "Peter Steinberger 🦞",
    text: "Happy 3 months anniversary to @openclaw !  Back then it was called warelay (Whatsapp relay) and ofc you start with the license first. https://t.co/rt5vZMhvms  Thanks to all 839 clawtributors! You make this project specia",
    likes: 3719,
    reposts: 188,
    url: "https://x.com/steipete/status/2026474687576916024",
  },
  {
    handle: "@zacxbt",
    name: "zac.eth 🧙🏻‍♂️♦️",
    text: "don't have a mac mini?  i created a guide to set up @openclaw via VPS for less than $5/mo  https://t.co/rJTN6U15gV https://t.co/NccZrv9cFe",
    likes: 3576,
    reposts: 275,
    url: "https://x.com/zacxbt/status/2015212211484983412",
  },
  {
    handle: "@0xgaut",
    name: "gaut",
    text: "they are out here creating claude code tamagotchis and I’m so here for it  https://t.co/rR27Nfq7xc",
    likes: 3413,
    reposts: 218,
    url: "https://x.com/0xgaut/status/2014752660302246092",
  },
  {
    handle: "@DavidOndrej1",
    name: "David Ondrej",
    text: "Clawdbot really changed the game...      But most people don't know how to set it up  In these 20 mins, you'll learn everything about Clawdbot https://t.co/YtrV84pSGQ",
    likes: 3301,
    reposts: 421,
    url: "https://x.com/DavidOndrej1/status/2015789952571687345",
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
    handle: "@davemorin",
    name: "Dave Morin 🦞",
    text: "🦞 Been working with Peter Steinberger (@steipete) on the OpenClaw Foundation structure for weeks. A home for thinkers and hackers and those that want to own their data. Honored to serve as the founding independent board",
    likes: 2735,
    reposts: 164,
    url: "https://x.com/davemorin/status/2023171737949442301",
  },
  {
    handle: "@CamaradaVini",
    name: "Vini 💢⚪️⚫️",
    text: "@openclaw https://t.co/htIczR3AVx",
    likes: 2069,
    reposts: 156,
    url: "https://x.com/CamaradaVini/status/2017108388992123383",
  },
  {
    handle: "@ryancarson",
    name: "Ryan Carson",
    text: "Holy shit.   Now I've truly seen the light with @openclaw.  This is not a toy or a shiny object.  This is how you'll \"hire\" engineers in the future.  It's setup on my iMac next to me, with it's own github account, verc",
    likes: 1999,
    reposts: 118,
    url: "https://x.com/ryancarson/status/2018343411087016048",
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
          Real user posts from X raving about OpenClaw — all with 300+ likes.
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
