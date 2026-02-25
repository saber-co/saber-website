"use client"

import Link from "next/link"
import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const cardRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Video scales down and fades as you scroll away from hero
      if (videoContainerRef.current) {
        gsap.to(videoContainerRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
          scale: 0.92,
          opacity: 0.3,
          ease: "none",
        })
      }

      // Card content slides down and fades out
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "80% top",
            scrub: 0.6,
          },
          y: 80,
          opacity: 0,
          ease: "none",
        })
      }

      // Nav fades out
      if (navRef.current) {
        gsap.to(navRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "40% top",
            scrub: 0.6,
          },
          y: -20,
          opacity: 0,
          ease: "none",
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="p-[1.5%]"
      style={{
        background:
          "radial-gradient(1000px 700px at 50% 80%, rgba(220,38,38,0.18), transparent 60%), linear-gradient(180deg, rgba(4,4,4,0.95) 0%, rgba(5,5,5,0.92) 55%, rgba(5,5,5,1) 100%)",
      }}
    >
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          {/* Desktop mask — y values sized for landscape viewport */}
          <mask id="heroMask" maskContentUnits="objectBoundingBox">
            <rect width="1" height="1" fill="black" />
            <path
              d="M0 0.1474 V0.9863 C0 0.9938 0.0038 0.9996 0.0085 0.9996 H0.9912 C0.9958 0.9996 1 0.9863 1 0.9863 V0.0581 C1 0.0506 0.9958 0.0444 0.9912 0.0444 H0.9255 C0.9208 0.0444 0.9165 0.0383 0.9165 0.0307 V0.0149 C0.9165 0.0074 0.9132 0.0013 0.9084 0.0013 L0.2060 0.0000 C0.2012 -0.0000 0.1975 0.0061 0.1975 0.0137 V0.0312 C0.1975 0.0387 0.1936 0.0448 0.1889 0.0448 H0.0915 C0.0868 0.0448 0.0830 0.0510 0.0830 0.0585 V0.1201 C0.0830 0.1276 0.0792 0.1337 0.0745 0.1337 H0.0085 C0.0038 0.1337 0 0.1399 0 0.1474 Z"
              fill="white"
            />
          </mask>
          {/* Mobile mask — y values × 0.3 to compensate for portrait aspect ratio */}
          <mask id="heroMaskMobile" maskContentUnits="objectBoundingBox">
            <rect width="1" height="1" fill="black" />
            <path
              d="M0 0.0442 V0.9863 C0 0.9938 0.0038 0.9996 0.0085 0.9996 H0.9912 C0.9958 0.9996 1 0.9863 1 0.9863 V0.0174 C1 0.0152 0.9958 0.0133 0.9912 0.0133 H0.9255 C0.9208 0.0133 0.9165 0.0115 0.9165 0.0092 V0.0045 C0.9165 0.0022 0.9132 0.0004 0.9084 0.0004 L0.2060 0.0000 C0.2012 -0.0000 0.1975 0.0018 0.1975 0.0041 V0.0094 C0.1975 0.0116 0.1936 0.0134 0.1889 0.0134 H0.0915 C0.0868 0.0134 0.0830 0.0153 0.0830 0.0176 V0.0360 C0.0830 0.0383 0.0792 0.0401 0.0745 0.0401 H0.0085 C0.0038 0.0401 0 0.0420 0 0.0442 Z"
              fill="white"
            />
          </mask>
        </defs>
      </svg>

      <div className="relative isolate w-full min-h-[calc(100svh-3vh)] sm:min-h-[calc(100svh-3vh)]">
        <div
          ref={videoContainerRef}
          className="hero-video-mask absolute inset-0 overflow-hidden will-change-transform"
        >
          <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover">
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/liquid-metal-video_yX6NvjdW-6bLYorR3Ihmlwjivg3pjA978qrSKRU.mp4" type="video/mp4" />
          </video>

          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/55" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent" />
            <div className="absolute inset-0 [background:radial-gradient(90%_60%_at_10%_70%,rgba(0,0,0,.55)_0%,transparent_70%)]" />
          </div>
        </div>

        {/* Desktop border overlay */}
        <svg
          className="pointer-events-none absolute inset-0 z-[50] hidden md:block"
          viewBox="0 0 1 1"
          preserveAspectRatio="none"
        >
          <path
            d="M0 0.1474 V0.9863 C0 0.9938 0.0038 0.9996 0.0085 0.9996 H0.9912 C0.9958 0.9996 1 0.9863 1 0.9863 V0.0581 C1 0.0506 0.9958 0.0444 0.9912 0.0444 H0.9255 C0.9208 0.0444 0.9165 0.0383 0.9165 0.0307 V0.0149 C0.9165 0.0074 0.9132 0.0013 0.9084 0.0013 L0.2060 0.0000 C0.2012 -0.0000 0.1975 0.0061 0.1975 0.0137 V0.0312 C0.1975 0.0387 0.1936 0.0448 0.1889 0.0448 H0.0915 C0.0868 0.0448 0.0830 0.0510 0.0830 0.0585 V0.1201 C0.0830 0.1276 0.0792 0.1337 0.0745 0.1337 H0.0085 C0.0038 0.1337 0 0.1399 0 0.1474 Z"
            fill="none"
            stroke="#ffffff"
            strokeWidth="0.01"
            strokeLinejoin="miter"
            strokeLinecap="square"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Mobile border overlay — same shape, y values × 0.3 */}
        <svg
          className="pointer-events-none absolute inset-0 z-[50] block md:hidden"
          viewBox="0 0 1 1"
          preserveAspectRatio="none"
        >
          <path
            d="M0 0.0442 V0.9863 C0 0.9938 0.0038 0.9996 0.0085 0.9996 H0.9912 C0.9958 0.9996 1 0.9863 1 0.9863 V0.0174 C1 0.0152 0.9958 0.0133 0.9912 0.0133 H0.9255 C0.9208 0.0133 0.9165 0.0115 0.9165 0.0092 V0.0045 C0.9165 0.0022 0.9132 0.0004 0.9084 0.0004 L0.2060 0.0000 C0.2012 -0.0000 0.1975 0.0018 0.1975 0.0041 V0.0094 C0.1975 0.0116 0.1936 0.0134 0.1889 0.0134 H0.0915 C0.0868 0.0134 0.0830 0.0153 0.0830 0.0176 V0.0360 C0.0830 0.0383 0.0792 0.0401 0.0745 0.0401 H0.0085 C0.0038 0.0401 0 0.0420 0 0.0442 Z"
            fill="none"
            stroke="#ffffff"
            strokeWidth="0.01"
            strokeLinejoin="miter"
            strokeLinecap="square"
            vectorEffect="non-scaling-stroke"
          />
        </svg>


        <div
          ref={contentRef}
          className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center will-change-transform"
        >
          <div
            ref={cardRef}
            className="relative w-full max-w-[min(84rem,96vw)] overflow-hidden border-2 border-white/90 bg-[#0a0a0a] transition-none"
          >

            <div className="relative flex flex-col items-center px-6 py-12 text-center sm:px-10 sm:py-16 md:px-24 md:py-20">

              {/* Headline */}
              <h1 className="max-w-4xl text-4xl/[1.08] font-semibold tracking-tight text-white sm:text-5xl/[1.08] md:text-7xl/[1.08] lg:text-[5.5rem]/[1.08]">
                Automate your ops.{" "}
                <br />
                <span className="text-white/35">Ship without the overhead.</span>
              </h1>

              {/* Description */}
              <p className="mt-6 max-w-lg text-sm/relaxed text-white/45 sm:text-base/relaxed lg:text-lg/relaxed">
                Powerful workflow automation built for speed — configured to fit exactly how your team works.
              </p>

              {/* CTA */}
              <div className="relative mt-8">
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/35 blur-3xl" />
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-20 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/30 blur-2xl" />
                <Link
                  href="#contact"
                  className="mechanical relative inline-flex items-center justify-center bg-white px-20 py-5 text-sm font-semibold uppercase tracking-wider text-black"
                >
                  Sign Up
                </Link>
              </div>

              {/* Bottom feature strip — hidden on small screens */}
              <div className="mt-12 hidden w-full items-center gap-4 border-t border-white/[0.08] pt-5 sm:flex">
                {["Workflows", "Integrations", "Reporting", "Access Control", "Audit Logs"].map((label, i) => (
                  <span
                    key={label}
                    className="flex-1 text-center font-mono text-[9px] uppercase tracking-[0.3em] text-white/22"
                  >
                    {i > 0 && <span className="mr-4 text-white/12">·</span>}
                    {label}
                  </span>
                ))}
              </div>

            </div>
          </div>
        </div>

        <div ref={navRef} className="absolute inset-x-0 top-0 z-20 will-change-transform">
          {/* Mobile: flex row to prevent overlap */}
          <div className="flex items-center justify-between px-4 py-3 md:hidden">
            <span className="text-white font-sans text-lg font-bold tracking-tight">SABER</span>
            <Link
              href="#contact"
              className="mechanical border-2 border-white/90 bg-[#0a0a0a] px-4 py-2 text-sm font-light uppercase tracking-[-0.01em] text-white"
            >
              Sign Up
            </Link>
          </div>
          {/* Desktop: absolute items aligned to mask notches */}
          <div className="hidden md:block">
            <div className="absolute left-[1.5%] top-[1.5%]">
              <span className="text-white font-sans text-lg font-bold tracking-tight">SABER</span>
            </div>
            <div className="absolute right-[0.85%] top-[1.5%]">
              <Link
                href="#contact"
                className="mechanical border-2 border-white/90 bg-[#0a0a0a] px-4 py-2 text-sm font-light uppercase tracking-[-0.01em] text-white"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
