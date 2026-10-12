import { z } from "zod";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// optional URL that may also arrive as an empty string from the admin form
const optionalUrl = z.union([z.url(), z.literal("")]).optional();

export const projectInputSchema = z.object({
  slug: z
    .string()
    .min(2)
    .max(80)
    .regex(
      slugPattern,
      "Slug must be lowercase, using letters, numbers, and hyphens only.",
    ),
  name: z.string().min(2).max(120),
  image: z.string().min(1).max(500),
  summary: z.string().min(1).max(300),
  description: z.string().min(1).max(5000),
  stack: z
    .array(z.string().min(1).max(60))
    .min(1, "Add at least one stack item."),
  liveUrl: optionalUrl,
  clientGithubUrl: optionalUrl,
  serverGithubUrl: optionalUrl,
  challenges: z.string().min(1).max(5000),
  improvements: z.string().min(1).max(5000),
  order: z.number().int().optional(),
});

export const projectUpdateSchema = projectInputSchema.partial();

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100),
  email: z.email("Enter a valid email address.").trim(),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(2000),
});

export const loginSchema = z.object({
  password: z.string().min(1),
});

/** Turn a zod error into one short human-readable sentence. */
export function firstIssue(error: z.ZodError): string {
  return error.issues[0]?.message ?? "Invalid request.";
}
