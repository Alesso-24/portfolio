# Alessandro Reyes — Mechatronics & Software Portfolio

> A highly-optimized, premium dark-mode portfolio web app built with **React** and **Vite**, featuring cursor-reactive animations, a Bento-Grid About section, glassmorphism UI, and lazy-loaded page routes. Deployed to **GitHub Pages**.

🌐 **Live Site:** [alesso-24.github.io/portafolio-mecatronica](https://alesso-24.github.io/portafolio-mecatronica/)

---

## ✨ Features

| Feature | Details |
|---|---|
| 🎨 Premium Dark Mode | Deep monochrome palette `#050505` with white/silver accents |
| 🌊 Smooth Scrolling | [Lenis](https://github.com/darkroomengineering/lenis) — silky-smooth trackpad & mouse scroll |
| 🖱️ Cursor-Reactive Hero | Canvas2D radial gradient spotlight that follows the pointer |
| 🪟 Glassmorphism Navbar | Floating pill nav with `backdrop-filter: blur` |
| 📐 Bento Grid Layout | About section organized in modern mosaic panels |
| ⚡ Lazy-Loaded Routes | All page-level components loaded on demand via `React.lazy` |
| 📱 Fully Responsive | Touch-optimized navbar, 44px min tap targets, iOS tap color reset |
| 🚀 Scroll Animations | GSAP + ScrollTrigger entrance animations throughout |

---

## 🗂️ Project Structure

```
portafolio-mecatronica/
├── public/
│   └── images/              # Static project images (PNG/JPG)
│
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── About.jsx        # Bento-grid "About Me" section
│   │   ├── Contact.jsx      # Contact section + footer
│   │   ├── ErrorBoundary.jsx# React error boundary wrapper
│   │   ├── Hero.jsx         # Hero section (text + gradient bg)
│   │   ├── HeroGradient.jsx # Canvas2D cursor-reactive background
│   │   ├── Navbar.jsx       # Glassmorphism pill nav + mobile overlay menu
│   │   ├── ProjectDetail.jsx# Generic project detail layout
│   │   ├── Projects.jsx     # Project list with parallax images
│   │   └── ui/              # Atomic UI utilities (text-scramble, etc.)
│   │
│   ├── pages/               # Full-page route components
│   │   ├── FaultDetection.jsx       # IEEE BDAI paper detail
│   │   ├── FaultDetectionCASE.jsx   # IEEE CASE paper detail (Edge AI)
│   │   └── SelfBalancingPlatform.jsx# Self-Balancing Platform project
│   │
│   ├── App.jsx              # Root: Router, Lenis init, lazy routes
│   ├── main.jsx             # React DOM entry-point
│   └── index.css            # Global design tokens & Tailwind v4 config
│
├── index.html               # HTML shell (Google Fonts, meta tags)
├── vite.config.js           # Vite config (base path for GitHub Pages)
└── package.json             # Dependencies & npm scripts
```

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [React 19](https://react.dev/) |
| Build Tool | [Vite 7](https://vite.dev/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Animations | [GSAP 3](https://gsap.com/) + ScrollTrigger |
| Smooth Scroll | [Lenis](https://github.com/darkroomengineering/lenis) |
| Routing | [React Router DOM v6](https://reactrouter.com/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Deployment | [gh-pages](https://www.npmjs.com/package/gh-pages) → GitHub Pages |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9

### Install dependencies
```bash
npm install
```

### Run development server
```bash
npm run dev
```
Then open [http://localhost:5173/portafolio-mecatronica/](http://localhost:5173/portafolio-mecatronica/)

### Build for production
```bash
npm run build
```

### Preview production build locally
```bash
npm run preview
```

### Deploy to GitHub Pages
```bash
npm run deploy
```
This runs `npm run build` first (`predeploy` hook), then pushes `./dist` to the `gh-pages` branch via the `gh-pages` package.

---

## 🎨 Design System

All design tokens live in `src/index.css` under `@theme`:

| Token | Value | Usage |
|---|---|---|
| `--color-brand-dark` | `#050505` | Page background |
| `--color-brand-gray` | `#121212` | Card / panel surfaces |
| `--color-brand-primary` | `#e5e5e5` | Body text |
| `--color-brand-accent` | `#ffffff` | Headings & highlights |
| `--font-display` | `Outfit` | All headings (`h1–h6`) |
| `--font-sans` | `Inter` | Body text & UI labels |
| `--font-mono` | `Space Mono` | Technical labels & metadata |

**Utility classes:**
- `.glass` — subtle `backdrop-blur-xl` card surface
- `.glass-panel` — heavier blur for the Navbar pill
- `.text-glow` — soft white glow on headings
- `.fade-up` — GSAP entrance animation target (hardware-accelerated via `will-change`)

---

## 📄 Pages & Routing

All routes use **hash-based routing** (`HashRouter`) for GitHub Pages compatibility.

| Route | Component | Description |
|---|---|---|
| `/` | `Home` (inline) | Hero → About → Projects → Contact |
| `/project/self-balancing-platform` | `SelfBalancingPlatform` | Robotics CV project |
| `/project/fault-detection` | `FaultDetection` | IEEE BDAI scientific paper |
| `/project/fault-detection-case` | `FaultDetectionCASE` | IEEE CASE Edge AI paper |

---

## ⚙️ Performance Decisions

- **Canvas2D Hero Background** — replaced Three.js/WebGL with a lightweight Canvas2D gradient that reacts to mouse/touch. Achieves 60fps on any device with zero GPU overhead.
- **Lenis Centralized** — a single Lenis instance in `App.jsx`; individual pages do NOT reinitialize it (prevents competing scroll controllers).
- **No CSS `blur()` on scrolling elements** — replaced `blur-[120px]` effects with `radial-gradient` equivalents. CSS blur on elements that repaint on scroll cripples performance.
- **`will-change: transform, opacity`** — pre-promotes `.fade-up` elements to their own compositing layer.
- **Lazy routes** — all page-level components split into separate JS chunks loaded on demand.
- **`loading="lazy"`** — all project images use native browser lazy-loading.

---

## 📬 Contact

**Alessandro Reyes**
- 📧 jordi.reyes.martinez@gmail.com *(CC: jordi.reyes@iberopuebla.mx)*
- 🐙 [github.com/Alesso-24](https://github.com/Alesso-24)
- 💼 [LinkedIn](https://www.linkedin.com/in/alessandro-reyes-mtz)

---

## 📝 License

This project is **open source** for educational and portfolio reference purposes.  
All written content, research descriptions, and imagery are © 2026 Alessandro Reyes.
