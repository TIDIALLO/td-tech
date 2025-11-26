"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ExternalLink, Github, Code, Globe, Brain, Zap, ArrowRight, Filter } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"

// Projets statiques si la DB n'est pas disponible
const staticProjects = [
  {
    id: "1",
    title: "Plateforme E-commerce Next.js",
    slug: "plateforme-ecommerce-nextjs",
    description: "Site e-commerce moderne avec Next.js 15, paiement sécurisé et gestion de stock en temps réel.",
    category: "WEB",
    technologies: ["Next.js", "TypeScript", "Stripe", "Prisma", "TailwindCSS"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    imageUrl: "/placeholder-project.jpg"
  },
  {
    id: "2",
    title: "Application IA de Génération de Contenu",
    slug: "app-ia-generation-contenu",
    description: "Application web avec intégration OpenAI pour générer du contenu automatiquement.",
    category: "IA",
    technologies: ["Next.js", "OpenAI", "TypeScript", "Prisma"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    imageUrl: "/placeholder-project.jpg"
  },
  {
    id: "3",
    title: "Automatisation Workflow N8N",
    slug: "automatisation-workflow-n8n",
    description: "Système d'automatisation complet pour optimiser les processus métier avec N8N.",
    category: "AUTOMATISATION",
    technologies: ["N8N", "Node.js", "APIs", "Webhooks"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    imageUrl: "/placeholder-project.jpg"
  },
  {
    id: "4",
    title: "Dashboard Analytics en Temps Réel",
    slug: "dashboard-analytics-temps-reel",
    description: "Tableau de bord interactif avec visualisations de données en temps réel.",
    category: "WEB",
    technologies: ["React", "D3.js", "WebSocket", "Node.js"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    imageUrl: "/placeholder-project.jpg"
  },
  {
    id: "5",
    title: "Chatbot IA Multilingue",
    slug: "chatbot-ia-multilingue",
    description: "Assistant virtuel intelligent avec support multilingue et intégration CRM.",
    category: "IA",
    technologies: ["OpenAI", "Next.js", "Prisma", "WebSocket"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    imageUrl: "/placeholder-project.jpg"
  },
  {
    id: "6",
    title: "API RESTful Microservices",
    slug: "api-restful-microservices",
    description: "Architecture microservices scalable avec API REST et gestion d'authentification.",
    category: "WEB",
    technologies: ["Node.js", "Express", "MongoDB", "Docker", "JWT"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    imageUrl: "/placeholder-project.jpg"
  }
]

const categories = [
  { id: "all", label: "Tous", icon: Filter },
  { id: "WEB", label: "Web", icon: Globe },
  { id: "IA", label: "IA", icon: Brain },
  { id: "AUTOMATISATION", label: "Automatisation", icon: Zap },
]

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [projects, setProjects] = useState(staticProjects)

  useEffect(() => {
    // Essayer de charger depuis l'API si disponible
    async function loadProjects() {
      try {
        const response = await fetch("/api/projects")
        if (response.ok) {
          const data = await response.json()
          if (data.length > 0) {
            setProjects(data)
          }
        }
      } catch (error) {
        // Utiliser les projets statiques en cas d'erreur
        console.log("Using static projects")
      }
    }
    loadProjects()
  }, [])

  const filteredProjects = selectedCategory === "all" 
    ? projects 
    : projects.filter(p => p.category === selectedCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

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

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Header Section */}
        <section className="relative overflow-hidden border-b bg-gradient-to-b from-background via-muted/30 to-background py-12 md:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.08),transparent_50%)]" />
          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Portfoli<span className="text-[#2563EB]">o</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl leading-relaxed">
                Découvrez une sélection de mes projets récents. 
                De la création de sites web modernes à l&apos;intégration d&apos;intelligence artificielle, 
                chaque projet reflète mon expertise et mon engagement pour l&apos;excellence.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-6 bg-muted/30 border-b">
          <div className="container">
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`transition-all duration-300 ${
                      selectedCategory === category.id
                        ? "bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
                        : "hover:border-[#2563EB]/50"
                    }`}
                  >
                    <Icon className="h-3 w-3 mr-2" />
                    {category.label}
                  </Button>
                )
              })}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-background via-blue-50/20 to-background dark:from-background dark:via-blue-950/5 dark:to-background relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.06),transparent_50%)]" />
          <div className="container relative z-10">
            {filteredProjects.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-muted-foreground">
                  Aucun projet disponible dans cette catégorie.
                </p>
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {filteredProjects.map((project) => {
                  const CategoryIcon = getCategoryIcon(project.category)
                  return (
                    <motion.div key={project.id} variants={itemVariants}>
                      <Card className="group h-full bg-card border hover:border-[#2563EB]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#2563EB]/10 hover:-translate-y-1 overflow-hidden">
                        {/* Project Image */}
                        <div className="relative h-48 bg-gradient-to-br from-[#2563EB]/10 to-[#3B82F6]/5 overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <CategoryIcon className="h-16 w-16 text-[#2563EB]/20" />
                          </div>
                          {project.imageUrl && (
                            <Image
                              src={project.imageUrl}
                              alt={project.title}
                              fill
                              className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            />
                          )}
                        </div>

                        <CardHeader className="pb-3">
                          <div className="mb-3 inline-block rounded-full bg-[#2563EB]/10 px-3 py-1 text-xs font-medium text-[#2563EB] border border-[#2563EB]/20">
                            {project.category}
                          </div>
                          <CardTitle className="text-lg mb-2 line-clamp-1">{project.title}</CardTitle>
                          <CardDescription className="text-sm leading-relaxed line-clamp-2">
                            {project.description}
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="pt-0">
                          {/* Technologies */}
                          <div className="mb-4 flex flex-wrap gap-1.5">
                            {project.technologies.slice(0, 3).map((tech) => (
                              <span
                                key={tech}
                                className="rounded-md bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 3 && (
                              <span className="rounded-md bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground">
                                +{project.technologies.length - 3}
                              </span>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2">
                            <Link href={`/portfolio/${project.slug}`} className="flex-1">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="w-full text-xs hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
                              >
                                Voir le projet
                                <ArrowRight className="ml-2 h-3 w-3" />
                              </Button>
                            </Link>
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="h-9 w-9 hover:bg-[#2563EB]/10 hover:text-[#2563EB]"
                                >
                                  <Github className="h-4 w-4" />
                                </Button>
                              </a>
                            )}
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="h-9 w-9 hover:bg-[#2563EB]/10 hover:text-[#2563EB]"
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                              </a>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-muted/40 via-blue-50/30 to-muted/40 dark:from-muted/40 dark:via-blue-950/10 dark:to-muted/40 border-t relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(37,99,235,0.08),transparent_50%)]" />
          <div className="container relative z-10 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-3 text-2xl md:text-3xl font-bold"
            >
              Vous avez un projet en tête ?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto"
            >
              Discutons de votre projet et transformons vos idées en réalité digitale
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link href="/contact">
                <Button size="lg" className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 text-sm transition-all duration-300 hover:shadow-xl hover:shadow-[#2563EB]/50 hover:scale-105">
                  Discutons de votre projet
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
