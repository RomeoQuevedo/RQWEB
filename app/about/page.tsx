import type { Metadata } from "next";
import Link from "next/link";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { SectionTitle } from "@/components/SectionTitle";
import { bio, championships, ringStats, site, timeline } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Biography, ring stats, career timeline and championships of ${site.name}, professional wrestler from ${site.hometown}.`,
  alternates: { canonical: "/about" },
  openGraph: { title: `About ${site.name}`, url: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1>About Romeo</h1>
          <p>
            Professional wrestler from <span className="accent">{site.hometown}</span>.
          </p>
        </div>
      </header>

      <section className="section" aria-labelledby="bio-title">
        <div className="container split">
          <PhotoPlaceholder />
          <div>
            <SectionTitle id="bio-title" title="Biography" />
            <div className="prose">
              {bio.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--panel" aria-labelledby="stats-title">
        <div className="container">
          <SectionTitle id="stats-title" title="Ring stats" />
          <dl className="ring-stats">
            {ringStats.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section" aria-labelledby="timeline-title">
        <div className="container">
          <SectionTitle id="timeline-title" title="Career timeline" />
          <ol className="timeline">
            {timeline.map((t, i) => (
              <li key={i}>
                <span className="timeline__year">{t.year}</span>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {championships.length > 0 && (
        <section className="section section--panel" aria-labelledby="titles-title">
          <div className="container">
            <SectionTitle id="titles-title" title="Championships" />
            <ul className="titles">
              {championships.map((c, i) => (
                <li key={i} className="title-card">
                  <span className="accent">{c.promotion}</span>
                  <h3>{c.title}</h3>
                  <p>{c.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container center-page" style={{ paddingBlock: 0 }}>
          <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}>Book Romeo for your event</h2>
          <p>Promoters, press and sponsors — get in touch through the bookings form.</p>
          <Link href="/contact" className="btn btn--red">
            Bookings &amp; press
          </Link>
        </div>
      </section>
    </>
  );
}
