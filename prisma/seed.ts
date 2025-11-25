import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Début du seeding...")

  // Créer un utilisateur admin
  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || "Admin123!",
    10
  )

  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || "admin@tidianediallo.com" },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || "admin@tidianediallo.com",
      name: "Tidiane Diallo",
      password: hashedPassword,
      role: "ADMIN",
    },
  })

  console.log("✅ Admin créé:", admin.email)

  // Créer des projets d'exemple
  const project1 = await prisma.project.upsert({
    where: { slug: "portfolio-nextjs" },
    update: {},
    create: {
      title: "Portfolio Next.js",
      slug: "portfolio-nextjs",
      description:
        "Un portfolio moderne et responsive construit avec Next.js 15 et TailwindCSS",
      content: `
        <h2>Aperçu du projet</h2>
        <p>Ce portfolio a été créé avec les dernières technologies web pour offrir une expérience utilisateur optimale.</p>
        <h3>Fonctionnalités</h3>
        <ul>
          <li>Design moderne et responsive</li>
          <li>Mode sombre/clair</li>
          <li>Animations fluides</li>
          <li>SEO optimisé</li>
        </ul>
      `,
      category: "WEB",
      technologies: ["Next.js", "React", "TypeScript", "TailwindCSS"],
      published: true,
      featured: true,
    },
  })

  const project2 = await prisma.project.upsert({
    where: { slug: "automatisation-n8n" },
    update: {},
    create: {
      title: "Automatisation N8N",
      slug: "automatisation-n8n",
      description:
        "Workflow d'automatisation pour synchroniser des données entre plusieurs plateformes",
      content: `
        <h2>Description</h2>
        <p>Système d'automatisation complet utilisant N8N pour connecter différentes APIs.</p>
      `,
      category: "AUTOMATISATION",
      technologies: ["N8N", "API", "Webhooks", "PostgreSQL"],
      published: true,
      featured: false,
    },
  })

  console.log("✅ Projets créés")

  // Créer des services d'exemple
  const service1 = await prisma.service.upsert({
    where: { slug: "developpement-web" },
    update: {},
    create: {
      title: "Développement Web",
      slug: "developpement-web",
      description:
        "Création d'applications web modernes et performantes avec Next.js et React",
      content: `
        <h2>Ce que je propose</h2>
        <ul>
          <li>Développement d'applications web sur mesure</li>
          <li>Sites vitrine et e-commerce</li>
          <li>Applications SaaS</li>
          <li>API REST et GraphQL</li>
        </ul>
        <h3>Technologies utilisées</h3>
        <p>Next.js, React, TypeScript, Node.js, PostgreSQL, MongoDB</p>
      `,
      price: "À partir de 2000€",
      published: true,
      featured: true,
    },
  })

  const service2 = await prisma.service.upsert({
    where: { slug: "automatisation-ia" },
    update: {},
    create: {
      title: "Automatisation IA",
      slug: "automatisation-ia",
      description:
        "Automatisez vos processus métier avec N8N et l'intelligence artificielle",
      content: `
        <h2>Services d'automatisation</h2>
        <ul>
          <li>Workflows N8N personnalisés</li>
          <li>Intégration d'APIs</li>
          <li>Bots et scrapers</li>
          <li>Traitement automatique de données</li>
        </ul>
      `,
      price: "À partir de 1500€",
      published: true,
      featured: true,
    },
  })

  console.log("✅ Services créés")

  // Créer une formation d'exemple
  const course1 = await prisma.course.create({
    data: {
      title: "Formation Next.js Complète",
      slug: "formation-nextjs-complete",
      description:
        "Apprenez à créer des applications web modernes avec Next.js 15",
      content: `
        <h2>À propos de cette formation</h2>
        <p>Cette formation vous apprendra tout ce qu'il faut savoir pour maîtriser Next.js.</p>
        <h3>Ce que vous apprendrez</h3>
        <ul>
          <li>Les bases de Next.js et React</li>
          <li>App Router et Server Components</li>
          <li>Authentification avec NextAuth</li>
          <li>Base de données avec Prisma</li>
          <li>Déploiement en production</li>
        </ul>
      `,
      category: "WEB",
      level: "Intermédiaire",
      duration: "20 heures",
      price: "299€",
      published: true,
      featured: true,
      modules: {
        create: [
          {
            title: "Introduction à Next.js",
            description: "Découvrez les fondamentaux de Next.js",
            order: 1,
            content: "Contenu du module 1...",
            published: true,
          },
          {
            title: "App Router et Routing",
            description: "Maîtrisez le système de routing de Next.js",
            order: 2,
            content: "Contenu du module 2...",
            published: true,
          },
          {
            title: "Server Components",
            description: "Comprendre et utiliser les Server Components",
            order: 3,
            content: "Contenu du module 3...",
            published: true,
          },
        ],
      },
    },
  })

  console.log("✅ Formations créées")

  // Créer un article de blog d'exemple
  const blogPost1 = await prisma.blogPost.create({
    data: {
      title: "Pourquoi choisir Next.js pour votre prochain projet ?",
      slug: "pourquoi-choisir-nextjs",
      excerpt:
        "Next.js est devenu le framework React de référence. Découvrez pourquoi.",
      content: `
# Pourquoi Next.js ?

Next.js est un framework React qui offre de nombreux avantages :

## Performance

- Server-Side Rendering (SSR)
- Static Site Generation (SSG)
- Incremental Static Regeneration (ISR)

## Developer Experience

- Hot Module Replacement
- TypeScript intégré
- Routing basé sur les fichiers

## Conclusion

Next.js est le choix idéal pour créer des applications web modernes et performantes.
      `,
      tags: ["Next.js", "React", "Web Development"],
      published: true,
      publishedAt: new Date(),
    },
  })

  console.log("✅ Articles de blog créés")

  console.log("🎉 Seeding terminé avec succès!")
}

main()
  .catch((e) => {
    console.error("❌ Erreur lors du seeding:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

