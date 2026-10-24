import type { Metadata } from "next";
import { StoreGrid } from "@/components/StoreGrid";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Store",
  description: `Official ${site.name} merch — apparel, accessories, collectibles and signed items.`,
  alternates: { canonical: "/store" },
  openGraph: { title: `Store · ${site.name}`, url: "/store" },
};

export default function StorePage() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1>Official store</h1>
          <p>
            Apparel, accessories, collectibles and signed pieces. <span lang="es">Tienda oficial.</span>
          </p>
        </div>
      </header>
      <section className="section">
        <div className="container">
          <StoreGrid products={products} />
        </div>
      </section>
    </>
  );
}
