import { ImageResponse } from "next/og";

export const alt = "S’adapter ou devenir invisible ? — Livre blanc de Shelly Sarkar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#8eddf3",
        color: "#10284f",
        display: "flex",
        fontFamily: "Arial, sans-serif",
        height: "100%",
        justifyContent: "center",
        overflow: "hidden",
        padding: "72px 84px",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          background: "#fffdf7",
          border: "3px solid #10284f",
          borderRadius: 999,
          height: 160,
          left: -55,
          opacity: 0.95,
          position: "absolute",
          top: 64,
          width: 410,
        }}
      />
      <div
        style={{
          background: "#fffdf7",
          border: "3px solid #10284f",
          borderRadius: 999,
          bottom: 48,
          height: 120,
          opacity: 0.85,
          position: "absolute",
          right: -90,
          width: 360,
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: 4,
            marginBottom: 38,
            textTransform: "uppercase",
          }}
        >
          Livre blanc · Shelly Sarkar
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 92,
            fontWeight: 900,
            letterSpacing: -5,
            lineHeight: 0.9,
            textTransform: "uppercase",
          }}
        >
          <span>S’adapter</span>
          <span>ou devenir invisible ?</span>
        </div>
        <div style={{ display: "flex", fontSize: 27, fontWeight: 600, marginTop: 38 }}>
          Comment faire évoluer une marque pour enfants sans perdre son ADN ?
        </div>
      </div>
      <div
        style={{
          background: "#f6cbd8",
          border: "3px solid #10284f",
          borderRadius: 30,
          bottom: 72,
          display: "flex",
          height: 76,
          position: "absolute",
          right: 86,
          transform: "rotate(-8deg)",
          width: 76,
        }}
      />
    </div>,
    size,
  );
}
