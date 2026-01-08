import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar } from "lucide-react"
import { formatDate } from "@/lib/utils"
import ReactMarkdown from "react-markdown"
import Image from "next/image"

export async function generateStaticParams() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true },
    })

    return posts.map((post) => ({
      slug: post.slug,
    }))
  } catch {
    return []
  }
}

async function getPost(slug: string) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug, published: true },
    })

    if (!post) {
      notFound()
    }

    return post
  } catch {
    notFound()
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <section className="border-b bg-muted/50 py-12">
          <div className="container max-w-4xl">
            <Link href="/blog">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour au blog
              </Button>
            </Link>

            {post.image && (
              <div className="mb-6 relative h-96 w-full overflow-hidden rounded-lg">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="mb-4 flex items-center gap-4">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                {post.category}
              </span>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{post.publishedAt ? formatDate(post.publishedAt) : ""}</span>
              </div>
            </div>

            <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
            <p className="text-lg text-muted-foreground">{post.excerpt}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-secondary px-3 py-1 text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container max-w-4xl">
            <article className="prose prose-zinc dark:prose-invert max-w-none">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

