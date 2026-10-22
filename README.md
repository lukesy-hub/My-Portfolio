# Muhammad Talha — Portfolio

Personal portfolio of Muhammad Talha, Full Stack Developer & AI Automation Engineer (Lahore, PK).
Multi-page Next.js site: editorial/Swiss typography, liquid-glass UI, light & dark themes, and real
screenshots of every live project.

## Getting started

Requires Node.js 20.9+.

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script          | What it does                          |
| --------------- | ------------------------------------- |
| `npm run dev`   | Development server (Turbopack)        |
| `npm run build` | Production build + TypeScript check   |
| `npm run start` | Serve the production build            |
| `npm run lint`  | ESLint (Next.js core-web-vitals + TS) |

Type-check on its own with `npx tsc --noEmit` (run `npx next typegen` first on a fresh clone).

## Routes

| Route               | Purpose                                                                 |
| ------------------- | ----------------------------------------------------------------------- |
| `/`                 | Hero with portrait, featured project reel, intro, stack overview, CTA   |
| `/projects`         | Fanned-deck header, filter + search, Gallery / Index views, other work  |
| `/projects/[slug]`  | Case study per project — scrollable full-page screenshot, facts, links  |
| `/about`            | Background, approach, spec sheet, WebGL “Lab” playground                |
| `/experience`       | Career timeline and education (from the CV)                             |
| `/skills`           | Bento grid of skills and tools                                          |
| `/contact`          | Contact details, copy-email, mail-composer form                         |

All pages are statically generated, so direct links and refreshes work on any route. Unknown routes
render `app/not-found.tsx` with a 404 status.

## Stack

- **Next.js 16** (App Router, TypeScript, static generation) and **React 19**
- **CSS Modules** + design tokens in `src/app/globals.css` (no CSS framework)
- **Fonts** via `next/font`: Geist (UI), Geist Mono (labels), Fraunces (editorial serif)
- **Motion** — GSAP + ScrollTrigger for scroll-scrubbed effects; Motion (`motion/react`) for component
  state, presence and layout animations; Lenis for smooth scrolling (disabled for reduced motion)
- **Three.js** — one lazily loaded reeded-glass shader (`src/lib/reededGlass.ts`) used in the About-page
  Lab, with a CSS fallback for no-WebGL or low-power devices

## Project structure

```
src/
  app/                 routes, layout, metadata, sitemap, robots, OG image, favicon
  components/          UI (Nav, Footer, Hero, Experience, Skills, Lab, …)
    work/              project reel, explorer (gallery + index), visuals, other work
    contact/           contact form, copy-email, CTA band
    home/              home-only sections
  data/                profile.ts · projects.ts · experience.ts · skills.ts   ← edit content here
  lib/                 hooks, scroll helpers, GSAP setup, shader engine
public/
  work/                project screenshots (desktop, mobile, full-page)
  Personal-Pic.jpeg    portrait (file name is case-sensitive on Vercel)
  Muhammad-Talha-CV.pdf
```

### Adding a project

1. Capture screenshots into `public/work/`: `<slug>.webp` (1440×900), optionally `<slug>-mobile.webp`
   (390×844) and `<slug>-long.webp` (960 wide, full page).
2. Add an entry to `projects` in `src/data/projects.ts` (set `media.mobile` / `media.long` to match).
3. To feature it on the home page, add the slug to `featuredSlugs` in the same file.

The case-study page, sitemap entry and filters update automatically.

### Updating the CV

Replace `public/Muhammad-Talha-CV.pdf` (self-hosted so the download is direct and reliable). The Google
Drive original is linked as `profile.cv.driveUrl` in `src/data/profile.ts`.

## Notes

- **Scrollbar** — the page scrollbar is hidden visually (`globals.css`); the fixed gradient bar at the
  top shows scroll progress on every page. The featured reel has its own always-visible scrollbar.
- **Contact form** — there is no backend; the form composes an email in the visitor’s mail app and says
  so. To store submissions, connect a form service and update `ContactForm.tsx`.
- **Links** — internal links prefetch on hover/focus (`components/IntentLink.tsx`) instead of on view.
- **Footer year** is set in `Footer.tsx`.

## Deployment (Vercel)

No extra configuration is needed: import the repository in Vercel (framework preset **Next.js**,
build command `next build`). If the production domain changes, update `profile.siteUrl` in
`src/data/profile.ts` — it drives canonical URLs, Open Graph, the sitemap and robots.txt.
