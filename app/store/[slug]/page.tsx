import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/AddToCart";
import { Price, ProductCard } from "@/components/ProductCard";
import { ProductArt } from "@/components/ProductArt";
import { SectionTitle } from "@/components/SectionTitle";
import { getProduct, getRelatedProducts, products } from "@/lib/products";
import { site } from "@/lib/site";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/store/${product.slug}` },
    openGraph: {
      title: `${product.name} · ${site.name}`,
      description: product.description,
      url: `/store/${product.slug}`,
      ...(product.image ? { images: [{ url: product.image, alt: product.name }] } : {}),
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: product.category,
    brand: { "@type": "Brand", name: site.name },
    ...(product.image ? { image: new URL(product.image, site.url).toString() } : {}),
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: (product.price / 100).toFixed(2),
      availability: "https://schema.org/InStock",
      url: new URL(`/store/${product.slug}`, site.url).toString(),
    },
  };

  return (
    <>
      <section className="section" style={{ paddingTop: "clamp(24px, 4vw, 48px)" }}>
        <div className="container">
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumbs">
              <li>
                <Link href="/store">Store</Link>
              </li>
              <li>{product.category}</li>
              <li aria-current="page">{product.name}</li>
            </ol>
          </nav>

          <div className="pdp">
            <div className="pdp__media">
              {product.badge && (
                <span className={`badge ${product.badge === "Signed" ? "badge--gold" : ""}`}>{product.badge}</span>
              )}
              <ProductArt product={product} priority sizes="(min-width: 900px) 55vw, 100vw" />
            </div>

            <div className="pdp__info">
              <span className="accent">{product.category}</span>
              <h1 className="pdp__title">{product.name}</h1>
              <Price product={product} className="pdp__price" />
              <p className="pdp__desc">{product.description}</p>
              <AddToCart product={product} />
              {product.details && product.details.length > 0 && (
                <ul className="detail-list">
                  {product.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              )}
              <p className="muted" style={{ fontSize: "0.9375rem" }}>
                Shipping and taxes calculated at checkout.
              </p>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--panel" aria-labelledby="related-title">
          <div className="container">
            <SectionTitle id="related-title" title="You might also like" action={{ href: "/store", label: "Back to store" }} />
            <ul className="grid grid--products grid--products-4" style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {related.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <script
        type="application/ld+json"
        // Static, server-built data from lib/products.ts
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
