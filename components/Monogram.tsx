import { useId } from "react";

/** Gold "RQ" monogram in a chamfered frame — used as the logo mark. */
export function Monogram({ className = "monogram", title }: { className?: string; title?: string }) {
  const gid = `mg-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFE27A" />
          <stop offset="0.5" stopColor="#F5C518" />
          <stop offset="1" stopColor="#B8860B" />
        </linearGradient>
      </defs>
      <path d="M8 1h39v39l-7 7H1V8z" fill="#0D1A4F" stroke={`url(#${gid})`} strokeWidth="2" />
      <text
        x="24"
        y="31.5"
        textAnchor="middle"
        fontFamily="Tektur, Saira, sans-serif"
        fontWeight="900"
        fontSize="20"
        letterSpacing="-0.5"
        fill={`url(#${gid})`}
      >
        RQ
      </text>
    </svg>
  );
}
