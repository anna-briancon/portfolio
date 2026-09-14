/**
 * Seed projects via Payload REST API.
 * Prerequisites:
 * 1. npm run dev (server running)
 * 2. Create your admin account once at /admin
 * 3. Set SEED_EMAIL + SEED_PASSWORD in .env.local (same as admin)
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { projects as seedProjects } from '../app/(frontend)/data/projects'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const root = path.resolve(dirname, '..')

const BASE_URL = process.env.SEED_URL || 'http://localhost:3000'
const EMAIL = process.env.SEED_EMAIL
const PASSWORD = process.env.SEED_PASSWORD

async function login(): Promise<string> {
  if (!EMAIL || !PASSWORD) {
    throw new Error(
      'Ajoute SEED_EMAIL et SEED_PASSWORD dans .env.local (tes identifiants admin Payload).'
    )
  }

  const res = await fetch(`${BASE_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  })

  const data = await res.json()
  if (!res.ok) {
    throw new Error(
      `Login échoué (${res.status}). Vérifie SEED_EMAIL / SEED_PASSWORD (identifiants /admin).\n${JSON.stringify(data)}`
    )
  }

  const token = data.token as string | undefined
  if (!token) throw new Error('Token manquant dans la réponse login')
  return token
}

async function ensureCategory(
  token: string,
  name: string,
  cache: Map<string, string | number>
): Promise<string | number> {
  if (cache.has(name)) return cache.get(name)!

  const existing = await fetch(
    `${BASE_URL}/api/categories?where[name][equals]=${encodeURIComponent(name)}&limit=1`,
    { headers: { Authorization: `JWT ${token}` } }
  ).then((r) => r.json())

  if (existing.docs?.[0]?.id != null) {
    cache.set(name, existing.docs[0].id)
    return existing.docs[0].id
  }

  const created = await fetch(`${BASE_URL}/api/categories`, {
    method: 'POST',
    headers: {
      Authorization: `JWT ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  }).then((r) => r.json())

  const id = created.doc?.id ?? created.id
  if (id == null) throw new Error(`Impossible de créer la catégorie ${name}`)
  cache.set(name, id)
  return id
}

async function uploadMedia(
  token: string,
  absolutePath: string,
  alt: string
): Promise<string | number | null> {
  if (!fs.existsSync(absolutePath)) {
    console.warn(`  Fichier introuvable: ${absolutePath}`)
    return null
  }

  const buffer = fs.readFileSync(absolutePath)
  const file = new File([buffer], path.basename(absolutePath))
  const form = new FormData()
  form.append('file', file)
  form.append('_payload', JSON.stringify({ alt }))

  const res = await fetch(`${BASE_URL}/api/media`, {
    method: 'POST',
    headers: { Authorization: `JWT ${token}` },
    body: form,
  })

  const data = await res.json()
  if (!res.ok) {
    console.warn(`  Upload échoué (${absolutePath}):`, data)
    return null
  }

  return data.doc?.id ?? data.id ?? null
}

async function seed() {
  console.log(`Connexion à ${BASE_URL}…`)
  const token = await login()
  const categoryCache = new Map<string, string | number>()

  const existing = await fetch(`${BASE_URL}/api/projects?limit=1`, {
    headers: { Authorization: `JWT ${token}` },
  }).then((r) => r.json())

  if ((existing.totalDocs ?? 0) > 0) {
    console.log('Des projets existent déjà — seed ignoré.')
    return
  }

  for (const project of seedProjects) {
    const categoryId = await ensureCategory(token, project.category, categoryCache)
    const imageRows: { image: string | number }[] = []

    for (const imagePath of project.images) {
      const relative = imagePath.replace(/^\//, '')
      const absolute = path.resolve(root, 'public', relative)
      const id = await uploadMedia(
        token,
        absolute,
        `${project.title} — ${path.basename(relative)}`
      )
      if (id != null) imageRows.push({ image: id })
    }

    if (imageRows.length === 0) {
      console.warn(`Skip (pas d'images): ${project.title}`)
      continue
    }

    const res = await fetch(`${BASE_URL}/api/projects`, {
      method: 'POST',
      headers: {
        Authorization: `JWT ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: project.title,
        category: categoryId,
        techno: project.techno,
        description: project.description,
        text: project.text,
        websiteUrl: project.websiteUrl || undefined,
        images: imageRows,
      }),
    })

    const data = await res.json()
    if (!res.ok) {
      console.warn(`Échec projet ${project.title}:`, data)
      continue
    }

    console.log(`OK — ${project.title}`)
  }

  console.log('Seed terminé.')
}

seed().catch((error) => {
  const cause = error instanceof Error ? error.cause : undefined
  const code =
    cause && typeof cause === 'object' && 'code' in cause
      ? String((cause as { code?: string }).code)
      : undefined

  if (code === 'ECONNREFUSED' || String(error).includes('fetch failed')) {
    console.error(
      `Impossible de joindre ${BASE_URL}.\n` +
        `1. Dans un autre terminal : npm run dev\n` +
        `2. Crée ton compte sur ${BASE_URL}/admin\n` +
        `3. Vérifie SEED_EMAIL / SEED_PASSWORD dans .env.local\n` +
        `4. Relance : npm run seed`
    )
  } else {
    console.error(error instanceof Error ? error.message : error)
  }
  process.exit(1)
})
