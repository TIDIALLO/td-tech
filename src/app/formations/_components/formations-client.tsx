"use client"

import { ArrowRight, BookOpen, Clock, Download, PlayCircle, Star, Users } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { AuroraBackground } from "@/components/ui/aurora-background"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { CourseType } from "../types"

type Props = {
  courses: CourseType[]
}

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
}

export default function FormationsClient({ courses }: Props) {
  return (
    <>
      {/* Header Section */}
      <section className="relative min-h-[60vh] overflow-hidden">
        <AuroraBackground showRadialGradient className="absolute inset-0">
          <div className="container relative z-10 px-4 py-20 md:py-24">
            <div className="mx-auto max-w-4xl text-center">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="space-y-6"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Formation<span className="text-primary">s</span>
                </h1>
                <motion.p
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
                  className="text-lg md:text-xl text-foreground/85 max-w-3xl mx-auto"
                >
                  Formations complètes pour maîtriser le développement web, l&apos;IA et l&apos;automatisation.
                  Contenus concrets, supports pratiques, accompagnement clair.
                </motion.p>
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.45, delay: 0.18, ease: "easeOut" }}
                  className="flex flex-col items-center justify-center gap-3 sm:flex-row"
                >
                  <Button asChild size="lg">
                    <Link href="/contact">
                      Parler d&apos;un besoin <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/services">
                      Voir les services <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </AuroraBackground>
      </section>

      {/* Courses Grid */}
      <section className="relative overflow-hidden py-20">
        <div className="pointer-events-none absolute inset-0 opacity-45 [background-image:radial-gradient(circle,rgba(16,185,129,0.18)_1px,transparent_1px)] [background-size:28px_28px] animate-dots-drift" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
        <div className="container relative z-10">
          {courses.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-muted-foreground">Aucune formation disponible pour le moment.</p>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ staggerChildren: 0.08, delayChildren: 0.1 }}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {courses.map((course) => (
                <motion.div
                  key={course.id}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
                  }}
                >
                  <Card className="group h-full border-border/60 bg-background/85 text-foreground shadow-lg backdrop-blur hover:-translate-y-2 hover:shadow-xl transition-all duration-300 card-shine">
                    <CardHeader>
                      <div className="mb-3 inline-block w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary border border-primary/30">
                        {course.category || "WEB"}
                      </div>
                      <CardTitle className="text-xl mb-2">{course.title}</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        {course.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-primary" />
                          <span>{course.modules?.length || 1} modules</span>
                        </div>
                        {course.duration && (
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <span>{course.duration}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-primary" />
                          <span>Niveau: {course.level || "Intermédiaire"}</span>
                        </div>
                        {course.videos && course.videos.length > 0 && (
                          <div className="flex items-center gap-2">
                            <PlayCircle className="h-4 w-4 text-primary" />
                            <span>{course.videos.length} vidéos</span>
                          </div>
                        )}
                        {course.files && course.files.length > 0 && (
                          <div className="flex items-center gap-2">
                            <Download className="h-4 w-4 text-primary" />
                            <span>{course.files.length} fichiers</span>
                          </div>
                        )}
                      </div>

                      <Link href={`/formations/${course.slug}`}>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 group-hover:shadow-lg">
                          Voir la formation
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/20 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:radial-gradient(circle,rgba(16,185,129,0.14)_1px,transparent_1px)] [background-size:30px_30px] animate-dots-drift" />
        <div className="container relative z-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-primary">7+</div>
              <div className="text-sm text-muted-foreground">Formations disponibles</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-primary">150+</div>
              <div className="text-sm text-muted-foreground">Étudiants formés</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-primary">4.9</div>
              <div className="flex items-center justify-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <div className="text-sm text-muted-foreground">Note moyenne</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(circle,rgba(16,185,129,0.16)_1px,transparent_1px)] [background-size:30px_30px] animate-dots-drift" />
        <div className="container relative z-10 text-center">
          <h2 className="mb-4 text-3xl md:text-4xl font-bold">Prêt à développer vos compétences ?</h2>
          <p className="mb-8 text-lg text-muted-foreground max-w-2xl mx-auto">
            Rejoignez nos formations et maîtrisez les technologies les plus demandées du marché
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
            >
              Contacter pour plus d&apos;infos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}

