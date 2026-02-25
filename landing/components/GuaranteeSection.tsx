"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const guarantees = [
  {
    title: "Live in 7 days",
    description: "Your first workflow is deployed and handling real tasks within one week. If we miss the deadline, the pilot is free.",
  },
  {
    title: "Measurable ROI or you walk",
    description: "We track every metric from day one. If you don't see clear time or cost savings by the end of your pilot, you owe nothing.",
  },
  {
    title: "Zero lock-in",
    description: "No annual contracts. No proprietary data formats. Your workflows, your data, your choice to stay or leave.",
  },
]

export function GuaranteeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="guarantee"
      className="parallax-section relative px-6 py-24 md:px-12 md:py-32 lg:px-20"
      style={{
        background:
          "radial-gradient(900px 600px at 50% 50%, rgba(220,38,38,0.14), transparent 60%), linear-gradient(180deg, rgba(6,5,5,1) 0%, rgba(5,5,5,1) 100%)",
      }}
    >
      <div ref={contentRef} className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-white/50">
            Our Guarantee
          </p>
          <h2 className="mx-auto max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl">
            We don&apos;t ask you to believe us. We ask you to test us.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm/relaxed text-white/45 md:text-base/relaxed">
            Every Saber engagement starts with a risk-free pilot. Real workflows, real results, real accountability.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-0 md:grid-cols-3">
          {guarantees.map((item, index) => (
            <div
              key={item.title}
              className="group border-2 border-white/20 bg-[#0a0a0a] px-6 py-8 transition-none hover:border-white/60 hover:bg-white hover:text-black md:px-8 md:py-10"
            >
              <div className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-red-500/80 group-hover:text-red-600">
                0{index + 1}
              </div>
              <h3 className="text-xl font-semibold tracking-tight text-white group-hover:text-black md:text-2xl">
                {item.title}
              </h3>
              <p className="mt-3 text-sm/relaxed text-white/50 group-hover:text-black/70">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="#contact"
            className="mechanical inline-flex items-center justify-center bg-white px-14 py-5 text-sm font-semibold uppercase tracking-wider text-black sm:px-20"
          >
            Start Your Risk-Free Pilot
          </Link>
          <p className="mt-4 text-xs text-white/30 font-mono">
            No credit card. No commitment. Just results.
          </p>
        </div>
      </div>
    </section>
  )
}
