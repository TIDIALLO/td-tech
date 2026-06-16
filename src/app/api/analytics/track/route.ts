import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Génère un fingerprint basé sur les headers
function generateFingerprint(req: NextRequest): string {
  const userAgent = req.headers.get("user-agent") || "";
  const acceptLanguage = req.headers.get("accept-language") || "";
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";

  // Simple hash function
  const str = `${ip}-${userAgent}-${acceptLanguage}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

// Détecte le type d'appareil
function detectDevice(userAgent: string): string {
  if (/mobile/i.test(userAgent)) return "mobile";
  if (/tablet|ipad/i.test(userAgent)) return "tablet";
  return "desktop";
}

// Détecte le navigateur
function detectBrowser(userAgent: string): string {
  if (/chrome/i.test(userAgent) && !/edge/i.test(userAgent)) return "Chrome";
  if (/firefox/i.test(userAgent)) return "Firefox";
  if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) return "Safari";
  if (/edge/i.test(userAgent)) return "Edge";
  if (/opera/i.test(userAgent)) return "Opera";
  return "Other";
}

// Détecte l'OS
function detectOS(userAgent: string): string {
  if (/windows/i.test(userAgent)) return "Windows";
  if (/macintosh|mac os/i.test(userAgent)) return "macOS";
  if (/linux/i.test(userAgent) && !/android/i.test(userAgent)) return "Linux";
  if (/android/i.test(userAgent)) return "Android";
  if (/iphone|ipad|ipod/i.test(userAgent)) return "iOS";
  return "Other";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, path, title, referrer, duration, category, action, label, value, metadata, utmSource, utmMedium, utmCampaign } = body;

    const userAgent = req.headers.get("user-agent") || "";
    const fingerprint = generateFingerprint(req);

    // Créer ou mettre à jour le visiteur
    let visitor = await prisma.visitor.findUnique({
      where: { fingerprint },
    });

    if (!visitor) {
      visitor = await prisma.visitor.create({
        data: {
          fingerprint,
          device: detectDevice(userAgent),
          browser: detectBrowser(userAgent),
          os: detectOS(userAgent),
          referrer: referrer || req.headers.get("referer"),
          utmSource,
          utmMedium,
          utmCampaign,
        },
      });
    } else {
      // Mettre à jour la dernière visite
      visitor = await prisma.visitor.update({
        where: { id: visitor.id },
        data: {
          lastVisit: new Date(),
          visitCount: { increment: 1 },
        },
      });
    }

    // Enregistrer l'événement selon le type
    if (type === "PAGE_VIEW" || type === "pageview") {
      await prisma.pageView.create({
        data: {
          visitorId: visitor.id,
          path: path || "/",
          title,
          referrer,
          duration,
        },
      });
    } else {
      // Autres types d'événements (CLICK, SCROLL, FORM_SUBMIT, CONVERSION, CUSTOM)
      const eventType = type?.toUpperCase() || "CUSTOM";

      await prisma.analyticsEvent.create({
        data: {
          visitorId: visitor.id,
          type: eventType as "PAGE_VIEW" | "CLICK" | "SCROLL" | "FORM_SUBMIT" | "CONVERSION" | "CUSTOM",
          category,
          action,
          label,
          value: value ? parseFloat(value) : null,
          path,
          metadata,
        },
      });

      // Si c'est une conversion, l'enregistrer aussi dans la table dédiée
      if (eventType === "CONVERSION") {
        await prisma.conversion.create({
          data: {
            visitorId: visitor.id,
            type: category || "generic",
            value: value ? parseFloat(value) : null,
            source: visitor.utmSource || visitor.referrer,
            metadata,
          },
        });
      }
    }

    return NextResponse.json({ success: true, visitorId: visitor.id });
  } catch (error) {
    console.error("Analytics tracking error:", error);
    return NextResponse.json(
      { error: "Failed to track event" },
      { status: 500 }
    );
  }
}

// Endpoint GET pour vérifier que l'API fonctionne
export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Analytics tracking API is running",
    timestamp: new Date().toISOString()
  });
}
