import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: 'Projet',
    plural: 'Projets',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'hidden', 'updatedAt'],
  },
  access: {
    read: ({ req: { user } }) => {
      // Admins see everything; public only sees non-hidden projects
      if (user) return true
      return {
        or: [
          { hidden: { equals: false } },
          { hidden: { exists: false } },
        ],
      }
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titre',
    },
    {
      name: 'hidden',
      type: 'checkbox',
      label: 'Caché',
      defaultValue: false,
      admin: {
        description: 'Si coché, le projet n’apparaît plus sur le portfolio.',
        position: 'sidebar',
        components: {
          Cell: '/components/admin/HiddenCell',
        },
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      label: 'Catégorie',
      admin: {
        description: 'Tu peux créer une nouvelle catégorie directement depuis ce champ (+).',
      },
    },
    {
      name: 'techno',
      type: 'text',
      label: 'Technologies',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Description courte',
    },
    {
      name: 'text',
      type: 'textarea',
      label: 'Description détaillée',
      required: true,
    },
    {
      name: 'images',
      type: 'array',
      required: true,
      minRows: 1,
      label: 'Images du projet',
      labels: {
        singular: 'Image',
        plural: 'Images',
      },
      admin: {
        description: 'Aperçu visible directement ici après sélection / upload.',
        initCollapsed: false,
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Image',
          displayPreview: true,
        },
      ],
    },
    {
      name: 'websiteUrl',
      type: 'text',
      label: 'URL du site',
    },
  ],
}
