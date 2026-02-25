"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [submitted, setSubmitted] = useState(false)

  const headingBlockRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Heading block scrubs in
      if (headingBlockRef.current) {
        gsap.fromTo(
          headingBlockRef.current,
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
          }
        )
      }

      // Form scrubs in slightly later
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
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
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="parallax-section relative flex min-h-screen flex-col px-6 pt-20 pb-14 md:px-12 lg:px-20"
      style={{
        background:
          "radial-gradient(1000px 900px at 50% 50%, rgba(220,38,38,0.18), transparent 65%), radial-gradient(600px 400px at 50% 0%, rgba(255,255,255,0.03), transparent 60%), linear-gradient(180deg, rgba(6,5,5,1) 0%, rgba(4,4,4,1) 100%)",
      }}
    >
      {/* Top divider */}
      <div className="absolute top-0 left-6 right-6 md:left-12 md:right-12 lg:left-20 lg:right-20 h-px bg-white/[0.08]" />

      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col">
        <div ref={headingBlockRef}>
          <p className="text-xs uppercase tracking-[0.35em] text-white/50 mb-4">
            Contact
          </p>
          <h2 className="text-balance text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-5">
            Build your automation layer.
          </h2>
          <p className="text-base text-white/55 mb-12 font-mono leading-relaxed">
            Share the workflows you want to streamline. We&apos;ll propose a clean OpenClaw rollout.
          </p>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col gap-6"
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Name"
                className="w-full border-2 border-white/80 bg-[#0a0a0a] px-5 py-4 text-base text-white placeholder:text-white/35 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="company" className="sr-only">Company Name</label>
              <input
                id="company"
                name="company"
                type="text"
                required
                placeholder="Company Name"
                className="w-full border-2 border-white/80 bg-[#0a0a0a] px-5 py-4 text-base text-white placeholder:text-white/35 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Email"
              className="w-full border-2 border-white/80 bg-[#0a0a0a] px-5 py-4 text-base text-white placeholder:text-white/35 focus:outline-none"
            />
          </div>

          <div className="flex flex-1 flex-col">
            <label htmlFor="challenge" className="sr-only">Problem You Want to Solve</label>
            <textarea
              id="challenge"
              name="challenge"
              required
              placeholder="Problem you want to solve"
              className="flex-1 w-full border-2 border-white/80 bg-[#0a0a0a] px-5 py-4 text-base text-white placeholder:text-white/35 focus:outline-none resize-none"
            />
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="submit"
              className="mechanical w-full border-2 border-white/90 bg-[#0a0a0a] px-6 py-5 text-base font-semibold text-white"
            >
              Sign Up
            </button>
            {submitted ? (
              <p className="text-sm text-white/50">
                Thanks — your information has been recorded.
              </p>
            ) : null}
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="mx-auto max-w-6xl mt-36 pt-4 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-3 w-full">
        <span className="text-white font-sans text-sm font-bold tracking-tight">
          SABER
        </span>
        <p className="text-xs text-white/30">
          &copy; {new Date().getFullYear()} Saber. All rights reserved.
        </p>
      </div>
    </section>
  )
}
