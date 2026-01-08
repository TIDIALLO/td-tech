"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { slugify } from "@/lib/utils"
import { useUploadThing } from "@/lib/uploadthing"
import Image from "next/image"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string | null
  category: string
  tags: string[]
  published: boolean
  publishedAt: Date | null
}

interface BlogFormProps {
  post?: BlogPost
}

export function BlogForm({ post }: BlogFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [imageUrl, setImageUrl] = useState<string | null>(post?.image || null)
  const [uploading, setUploading] = useState(false)

  const { startUpload } = useUploadThing("blogImageUploader", {
    onClientUploadComplete: (res) => {
      setImageUrl(res[0].url)
      setUploading(false)
    },
    onUploadError: (error: Error) => {
      alert(`Upload failed: ${error.message}`)
      setUploading(false)
    },
  })

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const title = formData.get("title") as string
    const tags = (formData.get("tags") as string)
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)

    const published = formData.get("published") === "on"

    const data = {
      title,
      slug: slugify(title),
      excerpt: formData.get("excerpt"),
      content: formData.get("content"),
      image: imageUrl,
      category: formData.get("category"),
      tags,
      published,
      publishedAt: published ? new Date().toISOString() : null,
    }

    try {
      const url = post
        ? `/api/admin/blog/${post.id}`
        : "/api/admin/blog"
      const method = post ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la sauvegarde")
      }

      router.push("/admin/blog")
      router.refresh()
    } catch {
      setError("Une erreur est survenue")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Titre *</Label>
            <Input
              id="title"
              name="title"
              defaultValue={post?.title}
              required
            />
          </div>

          {/* Category + Image Upload */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="category">Catégorie *</Label>
              <select
                id="category"
                name="category"
                defaultValue={post?.category || "DEVELOPPEMENT"}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                required
              >
                <option value="DEVELOPPEMENT">Développement</option>
                <option value="IA">IA</option>
                <option value="AUTOMATISATION">Automatisation</option>
                <option value="OUTILS">Outils</option>
                <option value="TUTORIEL">Tutoriel</option>
              </select>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Image de couverture</Label>
              <div className="flex flex-col gap-2">
                {imageUrl && (
                  <div className="relative h-32 w-full">
                    <Image
                      src={imageUrl}
                      alt="Preview"
                      fill
                      className="rounded-md object-cover"
                    />
                  </div>
                )}
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      setUploading(true)
                      startUpload([file])
                    }
                  }}
                  disabled={uploading}
                />
                {uploading && (
                  <p className="text-sm text-muted-foreground">Upload en cours...</p>
                )}
              </div>
            </div>
          </div>

          {/* Excerpt */}
          <div className="space-y-2">
            <Label htmlFor="excerpt">Résumé (excerpt) *</Label>
            <Textarea
              id="excerpt"
              name="excerpt"
              defaultValue={post?.excerpt}
              rows={3}
              required
            />
          </div>

          {/* Content Markdown */}
          <div className="space-y-2">
            <Label htmlFor="content">Contenu (Markdown) *</Label>
            <Textarea
              id="content"
              name="content"
              defaultValue={post?.content}
              rows={15}
              className="font-mono text-sm"
              placeholder="# Titre

Votre contenu en Markdown..."
              required
            />
            <p className="text-xs text-muted-foreground">
              Utilisez la syntaxe Markdown. Prévisualisé sur le frontend avec ReactMarkdown.
            </p>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (séparés par des virgules) *</Label>
            <Input
              id="tags"
              name="tags"
              defaultValue={post?.tags?.join(", ")}
              placeholder="Next.js, TypeScript, Tutorial"
              required
            />
          </div>

          {/* Published checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="published"
              name="published"
              defaultChecked={post?.published ?? false}
              className="h-4 w-4 rounded border-gray-300"
            />
            <Label htmlFor="published" className="cursor-pointer">
              Publier immédiatement
            </Label>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-400">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <Button type="submit" disabled={loading || uploading}>
              {loading ? "Enregistrement..." : post ? "Mettre à jour" : "Créer"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Annuler
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
