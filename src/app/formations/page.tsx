import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { prisma } from "@/lib/prisma"
import FormationsClient from "./_components/formations-client"
import { CourseType } from "./types"

const staticCourses: CourseType[] = [
  {
    id: "1",
    title: "Formation Next.js Complète",
    slug: "formation-nextjs-complete",
    description:
      "Maîtrisez Next.js 15 avec App Router, Server Components, et toutes les fonctionnalités modernes.",
    category: "WEB",
    level: "Intermédiaire",
    duration: "20 heures",
    modules: [{ id: "1", title: "Introduction" }],
    videos: [],
    files: [],
  },
  {
    id: "2",
    title: "Formation React & TypeScript",
    slug: "formation-react-typescript",
    description: "Apprenez React avec TypeScript pour créer des applications robustes et maintenables.",
    category: "WEB",
    level: "Débutant",
    duration: "15 heures",
    modules: [{ id: "1", title: "Bases de React" }],
    videos: [],
    files: [],
  },
  {
    id: "3",
    title: "Cours .NET / C#",
    slug: "cours-dotnet-csharp",
    description: "Développement backend avec .NET et C#. Créez des APIs robustes et des applications enterprise.",
    category: "WEB",
    level: "Intermédiaire",
    duration: "25 heures",
    modules: [{ id: "1", title: "Introduction à .NET" }],
    videos: [],
    files: [],
  },
  {
    id: "4",
    title: "Cours Java",
    slug: "cours-java",
    description: "Maîtrisez Java pour le développement d'applications enterprise et backend.",
    category: "WEB",
    level: "Intermédiaire",
    duration: "30 heures",
    modules: [{ id: "1", title: "Fondamentaux Java" }],
    videos: [],
    files: [],
  },
  {
    id: "5",
    title: "Cours Python",
    slug: "cours-python",
    description: "Python pour le développement web, data science et intelligence artificielle.",
    category: "IA",
    level: "Débutant",
    duration: "18 heures",
    modules: [{ id: "1", title: "Bases de Python" }],
    videos: [],
    files: [],
  },
  {
    id: "6",
    title: "Intégration IA dans vos Applications",
    slug: "integration-ia",
    description: "Apprenez à intégrer l'intelligence artificielle dans vos applications existantes.",
    category: "IA",
    level: "Avancé",
    duration: "22 heures",
    modules: [{ id: "1", title: "Introduction à l'IA" }],
    videos: [],
    files: [],
  },
  {
    id: "7",
    title: "Automatisation avec IA",
    slug: "automatisation-ia",
    description: "Automatisez vos processus métier avec N8N, workflows intelligents et IA.",
    category: "IA",
    level: "Intermédiaire",
    duration: "16 heures",
    modules: [{ id: "1", title: "Introduction N8N" }],
    videos: [],
    files: [],
  },
]

async function getCourses() {
  const dbUrl = process.env.DATABASE_URL
  if (!dbUrl) return []

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
    return courses.map((course) => ({
      ...course,
      duration: course.duration ?? undefined,
    })) as CourseType[]
  } catch (_err) {
    return []
  }
}

export default async function FormationsPage() {
  let courses = await getCourses()
  if (courses.length === 0) {
    courses = staticCourses as typeof courses
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <FormationsClient courses={courses} />
      </main>
      <Footer />
    </>
  )
}

