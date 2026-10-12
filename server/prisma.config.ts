import "dotenv/config";
import { defineConfig } from "prisma/config";

// Prisma 7 keeps connection URLs out of schema.prisma.
//
// The CLI (migrate / studio / db push) uses DIRECT_URL — Neon's NON-pooled
// connection, which migrations need. If DIRECT_URL isn't set it falls back to
// DATABASE_URL. The running app connects separately (see src/lib/prisma.ts)
// using the pooled DATABASE_URL.
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "",
  },
});
