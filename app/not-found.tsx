import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container center-page">
      <span className="accent">404</span>
      <h1>Out of the ring</h1>
      <p>This page doesn&apos;t exist or has moved. Head back to the main event.</p>
      <div className="btn-row">
        <Link href="/" className="btn btn--red">
          Go home
        </Link>
        <Link href="/store" className="btn btn--outline">
          Visit the store
        </Link>
      </div>
    </div>
  );
}
