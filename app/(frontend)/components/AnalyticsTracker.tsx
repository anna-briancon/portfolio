"use client"

import { useEffect, useRef } from "react"

async function sendEvent(
  eventType: string,
  path?: string,
  metadata?: Record<string, unknown>
) {
  try {
    await fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventType, path, metadata }),
      keepalive: true,
    })
  } catch {
    // silent fail — analytics must never break the site
  }
}

export function useAnalytics(currentSection: string) {
  const started = useRef(false)
  const lastSection = useRef<string | null>(null)

  useEffect(() => {
    if (!started.current) {
      started.current = true
      sendEvent("session_start", "accueil")
      sendEvent("section_view", "accueil")
      lastSection.current = "accueil"
    }
  }, [])

  useEffect(() => {
    if (!started.current) return
    if (lastSection.current === currentSection) return
    lastSection.current = currentSection
    sendEvent("section_view", currentSection)
  }, [currentSection])
}

export function trackProjectView(projectId: number, title: string) {
  void sendEvent("project_view", "projets", { projectId, title })
}
