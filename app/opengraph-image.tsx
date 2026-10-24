import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — Official Site & Store`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Default social share image. Replace with a real photo by adding app/opengraph-image.jpg instead.
export default function OpengraphImage() {
  const rope = (color: string) => ({ height: 14, width: "100%", background: color, display: "flex" });
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "radial-gradient(circle at 20% 0%, #1A3FD6 0%, #060B26 60%)",
          color: "#F4F6FF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", padding: "0 80px 28px", fontSize: 28, letterSpacing: 6, color: "#AAB4DA" }}>
          LA HABANA, CUBA
        </div>
        <div style={rope("#FF2800")} />
        <div style={{ display: "flex", padding: "8px 80px", fontSize: 132, fontWeight: 900, lineHeight: 1 }}>
          ROMEO
        </div>
        <div style={rope("#F5C518")} />
        <div
          style={{ display: "flex", padding: "8px 80px", fontSize: 132, fontWeight: 900, lineHeight: 1, color: "#F5C518" }}
        >
          QUEVEDO
        </div>
        <div style={rope("#1A3FD6")} />
        <div style={{ display: "flex", padding: "28px 80px 0", fontSize: 30, color: "#AAB4DA" }}>
          Official site &amp; store
        </div>
      </div>
    ),
    size,
  );
}
