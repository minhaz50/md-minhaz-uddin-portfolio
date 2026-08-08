import { Router } from "express";
import { z } from "zod";
import { sendContactEmail } from "../lib/mailer";

const router = Router();

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100),
  email: z.string().trim().email("Enter a valid email address."),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(2000),
});

// Very small in-memory rate limit: max 5 submissions per IP per hour.
// Good enough to deter basic spam on a personal portfolio without adding
// extra infrastructure. Resets if the server restarts.
const submissionsByIp = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (submissionsByIp.get(ip) || []).filter(
    (t) => now - t < WINDOW_MS,
  );
  submissionsByIp.set(ip, timestamps);
  return timestamps.length >= MAX_PER_WINDOW;
}

function recordSubmission(ip: string) {
  const timestamps = submissionsByIp.get(ip) || [];
  timestamps.push(Date.now());
  submissionsByIp.set(ip, timestamps);
}

router.post("/", async (req, res) => {
  const ip = req.ip || "unknown";

  if (isRateLimited(ip)) {
    return res
      .status(429)
      .json({ error: "Too many messages sent. Please try again later." });
  }

  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    const firstError = Object.values(
      parsed.error.flatten().fieldErrors,
    )[0]?.[0];
    return res
      .status(400)
      .json({ error: firstError || "Invalid form submission." });
  }

  const { name, email, message } = parsed.data;

  try {
    await sendContactEmail({ name, email, message });
  } catch (err) {
    console.error("Failed to send contact form email:", err);
    return res.status(500).json({
      error:
        "Message couldn't be sent right now. Please try again later or email me directly.",
    });
  }

  recordSubmission(ip);
  res.status(200).json({ success: true });
});

export default router;
