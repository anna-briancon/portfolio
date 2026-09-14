import { getDb } from "./db"
import type { AnalyticsSummary, VisitorSession } from "./types"

export function upsertSession(sessionId: string, ip: string | null, userAgent: string | null) {
  const db = getDb()
  const existing = db
    .prepare("SELECT id FROM analytics_sessions WHERE id = ?")
    .get(sessionId) as { id: string } | undefined

  if (existing) {
    db.prepare(
      "UPDATE analytics_sessions SET last_seen_at = datetime('now') WHERE id = ?"
    ).run(sessionId)
    return
  }

  db.prepare(
    "INSERT INTO analytics_sessions (id, ip, user_agent) VALUES (?, ?, ?)"
  ).run(sessionId, ip, userAgent)
}

export function trackEvent(
  sessionId: string,
  eventType: string,
  path: string | null = null,
  metadata: Record<string, unknown> | null = null
) {
  const db = getDb()
  upsertSession(sessionId, null, null)
  db.prepare(
    `INSERT INTO analytics_events (session_id, event_type, path, metadata)
     VALUES (?, ?, ?, ?)`
  ).run(sessionId, eventType, path, metadata ? JSON.stringify(metadata) : null)
  db.prepare(
    "UPDATE analytics_sessions SET last_seen_at = datetime('now') WHERE id = ?"
  ).run(sessionId)
}

export function getAnalyticsSummary(): AnalyticsSummary {
  const db = getDb()

  const totalSessions = (
    db.prepare("SELECT COUNT(*) as count FROM analytics_sessions").get() as {
      count: number
    }
  ).count

  const totalVisitors = (
    db
      .prepare(
        `SELECT COUNT(DISTINCT COALESCE(ip, id)) as count FROM analytics_sessions`
      )
      .get() as { count: number }
  ).count

  const totalEvents = (
    db.prepare("SELECT COUNT(*) as count FROM analytics_events").get() as {
      count: number
    }
  ).count

  const visitorsToday = (
    db
      .prepare(
        `SELECT COUNT(*) as count FROM analytics_sessions
         WHERE date(started_at) = date('now')`
      )
      .get() as { count: number }
  ).count

  const visitorsThisWeek = (
    db
      .prepare(
        `SELECT COUNT(*) as count FROM analytics_sessions
         WHERE started_at >= datetime('now', '-7 days')`
      )
      .get() as { count: number }
  ).count

  const sectionViews = db
    .prepare(
      `SELECT path as section, COUNT(*) as count
       FROM analytics_events
       WHERE event_type = 'section_view' AND path IS NOT NULL
       GROUP BY path
       ORDER BY count DESC`
    )
    .all() as { section: string; count: number }[]

  const projectViewsRaw = db
    .prepare(
      `SELECT
         json_extract(metadata, '$.projectId') as projectId,
         COALESCE(json_extract(metadata, '$.title'), path) as title,
         COUNT(*) as count
       FROM analytics_events
       WHERE event_type = 'project_view'
       GROUP BY projectId, title
       ORDER BY count DESC
       LIMIT 10`
    )
    .all() as { projectId: number | null; title: string; count: number }[]

  const projectViews = projectViewsRaw.map((row) => ({
    projectId: Number(row.projectId || 0),
    title: row.title || "Projet",
    count: row.count,
  }))

  const dailyVisits = db
    .prepare(
      `SELECT date(started_at) as date, COUNT(*) as count
       FROM analytics_sessions
       WHERE started_at >= datetime('now', '-14 days')
       GROUP BY date(started_at)
       ORDER BY date ASC`
    )
    .all() as { date: string; count: number }[]

  const recentSessionRows = db
    .prepare(
      `SELECT id, started_at as startedAt, last_seen_at as lastSeenAt
       FROM analytics_sessions
       ORDER BY last_seen_at DESC
       LIMIT 20`
    )
    .all() as { id: string; startedAt: string; lastSeenAt: string }[]

  const recentSessions: VisitorSession[] = recentSessionRows.map((session) => {
    const events = db
      .prepare(
        `SELECT event_type as eventType, path, created_at as createdAt
         FROM analytics_events
         WHERE session_id = ?
         ORDER BY created_at ASC`
      )
      .all(session.id) as {
      eventType: string
      path: string | null
      createdAt: string
    }[]

    const path = events
      .filter((e) => e.eventType === "section_view" && e.path)
      .map((e) => e.path as string)

    return {
      id: session.id,
      startedAt: session.startedAt,
      lastSeenAt: session.lastSeenAt,
      eventCount: events.length,
      path: path.length > 0 ? path : ["accueil"],
    }
  })

  return {
    totalVisitors,
    totalSessions,
    totalEvents,
    visitorsToday,
    visitorsThisWeek,
    sectionViews,
    projectViews,
    recentSessions,
    dailyVisits,
  }
}
