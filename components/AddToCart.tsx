"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import type { Product } from "@/lib/products";
import { useCart } from "./CartProvider";

export function AddToCart({ product }: { product: Pick<Product, "slug" | "name" | "sizes"> }) {
  const { add, maxQty } = useCart();
  const [size, setSize] = useState<string | undefined>(undefined);
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState<string | null>(null);

  const needsSize = !!product.sizes?.length;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (needsSize && !size) {
      setSizeError(true);
      return;
    }
    add({ slug: product.slug, size: needsSize ? size : undefined, qty });
    setAdded(`${qty} × ${product.name}${size ? ` (${size})` : ""} added to your cart.`);
    setQty(1);
  }

  return (
    <form className="add-to-cart" onSubmit={onSubmit} noValidate>
      {needsSize && (
        <fieldset
          className="size-options field"
          aria-describedby={sizeError ? "size-error" : undefined}
          aria-invalid={sizeError || undefined}
        >
          <legend>Size</legend>
          {product.sizes!.map((s) => (
            <label key={s} className="size-option">
              <input
                type="radio"
                name="size"
                value={s}
                checked={size === s}
                onChange={() => {
                  setSize(s);
                  setSizeError(false);
                }}
              />
              <span>{s}</span>
            </label>
          ))}
          {sizeError && (
            <p id="size-error" className="field-error" style={{ flexBasis: "100%" }}>
              Choose a size first.
            </p>
          )}
        </fieldset>
      )}

      <div className="field">
        <span id="qty-label" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.9375rem" }}>
          Quantity
        </span>
        <div className="qty" role="group" aria-labelledby="qty-label">
          <button type="button" aria-label="Decrease quantity" disabled={qty <= 1} onClick={() => setQty((q) => Math.max(1, q - 1))}>
            −
          </button>
          <output aria-live="polite">{qty}</output>
          <button
            type="button"
            aria-label="Increase quantity"
            disabled={qty >= maxQty}
            onClick={() => setQty((q) => Math.min(maxQty, q + 1))}
          >
            +
          </button>
        </div>
      </div>

      <div className="add-to-cart__row">
        <button type="submit" className="btn btn--red">
          Add to Cart
        </button>
        <Link href="/cart" className="btn btn--outline">
          View cart
        </Link>
      </div>

      <div role="status" aria-live="polite">
        {added && <p className="notice notice--success">{added}</p>}
      </div>
    </form>
  );
}
