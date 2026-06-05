/**
 * Run with: npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/seed-wazibot-blog.ts
 * Or: npx tsx scripts/seed-wazibot-blog.ts
 */
import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import { join } from "path";

const prisma = new PrismaClient();

const content = readFileSync(
  join(process.cwd(), "content/blog/wazibot-agent-whatsapp-ia-automatisation.md"),
  "utf-8"
).replace(/^---[\s\S]*?---\n/, ""); // Strip frontmatter

async function main() {
  const post = await prisma.blogPost.upsert({
    where: { slug: "wazibot-agent-whatsapp-ia-automatisation" },
    update: {},
    create: {
      title: "J'ai créé un agent IA WhatsApp qui répond automatiquement à vos clients 24h/24",
      slug: "wazibot-agent-whatsapp-ia-automatisation",
      excerpt:
        "Comment j'ai buildé WaziBot, un agent WhatsApp dopé à l'IA qui gère les questions clients, prend les rendez-vous et répond en secondes — même à 2h du matin. Démo gratuite incluse.",
      content,
      image: "/blog/wazibot-whatsapp-ia.jpg",
      category: "IA",
      tags: ["WhatsApp", "IA", "Automatisation", "Claude AI", "Next.js", "Supabase"],
      published: true,
      publishedAt: new Date("2026-06-04"),
    },
  });

  console.log("✅ Blog post créé :", post.slug);
  console.log("   ID :", post.id);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
