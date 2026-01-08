import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import { Calendar } from "lucide-react"
import Image from "next/image"

export const metadata = {
  title: "Blog - Tidiane Diallo",
  description: "Articles sur le développement web, l'automatisation IA et les technologies modernes.",
}

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

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <section className="border-b bg-muted/50 py-12">
          <div className="container">
            <h1 className="mb-4 text-4xl font-bold">Blog</h1>
            <p className="text-lg text-muted-foreground">
              Découvrez mes articles sur le développement web et l&apos;automatisation
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            {posts.length === 0 ? (
              <div className="py-16">
                <Card className="max-w-2xl mx-auto text-center border-dashed">
                  <CardHeader>
                    <CardTitle>Les articles arrivent bientôt</CardTitle>
                    <CardDescription>
                      Je prépare des contenus concrets (guides pratiques, retours d&apos;expérience, bonnes pratiques). Inscrivez-vous pour être prévenu dès la sortie.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Link href="/contact">
                      <Button>Être notifié</Button>
                    </Link>
                    <Link href="/services">
                      <Button variant="outline">Voir les services</Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <Card key={post.id} className="flex flex-col">
                    <CardHeader>
                      {post.image && (
                        <div className="mb-4 relative h-48 w-full overflow-hidden rounded-md">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{post.publishedAt ? formatDate(post.publishedAt) : ""}</span>
                      </div>
                      <div className="mb-2">
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          {post.category}
                        </span>
                      </div>
                      <CardTitle>{post.title}</CardTitle>
                      <CardDescription>{post.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-end">
                      <div className="mb-4 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-secondary px-2 py-1 text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link href={`/blog/${post.slug}`}>
                        <Button variant="outline" className="w-full">
                          Lire l&apos;article
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

