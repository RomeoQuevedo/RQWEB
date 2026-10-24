"use client";

import { useMemo, useState } from "react";
import { categories, type Category, type Product } from "@/lib/products";
import { ProductCard } from "./ProductCard";

type Sort = "featured" | "price-asc" | "price-desc";

export function StoreGrid({ products }: { products: Product[] }) {
  const [category, setCategory] = useState<Category | "All">("All");
  const [sort, setSort] = useState<Sort>("featured");

  const visible = useMemo(() => {
    const filtered = category === "All" ? products : products.filter((p) => p.category === category);
    if (sort === "featured") {
      // Featured first, otherwise keep catalog order
      return [...filtered].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    }
    return [...filtered].sort((a, b) => (sort === "price-asc" ? a.price - b.price : b.price - a.price));
  }, [products, category, sort]);

  return (
    <>
      <div className="filters">
        <div className="chips" role="group" aria-label="Filter by category">
          {(["All", ...categories] as const).map((c) => (
            <button
              key={c}
              type="button"
              className="chip"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="sort">
          <label htmlFor="sort">Sort by</label>
          <select id="sort" className="select" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </div>
      </div>

      <p className="visually-hidden" role="status" aria-live="polite">
        {visible.length} product{visible.length === 1 ? "" : "s"} shown
      </p>

      {visible.length > 0 ? (
        <ul className="grid grid--products" style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {visible.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="muted">Nothing in this category yet — check back soon.</p>
      )}
    </>
  );
}
