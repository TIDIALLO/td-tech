import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { CheckCircle2, Users, Star, Calendar, MessageSquare, BarChart3, MessageCircle, HeadphonesIcon } from "lucide-react"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-br from-background via-blue-50/30 to-background dark:from-background dark:via-blue-950/10 dark:to-background">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(37,99,235,0.08),transparent_50%)]" />
          <div className="container relative z-10">
            <div className="grid gap-4 lg:grid-cols-2 lg:gap-6 items-center max-w-7xl mx-auto px-4">
              {/* Left Content */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
                    Des solutions modernes pour vos{" "}
                    <span className="text-[#2563EB] bg-gradient-to-r from-[#2563EB] to-[#3B82F6] bg-clip-text text-transparent">ambitions digitales</span>.
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Propulsons votre projet au niveau supérieur.
                  </p>
                </div>

                {/* Email Form */}
                <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                  <Input 
                    type="email" 
                    placeholder="Votre meilleure adresse email" 
                    className="flex-1"
                  />
                  <Button size="default" className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    Rejoindre
                  </Button>
                </div>
              </div>

              {/* Right Image - Réduite */}
              <div className="relative flex justify-center lg:justify-start">
                <div className="relative w-full max-w-xl mx-auto lg:mx-0 animate-fade-in-right">
                  {/* Gradient Background Effect - Bleu */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-[#2563EB]/30 via-[#3B82F6]/20 to-transparent rounded-3xl blur-3xl opacity-60 animate-pulse" />
                  
                  {/* Image Container with Border Gradient - Bleu */}
                  <div className="relative rounded-3xl bg-gradient-to-br from-[#2563EB]/20 via-background to-[#3B82F6]/10 p-2 transform hover:scale-[1.02] transition-transform duration-500">
                    <div className="relative rounded-3xl overflow-hidden bg-background shadow-2xl">
                      <Image
                        src="/images/diallo.png"
                        alt="Tidiane Diallo - Développeur Fullstack & Expert IA"
                        width={600}
                        height={750}
                        className="object-cover w-full h-auto animate-float"
                        priority
                        quality={95}
                      />
                      {/* Subtle Overlay Gradient - Bleu */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>

                  {/* Floating Badge - Bleu */}
                  <div className="absolute -bottom-4 -left-4 bg-background border-2 border-[#2563EB]/30 rounded-xl px-4 py-2 shadow-xl backdrop-blur-sm animate-fade-in-up">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 bg-[#2563EB] rounded-full animate-pulse" />
                      <span className="text-xs font-semibold text-[#2563EB]">Disponible pour projets</span>
                    </div>
                  </div>

                  {/* Decorative Elements - Bleu */}
                  <div className="absolute -top-6 -right-6 h-32 w-32 bg-[#2563EB]/20 rounded-full blur-3xl animate-pulse" />
                  <div className="absolute -bottom-12 -right-12 h-40 w-40 bg-[#3B82F6]/10 rounded-full blur-3xl animate-pulse delay-300" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y bg-muted/30 py-12">
          <div className="container">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="text-center">
                <div className="mb-2 text-2xl font-bold text-[#2563EB]">13+</div>
                <div className="text-sm text-muted-foreground">Années d&apos;Expérience</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-2xl font-bold text-[#2563EB]">9+</div>
                <div className="text-sm text-muted-foreground">Années en Ligne</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-2xl font-bold text-[#2563EB]">2310+</div>
                <div className="text-sm text-muted-foreground">Membres Actifs</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-2xl font-bold text-[#2563EB]">5125+</div>
                <div className="text-sm text-muted-foreground">Avis 5 Étoiles</div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gradient-to-b from-background via-blue-50/20 to-background dark:from-background dark:via-blue-950/5 dark:to-background relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.05),transparent_50%)]" />
          <div className="container relative z-10">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="relative">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                    <Users className="h-8 w-8" />
                  </div>
                  <div className="mb-2 flex justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="mb-4 text-sm text-muted-foreground">
                    Le style d&apos;enseignement de Tidiane est engageant et facile à suivre. 
                    Il explique des concepts complexes de manière concise et fournit de nombreux 
                    exemples et exercices pour vous aider à apprendre.
                  </p>
                  <p className="font-semibold">Omar</p>
                </CardContent>
              </Card>

              <Card className="relative">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                    <Users className="h-8 w-8" />
                  </div>
                  <div className="mb-2 flex justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="mb-4 text-sm text-muted-foreground">
                    Tidiane est un entrepreneur incroyable, en plus d&apos;être un excellent enseignant. 
                    Il incarne quelqu&apos;un qui apporte une réelle valeur et propose une éducation 
                    de qualité avec des exemples clairs et concis.
                  </p>
                  <p className="font-semibold">Bob Trussdale</p>
                </CardContent>
              </Card>

              <Card className="relative">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                    <Users className="h-8 w-8" />
                  </div>
                  <div className="mb-2 flex justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="mb-4 text-sm text-muted-foreground">
                    Je suis impressionné par vous. Vous êtes une source constante de générosité. 
                    Vous et vos efforts sont quelque chose de beau à voir. Merci.
                  </p>
                  <p className="font-semibold">James Ruff</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="border-t bg-gradient-to-br from-muted/40 via-blue-50/20 to-muted/40 dark:from-muted/40 dark:via-blue-950/5 dark:to-muted/40 py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(37,99,235,0.06),transparent_50%)]" />
          <div className="container relative z-10">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="relative flex justify-center lg:justify-start">
                <div className="relative w-full max-w-md">
                  {/* Gradient Background Effect */}
                  <div className="absolute -inset-3 bg-gradient-to-br from-[#2563EB]/20 via-[#3B82F6]/10 to-transparent rounded-2xl blur-2xl opacity-60" />
                  
                  {/* Image Container - Réduite */}
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#2563EB]/10 via-background to-[#3B82F6]/5 p-1.5 shadow-xl">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted/50">
                      <Image
                        src="/images/diallo.png"
                        alt="Tidiane Diallo - Développeur Fullstack & Expert IA"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 400px"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
                    </div>
                    
                    {/* Badge d'expérience - Réduit */}
                    <div className="absolute -bottom-4 -right-4 rounded-xl bg-background/95 backdrop-blur-sm px-4 py-2 shadow-lg border border-[#2563EB]/30">
                      <p className="text-xs font-semibold flex items-center gap-1.5">
                        <span className="text-xl font-bold text-[#2563EB]">13+</span>
                        <span className="text-[10px]">Années</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl font-bold md:text-4xl">
                  Apprenez d&apos;une Expérience du Monde Réel
                </h2>
                <p className="text-lg text-muted-foreground">
                  Avec 13 ans dans la tech et plus de 9 ans à construire des entreprises en ligne 
                  réussies, j&apos;ai développé un système éprouvé pour le succès entrepreneurial digital.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#2563EB] mt-0.5 flex-shrink-0" />
                    <span>Expertise technique en développement et automatisation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#2563EB] mt-0.5 flex-shrink-0" />
                    <span>Plusieurs startups en ligne réussies</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#2563EB] mt-0.5 flex-shrink-0" />
                    <span>Stratégies de monétisation éprouvées</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#2563EB] mt-0.5 flex-shrink-0" />
                    <span>Approche de mentorat pratique</span>
                  </li>
                </ul>
                <Link href="/about">
                  <Button size="lg" className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-lg hover:shadow-xl transition-all duration-300">
                    En savoir plus sur mon parcours
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="py-20 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(37,99,235,0.06),transparent_50%)]" />
          <div className="container relative z-10">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Rejoignez Notre Communauté Florissante
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Connectez-vous avec plus de 1150 entrepreneurs digitaux, partagez vos expériences, 
                et obtenez un soutien direct sur votre chemin vers le succès.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <Users className="mx-auto mb-3 h-10 w-10 text-[#2563EB]" />
                  <CardTitle className="text-lg">Fil Communautaire</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Partagez vos mises à jour et connectez-vous avec d&apos;autres entrepreneurs
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <MessageSquare className="mx-auto mb-3 h-10 w-10 text-[#2563EB]" />
                  <CardTitle className="text-lg">Forums de Discussion</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Engagez des discussions sur les affaires et la croissance
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <BarChart3 className="mx-auto mb-3 h-10 w-10 text-[#2563EB]" />
                  <CardTitle className="text-lg">Partagez vos Résultats</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Partagez vos progrès et obtenez des retours de la communauté
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <HeadphonesIcon className="mx-auto mb-3 h-10 w-10 text-[#2563EB]" />
                  <CardTitle className="text-lg">Support Direct</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Obtenez des conseils personnalisés via messagerie privée
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t bg-gradient-to-br from-muted/40 via-blue-50/30 to-muted/40 dark:from-muted/40 dark:via-blue-950/10 dark:to-muted/40 py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(37,99,235,0.08),transparent_50%)]" />
          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Commencez Votre Parcours d&apos;Entrepreneuriat Digital Aujourd&apos;hui
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Choisissez votre chemin vers le succès
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href="/newsletter">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Rejoindre la Newsletter
                  </Button>
                </Link>
                <Link href="/community">
                  <Button size="lg" className="w-full sm:w-auto bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-lg hover:shadow-xl transition-all duration-300">
                    Rejoindre la Communauté
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

