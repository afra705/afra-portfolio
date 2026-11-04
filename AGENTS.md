# AGENTS.md

Single-page portfolio + project pages. React 18 + Vite 5 + Tailwind CSS 3 + React Router 6 + Framer Motion + Lucide.

## Commands

```bash
npm install
npm run dev      # Vite dev server, http://localhost:5173
npm run build    # production output in dist/
npm run preview  # serve the built dist/
```

There is **no** test, lint, typecheck, or format script/config. Do not invent one; verify changes with `npm run build` and by exercising the affected route in a browser.

Tailwind config/token edits (e.g. adding `cream`) require restarting `npm run dev`. Vite/PostCSS caches `tailwind.config.js`, and HMR can fail with `The \`text-*\` class does not exist` even though the config is valid and `npm run build` passes.

## Repo layout / git

- The git root is `C:\Users\Asus\Desktop\Level-1`, **not** this folder. `git status` from here shows unrelated sibling exercise folders; stage only files under `Porfolio/afra-portfolio`.
- This folder is a standalone Vite app (no monorepo/workspace tooling). `node_modules`, `dist`, `.env`, `.vercel` are gitignored.
- Entry chain: `index.html` → `src/main.jsx` (`BrowserRouter` + `MotionConfig reducedMotion="user"`) → `src/App.jsx` → pages/sections.

## Architecture

- `src/pages/` = route-level views: `/` (Home), `/projects` (AllProjects), `/projects/:id` (ProjectDetails), `*` (NotFound). All routes are client-side; scroll-to-top is handled in `App.jsx`.
- `src/sections/` = the one-page sections composed only by `Home.jsx`.
- `src/components/` = shared UI, including the motion/ambient layer (`AuroraBackground`, `CursorGlow`, `ScrollProgress`, `Marquee`, `Magnetic`, `Reveal`). `src/data/` = all editable content. `src/utils/scroll.js` = `scrollToId` / `isExternal`.
- Content is data-driven: sections and project pages read from `src/data/*.js`. Edit data files instead of hardcoding copy in JSX.
- `src/data/projects.js` is the single source for the home featured grid, `/projects`, `/projects/:id`, and the fallback Experience timeline. `findProject()` supports `aliases`; `ProjectDetails` redirects an alias to the canonical `/projects/:id`.
- Empty project fields (`problem`, `role`, `challenges`, `solutions`, `lessons`, `improvements`, `futurePlans`, `features`) are intentional: `ProjectDetails` renders "Details coming soon…" placeholders. Filling them is a content task, not a bug.
- `src/data/experience.js` `jobs` is empty by design; while empty, Experience renders "My Development Journey" from `projects`. `skills.js` items carry `status: "established" | "learning"`.
- Empty values in `profile.js` are hidden automatically (e.g. `phone`, `facebook`, `twitter`); `resumeAvailable` gates the resume button.
- Service cards dispatch a `window` `select-service` custom event to preselect the contact form's service; `ContactForm` listens for it. Keep both ends in sync when renaming services.
- Contact form posts JSON to `import.meta.env.VITE_FORM_ENDPOINT` (build-time env var). If unset, it opens a `mailto:` draft instead. Restart/rebuild after changing `.env`.

## Conventions and gotchas

- Style with the project's Tailwind tokens/classes, not ad-hoc values: colors `ink`, `surface`, `cream`, `accent`, `brand`/`brand-light`/`brand-dark`; typography `.display` (Syne), `.eyebrow` (mono label), plus `.container-x`, `.section-pad`, `.btn`, `.btn-primary`, `.btn-ghost`, `.card`, `.card-hover`, `.badge`, `.input` (defined in `src/index.css`). Body/display/serif/mono fonts load from Google Fonts in `index.html`. Tailwind scans `index.html` and `src/**/*.{js,jsx}`.
- Page transitions live in `App.jsx` (`AnimatePresence` keyed by `location.pathname`). Keep new motion work inside `MotionConfig reducedMotion="user"` and mirror the existing `prefers-reduced-motion` guards in JS (`Magnetic`, `CursorGlow`, Hero tilt) and CSS (`src/index.css`).
- Oversized display type can force horizontal overflow: use `clamp()` sizes and add `min-w-0` to grid/flex children that wrap cards or large headings. Project screenshots are wide (~2.2:1); cards crop with `object-left`, while `ProjectDetails` shows the full natural aspect ratio.
- Cross-page section navigation does **not** use raw hash links. `Navbar` calls `navigate("/", { state: { scrollTo: id } })`, and `Home` scrolls after an 80 ms delay; `ScrollToTopOnRoute` deliberately skips resetting when `state.scrollTo` is present. Follow this pattern for new section links.
- Project screenshots in `public/images/projects/` contain spaces and parentheses (`1 (1).png`, `1 (2).png`, `1(3).png`) and are referenced with exact leading-slash paths in `projects.js`. Quote these paths in shell commands; renaming them breaks images. `ProjectImage` and the Hero photo fall back to text/initials on load failure.
- Deployment must preserve SPA fallbacks: `vercel.json` rewrites all paths to `index.html`, and `public/_redirects` does the same for Netlify. Without this, refreshing `/projects/:id` 404s.
- The README's asset instructions are stale: it mentions `public/images/profile.jpg` and `public/resume.pdf`, but the app actually uses `/images/afra.jpeg` (`profile.profileImage`) and `public/afra-resume.pdf` (`resumeUrl`). Trust the data files over the README.
- Accessibility/motion are deliberate: skip link, `aria-*` labels, focus-visible styles, and `prefers-reduced-motion` handling. Preserve them when editing markup.
- All UI copy is English; project names/descriptions may include Bengali. Use `profile.js`, not hardcoded strings, for personal details.
