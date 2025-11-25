"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  Globe, 
  GraduationCap, 
  Code, 
  Brain, 
  Zap, 
  CheckCircle2,
  ArrowRight,
  Sparkles,
  TrendingUp
} from "lucide-react"
import { motion } from "framer-motion"

export default function ServicesPage() {
  const services = [
    {
      id: 1,
      title: "Création de Site Web",
      description: "Développement de sites web modernes et performants avec Next.js, React et les dernières technologies.",
      icon: Globe,
      features: [
        "Sites vitrine modernes",
        "E-commerce complet",
        "Applications web sur mesure",
        "Optimisation SEO",
        "Responsive design"
      ]
    },
    {
      id: 2,
      title: "Formation Web",
      description: "Formations complètes en développement web pour rendre vos équipes opérationnelles rapidement.",
      icon: GraduationCap,
      integrations: [
        { name: "Next.js", desc: "Formation complète" },
        { name: "React & TypeScript", desc: "Maîtrise avancée" },
        { name: "TailwindCSS", desc: "Design moderne" }
      ]
    },
    {
      id: 3,
      title: "Cours de Programmation",
      description: "Cours approfondis en .NET/C#, Java, Python et autres langages. De débutant à expert.",
      icon: Code,
      languages: [
        { name: ".NET / C#", desc: "Développement backend", code: ".NET" },
        { name: "Java", desc: "Enterprise applications", code: "J" },
        { name: "Python", desc: "Data & IA", code: "Py" }
      ]
    },
    {
      id: 4,
      title: "Intégration IA",
      description: "Intégration de l'intelligence artificielle dans vos applications existantes.",
      icon: Brain,
      features: [
        "Agents intelligents",
        "Chatbots IA",
        "Assistants virtuels",
        "Intégration API"
      ]
    },
    {
      id: 5,
      title: "Automatisation IA",
      description: "Automatisez vos processus métier avec l'IA. Workflows intelligents et optimisation.",
      icon: Zap,
      features: [
        "Workflows N8N",
        "Automatisation de tâches",
        "Traitement de données",
        "Intégration d'APIs"
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

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Header Section */}
        <section className="relative overflow-hidden border-b bg-gradient-to-b from-background via-muted/30 to-background py-12 md:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.08),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.05),transparent_50%)]" />
          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Nos service<span className="text-[#2563EB]">s</span>
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base md:text-lg text-muted-foreground max-w-3xl leading-relaxed"
              >
                Des solutions sur mesure pour transformer vos idées en réalité digitale. 
                De la création de sites web à l&apos;intégration d&apos;intelligence artificielle, 
                nous accompagnons votre projet de A à Z avec expertise et innovation.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {/* Service 1: Création de Site Web */}
              <motion.div variants={itemVariants}>
                <Card className="group h-full bg-card border hover:border-[#2563EB]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#2563EB]/10 hover:-translate-y-1">
                  <CardHeader className="pb-3">
                    <div className="mb-3 p-2.5 bg-[#2563EB]/10 rounded-lg w-fit group-hover:bg-[#2563EB]/20 transition-colors duration-300">
                      <Globe className="h-5 w-5 text-[#2563EB] group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <CardTitle className="text-lg mb-2">Création de Site Web</CardTitle>
                    <CardDescription className="text-xs leading-relaxed">
                      Développement de sites web modernes et performants avec Next.js, React.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-1.5 mb-4">
                      {services[0].features.slice(0, 4).map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CheckCircle2 className="h-3 w-3 text-[#2563EB] flex-shrink-0" />
                          <span className="line-clamp-1">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/contact">
                      <Button size="sm" className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs transition-all duration-300 group-hover:shadow-md group-hover:shadow-[#2563EB]/50">
                        Demander un devis
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Service 2: Formation Web */}
              <motion.div variants={itemVariants}>
                <Card className="group h-full bg-card border hover:border-[#2563EB]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#2563EB]/10 hover:-translate-y-1">
                  <CardHeader className="pb-3">
                    <div className="mb-3 p-2.5 bg-[#2563EB]/10 rounded-lg w-fit group-hover:bg-[#2563EB]/20 transition-colors duration-300">
                      <GraduationCap className="h-5 w-5 text-[#2563EB] group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <CardTitle className="text-lg mb-2">Formation Web</CardTitle>
                    <CardDescription className="text-xs leading-relaxed">
                      Formations complètes en développement web pour vos équipes.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="mb-4 space-y-2">
                      {services[1].integrations?.map((item, idx) => (
                        <div key={idx} className="p-2 bg-muted/50 rounded-md border hover:border-[#2563EB]/50 transition-colors duration-200">
                          <div className="flex items-center gap-2">
                            <div className="h-6 w-6 bg-[#2563EB]/20 rounded flex items-center justify-center group-hover:bg-[#2563EB]/30 transition-colors">
                              <Sparkles className="h-3 w-3 text-[#2563EB]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium truncate">{item.name}</p>
                              <p className="text-[10px] text-muted-foreground truncate">{item.desc}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Link href="/formations">
                      <Button size="sm" className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs transition-all duration-300 group-hover:shadow-md group-hover:shadow-[#2563EB]/50">
                        Voir les formations
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Service 3: Cours de Programmation */}
              <motion.div variants={itemVariants}>
                <Card className="group h-full bg-card border hover:border-[#2563EB]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#2563EB]/10 hover:-translate-y-1">
                  <CardHeader className="pb-3">
                    <div className="mb-3 p-2.5 bg-[#2563EB]/10 rounded-lg w-fit group-hover:bg-[#2563EB]/20 transition-colors duration-300">
                      <Code className="h-5 w-5 text-[#2563EB] group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <CardTitle className="text-lg mb-2">Cours de Programmation</CardTitle>
                    <CardDescription className="text-xs leading-relaxed">
                      Cours approfondis en .NET/C#, Java, Python et autres langages.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="mb-4 space-y-2">
                      {services[2].languages?.map((lang, idx) => (
                        <div key={idx} className="p-2 bg-muted/50 rounded-md border hover:border-[#2563EB]/50 transition-colors duration-200">
                          <div className="flex items-center gap-2">
                            <div className="h-6 w-6 bg-[#2563EB]/20 rounded flex items-center justify-center group-hover:bg-[#2563EB]/30 transition-colors">
                              <span className="text-[#2563EB] font-bold text-[10px]">{lang.code}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium truncate">{lang.name}</p>
                              <p className="text-[10px] text-muted-foreground truncate">{lang.desc}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Link href="/formations">
                      <Button size="sm" className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs transition-all duration-300 group-hover:shadow-md group-hover:shadow-[#2563EB]/50">
                        Découvrir les cours
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Service 4: Intégration IA */}
              <motion.div variants={itemVariants}>
                <Card className="group h-full bg-card border hover:border-[#2563EB]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#2563EB]/10 hover:-translate-y-1">
                  <CardHeader className="pb-3">
                    <div className="mb-3 p-2.5 bg-[#2563EB]/10 rounded-lg w-fit group-hover:bg-[#2563EB]/20 transition-colors duration-300">
                      <Brain className="h-5 w-5 text-[#2563EB] group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <CardTitle className="text-lg mb-2">Intégration IA</CardTitle>
                    <CardDescription className="text-xs leading-relaxed">
                      Intégration de l'intelligence artificielle dans vos applications.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {/* Chat Interface Visual - Compact */}
                    <div className="mb-4 space-y-2 p-2.5 bg-muted/50 rounded-lg border">
                      <div className="flex justify-end">
                        <div className="bg-[#2563EB]/20 rounded-md px-2 py-1 max-w-[75%]">
                          <p className="text-[10px]">Résume ce rapport</p>
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-muted rounded-md px-2 py-1 max-w-[75%]">
                          <div className="flex items-center gap-1 mb-0.5">
                            <span className="text-[9px] bg-[#2563EB] text-white px-1 py-0.5 rounded">IA</span>
                            <span className="text-[9px] text-muted-foreground">Assistant</span>
                          </div>
                          <p className="text-[10px]">Bien sûr...</p>
                        </div>
                      </div>
                    </div>
                    <Link href="/contact">
                      <Button size="sm" className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs transition-all duration-300 group-hover:shadow-md group-hover:shadow-[#2563EB]/50">
                        Intégrer l&apos;IA
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Service 5: Automatisation IA */}
              <motion.div variants={itemVariants}>
                <Card className="group h-full bg-card border hover:border-[#2563EB]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#2563EB]/10 hover:-translate-y-1">
                  <CardHeader className="pb-3">
                    <div className="mb-3 p-2.5 bg-[#2563EB]/10 rounded-lg w-fit group-hover:bg-[#2563EB]/20 transition-colors duration-300">
                      <Zap className="h-5 w-5 text-[#2563EB] group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <CardTitle className="text-lg mb-2">Automatisation IA</CardTitle>
                    <CardDescription className="text-xs leading-relaxed">
                      Automatisez vos processus métier avec l&apos;IA. Workflows intelligents.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {/* Graph Visual - Compact */}
                    <div className="mb-4 p-2.5 bg-muted/50 rounded-lg border">
                      <div className="relative h-20">
                        <svg className="w-full h-full" viewBox="0 0 200 80">
                          <path
                            d="M 10 60 Q 50 45, 90 40 T 170 25"
                            stroke="#3B82F6"
                            strokeWidth="2"
                            fill="none"
                            className="opacity-60"
                          />
                          <path
                            d="M 10 70 Q 50 55, 90 50 T 170 35"
                            stroke="#2563EB"
                            strokeWidth="2"
                            fill="none"
                          />
                          <circle cx="170" cy="25" r="3" fill="#2563EB" />
                          <rect x="165" y="15" width="18" height="10" rx="1.5" fill="#2563EB" opacity="0.9" />
                          <text x="168" y="22" fontSize="7" fill="currentColor" className="text-foreground" fontWeight="bold">+15%</text>
                        </svg>
                      </div>
                    </div>
                    <ul className="space-y-1 mb-4">
                      {services[4].features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <CheckCircle2 className="h-3 w-3 text-[#2563EB] flex-shrink-0" />
                          <span className="line-clamp-1">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/contact">
                      <Button size="sm" className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs transition-all duration-300 group-hover:shadow-md group-hover:shadow-[#2563EB]/50">
                        Automatiser
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-muted/30 border-t">
          <div className="container text-center">
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
                <Button size="lg" className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 text-sm transition-all duration-300 hover:shadow-xl hover:shadow-[#2563EB]/50 hover:scale-105">
                  Demander un devis gratuit
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
