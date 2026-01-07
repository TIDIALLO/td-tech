"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  ArrowRight,
  Bot,
  Code,
  GraduationCap,
  LineChart,
  ShieldCheck,
  Workflow,
} from "lucide-react"
import { BookingCalendar } from "@/components/booking-calendar"
import { AuroraBackground } from "@/components/ui/aurora-background"
import { motion } from "framer-motion"

export default function HomeClient() {
  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
  }

  const services = [
    {
      icon: Code,
      title: "Création d'applications web",
      desc: "Sites et applications Next.js modernes, rapides, SEO-ready et maintenables.",
      bullets: ["Design & UX pro", "Performance & SEO", "Qualité production"],
      href: "/services",
    },
    {
      icon: Workflow,
      title: "Automatisation n8n",
      desc: "Workflows fiables (CRM, e-mails, reporting, data) pour gagner du temps chaque semaine.",
      bullets: ["Intégrations API", "Logs & monitoring", "Sécurité & droits"],
      href: "/services",
    },
    {
      icon: Bot,
      title: "Agents IA",
      desc: "Assistants IA utiles (support, sales, ops) intégrés à vos outils, avec garde-fous.",
      bullets: ["RAG & bases métiers", "Déploiement sécurisé", "Mesure d'impact"],
      href: "/services",
    },
    {
      icon: GraduationCap,
      title: "Formations",
      desc: "Formation IA + dev (Next.js/Python) pour rendre vos équipes autonomes rapidement.",
      bullets: ["Cas concrets", "Supports & exercices", "Suivi post-formation"],
      href: "/formations",
    },
  ] as const

  const techStack = [
    { name: "n8n", logo: "https://cdn.simpleicons.org/n8n/ff6b6b" },
    { name: "Python", logo: "https://cdn.simpleicons.org/python/3776ab" },
    { name: ".NET", logo: "https://cdn.simpleicons.org/dotnet/512bd4" },
    { name: "C#", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-line.svg" },
    { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "React", logo: "https://cdn.simpleicons.org/react/61dafb" },
    { name: "Next.js", logo: "https://cdn.simpleicons.org/nextdotjs/ffffff", darkBg: true },
    { name: "TypeScript", logo: "https://cdn.simpleicons.org/typescript/3178c6" },
    { name: "JavaScript", logo: "https://cdn.simpleicons.org/javascript/f7df1e" },
    { name: "Node.js", logo: "https://cdn.simpleicons.org/nodedotjs/339933" },
    { name: "PostgreSQL", logo: "https://cdn.simpleicons.org/postgresql/4169e1" },
    { name: "Tailwind CSS", logo: "https://cdn.simpleicons.org/tailwindcss/38bdf8" },
    { name: "Azure", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
    { name: "Supabase", logo: "https://cdn.simpleicons.org/supabase/3ecf8e" },
    { name: "MySQL", logo: "https://cdn.simpleicons.org/mysql/4479a1" },
    { name: "SQL Server", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg" },
    { name: "Blazor", logo: "https://cdn.simpleicons.org/blazor/512bd4" },
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen font-semibold text-foreground">
        {/* HERO */}
        <section className="relative min-h-[90vh] overflow-hidden">
          <AuroraBackground showRadialGradient className="absolute inset-0">
            <div className="container relative z-20 px-4 py-16 sm:py-20 md:py-24 lg:py-28">
              <div className="mx-auto max-w-5xl text-center">
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  className="space-y-6"
                >
                  <div className="mx-auto inline-flex items-center gap-2 rounded-full border bg-background/70 px-4 py-2 text-sm text-muted-foreground shadow-sm backdrop-blur">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    Livraison pro • Design sobre • Résultats mesurables
                  </div>

                  <motion.h1
                    className="text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight"
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    Nous modernisons et créons des{" "}
                    <motion.span
                      className="inline-block bg-gradient-to-r from-primary via-sky-400 to-emerald-400 bg-clip-text text-transparent"
                      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                      transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                      style={{ backgroundSize: "200% 200%" }}
                    >
                      solutions digitales
                    </motion.span>
                  </motion.h1>

                  <motion.p
                    className="mx-auto max-w-3xl text-pretty text-base sm:text-lg md:text-xl text-foreground/85"
                    animate={{ opacity: [0.8, 1, 0.9, 1] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    Applications web, automatisations n8n, agents IA et formations — pensés pour des équipes
                    qui veulent aller vite, sans dette technique.
                  </motion.p>

                  <p className="mx-auto max-w-3xl text-pretty text-sm md:text-base text-muted-foreground leading-relaxed">
                    Nous aidons les PME, startups et équipes internes à automatiser, livrer vite et scaler sans dette
                    technique.
                  </p>
                </motion.div>

                {/* Un seul CTA principal */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
                  className="mt-10 flex flex-col items-center justify-center gap-3"
                >
                  <Button asChild size="lg" className="px-8">
                    <Link href="/contact">
                      Démarrer un projet <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Link href="#services" className="text-sm font-semibold text-muted-foreground hover:text-foreground">
                    Voir les services
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3"
                >
                  {[
                    { k: "Réponse", v: "< 24h" },
                    { k: "Cadence", v: "1–2 semaines" },
                    { k: "Qualité", v: "prod-ready" },
                  ].map((item) => (
                    <div
                      key={item.k}
                      className="rounded-xl border bg-background/60 px-4 py-3 text-left shadow-sm backdrop-blur"
                    >
                      <div className="text-xs text-muted-foreground">{item.k}</div>
                      <div className="text-base font-semibold">{item.v}</div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </AuroraBackground>
        </section>

        {/* SERVICES (4 piliers) */}
        <section id="services" className="relative overflow-hidden py-24">
          <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(circle,rgba(16,185,129,0.16)_1px,transparent_1px)] [background-size:26px_26px] animate-dots-drift" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />

          <div className="container relative px-4">
            <div className="mx-auto mb-14 max-w-3xl text-center">
              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.45 }}
                className="text-4xl font-bold md:text-5xl"
              >
                Services structurés, livrables clairs
              </motion.h2>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.45, delay: 0.05 }}
                className="mt-4 text-lg text-muted-foreground"
              >
                Un cadre simple : on mesure, on livre, on améliore. Pas de “bling”, juste du résultat.
              </motion.p>
            </div>

            <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
              {services.map((s, idx) => {
                const Icon = s.icon
                return (
                  <motion.div
                    key={s.title}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.45, delay: idx * 0.06 }}
                  >
                    <Card className="card-shine glow-on-hover border-border/60 bg-background/80 shadow-lg backdrop-blur">
                      <CardHeader className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl border bg-primary/10 text-primary">
                            <Icon className="h-6 w-6" />
                          </div>
                          <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground">
                            <Link href={s.href}>
                              Détails <ArrowRight className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                        <CardTitle className="text-2xl">{s.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-foreground/85">{s.desc}</p>
                        <ul className="grid gap-2 text-sm text-muted-foreground">
                          {s.bullets.map((b) => (
                            <li key={b} className="flex items-center gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* TECH STACK */}
        <section className="relative overflow-hidden py-20 bg-gradient-to-b from-background via-muted/40 to-background">
          <div className="absolute inset-0 pointer-events-none opacity-40 [background-image:radial-gradient(circle,rgba(16,185,129,0.16)_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="container relative px-4 space-y-10">
            <div className="mx-auto max-w-3xl text-center space-y-3">
              <p className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-xs font-semibold text-primary shadow-sm backdrop-blur">
                Stack moderne & interopérable
              </p>
              <h2 className="text-3xl md:text-4xl font-bold">Technos maîtrisées</h2>
              <p className="text-muted-foreground">
                Un socle éprouvé pour livrer vite et propre : front, back, data, automation et IA.
              </p>
            </div>

            <div className="relative space-y-6">
              {[0, 1].map((row) => (
                <div key={row} className="overflow-hidden">
                  <div className="flex items-center gap-4 tech-marquee" data-direction={row === 1 ? "reverse" : "normal"}>
                    {[...techStack, ...techStack].map((tech, idx) => (
                      <div
                        key={`${tech.name}-${idx}-${row}`}
                        className="flex items-center gap-3 rounded-xl border bg-background/80 px-4 py-3 shadow-sm backdrop-blur hover:-translate-y-1 hover:shadow-md transition-transform duration-300"
                      >
                        <div
                          className={`h-10 w-10 rounded-lg flex items-center justify-center border ${tech.darkBg ? "bg-slate-900" : "bg-white"}`}
                        >
                          <img
                            src={tech.logo}
                            alt={tech.name}
                            className={`h-6 w-6 object-contain ${tech.darkBg ? "invert" : ""}`}
                            loading="lazy"
                            crossOrigin="anonymous"
                          />
                        </div>
                        <span className="text-sm font-semibold text-foreground">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <style jsx>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .tech-marquee {
              width: max-content;
              animation: marquee 26s linear infinite;
            }
            .tech-marquee[data-direction="reverse"] {
              animation-direction: reverse;
              animation-duration: 30s;
            }
          `}</style>
        </section>

        {/* NOTRE APPROCHE */}
        <section id="approche" className="relative overflow-hidden py-20 bg-muted/30">
          <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:radial-gradient(circle,rgba(16,185,129,0.18)_1px,transparent_1px)] [background-size:26px_26px]" />
          <div className="container relative px-4">
            <div className="mx-auto max-w-4xl text-center space-y-4 mb-12">
              <p className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-xs font-semibold text-primary shadow-sm backdrop-blur">
                Notre approche
              </p>
              <h2 className="text-3xl md:text-4xl font-bold">
                Une méthodologie claire, <span className="text-primary">du cadrage à la livraison</span>
              </h2>
              <p className="text-muted-foreground text-base">
                Une démarche simple : on clarifie le besoin, on construit proprement, on mesure l’impact, puis on itère.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: "01",
                  title: "Discovery",
                  desc: "On comprend ton contexte, tes objectifs et tes contraintes pour prioriser ce qui crée de la valeur.",
                },
                {
                  step: "02",
                  title: "Strategy",
                  desc: "On transforme ça en plan concret : livrables, jalons, délais, KPI et risques.",
                },
                {
                  step: "03",
                  title: "Build",
                  desc: "On développe avec une qualité production : perf, SEO, sécurité, tests et déploiement.",
                },
                {
                  step: "04",
                  title: "Integration",
                  desc: "On intègre dans tes outils (CRM, email, data), puis on améliore avec des retours mesurés.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="group relative overflow-hidden rounded-xl border border-border/60 bg-background/80 backdrop-blur shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-primary/12 via-emerald-300/10 to-sky-400/10" />
                  <div className="relative flex flex-col items-center gap-4 p-6 text-center">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/15 text-primary font-bold shadow-sm group-hover:scale-105 transition-transform duration-300">
                      {item.step}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Booking */}
        <section id="booking" className="py-24 relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(circle,rgba(16,185,129,0.14)_1px,transparent_1px)] [background-size:30px_30px] animate-dots-drift" />
          <div className="container px-4">
            <div className="max-w-6xl mx-auto">
              <div className="mb-12 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Évaluation gratuite (15 min)</h2>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                  On clarifie votre besoin, on propose une piste concrète, puis on définit les prochaines étapes.
                </p>
              </div>

              <Card className="bg-background/85 backdrop-blur-sm border-border/60 shadow-2xl">
                <CardContent className="p-8 md:p-12">
                  <BookingCalendar />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

