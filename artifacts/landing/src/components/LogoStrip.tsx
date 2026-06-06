const logos = [
  "Founders Inc",
  "University of Cincinnati",
  "Cerebral Valley",
  "Network School",
]

export function LogoStrip() {
  return (
    <section className="page-rails relative border-y border-black/[0.07] bg-[#fbfbfa]">
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-12 md:py-16">
        <p className="mb-8 text-center text-sm font-medium text-zinc-500">
          Founders from
        </p>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-black/[0.07] bg-black/[0.06] sm:grid-cols-4">
          {logos.map((name) => (
            <div
              key={name}
              className="flex items-center justify-center gap-2 bg-white px-4 py-7"
            >
              <span className="h-5 w-5 rounded-md bg-zinc-200" aria-hidden="true" />
              <span className="font-display text-base font-semibold tracking-tight text-zinc-400">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
