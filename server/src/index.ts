import "dotenv/config";
import express from "express";
import cors from "cors";
import projectsRouter from "./routes/projects";
import authRouter from "./routes/auth";
import contactRouter from "./routes/contact";

const app = express();

const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:3000";

app.use(cors({ origin: clientOrigin }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/projects", projectsRouter);
app.use("/api/auth", authRouter);
app.use("/api/contact", contactRouter);

// fallback error handler so unexpected errors return JSON, not an HTML stack trace
app.use(
  (
    err: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error(err);
    res.status(500).json({ error: "Something went wrong on the server." });
  },
);

const port = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});
