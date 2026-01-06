import { ImageResponse } from "next/og"

export const runtime = "edge"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "180px",
          height: "180px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "40px",
          background: "linear-gradient(135deg, #10B981 0%, #2563EB 100%)",
          color: "#ffffff",
          fontSize: 64,
          fontWeight: 900,
          letterSpacing: -2,
          fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial",
        }}
      >
        S6
      </div>
    ),
    size
  )
}

