import type { GlobalConfig } from 'payload'

export const Contact: GlobalConfig = {
  slug: 'contact',
  label: 'Page Contact',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Contactez-moi',
      label: 'Titre',
    },
    {
      name: 'text',
      type: 'textarea',
      required: true,
      label: 'Texte d’introduction',
      defaultValue:
        'Je suis toujours ouverte à de nouvelles opportunités et collaborations. N’hésitez pas à me contacter si vous souhaitez travailler ensemble ou simplement dire bonjour.',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      defaultValue: 'anna.briancon33@gmail.com',
      label: 'Email',
    },
    {
      name: 'linkedinUrl',
      type: 'text',
      required: true,
      defaultValue: 'https://www.linkedin.com/in/anna-briancon',
      label: 'URL LinkedIn',
    },
    {
      name: 'githubUrl',
      type: 'text',
      required: true,
      defaultValue: 'https://github.com/anna-briancon',
      label: 'URL GitHub',
    },
  ],
}
