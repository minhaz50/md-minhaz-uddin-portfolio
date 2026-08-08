import { z } from "zod";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const projectInputSchema = z.object({
  slug: z
    .string()
    .min(2)
    .max(80)
    .regex(slugPattern, "Slug must be lowercase, using letters, numbers, and hyphens only."),
  name: z.string().min(2).max(120),
  image: z.string().min(1).max(500),
  summary: z.string().min(1).max(300),
  description: z.string().min(1).max(5000),
  stack: z.array(z.string().min(1).max(60)).min(1, "Add at least one stack item."),
  liveUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  challenges: z.string().min(1).max(5000),
  improvements: z.string().min(1).max(5000),
  order: z.number().int().optional(),
});

export const projectUpdateSchema = projectInputSchema.partial();

export type ProjectInput = z.infer<typeof projectInputSchema>;
