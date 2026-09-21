// Data layer for the "Documentación" section — university coursework, Spanish-only.
// Separate from content.ts (which is the bilingual EN/ES portfolio data) on purpose:
// this section is not part of the professional bilingual narrative.

export interface DocsTeamMember {
  name: string
  role: string
  bio?: string
  photo?: string
}

export interface DocsSubject {
  slug: string
  name: string
  tagline: string
  description: string
  team: DocsTeamMember[]
}

export const DOCS_SUBJECTS: DocsSubject[] = [
  {
    slug: 'produccion-electronica',
    name: 'Producción Electrónica',
    tagline: 'Producción de PCBs: diseño y fabricación con KiCad, MonoFab y Altium.',
    description:
      'Documentación de toda la materia de Producción Electrónica: cómo se produce una placa de circuito impreso, del diseño en KiCad a la fabricación en MonoFab, y Altium. Trabajo en parejas.',
    team: [
      {
        name: 'Alessandro Reyes',
        role: 'Ingeniería Mecatrónica · IBERO Puebla',
        bio: 'Estudiante de Mecatrónica enfocado en sistemas embebidos, IA aplicada y robótica.',
        photo: '/portfolio/images/team/alessandro.webp',
      },
      {
        name: 'Alexa Groot',
        role: 'Ingeniería Mecatrónica · IBERO Puebla',
        photo: '/portfolio/images/team/alexa.webp',
      },
    ],
  },
]

export interface DocsPractice {
  subjectSlug: string
  slug: string
  number: string
  title: string
  status: 'en-progreso' | 'completa'
  summary: string
}

export const DOCS_PRACTICES: DocsPractice[] = [
  {
    subjectSlug: 'produccion-electronica',
    slug: 'primera-placa-kicad',
    number: '01',
    title: 'Creación de PCBs',
    status: 'en-progreso',
    summary: 'El proceso completo para producir una placa de circuito impreso: diseño en KiCad, fabricación en MonoFab y Altium, paso a paso.',
  },
]

export function getSubject(slug: string): DocsSubject | undefined {
  return DOCS_SUBJECTS.find((s) => s.slug === slug)
}

export function getPractices(subjectSlug: string): DocsPractice[] {
  return DOCS_PRACTICES.filter((p) => p.subjectSlug === subjectSlug)
}
