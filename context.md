# Portfolio Pro – Tidiane Diallo

## Mission
Tu es un expert Next.js, TailwindCSS, shadcn/ui, Prisma, PostgreSQL et TypeScript. Ta mission est de générer **un site web complet** pour mon portfolio, mes services, mes formations et mes cours. Suis toutes les instructions ci-dessous.

---

## 1. Identité du Projet
- **Nom du projet** : Portfolio Pro – Tidiane Diallo
- **Description** : Site web personnel + plateforme pédagogique + dashboard admin
- **Stack obligatoire**
  - Next.js 15 (App Router)
  - TypeScript
  - TailwindCSS
  - shadcn/ui
  - Prisma + PostgreSQL
  - Auth.js (NextAuth)
  - Uploadthing (ou S3)
  - API REST ou Server Actions
  - SEO optimisé
  - Responsive + Dark mode

---

## 2. Structure du Site

### 2.1 Accueil
- Hero section moderne (gradient, CTA, photo)
- Présentation du développeur (Tidiane Diallo)
- Compétences : Fullstack, Automatisation IA, N8N…
- CTA : *Voir Mes Services* et *Mes Formations*

### 2.2 Portfolio
- Liste de projets stockés en base
- Page détail projet
- Filtres par catégories : Web, Fullstack, IA, Automatisation

### 2.3 Services
- Développement web
- Automatisation IA (N8N, bots, scrapers)
- Création d’outils internes
- Consulting / Formation
- Formulaire de demande ou réservation

### 2.4 Formations & Cours
- Catalogue de formations
- Page formation avec modules
- Upload fichiers : PDF, PPT, ZIP
- Upload vidéos ou intégration YouTube
- Accès réservé (auth obligatoire)
- Catégories : Université, Institut, Web, IA

### 2.5 Blog
- Articles Markdown
- SEO
- Tags et recherche
- Pagination

### 2.6 Contact
- Formulaire de contact
- Envoi ema cdil via Nodemailer ou Notion API

### 2.7 Dashboard Admin (privé)
- Auth admin obligatoire
- CRUD complet : Projets, Services, Formations, Cours, Vidéos, Fichiers PDF, Articles de blog
- UI moderne (shadcn + charts)
- Upload Drag & Drop

---

## 3. Base de Données (Prisma)
- Modèles : User (roles admin/student), Project, Service, Course, CourseModule, CourseFile, CourseVideo, BlogPost, ContactMessage
- Générer : `schema.prisma`, migrations, seed avec données d’exemple

---

## 4. Design & UI
- shadcn/ui pour tous les composants
- TailwindCSS pour la mise en page
- Framer Motion pour les animations
- Layout moderne avec sidebar admin et navbar publique
- Responsive avec Light/Dark mode intégré

---

## 5. Fonctionnalités Techniques
- Auth (Email + OAuth optionnel)
- Upload fichiers + vidéos
- Middleware de protection des routes
- Rôles utilisateurs
- Pages 404/500
- Rate limiting pour le contact
- SEO + sitemap + robots.txt
- Internationalisation (fr/en optionnel)

---

## 6. Livrables Attendus
Cursor doit générer :
1. Arborescence complète du projet Next.js
2. Composants UI shadcn
3. Code des pages, layouts et API routes
4. Base Prisma complète + migrations
5. Dashboard admin
6. Système d’auth + rôles
7. Upload de fichiers (Uploadthing)
8. Utils + hooks + middleware
9. Instructions d’installation : variables d’environnement, lancement local, migration DB

---

## 7. Déploiement (VPS Hostingzer)

### 7.1 Docker
- Dockerfile optimisé (production)
- `docker-compose.yml` pour Next.js + PostgreSQL

### 7.2 Nginx
- Reverse proxy configuré
- Port 443 + Certbot pour HTTPS

### 7.3 CI/CD (GitHub Actions)
- Build
- Lint
- Test
- Déploiement automatique sur VPS

---

## 🧠 Mode de Travail
- Clean Code
- Proposer des améliorations si nécessaire
- Code fonctionnel immédiatement
- Si un choix technique est ambigu, proposer plusieurs options

---

## 🎯 Final
Génère tout le projet dans Cursor selon ces instructions.

