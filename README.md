# Developer Portfolio — PERN Stack (v2)

A developer portfolio with a database-backed **Projects** section, a protected
**admin panel** (add / edit / delete projects), a working **contact form** that
emails you, **scroll-reveal animations**, and **lazy loading**.

| Layer     | Tech |
|-----------|------|
| Frontend  | Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 |
| Backend   | Node.js · Express 5 · TypeScript (ESM) · Zod 4 · Nodemailer |
| Database  | PostgreSQL on [Neon](https://neon.tech) · Prisma 7 (driver adapter) |

```
portfolio-pern/
├── client/   ← Next.js site (public pages + /admin)
└── server/   ← Express API + Prisma schema
```

Static content (name, photo, About, Skills, Education, Experience, contact info)
lives in **`client/data/site.ts`**. Projects live in the database and are managed at `/admin`.

---

## Versions (all latest at the time of writing)

| Package | Version | | Package | Version |
|---|---|---|---|---|
| Node.js (required) | **≥ 22.12** | | Express | 5.3.0 |
| Next.js | 16.4.0 | | Prisma + client + pg adapter | 7.10.0 |
| React / React DOM | 19.3.0 | | Zod | 4.6.5 |
| Tailwind CSS | 4.3.3 | | Nodemailer | 10.0.16 |
| lucide-react | 1.54.0 | | dotenv | 18.0.7 |
| TypeScript — **server** | 7.0.2 | | tsx | 4.23.15 |
| TypeScript — **client** | 6.0.3 | | concurrently | 10.0.6 |
| ESLint — client | 9.39.5 | | pg | 8.23.1 |

Three places are intentionally **not** the newest release — each for a concrete reason:

- **Client TypeScript 6.0 (not 7.0)** and **ESLint 9 (not 10)** — Next.js's own tooling
  (`typescript-eslint`, `eslint-plugin-react`) declares peer-dependency ranges that
  stop at TS 6.0.x and ESLint 9.x, so newer versions fail to install without
  `--force`. The server has no such constraint, so it uses TypeScript 7.0.
- **Prisma CLI 7.10.0 (not 8.0.0-rc)** — npm's `latest` tag for the `prisma` CLI currently
  points to a release candidate (`8.0.0-rc.22`), while `@prisma/client` is on stable `7.10.0`.
  The CLI and client must match, so both are pinned to the stable 7.10.0.

---

## 1. Prerequisites

- **Node.js 22.12 or newer** — check with `node -v` (Prisma 7 and Next 16 both need a modern Node)
- A free **Neon** account (Postgres)

## 2. Create the database (Neon)

1. Create a project on [neon.tech](https://neon.tech).
2. In **Connection Details**, copy two strings (toggle *Pooled connection*):
   - **pooled** → `DATABASE_URL` (used by the running API)
   - **direct** (pooling off) → `DIRECT_URL` (used by Prisma Migrate)

## 3. Server

```bash
cd server
cp .env.example .env        # then fill it in (see comments inside the file)
npm install                 # also generates the Prisma client automatically
npx prisma migrate dev --name init
npm run seed                # optional: 3 sample projects
npm run dev                 # → http://localhost:4000  (try /api/health)
```

## 4. Client

```bash
cd client
cp .env.local.example .env.local
npm install
npm run dev                 # → http://localhost:3000
```

## 5. Admin panel

Open **http://localhost:3000/admin** and log in with `ADMIN_PASSWORD` from `server/.env`.
You can add, **edit** and delete projects. The homepage shows the first 3 (lowest
`order`, then newest) and a **Show More** button once you have more than 3;
`/projects` lists them all.

### Run both together (optional)

```bash
npm install            # at the repo root, installs `concurrently`
npm run install:all
npm run dev
```

---

## What's new in v2

### Scroll reveal (fade-in on scroll)
`client/components/Reveal.tsx` wraps any block and animates it in the first time it
scrolls into view (IntersectionObserver — no scroll listeners).

```tsx
<Reveal>…</Reveal>                              // fade + slide up (default)
<Reveal variant="left" delay={120}>…</Reveal>   // up | down | left | right | zoom | fade
<Reveal once={false}>…</Reveal>                 // replay each time it re-enters
```

Cards use `delay={index * 110}` to stagger. The animation itself is plain CSS
(`.reveal` in `globals.css`). It is skipped for visitors with *reduce motion* enabled,
and a `<noscript>` rule keeps content visible if JavaScript is off.

### Lazy loading
- **Images** — project-card images are `loading="lazy"` with responsive `sizes`; the
  above-the-fold hero image loads eagerly.
- **Code splitting** — the contact form (`next/dynamic`) and the admin edit-modal are
  separate chunks fetched only when needed, each with a skeleton placeholder.
- **Streaming** — the Projects section sits in a `<Suspense>` boundary with a skeleton,
  so a slow API (e.g. Render's free tier waking up) never blocks the rest of the page.

### Also
- Server: trailing slashes in `CLIENT_ORIGIN` are stripped automatically (the classic
  post-deploy CORS bug), several origins can be comma-separated, `trust proxy` is on so
  the contact-form rate limit sees real visitor IPs, and the admin password check is
  constant-time.
- Theme toggle no longer needs a React provider — it flips `data-theme` on `<html>`.

---

## Upgrading an existing v1 install

1. **Upgrade Node to 22.12+** (locally, and on Render/Vercel — see below).
2. Copy these folders over your project, then delete the old `node_modules` and
   `package-lock.json` in `client/` and `server/`, and run `npm install` in each.
3. **Keep your existing `server/prisma/migrations/` folder** — it isn't part of this
   zip, and Prisma 7 reads it unchanged (same `Project` model, so no new migration).
4. Your `server/.env` needs **no changes** (same variable names).
   `DATABASE_URL` is now used by the Prisma 7 driver adapter at runtime;
   `DIRECT_URL` is used by the CLI (`prisma.config.ts`).
5. `server/src/generated/` is created by `npm install` — don't commit it (already git-ignored).

## Deploying

**Server → Render** (Root Directory: `server`)
- Build command: `npm install && npm run build && npx prisma migrate deploy`
- Start command: `npm start`
- Environment: everything in `.env.example` (no `PORT`), plus `NODE_VERSION=22`
- `CLIENT_ORIGIN` = your Vercel URL (trailing slash is now tolerated)

**Client → Vercel** (Root Directory: `client`, Node.js 22.x or newer)
- Environment: `NEXT_PUBLIC_API_URL=https://<your-render-app>.onrender.com/api`
- Redeploy after changing it — `NEXT_PUBLIC_*` values are baked in at build time.

## Notes

- **Admin auth** is a single shared password → short-lived JWT. Fine for a personal
  portfolio; swap in a real auth provider if you ever add more editors.
- **Images**: local files go in `client/public/images` and are referenced as
  `/images/name.png`; full `https://…` URLs work too (`images.unoptimized` is on).
  To use Next's image optimizer instead, remove that option in `next.config.ts` and
  list your hosts under `images.remotePatterns`.
- **Résumé**: drop `resume.pdf` into `client/public/` (button already wired up).
