import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Eye,
  MousePointerClick,
  Target,
  Smartphone,
  Monitor,
  Tablet,
  Globe,
  TrendingUp,
  Clock
} from "lucide-react"

async function getAnalyticsData() {
  const now = new Date()
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const monthStart = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

  const [
    // Stats aujourd'hui
    todayVisitors,
    todayPageViews,
    todayConversions,
    // Stats semaine
    weekVisitors,
    weekPageViews,
    weekConversions,
    // Stats mois
    monthVisitors,
    monthPageViews,
    monthConversions,
    // Top pages
    topPages,
    // Appareils
    deviceStats,
    // Dernières activités
    recentPageViews,
    recentConversions,
    // Sources
    topReferrers,
  ] = await Promise.all([
    // Aujourd'hui
    prisma.visitor.count({ where: { lastVisit: { gte: todayStart } } }),
    prisma.pageView.count({ where: { timestamp: { gte: todayStart } } }),
    prisma.conversion.count({ where: { timestamp: { gte: todayStart } } }),
    // Semaine
    prisma.visitor.count({ where: { lastVisit: { gte: weekStart } } }),
    prisma.pageView.count({ where: { timestamp: { gte: weekStart } } }),
    prisma.conversion.count({ where: { timestamp: { gte: weekStart } } }),
    // Mois
    prisma.visitor.count({ where: { lastVisit: { gte: monthStart } } }),
    prisma.pageView.count({ where: { timestamp: { gte: monthStart } } }),
    prisma.conversion.count({ where: { timestamp: { gte: monthStart } } }),
    // Top pages (semaine)
    prisma.pageView.groupBy({
      by: ["path"],
      where: { timestamp: { gte: weekStart } },
      _count: { path: true },
      orderBy: { _count: { path: "desc" } },
      take: 10,
    }),
    // Appareils (semaine)
    prisma.visitor.groupBy({
      by: ["device"],
      where: { lastVisit: { gte: weekStart } },
      _count: { device: true },
    }),
    // Activités récentes
    prisma.pageView.findMany({
      orderBy: { timestamp: "desc" },
      take: 15,
      include: {
        visitor: { select: { device: true, browser: true } },
      },
    }),
    prisma.conversion.findMany({
      orderBy: { timestamp: "desc" },
      take: 10,
    }),
    // Sources
    prisma.visitor.groupBy({
      by: ["referrer"],
      where: {
        lastVisit: { gte: weekStart },
        referrer: { not: null },
      },
      _count: { referrer: true },
      orderBy: { _count: { referrer: "desc" } },
      take: 10,
    }),
  ])

  return {
    today: { visitors: todayVisitors, pageViews: todayPageViews, conversions: todayConversions },
    week: { visitors: weekVisitors, pageViews: weekPageViews, conversions: weekConversions },
    month: { visitors: monthVisitors, pageViews: monthPageViews, conversions: monthConversions },
    topPages,
    deviceStats,
    recentPageViews,
    recentConversions,
    topReferrers,
  }
}

function getDeviceIcon(device: string | null) {
  switch (device) {
    case "mobile":
      return <Smartphone className="h-4 w-4" />
    case "tablet":
      return <Tablet className="h-4 w-4" />
    default:
      return <Monitor className="h-4 w-4" />
  }
}

function formatTimeAgo(date: Date) {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (minutes < 1) return "À l'instant"
  if (minutes < 60) return `Il y a ${minutes}min`
  if (hours < 24) return `Il y a ${hours}h`
  return `Il y a ${days}j`
}

export default async function AnalyticsPage() {
  const data = await getAnalyticsData()

  const totalDevices = data.deviceStats.reduce((sum, d) => sum + d._count.device, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">
          Statistiques de ton site en temps réel pour l&apos;agent IA WhatsApp
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Aujourd'hui */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aujourd&apos;hui</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Users className="h-4 w-4" /> Visiteurs
                </span>
                <span className="text-2xl font-bold">{data.today.visitors}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Eye className="h-4 w-4" /> Pages vues
                </span>
                <span className="text-xl font-semibold">{data.today.pageViews}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Target className="h-4 w-4" /> Conversions
                </span>
                <span className="text-xl font-semibold text-green-600">{data.today.conversions}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cette semaine */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cette semaine</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Users className="h-4 w-4" /> Visiteurs
                </span>
                <span className="text-2xl font-bold">{data.week.visitors}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Eye className="h-4 w-4" /> Pages vues
                </span>
                <span className="text-xl font-semibold">{data.week.pageViews}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Target className="h-4 w-4" /> Conversions
                </span>
                <span className="text-xl font-semibold text-green-600">{data.week.conversions}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ce mois */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ce mois</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Users className="h-4 w-4" /> Visiteurs
                </span>
                <span className="text-2xl font-bold">{data.month.visitors}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Eye className="h-4 w-4" /> Pages vues
                </span>
                <span className="text-xl font-semibold">{data.month.pageViews}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Target className="h-4 w-4" /> Conversions
                </span>
                <span className="text-xl font-semibold text-green-600">{data.month.conversions}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" /> Top Pages (7 jours)
            </CardTitle>
            <CardDescription>Les pages les plus visitées cette semaine</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.topPages.length > 0 ? (
                data.topPages.map((page, index) => (
                  <div key={page.path} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-muted-foreground w-6">
                        {index + 1}.
                      </span>
                      <span className="text-sm font-medium truncate max-w-[200px]">
                        {page.path}
                      </span>
                    </div>
                    <Badge variant="secondary">{page._count.path} vues</Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Aucune donnée disponible
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Appareils */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" /> Appareils (7 jours)
            </CardTitle>
            <CardDescription>Répartition des visiteurs par appareil</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.deviceStats.length > 0 ? (
                data.deviceStats.map((stat) => {
                  const percent = totalDevices > 0
                    ? Math.round((stat._count.device / totalDevices) * 100)
                    : 0
                  return (
                    <div key={stat.device || "unknown"} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getDeviceIcon(stat.device)}
                          <span className="text-sm font-medium capitalize">
                            {stat.device || "Inconnu"}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {stat._count.device} ({percent}%)
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  )
                })
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Aucune donnée disponible
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Sources de trafic */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" /> Sources de trafic
            </CardTitle>
            <CardDescription>D&apos;où viennent tes visiteurs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.topReferrers.length > 0 ? (
                data.topReferrers.map((ref, index) => (
                  <div key={ref.referrer || index} className="flex items-center justify-between">
                    <span className="text-sm truncate max-w-[250px]">
                      {ref.referrer || "Direct"}
                    </span>
                    <Badge variant="outline">{ref._count.referrer}</Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  La plupart des visiteurs viennent directement
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Activité récente */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MousePointerClick className="h-5 w-5" /> Activité récente
            </CardTitle>
            <CardDescription>Dernières pages vues en temps réel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {data.recentPageViews.length > 0 ? (
                data.recentPageViews.map((pv) => (
                  <div key={pv.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      {getDeviceIcon(pv.visitor.device)}
                      <span className="truncate max-w-[180px]">{pv.path}</span>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatTimeAgo(pv.timestamp)}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Aucune activité récente
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conversions récentes */}
      {data.recentConversions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-600" /> Conversions récentes
            </CardTitle>
            <CardDescription>Les dernières conversions sur ton site</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.recentConversions.map((conv) => (
                <div key={conv.id} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Target className="h-5 w-5 text-green-600" />
                    <div>
                      <span className="font-medium">{conv.type}</span>
                      {conv.value && (
                        <span className="text-sm text-muted-foreground ml-2">
                          ({conv.value}€)
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formatTimeAgo(conv.timestamp)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Info WhatsApp */}
      <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
            📱 Agent IA WhatsApp
          </CardTitle>
          <CardDescription>
            Ces données sont accessibles via ton agent IA WhatsApp connecté à n8n
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p><strong>Webhook URL:</strong> <code className="bg-muted px-2 py-1 rounded">/api/n8n/whatsapp</code></p>
            <p><strong>Stats API:</strong> <code className="bg-muted px-2 py-1 rounded">/api/analytics/stats?period=today</code></p>
            <p className="text-muted-foreground mt-4">
              Pose des questions comme &quot;Stats aujourd&apos;hui&quot; ou &quot;Top pages&quot; sur WhatsApp !
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
