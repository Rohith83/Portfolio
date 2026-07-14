# Rohith M — Portfolio

A responsive, animated portfolio built with React.js, Tailwind CSS, and Framer Motion.

## Stack

- **React.js** (Vite)
- **Tailwind CSS** — utility-first styling, dark mode via `class` strategy
- **Framer Motion** — scroll reveals, hero sequence, micro-interactions
- **React Icons** — `react-icons/fi` (Feather icon set)

## Getting Started

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into /dist
npm run preview  # preview the production build
```

## Project Structure

```
src/
  components/      Reusable UI: Navbar, Button, SectionHeading, ScrollProgress,
                    ScrollToTop, Loader, CustomCursor, ThemeToggle, AnimatedCounter
  sections/        One file per page section (Hero, About, Skills, Experience,
                    Projects, Services, Journey, Certifications, Contact, Footer)
  context/         ThemeContext (dark/light mode)
  data/content.js  ALL editable content lives here — name, roles, skills,
                    experience, projects, services, journey, certifications
  hooks/motionVariants.js  Shared Framer Motion variants (fadeUp, stagger, etc.)
```

## Customizing Content

Almost everything you'd want to change lives in **`src/data/content.js`**:

- `personal` — name, roles, tagline, email, social links, resume path
- `stats` — About section counters
- `skills` — grouped by category, each with a `level` (0–100) for the progress bar
- `experience` — internship timeline entries
- `projects` — project cards (title, description, features, tech, links)
- `services` — what-I-can-help-with cards
- `journey` — horizontal/vertical career path rail
- `certifications` — credential cards
- `navLinks` — navbar + footer links

### Adding your resume

Drop your PDF into `public/resume.pdf` (or update `personal.resumeUrl` in
`content.js` to point elsewhere). The "Download Resume" button in the Hero
section uses this path directly.

### Adding real project links

Each entry in `projects` has `github` and `demo` fields currently set to `'#'`.
Replace with your live GitHub repo and deployed demo URLs.

### Adding a profile photo

The Hero section currently uses a code-editor visual instead of a photo
placeholder. If you'd like a headshot instead, swap the panel inside
`src/sections/Hero.jsx` for an `<img>` tag.

## Design Notes

- Color system: brand blue `#1277FF` on a white/near-black ink palette, defined
  in `tailwind.config.js` under `theme.extend.colors`.
- Typography: Space Grotesk (headings), Inter (body), JetBrains Mono (code/tags) —
  loaded via Google Fonts in `index.html`.
- Dark mode toggles the `dark` class on `<html>`; respects system preference on
  first load.
- Respects `prefers-reduced-motion` globally (see `src/index.css`).
- Custom cursor only activates on fine-pointer (desktop/mouse) devices.

## Deployment

This is a static Vite build — deploy `dist/` to Vercel, Netlify, GitHub Pages,
or any static host. For GitHub Pages, set `base` in `vite.config.js` to your
repo name if not deploying to a custom domain.
