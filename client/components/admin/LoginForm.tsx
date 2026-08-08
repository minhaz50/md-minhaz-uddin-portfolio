"use client";

import { FormEvent, useState } from "react";
import { LogIn, Loader2 } from "lucide-react";
import { login } from "@/lib/api";

export default function LoginForm({ onSuccess }: { onSuccess: (token: string) => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const token = await login(password);
      onSuccess(token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-5">
      <p className="path-label mb-3">admin/login</p>
      <h1 className="mb-6 text-2xl font-bold text-paper">Admin access</h1>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-surface-border bg-surface p-6"
      >
        <label htmlFor="password" className="mb-2 block font-mono text-xs text-paper-faint">
          password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          required
          className="w-full rounded-md border border-surface-border bg-ink px-3 py-2.5 text-sm text-paper outline-none focus:border-mint"
        />

        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-amber px-4 py-2.5 text-sm font-semibold text-ink transition hover:brightness-110 disabled:opacity-60"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <LogIn size={16} />}
          Log in
        </button>
      </form>
    </div>
  );
}
