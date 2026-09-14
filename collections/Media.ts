import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Média',
    plural: 'Médias',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['filename', 'alt', 'updatedAt'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Texte alternatif',
    },
  ],
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*'],
    displayPreview: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 800,
        height: 600,
        position: 'centre',
      },
    ],
    adminThumbnail: ({ doc }) => {
      const sizes = doc?.sizes as
        | { thumbnail?: { url?: string } }
        | undefined
      return sizes?.thumbnail?.url || (doc?.url as string) || null
    },
  },
}
