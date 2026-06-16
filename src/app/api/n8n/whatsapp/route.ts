import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Vérifie l'API key
function verifyApiKey(req: NextRequest): boolean {
  const apiKey = req.headers.get("x-api-key") || req.headers.get("authorization")?.replace("Bearer ", "");
  const expectedApiKey = process.env.N8N_API_KEY;
  if (!expectedApiKey) return true;
  return apiKey === expectedApiKey;
}

// Analyse le message pour comprendre l'intention
function analyzeIntent(message: string): { intent: string; params: Record<string, string> } {
  const lowerMessage = message.toLowerCase();

  // Patterns de reconnaissance d'intention
  const intents = [
    { keywords: ["visiteur", "visites", "combien", "trafic", "audience"], intent: "stats" },
    { keywords: ["aujourd'hui", "today", "ce jour"], intent: "today" },
    { keywords: ["hier", "yesterday"], intent: "yesterday" },
    { keywords: ["semaine", "week", "7 jours"], intent: "week" },
    { keywords: ["mois", "month", "30 jours"], intent: "month" },
    { keywords: ["page", "populaire", "top", "meilleur"], intent: "top_pages" },
    { keywords: ["conversion", "formulaire", "contact", "lead"], intent: "conversions" },
    { keywords: ["appareil", "mobile", "desktop", "device"], intent: "devices" },
    { keywords: ["source", "referer", "vient", "provenance"], intent: "referrers" },
    { keywords: ["résumé", "rapport", "bilan", "summary"], intent: "summary" },
    { keywords: ["aide", "help", "commande", "quoi faire"], intent: "help" },
  ];

  let detectedIntent = "stats";
  let period = "today";

  for (const pattern of intents) {
    if (pattern.keywords.some((k) => lowerMessage.includes(k))) {
      if (["today", "yesterday", "week", "month"].includes(pattern.intent)) {
        period = pattern.intent;
      } else {
        detectedIntent = pattern.intent;
      }
    }
  }

  return { intent: detectedIntent, params: { period } };
}

// Génère une réponse naturelle basée sur les données
async function generateResponse(intent: string, period: string): Promise<string> {
  const now = new Date();
  let startDate: Date;
  let periodLabel: string;

  switch (period) {
    case "yesterday":
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      startDate = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());
      periodLabel = "hier";
      break;
    case "week":
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      periodLabel = "cette semaine";
      break;
    case "month":
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      periodLabel = "ce mois";
      break;
    default:
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      periodLabel = "aujourd'hui";
  }

  // Récupérer les données selon l'intention
  switch (intent) {
    case "stats":
    case "summary":
      const [visitors, pageViews, conversions, uniqueVisitors] = await Promise.all([
        prisma.visitor.count({ where: { lastVisit: { gte: startDate } } }),
        prisma.pageView.count({ where: { timestamp: { gte: startDate } } }),
        prisma.conversion.count({ where: { timestamp: { gte: startDate } } }),
        prisma.visitor.count({ where: { firstVisit: { gte: startDate } } }),
      ]);

      return `📊 *Rapport ${periodLabel}*

👥 *Visiteurs:* ${visitors} sessions
🆕 *Nouveaux visiteurs:* ${uniqueVisitors}
📄 *Pages vues:* ${pageViews}
🎯 *Conversions:* ${conversions}

${pageViews > 0 ? `📈 Moyenne: ${(pageViews / Math.max(visitors, 1)).toFixed(1)} pages/visiteur` : ""}`;

    case "top_pages":
      const topPages = await prisma.pageView.groupBy({
        by: ["path"],
        where: { timestamp: { gte: startDate } },
        _count: { path: true },
        orderBy: { _count: { path: "desc" } },
        take: 5,
      });

      if (topPages.length === 0) {
        return `📄 Aucune page vue enregistrée ${periodLabel}.`;
      }

      const pagesText = topPages
        .map((p, i) => `${i + 1}. ${p.path} → ${p._count.path} vues`)
        .join("\n");

      return `📄 *Top pages ${periodLabel}:*

${pagesText}`;

    case "conversions":
      const conversionsList = await prisma.conversion.findMany({
        where: { timestamp: { gte: startDate } },
        orderBy: { timestamp: "desc" },
        take: 5,
      });

      const totalConversions = await prisma.conversion.count({
        where: { timestamp: { gte: startDate } },
      });

      if (totalConversions === 0) {
        return `🎯 Aucune conversion ${periodLabel}.`;
      }

      const conversionsText = conversionsList
        .map((c) => `• ${c.type}${c.value ? ` (${c.value}€)` : ""}`)
        .join("\n");

      return `🎯 *Conversions ${periodLabel}:* ${totalConversions}

${conversionsText}`;

    case "devices":
      const deviceStats = await prisma.visitor.groupBy({
        by: ["device"],
        where: { lastVisit: { gte: startDate } },
        _count: { device: true },
      });

      const total = deviceStats.reduce((sum, d) => sum + d._count.device, 0);

      const devicesText = deviceStats
        .map((d) => {
          const percent = total > 0 ? ((d._count.device / total) * 100).toFixed(0) : 0;
          const emoji = d.device === "mobile" ? "📱" : d.device === "tablet" ? "📲" : "💻";
          return `${emoji} ${d.device || "inconnu"}: ${d._count.device} (${percent}%)`;
        })
        .join("\n");

      return `📱 *Appareils ${periodLabel}:*

${devicesText || "Aucune donnée"}`;

    case "referrers":
      const referrers = await prisma.visitor.groupBy({
        by: ["referrer"],
        where: {
          lastVisit: { gte: startDate },
          referrer: { not: null },
        },
        _count: { referrer: true },
        orderBy: { _count: { referrer: "desc" } },
        take: 5,
      });

      if (referrers.length === 0) {
        return `🔗 Aucune source de trafic identifiée ${periodLabel} (visiteurs directs).`;
      }

      const referrersText = referrers
        .map((r, i) => `${i + 1}. ${r.referrer} → ${r._count.referrer} visites`)
        .join("\n");

      return `🔗 *Sources de trafic ${periodLabel}:*

${referrersText}`;

    case "help":
      return `🤖 *Agent IA TDTech - Commandes disponibles*

📊 "Stats aujourd'hui" - Résumé du jour
📊 "Stats semaine" - Résumé de la semaine
📄 "Top pages" - Pages les plus visitées
🎯 "Conversions" - Dernières conversions
📱 "Appareils" - Répartition mobile/desktop
🔗 "Sources" - D'où viennent les visiteurs

💡 Tu peux aussi poser des questions naturelles comme:
• "Combien de visiteurs aujourd'hui ?"
• "Quelles sont les pages les plus populaires ?"
• "Y a-t-il eu des conversions cette semaine ?"`;

    default:
      return `Je n'ai pas compris ta question. Tape "aide" pour voir les commandes disponibles.`;
  }
}

export async function POST(req: NextRequest) {
  try {
    // Vérifier l'authentification
    if (!verifyApiKey(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // Extraire le message (différents formats possibles de n8n/WhatsApp)
    const message =
      body.message ||
      body.text ||
      body.Body || // Twilio format
      body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.text?.body || // Meta WhatsApp API
      "";

    const phoneNumber =
      body.from ||
      body.From || // Twilio format
      body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.from || // Meta WhatsApp API
      "unknown";

    if (!message) {
      return NextResponse.json({
        reply: "Je n'ai pas reçu de message. Que veux-tu savoir sur ton site ?",
      });
    }

    // Analyser l'intention
    const { intent, params } = analyzeIntent(message);

    // Générer la réponse
    const aiResponse = await generateResponse(intent, params.period);

    // Logger l'interaction
    await prisma.n8nWebhookLog.create({
      data: {
        webhookType: "whatsapp_message",
        payload: body,
        status: "processed",
        phoneNumber,
        message,
        aiResponse,
      },
    });

    // Retourner la réponse dans un format compatible n8n
    return NextResponse.json({
      reply: aiResponse,
      to: phoneNumber,
      intent,
      period: params.period,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("WhatsApp webhook error:", error);
    return NextResponse.json(
      {
        reply: "Désolé, une erreur s'est produite. Réessaie dans quelques instants.",
        error: String(error),
      },
      { status: 500 }
    );
  }
}

// GET pour tester l'endpoint
export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "WhatsApp AI Agent endpoint is ready",
    usage: "POST a message to get analytics insights",
    example: {
      message: "Combien de visiteurs aujourd'hui ?",
    },
    timestamp: new Date().toISOString(),
  });
}
