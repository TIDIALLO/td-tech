# 🏗️ Architecture du Projet - Portfolio Pro

## 📐 Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────┐
│                    PORTFOLIO PRO                             │
│                  Tidiane Diallo                              │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
        ┌───────────────────────────────────────┐
        │         NEXT.JS 15 APP ROUTER         │
        │         (TypeScript + React 19)        │
        └───────────────────────────────────────┘
                            │
        ┌───────────────────┴───────────────────┐
        │                                       │
        ▼                                       ▼
┌───────────────┐                       ┌───────────────┐
│  PAGES PUBLIC │                       │  ADMIN PANEL  │
│               │                       │  (Protected)  │
└───────────────┘                       └───────────────┘
        │                                       │
        ├─ Accueil (/)                         ├─ Dashboard
        ├─ Portfolio (/portfolio)              ├─ Projets CRUD
        ├─ Services (/services)                ├─ Services CRUD
        ├─ Formations (/formations)            ├─ Formations CRUD
        ├─ Blog (/blog)                        ├─ Blog CRUD
        └─ Contact (/contact)                  ├─ Messages
                                               └─ Utilisateurs
                            │
        ┌───────────────────┴───────────────────┐
        │                                       │
        ▼                                       ▼
┌───────────────┐                       ┌───────────────┐
│   AUTH.JS v5  │                       │   PRISMA ORM  │
│  (NextAuth)   │                       │               │
└───────────────┘                       └───────────────┘
        │                                       │
        ├─ Email/Password                      ├─ User
        ├─ Sessions JWT                        ├─ Project
        ├─ Roles (Admin/User)                  ├─ Service
        └─ Middleware                          ├─ Course
                                               ├─ BlogPost
                                               └─ ContactMessage
                            │
                            ▼
                    ┌───────────────┐
                    │  POSTGRESQL   │
                    │   Database    │
                    └───────────────┘
```

---

## 🎨 Stack Technique

### Frontend
```
┌──────────────────────────────────────────┐
│  React 19 + Next.js 15 (App Router)     │
├──────────────────────────────────────────┤
│  • Server Components (par défaut)       │
│  • Client Components (quand nécessaire) │
│  • Streaming & Suspense                 │
│  • Metadata API pour SEO                │
└──────────────────────────────────────────┘
```

### Styling
```
┌──────────────────────────────────────────┐
│  TailwindCSS v4 + shadcn/ui             │
├──────────────────────────────────────────┤
│  • Utility-first CSS                     │
│  • Composants pré-stylés                │
│  • Dark mode avec next-themes           │
│  • Animations avec Framer Motion        │
└──────────────────────────────────────────┘
```

### Backend
```
┌──────────────────────────────────────────┐
│  API Routes + Server Actions            │
├──────────────────────────────────────────┤
│  • REST API pour CRUD                    │
│  • Validation avec Zod                   │
│  • Auth.js pour authentification        │
│  • Middleware pour protection           │
└──────────────────────────────────────────┘
```

### Database
```
┌──────────────────────────────────────────┐
│  Prisma ORM + PostgreSQL                │
├──────────────────────────────────────────┤
│  • Type-safe queries                     │
│  • Migrations automatiques              │
│  • Relations complexes                   │
│  • Seed data                            │
└──────────────────────────────────────────┘
```

---

## 📂 Structure des Dossiers

```
mon-site-perso/
│
├── 📁 prisma/                    # Base de données
│   ├── schema.prisma            # Schéma DB (11 modèles)
│   └── seed.ts                  # Données d'exemple
│
├── 📁 src/
│   │
│   ├── 📁 app/                  # Pages Next.js (App Router)
│   │   │
│   │   ├── 📄 layout.tsx        # Layout racine
│   │   ├── 📄 page.tsx          # Page d'accueil
│   │   ├── 📄 globals.css       # Styles globaux
│   │   │
│   │   ├── 📁 portfolio/        # Section Portfolio
│   │   │   ├── page.tsx         # Liste projets
│   │   │   └── [slug]/          # Détail projet
│   │   │
│   │   ├── 📁 services/         # Section Services
│   │   ├── 📁 formations/       # Section Formations
│   │   ├── 📁 blog/             # Section Blog
│   │   ├── 📁 contact/          # Page Contact
│   │   │
│   │   ├── 📁 auth/             # Authentification
│   │   │   └── signin/          # Page de connexion
│   │   │
│   │   ├── 📁 admin/            # Dashboard Admin
│   │   │   ├── layout.tsx       # Layout admin
│   │   │   ├── page.tsx         # Dashboard
│   │   │   ├── projects/        # Gestion projets
│   │   │   ├── services/        # Gestion services
│   │   │   ├── courses/         # Gestion formations
│   │   │   ├── blog/            # Gestion blog
│   │   │   ├── messages/        # Messages contact
│   │   │   └── users/           # Gestion utilisateurs
│   │   │
│   │   └── 📁 api/              # API Routes
│   │       ├── auth/            # Auth.js handlers
│   │       ├── contact/         # API contact
│   │       └── admin/           # API admin (CRUD)
│   │
│   ├── 📁 components/           # Composants React
│   │   ├── navbar.tsx           # Barre de navigation
│   │   ├── footer.tsx           # Pied de page
│   │   ├── theme-provider.tsx   # Provider thème
│   │   ├── theme-toggle.tsx     # Toggle dark/light
│   │   │
│   │   ├── 📁 admin/            # Composants admin
│   │   │   ├── admin-sidebar.tsx
│   │   │   ├── admin-header.tsx
│   │   │   └── project-form.tsx
│   │   │
│   │   └── 📁 ui/               # Composants shadcn/ui
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       └── textarea.tsx
│   │
│   ├── 📁 lib/                  # Utilitaires
│   │   ├── prisma.ts            # Client Prisma
│   │   └── utils.ts             # Fonctions utiles
│   │
│   ├── 📁 types/                # Types TypeScript
│   │   └── next-auth.d.ts       # Types Auth.js
│   │
│   ├── 📄 auth.ts               # Config Auth.js
│   └── 📄 middleware.ts         # Middleware Next.js
│
├── 📁 .github/
│   └── workflows/
│       └── deploy.yml           # CI/CD GitHub Actions
│
├── 📄 Dockerfile                # Image Docker
├── 📄 docker-compose.yml        # Orchestration Docker
├── 📄 package.json              # Dépendances
├── 📄 tsconfig.json             # Config TypeScript
├── 📄 tailwind.config.ts        # Config Tailwind
├── 📄 next.config.ts            # Config Next.js
├── 📄 .env                      # Variables d'environnement
│
└── 📄 README.md                 # Documentation
```

---

## 🔄 Flux de données

### 1. Affichage d'une page publique

```
Utilisateur → URL (/portfolio)
    ↓
Next.js Router
    ↓
Page Component (Server Component)
    ↓
Prisma Query → PostgreSQL
    ↓
Données récupérées
    ↓
Rendu HTML + Hydration
    ↓
Page affichée
```

### 2. Création d'un projet (Admin)

```
Admin connecté → Formulaire (/admin/projects/new)
    ↓
Soumission du formulaire (Client Component)
    ↓
Validation Zod
    ↓
POST /api/admin/projects
    ↓
Vérification Auth (Middleware)
    ↓
Prisma Create → PostgreSQL
    ↓
Redirection vers /admin/projects
    ↓
Liste mise à jour (revalidation)
```

### 3. Authentification

```
Utilisateur → /auth/signin
    ↓
Formulaire de connexion
    ↓
POST /api/auth/callback/credentials
    ↓
Auth.js vérifie email/password
    ↓
Prisma Query User → PostgreSQL
    ↓
Comparaison bcrypt
    ↓
Création JWT Session
    ↓
Cookie sécurisé
    ↓
Redirection /admin
```

---

## 🔐 Sécurité

### Authentification
- ✅ Mots de passe hachés (bcrypt)
- ✅ Sessions JWT sécurisées
- ✅ Cookies HttpOnly
- ✅ CSRF protection (Auth.js)

### Autorisation
- ✅ Middleware de protection
- ✅ Rôles utilisateurs (ADMIN, STUDENT, USER)
- ✅ Vérification côté serveur

### Validation
- ✅ Zod pour toutes les entrées
- ✅ Sanitization des données
- ✅ Protection XSS

---

## 🚀 Performance

### Optimisations Next.js
- ✅ Server Components (réduction du JS client)
- ✅ Streaming & Suspense
- ✅ Image Optimization (next/image)
- ✅ Code Splitting automatique
- ✅ Static Generation quand possible

### Optimisations Database
- ✅ Index sur les champs recherchés
- ✅ Relations optimisées
- ✅ Queries sélectives (select)

---

## 📦 Déploiement

### Développement
```
npm run dev → http://localhost:3000
```

### Production (Docker)
```
docker-compose up -d
→ App: http://localhost:3000
→ PostgreSQL: localhost:5432
```

### Production (VPS)
```
1. Git clone sur VPS
2. Docker Compose up
3. Nginx reverse proxy
4. Certbot SSL
5. GitHub Actions (CI/CD automatique)
```

---

## 🎯 Modèles de données

### User
```typescript
{
  id: string
  email: string
  password: string (hashed)
  role: ADMIN | STUDENT | USER
  name: string?
  image: string?
}
```

### Project
```typescript
{
  id: string
  title: string
  slug: string (unique)
  description: string
  content: string (HTML)
  category: WEB | FULLSTACK | IA | AUTOMATISATION
  technologies: string[]
  githubUrl: string?
  liveUrl: string?
  published: boolean
  featured: boolean
}
```

### Course
```typescript
{
  id: string
  title: string
  slug: string (unique)
  description: string
  content: string
  category: UNIVERSITE | INSTITUT | WEB | IA
  level: string
  duration: string?
  price: string?
  modules: CourseModule[]
  files: CourseFile[]
  videos: CourseVideo[]
}
```

---

## 🔧 Configuration

### Variables d'environnement essentielles
```env
DATABASE_URL          # Connexion PostgreSQL
AUTH_SECRET           # Clé secrète Auth.js
AUTH_URL              # URL de l'application
ADMIN_EMAIL           # Email admin par défaut
ADMIN_PASSWORD        # Mot de passe admin par défaut
```

### Variables optionnelles
```env
UPLOADTHING_TOKEN     # Upload de fichiers
EMAIL_SERVER_*        # Envoi d'emails
```

---

## 📊 Métriques

- **Pages** : 15+
- **Composants** : 20+
- **API Routes** : 5+
- **Modèles DB** : 11
- **Lignes de code** : ~5000+
- **Temps de build** : ~30s
- **Taille du bundle** : Optimisé Next.js

---

**Architecture moderne, scalable et maintenable ! 🚀**

