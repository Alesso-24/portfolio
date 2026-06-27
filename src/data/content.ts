// Single source of truth for all site content.
// Both EN and ES strings live here; the Nav island reads `lang` from Astro.

export const SITE = {
  name: 'Alessandro Reyes',
  role: 'Mechatronics Engineer',
  tagline: 'Embedded AI & Robotics',
  url: 'https://alesso-24.github.io/portfolio/',
  github: 'https://github.com/Alesso-24',
  linkedin: 'https://www.linkedin.com/in/alessandro-reyes-mtz/',
  instagram: 'https://www.instagram.com/alessandro_reyesm/',
  email: 'jordi.reyes.martinez@gmail.com',
  emailCC: 'jordi.reyes@iberopuebla.mx',
  location: 'Puebla, Mexico',
  formEndpoint: 'https://formsubmit.co/ajax/jordi.reyes.martinez@gmail.com',
}

export const NAV_LINKS = [
  { label: { en: 'Work',     es: 'Proyectos' }, href: '#work'     },
  { label: { en: 'Research', es: 'Research'  }, href: '#research' },
  { label: { en: 'About',    es: 'Sobre mí'  }, href: '#about'    },
  { label: { en: 'Contact',  es: 'Contacto'  }, href: '#contact'  },
]

export const HERO = {
  label: 'Mechatronics · Embedded AI · Robotics',
  h1: {
    en: { plain: 'Building AI that survives contact with', italic: 'real hardware.' },
    es: { plain: 'Construyendo IA que sobrevive al contacto con', italic: 'el hardware real.' },
  },
  paragraph: {
    en: 'Mechatronics engineer crafting intelligent systems where software meets motors, sensors and microcontrollers — built to work in the real world.',
    es: 'Ingeniero mecatrónico creando sistemas inteligentes donde el software se encuentra con motores, sensores y microcontroladores — construido para funcionar en el mundo real.',
  },
  cta_primary:   { en: 'View work',    es: 'Ver proyectos' },
  cta_secondary: { en: 'Get in touch', es: 'Contactar' },
}

export const STATS = [
  {
    value: '126×',
    label: { en: 'Faster inference, measured on real ESP32 hardware', es: 'Inferencia más rápida, medida en hardware ESP32 real' },
  },
  {
    value: '99.85%',
    label: { en: 'Accuracy with zero false positives', es: 'Exactitud con cero falsos positivos' },
  },
  {
    value: '98.4%',
    label: { en: 'Less energy than streaming to the cloud', es: 'Menos energía que transmitir a la nube' },
  },
  {
    value: '2×',
    label: { en: 'IEEE accepted papers (CASE 2026 + BDAI 2026)', es: 'Artículos aceptados en IEEE (CASE 2026 + BDAI 2026)' },
  },
]

export const ABOUT = {
  label: { en: 'Who I am', es: 'Quién soy' },
  h2: {
    en: {
      plain: "I build AI that doesn't just run in a notebook — it runs on",
      italic: 'motors, sensors and microcontrollers,',
      end: 'in the real world.',
    },
    es: {
      plain: 'Construyo IA que no solo corre en un notebook — corre en',
      italic: 'motores, sensores y microcontroladores,',
      end: 'en el mundo real.',
    },
  },
  bio: {
    en: [
      'I am Alessandro Reyes, a Mechatronics Engineering student at IBERO Puebla. My work sits at the intersection of robust mechanical design, embedded systems, and applied artificial intelligence.',
      'From deploying machine learning models on microcontrollers to architecting closed-loop control systems for competitive robotics, I build technology that works in the real world, not just in simulation.',
    ],
    es: [
      'Soy Alessandro Reyes, estudiante de Ingeniería Mecatrónica en IBERO Puebla. Mi trabajo se sitúa en la intersección del diseño mecánico robusto, los sistemas embebidos y la inteligencia artificial aplicada.',
      'Desde el despliegue de modelos de machine learning en microcontroladores hasta la arquitectura de sistemas de control en lazo cerrado para robótica competitiva, construyo tecnología que funciona en el mundo real, no solo en simulación.',
    ],
  },
  availability: {
    en: 'Open to Summer 2026 internships & international research collaborations',
    es: 'Disponible para prácticas verano 2026 y colaboraciones internacionales de investigación',
  },
}

export interface Project {
  slug: string
  tag: { en: string; es: string }
  title: { en: string; es: string }
  description: { en: string; es: string }
  image: string
  imageAlt: string
  size: 'large' | 'small'
  shadowColor: 'blue' | 'orange'
  href: string
}

export const PROJECTS: Project[] = [
  {
    slug: 'larc-2025',
    tag: { en: 'LARC 2025 Robotics Competition', es: 'Competencia Robótica LARC 2025' },
    title: { en: 'Tracky: High-Speed Line Follower Robot', es: 'Tracky: Robot Seguidor de Línea de Alta Velocidad' },
    description: {
      en: 'Built and raced a custom ESP32-C6 robot that recovers from 90° turns in milliseconds — engineered and debugged under real competition pressure at LARC 2025.',
      es: 'Construimos y corrimos un robot ESP32-C6 personalizado que se recupera de giros de 90° en milisegundos — diseñado y depurado bajo presión de competencia real en LARC 2025.',
    },
    image: '/portfolio/images/larc_arena.webp',
    imageAlt: 'Tracky robot at LARC 2025 arena',
    size: 'large',
    shadowColor: 'orange',
    href: '/portfolio/project/larc-2025',
  },
  {
    slug: 'fault-detection-case',
    tag: { en: 'IEEE CASE 2026 · Accepted', es: 'IEEE CASE 2026 · Aceptado' },
    title: { en: 'Edge AI Decision Framework: Quantifying the Sensitivity-Latency Trade-off', es: 'Framework de Decisión Edge AI: Cuantificando el Trade-off Sensibilidad-Latencia' },
    description: {
      en: 'Found a hardware bug that silently broke a "perfect" ML model, then built a model 126× faster with zero false alarms — validated on real ESP32 silicon.',
      es: 'Encontramos un bug de hardware que silenciosamente rompía un modelo ML "perfecto", luego construimos un modelo 126× más rápido con cero falsas alarmas — validado en silicio ESP32 real.',
    },
    image: '/portfolio/images/cover_case.webp',
    imageAlt: 'Edge AI Decision Framework research paper',
    size: 'small',
    shadowColor: 'blue',
    href: '/portfolio/project/fault-detection-case',
  },
  {
    slug: 'fault-detection',
    tag: { en: 'IEEE BDAI 2026 · Accepted', es: 'IEEE BDAI 2026 · Aceptado' },
    title: { en: 'Industrial Fault Detection via Machine Learning', es: 'Detección de Fallas Industriales mediante Machine Learning' },
    description: {
      en: '99.85% accuracy, zero false positives, 98.4% less energy than the cloud — predictive maintenance light enough to run on a $5 microcontroller.',
      es: '99.85% de exactitud, cero falsos positivos, 98.4% menos energía que la nube — mantenimiento predictivo lo suficientemente ligero para correr en un microcontrolador de $5.',
    },
    image: '/portfolio/images/cover_bdai.webp',
    imageAlt: 'Industrial fault detection ML research',
    size: 'small',
    shadowColor: 'orange',
    href: '/portfolio/project/fault-detection',
  },
  {
    slug: 'self-balancing-platform',
    tag: { en: 'Robotics & Control Systems', es: 'Robótica y Sistemas de Control' },
    title: { en: 'Self-Balancing Platform with Computer Vision', es: 'Plataforma Autobalanceable con Visión por Computadora' },
    description: {
      en: 'Real-time computer vision and inverse kinematics keep a rolling ball balanced on a moving plate — and keep predicting its trajectory even when a camera frame drops.',
      es: 'Visión por computadora en tiempo real y cinemática inversa mantienen una pelota rodante equilibrada en una placa móvil — y siguen prediciendo su trayectoria incluso cuando se pierde un frame de cámara.',
    },
    image: '/portfolio/images/plat1.webp',
    imageAlt: 'Self-balancing platform with computer vision',
    size: 'small',
    shadowColor: 'blue',
    href: '/portfolio/project/self-balancing-platform',
  },
]

export interface Publication {
  number: string
  title: { en: string; es: string }
  venue: string
  year: string
  href: string
}

export const PUBLICATIONS: Publication[] = [
  {
    number: '01',
    title: {
      en: 'Edge AI Decision Framework: Quantifying the Sensitivity-Latency Trade-off in Industrial Bearing Predictive Maintenance',
      es: 'Framework de Decisión Edge AI: Cuantificando el Trade-off Sensibilidad-Latencia en Mantenimiento Predictivo de Rodamientos Industriales',
    },
    venue: 'IEEE CASE 2026',
    year: '2026 ↗',
    href: '/portfolio/project/fault-detection-case',
  },
  {
    number: '02',
    title: {
      en: 'Comparative Evaluation of Lightweight Supervised Machine Learning Techniques for Industrial Rotating Machinery',
      es: 'Evaluación Comparativa de Técnicas Ligeras de Machine Learning Supervisado para Maquinaria Rotativa Industrial',
    },
    venue: 'IEEE BDAI 2026',
    year: '2026 ↗',
    href: '/portfolio/project/fault-detection',
  },
]

export const CONTACT = {
  h2:        { en: "Let's build something", italic: { en: 'real.', es: 'real.' }, es: 'Construyamos algo' },
  subtitle:  { en: 'Reach out', es: 'Escríbeme' },
  paragraph: {
    en: 'Whether you have a question, a project idea, or just want to connect, feel free to drop a message.',
    es: 'Si tienes una pregunta, una idea de proyecto, o simplemente quieres conectar, no dudes en escribirme.',
  },
  form: {
    name:     { en: 'Name',    es: 'Nombre' },
    email:    { en: 'Email',   es: 'Email' },
    message:  { en: 'Message', es: 'Mensaje' },
    send:     { en: 'Send Message',  es: 'Enviar Mensaje' },
    sending:  { en: 'Sending...',    es: 'Enviando...' },
    success:  { en: "Thanks — I'll get back to you soon.", es: 'Gracias — te respondo pronto.' },
    error:    { en: 'Something went wrong. Please email me directly.', es: 'Algo salió mal. Escríbeme directamente.' },
  },
  footer: { en: 'Designed for the real world.', es: 'Diseñado para el mundo real.' },
}
