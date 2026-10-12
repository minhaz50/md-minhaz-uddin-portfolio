import { timingSafeEqual } from "node:crypto";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { loginSchema } from "../lib/validation.js";

const router = Router();

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

router.post("/login", (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Password is required." });
    return;
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  const secret = process.env.JWT_SECRET;

  if (!adminPassword || !secret) {
    res.status(500).json({ error: "Server is missing ADMIN_PASSWORD or JWT_SECRET." });
    return;
  }

  if (!safeEqual(parsed.data.password, adminPassword)) {
    res.status(401).json({ error: "Incorrect password." });
    return;
  }

  const token = jwt.sign({ role: "admin" }, secret, { expiresIn: "12h" });
  res.json({ token });
});

export default router;
