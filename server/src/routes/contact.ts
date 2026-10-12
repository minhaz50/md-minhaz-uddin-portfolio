import { Router } from "express";
import { contactSchema, firstIssue } from "../lib/validation.js";
import { sendContactEmail } from "../lib/mailer.js";

const router = Router();

// Tiny in-memory rate limit: max 5 messages per IP per hour. Plenty for a
// personal portfolio; resets whenever the server restarts.
const submissionsByIp = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (submissionsByIp.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  submissionsByIp.set(ip, recent);
  return recent.length >= MAX_PER_WINDOW;
}

function recordSubmission(ip: string): void {
  const list = submissionsByIp.get(ip) ?? [];
  list.push(Date.now());
  submissionsByIp.set(ip, list);
}

router.post("/", async (req, res) => {
  const ip = req.ip ?? "unknown";

  if (isRateLimited(ip)) {
    res.status(429).json({ error: "Too many messages sent. Please try again later." });
    return;
  }

  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: firstIssue(parsed.error) });
    return;
  }

  try {
    await sendContactEmail(parsed.data);
  } catch (err) {
    console.error("Failed to send contact form email:", err);
    res.status(500).json({
      error: "Message couldn't be sent right now. Please try again later or email me directly.",
    });
    return;
  }

  recordSubmission(ip);
  res.json({ success: true });
});

export default router;
