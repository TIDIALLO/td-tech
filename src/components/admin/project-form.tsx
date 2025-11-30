"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { slugify } from "@/lib/utils"

interface Project {
  id: string
  title: string
  slug: string
  description: string
  content: string
  category: string
  technologies: string[]
  githubUrl?: string | null
  liveUrl?: string | null
  published: boolean
  featured: boolean
}

interface ProjectFormProps {
  project?: Project
}

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const title = formData.get("title") as string
    const technologies = (formData.get("technologies") as string)
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)

    const data = {
      title,
      slug: slugify(title),
      description: formData.get("description"),
      content: formData.get("content"),
      category: formData.get("category"),
      technologies,
      githubUrl: formData.get("githubUrl") || null,
      liveUrl: formData.get("liveUrl") || null,
      published: formData.get("published") === "on",
      featured: formData.get("featured") === "on",
    }

    try {
      const url = project
        ? `/api/admin/projects/${project.id}`
        : "/api/admin/projects"
      const method = project ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la sauvegarde")
      }

      router.push("/admin/projects")
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
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Titre *</Label>
              <Input
                id="title"
                name="title"
                defaultValue={project?.title}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Catégorie *</Label>
              <select
                id="category"
                name="category"
                defaultValue={project?.category || "WEB"}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                required
              >
                <option value="WEB">Web</option>
                <option value="FULLSTACK">Fullstack</option>
                <option value="IA">IA</option>
                <option value="AUTOMATISATION">Automatisation</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description courte *</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={project?.description}
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Contenu détaillé (HTML) *</Label>
            <Textarea
              id="content"
              name="content"
              defaultValue={project?.content}
              rows={10}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="technologies">
              Technologies (séparées par des virgules) *
            </Label>
            <Input
              id="technologies"
              name="technologies"
              defaultValue={project?.technologies?.join(", ")}
              placeholder="Next.js, React, TypeScript, Tailwind"
              required
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="githubUrl">URL GitHub</Label>
              <Input
                id="githubUrl"
                name="githubUrl"
                type="url"
                defaultValue={project?.githubUrl || ""}
                placeholder="https://github.com/..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="liveUrl">URL du site</Label>
              <Input
                id="liveUrl"
                name="liveUrl"
                type="url"
                defaultValue={project?.liveUrl || ""}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="published"
                name="published"
                defaultChecked={project?.published ?? true}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="published" className="cursor-pointer">
                Publier
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                defaultChecked={project?.featured ?? false}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="featured" className="cursor-pointer">
                Projet mis en avant
              </Label>
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-400">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Enregistrement..." : project ? "Mettre à jour" : "Créer"}
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

