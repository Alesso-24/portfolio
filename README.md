# Alessandro Reyes — Mechatronics & Software Portfolio

> Editorial-style, bilingual (EN/ES) portfolio for a mechatronics engineer working at the hardware/software boundary. Built with **Astro 7**, deployed to **GitHub Pages** via GitHub Actions.

**Live site:** [alesso-24.github.io/portfolio](https://alesso-24.github.io/portfolio/)

---

## Features

| Feature | Details |
|---|---|
| Bilingual (EN/ES) | CSS-based language toggle — all text, buttons, badges switch without a page reload |
| Editorial design | Cream-and-ink palette, Instrument Serif + Hanken Grotesk, generous whitespace |
| Scroll animations | GSAP + ScrollTrigger `[data-reveal]` elements, Lenis smooth scroll |
| Project pages | YouTube embeds, IEEE badges, stat grids, tech cards, image galleries — all bilingual |
| SEO | OG/Twitter cards, JSON-LD structured data, sitemap, robots.txt |
| Security | Content-Security-Policy, Referrer-Policy, Permissions-Policy headers |
| CI/CD | GitHub Actions builds and deploys on every push to `main` |
| Fully responsive | Mobile-first, tested from 320px to 1440px+; clamp() fluid sizing throughout |

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | [Astro 7](https://astro.build/) (static output, base `/portfolio/`) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) — CSS-first `@theme {}` block |
| React islands | [React 19](https://react.dev/) via `@astrojs/react` — Nav, Contact |
| Animations | [GSAP 3](https://gsap.com/) + ScrollTrigger + `@gsap/react` |
| Smooth scroll | [Lenis 1.3](https://lenis.darkroom.engineering/) |
| Fonts | Instrument Serif (headings) · Hanken Grotesk (body) — self-hosted via Fontsource |
| Icons | [Lucide React](https://lucide.dev/) |
| Deployment | GitHub Actions → `gh-pages` branch → GitHub Pages |
| Node | ≥ 22 required (Astro 7 peer requirement) |

---

## Project structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Nav.tsx          # React island: EN/ES toggle, hamburger menu, status pill
│   │   └── Footer.astro     # Bilingual footer
│   └── sections/
│       ├── Hero.astro        # Editorial split: text left, portrait right
│       ├── About.astro       # 2-col bio grid
│       ├── Numbers.astro     # Stats bar (2-col mobile → 4-col desktop)
│       ├── Work.astro        # Featured card + 3-col project grid
│       ├── Research.astro    # Publication rows with IEEE badges
│       └── Contact.tsx       # React island: mailto form, lang-change event listener
│
├── layouts/
│   ├── Base.astro            # HTML shell, Lenis+GSAP init, skip link
│   └── ProjectLayout.astro   # Project page chrome; <style is:global> for slot content
│
├── pages/
│   ├── index.astro           # Home page
│   └── project/
│       ├── larc-2025.astro
│       ├── self-balancing-platform.astro
│       ├── fault-detection.astro
│       └── fault-detection-case.astro
│
├── data/
│   └── content.ts            # Single source of truth for all copy (EN + ES)
│
└── styles/
    └── global.css            # Design tokens, i18n CSS system, GSAP keyframes

public/
├── images/                   # .webp project photos + Alessandro.webp portrait
├── sitemap.xml
├── robots.txt
└── llms.txt

.github/workflows/
└── deploy.yml                # CI/CD: build → gh-pages on push to main
```

---

## i18n architecture

Language switching uses a **CSS attribute selector** approach — no server rendering, no React state propagation to static islands:

```css
/* global.css */
.lang-es { display: none !important; }
html[lang="es"] .lang-en { display: none !important; }
html[lang="es"] .lang-es { display: revert !important; }
```

Nav.tsx sets `document.documentElement.setAttribute('lang', 'es')` and dispatches a `lang-change` CustomEvent. Static Astro components react via CSS. The Contact.tsx React island listens for `lang-change` to update its own state.

---

## Design tokens

All tokens live in `src/styles/global.css` under `@theme {}`:

| Token | Value | Usage |
|---|---|---|
| `--color-cream` | `#f3ede1` | Page background |
| `--color-cream-alt` | `#efe7d8` | Card surfaces, stat highlight |
| `--color-ink` | `#211f1a` | Primary text, headings |
| `--color-muted` | `#6f6a5f` | Secondary text, labels |
| `--color-blue` | `#2540c0` | Accent — links, stats, IEEE badges |
| `--color-orange` | `#ea6a2e` | Accent — CTAs, pull-quote border, bullet dot |

---

## Local development

**Prerequisites:** Node.js ≥ 22, npm ≥ 9

```bash
npm install
npm run dev        # http://localhost:4321/portfolio/
npm run build      # production build → dist/
npm run preview    # serve dist/ locally
npm run lint       # astro check (TypeScript)
```

---

## Deployment

Push to `main` → GitHub Actions runs `.github/workflows/deploy.yml` → builds with `npm run build` → pushes `dist/` to `gh-pages` branch → live in ~2 min.

Manual deploy is not needed and not supported (the old `gh-pages` npm script was removed).

---

## Pending / roadmap

- Update project content and proof-point numbers once CASE 2026 / BDAI 2026 papers are indexed on IEEE Xplore (~Sep–Nov 2026)
- Add LARC 2025 GitHub repo link when published
- Improve body copy across project pages (planned for a future session)
- Consider adding a `/cv` or downloadable PDF resume page

---

## Contact

**Alessandro Reyes**
- jordi.reyes.martinez@gmail.com *(CC: jordi.reyes@iberopuebla.mx)*
- [github.com/Alesso-24](https://github.com/Alesso-24)
- [linkedin.com/in/alessandro-reyes-mtz](https://www.linkedin.com/in/alessandro-reyes-mtz)

---

## License

Open source for educational and portfolio reference purposes.  
All written content, research descriptions, and imagery © 2026 Alessandro Reyes.
