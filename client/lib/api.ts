import type { Project, ProjectInput } from "@/lib/types";

// No trailing slash, so `${API_BASE}/projects` is always well-formed.
const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api").replace(/\/+$/, "");

async function parseOrThrow<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (typeof body?.error === "string") message = body.error;
    } catch {
      // response had no JSON body
    }
    throw new Error(message);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

// ── Public reads (used in server components — always fetch fresh) ──

export async function getProjects(limit?: number): Promise<{ projects: Project[]; total: number }> {
  const url = new URL(`${API_BASE}/projects`);
  if (limit) url.searchParams.set("limit", String(limit));

  const res = await fetch(url, { cache: "no-store" });
  return parseOrThrow(res);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const res = await fetch(`${API_BASE}/projects/${encodeURIComponent(slug)}`, { cache: "no-store" });
  if (res.status === 404) return null;
  const data = await parseOrThrow<{ project: Project }>(res);
  return data.project;
}

// ── Admin auth ──

export async function login(password: string): Promise<string> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  const data = await parseOrThrow<{ token: string }>(res);
  return data.token;
}

// ── Admin writes (client-side, require a bearer token) ──

function authHeaders(token: string): HeadersInit {
  return { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
}

export async function createProject(input: ProjectInput, token: string): Promise<Project> {
  const res = await fetch(`${API_BASE}/projects`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(input),
  });
  const data = await parseOrThrow<{ project: Project }>(res);
  return data.project;
}

export async function updateProject(id: string, input: ProjectInput, token: string): Promise<Project> {
  const res = await fetch(`${API_BASE}/projects/${id}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(input),
  });
  const data = await parseOrThrow<{ project: Project }>(res);
  return data.project;
}

export async function deleteProject(id: string, token: string): Promise<void> {
  const res = await fetch(`${API_BASE}/projects/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  await parseOrThrow<void>(res);
}

// ── Contact form (public) ──

export async function sendContactMessage(input: {
  name: string;
  email: string;
  message: string;
}): Promise<void> {
  const res = await fetch(`${API_BASE}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  await parseOrThrow<void>(res);
}
