import Link from "next/link";
import { EventCard } from "@/components/EventCard";
import { Hero } from "@/components/Hero";
import { Newsletter } from "@/components/Newsletter";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { ProductCard } from "@/components/ProductCard";
import { SectionTitle } from "@/components/SectionTitle";
import { StatStrip } from "@/components/StatStrip";
import { getUpcomingEvents } from "@/lib/events";
import { getFeaturedProducts } from "@/lib/products";
import { bio } from "@/lib/site";

// Re-render hourly so "upcoming" events stay current
export const revalidate = 3600;

export default function HomePage() {
  const featured = getFeaturedProducts(4);
  const upcoming = getUpcomingEvents(3);

  return (
    <>
      <Hero />
      <StatStrip />

      <section className="section" aria-labelledby="featured-title">
        <div className="container">
          <SectionTitle
            id="featured-title"
            title="Featured merch"
            description="Official gear, designed in the colors of the ring."
            action={{ href: "/store", label: "Shop all" }}
          />
          <ul className="grid grid--products grid--products-4" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {featured.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--panel" aria-labelledby="events-title">
        <div className="container">
          <SectionTitle
            id="events-title"
            title="Upcoming events"
            description="Catch Romeo live. Dates are added as they're confirmed."
            action={{ href: "/events", label: "All events" }}
          />
          {upcoming.length > 0 ? (
            <ul className="events">
              {upcoming.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </ul>
          ) : (
            <p className="muted">New dates coming soon.</p>
          )}
        </div>
      </section>

      <section className="section" aria-labelledby="bio-title">
        <div className="container split">
          <PhotoPlaceholder />
          <div className="bio-teaser__text">
            <SectionTitle id="bio-title" title="From La Habana to the world" />
            <p className="bio-teaser__quote" lang="es">
              {bio.teaserQuote}
            </p>
            <p className="prose">{bio.teaser}</p>
            <Link href="/about" className="btn btn--outline">
              Read the story
            </Link>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
