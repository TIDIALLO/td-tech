import { BlogForm } from "@/components/admin/blog-form"

export default function NewBlogPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Nouvel article</h1>
        <p className="text-muted-foreground">
          Créez un nouvel article de blog
        </p>
      </div>
      <BlogForm />
    </div>
  )
}
