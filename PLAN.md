# PLAN — Migración del portfolio al nuevo diseño

## Estado actual
- Fase en curso: **Fase 0 completada — esperando aprobación**
- Último paso completado: Auditoría + inventario de contenido + creación de PLAN.md
- 👉 Próximo paso: Aprobación del plan → Fase 1 (tokens, fuentes, estructura base)

---

## Decisiones técnicas

| Decisión | Elección | Razón |
|---|---|---|
| Stack | **React 19 + Vite 7 + Tailwind CSS 4 + GSAP 3 + Lenis + Framer Motion 12** | Ya instalado; el brief dice "si hay stack montado, respétalo". Coincide con la alternativa válida del brief. |
| Fuentes | **Instrument Serif** (ya instalado) + **Hanken Grotesk** (agregar) | Especificadas en el brief. Self-host via Fontsource. |
| Animaciones | **GSAP + ScrollTrigger** para reveals/parallax · **Framer Motion** para transiciones de UI · **Lenis** para smooth scroll | Ya instalados. |
| Aurora | **CSS puro** (radial-gradients + blur + @keyframes) | Brief lo especifica, sin WebGL. |
| i18n (EN/ES) | **Conservar** | Feature del sitio actual no en la referencia, pero tiene valor real. |
| Páginas de detalle | **Conservar y rediseñar** | 4 páginas de proyecto existentes (/project/*). |
| Base path Pages | `/portfolio/` | GitHub Pages project site, igual que ahora. |
| Rama de trabajo | `redesign` | Creada. PRs a `main` al finalizar cada fase. |

---

## Inventario de contenido

### Nav
| Elemento | Valor exacto | Sección nueva | ¿Migrado? |
|---|---|---|---|
| Logo | "ALESSANDRO." | Nav | [ ] |
| Links | About · Projects · Contact | Nav | [ ] |
| GitHub | github.com/Alesso-24 | Nav + Contact | [ ] |
| LinkedIn | linkedin.com/in/alessandro-reyes-mtz/ | Nav + Contact | [ ] |
| Instagram | @alessandro_reyesm | Nav | [ ] |
| Language toggle | EN / ES | Nav | [ ] |
| Status pill | "Open to Summer 2026" (pulsing dot) | Nav | [ ] |

### Hero
| Elemento | Valor exacto | Sección nueva | ¿Migrado? |
|---|---|---|---|
| Label | "Mechatronics · Embedded AI · Robotics" | Hero | [ ] |
| H1 | "Building AI that survives contact with real hardware." | Hero | [ ] |
| Subtítulo | "AI and embedded systems that survive contact with real hardware — validated on the chip, not just in simulation." | Hero | [ ] |
| CTA primario | "View work" → #projects | Hero | [ ] |
| CTA secundario | "Get in touch" → #contact | Hero | [ ] |
| Scroll hint | "Scroll to Explore" | Hero | [ ] |
| Fondo | Aurora (CSS, 3 blobs radiales azul/naranja/crema) | Hero | [ ] |

### Stats / Numbers
| Elemento | Valor exacto | Sección nueva | ¿Migrado? |
|---|---|---|---|
| Stat 1 | **126×** — "Faster inference, measured on real ESP32 hardware" | Numbers | [ ] |
| Stat 2 | **99.85%** — "Accuracy with zero false positives" | Numbers | [ ] |
| Stat 3 | **98.4%** — "Less energy than streaming to the cloud" | Numbers | [ ] |
| Stat 4 | **2×** — IEEE author (CASE 2026 + BDAI 2026) | Numbers | [ ] |
| Afiliaciones | IEEE · Tecnológico de Monterrey · IBERO Puebla · Universidad Veracruzana | Numbers/About | [ ] |

### About
| Elemento | Valor exacto | Sección nueva | ¿Migrado? |
|---|---|---|---|
| Nombre | Alessandro Reyes | About | [ ] |
| Bio p1 | "I am Alessandro Reyes, a Mechatronics Engineering student at IBERO Puebla. My work sits at the intersection of robust mechanical design, embedded systems, and applied artificial intelligence." | About | [ ] |
| Bio p2 | "From deploying machine learning models on microcontrollers to architecting closed-loop control systems for competitive robotics, I build technology that works in the real world, not just in simulation." | About | [ ] |
| Focus Areas | Intelligent Systems · Hardware Integration · Machine Learning · Control Systems | About | [ ] |
| Disponibilidad | "Open to Summer 2026 internships & international research collaborations" | Nav pill + About | [ ] |

### Work / Projects
| Elemento | Descripción | Imagen | Sección nueva | ¿Migrado? |
|---|---|---|---|---|
| LARC 2025 | "Tracky: High-Speed Line Follower Robot" — ESP32-C6, PID, BLE, LARC Competition | larc_arena.webp / larc_team.webp | Work (card grande) | [ ] |
| IEEE CASE 2026 | "Edge AI Decision Framework: Quantifying the Sensitivity-Latency Trade-off" | cover_case.webp | Work (card) | [ ] |
| IEEE BDAI 2026 | "Industrial Fault Detection via Machine Learning" — 99.85% acc, 0 FP | cover_bdai.webp | Work (card) | [ ] |
| Self-Balancing Platform | "Self-Balancing Platform with Computer Vision" — ESP32 + OpenCV + IK | plat1/2/3.webp | Work (card) | [ ] |

### Research / Publications
| Elemento | Valor exacto | Sección nueva | ¿Migrado? |
|---|---|---|---|
| Pub 1 | "Edge AI Decision Framework…" — IEEE CASE 2026 — Ago 17–21, 2026, Shenyang | Research | [ ] |
| Pub 2 | "Comparative Evaluation of Lightweight Supervised ML…" — IEEE BDAI 2026 — Jul 3–5, 2026, Chongqing | Research | [ ] |

### Contact
| Elemento | Valor exacto | Sección nueva | ¿Migrado? |
|---|---|---|---|
| Email primario | jordi.reyes.martinez@gmail.com | Contact | [ ] |
| CC (INTENCIONAL, no eliminar) | jordi.reyes@iberopuebla.mx | Contact | [ ] |
| Ubicación | Puebla, Mexico | Contact | [ ] |
| Formulario | FormSubmit.co AJAX, honeypot `_honey` | Contact | [ ] |

### Assets / Imágenes
| Archivo | Uso | ¿Migrado? |
|---|---|---|
| Alessandro.webp | Foto de perfil (hero variante foto / about) | [ ] |
| cover_case.webp | Card CASE 2026 | [ ] |
| cover_bdai.webp | Card BDAI 2026 | [ ] |
| larc_arena.webp | Card / detalle LARC 2025 | [ ] |
| larc_team.webp | Detalle LARC 2025 | [ ] |
| plat1/2/3.webp | Card / detalle Self-Balancing | [ ] |
| project1.webp | Card / hero (a confirmar uso exacto) | [ ] |
| robot_full.webp | Detalle LARC | [ ] |
| case_fdr/latency/pca.webp | Detalle CASE 2026 | [ ] |
| paper1/3/5/6.webp | Detalle BDAI 2026 | [ ] |
| favicon.svg | Nav favicon | [ ] |
| og-image.png | Open Graph | [ ] |

### Extra (en el viejo, NO en la referencia → conservar)
| Elemento | Decisión |
|---|---|
| EN/ES language toggle | Conservar completo (LanguageContext + locales/) |
| 4 páginas de detalle de proyecto (/project/*) | Conservar y rediseñar con tokens nuevos |
| Instagram social link | Conservar en nav y menú móvil |
| ProofBar con afiliaciones | Integrar en sección Numbers |
| Tech Stack display | Integrar en About o eliminar (pendiente decisión) |

---

## Fases

- [x] **Fase 0** — Auditoría + PLAN.md + rama `redesign` + commit inicial
- [ ] **Fase 1** — Tokens de diseño (colores, fuentes, escala tipográfica), instalar Hanken Grotesk, Tailwind config
- [ ] **Fase 2** — Migración de contenido a data layer (`src/data/content.ts`)
- [ ] **Fase 3** — Implementación del diseño por sección (Nav → Hero/Aurora → Marquee → About → Numbers → Work → Research → Contact → Footer)
- [ ] **Fase 4** — Páginas de detalle rediseñadas + responsive (320px–4K) + accesibilidad + `prefers-reduced-motion`
- [ ] **Fase 5** — Performance (Lighthouse ≥ 95), SEO, verificación en producción

---

## Tokens de diseño (del brief)

```
--cream         #f3ede1   /* fondo principal */
--cream-alt     #efe7d8   /* secciones alternas (marquee, Work) */
--ink           #211f1a   /* texto principal */
--muted         #6f6a5f   /* texto secundario */
--muted-soft    #534f46   /* párrafos sobre crema */
--hairline      #8a8579   /* labels apagados / líneas */
--blue          #2540c0   /* AZUL REY: marca, CTA, Contact full-bleed */
--orange        #ea6a2e   /* NARANJA: acento, itálicas, detalles */
--on-blue       #f3ede1   /* texto sobre azul */
```

Tipografía:
- Display/serif: Instrument Serif 400 + italic (ya instalada)
- UI/text: Hanken Grotesk 300–700 (agregar)
- Labels: Hanken Grotesk 600, ~12px, MAYÚSCULAS, tracking 0.16em, color muted, punto naranja 9px

---

## Registro de cambios

| Fecha | Acción | Commit |
|---|---|---|
| 2026-06-27 | Fase 0: auditoría + PLAN.md + rama redesign | (pendiente) |
