import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bookings & press",
  description: `Book ${site.name} for your event, or reach out for press and sponsorship.`,
  alternates: { canonical: "/contact" },
  openGraph: { title: `Bookings & press · ${site.name}`, url: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1>Bookings &amp; press</h1>
          <p>Promoters, media and brands — tell us about your event or project and we&apos;ll be in touch.</p>
        </div>
      </header>
      <section className="section">
        <div className="container contact-layout">
          <ContactForm />
          <aside className="contact-aside" aria-label="Other ways to reach us">
            <div>
              <h2>Bookings</h2>
              <p>Include the event date, city, promotion and the type of match you have in mind.</p>
            </div>
            <div>
              <h2>Press</h2>
              <p>Interview requests, photo assets and media credentials.</p>
            </div>
            <div>
              <h2>Sponsorship</h2>
              <p>Brand partnerships, gear and appearances.</p>
            </div>
            <div>
              <h2>Email</h2>
              <p>
                <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
