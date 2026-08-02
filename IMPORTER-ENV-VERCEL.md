# 📥 Importer les Variables d'Environnement dans Vercel

## 📋 Méthode 1 : Import Manuel (Recommandé)

Vercel ne permet pas d'importer directement un fichier `.env`, mais tu peux copier-coller les valeurs.

### Étapes :

1. **Ouvre le fichier** `.env.example` que je viens de créer
2. **Va sur Vercel** → Ton projet → **Settings** → **Environment Variables**
3. **Ajoute chaque variable une par une** en copiant les valeurs depuis `.env.example`

---

## 📋 Méthode 2 : Via Vercel CLI (Avancé)

Si tu veux importer depuis un fichier local :

### 1. Créer un fichier .env.local

```bash
# Copie .env.example vers .env.local
cp .env.example .env.local
```

### 2. Remplir les valeurs dans .env.local

Ouvre `.env.local` et remplace les valeurs entre `[ ]` par tes vraies valeurs.

### 3. Importer dans Vercel

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Lier le projet
vercel link

# Importer les variables depuis .env.local
vercel env pull .env.local
```

**⚠️ Note** : Cette méthode télécharge les variables depuis Vercel vers ton fichier local, pas l'inverse.

---

## 📋 Méthode 3 : Via l'Interface Vercel (La plus simple)

### Étapes détaillées :

1. **Va sur** : [vercel.com/dashboard](https://vercel.com/dashboard)
2. **Sélectionne ton projet**
3. **Clique sur "Settings"**
4. **Clique sur "Environment Variables"**
5. **Pour chaque variable** :
   - Clique sur **"Add New"**
   - **Key** : Le nom de la variable (ex: `DATABASE_URL`)
   - **Value** : La valeur (copie depuis `.env.example`)
   - **Environments** : Coche ✅ **Production** (et Preview si tu veux)
   - Clique sur **"Save"**

---

## ✅ Checklist des Variables à Ajouter

### Variables OBLIGATOIRES :

- [ ] `DATABASE_URL` - Connection string Neon
- [ ] `AUTH_SECRET` - Clé secrète (à générer)
- [ ] `AUTH_URL` - URL de ton site Vercel

### Variables OPTIONNELLES :

- [ ] `RESEND_API_KEY` - Pour les emails
- [ ] `RESEND_FROM_EMAIL` - Email d'expéditeur
- [ ] `ADMIN_EMAIL` - Pour créer le compte admin
- [ ] `ADMIN_PASSWORD` - Mot de passe admin
- [ ] `UPLOADTHING_TOKEN` - Pour l'upload de fichiers (si utilisé)

---

## 🔐 Générer AUTH_SECRET

**Option 1 - En ligne** :
- Va sur : https://generate-secret.vercel.app/32
- Copie la clé générée

**Option 2 - PowerShell** :
```powershell
# Si tu as OpenSSL installé
openssl rand -base64 32
```

**Option 3 - Node.js** :
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## 📝 Exemple de Configuration Complète

Voici un exemple avec des valeurs réelles (remplace par les tiennes) :

```env
DATABASE_URL="postgresql://[REVOQUE-VOIR-.env-LOCAL]"
AUTH_SECRET="aB3xK9mP2qR7vN4wL8tY6uI1oE5sD0fGhJkLmNoPqRsTuVwXyZ"
AUTH_URL="https://td-tech.vercel.app"
RESEND_API_KEY="[RESEND_API_KEY_REVOQUE]"
RESEND_FROM_EMAIL="onboarding@resend.dev"
ADMIN_EMAIL="admin@tidianediallo.com"
ADMIN_PASSWORD="[MOT_DE_PASSE_ADMIN_REVOQUE]"
```

---

## 🚨 Important

- **Ne commite JAMAIS** le fichier `.env.local` (il est dans `.gitignore`)
- **Le fichier `.env.example`** peut être commité (il ne contient pas de valeurs sensibles)
- **Dans Vercel**, les variables sont sécurisées et chiffrées

---

## 🎯 Après avoir ajouté les variables

1. **Clique sur "Deploy"** dans Vercel
2. **Vercel va builder le projet** avec les variables configurées
3. **Ton site sera disponible** à l'URL fournie par Vercel

---

## 🔄 Mettre à jour AUTH_URL après le déploiement

Une fois que Vercel a généré l'URL de ton site :

1. **Copie l'URL réelle** (ex: `https://td-tech-xyz123.vercel.app`)
2. **Va dans Vercel** → Settings → Environment Variables
3. **Modifie `AUTH_URL`** avec la vraie URL
4. **Redéploie** (ou attends le prochain push)

---

**✅ Une fois toutes les variables ajoutées, tu peux déployer !** 🚀

