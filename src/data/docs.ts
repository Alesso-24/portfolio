// Data layer for the "Documentación" section — university coursework, Spanish-only.
// Separate from content.ts (which is the bilingual EN/ES portfolio data) on purpose:
// this section is not part of the professional bilingual narrative.

export interface DocsTeamMember {
  name: string
  role: string
  bio: string
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
    tagline: 'Diseño y fabricación de PCBs con KiCad + MonoFab.',
    description:
      'Documentación del proceso de diseño, ruteo y fabricación de nuestras placas de circuito impreso para la materia de Producción Electrónica. Trabajo en parejas.',
    team: [
      {
        name: 'Alessandro Reyes',
        role: 'Ingeniería Mecatrónica · IBERO Puebla',
        bio: 'Estudiante de Mecatrónica enfocado en sistemas embebidos, IA aplicada y robótica.',
        photo: '/portfolio/images/Alessandro.webp',
      },
      {
        // TODO(Alessandro): reemplaza con el nombre, rol/breve descripción y foto reales de tu compañera.
        name: '[Nombre de tu compañera]',
        role: 'Ingeniería Mecatrónica · IBERO Puebla',
        bio: 'TODO: agrega aquí su breve descripción.',
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
    title: 'Nuestra primera placa en KiCad',
    status: 'en-progreso',
    summary: 'Diseño esquemático, ruteo del PCB y fabricación con MonoFab de nuestra primera placa de circuito impreso.',
  },
]

export function getSubject(slug: string): DocsSubject | undefined {
  return DOCS_SUBJECTS.find((s) => s.slug === slug)
}

export function getPractices(subjectSlug: string): DocsPractice[] {
  return DOCS_PRACTICES.filter((p) => p.subjectSlug === subjectSlug)
}
