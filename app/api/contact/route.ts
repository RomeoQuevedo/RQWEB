import { NextResponse, type NextRequest } from "next/server";

const TYPES = ["Booking", "Press", "Sponsorship"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const type = typeof body.type === "string" ? body.type : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  const errors: string[] = [];
  if (name.length < 2 || name.length > 200) errors.push("name");
  if (!EMAIL_RE.test(email) || email.length > 320) errors.push("email");
  if (!TYPES.includes(type)) errors.push("type");
  if (message.length < 10 || message.length > 5000) errors.push("message");
  if (errors.length) {
    return NextResponse.json({ error: "Please check the highlighted fields.", fields: errors }, { status: 400 });
  }

  // TODO: wire an email provider (e.g. Resend, Postmark, SendGrid) and forward this to the bookings inbox.
  console.log("[contact] New inquiry", { type, name, email, message, receivedAt: new Date().toISOString() });

  return NextResponse.json({ ok: true });
}
