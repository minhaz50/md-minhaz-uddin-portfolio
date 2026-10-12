# Client (Next.js 16)

See the root `README.md` for full setup, versions, deployment and upgrade notes.

```bash
cp .env.local.example .env.local
npm install
npm run dev      # http://localhost:3000
npm run lint     # ESLint 9 + eslint-config-next
npm run build
```

- Static content (name, About, Skills, …): `data/site.ts`
- Projects: managed at `/admin` (stored in Postgres)
- Scroll-reveal: `components/Reveal.tsx` · Skeletons/lazy placeholders: `components/Skeletons.tsx`
- Design tokens (Tailwind v4, CSS-first): `app/globals.css` → `:root`, `[data-theme="light"]`, `@theme inline`
