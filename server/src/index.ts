import "dotenv/config";
import express, { type NextFunction, type Request, type Response } from "express";
import cors from "cors";
import projectsRouter from "./routes/projects.js";
import authRouter from "./routes/auth.js";
import contactRouter from "./routes/contact.js";

const app = express();

// Render / Vercel / most hosts sit behind a proxy — this makes req.ip the real
// visitor IP (needed for the contact-form rate limit).
app.set("trust proxy", 1);

// CLIENT_ORIGIN may hold one or several comma-separated origins. Trailing
// slashes are stripped because browsers never send one in the Origin header
// (a trailing slash is the classic cause of "CORS error" after deploying).
const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim().replace(/\/+$/, ""))
  .filter(Boolean);

app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: "100kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/projects", projectsRouter);
app.use("/api/auth", authRouter);
app.use("/api/contact", contactRouter);

// Last-resort error handler so unexpected errors return JSON, not an HTML stack trace.
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong on the server." });
});

const port = Number(process.env.PORT) || 4000;
app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});
