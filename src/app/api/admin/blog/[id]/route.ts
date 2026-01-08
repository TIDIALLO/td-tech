import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { z } from "zod"

const blogPostSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  image: z.string().nullable(),
  category: z.enum(["DEVELOPPEMENT", "IA", "AUTOMATISATION", "OUTILS", "TUTORIEL"]),
  tags: z.array(z.string()),
  published: z.boolean(),
  publishedAt: z.string().nullable().transform((val) => val ? new Date(val) : null),
})

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const validatedData = blogPostSchema.parse(body)

    const post = await prisma.blogPost.update({
      where: { id },
      data: validatedData,
    })

    return NextResponse.json(post, { status: 200 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données invalides", details: err.errors },
        { status: 400 }
      )
    }

    console.error("Erreur lors de la mise à jour:", err)
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const { id } = await params

    await prisma.blogPost.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Post supprimé" }, { status: 200 })
  } catch (err) {
    console.error("Erreur lors de la suppression:", err)
    return NextResponse.json(
      { error: "Erreur lors de la suppression" },
      { status: 500 }
    )
  }
}
