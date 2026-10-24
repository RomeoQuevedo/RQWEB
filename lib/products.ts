// Store catalog. Prices are in cents (USD). This file is also the source of truth
// for server-side price validation in app/api/checkout/route.ts.
// TODO: replace with real products, prices and descriptions.

export type Category = "Apparel" | "Accessories" | "Collectibles" | "Signed";

export const categories: Category[] = ["Apparel", "Accessories", "Collectibles", "Signed"];

export type ProductIcon =
  | "tee"
  | "hoodie"
  | "tank"
  | "cap"
  | "lanyard"
  | "band"
  | "ring"
  | "pin"
  | "photo"
  | "poster";

export type Product = {
  id: string;
  slug: string;
  name: string;
  /** Price in cents */
  price: number;
  /** Optional original price in cents, shown struck through */
  compareAtPrice?: number;
  category: Category;
  description: string;
  details?: string[];
  sizes?: string[];
  badge?: string;
  featured?: boolean;
  /** Placeholder art colors + icon, used until a real photo exists */
  colors: { bg: string; accent: string; icon: ProductIcon };
  /** Path to a real photo in /public/products (e.g. "/products/tee.jpg"). When set, it replaces the placeholder art. */
  image?: string;
};

const APPAREL_SIZES = ["S", "M", "L", "XL", "XXL"];

export const products: Product[] = [
  {
    id: "p-001",
    slug: "el-campeon-tee",
    name: "El Campeón Tee",
    price: 3200,
    category: "Apparel",
    description:
      "Heavyweight cotton tee with the RQ monogram on the chest and “El Campeón” across the back. Placeholder description — edit in lib/products.ts.",
    details: ["100% cotton, 220 gsm", "Screen-printed gold ink", "Unisex fit"],
    sizes: APPAREL_SIZES,
    badge: "New",
    featured: true,
    colors: { bg: "#0D1A4F", accent: "#F5C518", icon: "tee" },
  },
  {
    id: "p-002",
    slug: "rq-monogram-hoodie",
    name: "RQ Monogram Hoodie",
    price: 6500,
    category: "Apparel",
    description:
      "Midweight fleece hoodie in royal blue with an embroidered gold RQ monogram. Placeholder description.",
    details: ["80% cotton / 20% polyester", "Embroidered chest logo", "Kangaroo pocket"],
    sizes: APPAREL_SIZES,
    featured: true,
    colors: { bg: "#1A3FD6", accent: "#FFE27A", icon: "hoodie" },
  },
  {
    id: "p-003",
    slug: "la-habana-ringside-tank",
    name: "La Habana Ringside Tank",
    price: 2800,
    category: "Apparel",
    description: "Lightweight training tank with the “La Habana, Cuba” wordmark. Placeholder description.",
    details: ["Breathable jersey", "Relaxed fit"],
    sizes: APPAREL_SIZES,
    colors: { bg: "#060B26", accent: "#FF2800", icon: "tank" },
  },
  {
    id: "p-004",
    slug: "gold-rope-snapback",
    name: "Gold Rope Snapback",
    price: 3000,
    category: "Accessories",
    description: "Structured navy snapback with gold rope detail and a red underbrim. Placeholder description.",
    details: ["One size, adjustable", "Embroidered front panel"],
    featured: true,
    colors: { bg: "#0D1A4F", accent: "#F5C518", icon: "cap" },
  },
  {
    id: "p-005",
    slug: "ring-rope-lanyard",
    name: "Ring Rope Lanyard",
    price: 1200,
    category: "Accessories",
    description: "Tri-color lanyard in red, gold and blue — the three ring ropes. Placeholder description.",
    colors: { bg: "#1A3FD6", accent: "#FF2800", icon: "lanyard" },
  },
  {
    id: "p-006",
    slug: "rq-wristband-set",
    name: "RQ Wristband Set",
    price: 1500,
    compareAtPrice: 2000,
    category: "Accessories",
    description: "Set of three silicone wristbands in the brand colors. Placeholder description.",
    badge: "Sale",
    colors: { bg: "#060B26", accent: "#FFE27A", icon: "band" },
  },
  {
    id: "p-007",
    slug: "mini-ring-replica",
    name: "Mini Ring Replica",
    price: 8500,
    category: "Collectibles",
    description:
      "Desk-sized wrestling ring replica with red, gold and blue ropes. Placeholder description.",
    details: ["Approx. 30 × 30 cm", "Numbered limited run"],
    badge: "Limited",
    featured: true,
    colors: { bg: "#0D1A4F", accent: "#FF2800", icon: "ring" },
  },
  {
    id: "p-008",
    slug: "enamel-pin-set",
    name: "Enamel Pin Set",
    price: 1800,
    category: "Collectibles",
    description: "Three hard-enamel pins: the RQ monogram, the Cuban star and a ring bell. Placeholder description.",
    colors: { bg: "#1A3FD6", accent: "#F5C518", icon: "pin" },
  },
  {
    id: "p-009",
    slug: "signed-8x10-photo",
    name: "Signed 8×10 Photo",
    price: 4000,
    category: "Signed",
    description: "Glossy 8×10 action photo, hand-signed by Romeo. Placeholder description.",
    details: ["Hand-signed", "Ships in a rigid mailer"],
    badge: "Signed",
    colors: { bg: "#060B26", accent: "#F5C518", icon: "photo" },
  },
  {
    id: "p-010",
    slug: "signed-event-poster",
    name: "Signed Event Poster",
    price: 5500,
    category: "Signed",
    description: "18×24 event poster, hand-signed. Placeholder description.",
    details: ["Hand-signed", "Ships rolled in a tube"],
    badge: "Signed",
    colors: { bg: "#0D1A4F", accent: "#FF2800", icon: "poster" },
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(limit = 4): Product[] {
  return products.filter((p) => p.featured).slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const sameCategory = products.filter((p) => p.category === product.category && p.id !== product.id);
  const others = products.filter((p) => p.category !== product.category);
  return [...sameCategory, ...others].slice(0, limit);
}
