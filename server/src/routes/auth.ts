import { Router } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";

const router = Router();

const loginSchema = z.object({
  password: z.string().min(1),
});

router.post("/login", (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Password is required." });
  }

  const { password } = parsed.data;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const secret = process.env.JWT_SECRET;

  if (!adminPassword || !secret) {
    return res.status(500).json({ error: "Server is missing ADMIN_PASSWORD or JWT_SECRET." });
  }

  if (password !== adminPassword) {
    return res.status(401).json({ error: "Incorrect password." });
  }

  const token = jwt.sign({ role: "admin" }, secret, { expiresIn: "12h" });
  res.json({ token });
});

export default router;
