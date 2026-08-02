# ✅ Checklist Déploiement Vercel

## 📦 Étape 1 : Préparer le Code (FAIT ✅)

- [x] Tous les fichiers commités
- [x] Push vers GitHub

**Commande à exécuter maintenant** :
```bash
git push origin main
```

---

## 🗄️ Étape 2 : Créer une Base de Données PostgreSQL

### Option Recommandée : Neon (GRATUIT)

1. **Aller sur** : https://neon.tech
2. **Créer un compte** (avec GitHub)
3. **Créer un nouveau projet**
4. **Copier la Connection String** (elle ressemble à : `postgresql://user:password@host/database?sslmode=require`)
5. **✅ NOTE CETTE URL** - Tu en auras besoin pour Vercel

**Alternative** : Supabase (https://supabase.com) - Même processus

---

## 🚀 Étape 3 : Déployer sur Vercel

### 3.1 Créer un compte

1. **Aller sur** : https://vercel.com
2. **Sign Up avec GitHub**

### 3.2 Importer le Projet

1. **Cliquer sur "Add New Project"**
2. **Sélectionner ton repository** `mon-site-perso`
3. **Vercel détecte Next.js automatiquement** ✅

### 3.3 Configurer les Variables d'Environnement

**⚠️ IMPORTANT : Avant de cliquer sur "Deploy"**, ajoute ces variables :

#### Variables OBLIGATOIRES :

| Variable | Valeur | Comment obtenir |
|----------|--------|-----------------|
| `DATABASE_URL` | `postgresql://...` | URL de Neon (étape 2) |
| `AUTH_SECRET` | `[génère une clé]` | Voir ci-dessous |
| `AUTH_URL` | `https://ton-projet.vercel.app` | Mettre à jour après le déploiement |

#### Générer AUTH_SECRET :

**Option 1 - En ligne** : https://generate-secret.vercel.app/32

**Option 2 - PowerShell** :
```powershell
# Si tu as OpenSSL
openssl rand -base64 32
```

#### Variables OPTIONNELLES (pour plus tard) :

| Variable | Valeur |
|----------|--------|
| `RESEND_API_KEY` | `[RESEND_API_KEY_REVOQUE]` |
| `RESEND_FROM_EMAIL` | `onboarding@resend.dev` |
| `ADMIN_EMAIL` | `admin@tidianediallo.com` |
| `ADMIN_PASSWORD` | `[MOT_DE_PASSE_ADMIN_REVOQUE]` |

**Pour chaque variable** : Coche ✅ **Production**

### 3.4 Déployer

1. **Cliquer sur "Deploy"**
2. **Attendre 2-5 minutes**
3. **✅ Ton site sera à** : `https://ton-projet.vercel.app`

---

## 🗄️ Étape 4 : Exécuter les Migrations

Après le premier déploiement, tu dois créer les tables dans la base de données.

### Option A : Via Vercel CLI (Recommandé)

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Lier le projet
vercel link

# Télécharger les variables d'environnement
vercel env pull .env.local

# Exécuter les migrations
npx prisma migrate deploy

# Peupler la base (optionnel)
npx prisma db seed
```

### Option B : Automatique (si le build échoue)

Si le build échoue, modifie `package.json` :

```json
{
  "scripts": {
    "postinstall": "prisma generate",
    "build": "prisma migrate deploy && next build"
  }
}
```

Puis **push un nouveau commit** et Vercel redéploiera automatiquement.

---

## ✅ Vérification

1. **Visite** : `https://ton-projet.vercel.app`
2. **Vérifie que la page d'accueil s'affiche** ✅
3. **Partage le lien avec ton mentor** 🎉

---

## 🔄 Déploiements Automatiques

**Vercel déploie automatiquement** :
- ✅ Chaque push sur `main` → Production
- ✅ Chaque Pull Request → Preview

**Plus besoin de redéployer manuellement !** 🚀

---

## 📝 Résumé des URLs

- **Site** : `https://ton-projet.vercel.app`
- **Dashboard Vercel** : https://vercel.com/dashboard
- **Base de données** : Dashboard Neon/Supabase

---

## 🐛 Problèmes Courants

### "Cannot connect to database"
- ✅ Vérifie que `DATABASE_URL` est correcte
- ✅ Vérifie que l'URL contient `?sslmode=require`

### "Prisma Client not generated"
- ✅ Le script `postinstall` devrait le faire automatiquement
- ✅ Sinon, ajoute `"postinstall": "prisma generate"` dans `package.json`

### Base de données vide
- ✅ Exécute : `npx prisma migrate deploy`
- ✅ Puis : `npx prisma db seed`

---

**🎉 Une fois déployé, tu auras un lien de test à partager avec ton mentor !**

