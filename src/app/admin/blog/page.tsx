import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Plus, Edit } from "lucide-react"
import { DeleteBlogButton } from "@/components/admin/delete-blog-button"
import { formatDate } from "@/lib/utils"

async function getPosts() {
  return await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  })
}

export default async function AdminBlogPage() {
  const posts = await getPosts()

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Articles de blog</h1>
          <p className="text-muted-foreground">
            Gérez vos articles de blog
          </p>
        </div>
        <Link href="/admin/blog/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nouvel article
          </Button>
        </Link>
      </div>

      {posts.length === 0 ? (
        <Card>
          <CardContent className="py-20 text-center">
            <p className="text-muted-foreground">Aucun article pour le moment</p>
            <Link href="/admin/blog/new">
              <Button className="mt-4">Créer votre premier article</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="mb-2 flex items-center justify-between">
                  <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    {post.category}
                  </span>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      post.published
                        ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                    }`}
                  >
                    {post.published ? "Publié" : "Brouillon"}
                  </span>
                </div>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {post.excerpt}
                </CardDescription>
                {post.publishedAt && (
                  <p className="text-xs text-muted-foreground">
                    {formatDate(post.publishedAt)}
                  </p>
                )}
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-secondary px-2 py-1 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="rounded-md bg-secondary px-2 py-1 text-xs">
                      +{post.tags.length - 3}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/blog/${post.id}/edit`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <Edit className="mr-2 h-4 w-4" />
                      Modifier
                    </Button>
                  </Link>
                  <DeleteBlogButton postId={post.id} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
