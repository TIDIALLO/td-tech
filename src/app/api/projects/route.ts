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
        imageUrl: true,
        createdAt: true,
      },
    })
    
    return NextResponse.json(projects)
  } catch (error) {
    // Retourner un tableau vide en cas d'erreur
    return NextResponse.json([])
  }
}

