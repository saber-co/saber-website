"use client"

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"

const INK = "#1a1611"
const BRAND = "#ff4a23"
const GRID = "rgba(26, 22, 17, 0.12)"
const TICK = "#6b6453"

const tickStyle = {
  fontFamily: "var(--font-mono), monospace",
  fontSize: 11,
  fill: TICK,
}

const responseData = [
  { label: "Before", minutes: 312 },
  { label: "With agent", minutes: 0.5 },
]

const reclaimedData = [
  { week: "W1", hours: 6 },
  { week: "W2", hours: 11 },
  { week: "W3", hours: 18 },
  { week: "W4", hours: 24 },
  { week: "W5", hours: 31 },
  { week: "W6", hours: 37 },
  { week: "W7", hours: 42 },
  { week: "W8", hours: 46 },
]

const autonomyData = [
  { month: "M1", pct: 22 },
  { month: "M2", pct: 41 },
  { month: "M3", pct: 58 },
  { month: "M4", pct: 67 },
  { month: "M5", pct: 73 },
  { month: "M6", pct: 79 },
]

function ChartFrame({
  title,
  unit,
  children,
}: {
  title: string
  unit: string
  children: React.ReactNode
}) {
  return (
    <div className="flat-card flex flex-col p-5">
      <div className="mb-4 flex items-baseline justify-between gap-3 border-b border-ink/15 pb-3">
        <h3 className="font-display text-base font-medium text-ink">{title}</h3>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/45">
          {unit}
        </span>
      </div>
      <div className="h-[220px] w-full">{children}</div>
    </div>
  )
}

export function MetricsSection() {
  return (
    <section
      id="impact"
      className="page-rails relative border-y border-ink/15 bg-[#ece5d4] px-6 pt-20 pb-24 md:px-12 lg:px-20"
    >
      <div className="relative z-10 mx-auto max-w-[1200px]">
        <p className="kicker mb-4">By the numbers</p>
        <h2 className="max-w-2xl font-display text-3xl font-medium tracking-tight text-ink md:text-5xl">
          What changes once your agent goes live.
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink/65">
          Plain charts, no spin. These are the patterns we see across Saber
          builds in the first two quarters.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Hours reclaimed — wide */}
          <div className="lg:col-span-2">
            <ChartFrame title="Team hours reclaimed per week" unit="hours / week">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={reclaimedData}
                  margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="reclaimFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={BRAND} stopOpacity={0.2} />
                      <stop offset="100%" stopColor={BRAND} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke={GRID} strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="week"
                    tick={tickStyle}
                    tickLine={false}
                    axisLine={{ stroke: GRID }}
                  />
                  <YAxis tick={tickStyle} tickLine={false} axisLine={false} width={40} />
                  <Area
                    type="linear"
                    dataKey="hours"
                    stroke={BRAND}
                    strokeWidth={2}
                    fill="url(#reclaimFill)"
                    dot={{ r: 2.5, fill: BRAND, strokeWidth: 0 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartFrame>
          </div>

          {/* Response time */}
          <ChartFrame title="Median first-response time" unit="minutes">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={responseData}
                margin={{ top: 16, right: 8, left: -16, bottom: 0 }}
              >
                <CartesianGrid stroke={GRID} strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="label"
                  tick={tickStyle}
                  tickLine={false}
                  axisLine={{ stroke: GRID }}
                />
                <YAxis tick={tickStyle} tickLine={false} axisLine={false} width={40} />
                <Bar dataKey="minutes" barSize={64}>
                  <LabelList
                    dataKey="minutes"
                    position="top"
                    style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, fill: INK }}
                  />
                  {responseData.map((entry) => (
                    <Cell
                      key={entry.label}
                      fill={entry.label === "With agent" ? BRAND : INK}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartFrame>

          {/* Autonomy */}
          <ChartFrame title="Routine requests resolved without a human" unit="% of volume">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={autonomyData}
                margin={{ top: 16, right: 8, left: -16, bottom: 0 }}
              >
                <CartesianGrid stroke={GRID} strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={tickStyle}
                  tickLine={false}
                  axisLine={{ stroke: GRID }}
                />
                <YAxis
                  tick={tickStyle}
                  tickLine={false}
                  axisLine={false}
                  width={40}
                  domain={[0, 100]}
                />
                <Bar dataKey="pct" barSize={26}>
                  <LabelList
                    dataKey="pct"
                    position="top"
                    style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, fill: INK }}
                  />
                  {autonomyData.map((entry, i) => (
                    <Cell
                      key={entry.month}
                      fill={i === autonomyData.length - 1 ? BRAND : INK}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartFrame>
        </div>

        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/40">
          Figures illustrate typical outcomes across Saber builds, not a guarantee.
        </p>
      </div>
    </section>
  )
}
