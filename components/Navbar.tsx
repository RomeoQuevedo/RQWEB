"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { useCart } from "./CartProvider";
import { CartIcon, CloseIcon, MenuIcon } from "./Icons";
import { Monogram } from "./Monogram";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const { count, hydrated } = useCart();
  const [open, setOpen] = useState(false);

  // Close the mobile menu on navigation
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const cartLabel = hydrated && count > 0 ? `Cart, ${count} item${count === 1 ? "" : "s"}` : "Cart";

  return (
    <header className="nav">
      <div className="container nav__inner">
        <Link href="/" className="nav__logo" aria-label={`${site.name} — home`}>
          <Monogram />
          <span className="nav__logo-text">{site.name}</span>
        </Link>

        <nav aria-label="Main">
          <ul className="nav__links">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="nav__link"
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link href="/cart" className="nav__cart" aria-label={cartLabel}>
          <CartIcon size={24} />
          {hydrated && count > 0 && (
            <span className="nav__cart-count" aria-hidden="true">
              {count > 99 ? "99+" : count}
            </span>
          )}
        </Link>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" className="nav__mobile" aria-label="Mobile">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={isActive(pathname, item.href) ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/cart" aria-current={pathname === "/cart" ? "page" : undefined}>
                Cart{hydrated && count > 0 ? ` (${count})` : ""}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
