import type { SVGProps } from "react";
import type { SocialPlatform } from "@/lib/site";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 22, ...rest }: IconProps): SVGProps<SVGSVGElement> {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    focusable: false,
    ...rest,
  };
}

export function CartIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 4h2.2l2.3 11.2a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.1L21 8H6.1" />
      <circle cx="9.5" cy="20" r="1.3" />
      <circle cx="17.5" cy="20" r="1.3" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 7h16M4 12h16M4 17h10" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function SocialIcon({ platform, ...props }: IconProps & { platform: SocialPlatform }) {
  switch (platform) {
    case "instagram":
      return (
        <svg {...base(props)}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" />
        </svg>
      );
    case "x":
      return (
        <svg {...base(props)}>
          <path d="M4 4l16 16M20 4L4 20" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...base(props)}>
          <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
          <path d="M10 9.2v5.6l4.8-2.8z" fill="currentColor" />
        </svg>
      );
    case "tiktok":
      return (
        <svg {...base(props)}>
          <path d="M14 3.5v11.2a3.8 3.8 0 1 1-3.8-3.8" />
          <path d="M14 3.5c.5 2.6 2.3 4.3 5 4.6" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...base(props)}>
          <path d="M14.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4a20 20 0 0 0-2.4-.1c-2.4 0-4 1.4-4 4.1v2.1H8.6v3h2.7V21" />
        </svg>
      );
  }
}
