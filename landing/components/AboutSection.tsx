"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const paragraphRef = useRef<HTMLParagraphElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return

    const ctx = gsap.context(() => {
      // Main container fades and slides up
      gsap.fromTo(
        textRef.current,
        { y: 60, opacity: 0 },
        {
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 95%",
            end: "top 55%",
            scrub: 0.8,
          },
          y: 0,
          opacity: 1,
          ease: "none",
        }
      )

      // Heading gets a slight scale effect
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { scale: 0.92, opacity: 0 },
          {
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 90%",
              end: "top 50%",
              scrub: 0.8,
            },
            scale: 1,
            opacity: 1,
            ease: "none",
          }
        )
      }

      // Paragraph slides in slightly later
      if (paragraphRef.current) {
        gsap.fromTo(
          paragraphRef.current,
          { y: 30, opacity: 0 },
          {
            scrollTrigger: {
              trigger: paragraphRef.current,
              start: "top 95%",
              end: "top 60%",
              scrub: 0.8,
            },
            y: 0,
            opacity: 1,
            ease: "none",
          }
        )
      }

      // Stats grid scrubs in
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current,
          { y: 40, opacity: 0 },
          {
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 95%",
              end: "top 65%",
              scrub: 0.8,
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

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative px-6 py-32 md:px-12 lg:px-20"
      style={{ background: "#050505" }}
    >
      {/* Top divider */}
      <div className="absolute top-0 left-6 right-6 md:left-12 md:right-12 lg:left-20 lg:right-20 h-px bg-white/[0.08]" />

      <div ref={textRef} className="mx-auto max-w-5xl">
        <p className="text-xs font-mono uppercase tracking-widest text-[#2D5BFF] mb-8">
          About
        </p>

        <h2 ref={headingRef} className="text-balance text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-8">
          Engineering Efficiency.
        </h2>

        <p ref={paragraphRef} className="text-lg md:text-xl text-white/50 leading-relaxed max-w-3xl">
          Saber bridges the gap between human expertise and machine speed to
          reduce manpower overhead. We believe the future of operations is
          autonomous, precise, and invisible -- infrastructure that works so
          well, you forget it is there.
        </p>

        <div ref={statsRef} className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="border-t border-white/[0.08] pt-6">
            <span className="text-3xl font-bold text-white">80%</span>
            <p className="text-sm text-white/40 mt-1">Average process reduction</p>
          </div>
          <div className="border-t border-white/[0.08] pt-6">
            <span className="text-3xl font-bold text-white">{'< 48h'}</span>
            <p className="text-sm text-white/40 mt-1">Discovery to architecture</p>
          </div>
          <div className="border-t border-white/[0.08] pt-6">
            <span className="text-3xl font-bold text-white">24/7</span>
            <p className="text-sm text-white/40 mt-1">Autonomous operation</p>
          </div>
        </div>
      </div>
    </section>
  )
}
