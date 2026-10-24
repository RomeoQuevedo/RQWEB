import Link from "next/link";
import { nav, site, socials } from "@/lib/site";
import { SocialIcon } from "./Icons";
import { Monogram } from "./Monogram";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer__ropes" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link href="/" aria-label={`${site.name} — home`} style={{ display: "inline-block" }}>
              <Monogram className="monogram" />
            </Link>
            <p>
              {site.name} · <span className="accent">{site.hometown}</span>
              <br />
              Professional wrestler. Official site and store.
            </p>
          </div>

          <div>
            <h2>Explore</h2>
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/cart">Cart</Link>
              </li>
            </ul>
          </div>

          <div>
            <h2>Follow</h2>
            <ul className="socials">
              {socials.map((s) => (
                <li key={s.platform}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                    <SocialIcon platform={s.platform} size={20} />
                  </a>
                </li>
              ))}
            </ul>
            <p className="muted" style={{ marginTop: 16, fontSize: "0.9375rem" }}>
              Bookings &amp; press: <Link href="/contact">contact form</Link>
            </p>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>Hecho con orgullo cubano.</p>
        </div>
      </div>
    </footer>
  );
}
