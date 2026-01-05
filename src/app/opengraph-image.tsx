import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "Synap6ia | Tidiane Diallo"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#020617",
          color: "#ffffff",
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(16,185,129,0.35), transparent 40%), radial-gradient(circle at 80% 10%, rgba(37,99,235,0.35), transparent 40%), radial-gradient(circle at 50% 90%, rgba(14,165,233,0.25), transparent 45%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #10B981 0%, #2563EB 100%)",
              boxShadow: "0 20px 60px rgba(16,185,129,0.22)",
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            S6
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.5 }}>Synap6ia</div>
            <div style={{ fontSize: 18, color: "rgba(226,232,240,0.85)" }}>Tidiane Diallo</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontSize: 62, fontWeight: 900, letterSpacing: -1.5, lineHeight: 1.05 }}>
            Web, Automations, IA
            <span style={{ color: "#10B981" }}> — </span>
            livrés proprement
          </div>
          <div style={{ fontSize: 22, color: "rgba(226,232,240,0.9)", lineHeight: 1.35 }}>
            Next.js • n8n • Agents IA • Formations — performance, SEO et sécurité.
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {["Réponse < 24h", "Livraison prod-ready", "Design sobre"].map((t) => (
            <div
              key={t}
              style={{
                padding: "10px 14px",
                borderRadius: 999,
                border: "1px solid rgba(148,163,184,0.28)",
                backgroundColor: "rgba(2,6,23,0.35)",
                color: "rgba(226,232,240,0.92)",
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  )
}

