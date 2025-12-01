import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import { Calendar } from "lucide-react"

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
              <div className="py-20 text-center">
                <p className="text-muted-foreground">
                  Aucun article disponible pour le moment.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <Card key={post.id} className="flex flex-col">
                    <CardHeader>
                      <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{post.publishedAt ? formatDate(post.publishedAt) : ""}</span>
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

