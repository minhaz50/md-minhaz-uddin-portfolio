import { PrismaClient } from "@prisma/client";

// Avoid exhausting Neon's connection limit from ts-node-dev's hot reloads
// by reusing a single client across module reloads in development.
const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
