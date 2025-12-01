"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ExternalLink, Github, Code, Globe, Brain, Zap, ArrowRight, Filter, Building2, Calendar, Briefcase } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"

// Projets réels basés sur le CV
const staticProjects = [
  {
    id: "1",
    title: "School Management System",
    slug: "school-management-system",
    description: "Système de gestion scolaire Full Stack .NET avec Docker, CI/CD Azure, Blazor WebAssembly et SignalR pour les mises à jour en temps réel.",
    category: "WEB",
    technologies: [".NET 8", "Blazor WebAssembly", "SignalR", "PostgreSQL", "Docker", "RabbitMQ", "Hangfire", "Serilog", "Azure Pipelines", "JWT"],
    githubUrl: "https://github.com/TIDIALLO",
    liveUrl: null,
    image: "/placeholder-project.jpg",
    period: "Septembre 2023 – Décembre 2023",
    highlights: [
      "Conteneurisation Docker avec orchestration (RabbitMQ, PostgreSQL, Hangfire, Serilog)",
      "CI/CD automatisée avec Azure Pipeline (build, tests, déploiement multi-env)",
      "Interface Blazor WebAssembly avec SignalR pour temps réel",
      "Authentification JWT et gestion fine des rôles (admin, professeurs, étudiants)",
      "Logs structurés et métriques métier avec tableaux de bord"
    ]
  },
  {
    id: "2",
    title: "Plateforme de Supervision & Alerting",
    slug: "plateforme-supervision-alerting",
    description: "Architecture microservices .NET pour la supervision d'événements avec bus de messages RabbitMQ, politiques de résilience et observabilité avancée.",
    category: "WEB",
    technologies: [".NET 6/8", "Microservices", "RabbitMQ", "JWT", "Blazor", "Serilog", "Circuit Breaker", "Retry Policies"],
    githubUrl: "https://github.com/TIDIALLO",
    liveUrl: null,
    image: "/placeholder-project.jpg",
    period: "Projet avancé .NET (R&D)",
    highlights: [
      "Architecture microservices pour supervision d'événements (logs, métriques, alertes)",
      "Bus de messages RabbitMQ pour diffusion d'événements entre services",
      "Politiques de résilience (retries, circuit breaker, fallback)",
      "Logs structurés (Serilog) et corrélation de requêtes (traceId)",
      "API REST sécurisée JWT et portail d'administration Blazor"
    ]
  },
  {
    id: "3",
    title: "E-commerce Multivendeurs",
    slug: "ecommerce-multivendeurs",
    description: "Boutique en ligne multivendeurs avec architecture microservices Java/Spring Boot, interface React responsive et intégration APIs de paiement.",
    category: "WEB",
    technologies: ["Java", "Spring Boot", "React", "Microservices", "JWT", "PostgreSQL", "Docker"],
    githubUrl: "https://github.com/TIDIALLO",
    liveUrl: null,
    image: "/placeholder-project.jpg",
    period: "Mars 2018 – Août 2023",
    highlights: [
      "Architecture microservices pour séparer les domaines (commandes, paiements, inventaire)",
      "Interface React responsive avec gestion de panier et recherche avancée",
      "Intégration APIs de paiement et authentification JWT",
      "Dashboard administrateur pour ventes, stocks et statistiques",
      "Gestion complète des vendeurs, produits et commandes"
    ]
  },
  {
    id: "4",
    title: "Application de Chiffrement & Signature Numérique",
    slug: "chiffrement-signature-numerique",
    description: "Application pédagogique illustrant la cryptographie moderne avec algorithmes symétriques (AES) et asymétriques (RSA, DSA) et système de signature numérique.",
    category: "WEB",
    technologies: ["Java 11", "JavaFX", "JUnit", "Maven", "RSA", "AES", "SHA-256", "PKI", "X.509"],
    githubUrl: "https://github.com/TIDIALLO",
    liveUrl: null,
    image: "/placeholder-project.jpg",
    period: "Septembre 2017 – Décembre 2017",
    highlights: [
      "Algorithmes de chiffrement symétrique (AES) et asymétrique (RSA, DSA)",
      "Système de signature numérique (génération et vérification)",
      "Interface pour chiffrer/déchiffrer fichiers et messages",
      "Gestion sécurisée des clés et certificats X.509",
      "Concepts avancés : PKI, hachage cryptographique, certificats"
    ]
  }
]

// Expériences professionnelles
const experiences = [
  {
    id: "exp1",
    company: "Freelance",
    position: "Développeur .NET/C#",
    location: "Dakar, Sénégal (Remote)",
    period: "Janvier 2025 – Mai 2025",
    technologies: [".NET 8", "OAuth2", "OpenID Connect", "JWT", "CQRS", "Azure DevOps"],
    achievements: [
      "Application web scalable avec architecture monolithique modulaire orientée domaines",
      "Authentification sécurisée OAuth2/OpenID Connect/JWT",
      "Intégration APIs de paiement avec gestion d'erreurs et callbacks",
      "Application CQRS pour séparation commandes/lectures",
      "Middleware global de gestion d'erreurs et format de réponse API homogène"
    ]
  },
  {
    id: "exp2",
    company: "ai4sense (ex-sensor6ty)",
    position: "Lead Développeur .NET/C# & Azure",
    location: "Remote [France]",
    period: "Mai 2023 – Janvier 2025",
    technologies: [".NET 8", "Microservices", "Azure", "OAuth2", "NuGet", "Azure Pipelines", "Serilog", "Docker"],
    achievements: [
      "Conception et développement de microservices .NET 8 pour plateforme SaaS",
      "Architectures d'authentification OAuth2/OpenID Connect/JWT multi-tenant",
      "Package NuGet interne pour factoriser logique d'authentification et sécurité",
      "Pipelines CI/CD Azure Pipelines (build, tests, SonarQube, déploiement automatisé)",
      "Logs structurés (Serilog) et corrélation de requêtes (traceId)",
      "Standards d'architecture et mentorat d'équipes"
    ]
  },
  {
    id: "exp3",
    company: "ai4sense (ex-sensor6ty)",
    position: "Développeur Full Stack .NET/C#",
    location: "Remote [France]",
    period: "Février 2021 – Mai 2023",
    technologies: [".NET 6", "Clean Architecture", "Blazor", "React", "Microservices", "RabbitMQ", "Hangfire", "Azure Functions", "SQL Server", "PostgreSQL"],
    achievements: [
      "Réécriture .NET Framework 4.8 vers .NET 6 (réduction dette technique)",
      "APIs RESTful .NET 6 avec Clean Architecture et monolithique modulaire",
      "Microservices sécurisés JWT, orchestrés via RabbitMQ et Hangfire",
      "Gestion avancée des configurations (User Secrets, Key Vault, variables d'env)",
      "Optimisation bases de données SQL Server/PostgreSQL",
      "Functions Azure pour automatisation de tâches récurrentes"
    ]
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
  const [activeTab, setActiveTab] = useState<"projects" | "experience">("projects")

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
      } catch (err) {
        // Utiliser les projets statiques en cas d'erreur
        console.log("Using static projects", err)
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
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl leading-relaxed mb-6">
                Découvrez mes projets techniques et mon expérience professionnelle. 
                De la conception d&apos;architectures microservices à l&apos;intégration d&apos;intelligence artificielle, 
                chaque projet reflète mon expertise en développement Full Stack .NET et mes compétences en DevOps.
              </p>
              
              {/* Tabs */}
              <div className="flex gap-2 border-b">
                <button
                  onClick={() => setActiveTab("projects")}
                  className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
                    activeTab === "projects"
                      ? "border-[#2563EB] text-[#2563EB]"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Code className="inline h-4 w-4 mr-2" />
                  Projets
                </button>
                <button
                  onClick={() => setActiveTab("experience")}
                  className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
                    activeTab === "experience"
                      ? "border-[#2563EB] text-[#2563EB]"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Briefcase className="inline h-4 w-4 mr-2" />
                  Expérience Professionnelle
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <>
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
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-2"
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
                              {project.image && (
                                <Image
                                  src={project.image}
                                  alt={project.title}
                                  fill
                                  className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                />
                              )}
                            </div>

                            <CardHeader className="pb-3">
                              <div className="mb-3 flex items-center justify-between">
                                <div className="inline-block rounded-full bg-[#2563EB]/10 px-3 py-1 text-xs font-medium text-[#2563EB] border border-[#2563EB]/20">
                                  {project.category}
                                </div>
                                {("period" in project && project.period) && (
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Calendar className="h-3 w-3" />
                                    {(project as { period?: string }).period}
                                  </div>
                                )}
                              </div>
                              <CardTitle className="text-lg mb-2 line-clamp-1">{project.title}</CardTitle>
                              <CardDescription className="text-sm leading-relaxed line-clamp-3">
                                {project.description}
                              </CardDescription>
                            </CardHeader>

                            <CardContent className="pt-0">
                              {/* Highlights */}
                              {("highlights" in project && project.highlights && (project as { highlights?: string[] }).highlights && (project as { highlights: string[] }).highlights.length > 0) && (
                                <div className="mb-4 space-y-1.5">
                                  {(project as { highlights: string[] }).highlights.slice(0, 2).map((highlight, idx) => (
                                    <div key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                                      <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#2563EB]/40 flex-shrink-0" />
                                      <span className="line-clamp-1">{highlight}</span>
                                    </div>
                                  ))}
                                  {(project as { highlights: string[] }).highlights.length > 2 && (
                                    <div className="text-xs text-[#2563EB] font-medium">
                                      +{(project as { highlights: string[] }).highlights.length - 2} autres points clés
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* Technologies */}
                              <div className="mb-4 flex flex-wrap gap-1.5">
                                {project.technologies.slice(0, 4).map((tech) => (
                                  <span
                                    key={tech}
                                    className="rounded-md bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground"
                                  >
                                    {tech}
                                  </span>
                                ))}
                                {project.technologies.length > 4 && (
                                  <span className="rounded-md bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground">
                                    +{project.technologies.length - 4}
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
          </>
        )}

        {/* Experience Tab */}
        {activeTab === "experience" && (
          <section className="py-12 md:py-16 bg-gradient-to-b from-background via-blue-50/20 to-background dark:from-background dark:via-blue-950/5 dark:to-background relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.06),transparent_50%)]" />
            <div className="container relative z-10 max-w-4xl">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >
                {experiences.map((exp, idx) => (
                  <motion.div key={exp.id} variants={itemVariants}>
                    <Card className="bg-card border hover:border-[#2563EB]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#2563EB]/10">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Building2 className="h-5 w-5 text-[#2563EB]" />
                              <CardTitle className="text-xl">{exp.company}</CardTitle>
                            </div>
                            <CardDescription className="text-base font-medium text-foreground mt-1">
                              {exp.position}
                            </CardDescription>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                              <Calendar className="h-4 w-4" />
                              {exp.period}
                            </div>
                            <div className="text-xs text-muted-foreground">{exp.location}</div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {/* Technologies */}
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1.5">
                            {exp.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="rounded-md bg-[#2563EB]/10 border border-[#2563EB]/20 px-2.5 py-1 text-xs font-medium text-[#2563EB]"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Achievements */}
                        <div>
                          <h4 className="text-sm font-semibold mb-3 text-foreground">Réalisations principales :</h4>
                          <ul className="space-y-2">
                            {exp.achievements.map((achievement, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#2563EB] flex-shrink-0" />
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        )}

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
              Discutons de votre projet et transformons vos idées en réalité digitale avec des solutions modernes et scalables
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
