import type { Project } from '@/lib/types'

export type PayloadMedia = {
  url?: string | null
  filename?: string | null
}

export type ContactContent = {
  title: string
  text: string
  email: string
  linkedinUrl: string
  githubUrl: string
}

export type AboutContent = {
  title: string
  paragraphs: { text: string }[]
  photoFront: string
  photoBack: string
  skillGroups: {
    name: string
    tools: { name: string; icon: string }[]
  }[]
}

type PayloadCategory = {
  id?: number | string
  name?: string
} | string | number | null

type PayloadProject = {
  id: number | string
  title: string
  category: PayloadCategory
  techno: string
  description: string
  text: string
  websiteUrl?: string | null
  images?: { image: number | string | PayloadMedia }[]
}

export function mediaUrl(image: number | string | PayloadMedia | null | undefined): string | null {
  if (!image || typeof image === 'number' || typeof image === 'string') return null
  if (image.url) return image.url
  if (image.filename) return `/api/media/file/${image.filename}`
  return null
}

function categoryName(category: PayloadCategory): string {
  if (!category) return 'Autre'
  if (typeof category === 'object' && 'name' in category && category.name) {
    return category.name
  }
  return 'Autre'
}

export function mapPayloadProject(doc: PayloadProject): Project {
  return {
    id: Number(doc.id),
    title: doc.title,
    category: categoryName(doc.category),
    techno: doc.techno,
    description: doc.description,
    text: doc.text,
    websiteUrl: doc.websiteUrl || null,
    images: (doc.images || [])
      .map((item) => mediaUrl(item.image))
      .filter((url): url is string => Boolean(url)),
  }
}

export function mapContact(doc: Partial<ContactContent> | null | undefined): ContactContent {
  return {
    title: doc?.title || 'Contactez-moi',
    text:
      doc?.text ||
      'Je suis toujours ouverte à de nouvelles opportunités et collaborations. N’hésitez pas à me contacter si vous souhaitez travailler ensemble ou simplement dire bonjour.',
    email: doc?.email || 'anna.briancon33@gmail.com',
    linkedinUrl: doc?.linkedinUrl || 'https://www.linkedin.com/in/anna-briancon',
    githubUrl: doc?.githubUrl || 'https://github.com/anna-briancon',
  }
}

export function mapAbout(doc: Record<string, unknown> | null | undefined): AboutContent {
  const paragraphs = Array.isArray(doc?.paragraphs)
    ? (doc.paragraphs as { text?: string }[])
        .map((p) => ({ text: p.text || '' }))
        .filter((p) => p.text)
    : []

  const skillGroups = Array.isArray(doc?.skillGroups)
    ? (doc.skillGroups as {
        name?: string
        tools?: { name?: string; icon?: string }[]
      }[]).map((group) => ({
        name: group.name || 'Compétences',
        tools: (group.tools || [])
          .map((tool) => ({
            name: tool.name || '',
            icon: tool.icon || 'Code',
          }))
          .filter((tool) => tool.name),
      }))
    : []

  return {
    title: (doc?.title as string) || 'À Propos de Moi',
    paragraphs:
      paragraphs.length > 0
        ? paragraphs
        : [
            {
              text: "Je m'appelle Anna Briançon, je suis actuellement en formation de développeuse Fullstack à MyDigitalSchool Annecy.",
            },
          ],
    photoFront: mediaUrl(doc?.photoFront as PayloadMedia) || '/profilMD.jpg',
    photoBack: mediaUrl(doc?.photoBack as PayloadMedia) || '/profil.jpeg',
    skillGroups,
  }
}
