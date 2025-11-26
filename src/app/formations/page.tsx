import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { BookOpen, Clock, ArrowRight, CheckCircle2, PlayCircle, Download, Users, Star } from "lucide-react"

export const metadata = {
  title: "Formations - Tidiane Diallo",
  description: "Formations en développement web, automatisation IA et plus encore.",
}

async function getCourses() {
  try {
    const courses = await prisma.course.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      include: {
        modules: true,
        videos: { where: { published: true } },
        files: true,
      },
    })
    return courses
  } catch (error) {
    return []
  }
}

// Formations statiques si la base de données n'est pas disponible
const staticCourses = [
  {
    id: "1",
    title: "Formation Next.js Complète",
    slug: "formation-nextjs-complete",
    description: "Maîtrisez Next.js 15 avec App Router, Server Components, et toutes les fonctionnalités modernes.",
    category: "WEB",
    level: "Intermédiaire",
    duration: "20 heures",
    price: "299€",
    modules: [{ id: "1", title: "Introduction" }],
    videos: [],
    files: []
  },
  {
    id: "2",
    title: "Formation React & TypeScript",
    slug: "formation-react-typescript",
    description: "Apprenez React avec TypeScript pour créer des applications robustes et maintenables.",
    category: "WEB",
    level: "Débutant",
    duration: "15 heures",
    price: "249€",
    modules: [{ id: "1", title: "Bases de React" }],
    videos: [],
    files: []
  },
  {
    id: "3",
    title: "Cours .NET / C#",
    slug: "cours-dotnet-csharp",
    description: "Développement backend avec .NET et C#. Créez des APIs robustes et des applications enterprise.",
    category: "WEB",
    level: "Intermédiaire",
    duration: "25 heures",
    price: "349€",
    modules: [{ id: "1", title: "Introduction à .NET" }],
    videos: [],
    files: []
  },
  {
    id: "4",
    title: "Cours Java",
    slug: "cours-java",
    description: "Maîtrisez Java pour le développement d'applications enterprise et backend.",
    category: "WEB",
    level: "Intermédiaire",
    duration: "30 heures",
    price: "399€",
    modules: [{ id: "1", title: "Fondamentaux Java" }],
    videos: [],
    files: []
  },
  {
    id: "5",
    title: "Cours Python",
    slug: "cours-python",
    description: "Python pour le développement web, data science et intelligence artificielle.",
    category: "IA",
    level: "Débutant",
    duration: "18 heures",
    price: "229€",
    modules: [{ id: "1", title: "Bases de Python" }],
    videos: [],
    files: []
  },
  {
    id: "6",
    title: "Intégration IA dans vos Applications",
    slug: "integration-ia",
    description: "Apprenez à intégrer l'intelligence artificielle dans vos applications existantes.",
    category: "IA",
    level: "Avancé",
    duration: "22 heures",
    price: "379€",
    modules: [{ id: "1", title: "Introduction à l'IA" }],
    videos: [],
    files: []
  },
  {
    id: "7",
    title: "Automatisation avec IA",
    slug: "automatisation-ia",
    description: "Automatisez vos processus métier avec N8N, workflows intelligents et IA.",
    category: "IA",
    level: "Intermédiaire",
    duration: "16 heures",
    price: "279€",
    modules: [{ id: "1", title: "Introduction N8N" }],
    videos: [],
    files: []
  }
]

export default async function FormationsPage() {
  let courses = await getCourses()
  
  // Utiliser les formations statiques si la base de données est vide
  if (courses.length === 0) {
    courses = staticCourses as any
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Header Section */}
        <section className="relative overflow-hidden border-b bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
          <div className="container relative z-10">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-5xl md:text-6xl font-bold text-white">
                Formation<span className="text-[#2563EB]">s</span>
              </h1>
              <nav className="hidden md:flex gap-6 text-sm text-white/80">
                <Link href="/process" className="hover:text-white transition-colors">Procédé</Link>
                <Link href="/services" className="hover:text-white transition-colors">Services</Link>
                <Link href="/formations" className="text-white font-medium">Formations</Link>
                <Link href="/contact" className="hover:text-white transition-colors flex items-center gap-1">
                  Contact <ArrowRight className="h-3 w-3" />
                </Link>
              </nav>
            </div>
            <p className="text-xl text-white/70 max-w-2xl">
              Formations complètes pour maîtriser le développement web et l&apos;intelligence artificielle
            </p>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="py-20 bg-gradient-to-b from-background via-blue-50/20 to-background dark:from-background dark:via-blue-950/5 dark:to-background relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.06),transparent_50%)]" />
          <div className="container relative z-10">
            {courses.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-white/70">
                  Aucune formation disponible pour le moment.
                </p>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {courses.map((course: any) => (
                  <Card 
                    key={course.id} 
                    className="group bg-[#1E293B] border-[#334155] text-white hover:border-[#2563EB]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#2563EB]/20 hover:-translate-y-2 flex flex-col"
                  >
                    <CardHeader>
                      <div className="mb-3 inline-block w-fit rounded-full bg-[#2563EB]/10 px-3 py-1 text-xs font-medium text-[#2563EB] border border-[#2563EB]/30">
                        {course.category || "WEB"}
                      </div>
                      <CardTitle className="text-xl text-white mb-2">{course.title}</CardTitle>
                      <CardDescription className="text-white/70 text-sm">
                        {course.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-between">
                      <div className="mb-6 space-y-3">
                        <div className="flex items-center gap-2 text-sm text-white/80">
                          <BookOpen className="h-4 w-4 text-[#2563EB]" />
                          <span>{course.modules?.length || 1} modules</span>
                        </div>
                        {course.duration && (
                          <div className="flex items-center gap-2 text-sm text-white/80">
                            <Clock className="h-4 w-4 text-[#2563EB]" />
                            <span>{course.duration}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-sm text-white/80">
                          <Users className="h-4 w-4 text-[#2563EB]" />
                          <span>Niveau: {course.level || "Intermédiaire"}</span>
                        </div>
                        {course.videos && course.videos.length > 0 && (
                          <div className="flex items-center gap-2 text-sm text-white/80">
                            <PlayCircle className="h-4 w-4 text-[#2563EB]" />
                            <span>{course.videos.length} vidéos</span>
                          </div>
                        )}
                        {course.files && course.files.length > 0 && (
                          <div className="flex items-center gap-2 text-sm text-white/80">
                            <Download className="h-4 w-4 text-[#2563EB]" />
                            <span>{course.files.length} fichiers</span>
                          </div>
                        )}
                      </div>
                      {course.price && (
                        <div className="mb-4">
                          <p className="text-2xl font-bold text-[#2563EB]">{course.price}</p>
                        </div>
                      )}
                      <Link href={`/formations/${course.slug}`}>
                        <Button className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#2563EB]/50">
                          Voir la formation
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-muted/50 via-blue-50/30 to-muted/50 dark:from-muted/50 dark:via-blue-950/5 dark:to-muted/50 border-t relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(37,99,235,0.05),transparent_50%)]" />
          <div className="container relative z-10">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-[#2563EB]">7+</div>
                <div className="text-sm text-white/70">Formations disponibles</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-[#2563EB]">150+</div>
                <div className="text-sm text-white/70">Étudiants formés</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-[#2563EB]">4.9</div>
                <div className="flex items-center justify-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#2563EB] text-[#2563EB]" />
                  ))}
                </div>
                <div className="text-sm text-white/70">Note moyenne</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-[#2563EB]">100%</div>
                <div className="text-sm text-white/70">Satisfaction</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-muted/40 via-blue-50/30 to-muted/40 dark:from-muted/40 dark:via-blue-950/10 dark:to-muted/40 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(37,99,235,0.08),transparent_50%)]" />
          <div className="container relative z-10 text-center">
            <h2 className="mb-4 text-3xl md:text-4xl font-bold text-white">
              Prêt à développer vos compétences ?
            </h2>
            <p className="mb-8 text-lg text-white/70 max-w-2xl mx-auto">
              Rejoignez nos formations et maîtrisez les technologies les plus demandées du marché
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 transition-all duration-300 hover:shadow-xl hover:shadow-[#2563EB]/50">
                Contacter pour plus d&apos;infos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
