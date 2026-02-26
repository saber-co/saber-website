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
    handle: "@AlexFinn",
    name: "Alex Finn",
    text: "Just to see what would happen I texted Henry my Clawdbot to make a reservation for me next Saturday at a restaurant  When the OpenTable res didn't work, it used it's ElevenLabs skill to call the restaurant and complete t",
    likes: 5800,
    reposts: 284,
    url: "https://x.com/AlexFinn/status/2015266546600550755",
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
    handle: "@ryancarson",
    name: "Ryan Carson",
    text: "Holy shit.   Now I've truly seen the light with @openclaw.  This is not a toy or a shiny object.  This is how you'll \"hire\" engineers in the future.  It's setup on my iMac next to me, with it's own github account, vercel",
    likes: 1999,
    reposts: 118,
    url: "https://x.com/ryancarson/status/2018343411087016048",
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
    handle: "@steipete",
    name: "Peter Steinberger 🦞",
    text: "@hznus @openclaw @AlexFinn Guardrails: - enable sandbox - enable white-list if you want to run commands out of it - read security doc - use model that has best-what-we-have prompt inject defense - run `clawdbot security",
    likes: 1855,
    reposts: 129,
    url: "https://x.com/steipete/status/2015266538371125727",
  },
  {
    handle: "@MiniMax_AI",
    name: "MiniMax (official)",
    text: "🦞To run a good Clawdbot, you need a model that has Trader Joes quality, Amazon Prime speed, and Temu prices.  🦞Here's how to get Clawdbot up and running with ClawdBotFather @steipete's personally recommended model, ✨M2.1",
    likes: 1417,
    reposts: 124,
    url: "https://x.com/MiniMax_AI/status/2014380057301811685",
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
    handle: "@emcro",
    name: "Emmanuel Crouvisier",
    text: "I’ve become worse than a CrossFit bro or a Vegan since I set up @openclaw last week.  Nearly everyone I talk to now I ask “do you claw?”  Not overhyped at all if you empower it and let it be proactive. The more access an",
    likes: 400,
    reposts: 35,
    url: "https://x.com/emcro/status/2018295105333903406",
  },
  {
    handle: "@davemorin",
    name: "Dave Morin 🦞",
    text: "At this point I don't even know what to call @openclaw. It is something new. After a few weeks in with it, this is the first time I have felt like I am living in the future since the launch of ChatGPT.",
    likes: 387,
    reposts: 23,
    url: "https://x.com/davemorin/status/2013723700668096605",
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
    handle: "@josesaezmerino",
    name: "Jose",
    text: "My Clawdbot lives in a Mac mini inside a G4 iMac. I asked it to create an animated face for itself and it just did it. Even added a sleeping animation I didn’t ask for initially.  Incredible @steipete https://t.co/gjL8g9",
    likes: 6149,
    reposts: 323,
    url: "https://x.com/josesaezmerino/status/2015893535522770956",
  },
  {
    handle: "@flaviocopes",
    name: "flavio",
    text: "“Mom, how did we get so rich?”    “Your father bought a Mac Mini to run @openclaw in 2026\" https://t.co/XpiR90CIpm",
    likes: 633,
    reposts: 33,
    url: "https://x.com/flaviocopes/status/2014653140977541540",
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
          Real user posts about OpenClaw features and use cases — all with 300+ likes.
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
