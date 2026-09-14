import { NextResponse } from "next/server"
import { randomUUID } from "node:crypto"
import { cookies } from "next/headers"
import { trackEvent, upsertSession } from "@/lib/analytics"

export const runtime = "nodejs"

const SESSION_COOKIE = "visitor_session"

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown"
  return request.headers.get("x-real-ip")?.trim() || "unknown"
}

export async function POST(request: Request) {
  let body: {
    eventType?: string
    path?: string
    metadata?: Record<string, unknown>
  }

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 })
  }

  if (!body.eventType) {
    return NextResponse.json({ error: "eventType requis" }, { status: 400 })
  }

  const cookieStore = await cookies()
  let sessionId = cookieStore.get(SESSION_COOKIE)?.value
  const isNew = !sessionId

  if (!sessionId) {
    sessionId = randomUUID()
    cookieStore.set(SESSION_COOKIE, sessionId, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    })
  }

  if (isNew || body.eventType === "session_start") {
    upsertSession(sessionId, getClientIp(request), request.headers.get("user-agent"))
  }

  trackEvent(sessionId, body.eventType, body.path || null, body.metadata || null)

  return NextResponse.json({ success: true, sessionId })
}
