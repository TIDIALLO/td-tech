"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AuroraBackground } from "@/components/ui/aurora-background"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bot, MessageSquare, Shield, Zap, ArrowRight, Database, BarChart3, CheckCircle2, FileSearch, Settings } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function AgentsIAPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const useCases = [
    {
      icon: MessageSquare,
      title: "Support Client Intelligent",
      description: "Agent IA qui répond aux questions fréquentes, recherche dans votre documentation et escalade vers l'humain si nécessaire.",
      workflows: ["Recherche dans docs/FAQ", "Réponses contextuelles", "Escalade intelligente"]
    },
    {
      icon: BarChart3,
      title: "Assistant Sales & Qualification",
      description: "Qualification automatique des leads, enrichissement des données prospects et scoring intelligent basé sur vos critères.",
      workflows: ["Qualification leads", "Enrichissement data", "Scoring automatique"]
    },
    {
      icon: FileSearch,
      title: "Recherche Documentaire (RAG)",
      description: "Recherche dans vos bases de connaissances internes (docs, Notion, Confluence) avec réponses précises et sourcées.",
      workflows: ["RAG sur bases internes", "Citations sources", "Mise à jour auto"]
    },
    {
      icon: Settings,
      title: "Automatisation Ops Métier",
      description: "Agents IA pour traitement de tickets, extraction de données, génération de rapports et tâches répétitives complexes.",
      workflows: ["Traitement tickets", "Extraction données", "Génération rapports"]
    }
  ]

  const benefits = [
    {
      icon: Shield,
      title: "Sécurisé & Conforme",
      description: "Guardrails pour éviter les hallucinations, respect RGPD, logs d'audit complets, données chiffrées."
    },
    {
      icon: Zap,
      title: "Déploiement Rapide",
      description: "Intégration à vos outils existants (Slack, Teams, email, API). Production en 2-4 semaines."
    },
    {
      icon: Database,
      title: "RAG sur vos Données",
      description: "Connexion à vos bases de connaissances : Notion, Confluence, Drive, bases SQL."
    },
    {
      icon: BarChart3,
      title: "Mesure d'Impact",
      description: "Analytics détaillées : taux de résolution, satisfaction utilisateur, temps économisé."
    }
  ]

  const examples = [
    {
      title: "Support Client Autonome",
      description: "Agent IA Slack pour équipe interne",
      features: [
        "Recherche dans documentation Notion/Confluence",
        "Réponses avec citations et sources",
        "Escalade vers humain si incertitude > 20%",
        "Feedback loop pour amélioration continue"
      ]
    },
    {
      title: "Qualification Leads Automatique",
      description: "Agent IA enrichissement prospects",
      features: [
        "Extraction infos depuis email/formulaire",
        "Enrichissement via APIs externes (Clearbit, etc.)",
        "Scoring basé sur critères personnalisés",
        "Push auto vers CRM (HubSpot, Pipedrive)"
      ]
    },
    {
      title: "Assistant Data Analysis",
      description: "Agent IA pour analyse rapide",
      features: [
        "Questions en langage naturel sur vos données",
        "Génération requêtes SQL automatique",
        "Visualisations et insights suggérés",
        "Export rapports PDF/Excel"
      ]
    }
  ]

  const pricing = [
    {
      name: "POC / Starter",
      price: "À partir de 2000€",
      description: "Proof of concept pour tester la valeur",
      features: [
        "1 agent IA sur un cas d'usage",
        "Intégration 1-2 sources de données",
        "Déploiement sur votre infra ou cloud",
        "2 semaines de développement",
        "1 mois de support inclus"
      ],
      cta: "Démarrer un POC",
      popular: false
    },
    {
      name: "Production",
      price: "À partir de 5000€",
      description: "Agent IA prêt pour production",
      features: [
        "Agent IA complet avec guardrails",
        "RAG sur multiples sources",
        "Monitoring et observabilité",
        "4-6 semaines de développement",
        "3 mois de support et améliorations",
        "Formation équipe incluse"
      ],
      cta: "Lancer en production",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Sur devis",
      description: "Agents IA multiples et sur mesure",
      features: [
        "Plusieurs agents IA coordonnés",
        "Architecture scalable et sécurisée",
        "Intégrations complexes (APIs, DBs)",
        "SLA garanti et support prioritaire",
        "Amélioration continue (MLOps)",
        "Audit sécurité et conformité"
      ],
      cta: "Discuter du projet",
      popular: false
    }
  ]

  const techStack = [
    { name: "OpenAI GPT-4o", description: "Modèle principal pour compréhension et génération" },
    { name: "Claude 3.5", description: "Alternative pour tâches analytiques complexes" },
    { name: "LangChain", description: "Framework pour orchestration des agents" },
    { name: "Pinecone / Chroma", description: "Vector databases pour RAG" },
    { name: "Guardrails AI", description: "Validation réponses et prévention hallucinations" },
    { name: "LangSmith", description: "Observabilité et debugging agents IA" }
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen relative overflow-hidden bg-slate-950">
        <AuroraBackground showRadialGradient className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_20%,rgba(16,185,129,0.08),transparent_45%),radial-gradient(circle_at_70%_30%,rgba(16,185,129,0.06),transparent_42%)]" />
          <div className="absolute inset-0 opacity-60 blur-3xl bg-gradient-to-br from-primary/20 via-emerald-400/10 to-emerald-300/10" />
        </AuroraBackground>

        <div className="relative z-10">
          {/* Hero Section */}
          <section className="relative border-b border-slate-200/70 dark:border-slate-800/80 py-16 md:py-24">
            <div className="container relative z-10">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="text-center space-y-6 max-w-4xl mx-auto"
              >
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-2 text-xs font-semibold ring-1 ring-primary/30">
                    <Bot className="h-4 w-4" />
                    Agents IA
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-2 text-xs font-semibold ring-1 ring-primary/30">
                    RAG & Guardrails
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                  Agents IA sur Mesure
                </h1>

                <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
                  Assistants IA intelligents pour support, ventes et opérations. Déploiement sécurisé avec RAG sur vos données métier et guardrails pour éviter les hallucinations.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white text-base">
                    <Link href="/contact">
                      Discuter de mon besoin IA
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10">
                    <Link href="#examples">
                      Voir des exemples
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Use Cases Section */}
          <section className="relative py-16 md:py-24">
            <div className="container relative z-10">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Cas d'usage Agents IA
                </h2>
                <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                  Des assistants intelligents adaptés à vos besoins métier
                </p>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {useCases.map((useCase, index) => (
                  <motion.div
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full border border-white/10 bg-slate-950/70 backdrop-blur-md hover:border-primary/30 transition-all duration-300">
                      <CardHeader>
                        <div className="rounded-lg bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                          <useCase.icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-white text-xl">{useCase.title}</CardTitle>
                        <CardDescription className="text-slate-300 text-base">
                          {useCase.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {useCase.workflows.map((workflow, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-slate-400">
                              <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                              <span>{workflow}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="relative py-16 md:py-24 bg-slate-950/50">
            <div className="container relative z-10">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Pourquoi des Agents IA ?
                </h2>
                <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                  IA générative appliquée à vos cas d'usage métier réels
                </p>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                    <p className="text-sm text-slate-400">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Examples */}
          <section id="examples" className="relative py-16 md:py-24">
            <div className="container relative z-10">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Exemples d'implémentations
                </h2>
                <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                  Agents IA prêts à déployer, personnalisables selon vos besoins
                </p>
              </motion.div>

              <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
                {examples.map((example, index) => (
                  <motion.div
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                  >
                    <Card className="h-full border border-white/10 bg-slate-950/70 backdrop-blur-md">
                      <CardHeader>
                        <CardTitle className="text-white text-xl">{example.title}</CardTitle>
                        <CardDescription className="text-primary font-medium">
                          {example.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {example.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Tech Stack */}
          <section className="relative py-16 md:py-24 bg-slate-950/50">
            <div className="container relative z-10">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Stack Technique IA
                </h2>
                <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                  Technologies éprouvées pour agents IA en production
                </p>
              </motion.div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="border border-white/10 bg-slate-950/70 backdrop-blur-md">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-white text-base">{tech.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-400">{tech.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section className="relative py-16 md:py-24">
            <div className="container relative z-10">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Tarifs
                </h2>
                <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                  Du POC à la production, accompagnement complet
                </p>
              </motion.div>

              <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
                {pricing.map((plan, index) => (
                  <motion.div
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                  >
                    <Card className={`h-full border backdrop-blur-md ${
                      plan.popular
                        ? 'border-primary/50 bg-primary/5 ring-2 ring-primary/20'
                        : 'border-white/10 bg-slate-950/70'
                    }`}>
                      <CardHeader>
                        {plan.popular && (
                          <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-primary rounded-full mb-2 w-fit">
                            Populaire
                          </span>
                        )}
                        <CardTitle className="text-white text-2xl">{plan.name}</CardTitle>
                        <div className="text-3xl font-bold text-primary mt-2">{plan.price}</div>
                        <CardDescription className="text-slate-300">
                          {plan.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3 mb-6">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button
                          asChild
                          className={`w-full ${
                            plan.popular
                              ? 'bg-primary hover:bg-primary/90 text-white'
                              : 'border-primary/50 text-primary hover:bg-primary/10'
                          }`}
                          variant={plan.popular ? 'default' : 'outline'}
                        >
                          <Link href="/contact">{plan.cta}</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Final */}
          <section className="relative py-16 md:py-24 bg-slate-950/50">
            <div className="container relative z-10">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto text-center"
              >
                <Card className="border border-primary/30 bg-slate-950/70 backdrop-blur-md">
                  <CardContent className="pt-12 pb-12">
                    <Bot className="h-16 w-16 text-primary mx-auto mb-6" />
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      Prêt à lancer votre agent IA ?
                    </h2>
                    <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                      Commençons par un POC de 2 semaines pour valider la valeur sur votre cas d'usage. Premier échange gratuit de 30 min pour comprendre vos besoins.
                    </p>
                    <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white text-base">
                      <Link href="/contact">
                        Démarrer un POC
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
