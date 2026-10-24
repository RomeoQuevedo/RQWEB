"use client";

import Link from "next/link";
import { useState } from "react";
import { formatPrice } from "@/lib/format";
import { getProduct } from "@/lib/products";
import { lineKey, useCart } from "./CartProvider";
import { ProductArt } from "./ProductArt";

export function CartView() {
  const { items, hydrated, subtotal, count, maxQty, setQty, remove } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function checkout() {
    setCheckingOut(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: items.map(({ slug, size, qty }) => ({ slug, size, qty })) }),
      });
      const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
      if (res.ok && data.url) {
        window.location.assign(data.url);
        return;
      }
      setError(data.error ?? "Checkout is unavailable right now. Please try again later.");
    } catch {
      setError("Couldn't reach checkout. Check your connection and try again.");
    }
    setCheckingOut(false);
  }

  if (!hydrated) {
    return <p className="muted">Loading your cart…</p>;
  }

  if (items.length === 0) {
    return (
      <div className="empty-state">
        <h2 style={{ fontSize: "1.75rem" }}>Your cart is empty</h2>
        <p className="muted">Gear up before the next show.</p>
        <Link href="/store" className="btn btn--red">
          Shop Merch
        </Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <div>
        <h2 className="visually-hidden">Items</h2>
        <ul className="cart__lines">
          {items.map((item) => {
            const product = getProduct(item.slug);
            if (!product) return null;
            const key = lineKey(item);
            return (
              <li key={key} className="cart-line">
                <Link href={`/store/${product.slug}`} tabIndex={-1} aria-hidden="true">
                  <ProductArt product={product} sizes="120px" />
                </Link>
                <div className="cart-line__info">
                  <Link href={`/store/${product.slug}`} className="cart-line__name">
                    {product.name}
                  </Link>
                  <span className="cart-line__meta">
                    {product.category}
                    {item.size ? ` · Size ${item.size}` : ""} · {formatPrice(product.price)} each
                  </span>
                </div>
                <div className="cart-line__actions">
                  <div className="qty" role="group" aria-label={`Quantity for ${product.name}`}>
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      disabled={item.qty <= 1}
                      onClick={() => setQty(key, item.qty - 1)}
                    >
                      −
                    </button>
                    <output aria-live="polite">{item.qty}</output>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      disabled={item.qty >= maxQty}
                      onClick={() => setQty(key, item.qty + 1)}
                    >
                      +
                    </button>
                  </div>
                  <span className="price">{formatPrice(product.price * item.qty)}</span>
                  <button type="button" className="link-button" onClick={() => remove(key)}>
                    Remove<span className="visually-hidden"> {product.name}</span>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <aside className="summary" aria-labelledby="summary-title">
        <h2 id="summary-title">Order summary</h2>
        <div className="summary__row">
          <span className="muted">
            Items ({count})
          </span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="summary__row">
          <span className="muted">Shipping</span>
          <span className="muted">At checkout</span>
        </div>
        <div className="summary__row summary__row--total">
          <strong>Subtotal</strong>
          <strong className="price">{formatPrice(subtotal)}</strong>
        </div>
        <p className="muted" style={{ fontSize: "0.875rem" }}>
          Shipping and taxes are calculated at checkout. Secure payment by Stripe.
        </p>
        <button type="button" className="btn btn--red btn--block" onClick={checkout} disabled={checkingOut}>
          {checkingOut ? "Redirecting…" : "Checkout"}
        </button>
        <div role="alert" aria-live="assertive">
          {error && <p className="notice notice--error">{error}</p>}
        </div>
        <Link href="/store" className="link-arrow">
          <span aria-hidden="true">←</span> Continue shopping
        </Link>
      </aside>
    </div>
  );
}
