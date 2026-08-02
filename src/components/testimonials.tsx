"use client"

import Image from "next/image"
import { Code2, Quote } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

// Citations à valider avec les intéressés avant publication définitive :
// ce sont des formulations provisoires, pas des propos vérifiés mot pour mot.

// Pierre Dieng (France) est le client ayant commandé les deux applications ci-dessous.
const clientTestimonials = [
  {
    quote:
      "Tidiane a livré une application robuste et bien pensée pour Kheops Consulting, avec un vrai souci du détail et une communication fluide du cadrage à la mise en production.",
    name: "Pierre Dieng",
    role: "Client",
    company: "Kheops Consulting",
    logo: "/images/clients/kheops-consulting.png",
    href: "https://www.kheops-consulting.com/",
  },
  {
    quote:
      "Sur le projet Thercal Energies, un travail sérieux et une architecture propre. Tidiane comprend vite les besoins métier et livre du code maintenable sur lequel on peut itérer sereinement.",
    name: "Pierre Dieng",
    role: "Client",
    company: "Thercal Energies",
    logo: "/images/clients/thercal-energies.png",
    href: "https://thercalenergies.com/",
  },
]

// Pape Diouf et Ibrahima DIAW ne sont pas liés à Kheops/Thercal : ce sont des témoignages
// de pairs sur les compétences générales de développeur et de créateur de solutions.
const peerTestimonials = [
  {
    quote:
      "Tidiane a une vraie capacité à cadrer un besoin flou et à livrer une solution technique propre. C'est un développeur sur qui on peut compter pour aller vite sans sacrifier la qualité.",
    name: "Pape Diouf",
    role: "Expert Microsoft 365",
  },
  {
    quote:
      "J'ai pu échanger avec Tidiane sur plusieurs sujets techniques : sa rigueur en architecture et sa capacité à passer du besoin métier au code maintenable font la différence.",
    name: "Ibrahima DIAW",
    role: "Développeur Senior .NET/C# Fullstack",
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
}

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
}

export function Testimonials() {
  return (
    <section id="temoignages" className="relative overflow-hidden py-20 md:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(circle,rgba(16,185,129,0.16)_1px,transparent_1px)] [background-size:26px_26px]" />
      <div className="container relative z-10 px-4">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4 }}
            className="mb-3 inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-xs font-semibold text-primary shadow-sm backdrop-blur"
          >
            Ils m&apos;ont fait confiance
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="text-3xl md:text-4xl font-bold"
          >
            Témoignages
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            Des applications livrées pour des clients exigeants, et des retours de pairs sur la qualité du travail.
          </motion.p>
        </div>

        {/* Témoignages clients */}
        <div className="mx-auto mb-10 grid max-w-5xl gap-6 md:grid-cols-2">
          {clientTestimonials.map((t, idx) => (
            <motion.div
              key={`${t.name}-${t.company}`}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
            >
              <Card className="card-shine h-full border-border/60 bg-background/80 shadow-lg backdrop-blur">
                <CardContent className="flex h-full flex-col gap-6 p-6 md:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <Quote className="h-8 w-8 flex-shrink-0 text-primary/40" />
                    <a
                      href={t.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-32 items-center justify-end opacity-90 transition-opacity hover:opacity-100"
                      aria-label={t.company}
                    >
                      <Image
                        src={t.logo}
                        alt={`Logo ${t.company}`}
                        width={128}
                        height={48}
                        className="h-full w-auto object-contain"
                      />
                    </a>
                  </div>

                  <p className="flex-1 text-foreground/90 leading-relaxed">&laquo; {t.quote} &raquo;</p>

                  <div className="flex items-center gap-3 border-t border-border/60 pt-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {initials(t.name)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {t.role} · {t.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Témoignages de pairs (compétences dev, non liés à un client) */}
        <div className="mx-auto max-w-5xl">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4 }}
            className="mb-4 text-center text-sm font-semibold uppercase tracking-wide text-muted-foreground"
          >
            Ce que disent mes pairs
          </motion.p>
          <div className="grid gap-6 md:grid-cols-2">
            {peerTestimonials.map((t, idx) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
              >
                <Card className="card-shine h-full border-border/60 bg-background/60 shadow-md backdrop-blur">
                  <CardContent className="flex h-full flex-col gap-6 p-6 md:p-8">
                    <Code2 className="h-7 w-7 flex-shrink-0 text-primary/40" />

                    <p className="flex-1 text-foreground/90 leading-relaxed">&laquo; {t.quote} &raquo;</p>

                    <div className="flex items-center gap-3 border-t border-border/60 pt-4">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {initials(t.name)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
