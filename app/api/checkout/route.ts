import { NextResponse, type NextRequest } from "next/server";
import Stripe from "stripe";
import { getProduct } from "@/lib/products";

const MAX_QTY = 10;
const MAX_LINES = 50;

type IncomingItem = { slug?: unknown; size?: unknown; qty?: unknown };

/**
 * Creates a Stripe Checkout Session from the cart.
 * Only slugs, sizes and quantities are accepted from the client — prices always come from lib/products.ts.
 */
export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      {
        error:
          "Checkout isn't enabled yet. Set STRIPE_SECRET_KEY in your environment (see README) to accept payments.",
      },
      { status: 501 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const rawItems = (body as { items?: unknown })?.items;
  if (!Array.isArray(rawItems) || rawItems.length === 0 || rawItems.length > MAX_LINES) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  for (const raw of rawItems as IncomingItem[]) {
    const product = typeof raw?.slug === "string" ? getProduct(raw.slug) : undefined;
    if (!product) {
      return NextResponse.json({ error: "One of the items in your cart is no longer available." }, { status: 400 });
    }

    const qty = raw.qty;
    if (typeof qty !== "number" || !Number.isInteger(qty) || qty < 1 || qty > MAX_QTY) {
      return NextResponse.json({ error: `Invalid quantity for ${product.name}.` }, { status: 400 });
    }

    let size: string | undefined;
    if (product.sizes) {
      if (typeof raw.size !== "string" || !product.sizes.includes(raw.size)) {
        return NextResponse.json({ error: `Choose a valid size for ${product.name}.` }, { status: 400 });
      }
      size = raw.size;
    }

    lineItems.push({
      quantity: qty,
      price_data: {
        currency: "usd",
        unit_amount: product.price,
        product_data: {
          name: size ? `${product.name} — Size ${size}` : product.name,
          description: product.description.slice(0, 500),
          metadata: { product_id: product.id, slug: product.slug, ...(size ? { size } : {}) },
        },
      },
    });
  }

  const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || req.nextUrl.origin;
  const stripe = new Stripe(secretKey);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      // TODO: adjust shipping countries and add shipping_options / automatic_tax as needed
      shipping_address_collection: { allowed_countries: ["US", "CA", "MX", "PR", "ES"] },
      billing_address_collection: "auto",
      allow_promotion_codes: true,
    });

    if (!session.url) throw new Error("Stripe did not return a checkout URL");
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout] Stripe error:", err);
    return NextResponse.json({ error: "Couldn't start checkout. Please try again." }, { status: 502 });
  }
}
