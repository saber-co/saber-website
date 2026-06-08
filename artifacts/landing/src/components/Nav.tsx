import { useEffect, useState } from "react"
import { SaberLogo } from "./SaberLogo"

const links = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Impact", href: "#impact" },
  { label: "Signal", href: "#signal" },
  { label: "Contact", href: "#contact" },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full">
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "border-b border-ink/15 bg-[#f2ede1]/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
          <a href="#top" aria-label="Saber home">
            <SaberLogo />
          </a>

          <div className="hidden items-center gap-9 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-ink/65 transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="#contact" className="btn-ink px-4 py-2">
              Book a call
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
