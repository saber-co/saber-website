"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  CreateDemoRequestBody,
  createDemoRequestBodyNameMax,
  createDemoRequestBodyCompanyMax,
  createDemoRequestBodyEmailMax,
  createDemoRequestBodyChallengeMax,
} from "@workspace/api-zod"

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
      name: String(formData.get("name") ?? "").trim(),
      company: String(formData.get("company") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      challenge: String(formData.get("challenge") ?? "").trim(),
    }

    const validation = CreateDemoRequestBody.safeParse(payload)
    if (!validation.success) {
      setError(validation.error.issues[0]?.message ?? "Please check the form and try again.")
      setSubmitting(false)
      return
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
      className="page-rails relative flex flex-col px-6 pt-20 pb-14 md:px-12 lg:px-20"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col">
        <div ref={headingBlockRef}>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.28em] text-[#dc2626]">
            Implementation inquiry
          </p>
          <h2 className="mb-3 text-balance font-display text-4xl font-semibold tracking-tight text-zinc-900 md:text-5xl lg:text-6xl">
            Book your AI agent implementation call.
          </h2>
          <p className="mb-4 text-base leading-relaxed text-zinc-600">
            Tell us your biggest operational bottleneck. We&apos;ll show you exactly how we implement AI agents for your workflows in your own environment.
          </p>
          <div className="mb-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400">
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
                maxLength={createDemoRequestBodyNameMax}
                placeholder="Your name"
                className="w-full rounded-xl border border-black/[0.12] bg-white px-5 py-4 text-base text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-[#dc2626] focus:outline-none focus:ring-2 focus:ring-[#dc2626]/15"
              />
            </div>
            <div>
              <label htmlFor="company" className="sr-only">Company Name</label>
              <input
                id="company"
                name="company"
                type="text"
                required
                maxLength={createDemoRequestBodyCompanyMax}
                placeholder="Company name"
                className="w-full rounded-xl border border-black/[0.12] bg-white px-5 py-4 text-base text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-[#dc2626] focus:outline-none focus:ring-2 focus:ring-[#dc2626]/15"
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
              maxLength={createDemoRequestBodyEmailMax}
              placeholder="Work email"
              className="w-full rounded-xl border border-black/[0.12] bg-white px-5 py-4 text-base text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-[#dc2626] focus:outline-none focus:ring-2 focus:ring-[#dc2626]/15"
            />
          </div>

          <div className="flex flex-1 flex-col">
            <label htmlFor="challenge" className="sr-only">Biggest operational bottleneck</label>
            <textarea
              id="challenge"
              name="challenge"
              required
              maxLength={createDemoRequestBodyChallengeMax}
              placeholder="What's your biggest operational bottleneck? (e.g., slow lead response, manual data entry, after-hours coverage)"
              className="min-h-[160px] w-full flex-1 resize-none rounded-xl border border-black/[0.12] bg-white px-5 py-4 text-base text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-[#dc2626] focus:outline-none focus:ring-2 focus:ring-[#dc2626]/15"
            />
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="btn-accent w-full px-6 py-4 text-base disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Book Implementation Call"}
            </button>
            {submitted ? (
              <p className="text-sm text-zinc-600">
                We&apos;ve received your request. A Saber team member will reach out with your AI agent implementation plan.
              </p>
            ) : null}
            {error ? <p className="text-sm text-[#dc2626]">{error}</p> : null}
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="relative z-10 mx-auto mt-28 flex w-full max-w-[1200px] flex-col items-center justify-between gap-3 border-t border-black/[0.08] pt-6 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#dc2626] text-xs font-bold text-white">
            S
          </span>
          <span className="font-display text-sm font-bold tracking-tight text-zinc-900">
            Saber
          </span>
        </div>
        <p className="text-xs text-zinc-400">
          &copy; {new Date().getFullYear()} Saber. All rights reserved.
        </p>
      </div>
    </section>
  )
}
