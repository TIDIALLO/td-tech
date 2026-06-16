import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const period = searchParams.get("period") || "today"; // today, week, month, all
    const apiKey = req.headers.get("x-api-key");

    // Vérification optionnelle de l'API key pour n8n
    const expectedApiKey = process.env.N8N_API_KEY;
    if (expectedApiKey && apiKey !== expectedApiKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Calculer les dates selon la période
    const now = new Date();
    let startDate: Date;

    switch (period) {
      case "today":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case "yesterday":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
        break;
      case "week":
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "month":
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(0); // Toutes les données
    }

    // Statistiques des visiteurs
    const [
      totalVisitors,
      uniqueVisitors,
      totalPageViews,
      totalEvents,
      totalConversions,
      topPages,
      topReferrers,
      deviceStats,
      browserStats,
      recentPageViews,
      recentConversions,
    ] = await Promise.all([
      // Total des visiteurs (sessions)
      prisma.visitor.count({
        where: { lastVisit: { gte: startDate } },
      }),

      // Visiteurs uniques
      prisma.visitor.count({
        where: { firstVisit: { gte: startDate } },
      }),

      // Total des pages vues
      prisma.pageView.count({
        where: { timestamp: { gte: startDate } },
      }),

      // Total des événements
      prisma.analyticsEvent.count({
        where: { timestamp: { gte: startDate } },
      }),

      // Total des conversions
      prisma.conversion.count({
        where: { timestamp: { gte: startDate } },
      }),

      // Pages les plus visitées
      prisma.pageView.groupBy({
        by: ["path"],
        where: { timestamp: { gte: startDate } },
        _count: { path: true },
        orderBy: { _count: { path: "desc" } },
        take: 10,
      }),

      // Sources de trafic
      prisma.visitor.groupBy({
        by: ["referrer"],
        where: {
          lastVisit: { gte: startDate },
          referrer: { not: null },
        },
        _count: { referrer: true },
        orderBy: { _count: { referrer: "desc" } },
        take: 10,
      }),

      // Répartition par appareil
      prisma.visitor.groupBy({
        by: ["device"],
        where: { lastVisit: { gte: startDate } },
        _count: { device: true },
      }),

      // Répartition par navigateur
      prisma.visitor.groupBy({
        by: ["browser"],
        where: { lastVisit: { gte: startDate } },
        _count: { browser: true },
      }),

      // Pages vues récentes
      prisma.pageView.findMany({
        where: { timestamp: { gte: startDate } },
        orderBy: { timestamp: "desc" },
        take: 20,
        include: {
          visitor: {
            select: {
              device: true,
              browser: true,
              country: true,
            },
          },
        },
      }),

      // Conversions récentes
      prisma.conversion.findMany({
        where: { timestamp: { gte: startDate } },
        orderBy: { timestamp: "desc" },
        take: 10,
      }),
    ]);

    // Formater les résultats
    const stats = {
      period,
      startDate: startDate.toISOString(),
      endDate: now.toISOString(),
      summary: {
        totalVisitors,
        uniqueVisitors,
        totalPageViews,
        totalEvents,
        totalConversions,
        avgPagesPerVisitor: totalVisitors > 0 ? (totalPageViews / totalVisitors).toFixed(2) : 0,
      },
      topPages: topPages.map((p) => ({
        path: p.path,
        views: p._count.path,
      })),
      topReferrers: topReferrers.map((r) => ({
        source: r.referrer || "Direct",
        visits: r._count.referrer,
      })),
      devices: deviceStats.reduce(
        (acc, d) => {
          acc[d.device || "unknown"] = d._count.device;
          return acc;
        },
        {} as Record<string, number>
      ),
      browsers: browserStats.reduce(
        (acc, b) => {
          acc[b.browser || "unknown"] = b._count.browser;
          return acc;
        },
        {} as Record<string, number>
      ),
      recentActivity: {
        pageViews: recentPageViews.map((pv) => ({
          path: pv.path,
          title: pv.title,
          device: pv.visitor.device,
          time: pv.timestamp,
        })),
        conversions: recentConversions.map((c) => ({
          type: c.type,
          value: c.value,
          source: c.source,
          time: c.timestamp,
        })),
      },
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Analytics stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
