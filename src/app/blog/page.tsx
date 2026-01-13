import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import { Calendar, ArrowRight, Sparkles, Zap, Code, Bot, TrendingUp } from "lucide-react"
import Image from "next/image"

export const metadata = {
  title: "Blog - Synap6ia | Actualités IA, Automatisation & Développement Web",
  description: "Découvrez nos articles hebdomadaires sur l'intelligence artificielle, l'automatisation des processus et le développement web moderne. Conseils d'experts et retours d'expérience.",
  keywords: ["blog IA", "automatisation", "développement web", "Next.js", "n8n", "agents IA", "tech"],
  openGraph: {
    title: "Blog Synap6ia - Expertise Tech & IA",
    description: "Articles hebdomadaires sur l'IA, l'automatisation et le développement web moderne.",
    type: "website",
  },
}

const categories = [
  { name: "Tous", slug: "all", icon: Sparkles, color: "bg-gradient-to-r from-primary to-primary/70" },
  { name: "Intelligence Artificielle", slug: "ia", icon: Bot, color: "bg-gradient-to-r from-purple-500 to-pink-500" },
  { name: "Automatisation", slug: "automatisation", icon: Zap, color: "bg-gradient-to-r from-amber-500 to-orange-500" },
  { name: "Développement Web", slug: "web", icon: Code, color: "bg-gradient-to-r from-blue-500 to-cyan-500" },
  { name: "Business & Stratégie", slug: "business", icon: TrendingUp, color: "bg-gradient-to-r from-green-500 to-emerald-500" },
]

async function getPosts() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
    })
    return posts
  } catch {
    return []
  }
}

async function getFeaturedPost() {
  try {
    const post = await prisma.blogPost.findFirst({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
    })
    return post
  } catch {
    return null
  }
}

export default async function BlogPage() {
  const posts = await getPosts()
  const featuredPost = await getFeaturedPost()
  const regularPosts = posts.slice(1)

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b bg-gradient-to-br from-background via-background to-muted/50 py-16 md:py-24">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="container relative">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4" />
                Nouveau contenu chaque semaine
              </div>
              <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Le Blog <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Synap6ia</span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
                Plongez dans l&apos;univers de l&apos;IA, de l&apos;automatisation et du développement web moderne.
                Des articles concrets, des tutoriels pratiques et des retours d&apos;expérience pour transformer votre business.
              </p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="border-b bg-muted/30 py-6">
          <div className="container">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <button
                    key={category.slug}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all hover:scale-105 ${
                      category.slug === "all"
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground border"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {category.name}
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container">
            {posts.length === 0 ? (
              /* Empty State - Coming Soon */
              <div className="py-16">
                <Card className="mx-auto max-w-3xl border-2 border-dashed border-primary/20 bg-gradient-to-br from-background to-muted/30">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <Sparkles className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl md:text-3xl">Les articles arrivent bientôt</CardTitle>
                    <CardDescription className="mx-auto max-w-lg text-base">
                      Je prépare des contenus de qualité : guides pratiques sur l&apos;IA, tutoriels d&apos;automatisation avec n8n,
                      retours d&apos;expérience sur des projets réels, et bonnes pratiques de développement.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-8 grid gap-4 md:grid-cols-3">
                      <div className="rounded-lg bg-purple-500/10 p-4 text-center">
                        <Bot className="mx-auto mb-2 h-6 w-6 text-purple-500" />
                        <p className="text-sm font-medium">Agents IA</p>
                        <p className="text-xs text-muted-foreground">Création & déploiement</p>
                      </div>
                      <div className="rounded-lg bg-amber-500/10 p-4 text-center">
                        <Zap className="mx-auto mb-2 h-6 w-6 text-amber-500" />
                        <p className="text-sm font-medium">Automatisation</p>
                        <p className="text-xs text-muted-foreground">Workflows n8n</p>
                      </div>
                      <div className="rounded-lg bg-blue-500/10 p-4 text-center">
                        <Code className="mx-auto mb-2 h-6 w-6 text-blue-500" />
                        <p className="text-sm font-medium">Développement</p>
                        <p className="text-xs text-muted-foreground">Next.js & React</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                      <Link href="/contact">
                        <Button size="lg" className="w-full sm:w-auto">
                          Être notifié des nouveaux articles
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href="/services">
                        <Button variant="outline" size="lg" className="w-full sm:w-auto">
                          Découvrir nos services
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <>
                {/* Featured Article */}
                {featuredPost && (
                  <div className="mb-16">
                    <div className="mb-6 flex items-center gap-2">
                      <div className="h-px flex-1 bg-border" />
                      <span className="text-sm font-medium text-muted-foreground">Article à la une</span>
                      <div className="h-px flex-1 bg-border" />
                    </div>
                    <Link href={`/blog/${featuredPost.slug}`}>
                      <Card className="group overflow-hidden border-2 transition-all hover:border-primary/50 hover:shadow-xl">
                        <div className="grid gap-0 md:grid-cols-2">
                          <div className="relative h-64 md:h-full">
                            {featuredPost.image ? (
                              <Image
                                src={featuredPost.image}
                                alt={featuredPost.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                                <Sparkles className="h-16 w-16 text-primary/50" />
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col justify-center p-8">
                            <div className="mb-4 flex items-center gap-4">
                              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                                {featuredPost.category}
                              </span>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>{featuredPost.publishedAt ? formatDate(featuredPost.publishedAt) : ""}</span>
                              </div>
                            </div>
                            <h2 className="mb-3 text-2xl font-bold transition-colors group-hover:text-primary md:text-3xl">
                              {featuredPost.title}
                            </h2>
                            <p className="mb-6 text-muted-foreground">
                              {featuredPost.excerpt}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {featuredPost.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-md bg-secondary px-2 py-1 text-xs"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <div className="mt-6">
                              <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                                Lire l&apos;article
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </div>
                )}

                {/* Articles Grid */}
                {regularPosts.length > 0 && (
                  <>
                    <div className="mb-8 flex items-center gap-2">
                      <div className="h-px flex-1 bg-border" />
                      <span className="text-sm font-medium text-muted-foreground">Tous les articles</span>
                      <div className="h-px flex-1 bg-border" />
                    </div>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                      {regularPosts.map((post) => (
                        <Link key={post.id} href={`/blog/${post.slug}`}>
                          <Card className="group flex h-full flex-col overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg">
                            <div className="relative h-48 overflow-hidden">
                              {post.image ? (
                                <Image
                                  src={post.image}
                                  alt={post.title}
                                  fill
                                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                              ) : (
                                <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                                  <Sparkles className="h-12 w-12 text-primary/50" />
                                </div>
                              )}
                            </div>
                            <CardHeader className="flex-1">
                              <div className="mb-3 flex items-center gap-3">
                                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                  {post.category}
                                </span>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Calendar className="h-3 w-3" />
                                  <span>{post.publishedAt ? formatDate(post.publishedAt) : ""}</span>
                                </div>
                              </div>
                              <CardTitle className="line-clamp-2 transition-colors group-hover:text-primary">
                                {post.title}
                              </CardTitle>
                              <CardDescription className="line-clamp-3">
                                {post.excerpt}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <div className="mb-4 flex flex-wrap gap-2">
                                {post.tags.slice(0, 3).map((tag) => (
                                  <span
                                    key={tag}
                                    className="rounded-md bg-secondary px-2 py-1 text-xs"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                                Lire l&apos;article
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                              </span>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </section>

        {/* Newsletter CTA Section */}
        <section className="border-t bg-gradient-to-br from-primary/5 via-background to-primary/10 py-16">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4" />
                Newsletter hebdomadaire
              </div>
              <h2 className="mb-4 text-3xl font-bold">
                Ne manquez aucun article
              </h2>
              <p className="mb-8 text-muted-foreground">
                Recevez chaque semaine nos meilleurs contenus sur l&apos;IA, l&apos;automatisation et le développement web.
                Des conseils pratiques directement dans votre boîte mail.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link href="/contact">
                  <Button size="lg" className="w-full sm:w-auto">
                    S&apos;inscrire à la newsletter
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Pas de spam. Désabonnement en un clic.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
