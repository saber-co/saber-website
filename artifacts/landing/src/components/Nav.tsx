import { useEffect, useState } from "react"

const links = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Buzz", href: "#buzz" },
  { label: "Stats", href: "#stats" },
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
            ? "border-b border-black/[0.07] bg-white/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#dc2626] text-sm font-bold text-white">
              S
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-zinc-900">
              Saber
            </span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 sm:inline-flex"
            >
              Sign in
            </a>
            <a href="#contact" className="btn-primary px-4 py-2 text-sm">
              Book a Demo
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
