"use client";

import { useState, type FormEvent } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "done" } | { kind: "error"; message: string };

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setStatus({ kind: "error", message: "Enter a valid email address." });
      return;
    }
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!res.ok) throw new Error();
      setStatus({ kind: "done" });
      setEmail("");
    } catch {
      setStatus({ kind: "error", message: "Something went wrong. Please try again." });
    }
  }

  const invalid = status.kind === "error";

  return (
    <section className="newsletter" aria-labelledby="newsletter-title">
      <div className="container newsletter__inner">
        <div>
          <h2 id="newsletter-title">Join the ringside list</h2>
          <p>
            Event announcements, merch drops and behind-the-scenes news. <span lang="es">Sin spam.</span>
          </p>
        </div>
        <form className="newsletter__form" onSubmit={onSubmit} noValidate>
          <label htmlFor="newsletter-email" className="visually-hidden">
            Email address
          </label>
          <div className="newsletter__row">
            <input
              id="newsletter-email"
              className="input"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={invalid || undefined}
              aria-describedby="newsletter-status"
            />
            <button type="submit" className="btn btn--red" disabled={status.kind === "sending"}>
              {status.kind === "sending" ? "Joining…" : "Subscribe"}
            </button>
          </div>
          <p id="newsletter-status" role="status" aria-live="polite" className={invalid ? "field-error" : "muted"}>
            {status.kind === "done" && "You're on the list. ¡Gracias!"}
            {status.kind === "error" && status.message}
          </p>
        </form>
      </div>
    </section>
  );
}
