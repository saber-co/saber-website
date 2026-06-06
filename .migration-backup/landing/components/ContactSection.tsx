"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const headingBlockRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    const payload = {
      name: String(formData.get("name") ?? ""),
      company: String(formData.get("company") ?? ""),
      email: String(formData.get("email") ?? ""),
      challenge: String(formData.get("challenge") ?? ""),
    }

    try {
      const res = await fetch("/api/demo-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || "Failed to submit")
      }

      setSubmitted(true)
      form.reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="parallax-section relative flex min-h-screen flex-col px-6 pt-20 pb-14 md:px-12 lg:px-20"
      style={{
        background:
          "radial-gradient(1000px 900px at 50% 50%, rgba(220,38,38,0.18), transparent 65%), radial-gradient(600px 400px at 50% 0%, rgba(255,255,255,0.03), transparent 60%), linear-gradient(180deg, rgba(5,5,5,1) 0%, rgba(4,4,4,1) 100%)",
      }}
    >
      {/* Top divider */}
      <div className="absolute top-0 left-6 right-6 md:left-12 md:right-12 lg:left-20 lg:right-20 h-px bg-white/[0.08]" />

      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col">
        <div ref={headingBlockRef}>
          <p className="text-xs uppercase tracking-[0.35em] text-white/50 mb-4">
            Implementation inquiry
          </p>
          <h2 className="text-balance text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-3">
            Book your OpenClaw implementation call.
          </h2>
          <p className="text-base text-white/55 mb-4 font-mono leading-relaxed">
            Tell us your biggest operational bottleneck. We&apos;ll show you exactly how we implement OpenClaw for your workflows in your own environment.
          </p>
          <div className="mb-10 flex flex-wrap gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.2em] text-white/30 font-mono">
            <span>Free workflow audit included</span>
            <span>&middot;</span>
            <span>Live in 7 days</span>
            <span>&middot;</span>
            <span>No commitment</span>
          </div>
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
                placeholder="Your name"
                className="w-full border-2 border-white/80 bg-[#0a0a0a] px-5 py-4 text-base text-white placeholder:text-white/35 focus:outline-none focus:border-red-500/60"
              />
            </div>
            <div>
              <label htmlFor="company" className="sr-only">Company Name</label>
              <input
                id="company"
                name="company"
                type="text"
                required
                placeholder="Company name"
                className="w-full border-2 border-white/80 bg-[#0a0a0a] px-5 py-4 text-base text-white placeholder:text-white/35 focus:outline-none focus:border-red-500/60"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="sr-only">Work Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Work email"
              className="w-full border-2 border-white/80 bg-[#0a0a0a] px-5 py-4 text-base text-white placeholder:text-white/35 focus:outline-none focus:border-red-500/60"
            />
          </div>

          <div className="flex flex-1 flex-col">
            <label htmlFor="challenge" className="sr-only">Biggest operational bottleneck</label>
            <textarea
              id="challenge"
              name="challenge"
              required
              placeholder="What's your biggest operational bottleneck? (e.g., slow lead response, manual data entry, after-hours coverage)"
              className="flex-1 w-full border-2 border-white/80 bg-[#0a0a0a] px-5 py-4 text-base text-white placeholder:text-white/35 focus:outline-none focus:border-red-500/60 resize-none"
            />
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="mechanical w-full border-2 border-white/90 bg-white px-6 py-5 text-base font-semibold text-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Book Implementation Call"}
            </button>
            {submitted ? (
              <p className="text-sm text-white/50">
                We&apos;ve received your request. A Saber team member will reach out with your OpenClaw implementation plan.
              </p>
            ) : null}
            {error ? <p className="text-sm text-red-300">{error}</p> : null}
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
