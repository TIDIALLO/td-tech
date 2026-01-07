# Stack Technique - Synap6ia

## Vue d'ensemble

Synap6ia est une application web moderne construite avec une architecture hybride combinant les avantages de Vercel pour le frontend et d'un VPS pour les services backend critiques.

---

## Frontend

### Framework Principal

- **Next.js 16.0.10** - Framework React avec App Router
  - Server Components par défaut
  - API Routes pour les endpoints backend
  - Optimisation automatique des images et fonts
  - Static Generation et Server-Side Rendering

- **React 19.2.3** - Bibliothèque UI
  - Dernière version avec les nouvelles fonctionnalités
  - React Server Components
  - Hooks modernes

- **TypeScript 5.6.3** - Typage statique
  - Type safety sur toute l'application
  - IntelliSense amélioré
  - Réduction des bugs en production

### Styling et UI

- **Tailwind CSS 3.4.1** - Framework CSS utility-first
  - Design system cohérent
  - Dark mode intégré avec next-themes
  - Responsive design facilité

- **Shadcn UI** - Composants React réutilisables
  - Basé sur Radix UI primitives
  - Accessible (ARIA)
  - Personnalisable avec Tailwind
  - Composants utilisés :
    - Dialog, Dropdown Menu, Label, Select
    - Separator, Slot, Switch, Tabs, Toast

- **Framer Motion 11.11.17** - Animations
  - Animations fluides et performantes
  - Variants pour les animations complexes
  - Transitions et gestures

- **Lucide React 0.462.0** - Icônes
  - Bibliothèque d'icônes moderne
  - Tree-shakeable
  - Cohérence visuelle

### Utilitaires Frontend

- **class-variance-authority** - Gestion des variants de composants
- **clsx** + **tailwind-merge** - Fusion de classes CSS conditionnelles
- **date-fns 4.1.0** - Manipulation de dates
- **gray-matter 4.0.3** - Parsing des fichiers Markdown (pour blog futur)
- **react-markdown 9.0.1** - Rendu de contenu Markdown

---

## Backend

### API et Routes

- **Next.js API Routes** - Endpoints backend
  - `/api/contact` - Gestion des messages de contact
  - `/api/auth/*` - Authentification NextAuth
  - Validation Zod sur tous les inputs
  - Sécurité intégrée (rate limiting, CORS, XSS protection)

### Base de Données

- **PostgreSQL** - Base de données relationnelle
  - Hébergée sur VPS Hostinger (srv787787.hstgr.cloud)
  - Port : 5432
  - SSL activé (sslmode=require)

- **Prisma 6.0.1** - ORM moderne
  - Type-safe database client
  - Migrations automatiques
  - Modèles : User, Account, Session, Project, Service, Course, BlogPost, ContactMessage
  - Protection contre les injections SQL

### Authentification

- **NextAuth 5.0.0-beta.30** - Solution d'authentification
  - Adapter Prisma pour la persistance
  - Sessions sécurisées
  - Support OAuth et credentials
  - Gestion des rôles (ADMIN, STUDENT, USER)

- **bcryptjs 2.4.3** - Hachage de mots de passe
  - Sécurité des credentials
  - Salting automatique

### Validation et Formulaires

- **Zod 3.23.8** - Validation de schémas TypeScript
  - Validation côté serveur et client
  - Type inference automatique
  - Messages d'erreur personnalisés

- **React Hook Form 7.53.2** - Gestion des formulaires
  - Performance optimale (uncontrolled components)
  - Intégration avec Zod via @hookform/resolvers
  - Validation en temps réel

### Email

- **Nodemailer 7.0.7** - Envoi d'emails
  - SMTP Gmail configuré
  - App Password pour la sécurité
  - Gestion des erreurs robuste

- **Resend 6.5.2** - Service d'email transactionnel (backup)
  - API simple
  - Templates HTML
  - Analytics intégrés

---

## Automatisation

### n8n Workflow Automation

- **n8n** - Plateforme d'automatisation auto-hébergée
  - Hébergé sur VPS Hostinger
  - URL webhook : `https://n8n.srv787787.hstgr.cloud/webhook-test/contact-form`
  - Workflows :
    - Contact form processing
    - Email automation
    - CRM synchronization
    - Data pipelines

### Intégration

- Webhook POST non-bloquant avec timeout 5s
- Triple redondance : Email direct + n8n + Database
- Logging complet pour monitoring

---

## Sécurité

### Mesures Implémentées

1. **Rate Limiting**
   - 3 requêtes/minute par IP sur `/api/contact`
   - Protection contre le spam et DDoS

2. **CORS (Cross-Origin Resource Sharing)**
   - Whitelist des domaines autorisés :
     - `localhost:3000` (dev)
     - `synap6ia.com`
     - `www.synap6ia.com`
     - `synap6ia.vercel.app` (fallback)

3. **XSS Protection**
   - Fonction `escapeHtml()` sur tous les inputs utilisateur
   - Sanitization avant stockage en base
   - Content Security Policy (CSP) headers

4. **SQL Injection**
   - Protection automatique via Prisma ORM
   - Requêtes paramétrées
   - Pas de SQL brut

5. **Authentication**
   - Sessions sécurisées avec NextAuth
   - Passwords hashés avec bcrypt
   - Tokens JWT signés
   - AUTH_SECRET en variable d'environnement

6. **Environment Variables**
   - Secrets jamais en clair dans le code
   - Configuration via `.env.local` (dev) et Vercel dashboard (prod)
   - `.env` dans `.gitignore`

---

## Architecture Hybride

### Vercel (Frontend)

- **Hébergement** : Vercel Edge Network
- **CDN** : Global avec cache intelligent
- **Edge Functions** : Exécution proche de l'utilisateur
- **SSL/HTTPS** : Automatique avec Let's Encrypt
- **Domaine** : synap6ia.com
- **Build** : Automatique à chaque push GitHub

### VPS Hostinger (Backend)

- **Serveur** : srv787787.hstgr.cloud
- **Services** :
  - PostgreSQL (port 5432)
  - n8n (port 5678)
- **OS** : Linux (probablement Ubuntu/Debian)
- **Sécurité** : Firewall, SSL, authentification par clé SSH

### Flux de Données

```
Utilisateur
    ↓
Vercel (Next.js App)
    ↓
    ├─→ VPS PostgreSQL (Prisma) - Données persistantes
    ├─→ VPS n8n (Webhook) - Workflows automatisés
    └─→ Gmail SMTP (Nodemailer) - Emails directs
```

---

## CI/CD

### Git et Version Control

- **Repository** : GitHub (`TIDIALLO/td-tech`)
- **Branche principale** : `main`
- **Workflow** : Push to deploy

### GitHub Actions

- **Fichier** : `.github/workflows/deploy.yml`
- **Pipeline** :
  1. Checkout code
  2. Install dependencies
  3. ESLint (linting)
  4. TypeScript check
  5. Prisma generate
  6. Next.js build
  7. Deploy to Vercel (automatique)

### Vercel Deployment

- **Trigger** : Push sur branch `main`
- **Build Command** : `npm run build`
- **Output Directory** : `.next`
- **Install Command** : `npm install`
- **Environment** : Node.js 20.x
- **Déploiement** : Automatique avec preview pour les PRs

---

## Variables d'Environnement

### Production (Vercel)

```bash
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://synap6ia.com
DATABASE_URL=postgresql://user:pass@srv787787.hstgr.cloud:5432/synap6ia_prod?sslmode=require
AUTH_SECRET=<généré avec openssl rand -base64 32>
AUTH_URL=https://synap6ia.com
USE_GMAIL_SMTP=true
GMAIL_USER=diallotidiane014@gmail.com
GMAIL_APP_PASSWORD=<16 caractères>
N8N_WEBHOOK_URL=https://n8n.srv787787.hstgr.cloud/webhook-test/contact-form
```

### Développement (.env.local)

```bash
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
DATABASE_URL=postgresql://localhost:5432/synap6ia_dev
AUTH_SECRET=<secret local>
AUTH_URL=http://localhost:3000
N8N_WEBHOOK_URL=https://n8n.srv787787.hstgr.cloud/webhook-test/contact-form
```

---

## Performance

### Optimisations Next.js

- **Image Optimization** : `next/image` avec lazy loading
- **Font Optimization** : `next/font` pour Google Fonts
- **Code Splitting** : Automatique par route
- **Static Generation** : Pages statiques quand possible
- **ISR (Incremental Static Regeneration)** : Pour contenu dynamique

### Lighthouse Scores (Objectifs)

- Performance : > 90
- Accessibility : > 95
- Best Practices : > 95
- SEO : > 95

### Monitoring

- Vercel Analytics activé
- Error tracking dans Vercel dashboard
- Logs centralisés

---

## Commandes Utiles

### Développement

```bash
npm run dev          # Démarrer le serveur de développement (port 3000)
npm run build        # Build de production
npm run start        # Démarrer le build de production localement
npm run lint         # Vérifier le code avec ESLint
```

### Base de données

```bash
npx prisma generate  # Générer le client Prisma
npx prisma migrate dev  # Créer et appliquer une migration (dev)
npx prisma migrate deploy  # Appliquer les migrations (prod)
npx prisma studio    # Interface graphique pour la DB (localhost:5555)
npx prisma db push   # Sync schema sans migration (dev uniquement)
```

### Déploiement

```bash
git add .
git commit -m "message"
git push origin main  # Déclenche le déploiement automatique sur Vercel
```

---

## Structure du Projet

```
D:\mon-site-perso\
├── src/
│   ├── app/                    # App Router (Next.js 16)
│   │   ├── _components/        # Composants partagés de l'app
│   │   ├── api/                # API Routes
│   │   │   ├── contact/        # Endpoint de contact
│   │   │   └── auth/           # NextAuth endpoints
│   │   ├── services/           # Pages services
│   │   │   ├── automatisation/ # Page automatisation n8n
│   │   │   └── agents-ia/      # Page agents IA
│   │   ├── contact/            # Page de contact
│   │   ├── formations/         # Page formations
│   │   ├── layout.tsx          # Layout global
│   │   └── page.tsx            # Homepage
│   ├── components/             # Composants réutilisables
│   │   ├── ui/                 # Composants Shadcn UI
│   │   ├── navbar.tsx
│   │   └── footer.tsx
│   └── lib/                    # Utilitaires et configurations
│       ├── prisma.ts           # Client Prisma singleton
│       └── auth.ts             # Configuration NextAuth
├── prisma/
│   ├── schema.prisma           # Schéma de base de données
│   └── migrations/             # Historique des migrations
├── public/                     # Assets statiques
│   ├── favicon.ico
│   └── images/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Pipeline CI/CD
├── .env.local                  # Variables d'environnement (dev)
├── package.json                # Dépendances npm
├── tsconfig.json               # Configuration TypeScript
├── tailwind.config.ts          # Configuration Tailwind
├── next.config.js              # Configuration Next.js
└── vercel.json                 # Configuration Vercel (redirects)
```

---

## Versions et Compatibilité

- **Node.js** : >= 20.0.0 (recommandé 20.x LTS)
- **npm** : >= 10.0.0
- **PostgreSQL** : >= 14.0
- **Navigateurs supportés** :
  - Chrome/Edge (dernières 2 versions)
  - Firefox (dernières 2 versions)
  - Safari (dernières 2 versions)
  - Mobile : iOS Safari, Chrome Android

---

## Ressources et Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [NextAuth Documentation](https://next-auth.js.org)
- [n8n Documentation](https://docs.n8n.io)
- [Vercel Documentation](https://vercel.com/docs)

---

**Dernière mise à jour** : 2026-01-07
**Version** : 1.0.0
**Mainteneur** : Tidiane Diallo (Synap6ia)
