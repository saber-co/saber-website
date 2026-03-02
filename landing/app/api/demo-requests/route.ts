import { NextResponse } from "next/server"

const TABLE = "demo_requests"
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 5
const MIN_NAME_LENGTH = 2
const MIN_COMPANY_LENGTH = 2
const MIN_CHALLENGE_LENGTH = 20

type RateLimitEntry = {
  count: number
  resetAt: number
}

// Process-local limiter to reduce abuse; resets as entries expire.
const requestCountsByIp = new Map<string, RateLimitEntry>()

function getClientIp(req: Request) {
  const xForwardedFor = req.headers.get("x-forwarded-for")
  if (xForwardedFor) {
    const [firstIp] = xForwardedFor.split(",")
    if (firstIp) return firstIp.trim()
  }

  return req.headers.get("x-real-ip")?.trim() || "unknown"
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const name = String(body?.name ?? "").trim()
    const company = String(body?.company ?? "").trim()
    const email = String(body?.email ?? "").trim()
    const challenge = String(body?.challenge ?? "").trim()
    const website = String(body?.website ?? "").trim()

    const now = Date.now()
    const ip = getClientIp(req)
    const existing = requestCountsByIp.get(ip)

    if (existing && existing.resetAt <= now) {
      requestCountsByIp.delete(ip)
    }

    const current = requestCountsByIp.get(ip)
    if (current && current.count >= RATE_LIMIT_MAX_REQUESTS) {
      const retryAfterSeconds = Math.ceil((current.resetAt - now) / 1000)
      return NextResponse.json(
        {
          error: "Too many requests. Please try again later.",
          retryAfterSeconds,
        },
        { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } },
      )
    }

    if (current) {
      current.count += 1
    } else {
      requestCountsByIp.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    }

    if (!name || !company || !email || !challenge) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (website) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 })
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    if (name.length < MIN_NAME_LENGTH) {
      return NextResponse.json(
        { error: `Name must be at least ${MIN_NAME_LENGTH} characters` },
        { status: 400 },
      )
    }

    if (company.length < MIN_COMPANY_LENGTH) {
      return NextResponse.json(
        { error: `Company must be at least ${MIN_COMPANY_LENGTH} characters` },
        { status: 400 },
      )
    }

    if (challenge.length < MIN_CHALLENGE_LENGTH) {
      return NextResponse.json(
        { error: `Challenge must be at least ${MIN_CHALLENGE_LENGTH} characters` },
        { status: 400 },
      )
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    const supabaseAnonOrPublishableKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const supabaseKey = supabaseServiceRoleKey || supabaseAnonOrPublishableKey

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 })
    }

    const payload = {
      name,
      company,
      email,
      challenge,
      source: "landing",
      created_at: new Date().toISOString(),
    }

    const res = await fetch(`${supabaseUrl}/rest/v1/${TABLE}`, {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    })

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json(
        { error: "Failed to save demo request", details: text.slice(0, 300) },
        { status: 502 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
