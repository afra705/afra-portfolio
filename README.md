# Afra Anjum — Portfolio

React + Vite + Tailwind CSS 3 + React Router + Framer Motion + Lucide.

## Run
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Where to edit
| What | File |
|---|---|
| Name, email, socials, About text, hobbies, resume flag | `src/data/profile.js` |
| Projects (home, /projects, /projects/:id) | `src/data/projects.js` |
| Skills | `src/data/skills.js` |
| Services | `src/data/services.js` |
| Formal jobs (optional) | `src/data/experience.js` |

## Add your assets
- Profile photo: `public/images/profile.jpg`
- Project screenshots: `public/images/projects/fitlog.png`, `bazar-dor.png`, `news-bulletin.png`
- Resume: `public/resume.pdf`, then set `resumeAvailable: true` in `profile.js`

## Contact form
Without a backend, the form opens the visitor's email app. To send for real, copy `.env.example` to `.env`
and set `VITE_FORM_ENDPOINT` (e.g. a Formspree URL).

## Deploy
`vercel.json` and `public/_redirects` (Netlify) enable refreshing on routes like `/projects/fitlog`.
