import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Vérifie l'API key pour sécuriser le webhook
function verifyApiKey(req: NextRequest): boolean {
  const apiKey = req.headers.get("x-api-key") || req.headers.get("authorization")?.replace("Bearer ", "");
  const expectedApiKey = process.env.N8N_API_KEY;

  // Si pas d'API key configurée, on accepte (pour le développement)
  if (!expectedApiKey) return true;

  return apiKey === expectedApiKey;
}

export async function POST(req: NextRequest) {
  try {
    // Vérifier l'authentification
    if (!verifyApiKey(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { type, data } = body;

    // Log du webhook reçu
    const webhookLog = await prisma.n8nWebhookLog.create({
      data: {
        webhookType: type || "generic",
        payload: body,
        status: "received",
      },
    });

    let response: Record<string, unknown> = { success: true };

    // Router selon le type de webhook
    switch (type) {
      case "get_stats":
        // Récupérer les statistiques
        response = await getQuickStats(data?.period || "today");
        break;

      case "get_visitors":
        // Liste des visiteurs récents
        response = await getRecentVisitors(data?.limit || 10);
        break;

      case "get_conversions":
        // Liste des conversions
        response = await getConversions(data?.period || "today");
        break;

      case "get_top_pages":
        // Pages les plus visitées
        response = await getTopPages(data?.period || "today", data?.limit || 5);
        break;

      case "ping":
        response = { status: "pong", timestamp: new Date().toISOString() };
        break;

      default:
        response = {
          message: "Webhook received",
          availableTypes: ["get_stats", "get_visitors", "get_conversions", "get_top_pages", "ping"],
        };
    }

    // Mettre à jour le log avec la réponse
    await prisma.n8nWebhookLog.update({
      where: { id: webhookLog.id },
      data: {
        response: response as object,
        status: "processed",
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("N8N webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed", details: String(error) },
      { status: 500 }
    );
  }
}

// Obtenir les stats rapidement
async function getQuickStats(period: string) {
  const now = new Date();
  let startDate: Date;

  switch (period) {
    case "today":
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case "yesterday":
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      startDate = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());
      break;
    case "week":
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case "month":
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    default:
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }

  const [visitors, pageViews, conversions] = await Promise.all([
    prisma.visitor.count({ where: { lastVisit: { gte: startDate } } }),
    prisma.pageView.count({ where: { timestamp: { gte: startDate } } }),
    prisma.conversion.count({ where: { timestamp: { gte: startDate } } }),
  ]);

  return {
    period,
    visitors,
    pageViews,
    conversions,
    message: `📊 Stats ${period}: ${visitors} visiteurs, ${pageViews} pages vues, ${conversions} conversions`,
  };
}

// Obtenir les visiteurs récents
async function getRecentVisitors(limit: number) {
  const visitors = await prisma.visitor.findMany({
    orderBy: { lastVisit: "desc" },
    take: limit,
    include: {
      pageViews: {
        orderBy: { timestamp: "desc" },
        take: 1,
      },
    },
  });

  return {
    count: visitors.length,
    visitors: visitors.map((v) => ({
      device: v.device,
      browser: v.browser,
      lastPage: v.pageViews[0]?.path || "N/A",
      lastVisit: v.lastVisit,
      visitCount: v.visitCount,
    })),
  };
}

// Obtenir les conversions
async function getConversions(period: string) {
  const now = new Date();
  const startDate =
    period === "today"
      ? new Date(now.getFullYear(), now.getMonth(), now.getDate())
      : new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const conversions = await prisma.conversion.findMany({
    where: { timestamp: { gte: startDate } },
    orderBy: { timestamp: "desc" },
    take: 10,
  });

  const total = conversions.reduce((sum, c) => sum + (c.value || 0), 0);

  return {
    count: conversions.length,
    totalValue: total,
    conversions: conversions.map((c) => ({
      type: c.type,
      value: c.value,
      source: c.source,
      time: c.timestamp,
    })),
  };
}

// Obtenir les pages les plus visitées
async function getTopPages(period: string, limit: number) {
  const now = new Date();
  const startDate =
    period === "today"
      ? new Date(now.getFullYear(), now.getMonth(), now.getDate())
      : new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const topPages = await prisma.pageView.groupBy({
    by: ["path"],
    where: { timestamp: { gte: startDate } },
    _count: { path: true },
    orderBy: { _count: { path: "desc" } },
    take: limit,
  });

  return {
    period,
    pages: topPages.map((p, i) => ({
      rank: i + 1,
      path: p.path,
      views: p._count.path,
    })),
    message: topPages.map((p, i) => `${i + 1}. ${p.path} (${p._count.path} vues)`).join("\n"),
  };
}

// GET pour vérifier le statut
export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "N8N Webhook endpoint is ready",
    endpoints: {
      POST: "Send webhooks here",
      types: ["get_stats", "get_visitors", "get_conversions", "get_top_pages", "ping"],
    },
    timestamp: new Date().toISOString(),
  });
}
