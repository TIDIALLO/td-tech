import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Github, Calendar, Code, Globe, Brain, Zap } from "lucide-react"
import Image from "next/image"

// Projets statiques si la DB n'est pas disponible
const staticProjects: Record<string, any> = {
  "plateforme-ecommerce-nextjs": {
    id: "1",
    title: "Plateforme E-commerce Next.js",
    slug: "plateforme-ecommerce-nextjs",
    description: "Site e-commerce moderne avec Next.js 15, paiement sécurisé et gestion de stock en temps réel.",
    category: "WEB",
    technologies: ["Next.js", "TypeScript", "Stripe", "Prisma", "TailwindCSS"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    content: `
      <h2>Contexte du Projet</h2>
      <p>Développement d'une plateforme e-commerce complète avec les dernières technologies web modernes.</p>
      
      <h2>Fonctionnalités Principales</h2>
      <ul>
        <li>Gestion de produits et catégories</li>
        <li>Paiement sécurisé avec Stripe</li>
        <li>Gestion de panier et commandes</li>
        <li>Dashboard administrateur</li>
        <li>Optimisation SEO</li>
      </ul>
      
      <h2>Technologies Utilisées</h2>
      <p>Next.js 15, TypeScript, Prisma, Stripe API, TailwindCSS, PostgreSQL</p>
    `,
    createdAt: new Date()
  },
  "app-ia-generation-contenu": {
    id: "2",
    title: "Application IA de Génération de Contenu",
    slug: "app-ia-generation-contenu",
    description: "Application web avec intégration OpenAI pour générer du contenu automatiquement.",
    category: "IA",
    technologies: ["Next.js", "OpenAI", "TypeScript", "Prisma"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    content: `
      <h2>Contexte du Projet</h2>
      <p>Création d'une application web permettant de générer du contenu automatiquement grâce à l'intelligence artificielle.</p>
      
      <h2>Fonctionnalités Principales</h2>
      <ul>
        <li>Génération de texte avec OpenAI GPT</li>
        <li>Interface utilisateur intuitive</li>
        <li>Historique des générations</li>
        <li>Export en différents formats</li>
      </ul>
      
      <h2>Technologies Utilisées</h2>
      <p>Next.js, OpenAI API, TypeScript, Prisma, TailwindCSS</p>
    `,
    createdAt: new Date()
  }
}

async function getProject(slug: string) {
  try {
    // Essayer de charger depuis la base de données
    const { prisma } = await import("@/lib/prisma")
    const project = await prisma.project.findUnique({
      where: { slug, published: true },
    })
    
    if (project) {
      return project
    }
  } catch (error) {
    // Si erreur, utiliser les projets statiques
    console.log("Using static project")
  }
  
  // Utiliser les projets statiques
  const project = staticProjects[slug]
  if (!project) {
    notFound()
  }
  
  return project
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProject(slug)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "WEB":
        return Globe
      case "IA":
        return Brain
      case "AUTOMATISATION":
        return Zap
      default:
        return Code
    }
  }

  const CategoryIcon = getCategoryIcon(project.category)

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Header Section */}
        <section className="relative overflow-hidden border-b bg-gradient-to-b from-background via-muted/30 to-background py-12 md:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.08),transparent_50%)]" />
          <div className="container relative z-10">
            <Link href="/portfolio">
              <Button variant="ghost" size="sm" className="mb-6 hover:text-[#2563EB]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour au portfolio
              </Button>
            </Link>
            
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#2563EB]/10 px-3 py-1 text-xs font-medium text-[#2563EB] border border-[#2563EB]/20">
              <CategoryIcon className="h-3 w-3" />
              {project.category}
            </div>
            
            <h1 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-bold">{project.title}</h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mb-6">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-3">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white">
                    <Github className="mr-2 h-4 w-4" />
                    Voir sur GitHub
                  </Button>
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="hover:border-[#2563EB] hover:text-[#2563EB]">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Voir le site
                  </Button>
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container max-w-4xl">
            {/* Technologies */}
            <div className="mb-8 p-6 bg-muted/50 rounded-lg border">
              <h2 className="mb-4 text-xl font-bold flex items-center gap-2">
                <Code className="h-5 w-5 text-[#2563EB]" />
                Technologies utilisées
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: string) => (
                  <span
                    key={tech}
                    className="rounded-md bg-background border px-3 py-1.5 text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Content */}
            <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-[#2563EB] prose-ul:text-muted-foreground">
              <div dangerouslySetInnerHTML={{ __html: project.content || "<p>Description détaillée du projet...</p>" }} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
