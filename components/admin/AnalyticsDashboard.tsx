import React from 'react'
import { Gutter } from '@payloadcms/ui'
import { getAnalyticsSummary } from '@/lib/analytics'
import type { AnalyticsSummary } from '@/lib/types'

function formatDate(value: string) {
  const normalized = value.includes('T')
    ? `${value}Z`
    : `${value.replace(' ', 'T')}Z`
  return new Date(normalized).toLocaleString('fr-FR')
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div
      style={{
        border: '1px solid var(--theme-elevation-150)',
        borderRadius: 4,
        padding: '1rem 1.1rem',
        background: 'var(--theme-elevation-50)',
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: 11,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          opacity: 0.55,
        }}
      >
        {label}
      </p>
      <p style={{ margin: '0.4rem 0 0', fontSize: 28, fontWeight: 500 }}>{value}</p>
    </div>
  )
}

export default function AnalyticsDashboard() {
  const analytics: AnalyticsSummary = getAnalyticsSummary()
  const maxDaily = Math.max(...analytics.dailyVisits.map((d) => d.count), 1)

  return (
    <Gutter>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ margin: '0 0 0.35rem', fontSize: 20 }}>Trafic du portfolio</h2>
        <p style={{ margin: '0 0 1.25rem', opacity: 0.6, fontSize: 14 }}>
          Statistiques en direct des visiteurs sur le site.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '0.75rem',
            marginBottom: '1.5rem',
          }}
        >
          <StatCard label="Visiteurs uniques" value={analytics.totalVisitors} />
          <StatCard label="Sessions" value={analytics.totalSessions} />
          <StatCard label="Aujourd'hui" value={analytics.visitorsToday} />
          <StatCard label="7 derniers jours" value={analytics.visitorsThisWeek} />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          <section
            style={{
              border: '1px solid var(--theme-elevation-150)',
              borderRadius: 4,
              padding: '1rem',
            }}
          >
            <h3 style={{ margin: '0 0 0.75rem', fontSize: 13, textTransform: 'uppercase', opacity: 0.55 }}>
              Visites (14 jours)
            </h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 96 }}>
              {analytics.dailyVisits.length === 0 && (
                <p style={{ margin: 'auto', fontSize: 13, opacity: 0.45 }}>Pas encore de données</p>
              )}
              {analytics.dailyVisits.map((day) => (
                <div
                  key={day.date}
                  title={`${day.date}: ${day.count}`}
                  style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
                >
                  <div
                    style={{
                      width: '100%',
                      minHeight: 2,
                      height: `${(day.count / maxDaily) * 100}%`,
                      background: 'var(--theme-success-500)',
                      borderRadius: 2,
                    }}
                  />
                  <span style={{ fontSize: 9, opacity: 0.4 }}>{day.date.slice(5)}</span>
                </div>
              ))}
            </div>
          </section>

          <section
            style={{
              border: '1px solid var(--theme-elevation-150)',
              borderRadius: 4,
              padding: '1rem',
            }}
          >
            <h3 style={{ margin: '0 0 0.75rem', fontSize: 13, textTransform: 'uppercase', opacity: 0.55 }}>
              Sections les plus vues
            </h3>
            {analytics.sectionViews.length === 0 && (
              <p style={{ margin: 0, fontSize: 13, opacity: 0.45 }}>Aucune donnée</p>
            )}
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {analytics.sectionViews.map((s) => (
                <li
                  key={s.section}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0.4rem 0',
                    borderBottom: '1px solid var(--theme-elevation-100)',
                    fontSize: 14,
                  }}
                >
                  <span style={{ textTransform: 'capitalize' }}>{s.section}</span>
                  <span style={{ opacity: 0.5 }}>{s.count}</span>
                </li>
              ))}
            </ul>
          </section>

          <section
            style={{
              border: '1px solid var(--theme-elevation-150)',
              borderRadius: 4,
              padding: '1rem',
            }}
          >
            <h3 style={{ margin: '0 0 0.75rem', fontSize: 13, textTransform: 'uppercase', opacity: 0.55 }}>
              Projets consultés
            </h3>
            {analytics.projectViews.length === 0 && (
              <p style={{ margin: 0, fontSize: 13, opacity: 0.45 }}>Aucune donnée</p>
            )}
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {analytics.projectViews.map((p) => (
                <li
                  key={`${p.projectId}-${p.title}`}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0.4rem 0',
                    borderBottom: '1px solid var(--theme-elevation-100)',
                    fontSize: 14,
                    gap: 12,
                  }}
                >
                  <span>{p.title}</span>
                  <span style={{ opacity: 0.5 }}>{p.count}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section
          style={{
            border: '1px solid var(--theme-elevation-150)',
            borderRadius: 4,
            padding: '1rem',
          }}
        >
          <h3 style={{ margin: '0 0 0.75rem', fontSize: 13, textTransform: 'uppercase', opacity: 0.55 }}>
            Parcours récents
          </h3>
          {analytics.recentSessions.length === 0 && (
            <p style={{ margin: 0, fontSize: 13, opacity: 0.45 }}>Aucun parcours pour le moment</p>
          )}
          <div style={{ display: 'grid', gap: '0.6rem' }}>
            {analytics.recentSessions.slice(0, 8).map((session) => (
              <div
                key={session.id}
                style={{
                  border: '1px solid var(--theme-elevation-100)',
                  borderRadius: 4,
                  padding: '0.75rem 0.9rem',
                  fontSize: 14,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 12,
                    fontSize: 12,
                    opacity: 0.45,
                    marginBottom: 4,
                  }}
                >
                  <span>{formatDate(session.startedAt)}</span>
                  <span>{session.eventCount} événements</span>
                </div>
                <p style={{ margin: 0 }}>{session.path.join(' → ')}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Gutter>
  )
}
