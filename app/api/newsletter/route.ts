import { NextResponse, type NextRequest } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let email = "";
  try {
    const body = (await req.json()) as { email?: unknown };
    email = typeof body.email === "string" ? body.email.trim() : "";
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!EMAIL_RE.test(email) || email.length > 320) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  // TODO: add the subscriber to your mailing list provider (Mailchimp, ConvertKit, Resend Audiences, …).
  console.log("[newsletter] New subscriber", { email, receivedAt: new Date().toISOString() });

  return NextResponse.json({ ok: true });
}
