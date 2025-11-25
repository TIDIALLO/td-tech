# Portfolio Pro - Tidiane Diallo

Site web personnel + plateforme pédagogique + dashboard admin construit avec Next.js 15, TypeScript, Prisma, et PostgreSQL.

## 🚀 Technologies

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: Auth.js (NextAuth v5)
- **Upload**: Uploadthing
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod

## 📋 Prérequis

- Node.js 20+
- PostgreSQL 16+
- npm

## 🛠️ Installation

### 1. Cloner le projet

```bash
git clone <votre-repo>
cd mon-site-perso
```

### 2. Installer les dépendances

```bash
npm install --legacy-peer-deps
```

> **Note** : L'option `--legacy-peer-deps` est nécessaire pour résoudre les conflits de dépendances entre next-auth et nodemailer.

### 3. Configuration de l'environnement

Créez un fichier `.env` à la racine du projet :

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/portfolio_db?schema=public"

# Auth.js - Générez une clé secrète avec: openssl rand -base64 32
AUTH_SECRET="votre-secret-key-ici"
AUTH_URL="http://localhost:3000"

# Uploadthing (optionnel)
UPLOADTHING_TOKEN="votre-token-uploadthing"

# Email (optionnel)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="votre-email@gmail.com"
EMAIL_SERVER_PASSWORD="votre-mot-de-passe-app"
EMAIL_FROM="noreply@votredomaine.com"

# Admin credentials (pour le seed)
ADMIN_EMAIL="admin@tidianediallo.com"
ADMIN_PASSWORD="Admin123!"
```

### 4. Base de données

```bash
# Créer la base de données et exécuter les migrations
npx prisma migrate dev --name init

# Générer le client Prisma
npx prisma generate

# Peupler la base avec des données d'exemple
npx prisma db seed
```

### 5. Lancer en développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 👤 Connexion Admin

Après avoir exécuté le seed :

- **Email**: admin@tidianediallo.com (ou la valeur de `ADMIN_EMAIL`)
- **Mot de passe**: Admin123! (ou la valeur de `ADMIN_PASSWORD`)

Accédez au dashboard admin : [http://localhost:3000/admin](http://localhost:3000/admin)

## 📁 Structure du projet

```
mon-site-perso/
├── prisma/
│   ├── schema.prisma       # Schéma de base de données
│   └── seed.ts             # Données d'exemple
├── src/
│   ├── app/                # Pages Next.js (App Router)
│   │   ├── admin/          # Dashboard admin
│   │   ├── api/            # API routes
│   │   ├── auth/           # Pages d'authentification
│   │   ├── blog/           # Pages blog
│   │   ├── contact/        # Page contact
│   │   ├── formations/     # Pages formations
│   │   ├── portfolio/      # Pages portfolio
│   │   ├── services/       # Pages services
│   │   ├── layout.tsx      # Layout principal
│   │   └── page.tsx        # Page d'accueil
│   ├── components/         # Composants React
│   │   ├── admin/          # Composants admin
│   │   └── ui/             # Composants shadcn/ui
│   ├── lib/                # Utilitaires
│   │   ├── prisma.ts       # Client Prisma
│   │   └── utils.ts        # Fonctions utilitaires
│   ├── types/              # Types TypeScript
│   ├── auth.ts             # Configuration Auth.js
│   └── middleware.ts       # Middleware Next.js
├── .env                    # Variables d'environnement
├── docker-compose.yml      # Configuration Docker
├── Dockerfile              # Image Docker
└── README.md
```

## 🎨 Fonctionnalités

### Public

- ✅ Page d'accueil avec hero section moderne
- ✅ Portfolio de projets avec filtres par catégorie
- ✅ Services proposés
- ✅ Catalogue de formations avec modules
- ✅ Blog avec articles Markdown
- ✅ Formulaire de contact
- ✅ Mode sombre/clair
- ✅ Design responsive
- ✅ SEO optimisé

### Admin (Authentification requise - Role ADMIN)

- ✅ Dashboard avec statistiques
- ✅ CRUD complet pour :
  - Projets portfolio
  - Services
  - Formations (avec modules, vidéos, fichiers)
  - Articles de blog
  - Messages de contact
  - Utilisateurs
- ✅ Upload de fichiers
- ✅ Gestion des rôles (Admin/Student/User)
- ✅ Interface moderne avec shadcn/ui

## 🐳 Docker

### Lancer avec Docker Compose

```bash
# Construire et lancer les conteneurs
docker-compose up -d

# Exécuter les migrations
docker-compose exec app npx prisma migrate deploy

# Exécuter le seed
docker-compose exec app npx prisma db seed

# Voir les logs
docker-compose logs -f app
```

### Arrêter les conteneurs

```bash
docker-compose down
```

## 🔄 CI/CD avec GitHub Actions

Le projet inclut une configuration CI/CD complète avec GitHub Actions :

### Workflows Disponibles :

- **CI - Build and Test** : Build et validation sur chaque push
- **Deploy to Production** : Déploiement automatique sur VPS
- **PR Checks** : Validation automatique des pull requests
- **Tests** : Tests automatisés avec PostgreSQL

### Configuration :

1. **Secrets GitHub** : Configurer dans `Settings → Secrets and variables → Actions`
   - `VPS_HOST`, `VPS_USERNAME`, `VPS_SSH_KEY`
   - `DATABASE_URL`, `AUTH_SECRET`
   - Voir `CI-CD-SETUP.md` pour la liste complète

2. **Déploiement automatique** : Chaque push vers `master` déclenche le déploiement

📖 **Guide complet** : Voir `CI-CD-SETUP.md`

---

## 🚀 Déploiement sur VPS

### 1. Préparer le VPS

```bash
# Installer Docker et Docker Compose
sudo apt update
sudo apt install docker.io docker-compose git nginx certbot python3-certbot-nginx

# Cloner le projet
cd /var/www
git clone <votre-repo> portfolio
cd portfolio
```

### 2. Configuration Nginx

Créez `/etc/nginx/sites-available/portfolio` :

```nginx
server {
    listen 80;
    server_name votredomaine.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Activez le site :

```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 3. SSL avec Certbot

```bash
sudo certbot --nginx -d votredomaine.com
```

### 4. CI/CD avec GitHub Actions

Le workflow `.github/workflows/deploy.yml` est configuré. Ajoutez ces secrets dans GitHub :

- `VPS_HOST`: IP de votre VPS
- `VPS_USERNAME`: Nom d'utilisateur SSH
- `VPS_SSH_KEY`: Clé SSH privée
- `DATABASE_URL`: URL PostgreSQL
- `AUTH_SECRET`: Clé secrète Auth.js

## 📝 Scripts disponibles

```bash
npm run dev          # Lancer en développement
npm run build        # Build pour production
npm run start        # Lancer en production
npm run lint         # Vérifier le code
```

## 🔧 Prisma

```bash
npx prisma studio           # Interface graphique pour la DB
npx prisma migrate dev      # Créer une migration
npx prisma migrate deploy   # Appliquer les migrations (prod)
npx prisma db seed          # Peupler la base
npx prisma generate         # Générer le client Prisma
```

## 📚 Ressources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Auth.js Documentation](https://authjs.dev)
- [shadcn/ui Components](https://ui.shadcn.com)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

## 🤝 Support

Pour toute question, contactez : contact@tidianediallo.com

## 📄 Licence

© 2025 Tidiane Diallo. Tous droits réservés.

