import { Router } from "express";
import { prisma } from "../lib/prisma";
import { requireAdmin } from "../middleware/auth";
import { projectInputSchema, projectUpdateSchema } from "../lib/validation";

const router = Router();

// GET /api/projects?limit=3  → list projects, newest/lowest-order first
router.get("/", async (req, res) => {
  const limitParam = req.query.limit;
  const limit = typeof limitParam === "string" ? parseInt(limitParam, 10) : undefined;

  const projects = await prisma.project.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    take: Number.isFinite(limit) && limit! > 0 ? limit : undefined,
  });

  const total = await prisma.project.count();

  res.json({ projects, total });
});

// GET /api/projects/:slug → single project detail
router.get("/:slug", async (req, res) => {
  const project = await prisma.project.findUnique({ where: { slug: req.params.slug } });
  if (!project) return res.status(404).json({ error: "Project not found." });
  res.json({ project });
});

// POST /api/projects → create (admin only)
router.post("/", requireAdmin, async (req, res) => {
  const parsed = projectInputSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const data = parsed.data;

  const existing = await prisma.project.findUnique({ where: { slug: data.slug } });
  if (existing) {
    return res.status(409).json({ error: "A project with this slug already exists." });
  }

  const project = await prisma.project.create({
    data: {
      ...data,
      liveUrl: data.liveUrl || null,
      githubUrl: data.githubUrl || null,
    },
  });

  res.status(201).json({ project });
});

// PUT /api/projects/:id → update (admin only)
router.put("/:id", requireAdmin, async (req, res) => {
  const parsed = projectUpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  try {
    const project = await prisma.project.update({
      where: { id: req.params.id },
      data: {
        ...parsed.data,
        liveUrl: parsed.data.liveUrl === "" ? null : parsed.data.liveUrl,
        githubUrl: parsed.data.githubUrl === "" ? null : parsed.data.githubUrl,
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
    await prisma.project.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch {
    res.status(404).json({ error: "Project not found." });
  }
});

export default router;
