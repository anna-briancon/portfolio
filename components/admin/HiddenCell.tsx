'use client'

import React, { useState, useTransition } from 'react'

type Props = {
  cellData?: boolean | null
  rowData: {
    id: number | string
  }
}

/** Checkbox in Projects list — checked = project is hidden from the portfolio */
export default function HiddenCell({ cellData, rowData }: Props) {
  const [hidden, setHidden] = useState(Boolean(cellData))
  const [isPending, startTransition] = useTransition()

  const onToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation()
    const next = event.target.checked
    const previous = hidden
    setHidden(next)

    startTransition(async () => {
      try {
        const res = await fetch(`/api/projects/${rowData.id}`, {
          method: 'PATCH',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ hidden: next }),
        })

        if (!res.ok) {
          setHidden(previous)
        }
      } catch {
        setHidden(previous)
      }
    })
  }

  return (
    <label
      onClick={(event) => event.stopPropagation()}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        cursor: isPending ? 'wait' : 'pointer',
        opacity: isPending ? 0.6 : 1,
      }}
      title={hidden ? 'Projet caché sur le site' : 'Projet visible sur le site'}
    >
      <input
        type="checkbox"
        checked={hidden}
        onChange={onToggle}
        disabled={isPending}
        aria-label={hidden ? 'Afficher le projet' : 'Cacher le projet'}
      />
      <span style={{ fontSize: 12, opacity: 0.7 }}>{hidden ? 'Caché' : 'Visible'}</span>
    </label>
  )
}
