import { useId } from "react";

/**
 * Branded portrait placeholder. Swap for next/image once a real photo exists, e.g.
 * <Image src="/romeo-portrait.jpg" alt="Romeo Quevedo" fill sizes="(min-width: 900px) 40vw, 100vw" />
 */
export function PhotoPlaceholder({ label = "Portrait of Romeo Quevedo (placeholder)" }: { label?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  return (
    <div className="photo-frame">
      <svg viewBox="0 0 400 500" role="img" aria-label={label} preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`pp-bg-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1A3FD6" />
            <stop offset="1" stopColor="#060B26" />
          </linearGradient>
          <linearGradient id={`pp-gold-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFE27A" />
            <stop offset="0.5" stopColor="#F5C518" />
            <stop offset="1" stopColor="#B8860B" />
          </linearGradient>
        </defs>
        <rect width="400" height="500" fill={`url(#pp-bg-${id})`} />
        <ellipse cx="200" cy="40" rx="260" ry="200" fill="#FFFFFF" opacity="0.07" />
        <circle cx="200" cy="180" r="62" fill="#0D1A4F" />
        <path d="M70 500 Q80 290 200 280 Q320 290 330 500 Z" fill="#0D1A4F" />
        <g strokeWidth="7">
          <line x1="0" y1="392" x2="400" y2="372" stroke="#FF2800" />
          <line x1="0" y1="420" x2="400" y2="400" stroke="#F5C518" />
          <line x1="0" y1="448" x2="400" y2="428" stroke="#1A3FD6" />
        </g>
        <text
          x="200"
          y="200"
          textAnchor="middle"
          fontFamily="Tektur, Saira, sans-serif"
          fontWeight="900"
          fontSize="54"
          fill={`url(#pp-gold-${id})`}
        >
          RQ
        </text>
        <text x="200" y="486" textAnchor="middle" fontFamily="Saira, sans-serif" fontSize="16" fill="#AAB4DA">
          Photo coming soon
        </text>
      </svg>
    </div>
  );
}
