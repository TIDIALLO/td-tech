"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AuroraBackground } from "@/components/ui/aurora-background"
import Link from "next/link"
import { 
  ArrowRight,
  Bot,
  Code,
  GraduationCap,
  Workflow,
  CheckCircle2
} from "lucide-react"
import { motion } from "framer-motion"

export default function ServicesPage() {
  // Services "officiels" (alignés avec la home)
  const services = [
    {
      id: 1,
      title: "Création d'applications web",
      description: "Sites et applications Next.js modernes, rapides, SEO-ready et maintenables.",
      icon: Code,
      features: [
        "Design & UX pro",
        "Performance & SEO",
        "Architecture maintenable",
        "Qualité production",
      ]
    },
    {
      id: 2,
      title: "Automatisation n8n",
      description: "Workflows fiables (CRM, e-mails, reporting, data) pour gagner du temps chaque semaine.",
      icon: Workflow,
      features: ["Intégrations API", "Logs & monitoring", "Sécurité & droits", "Maintenance"],
    },
    {
      id: 3,
      title: "Agents IA",
      description: "Assistants IA utiles (support, sales, ops) intégrés à vos outils, avec garde-fous.",
      icon: Bot,
      features: ["RAG & bases métiers", "Déploiement sécurisé", "Mesure d'impact", "Observabilité"],
    },
    {
      id: 4,
      title: "Formations",
      description: "Formation IA + dev (Next.js/Python) pour rendre vos équipes autonomes rapidement.",
      icon: GraduationCap,
      features: [
        "Cas concrets",
        "Supports & exercices",
        "Suivi post-formation",
        "Adapté à votre niveau",
      ]
    }
  ]

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

  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Header Section */}
        <section className="relative min-h-[60vh] overflow-hidden">
          <AuroraBackground showRadialGradient className="absolute inset-0">
            <div className="container relative z-10 px-4 py-24 md:py-28">
              <div className="mx-auto max-w-4xl text-center">
            <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  className="space-y-6"
            >
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                    Nos <span className="text-primary">Services</span>
              </h1>
              <motion.p
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
                    className="text-lg md:text-xl text-foreground/85 max-w-3xl mx-auto"
              >
                Un cadre simple : on mesure, on livre, on améliore. Pas de “bling”, juste du résultat.
              </motion.p>
            </motion.div>
          </div>
            </div>
          </AuroraBackground>
        </section>

        {/* Services Grid */}
        <section className="relative overflow-hidden py-24">
          <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(circle,rgba(16,185,129,0.16)_1px,transparent_1px)] [background-size:26px_26px] animate-dots-drift" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
          <div className="container relative px-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
            >
              {services.map((service) => {
                const Icon = service.icon
                const ctaHref = service.title === "Formations" ? "/formations" : "/contact"
                const ctaLabel = service.title === "Formations" ? "Voir les formations" : "Démarrer un projet"
                return (
                  <motion.div key={service.id} variants={itemVariants}>
                    <Card className="group h-full bg-card border-border/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/40">
                      <CardHeader className="pb-3">
                        <div className="mb-3 p-2.5 bg-primary/10 rounded-lg w-fit group-hover:bg-primary/15 transition-colors duration-300">
                          <Icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <CardTitle className="text-lg mb-2">{service.title}</CardTitle>
                        <CardDescription className="text-xs leading-relaxed">
                          {service.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ul className="space-y-1.5 mb-4">
                          {service.features.slice(0, 4).map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                              <CheckCircle2 className="h-3 w-3 text-primary flex-shrink-0" />
                              <span className="line-clamp-1">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Link href={ctaHref}>
                          <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs transition-all duration-300 group-hover:shadow-md group-hover:shadow-primary/30">
                            {ctaLabel}
                            <ArrowRight className="ml-2 h-3.5 w-3.5" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-muted/40 via-emerald-50/30 to-muted/40 dark:from-muted/40 dark:via-emerald-950/10 dark:to-muted/40 border-t relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.10),transparent_50%)]" />
          <div className="container relative z-10 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-3 text-2xl md:text-3xl font-bold"
            >
              Prêt à propulser votre projet ?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto"
            >
              Discutons de vos besoins et trouvons ensemble la meilleure solution pour votre entreprise
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link href="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 text-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-105">
                  Démarrer un projet
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
