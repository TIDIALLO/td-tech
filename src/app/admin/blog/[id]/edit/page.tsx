import { BlogForm } from "@/components/admin/blog-form"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

async function getPost(id: string) {
  const post = await prisma.blogPost.findUnique({
    where: { id },
  })

  if (!post) {
    notFound()
  }

  return post
}

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = await getPost(id)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Modifier l&apos;article</h1>
        <p className="text-muted-foreground">{post.title}</p>
      </div>
      <BlogForm post={post} />
    </div>
  )
}
