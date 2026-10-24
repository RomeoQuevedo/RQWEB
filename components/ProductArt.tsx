import Image from "next/image";
import { useId, type ReactNode } from "react";
import type { Product, ProductIcon } from "@/lib/products";

const NAVY = "#060B26";
const RED = "#FF2800";
const GOLD = "#F5C518";
const BLUE = "#1A3FD6";

type Props = {
  product: Pick<Product, "name" | "colors" | "image">;
  /** `sizes` hint for next/image when a real photo is used */
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * Product image. Renders the real photo when `product.image` is set (put files in /public/products),
 * otherwise a branded SVG placeholder built from the product's colors and icon.
 */
export function ProductArt({ product, sizes = "(min-width: 1100px) 25vw, (min-width: 768px) 33vw, 50vw", priority, className }: Props) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");

  if (product.image) {
    return (
      <div className={`product-art ${className ?? ""}`}>
        <Image src={product.image} alt={product.name} fill sizes={sizes} priority={priority} style={{ objectFit: "cover" }} />
      </div>
    );
  }

  const { bg, accent, icon } = product.colors;
  const bgId = `pa-bg-${uid}`;
  const spotId = `pa-spot-${uid}`;

  return (
    <div className={`product-art ${className ?? ""}`}>
      <svg viewBox="0 0 200 200" role="img" aria-label={`${product.name} (placeholder image)`}>
        <defs>
          <linearGradient id={bgId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={bg} />
            <stop offset="1" stopColor={NAVY} />
          </linearGradient>
          <radialGradient id={spotId} cx="0.5" cy="0" r="0.8">
            <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.16" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="200" height="200" fill={`url(#${bgId})`} />
        <rect width="200" height="200" fill={`url(#${spotId})`} />

        {/* Ring ropes */}
        <g opacity="0.55" strokeWidth="3">
          <line x1="-10" y1="176" x2="210" y2="160" stroke={RED} />
          <line x1="-10" y1="184" x2="210" y2="168" stroke={GOLD} />
          <line x1="-10" y1="192" x2="210" y2="176" stroke={BLUE} />
        </g>

        <g>{renderIcon(icon, accent, bg)}</g>

        <text
          x="14"
          y="26"
          fontFamily="Tektur, Saira, sans-serif"
          fontWeight="900"
          fontSize="14"
          fill={accent}
          opacity="0.9"
        >
          RQ
        </text>
      </svg>
    </div>
  );
}

function Mono({ x, y, size, fill }: { x: number; y: number; size: number; fill: string }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontFamily="Tektur, Saira, sans-serif"
      fontWeight="900"
      fontSize={size}
      fill={fill}
    >
      RQ
    </text>
  );
}

function starPoints(cx: number, cy: number, outer: number, inner: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(" ");
}

function renderIcon(icon: ProductIcon, accent: string, bg: string): ReactNode {
  switch (icon) {
    case "tee":
      return (
        <>
          <path d="M70 56 L90 48 Q100 60 110 48 L130 56 L152 78 L136 94 L128 86 L128 156 L72 156 L72 86 L64 94 L48 78 Z" fill={accent} />
          <Mono x={100} y={112} size={20} fill={bg} />
        </>
      );
    case "hoodie":
      return (
        <>
          <path d="M66 66 Q100 44 134 66 L156 80 L162 148 L146 150 L138 104 L138 158 L62 158 L62 104 L54 150 L38 148 L44 80 Z" fill={accent} />
          <path d="M82 64 Q100 86 118 64" fill="none" stroke={bg} strokeWidth="3" />
          <path d="M78 132 H122 L128 150 H72 Z" fill="none" stroke={bg} strokeWidth="2.5" />
          <Mono x={100} y={118} size={16} fill={bg} />
        </>
      );
    case "tank":
      return (
        <>
          <path d="M80 48 L90 48 Q100 74 110 48 L120 48 Q122 74 132 84 L134 158 L66 158 L68 84 Q78 74 80 48 Z" fill={accent} />
          <Mono x={100} y={124} size={18} fill={bg} />
        </>
      );
    case "cap":
      return (
        <>
          <path d="M54 124 Q54 68 100 66 Q146 68 146 124 Z" fill={accent} />
          <path d="M54 122 H150 Q178 124 176 136 Q172 142 150 140 H54 Z" fill={accent} opacity="0.85" />
          <path d="M60 108 Q100 96 140 108" fill="none" stroke={RED} strokeWidth="3" />
          <circle cx="100" cy="66" r="4" fill={bg} />
          <Mono x={100} y={100} size={16} fill={bg} />
        </>
      );
    case "lanyard":
      return (
        <>
          <path d="M66 26 L96 112 M134 26 L104 112" stroke={accent} strokeWidth="8" strokeLinecap="round" />
          <path d="M66 26 L96 112" stroke={RED} strokeWidth="3" strokeLinecap="round" />
          <path d="M134 26 L104 112" stroke={BLUE} strokeWidth="3" strokeLinecap="round" />
          <rect x="90" y="106" width="20" height="12" fill={GOLD} />
          <rect x="70" y="118" width="60" height="62" rx="4" fill={accent} />
          <rect x="88" y="124" width="24" height="5" rx="2" fill={bg} />
          <Mono x={100} y={162} size={18} fill={bg} />
        </>
      );
    case "band":
      return (
        <g fill="none" strokeWidth="11">
          <ellipse cx="100" cy="76" rx="52" ry="16" stroke={RED} />
          <ellipse cx="100" cy="102" rx="52" ry="16" stroke={accent} />
          <ellipse cx="100" cy="128" rx="52" ry="16" stroke={BLUE} />
        </g>
      );
    case "ring": {
      const posts: [number, number][] = [
        [100, 96],
        [162, 126],
        [100, 156],
        [38, 126],
      ];
      const ropes: [number, string][] = [
        [12, BLUE],
        [22, GOLD],
        [32, RED],
      ];
      const edges: [number, number][] = [
        [3, 0],
        [0, 1],
        [1, 2],
        [2, 3],
      ];
      return (
        <>
          <path d="M38 126 L100 156 L162 126 L162 140 L100 170 L38 140 Z" fill={NAVY} opacity="0.9" />
          <path d="M38 126 L100 96 L162 126 L100 156 Z" fill={accent} />
          {edges.map(([a, b], ei) =>
            ropes.map(([h, color]) => (
              <line
                key={`${ei}-${h}`}
                x1={posts[a][0]}
                y1={posts[a][1] - h}
                x2={posts[b][0]}
                y2={posts[b][1] - h}
                stroke={color}
                strokeWidth="2.5"
                opacity={ei < 2 ? 0.6 : 1}
              />
            )),
          )}
          {posts.map(([x, y], i) => (
            <line key={i} x1={x} y1={y} x2={x} y2={y - 38} stroke="#F4F6FF" strokeWidth="4" strokeLinecap="round" />
          ))}
        </>
      );
    }
    case "pin":
      return (
        <>
          <circle cx="100" cy="102" r="48" fill={accent} />
          <circle cx="100" cy="102" r="39" fill="none" stroke={bg} strokeWidth="3" />
          <polygon points={starPoints(100, 104, 26, 11)} fill={RED} />
        </>
      );
    case "photo":
      return (
        <g transform="rotate(-5 100 100)">
          <rect x="54" y="38" width="92" height="126" fill="#F4F6FF" />
          <rect x="62" y="46" width="76" height="90" fill={bg} />
          <circle cx="100" cy="78" r="13" fill={accent} />
          <path d="M72 136 Q74 98 100 96 Q126 98 128 136 Z" fill={accent} />
          <path d="M70 152 q8 -12 14 0 t14 0 t14 0 t18 -6" fill="none" stroke={BLUE} strokeWidth="2.5" strokeLinecap="round" />
        </g>
      );
    case "poster":
      return (
        <g transform="rotate(3 100 100)">
          <rect x="58" y="28" width="84" height="144" fill={accent} />
          <Mono x={100} y={86} size={34} fill={bg} />
          <rect x="70" y="104" width="60" height="6" fill={bg} />
          <rect x="70" y="116" width="44" height="4" fill={bg} opacity="0.7" />
          <rect x="70" y="124" width="52" height="4" fill={bg} opacity="0.7" />
          <path d="M70 154 q8 -12 14 0 t14 0 t14 0 t16 -6" fill="none" stroke="#F4F6FF" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      );
  }
}
