"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AuroraBackground } from "@/components/ui/aurora-background"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Workflow, Zap, Clock, Shield, ArrowRight, Database, Mail, BarChart3, CheckCircle2, GitBranch } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function AutomatisationPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const useCases = [
    {
      icon: Database,
      title: "Sync CRM & Outils",
      description: "Synchronisation bidirectionnelle entre vos outils (Notion, HubSpot, Airtable, Google Sheets). Données toujours à jour, zéro saisie manuelle.",
      workflows: ["Notion ↔ HubSpot", "Airtable → PostgreSQL", "Sheets → CRM"]
    },
    {
      icon: Mail,
      title: "Automation Emails",
      description: "Catégorisation automatique, réponses intelligentes, suivi des demandes. Gagnez des heures chaque semaine sur la gestion des emails.",
      workflows: ["Support auto-réponse", "Catégorie + routing", "Follow-up automatique"]
    },
    {
      icon: BarChart3,
      title: "Reporting & Analytics",
      description: "Tableaux de bord générés automatiquement chaque semaine. Consolidation multi-sources vers Slack, email ou Google Sheets.",
      workflows: ["Dashboard hebdo", "Alertes KPI", "Export automatique"]
    },
    {
      icon: GitBranch,
      title: "Data Pipelines",
      description: "ETL personnalisés pour nettoyer, transformer et router vos données. Intégrations API complexes simplifiées avec n8n.",
      workflows: ["Multi-sources → DW", "API enrichment", "Data cleaning"]
    }
  ]

  const benefits = [
    {
      icon: Clock,
      title: "Gain de Temps",
      description: "5 à 20 heures économisées par semaine sur les tâches répétitives."
    },
    {
      icon: Shield,
      title: "Fiabilité & Sécurité",
      description: "Workflows testés, logs détaillés, gestion d'erreurs automatique, chiffrement des credentials."
    },
    {
      icon: Zap,
      title: "Évolutif",
      description: "Ajoutez ou modifiez des étapes sans refonte complète. Architecture modulaire."
    },
    {
      icon: CheckCircle2,
      title: "Monitoring 24/7",
      description: "Alertes en temps réel, historique d'exécution, performances trackées."
    }
  ]

  const workflows = [
    {
      title: "CRM Sync Bidirectionnel",
      description: "Synchronisation Notion ↔ HubSpot",
      features: [
        "Création/mise à jour contacts automatique",
        "Sync des deals et opportunités",
        "Logs détaillés de chaque sync",
        "Gestion conflit et déduplication"
      ]
    },
    {
      title: "Email Support Intelligent",
      description: "Catégorisation + Réponses Automatiques",
      features: [
        "Classification par priorité (urgent, normal, bas)",
        "Réponses automatiques pré-configurées",
        "Routing vers la bonne personne/équipe",
        "Suivi et escalade automatique"
      ]
    },
    {
      title: "Dashboard Hebdomadaire",
      description: "Reporting Automatique (Sheets → Slack)",
      features: [
        "Consolidation données multi-sources",
        "Génération graphiques et insights",
        "Envoi programmé (lundi 9h)",
        "Format PDF ou Slack message"
      ]
    }
  ]

  const pricing = [
    {
      name: "Starter",
      price: "À partir de 500€",
      description: "Un workflow simple pour débuter",
      features: [
        "1 workflow n8n configuré",
        "2 intégrations maximum",
        "Documentation complète",
        "1 mois de support inclus"
      ],
      cta: "Démarrer",
      popular: false
    },
    {
      name: "Pro",
      price: "À partir de 1500€",
      description: "Automatisations complètes",
      features: [
        "3 à 5 workflows n8n",
        "Intégrations illimitées",
        "Monitoring et alertes",
        "3 mois de support",
        "Formation équipe incluse"
      ],
      cta: "Choisir Pro",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Sur devis",
      description: "Solution sur mesure",
      features: [
        "Workflows illimités",
        "Architecture personnalisée",
        "SLA garanti",
        "Support prioritaire 24/7",
        "Migration existante incluse"
      ],
      cta: "Nous contacter",
      popular: false
    }
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
                    <Workflow className="h-4 w-4" />
                    Workflows n8n
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-2 text-xs font-semibold ring-1 ring-primary/30">
                    Gagnez 5 à 20h/semaine
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                  Automatisation n8n
                </h1>

                <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
                  Des workflows n8n fiables et sécurisés pour automatiser CRM, emails, reporting et data.
                  Nous configurons, testons et maintenons vos automatisations sur mesure.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white text-base">
                    <Link href="/contact">
                      Parler de mon projet
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10">
                    <Link href="#workflows">
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
                  Cas d'usage n8n
                </h2>
                <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                  Workflows adaptés à vos besoins métier
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
                  Pourquoi n8n ?
                </h2>
                <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                  Une plateforme d'automatisation puissante et open-source
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

          {/* Workflows Examples */}
          <section id="workflows" className="relative py-16 md:py-24">
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
                  Exemples de workflows
                </h2>
                <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                  Configurations prêtes à l'emploi, personnalisables selon vos besoins
                </p>
              </motion.div>

              <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
                {workflows.map((workflow, index) => (
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
                        <CardTitle className="text-white text-xl">{workflow.title}</CardTitle>
                        <CardDescription className="text-primary font-medium">
                          {workflow.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {workflow.features.map((feature, i) => (
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

          {/* Pricing Section */}
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
                  Tarifs
                </h2>
                <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                  Des formules adaptées à la complexité de vos besoins
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
          <section className="relative py-16 md:py-24">
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
                    <Workflow className="h-16 w-16 text-primary mx-auto mb-6" />
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      Prêt à automatiser vos processus ?
                    </h2>
                    <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                      Discutons de vos besoins en automatisation. Premier échange gratuit de 30 min pour comprendre votre contexte et vous conseiller.
                    </p>
                    <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white text-base">
                      <Link href="/contact">
                        Réserver un créneau
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
