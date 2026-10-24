import type { Metadata } from "next";
import { CartView } from "@/components/CartView";

export const metadata: Metadata = {
  title: "Cart",
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1>Your cart</h1>
        </div>
      </header>
      <section className="section">
        <div className="container">
          <CartView />
        </div>
      </section>
    </>
  );
}
