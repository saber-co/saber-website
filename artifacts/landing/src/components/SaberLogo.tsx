export function SaberMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="1.1"
        y="1.1"
        width="25.8"
        height="25.8"
        rx="4.5"
        fill="currentColor"
      />
      <path
        d="M7.4 20.6 L20.6 7.4"
        stroke="#f2ede1"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="7.6" cy="20.4" r="2" fill="#ff4a23" />
    </svg>
  )
}

export function SaberLogo({
  className = "",
  markClassName = "h-7 w-7 text-ink",
  wordClassName = "font-display text-xl font-semibold tracking-tight text-ink",
}: {
  className?: string
  markClassName?: string
  wordClassName?: string
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <SaberMark className={markClassName} />
      <span className={wordClassName}>Scroll</span>
    </span>
  )
}
