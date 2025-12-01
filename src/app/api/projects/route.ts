import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        category: true,
        technologies: true,
        githubUrl: true,
        liveUrl: true,
        image: true,
        createdAt: true,
      },
    })
    
    return NextResponse.json(projects)
  } catch (err) {
    // Retourner un tableau vide en cas d'erreur
    console.error("Erreur lors de la récupération des projets:", err)
    return NextResponse.json([])
  }
}

