import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"
import { FolderKanban, Briefcase, GraduationCap, FileText, MessageSquare, Users } from "lucide-react"

async function getStats() {
  const [
    projectsCount,
    servicesCount,
    coursesCount,
    blogPostsCount,
    messagesCount,
    usersCount,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.service.count(),
    prisma.course.count(),
    prisma.blogPost.count(),
    prisma.contactMessage.count({ where: { read: false } }),
    prisma.user.count(),
  ])

  return {
    projectsCount,
    servicesCount,
    coursesCount,
    blogPostsCount,
    messagesCount,
    usersCount,
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const cards = [
    {
      title: "Projets",
      value: stats.projectsCount,
      icon: FolderKanban,
      href: "/admin/projects",
    },
    {
      title: "Services",
      value: stats.servicesCount,
      icon: Briefcase,
      href: "/admin/services",
    },
    {
      title: "Formations",
      value: stats.coursesCount,
      icon: GraduationCap,
      href: "/admin/courses",
    },
    {
      title: "Articles",
      value: stats.blogPostsCount,
      icon: FileText,
      href: "/admin/blog",
    },
    {
      title: "Messages non lus",
      value: stats.messagesCount,
      icon: MessageSquare,
      href: "/admin/messages",
    },
    {
      title: "Utilisateurs",
      value: stats.usersCount,
      icon: Users,
      href: "/admin/users",
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Vue d&apos;ensemble de votre site
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

