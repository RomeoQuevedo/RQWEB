// Site-wide editable content: identity, bio, stats, socials and navigation.
// Everything marked TODO is placeholder copy — replace with real, verified data.

export const site = {
  name: "Romeo Quevedo",
  firstName: "Romeo",
  lastName: "Quevedo",
  // TODO: replace with Romeo's real ring nickname
  nickname: "“El Campeón”",
  hometown: "La Habana, Cuba",
  tagline: "Professional wrestler from La Habana, Cuba",
  description:
    "Official website and merch store of Romeo Quevedo, professional wrestler from La Habana, Cuba. Events, bookings and official merchandise.",
  // TODO: replace with a short, real intro line
  heroLede:
    "Placeholder intro — one or two lines on who Romeo is in the ring and what fans can expect. Edit in lib/site.ts.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  // TODO: replace with the real bookings / press inbox
  contactEmail: "bookings@example.com",
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/store", label: "Store" },
  { href: "/contact", label: "Contact" },
] as const;

export type SocialPlatform = "instagram" | "x" | "youtube" | "tiktok" | "facebook";

// TODO: replace with Romeo's real profile URLs (remove any he doesn't use)
export const socials: { platform: SocialPlatform; label: string; url: string }[] = [
  { platform: "instagram", label: "Instagram", url: "https://www.instagram.com/" },
  { platform: "x", label: "X (Twitter)", url: "https://x.com/" },
  { platform: "youtube", label: "YouTube", url: "https://www.youtube.com/" },
  { platform: "tiktok", label: "TikTok", url: "https://www.tiktok.com/" },
  { platform: "facebook", label: "Facebook", url: "https://www.facebook.com/" },
];

// TODO: replace with real numbers — "00" values are obvious placeholders
export const stats = [
  { value: "00", label: "Wins" },
  { value: "00", label: "Titles" },
  { value: "00", label: "Years active" },
  { value: "00", label: "Countries" },
];

// TODO: replace with Romeo's real biography
export const bio = {
  teaserQuote: "“De La Habana para el mundo.”",
  teaser:
    "Placeholder bio teaser — two or three sentences about where Romeo comes from, how he started wrestling and what drives him. Replace in lib/site.ts.",
  paragraphs: [
    "Placeholder biography, paragraph one. Tell the origin story: growing up in La Habana, the first time he stepped into a ring, the people who trained him.",
    "Placeholder biography, paragraph two. Cover the road from local shows to touring — promotions, countries, rivalries and the moments that defined his style.",
    "Placeholder biography, paragraph three. Close with what he stands for today, what fans can expect next, and what representing Cuba means to him.",
  ],
};

// TODO: replace with real ring stats
export const ringStats = [
  { label: "Height", value: "TBD" },
  { label: "Weight", value: "TBD" },
  { label: "Hometown", value: "La Habana, Cuba" },
  { label: "Finisher", value: "Finisher name TBD" },
  { label: "Signature moves", value: "Move one · Move two · Move three" },
  { label: "Trained by", value: "TBD" },
];

// TODO: replace with real career milestones (newest last)
export const timeline = [
  { year: "20XX", title: "Placeholder: first training", text: "Where and with whom Romeo began training." },
  { year: "20XX", title: "Placeholder: debut match", text: "Date, promotion and opponent of the professional debut." },
  { year: "20XX", title: "Placeholder: first tour abroad", text: "The first international bookings outside Cuba." },
  { year: "20XX", title: "Placeholder: breakthrough moment", text: "A defining match, storyline or championship run." },
];

// TODO: replace with real championships — leave empty to hide the section
export const championships: { title: string; promotion: string; detail: string }[] = [
  { title: "Championship title (placeholder)", promotion: "Promotion TBA", detail: "Year won · reign length" },
  { title: "Championship title (placeholder)", promotion: "Promotion TBA", detail: "Year won · reign length" },
];
