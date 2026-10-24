"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

export const INQUIRY_TYPES = ["Booking", "Press", "Sponsorship"] as const;
type InquiryType = (typeof INQUIRY_TYPES)[number];

type Values = { name: string; email: string; type: InquiryType | ""; message: string };
type Errors = Partial<Record<keyof Values, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(v: Values): Errors {
  const errors: Errors = {};
  if (v.name.trim().length < 2) errors.name = "Enter your name.";
  if (!EMAIL_RE.test(v.email.trim())) errors.email = "Enter a valid email address.";
  if (!v.type) errors.type = "Choose an inquiry type.";
  if (v.message.trim().length < 10) errors.message = "Tell us a bit more (at least 10 characters).";
  else if (v.message.length > 5000) errors.message = "Keep it under 5,000 characters.";
  return errors;
}

const EMPTY: Values = { name: "", email: "", type: "", message: "" };

export function ContactForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name as keyof Values]) setErrors((err) => ({ ...err, [name]: undefined }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setValues(EMPTY);
    } catch {
      setStatus("failed");
    }
  }

  const fieldProps = (name: keyof Values) => ({
    id: `contact-${name}`,
    name,
    value: values[name],
    onChange,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
  });

  const errorFor = (name: keyof Values) =>
    errors[name] ? (
      <p id={`contact-${name}-error`} className="field-error">
        {errors[name]}
      </p>
    ) : null;

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="form__row">
        <div className="field">
          <label htmlFor="contact-name">Name</label>
          <input className="input" type="text" autoComplete="name" {...fieldProps("name")} />
          {errorFor("name")}
        </div>
        <div className="field">
          <label htmlFor="contact-email">Email</label>
          <input className="input" type="email" autoComplete="email" {...fieldProps("email")} />
          {errorFor("email")}
        </div>
      </div>

      <div className="field">
        <label htmlFor="contact-type">Inquiry type</label>
        <select className="select" {...fieldProps("type")}>
          <option value="" disabled>
            Select one…
          </option>
          {INQUIRY_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {errorFor("type")}
      </div>

      <div className="field">
        <label htmlFor="contact-message">Message</label>
        <textarea
          className="textarea"
          placeholder="Event date, location, promotion, or what you'd like to discuss"
          {...fieldProps("message")}
        />
        {errorFor("message")}
      </div>

      <div>
        <button type="submit" className="btn btn--red" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
      </div>

      <div role="status" aria-live="polite">
        {status === "sent" && (
          <p className="notice notice--success">Thanks — your message is in. We&apos;ll get back to you soon.</p>
        )}
        {status === "failed" && (
          <p className="notice notice--error">Something went wrong sending your message. Please try again.</p>
        )}
      </div>
    </form>
  );
}
