# ✅ Configuration des Variables d'Environnement Vercel

## 🔗 Connection String Neon (Tu l'as ! ✅)

```
postgresql://[REVOQUE-VOIR-.env-LOCAL]
```

**✅ C'est parfait !** Cette connection string est correcte.

---

## 🚀 Étapes pour Configurer Vercel

### 1. Aller sur Vercel

1. **Va sur** : [vercel.com](https://vercel.com)
2. **Connecte-toi** avec GitHub
3. **Si tu n'as pas encore importé le projet** :
   - Clique sur **"Add New Project"**
   - Sélectionne ton repository `td-tech` (ou `mon-site-perso`)
   - Vercel détecte Next.js automatiquement ✅

### 2. Ajouter les Variables d'Environnement

**⚠️ IMPORTANT : Avant de cliquer sur "Deploy"**, ajoute ces variables :

#### Dans Vercel :
1. **Clique sur "Environment Variables"** (ou "Configure" → "Environment Variables")
2. **Ajoute chaque variable une par une** :

---

### 📝 Variables à Ajouter

#### Variable 1 : DATABASE_URL (OBLIGATOIRE)

- **Name** : `DATABASE_URL`
- **Value** : 
  ```
  postgresql://[REVOQUE-VOIR-.env-LOCAL]
  ```
- **Environments** : Coche ✅ **Production** (et Preview si tu veux)

---

#### Variable 2 : AUTH_SECRET (OBLIGATOIRE)

- **Name** : `AUTH_SECRET`
- **Value** : Génère une clé secrète
  - **Option 1 (en ligne)** : https://generate-secret.vercel.app/32
  - **Option 2 (PowerShell)** : `openssl rand -base64 32` (si OpenSSL installé)
- **Environments** : Coche ✅ **Production**

**Exemple de valeur générée** :
```
aB3xK9mP2qR7vN4wL8tY6uI1oE5sD0fG
```
(Copie la valeur générée et colle-la)

---

#### Variable 3 : AUTH_URL (OBLIGATOIRE - à mettre à jour après)

- **Name** : `AUTH_URL`
- **Value** : `https://ton-projet.vercel.app`
  - **Note** : Remplace `ton-projet` par le nom réel de ton projet Vercel
  - **Ou** : Mets une valeur temporaire comme `https://td-tech.vercel.app`
  - **Tu pourras la mettre à jour** après le premier déploiement avec l'URL réelle
- **Environments** : Coche ✅ **Production**

---

#### Variable 4 : RESEND_API_KEY (OPTIONNEL - pour les emails)

- **Name** : `RESEND_API_KEY`
- **Value** : `[RESEND_API_KEY_REVOQUE]`
- **Environments** : Coche ✅ **Production**

---

#### Variable 5 : RESEND_FROM_EMAIL (OPTIONNEL)

- **Name** : `RESEND_FROM_EMAIL`
- **Value** : `onboarding@resend.dev`
- **Environments** : Coche ✅ **Production**

---

#### Variable 6 : ADMIN_EMAIL (OPTIONNEL - pour créer le compte admin)

- **Name** : `ADMIN_EMAIL`
- **Value** : `admin@tidianediallo.com`
- **Environments** : Coche ✅ **Production**

---

#### Variable 7 : ADMIN_PASSWORD (OPTIONNEL)

- **Name** : `ADMIN_PASSWORD`
- **Value** : `[MOT_DE_PASSE_ADMIN_REVOQUE]`
- **Environments** : Coche ✅ **Production**

---

## ✅ Checklist des Variables

**OBLIGATOIRES** :
- [x] `DATABASE_URL` ✅ (tu l'as)
- [ ] `AUTH_SECRET` (à générer)
- [ ] `AUTH_URL` (à mettre à jour après déploiement)

**OPTIONNELLES** (pour plus tard) :
- [ ] `RESEND_API_KEY`
- [ ] `RESEND_FROM_EMAIL`
- [ ] `ADMIN_EMAIL`
- [ ] `ADMIN_PASSWORD`

---

## 🎯 Après avoir ajouté les variables

1. **Clique sur "Deploy"** ou **"Save"**
2. **Vercel va builder le projet** (2-5 minutes)
3. **Une fois terminé**, tu auras une URL : `https://ton-projet.vercel.app`

---

## 🔄 Après le premier déploiement

### 1. Mettre à jour AUTH_URL

1. **Copie l'URL réelle** de ton site Vercel (ex: `https://td-tech-xyz.vercel.app`)
2. **Va dans Vercel** → Settings → Environment Variables
3. **Modifie `AUTH_URL`** avec la vraie URL
4. **Redéploie** (ou attends le prochain push)

### 2. Exécuter les migrations Prisma

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

# Peupler la base (optionnel - crée le compte admin)
npx prisma db seed
```

---

## 🎉 C'est tout !

Une fois déployé, tu auras un lien de test à partager avec ton mentor ! 🚀

