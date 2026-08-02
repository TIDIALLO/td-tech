# 🚀 Déploiement Rapide sur Vercel - Guide Étape par Étape

## 📋 Checklist Avant Déploiement

- [ ] Code commité et pushé sur GitHub
- [ ] Base de données PostgreSQL créée (Neon, Supabase, ou Vercel Postgres)
- [ ] Variables d'environnement préparées

---

## 🔧 Étape 1 : Préparer le Code sur GitHub

### 1.1 Vérifier l'état Git

```bash
git status
```

### 1.2 Ajouter et commiter les changements

```bash
# Ajouter tous les fichiers
git add .

# Commit avec un message descriptif
git commit -m "Préparation déploiement Vercel - TDTech branding"

# Push vers GitHub
git push origin main
```

**✅ Vérification** : Va sur GitHub et confirme que tous les fichiers sont bien pushés.

---

## 🗄️ Étape 2 : Créer une Base de Données PostgreSQL (GRATUIT)

Tu as 3 options gratuites :

### Option A : Neon (Recommandé - Le plus simple)

1. **Aller sur** : [neon.tech](https://neon.tech)
2. **Créer un compte** (gratuit avec GitHub)
3. **Créer un nouveau projet**
4. **Copier la `Connection String`** (elle ressemble à : `postgresql://user:password@host/database?sslmode=require`)
5. **✅ Note cette URL** : Tu en auras besoin pour Vercel

### Option B : Supabase

1. **Aller sur** : [supabase.com](https://supabase.com)
2. **Créer un compte** (gratuit)
3. **Créer un nouveau projet**
4. **Aller dans Settings → Database**
5. **Copier la `Connection String`** (URI)
6. **✅ Note cette URL**

### Option C : Vercel Postgres (Intégré)

1. **Dans Vercel** (après avoir créé le projet)
2. **Aller dans Storage → Create Database → Postgres**
3. **Sélectionner le plan Hobby (gratuit)**
4. **La `DATABASE_URL` sera automatiquement ajoutée**

**💡 Recommandation** : Utilise **Neon** pour commencer, c'est le plus simple.

---

## 🚀 Étape 3 : Déployer sur Vercel

### 3.1 Créer un compte Vercel

1. **Aller sur** : [vercel.com](https://vercel.com)
2. **Cliquer sur "Sign Up"**
3. **Se connecter avec GitHub** (recommandé)

### 3.2 Importer le Projet

1. **Cliquer sur "Add New Project"** (ou "Import Project")
2. **Sélectionner ton repository GitHub** (`mon-site-perso`)
3. **Vercel détecte automatiquement Next.js** ✅

### 3.3 Configuration du Projet

Laisse les valeurs par défaut :
- **Framework Preset** : Next.js ✅
- **Root Directory** : `./` ✅
- **Build Command** : `npm run build` ✅
- **Output Directory** : `.next` ✅
- **Install Command** : `npm install` ✅

**⚠️ NE CLIQUE PAS ENCORE SUR "Deploy" !**

---

## 🔐 Étape 4 : Configurer les Variables d'Environnement

### 4.1 Avant de déployer, ajouter les variables

Dans la page de configuration Vercel, **avant de cliquer sur "Deploy"**, clique sur **"Environment Variables"**.

### 4.2 Ajouter ces variables (UNE PAR UNE) :

#### Variables OBLIGATOIRES :

```env
# 1. Base de données (de Neon/Supabase/Vercel)
DATABASE_URL
Valeur : postgresql://user:password@host/database?sslmode=require
(Remplace par ta vraie URL de Neon/Supabase)

# 2. Auth.js Secret (génère une clé)
AUTH_SECRET
Valeur : [Génère avec la commande ci-dessous]

# 3. Auth URL (sera mis à jour après le déploiement)
AUTH_URL
Valeur : https://ton-projet.vercel.app
(Remplace "ton-projet" par le nom de ton projet Vercel)
```

#### Générer AUTH_SECRET :

**Sur Windows (PowerShell)** :
```powershell
# Option 1 : Si tu as OpenSSL installé
openssl rand -base64 32

# Option 2 : Utilise ce générateur en ligne
# https://generate-secret.vercel.app/32
```

**Ou utilise ce générateur en ligne** : [generate-secret.vercel.app/32](https://generate-secret.vercel.app/32)

#### Variables OPTIONNELLES (pour plus tard) :

```env
# Email (si tu veux le formulaire de contact)
RESEND_API_KEY
Valeur : [RESEND_API_KEY_REVOQUE]

RESEND_FROM_EMAIL
Valeur : onboarding@resend.dev

# Admin (pour créer le compte admin)
ADMIN_EMAIL
Valeur : admin@tidianediallo.com

ADMIN_PASSWORD
Valeur : [MOT_DE_PASSE_ADMIN_REVOQUE]
```

### 4.3 Sélectionner les environnements

Pour chaque variable, coche :
- ✅ **Production**
- ✅ **Preview** (optionnel)
- ✅ **Development** (optionnel)

---

## 🎯 Étape 5 : Déployer !

1. **Cliquer sur "Deploy"**
2. **Attendre 2-5 minutes** (Vercel build le projet)
3. **✅ Ton site sera disponible à** : `https://ton-projet.vercel.app`

---

## 🗄️ Étape 6 : Exécuter les Migrations Prisma

### 6.1 Après le premier déploiement

Le build peut échouer car la base de données est vide. Tu dois exécuter les migrations.

### Option A : Via Vercel CLI (Recommandé)

```bash
# Installer Vercel CLI globalement
npm install -g vercel

# Se connecter à Vercel
vercel login

# Lier le projet (sélectionne ton projet)
vercel link

# Télécharger les variables d'environnement
vercel env pull .env.local

# Exécuter les migrations
npx prisma migrate deploy

# Générer le client Prisma
npx prisma generate
```

### Option B : Via Script de Build (Automatique)

Si le build échoue, modifie `package.json` :

```json
{
  "scripts": {
    "postinstall": "prisma generate",
    "build": "prisma migrate deploy && next build"
  }
}
```

Puis **redéploie** sur Vercel (push un nouveau commit).

---

## 🌱 Étape 7 : Peupler la Base de Données (Optionnel)

Pour créer le compte admin et des données de test :

```bash
# Via Vercel CLI (après avoir fait vercel link)
vercel env pull .env.local
npx prisma db seed
```

---

## ✅ Vérification Finale

1. **Visite ton site** : `https://ton-projet.vercel.app`
2. **Vérifie que la page d'accueil s'affiche** ✅
3. **Teste la navigation** ✅
4. **Partage le lien avec ton mentor** 🎉

---

## 🔄 Déploiements Automatiques

**Vercel déploie automatiquement** :
- ✅ Chaque push sur `main` → **Production**
- ✅ Chaque Pull Request → **Preview** (lien temporaire)

**Plus besoin de redéployer manuellement !** 🚀

---

## 🐛 Dépannage

### Erreur "Cannot connect to database"

- ✅ Vérifie que `DATABASE_URL` est correcte
- ✅ Vérifie que la base de données accepte les connexions externes (Neon/Supabase le font par défaut)
- ✅ Vérifie que l'URL contient `?sslmode=require` pour Neon

### Erreur "Prisma Client not generated"

- ✅ Ajoute dans `package.json` : `"postinstall": "prisma generate"`

### Erreur de Build

- ✅ Vérifie les logs dans Vercel Dashboard
- ✅ Vérifie que toutes les variables d'environnement sont définies
- ✅ Vérifie que `AUTH_URL` correspond à ton URL Vercel

### Base de données vide

- ✅ Exécute les migrations : `npx prisma migrate deploy`
- ✅ Exécute le seed : `npx prisma db seed`

---

## 📝 Résumé des URLs à Noter

- **Site Vercel** : `https://ton-projet.vercel.app`
- **Base de données** : URL de Neon/Supabase
- **Dashboard Vercel** : [vercel.com/dashboard](https://vercel.com/dashboard)

---

## 🎉 C'est Fait !

Ton site est maintenant en ligne et tu peux partager le lien avec ton mentor.

**Prochaine étape** : Déploiement sur Hostinger (quand tu seras prêt) 🚀

