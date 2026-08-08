import { Project, ProjectInput } from "@/lib/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

async function parseOrThrow(res: Response) {
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      message = body?.error?.formErrors?.join(", ") || body?.error || message;
    } catch {
      // response had no JSON body
    }
    throw new Error(
      typeof message === "string" ? message : JSON.stringify(message),
    );
  }
  if (res.status === 204) return null;
  return res.json();
}

// ── Public reads (used in server components — always fetch fresh) ──

export async function getProjects(
  limit?: number,
): Promise<{ projects: Project[]; total: number }> {
  const url = new URL(`${API_BASE}/projects`);
  if (limit) url.searchParams.set("limit", String(limit));

  const res = await fetch(url.toString(), { cache: "no-store" });
  return parseOrThrow(res);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const res = await fetch(`${API_BASE}/projects/${slug}`, {
    cache: "no-store",
  });
  if (res.status === 404) return null;
  const data = await parseOrThrow(res);
  return data.project;
}

// ── Admin auth ──

export async function login(password: string): Promise<string> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  const data = await parseOrThrow(res);
  return data.token;
}

// ── Admin writes (used client-side, require a bearer token) ──

export async function createProject(
  input: ProjectInput,
  token: string,
): Promise<Project> {
  const res = await fetch(`${API_BASE}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  const data = await parseOrThrow(res);
  return data.project;
}

export async function updateProject(
  id: string,
  input: ProjectInput,
  token: string,
): Promise<Project> {
  const res = await fetch(`${API_BASE}/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  const data = await parseOrThrow(res);
  return data.project;
}

export async function deleteProject(id: string, token: string): Promise<void> {
  const res = await fetch(`${API_BASE}/projects/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  await parseOrThrow(res);
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
  await parseOrThrow(res);
}
