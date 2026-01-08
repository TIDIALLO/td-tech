import { PrismaClient } from "@prisma/client"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

const prisma = new PrismaClient()

// Mapping des tags vers catégories
const categoryMapping: Record<string, string> = {
  "Claude Code": "OUTILS",
  "IA": "IA",
  "Développement": "DEVELOPPEMENT",
  "Cursor": "OUTILS",
  "VS Code": "OUTILS",
  "Éditeur": "OUTILS",
  "n8n": "AUTOMATISATION",
  "Automatisation": "AUTOMATISATION",
  "CRM": "AUTOMATISATION",
  "Notion": "AUTOMATISATION",
  "HubSpot": "AUTOMATISATION",
  "Outils": "OUTILS",
}

function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

async function importBlogPosts() {
  const contentDir = path.join(process.cwd(), "content", "blog")

  if (!fs.existsSync(contentDir)) {
    console.error(`Le répertoire ${contentDir} n'existe pas`)
    return
  }

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".md"))

  console.log(`Importing ${files.length} blog posts...`)

  for (const filename of files) {
    const filePath = path.join(contentDir, filename)
    const fileContent = fs.readFileSync(filePath, "utf8")
    const { data: frontmatter, content } = matter(fileContent)

    // Déterminer la catégorie à partir du premier tag
    const firstTag = frontmatter.tags?.[0]
    const category = categoryMapping[firstTag] || "DEVELOPPEMENT"

    const slug = slugify(frontmatter.title)

    // Check if post already exists
    const existing = await prisma.blogPost.findUnique({
      where: { slug },
    })

    if (existing) {
      console.log(`⏭️  Skipping ${frontmatter.title} (already exists)`)
      continue
    }

    await prisma.blogPost.create({
      data: {
        title: frontmatter.title,
        slug,
        excerpt: frontmatter.excerpt,
        content,
        image: frontmatter.image || null,
        category,
        tags: frontmatter.tags || [],
        published: true,
        publishedAt: new Date(frontmatter.date),
      },
    })

    console.log(`✅ Imported: ${frontmatter.title}`)
  }

  console.log("✨ Import complete!")
}

importBlogPosts()
  .catch((error) => {
    console.error("❌ Import failed:", error)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
