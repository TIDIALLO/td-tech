import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Github, Calendar, Code, Globe, Brain, Zap, CheckCircle2 } from "lucide-react"
import Image from "next/image"

// Projets détaillés basés sur le CV
interface ProjectData {
  id: string
  title: string
  slug: string
  description: string
  category: string
  technologies: string[]
  githubUrl: string | null
  liveUrl: string | null
  period?: string
  location?: string
  highlights?: string[]
  content: string
}

const staticProjects: Record<string, ProjectData> = {
  "school-management-system": {
    id: "1",
    title: "School Management System",
    slug: "school-management-system",
    description: "Système de gestion scolaire Full Stack .NET avec Docker, CI/CD Azure, Blazor WebAssembly et SignalR pour les mises à jour en temps réel.",
    category: "WEB",
    technologies: [".NET 8", "Blazor WebAssembly", "SignalR", "PostgreSQL", "Docker", "RabbitMQ", "Hangfire", "Serilog", "Azure Pipelines", "JWT"],
    githubUrl: "https://github.com/TIDIALLO",
    liveUrl: null,
    period: "Septembre 2023 – Décembre 2023",
    location: "Dakar, Sénégal",
    highlights: [
      "Conteneurisation Docker avec orchestration (RabbitMQ, PostgreSQL, Hangfire, Serilog)",
      "CI/CD automatisée avec Azure Pipeline (build, tests, déploiement multi-env)",
      "Interface Blazor WebAssembly avec SignalR pour temps réel",
      "Authentification JWT et gestion fine des rôles (admin, professeurs, étudiants)",
      "Logs structurés et métriques métier avec tableaux de bord"
    ],
    content: `
      <h2>Contexte du Projet</h2>
      <p>Développement d'un système complet de gestion scolaire permettant de gérer les inscriptions, les cours, les notes, les absences et la communication entre les différents acteurs (administrateurs, professeurs, étudiants).</p>
      
      <h2>Architecture Technique</h2>
      <p>Le projet utilise une architecture modulaire avec séparation claire des responsabilités :</p>
      <ul>
        <li><strong>Backend :</strong> API REST .NET 8 avec Clean Architecture</li>
        <li><strong>Frontend :</strong> Blazor WebAssembly pour une expérience utilisateur fluide</li>
        <li><strong>Base de données :</strong> PostgreSQL avec migrations EF Core</li>
        <li><strong>Messaging :</strong> RabbitMQ pour la communication asynchrone entre services</li>
        <li><strong>Background Jobs :</strong> Hangfire pour les tâches planifiées</li>
        <li><strong>Observabilité :</strong> Serilog pour les logs structurés</li>
      </ul>
      
      <h2>Fonctionnalités Principales</h2>
      <ul>
        <li><strong>Gestion des utilisateurs :</strong> Authentification JWT avec rôles (admin, professeurs, étudiants)</li>
        <li><strong>Gestion académique :</strong> Inscriptions, cours, emplois du temps, notes</li>
        <li><strong>Temps réel :</strong> SignalR pour les notifications et mises à jour en direct</li>
        <li><strong>Dashboard :</strong> Tableaux de bord avec métriques métier (inscriptions, activité par profil)</li>
        <li><strong>CI/CD :</strong> Pipeline Azure automatisé pour build, tests et déploiement</li>
      </ul>
      
      <h2>Déploiement & DevOps</h2>
      <p>Le système est entièrement conteneurisé avec Docker Compose, incluant :</p>
      <ul>
        <li>Application principale (.NET 8)</li>
        <li>Base de données PostgreSQL</li>
        <li>Message broker RabbitMQ</li>
        <li>Hangfire pour les tâches en arrière-plan</li>
        <li>Configuration centralisée avec variables d'environnement</li>
      </ul>
      
      <h2>Résultats</h2>
      <p>Application scalable et maintenable avec une architecture moderne, permettant une évolution future vers une architecture microservices si nécessaire.</p>
    `
  },
  "plateforme-supervision-alerting": {
    id: "2",
    title: "Plateforme de Supervision & Alerting",
    slug: "plateforme-supervision-alerting",
    description: "Architecture microservices .NET pour la supervision d'événements avec bus de messages RabbitMQ, politiques de résilience et observabilité avancée.",
    category: "WEB",
    technologies: [".NET 6/8", "Microservices", "RabbitMQ", "JWT", "Blazor", "Serilog", "Circuit Breaker", "Retry Policies"],
    githubUrl: "https://github.com/TIDIALLO",
    liveUrl: null,
    period: "Projet avancé .NET (R&D)",
    location: "Projet personnel / R&D",
    highlights: [
      "Architecture microservices pour supervision d'événements (logs, métriques, alertes)",
      "Bus de messages RabbitMQ pour diffusion d'événements entre services",
      "Politiques de résilience (retries, circuit breaker, fallback)",
      "Logs structurés (Serilog) et corrélation de requêtes (traceId)",
      "API REST sécurisée JWT et portail d'administration Blazor"
    ],
    content: `
      <h2>Contexte du Projet</h2>
      <p>Conception d'une plateforme avancée de supervision et d'alerting pour systèmes distribués, permettant de collecter, agréger et analyser des événements en temps réel.</p>
      
      <h2>Architecture Microservices</h2>
      <p>L'architecture est composée de plusieurs microservices spécialisés :</p>
      <ul>
        <li><strong>Service de collecte :</strong> Récupération des logs et métriques depuis diverses sources</li>
        <li><strong>Service d'agrégation :</strong> Traitement et agrégation des événements</li>
        <li><strong>Service de notification :</strong> Envoi d'alertes selon les règles configurées</li>
        <li><strong>Service d'API :</strong> Exposition REST sécurisée pour consultation et configuration</li>
        <li><strong>Portail d'administration :</strong> Interface Blazor pour gestion des règles d'alertes</li>
      </ul>
      
      <h2>Patterns & Bonnes Pratiques</h2>
      <ul>
        <li><strong>Event-Driven Architecture :</strong> Communication asynchrone via RabbitMQ</li>
        <li><strong>Resilience Patterns :</strong> Retry policies, circuit breaker, fallback mechanisms</li>
        <li><strong>Observability :</strong> Logs structurés avec Serilog et corrélation de requêtes (traceId)</li>
        <li><strong>Security :</strong> Authentification JWT et autorisation fine</li>
        <li><strong>Scalability :</strong> Architecture horizontale pour gérer de gros volumes d'événements</li>
      </ul>
      
      <h2>Fonctionnalités Clés</h2>
      <ul>
        <li>Collecte de logs et métriques depuis multiples sources</li>
        <li>Agrégation et traitement en temps réel</li>
        <li>Configuration de règles d'alertes personnalisables</li>
        <li>Tableaux de bord pour visualisation des métriques</li>
        <li>Tracing de bout en bout avec corrélation de requêtes</li>
      </ul>
      
      <h2>Technologies Avancées</h2>
      <p>Utilisation de patterns avancés .NET pour la résilience et l'observabilité, avec intégration de bibliothèques comme Polly pour les politiques de retry et circuit breaker.</p>
    `
  },
  "ecommerce-multivendeurs": {
    id: "3",
    title: "E-commerce Multivendeurs",
    slug: "ecommerce-multivendeurs",
    description: "Boutique en ligne multivendeurs avec architecture microservices Java/Spring Boot, interface React responsive et intégration APIs de paiement.",
    category: "WEB",
    technologies: ["Java", "Spring Boot", "React", "Microservices", "JWT", "PostgreSQL", "Docker"],
    githubUrl: "https://github.com/TIDIALLO",
    liveUrl: null,
    period: "Mars 2018 – Août 2023",
    location: "Projet long terme",
    highlights: [
      "Architecture microservices pour séparer les domaines (commandes, paiements, inventaire)",
      "Interface React responsive avec gestion de panier et recherche avancée",
      "Intégration APIs de paiement et authentification JWT",
      "Dashboard administrateur pour ventes, stocks et statistiques",
      "Gestion complète des vendeurs, produits et commandes"
    ],
    content: `
      <h2>Contexte du Projet</h2>
      <p>Développement d'une plateforme e-commerce complète permettant à plusieurs vendeurs de vendre leurs produits sur une même plateforme, avec gestion centralisée des commandes, paiements et inventaire.</p>
      
      <h2>Architecture Microservices</h2>
      <p>L'application est découpée en plusieurs microservices indépendants :</p>
      <ul>
        <li><strong>Service Commandes :</strong> Gestion des commandes et paniers</li>
        <li><strong>Service Paiements :</strong> Intégration avec APIs de paiement</li>
        <li><strong>Service Inventaire :</strong> Gestion des stocks et produits</li>
        <li><strong>Service Vendeurs :</strong> Gestion des comptes vendeurs</li>
        <li><strong>Service Authentification :</strong> JWT et gestion des utilisateurs</li>
      </ul>
      
      <h2>Fonctionnalités Principales</h2>
      <ul>
        <li><strong>Multi-vendeurs :</strong> Chaque vendeur peut gérer son catalogue et ses ventes</li>
        <li><strong>Gestion de produits :</strong> CRUD complet avec images, variantes, catégories</li>
        <li><strong>Panier & Commandes :</strong> Gestion de panier multi-vendeurs et suivi de commandes</li>
        <li><strong>Recherche avancée :</strong> Filtres, tri, recherche par mots-clés</li>
        <li><strong>Paiements :</strong> Intégration sécurisée avec APIs de paiement</li>
        <li><strong>Dashboard :</strong> Statistiques de ventes, stocks, revenus par vendeur</li>
      </ul>
      
      <h2>Interface Utilisateur</h2>
      <p>Interface React moderne et responsive avec :</p>
      <ul>
        <li>Design responsive pour mobile, tablette et desktop</li>
        <li>Gestion d'état avec Redux ou Context API</li>
        <li>Optimisation des performances (lazy loading, code splitting)</li>
        <li>Expérience utilisateur fluide avec animations et transitions</li>
      </ul>
      
      <h2>Résultats</h2>
      <p>Plateforme scalable capable de gérer de nombreux vendeurs et transactions, avec une architecture modulaire facilitant la maintenance et l'évolution.</p>
    `
  },
  "chiffrement-signature-numerique": {
    id: "4",
    title: "Application de Chiffrement & Signature Numérique",
    slug: "chiffrement-signature-numerique",
    description: "Application pédagogique illustrant la cryptographie moderne avec algorithmes symétriques (AES) et asymétriques (RSA, DSA) et système de signature numérique.",
    category: "WEB",
    technologies: ["Java 11", "JavaFX", "JUnit", "Maven", "RSA", "AES", "SHA-256", "PKI", "X.509"],
    githubUrl: "https://github.com/TIDIALLO",
    liveUrl: null,
    period: "Septembre 2017 – Décembre 2017",
    location: "Projet pédagogique",
    highlights: [
      "Algorithmes de chiffrement symétrique (AES) et asymétrique (RSA, DSA)",
      "Système de signature numérique (génération et vérification)",
      "Interface pour chiffrer/déchiffrer fichiers et messages",
      "Gestion sécurisée des clés et certificats X.509",
      "Concepts avancés : PKI, hachage cryptographique, certificats"
    ],
    content: `
      <h2>Contexte du Projet</h2>
      <p>Application pédagogique développée dans le cadre d'un projet universitaire pour illustrer les principes de cryptographie moderne et de sécurité de l'information.</p>
      
      <h2>Algorithmes Implémentés</h2>
      <h3>Chiffrement Symétrique</h3>
      <ul>
        <li><strong>AES (Advanced Encryption Standard) :</strong> Chiffrement par blocs avec différentes tailles de clés (128, 192, 256 bits)</li>
        <li>Modes d'opération : ECB, CBC, GCM</li>
        <li>Gestion sécurisée des clés et vecteurs d'initialisation (IV)</li>
      </ul>
      
      <h3>Chiffrement Asymétrique</h3>
      <ul>
        <li><strong>RSA :</strong> Génération de paires de clés, chiffrement/déchiffrement</li>
        <li><strong>DSA :</strong> Algorithmes de signature numérique</li>
        <li>Gestion des certificats X.509</li>
      </ul>
      
      <h2>Fonctionnalités</h2>
      <ul>
        <li><strong>Chiffrement/Déchiffrement :</strong> Fichiers et messages texte avec différents algorithmes</li>
        <li><strong>Signature numérique :</strong> Génération et vérification de signatures</li>
        <li><strong>Gestion de clés :</strong> Génération, import/export de clés publiques et privées</li>
        <li><strong>Hachage cryptographique :</strong> SHA-256 pour intégrité des données</li>
        <li><strong>Certificats :</strong> Gestion de certificats X.509 et infrastructure PKI</li>
      </ul>
      
      <h2>Interface Utilisateur</h2>
      <p>Interface JavaFX intuitive permettant :</p>
      <ul>
        <li>Sélection de l'algorithme de chiffrement</li>
        <li>Chiffrement/déchiffrement de fichiers et messages</li>
        <li>Génération et gestion de clés</li>
        <li>Signature et vérification de documents</li>
        <li>Visualisation des certificats</li>
      </ul>
      
      <h2>Concepts Cryptographiques</h2>
      <ul>
        <li><strong>PKI (Public Key Infrastructure) :</strong> Infrastructure à clés publiques</li>
        <li><strong>Hachage cryptographique :</strong> SHA-256 pour l'intégrité</li>
        <li><strong>Certificats X.509 :</strong> Format standard pour certificats numériques</li>
        <li><strong>Sécurité des clés :</strong> Stockage et protection des clés privées</li>
      </ul>
      
      <h2>Tests & Qualité</h2>
      <p>Tests unitaires avec JUnit pour valider les algorithmes cryptographiques et garantir la sécurité des opérations.</p>
    `
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
            
            {/* Project Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
              {"period" in project && project.period && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {(project as { period?: string }).period}
                </div>
              )}
              {"location" in project && project.location && (
                <div className="flex items-center gap-2">
                  <span>{(project as { location?: string }).location}</span>
                </div>
              )}
            </div>
            
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
            {/* Highlights */}
            {"highlights" in project && project.highlights && (project as { highlights?: string[] }).highlights && (project as { highlights: string[] }).highlights.length > 0 && (
              <div className="mb-8 p-6 bg-gradient-to-br from-[#2563EB]/5 to-[#3B82F6]/5 rounded-lg border border-[#2563EB]/10">
                <h2 className="mb-4 text-xl font-bold flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#2563EB]" />
                  Points Clés
                </h2>
                <ul className="space-y-2">
                  {(project as { highlights: string[] }).highlights.map((highlight: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#2563EB] flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

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
                    className="rounded-md bg-background border border-[#2563EB]/20 px-3 py-1.5 text-sm font-medium text-[#2563EB]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Content */}
            <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-[#2563EB] prose-ul:text-muted-foreground prose-li:text-muted-foreground">
              <div dangerouslySetInnerHTML={{ __html: project.content || "<p>Description détaillée du projet...</p>" }} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
