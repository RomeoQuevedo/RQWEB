import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  title: string;
  description?: ReactNode;
  id?: string;
  action?: { href: string; label: string };
};

export function SectionTitle({ title, description, id, action }: Props) {
  return (
    <div className="section-title">
      <div>
        <h2 id={id}>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {action && (
        <Link href={action.href} className="link-arrow">
          {action.label} <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  );
}
