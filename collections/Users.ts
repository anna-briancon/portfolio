import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    maxLoginAttempts: 3,
    lockTime: 60 * 60 * 1000, // 1 hour lock after 3 failed attempts
  },
  fields: [],
}
