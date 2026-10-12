import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

// Prisma 7 talks to Postgres through a driver adapter. For Neon we use the
// standard `pg` adapter with the POOLED connection string (DATABASE_URL).
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set. Add your Neon pooled connection string to server/.env");
}

const adapter = new PrismaPg({ connectionString });

// Reuse one client across tsx's hot reloads so we don't exhaust Neon connections.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
