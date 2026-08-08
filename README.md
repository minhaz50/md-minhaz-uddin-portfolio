# Developer Portfolio — PERN Stack

A developer portfolio with a database-backed Projects section and an admin
panel to manage them.

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL via [Neon](https://neon.tech), accessed with Prisma

```
portfolio-pern/
├── client/     ← Next.js site (public pages + /admin panel)
└── server/     ← Express API + Prisma schema
```

The static sections (About, Skills, Education, Experience, Contact, your
name/photo/resume) still live in `client/data/site.ts` — edit that file
directly, same as before. **Only Projects are now database-backed.**

---

## 1. Create a free Neon Postgres database

1. Go to [neon.tech](https://neon.tech) and create a free account/project.
2. On your project's dashboard, copy two connection strings:
   - The **pooled** connection string → this is `DATABASE_URL`
   - The **direct** connection string → this is `DIRECT_URL` (Prisma Migrate
     needs a direct, non-pooled connection)

   Neon shows both on the "Connection Details" panel — there's a toggle for
   "Pooled connection".

## 2. Set up the server

```bash
cd server
cp .env.example .env
```

Edit `server/.env`:
- `DATABASE_URL` / `DIRECT_URL` → paste your Neon connection strings
- `JWT_SECRET` → any long random string (used to sign admin login tokens)
- `ADMIN_PASSWORD` → the password you'll use to log into `/admin`
- `CLIENT_ORIGIN` → leave as `http://localhost:3000` for local dev

Install dependencies and set up the database:

```bash
npm install
npx prisma migrate dev --name init   # creates the Project table on Neon
npm run seed                         # optional: adds 3 sample projects
```

Start the API:

```bash
npm run dev
```

It runs on **http://localhost:4000** by default. Visit
http://localhost:4000/api/health — you should see `{"ok":true}`.

## 3. Set up the client

In a new terminal:

```bash
cd client
cp .env.local.example .env.local
npm install
npm run dev
```

`client/.env.local` just needs:
```
NEXT_PUBLIC_API_URL="http://localhost:4000/api"
```

Visit **http://localhost:3000**.

## 4. Log into the admin panel

Go to **http://localhost:3000/admin** and log in with the `ADMIN_PASSWORD`
you set in `server/.env`. From there you can add new projects — they show
up instantly on the homepage (top 3, ordered by the `order` field then
newest-first) and on `/projects` (all of them).

---

## Running both apps at once (optional)

From the repo root:

```bash
npm run install:all   # installs both server and client deps
npm run dev            # runs server + client together, color-coded logs
```

---

## How the pieces fit together

- **`server/prisma/schema.prisma`** — the `Project` model. Add a field here,
  run `npx prisma migrate dev`, and it's in the database.
- **`server/src/routes/projects.ts`** — public `GET` routes (list, single by
  slug) and admin-only `POST`/`PUT`/`DELETE` routes protected by
  `requireAdmin` middleware (checks a JWT bearer token).
- **`server/src/routes/auth.ts`** — `POST /api/auth/login` checks the
  password against `ADMIN_PASSWORD` and returns a JWT (valid 12h).
- **`client/lib/api.ts`** — every place the frontend talks to the API.
- **`client/components/Projects.tsx`** — homepage section, server-rendered,
  fetches the top 3 projects and shows "Show More Projects" if there are
  more than 3 total.
- **`client/app/projects/page.tsx`** — the "all projects" page the Show More
  button links to.
- **`client/app/projects/[slug]/page.tsx`** — individual project detail
  page, fetched by slug.
- **`client/app/admin/page.tsx`** + `client/components/admin/*` — the login
  form and dashboard (add-project form + list with delete). The admin token
  is stored in the browser's `localStorage` after login.

## Adding project images

Drop image files into `client/public/images/` and reference them in the
admin form as `/images/your-file.png`. (External URLs work too, since
`next.config.js` has `images.unoptimized = true`.)

## A note on the admin auth

This uses a single shared password (from `ADMIN_PASSWORD`) rather than a
full user-accounts system — appropriate for a personal portfolio with one
owner. The write endpoints (`POST`/`PUT`/`DELETE` on `/api/projects`) are
protected server-side by JWT verification, not just by hiding the `/admin`
page, so it's reasonably solid for this use case. If you ever open this up
to multiple editors, swap in a real auth provider.

## Deployment notes

- **Server**: deploy anywhere that runs Node (Render, Railway, Fly.io,
  a VPS, etc.). Set the same env vars as `.env`, and update `CLIENT_ORIGIN`
  to your deployed frontend's URL.
- **Client**: deploy to Vercel (or anywhere Next.js runs). Set
  `NEXT_PUBLIC_API_URL` to your deployed server's `/api` URL.
- **Database**: already on Neon — no extra step, just make sure your
  deployed server's `DATABASE_URL`/`DIRECT_URL` point at the same project
  (or a separate production branch, which Neon supports).
