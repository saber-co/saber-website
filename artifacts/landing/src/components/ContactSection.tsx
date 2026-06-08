"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SaberLogo } from "./SaberLogo"
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
          <p className="kicker mb-5">Start a project</p>
          <h2 className="mb-4 text-balance font-display text-4xl font-medium tracking-tight text-ink md:text-6xl">
            Let&apos;s build your <span className="ink-italic">agent.</span>
          </h2>
          <p className="mb-5 text-base leading-relaxed text-ink/70">
            Tell us the workflow that&apos;s eating your team&apos;s time. We&apos;ll
            show you exactly what an AI agent would own — and how it runs in your
            own environment.
          </p>
          <div className="mb-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/45">
            <span>Free workflow audit</span>
            <span aria-hidden>&middot;</span>
            <span>Runs in your infra</span>
            <span aria-hidden>&middot;</span>
            <span>No commitment</span>
          </div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-1 flex-col gap-6">
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
                className="field"
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
                className="field"
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
              className="field"
            />
          </div>

          <div className="flex flex-1 flex-col">
            <label htmlFor="challenge" className="sr-only">The workflow you want an agent to own</label>
            <textarea
              id="challenge"
              name="challenge"
              required
              maxLength={createDemoRequestBodyChallengeMax}
              placeholder="What workflow do you want an agent to own? (e.g., slow lead response, manual reporting, after-hours coverage)"
              className="field min-h-[160px] flex-1 resize-none"
            />
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="btn-vermilion w-full px-6 py-4 text-sm disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Sending..." : "Start the conversation"}
            </button>
            {submitted ? (
              <p className="text-sm text-ink/70">
                We&apos;ve received your request. A Saber team member will reach out
                with a plan for your agent.
              </p>
            ) : null}
            {error ? <p className="text-sm text-[#b42318]">{error}</p> : null}
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="relative z-10 mx-auto mt-28 flex w-full max-w-[1200px] flex-col items-center justify-between gap-3 border-t border-ink/15 pt-6 sm:flex-row">
        <SaberLogo
          markClassName="h-6 w-6 text-ink"
          wordClassName="font-display text-base font-semibold tracking-tight text-ink"
        />
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45">
          &copy; {new Date().getFullYear()} Saber &middot; We build AI agents for you
        </p>
      </div>
    </section>
  )
}
