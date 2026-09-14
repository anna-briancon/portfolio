import type { GlobalConfig } from 'payload'

const iconOptions = [
  { label: 'Code', value: 'Code' },
  { label: 'Fichier / code', value: 'FileCode' },
  { label: 'Terminal', value: 'Terminal' },
  { label: 'Git', value: 'GitBranch' },
  { label: 'Image', value: 'Image' },
  { label: 'Écran', value: 'Monitor' },
  { label: 'Base de données', value: 'Database' },
  { label: 'Serveur', value: 'Server' },
]

export const About: GlobalConfig = {
  slug: 'about',
  label: 'Page À propos',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'À Propos de Moi',
      label: 'Titre',
    },
    {
      name: 'paragraphs',
      type: 'array',
      label: 'Paragraphes',
      minRows: 1,
      labels: {
        singular: 'Paragraphe',
        plural: 'Paragraphes',
      },
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
          label: 'Texte',
        },
      ],
      defaultValue: [
        {
          text: "Je m'appelle Anna Briançon, je suis actuellement en formation de développeuse Fullstack à MyDigitalSchool Annecy. Passionnée par l'informatique, le design et la photographie, j'aime mettre mes compétences et mon énergie dans chaque projet.",
        },
        {
          text: "Au quotidien, j'utilise des outils comme React et Vue pour concevoir des interfaces fluides et Symfony et Node.js pour le backend. Mon objectif est de concevoir des applications web qui soient à la fois esthétiques et performantes, pour offrir des expériences uniques.",
        },
      ],
    },
    {
      name: 'photoFront',
      type: 'upload',
      relationTo: 'media',
      label: 'Photo (face)',
      displayPreview: true,
    },
    {
      name: 'photoBack',
      type: 'upload',
      relationTo: 'media',
      label: 'Photo (verso / hover)',
      displayPreview: true,
    },
    {
      name: 'skillGroups',
      type: 'array',
      label: 'Groupes de compétences',
      labels: {
        singular: 'Groupe',
        plural: 'Groupes',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Nom du groupe',
        },
        {
          name: 'tools',
          type: 'array',
          label: 'Outils',
          labels: {
            singular: 'Outil',
            plural: 'Outils',
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              label: 'Nom',
            },
            {
              name: 'icon',
              type: 'select',
              required: true,
              defaultValue: 'Code',
              options: iconOptions,
              label: 'Icône',
            },
          ],
        },
      ],
      defaultValue: [
        {
          name: 'Frontend',
          tools: [
            { name: 'HTML', icon: 'FileCode' },
            { name: 'CSS', icon: 'FileCode' },
            { name: 'JavaScript', icon: 'FileCode' },
            { name: 'React', icon: 'Code' },
            { name: 'Vue.js', icon: 'Code' },
          ],
        },
        {
          name: 'Backend',
          tools: [
            { name: 'Java', icon: 'FileCode' },
            { name: 'C#', icon: 'FileCode' },
            { name: 'PHP', icon: 'FileCode' },
            { name: 'Python', icon: 'FileCode' },
            { name: 'SQL', icon: 'Database' },
            { name: 'Node.js', icon: 'Server' },
          ],
        },
        {
          name: 'Autres langages',
          tools: [
            { name: 'C++', icon: 'FileCode' },
            { name: 'C', icon: 'FileCode' },
            { name: 'Bash', icon: 'Terminal' },
          ],
        },
        {
          name: 'Outils',
          tools: [
            { name: 'GIT', icon: 'GitBranch' },
            { name: 'VS Code', icon: 'Code' },
            { name: 'NetBeans', icon: 'Monitor' },
            { name: 'VMware', icon: 'Server' },
            { name: 'Photoshop', icon: 'Image' },
            { name: 'Processing', icon: 'Code' },
          ],
        },
      ],
    },
  ],
}
