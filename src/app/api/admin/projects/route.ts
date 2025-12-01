import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { z } from "zod"

const projectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  content: z.string().min(1),
  category: z.enum(["WEB", "FULLSTACK", "IA", "AUTOMATISATION"]),
  technologies: z.array(z.string()),
  githubUrl: z.string().nullable(),
  liveUrl: z.string().nullable(),
  published: z.boolean(),
  featured: z.boolean(),
})

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = projectSchema.parse(body)

    const project = await prisma.project.create({
      data: validatedData,
    })

    return NextResponse.json(project, { status: 201 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données invalides", details: err.errors },
        { status: 400 }
      )
    }

    console.error("Erreur lors de la création du projet:", err)
    return NextResponse.json(
      { error: "Erreur lors de la création" },
      { status: 500 }
    )
  }
}

