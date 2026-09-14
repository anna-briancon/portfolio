import { getPayload } from 'payload'
import config from '@payload-config'
import { headers as getHeaders } from 'next/headers'
import { mapPayloadProject } from '@/lib/payload-client'
import type { Project } from '@/lib/types'

export async function getProjects(): Promise<Project[]> {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'projects',
    depth: 1,
    limit: 100,
    sort: '-createdAt',
  })

  return result.docs.map((doc) => mapPayloadProject(doc as never))
}

export async function getPayloadUser() {
  const payload = await getPayload({ config })
  const headers = await getHeaders()
  const { user } = await payload.auth({ headers })
  return user
}
