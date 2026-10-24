import type { Metadata } from "next";
import Link from "next/link";
import { ClearCart } from "@/components/ClearCart";

export const metadata: Metadata = {
  title: "Order confirmed",
  robots: { index: false, follow: false },
};

export default function CheckoutSuccessPage() {
  return (
    <div className="container center-page">
      <ClearCart />
      <span className="accent" lang="es">
        ¡Gracias!
      </span>
      <h1>Order confirmed</h1>
      <p>
        Thanks for supporting Romeo. A receipt is on its way to your email, and we&apos;ll send tracking details as soon
        as your order ships.
      </p>
      <div className="btn-row">
        <Link href="/store" className="btn btn--red">
          Keep shopping
        </Link>
        <Link href="/events" className="btn btn--outline">
          See upcoming events
        </Link>
      </div>
    </div>
  );
}
