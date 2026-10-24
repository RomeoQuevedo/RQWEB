import Link from "next/link";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/products";
import { ProductArt } from "./ProductArt";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="product-card-wrap">
      <Link href={`/store/${product.slug}`} className="product-card">
        {product.badge && (
          <span className={`badge ${product.badge === "Signed" ? "badge--gold" : ""}`}>{product.badge}</span>
        )}
        <ProductArt product={product} />
        <div className="product-card__body">
          <span className="product-card__cat">{product.category}</span>
          <h3 className="product-card__name">{product.name}</h3>
          <Price product={product} />
        </div>
      </Link>
    </div>
  );
}

export function Price({ product, className = "" }: { product: Pick<Product, "price" | "compareAtPrice">; className?: string }) {
  return (
    <span className={`price ${className}`}>
      {formatPrice(product.price)}
      {product.compareAtPrice && product.compareAtPrice > product.price && (
        <s>
          <span className="visually-hidden">Was </span>
          {formatPrice(product.compareAtPrice)}
        </s>
      )}
    </span>
  );
}
