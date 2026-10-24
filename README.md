# Romeo Quevedo — Official Site & Store

Official website and merch store for Romeo Quevedo, professional wrestler from La Habana, Cuba.

Built with **Next.js 15 (App Router)**, **React 19** and **TypeScript**. No UI kit: all styling lives in
`app/globals.css` as design tokens plus hand-written components. Checkout runs on **Stripe Checkout**.

> **Heads-up:** all bio, stats, events, socials and product copy are **placeholders** marked
> `// TODO: replace with real data`. Replace them with real, verified information before launch.

---

## Quick start

Requires Node.js 18.18+ (20 LTS or newer recommended).

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                   # http://localhost:3000
```

Other scripts:

| Command             | What it does                        |
| ------------------- | ----------------------------------- |
| `npm run build`     | Production build (type-checks too)  |
| `npm start`         | Serve the production build          |
| `npm run lint`      | ESLint (Next.js rules)              |
| `npm run typecheck` | TypeScript only, no emit            |

## Environment variables

| Variable               | Required          | Description                                                                                                  |
| ---------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL` | Yes in production | Public URL, e.g. `https://romeoquevedo.com`. Used for canonical URLs, Open Graph, sitemap and Stripe redirects. |
| `STRIPE_SECRET_KEY`    | For payments      | Stripe secret key (`sk_test_…` while testing, `sk_live_…` in production). Without it, `/api/checkout` returns **501** and the cart shows a friendly "checkout not enabled" message. |

Never commit `.env.local` — it's already in `.gitignore`.

## Project structure

```
app/
  page.tsx                 Home (hero, stats, featured merch, events, bio teaser, newsletter)
  about/                   Biography, ring stats, timeline, championships
  events/                  Upcoming + past events
  store/                   Product grid with category filter + sort
  store/[slug]/            Product detail (static params + metadata)
  cart/                    Cart page
  checkout/success/        Post-payment page (clears the cart)
  contact/                 Bookings & press form
  api/checkout/route.ts    Creates a Stripe Checkout Session (server-validated prices)
  api/contact/route.ts     Contact form endpoint (logs; TODO: email provider)
  api/newsletter/route.ts  Newsletter endpoint (logs; TODO: mailing list provider)
  sitemap.ts, robots.ts, opengraph-image.tsx, icon.svg
  globals.css              Design tokens + all styles
components/                Navbar, Footer, Hero, ProductCard, ProductArt, AddToCart, CartProvider, …
lib/
  site.ts                  Name, nickname, bio, stats, ring stats, timeline, championships, socials
  products.ts              Product catalog (source of truth for prices)
  events.ts                Events calendar
  format.ts                Price/date formatting
public/products/           Product photos go here
```

## Editing content

All editable content lives in `lib/`:

- **`lib/site.ts`** — nickname, hero intro, bio, stats strip, ring stats, career timeline, championships,
  social links and the bookings email. Set `championships` to `[]` to hide that section.
- **`lib/events.ts`** — add an object per event. `date` is `YYYY-MM-DD`; events on or after today are
  "upcoming", older ones move to "Past events" automatically (pages re-render hourly). Omit `ticketUrl`
  to show "Tickets TBA".
- **`lib/products.ts`** — the store catalog (see below).

## Adding products

Add an entry to the `products` array in `lib/products.ts`:

```ts
{
  id: "p-011",                       // unique, stable
  slug: "cuba-flag-tee",             // URL: /store/cuba-flag-tee
  name: "Cuba Flag Tee",
  price: 3400,                       // in cents → $34.00
  compareAtPrice: 4000,              // optional, shows a struck-through price
  category: "Apparel",               // Apparel | Accessories | Collectibles | Signed
  description: "…",
  details: ["100% cotton"],          // optional bullet list
  sizes: ["S", "M", "L", "XL"],      // optional; apparel shows a size picker when set
  badge: "New",                      // optional: New, Sale, Limited, Signed…
  featured: true,                    // optional; featured items appear on the home page
  colors: { bg: "#0D1A4F", accent: "#F5C518", icon: "tee" }, // placeholder art
  image: "/products/cuba-flag-tee.jpg",                        // optional real photo
}
```

Prices shown on the site and charged at checkout both come from this file — the checkout API ignores any
price sent by the browser.

### Adding real product photos

1. Drop the image in `public/products/` (square images work best, e.g. 1200×1200 JPG/WebP).
2. Set `image: "/products/your-file.jpg"` on the product.

`ProductArt` automatically switches from the SVG placeholder to an optimized `next/image` when `image` is set.
The portrait placeholder on the Home/About pages is `components/PhotoPlaceholder.tsx` — replace it with
`next/image` the same way once a real photo is available.

## Payments (Stripe)

1. Create a Stripe account and copy your **test** secret key from the Stripe Dashboard → Developers → API keys.
2. Put it in `.env.local` as `STRIPE_SECRET_KEY=sk_test_…` and restart `npm run dev`.
3. Add items to the cart and click **Checkout**. Use Stripe's test card `4242 4242 4242 4242`, any future
   expiry and any CVC.
4. After payment Stripe redirects to `/checkout/success`, which empties the cart.

Shipping countries are set in `app/api/checkout/route.ts` (`allowed_countries`). To charge shipping or tax, add
`shipping_options` or `automatic_tax` there. For order fulfillment, set up a Stripe webhook for
`checkout.session.completed` (not included).

## Deploying to Vercel

1. Push this project to a GitHub/GitLab/Bitbucket repository.
2. In Vercel, **Add New → Project** and import the repository (framework preset: Next.js, defaults are fine).
3. Under **Settings → Environment Variables**, add:
   - `NEXT_PUBLIC_SITE_URL` = your production URL (e.g. `https://romeoquevedo.com`)
   - `STRIPE_SECRET_KEY` = your live key (use a test key for Preview deployments)
4. Deploy. Add your custom domain under **Settings → Domains**, then redeploy so `NEXT_PUBLIC_SITE_URL`
   matches it.

## Launch checklist

- [ ] Replace every `TODO` in `lib/` with real, verified data
- [ ] Real social profile URLs and bookings email in `lib/site.ts`
- [ ] Product photos in `public/products/` and real prices
- [ ] Wire `/api/contact` and `/api/newsletter` to an email / mailing-list provider
- [ ] Live Stripe key, shipping options and a fulfillment webhook
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production domain
