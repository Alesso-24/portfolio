# PLAN — Redesign del portfolio · Astro 7 + stack premium

## ⚡ Para retomar en una nueva sesión de Claude

**Di exactamente esto al abrir Claude Code:**
> "Lee PLAN.md y continúa desde el próximo paso pendiente en la rama redesign."

**Contexto crítico:**
- Rama activa: `redesign` (NO toques `main` hasta la Fase 10)
- El sitio actual en producción sigue siendo el build anterior (main). La rama `redesign` aún no se ha mergeado.
- Build funciona: `npm run build` genera `dist/` sin errores
- Último commit en redesign: `b2f84b7` — "feat: fase 1 — migración a Astro 7 + stack premium completo"

---

## Estado actual
- Fase en curso: **Fase 8 — Páginas de detalle de proyecto**
- Último paso completado: ✅ Fase 1 — scaffold completo (Astro 7, todos los componentes de la homepage, build limpio)
- 👉 **Próximo paso exacto:** Crear las 4 páginas de detalle en `src/pages/project/`:
  1. `larc-2025.astro` — LARC 2025 / Tracky robot
  2. `fault-detection-case.astro` — IEEE CASE 2026
  3. `fault-detection.astro` — IEEE BDAI 2026
  4. `self-balancing-platform.astro` — Self-Balancing Platform

  Después de las páginas: Fase 9 (responsive + a11y) → Fase 10 (Lighthouse + deploy a main).

---

## Stack definitivo (best-in-class 2026)

| Capa | Tecnología | Razón |
|---|---|---|
| Framework | **Astro 5** | Zero JS por defecto; isla React solo donde se necesita; Lighthouse 100 alcanzable; i18n + routing + image optimization nativos |
| Estilos | **Tailwind CSS 4** | Config via CSS (`@theme`), sin archivo `.config.js`; tokens directos |
| Scroll suave | **Lenis 1.3** | Estándar de la industria; sincroniza perfecto con ScrollTrigger |
| Animaciones scroll | **GSAP 3 + ScrollTrigger** | Insuperable para reveals, parallax y timelines precisos |
| Animaciones React | **Motion (Framer Motion) 12** | Islas React: nav móvil, magnetic buttons, form |
| Tipografía | **Fontsource self-hosted** | Instrument Serif 400/italic + Hanken Grotesk 300–700 variable |
| Iconos | **Lucide React** | Solo en islas React (nav, contact) |
| TypeScript | **strict mode** | Content collections tipadas, seguridad en data layer |

> React solo en islas interactivas: Nav, ContactForm, cursor. El resto es Astro puro.

---

## Tokens de diseño (del reference HTML — fuente de verdad)

```css
/* Colores */
--cream:        #f3ede1   /* fondo principal */
--cream-alt:    #efe7d8   /* marquee, Work */
--ink:          #211f1a   /* texto principal */
--muted:        #6f6a5f   /* labels */
--muted-soft:   #534f46   /* párrafos */
--hairline:     #8a8579   /* líneas, scroll hint */
--blue:         #2540c0   /* marca, CTAs, Contact full-bleed */
--orange:       #ea6a2e   /* acento, itálicas, dots */
--on-blue:      #f3ede1   /* texto sobre azul */

/* Radios */
--radius-card: 18px
--radius-pill: 100px

/* Sombras coloreadas */
shadow-blue:   0 24px 60px -30px rgba(37,64,192,.4)
shadow-orange: 0 22px 50px -30px rgba(234,106,46,.4)
```

---

## Animaciones (del reference HTML + awwwards-animations skill)

### CSS nativo (sin JS, máximo rendimiento)
| Nombre | Tipo | Timing | Uso |
|---|---|---|---|
| `ar-drift1` | translate+scale | 17s ease-in-out infinite | Blob azul aurora |
| `ar-drift2` | translate+scale | 20s ease-in-out infinite | Blob naranja aurora |
| `ar-drift3` | translate+scale | 23s ease-in-out infinite | Blob crema aurora |
| `ar-marquee` | translateX(-50%) | 38s linear infinite | Marquee loop |
| `ar-pulse` | opacity 1→0.3→1 | 1.8s infinite | Dot naranja en pill nav |
| `ar-kin` | opacity+Y+blur | 1–1.05s cubic-bezier(0.16,1,0.3,1) | Entrada kinética hero |

### GSAP + ScrollTrigger (scroll-driven)
| Animación | Trigger | Valores | Fallback |
|---|---|---|---|
| `[data-reveal]` scroll reveal | IntersectionObserver threshold 0.12 | opacity 0→1, Y 34→0, 0.9s | `setTimeout` 4.5s fuerza visible |
| Parallax hero text | scrub scroll | Y * 0.16, opacity fade | Desactivado en reduced-motion |
| Parallax hero bg | scrub scroll | Y * 0.26, scale 1→1.04 | Desactivado en reduced-motion |
| Number counter | once: true | `{val: 0}` → `{val: X}` gsap.to, onUpdate | Estado final visible |
| Image reveal | once: true | clipPath inset(100%→0%) + scale 1.3→1 | Estado final visible |

### Motion (React islands)
| Componente | Técnica |
|---|---|
| Magnetic buttons | spring stiffness:150 damping:15 en hover |
| Nav mobile menu | AnimatePresence + stagger delay |
| Custom cursor | GSAP ticker + mix-blend-difference |

### `prefers-reduced-motion: reduce`
- `[data-kin]`: animation none, opacity 1, transform none, filter none
- `[data-reveal]`: estado final visible inmediatamente
- Lenis desactivado (scroll nativo)
- GSAP ScrollTrigger duración 0

---

## Estructura de archivos (Astro 5)

```
src/
├── components/
│   ├── layout/
│   │   ├── Nav.tsx             ← isla React (mobile menu, language toggle)
│   │   └── Footer.astro
│   ├── sections/
│   │   ├── Hero.astro
│   │   ├── Marquee.astro
│   │   ├── About.astro
│   │   ├── Numbers.astro
│   │   ├── Work.astro
│   │   ├── Research.astro
│   │   └── Contact.tsx         ← isla React (formulario con estado)
│   └── ui/
│       ├── CustomCursor.tsx    ← isla React
│       ├── MagneticButton.tsx  ← isla React
│       └── RevealText.astro    ← animación de texto (solo class + data attr)
├── data/
│   ├── projects.ts             ← 4 proyectos tipados
│   ├── publications.ts         ← 2 publicaciones IEEE
│   ├── stats.ts                ← stats/numbers
│   └── i18n.ts                 ← strings EN/ES
├── layouts/
│   └── Base.astro              ← head SEO + Nav + Footer + scripts
├── pages/
│   ├── index.astro
│   └── project/
│       ├── larc-2025.astro
│       ├── fault-detection.astro
│       ├── fault-detection-case.astro
│       └── self-balancing-platform.astro
└── styles/
    └── global.css              ← @import tailwindcss, @theme tokens, CSS animations
```

---

## Inventario de contenido (migrar de sitio actual)

### Nav
| Elemento | Valor | ¿Migrado? |
|---|---|---|
| Avatar | "A" (círculo azul, Instrument Serif) | [ ] |
| Nombre | "Alessandro Reyes" | [ ] |
| Links | Work · Research · About · Contact | [ ] |
| Pill | "Open to Summer 2026" + dot naranja pulsante | [ ] |
| GitHub | github.com/Alesso-24 | [ ] |
| LinkedIn | linkedin.com/in/alessandro-reyes-mtz/ | [ ] |
| Instagram | @alessandro_reyesm | [ ] |
| Language toggle | EN / ES | [ ] |

### Hero
| Elemento | Valor | ¿Migrado? |
|---|---|---|
| Label | "Mechatronics · Embedded AI · Robotics" | [ ] |
| H1 | "Building AI that survives contact with real hardware." | [ ] |
| H1 itálica naranja | "real hardware." | [ ] |
| Párrafo | "Mechatronics engineer crafting intelligent systems where software meets motors, sensors and microcontrollers — built to work in the real world." | [ ] |
| CTA primario | "View work ↗" → #work | [ ] |
| CTA secundario | "Get in touch" → #contact | [ ] |
| Scroll hint | "Scroll" + línea vertical | [ ] |
| Fondo | Aurora (3 blobs CSS) | [ ] |

### Stats / Numbers
| Elemento | Valor | ¿Migrado? |
|---|---|---|
| Stat 1 | **126×** "Faster inference, measured on real ESP32 hardware" | [ ] |
| Stat 2 | **99.85%** "Accuracy with zero false positives" | [ ] |
| Stat 3 | **98.4%** "Less energy than streaming to the cloud" | [ ] |
| Stat 4 | **2×** "IEEE accepted papers (CASE 2026 + BDAI 2026)" | [ ] |

### About
| Elemento | Valor | ¿Migrado? |
|---|---|---|
| Label | "Who I am" | [ ] |
| H2 | "I build AI that doesn't just run in a notebook — it runs on motors, sensors and microcontrollers, in the real world." | [ ] |
| H2 itálica azul | "motors, sensors and microcontrollers," | [ ] |
| Bio | Párrafos completos de en.json | [ ] |
| Focus Areas | Intelligent Systems · Hardware Integration · Machine Learning · Control Systems | [ ] |

### Work (proyectos)
| Proyecto | Tag | Imagen | Card | ¿Migrado? |
|---|---|---|---|---|
| LARC 2025 — Tracky | Robotics | larc_arena.webp | Grande 16:9 | [ ] |
| IEEE CASE 2026 | Research | cover_case.webp | 4:3 | [ ] |
| IEEE BDAI 2026 | Research | cover_bdai.webp | 4:3 | [ ] |
| Self-Balancing Platform | Robotics / CV | plat1.webp | 4:3 | [ ] |

### Research / Publications
| Pub | Año | Venue | ¿Migrado? |
|---|---|---|---|
| Edge AI Decision Framework... | 2026 | IEEE CASE 2026 | [ ] |
| Comparative Evaluation of Lightweight ML... | 2026 | IEEE BDAI 2026 | [ ] |

### Contact
| Elemento | Valor | ¿Migrado? |
|---|---|---|
| Email primario | jordi.reyes.martinez@gmail.com | [ ] |
| CC (INTENCIONAL) | jordi.reyes@iberopuebla.mx | [ ] |
| Ubicación | Puebla, Mexico | [ ] |
| Formulario | FormSubmit.co AJAX + honeypot | [ ] |
| GitHub CTA | github.com/Alesso-24 | [ ] |
| LinkedIn CTA | linkedin.com/in/alessandro-reyes-mtz/ | [ ] |

### Imágenes (public/images/ — conservar todas)
Alessandro.webp · case_fdr.webp · case_latency.webp · case_pca.webp · cover_bdai.webp · cover_case.webp · larc_arena.webp · larc_team.webp · paper1/3/5/6.webp · plat1/2/3.webp · project1.webp · robot_full.webp

---

## Fases

- [x] **Fase 0** — Auditoría + PLAN.md + rama `redesign` · commit `671509a`
- [x] **Fase 1** — Scaffold Astro 7 + Tailwind 4 + GSAP + Lenis + todos los componentes homepage · commit `b2f84b7`
  - ✅ `astro.config.mjs`, `tsconfig.json`, `src/env.d.ts`
  - ✅ `src/styles/global.css` — tokens + keyframes aurora/marquee/pulse/kin + reduced-motion
  - ✅ `src/data/content.ts` — todo el contenido EN/ES en un solo archivo
  - ✅ `src/layouts/Base.astro` — SEO, Lenis+GSAP script, scroll reveals, parallax, counters
  - ✅ `src/components/layout/Nav.tsx` — isla React, avatar, pill pulsante, lang toggle, mobile menu
  - ✅ `src/components/layout/Footer.astro`
  - ✅ `src/components/sections/Hero.astro` — aurora, kinetic, parallax, CTAs
  - ✅ `src/components/sections/Marquee.astro`
  - ✅ `src/components/sections/About.astro`
  - ✅ `src/components/sections/Numbers.astro` — counters animados
  - ✅ `src/components/sections/Work.astro` — cards con sombras de color, hover
  - ✅ `src/components/sections/Research.astro` — filas IEEE
  - ✅ `src/components/sections/Contact.tsx` — isla React, full-bleed azul, form FormSubmit
- [ ] **Fase 8** — 4 páginas de detalle ← **AQUÍ EMPIEZA LA PRÓXIMA SESIÓN**
  - [ ] `src/pages/project/larc-2025.astro`
  - [ ] `src/pages/project/fault-detection-case.astro`
  - [ ] `src/pages/project/fault-detection.astro`
  - [ ] `src/pages/project/self-balancing-platform.astro`
- [ ] **Fase 9** — Responsive 320px–4K + accesibilidad + `prefers-reduced-motion` fino
- [ ] **Fase 10** — Lighthouse ≥ 95, SEO final, verificación en producción, merge `redesign` → `main`

---

## Registro de cambios

| Fecha | Acción | Commit |
|---|---|---|
| 2026-06-27 | Fase 0: auditoría + PLAN.md + rama redesign | 671509a |
| 2026-06-27 | Fase 1: scaffold Astro 7 completo — 9 secciones, data layer, Lenis+GSAP | b2f84b7 |
