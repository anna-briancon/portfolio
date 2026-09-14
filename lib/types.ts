export interface Project {
  id: number
  title: string
  category: string
  techno: string
  description: string
  text: string
  images: string[]
  websiteUrl: string | null
}

export interface ProjectInput {
  title: string
  category: string
  techno: string
  description: string
  text: string
  images: string[]
  websiteUrl: string | null
}

export interface AnalyticsEvent {
  id: number
  sessionId: string
  eventType: string
  path: string | null
  metadata: string | null
  createdAt: string
}

export interface VisitorSession {
  id: string
  startedAt: string
  lastSeenAt: string
  eventCount: number
  path: string[]
}

export interface AnalyticsSummary {
  totalVisitors: number
  totalSessions: number
  totalEvents: number
  visitorsToday: number
  visitorsThisWeek: number
  sectionViews: { section: string; count: number }[]
  projectViews: { projectId: number; title: string; count: number }[]
  recentSessions: VisitorSession[]
  dailyVisits: { date: string; count: number }[]
}
