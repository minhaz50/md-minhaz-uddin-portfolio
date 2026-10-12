import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAdmin } from "../middleware/auth.js";
import {
  firstIssue,
  projectInputSchema,
  projectUpdateSchema,
} from "../lib/validation.js";

const router = Router();

// GET /api/projects?limit=3  → list projects (lowest `order` first, then newest)
router.get("/", async (req, res) => {
  const limitParam =
    typeof req.query.limit === "string"
      ? Number.parseInt(req.query.limit, 10)
      : NaN;
  const take =
    Number.isFinite(limitParam) && limitParam > 0 ? limitParam : undefined;

  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      take,
    }),
    prisma.project.count(),
  ]);

  res.json({ projects, total });
});

// GET /api/projects/:slug → single project
router.get("/:slug", async (req, res) => {
  const project = await prisma.project.findUnique({
    where: { slug: req.params.slug },
  });
  if (!project) {
    res.status(404).json({ error: "Project not found." });
    return;
  }
  res.json({ project });
});

// POST /api/projects → create (admin only)
router.post("/", requireAdmin, async (req, res) => {
  const parsed = projectInputSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: firstIssue(parsed.error) });
    return;
  }

  const data = parsed.data;

  const existing = await prisma.project.findUnique({
    where: { slug: data.slug },
  });
  if (existing) {
    res.status(409).json({ error: "A project with this slug already exists." });
    return;
  }

  const project = await prisma.project.create({
    data: {
      ...data,
      liveUrl: data.liveUrl || null,
      clientGithubUrl: data.clientGithubUrl || null,
      serverGithubUrl: data.serverGithubUrl || null,
    },
  });

  res.status(201).json({ project });
});

// PUT /api/projects/:id → update (admin only)
router.put("/:id", requireAdmin, async (req, res) => {
  const parsed = projectUpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: firstIssue(parsed.error) });
    return;
  }
  const { liveUrl, clientGithubUrl, serverGithubUrl, ...rest } = parsed.data;
  const id = String(req.params.id);

  try {
    const project = await prisma.project.update({
      where: { id },
      data: {
        ...rest,
        // "" from the admin form means "clear it"; undefined means "leave unchanged"
        ...(liveUrl !== undefined && { liveUrl: liveUrl || null }),
        ...(clientGithubUrl !== undefined && {
          clientGithubUrl: clientGithubUrl || null,
        }),
        ...(serverGithubUrl !== undefined && {
          serverGithubUrl: serverGithubUrl || null,
        }),
      },
    });
    res.json({ project });
  } catch {
    res.status(404).json({ error: "Project not found." });
  }
});

// DELETE /api/projects/:id → delete (admin only)
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    await prisma.project.delete({ where: { id: String(req.params.id) } });
    res.status(204).send();
  } catch {
    res.status(404).json({ error: "Project not found." });
  }
});

export default router;
