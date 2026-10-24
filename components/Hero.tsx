import Link from "next/link";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-name">
      <div className="container">
        <p className="hero__tagline">
          <span>LA HABANA, CUBA</span>
          <span className="flag-dot" aria-hidden="true" />
          <span lang="es">El Campeón</span>
        </p>
      </div>

      {/* Ropes are full-bleed siblings of each name line, so they frame the name and never cross other copy */}
      <h1 id="hero-name" className="hero__name">
        <span className="rope rope--red" aria-hidden="true" />
        <span className="hero__line container">
          <span className="hero__first">{site.firstName}</span>
        </span>
        <span className="rope rope--gold" aria-hidden="true" />
        <span className="hero__line container">
          <span className="hero__last">{site.lastName}</span>
        </span>
        <span className="rope rope--blue" aria-hidden="true" />
      </h1>

      <div className="container">
        <div className="hero__body">
          <p className="hero__nickname" lang="es">
            {site.nickname}
          </p>
          <p className="hero__lede">{site.heroLede}</p>
          <div className="btn-row">
            <Link href="/store" className="btn btn--red">
              Shop Merch
            </Link>
            <Link href="/events" className="btn btn--outline">
              Next Event
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
