"use client";

import { FormEvent, useState } from "react";
import { Loader2, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { sendContactMessage } from "@/lib/api";

type Status = "idle" | "loading" | "success" | "error";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const inputClass =
  "w-full rounded-md border bg-ink px-3.5 py-2.5 text-sm text-paper outline-none transition-colors placeholder:text-paper-faint focus:border-mint";
const labelClass = "mb-1.5 block font-mono text-xs text-paper-faint";

function validate(values: {
  name: string;
  email: string;
  message: string;
}): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2)
    errors.name = "Enter your name (2+ characters).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = "Enter a valid email address.";
  if (values.message.trim().length < 10)
    errors.message = "Message should be at least 10 characters.";
  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  function update(field: keyof typeof values, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("loading");
    setServerError(null);
    try {
      await sendContactMessage(values);
      setStatus("success");
      setValues({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-mint/40 bg-surface px-6 py-14 text-center">
        <CheckCircle2 size={36} className="text-mint" />
        <p className="mt-4 text-base font-semibold text-paper">Message sent!</p>
        <p className="mt-1.5 max-w-xs text-sm text-paper-dim">
          Thanks for reaching out — I'll get back to you as soon as I can.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-md border border-surface-border px-4 py-2 text-sm text-paper-dim transition hover:border-mint hover:text-mint"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-xl border border-surface-border bg-surface p-6"
    >
      <div>
        <label htmlFor="name" className={labelClass}>
          name
        </label>
        <input
          id="name"
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="Your name"
          className={`${inputClass} ${errors.name ? "border-red-400" : "border-surface-border"}`}
        />
        {errors.name && (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
            <AlertCircle size={13} />
            {errors.name}
          </p>
        )}
      </div>

      <div className="mt-4">
        <label htmlFor="email" className={labelClass}>
          email
        </label>
        <input
          id="email"
          type="email"
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="you@example.com"
          className={`${inputClass} ${errors.email ? "border-red-400" : "border-surface-border"}`}
        />
        {errors.email && (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
            <AlertCircle size={13} />
            {errors.email}
          </p>
        )}
      </div>

      <div className="mt-4">
        <label htmlFor="message" className={labelClass}>
          message
        </label>
        <textarea
          id="message"
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Tell me about your project…"
          rows={5}
          className={`${inputClass} resize-y ${errors.message ? "border-red-400" : "border-surface-border"}`}
        />
        {errors.message && (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
            <AlertCircle size={13} />
            {errors.message}
          </p>
        )}
      </div>

      {status === "error" && serverError && (
        <p className="mt-4 flex items-center gap-1.5 text-sm text-red-400">
          <AlertCircle size={14} />
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-amber px-5 py-2.5 text-sm font-semibold text-ink transition hover:brightness-110 disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Send size={16} />
        )}
        Send Message
      </button>
    </form>
  );
}
