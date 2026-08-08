# Developer Portfolio — Client (Next.js)

This is the frontend half of the PERN portfolio. **See the root `README.md`
(one level up) for full setup instructions**, including how to connect this
to the Express API and Neon database.

## Quick start (assumes the server is already running on :4000)

```bash
cp .env.local.example .env.local
npm install
npm run dev
```

Open http://localhost:3000.

## How to personalize it

Static content (everything except Projects) lives in one file:

```
data/site.ts
```

Edit that file to update:
- Your name, designation, tagline, location
- Resume link, email, phone, WhatsApp number
- Social links (GitHub, LinkedIn, Twitter, Facebook)
- About Me paragraphs and highlight stats
- Skills (grouped by category, shown as tech-stack badges)
- Education entries
- Experience entries

**Projects are database-backed** — add, edit, or remove them from
`/admin` (see root README for setting `ADMIN_PASSWORD`). They're not in
this file anymore.

## Replacing placeholder assets

- **Your photo**: replace `public/images/avatar.svg` with your own photo
  (e.g. `avatar.jpg`), then update `profile.avatar` in `data/site.ts`.
- **Project images**: drop new files into `public/images/` and reference
  them (e.g. `/images/my-project.png`) in the `/admin` project form.
- **Resume**: drop your resume file into `public/` named `resume.pdf` (or
  update `profile.resumeUrl` in `data/site.ts` to match your filename).
  The "Download Résumé" button is already wired up — until a real file is
  added, the button is there but the download will 404.

## Structure

```
app/
  layout.tsx              – global layout, theme init, nav + footer
  page.tsx                – homepage, composes all sections
  projects/page.tsx       – "all projects" page (Show More destination)
  projects/[slug]/        – project detail page, fetched by slug
  admin/page.tsx          – admin login + dashboard
components/
  Navbar, Hero, About, Skills, Education, Experience,
  Projects, ProjectCard, Contact, Footer, ThemeProvider, ThemeToggle
  admin/  – LoginForm, ProjectForm, ProjectList
data/
  site.ts                 – all static content lives here
lib/
  api.ts                  – all calls to the Express API
  types.ts                – shared Project type
public/images/            – avatar + project placeholder images
```

## Notes

- Fully responsive from mobile to desktop, dark/light mode toggle in the
  navbar (persisted, respects OS preference on first visit).
- Sections are anchor-linked (`#about`, `#skills`, etc.) and reachable
  from the navbar, including a mobile menu.
- Respects `prefers-reduced-motion`.
