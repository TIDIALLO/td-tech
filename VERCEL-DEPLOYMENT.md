# 🚀 Guide de Déploiement sur Vercel

Ce guide explique comment déployer votre site sur Vercel.

## 📋 Prérequis

- Un compte GitHub
- Un compte Vercel (gratuit)
- Le projet pushé sur GitHub

## 🔧 Étapes de Déploiement

### 1. Préparer le Repository GitHub

```bash
# Vérifier que tout est commité
git status

# Ajouter tous les fichiers
git add .

# Commit
git commit -m "Préparation pour déploiement Vercel"

# Push vers GitHub
git push origin main
```

### 2. Connecter le Projet à Vercel

1. **Aller sur [vercel.com](https://vercel.com)** et se connecter avec GitHub
2. **Cliquer sur "Add New Project"**
3. **Importer le repository** depuis GitHub
4. **Configurer le projet** :
   - **Framework Preset** : Next.js (détecté automatiquement)
   - **Root Directory** : `./` (racine)
   - **Build Command** : `npm run build` (par défaut)
   - **Output Directory** : `.next` (par défaut)
   - **Install Command** : `npm install` (par défaut)

### 3. Variables d'Environnement

Dans Vercel, ajouter les variables d'environnement dans **Settings → Environment Variables** :

#### Variables Requises :

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"

# Auth.js
AUTH_SECRET="votre-secret-key-generée-avec-openssl-rand-base64-32"
AUTH_URL="https://votre-domaine.vercel.app"

# Uploadthing (optionnel)
UPLOADTHING_TOKEN="votre-token"
UPLOADTHING_SECRET="votre-secret"

# Email (optionnel)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="votre-email@gmail.com"
EMAIL_SERVER_PASSWORD="votre-mot-de-passe-app"
EMAIL_FROM="noreply@votredomaine.com"

# Admin (pour le seed)
ADMIN_EMAIL="admin@tidianediallo.com"
ADMIN_PASSWORD="[MOT_DE_PASSE_ADMIN_REVOQUE]"
```

#### Générer AUTH_SECRET :

```bash
openssl rand -base64 32
```

### 4. Base de Données PostgreSQL

Vercel ne fournit pas de base de données PostgreSQL. Options :

#### Option A : Vercel Postgres (Recommandé)

1. Dans votre projet Vercel, aller dans **Storage**
2. Cliquer sur **Create Database** → **Postgres**
3. Sélectionner le plan (Hobby = gratuit)
4. Copier la `DATABASE_URL` et l'ajouter aux variables d'environnement

#### Option B : Base de Données Externe

- **Neon** (gratuit) : [neon.tech](https://neon.tech)
- **Supabase** (gratuit) : [supabase.com](https://supabase.com)
- **Railway** (gratuit) : [railway.app](https://railway.app)

### 5. Migrations Prisma

Après le premier déploiement, exécuter les migrations :

#### Option A : Via Vercel CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Lier le projet
vercel link

# Exécuter les migrations
vercel env pull .env.local
npx prisma migrate deploy
```

#### Option B : Via Script de Build

Ajouter dans `package.json` :

```json
{
  "scripts": {
    "postinstall": "prisma generate",
    "build": "prisma migrate deploy && next build"
  }
}
```

### 6. Déploiement

1. **Cliquer sur "Deploy"** dans Vercel
2. Attendre la fin du build (2-5 minutes)
3. Votre site sera disponible à : `https://votre-projet.vercel.app`

### 7. Domaine Personnalisé (Optionnel)

1. Dans Vercel, aller dans **Settings → Domains**
2. Ajouter votre domaine
3. Suivre les instructions pour configurer les DNS

## 🔄 Déploiements Automatiques

Vercel déploie automatiquement :
- ✅ Chaque push sur `main` → Production
- ✅ Chaque pull request → Preview
- ✅ Chaque branche → Preview

## 📝 Scripts de Build

Le fichier `vercel.json` est déjà configuré :

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["cdg1"]
}
```

## 🐛 Dépannage

### Erreur de Build

1. Vérifier les logs dans Vercel Dashboard
2. Vérifier que toutes les variables d'environnement sont définies
3. Vérifier que `DATABASE_URL` est correcte

### Erreur de Migration

```bash
# Exécuter manuellement via Vercel CLI
vercel env pull .env.local
npx prisma migrate deploy
```

### Erreur de Connexion à la Base de Données

- Vérifier que la base de données accepte les connexions externes
- Vérifier les credentials dans les variables d'environnement
- Vérifier le firewall de la base de données

## 📚 Ressources

- [Documentation Vercel](https://vercel.com/docs)
- [Next.js sur Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)

## ✅ Checklist de Déploiement

- [ ] Code pushé sur GitHub
- [ ] Projet importé dans Vercel
- [ ] Variables d'environnement configurées
- [ ] Base de données PostgreSQL créée
- [ ] Migrations Prisma exécutées
- [ ] Build réussi
- [ ] Site accessible
- [ ] Domaine personnalisé configuré (optionnel)

---

**Note** : Le premier déploiement peut prendre 5-10 minutes. Les déploiements suivants sont plus rapides (2-3 minutes).

