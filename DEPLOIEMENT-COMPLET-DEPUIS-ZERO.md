# 🚀 Déploiement Complet sur Vercel - Depuis Zéro

## 📋 Étape 1 : Vérifier le Code Local

### 1.1 Vérifier que tout est commité

```bash
git status
```

Si des fichiers non commités, ajoute-les :
```bash
git add .
git commit -m "Préparation déploiement final"
git push origin main
```

### 1.2 Vérifier le Repository GitHub

- **Repository** : `TIDIALLO/td-tech`
- **Branche** : `main` (ou `master`)
- **URL** : https://github.com/TIDIALLO/td-tech

---

## 🗑️ Étape 2 : Supprimer l'Ancien Projet Vercel (Si Existe)

1. **Va sur** : [vercel.com/dashboard](https://vercel.com/dashboard)
2. **Trouve le projet** `td-tech` (ou celui qui correspond à `td-tech.vercel.app`)
3. **Settings** → **General** → Scroll en bas
4. **"Delete Project"** → Confirme la suppression

**⚠️ Important** : Note les variables d'environnement avant de supprimer (si tu veux les réutiliser)

---

## 🆕 Étape 3 : Créer un Nouveau Projet sur Vercel

### 3.1 Accéder à la Création

1. **Va sur** : [vercel.com/new](https://vercel.com/new)
2. **Connecte-toi** avec GitHub (si pas déjà fait)

### 3.2 Importer le Repository

1. **"Import Git Repository"**
2. **Cherche** : `td-tech` ou `TIDIALLO/td-tech`
3. **Sélectionne** : `TIDIALLO/td-tech` ✅
4. **Clique sur "Import"**

### 3.3 Configuration du Projet

**IMPORTANT** : Configure AVANT de cliquer sur "Deploy"

**Project Settings** :
- **Project Name** : `td-tech` (pour URL propre : `td-tech.vercel.app`)
- **Framework Preset** : Next.js ✅ (détecté automatiquement)
- **Root Directory** : `./` ✅
- **Build Command** : `npm run build` ✅
- **Output Directory** : `.next` ✅
- **Install Command** : `npm install --legacy-peer-deps` ✅

**⚠️ NE CLIQUE PAS ENCORE SUR "DEPLOY" !**

---

## 🔐 Étape 4 : Configurer les Variables d'Environnement

### 4.1 Ajouter les Variables

**Clique sur "Environment Variables"** (avant de déployer)

### 4.2 Variables OBLIGATOIRES (Ajoute une par une)

**Variable 1 : DATABASE_URL**
- **Key** : `DATABASE_URL`
- **Value** : 
  ```
  postgresql://[REVOQUE-VOIR-.env-LOCAL]
  ```
- **Environments** : ✅ Production
- **Save**

**Variable 2 : AUTH_SECRET**
- **Key** : `AUTH_SECRET`
- **Value** : `[AUTH_SECRET_REVOQUE]`
- **Environments** : ✅ Production
- **Save**

**Variable 3 : AUTH_URL**
- **Key** : `AUTH_URL`
- **Value** : `https://td-tech.vercel.app`
- **Environments** : ✅ Production
- **Save**

### 4.3 Variables OPTIONNELLES (Pour plus tard)

**Variable 4 : RESEND_API_KEY**
- **Key** : `RESEND_API_KEY`
- **Value** : `[RESEND_API_KEY_REVOQUE]`
- **Environments** : ✅ Production
- **Save**

**Variable 5 : RESEND_FROM_EMAIL**
- **Key** : `RESEND_FROM_EMAIL`
- **Value** : `onboarding@resend.dev`
- **Environments** : ✅ Production
- **Save**

**Variable 6 : ADMIN_EMAIL**
- **Key** : `ADMIN_EMAIL`
- **Value** : `admin@tidianediallo.com`
- **Environments** : ✅ Production
- **Save**

**Variable 7 : ADMIN_PASSWORD**
- **Key** : `ADMIN_PASSWORD`
- **Value** : `[MOT_DE_PASSE_ADMIN_REVOQUE]`
- **Environments** : ✅ Production
- **Save**

---

## 🚀 Étape 5 : Déployer

1. **Vérifie que toutes les variables sont ajoutées** ✅
2. **Clique sur "Deploy"**
3. **Attends 2-5 minutes** (build en cours)

---

## 📊 Étape 6 : Vérifier le Déploiement

### 6.1 Vérifier le Statut

1. **Dans le dashboard Vercel**, surveille le déploiement
2. **Statuts possibles** :
   - ⏳ **Building** = En cours
   - ✅ **Ready** = Succès
   - ❌ **Error** = Erreur (voir les logs)

### 6.2 Si Erreur de Build

1. **Clique sur le déploiement**
2. **Onglet "Logs"** : Voir l'erreur exacte
3. **Erreurs courantes** :
   - Variables manquantes → Ajoute-les
   - Erreur de build → Vérifie les logs
   - Erreur de connexion DB → Vérifie `DATABASE_URL`

### 6.3 Si Build Réussi

1. **Copie l'URL de production** : `https://td-tech.vercel.app`
2. **Teste le site** : Ouvre l'URL dans ton navigateur
3. **Vérifie** :
   - ✅ Page d'accueil avec "TDTech" et "Tidiane Diallo"
   - ✅ En français
   - ✅ Navigation fonctionne
   - ✅ Plus de "Used Phones" ou texte en portugais

---

## 🗄️ Étape 7 : Exécuter les Migrations Prisma (Après le Déploiement)

Une fois le déploiement réussi, exécute les migrations :

### Option A : Via Vercel CLI

```bash
# Installer Vercel CLI (si pas déjà fait)
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

### Option B : Automatique (Si le build échoue)

Si le build échoue à cause des migrations, modifie `package.json` :

```json
{
  "scripts": {
    "postinstall": "prisma generate",
    "build": "prisma migrate deploy && next build"
  }
}
```

Puis redéploie.

---

## ✅ Checklist Complète

### Avant le Déploiement

- [ ] Code pushé sur GitHub (`TIDIALLO/td-tech`)
- [ ] Ancien projet Vercel supprimé (si existe)
- [ ] Nouveau projet créé sur Vercel
- [ ] Repository = `TIDIALLO/td-tech` ✅
- [ ] Project Name = `td-tech` ✅
- [ ] Variables d'environnement configurées (3 minimum)
- [ ] Install Command = `npm install --legacy-peer-deps` ✅

### Après le Déploiement

- [ ] Build réussi (statut "Ready")
- [ ] URL de production : `https://td-tech.vercel.app`
- [ ] Site accessible
- [ ] Page d'accueil correcte (TDTech, français)
- [ ] Plus d'erreur 404
- [ ] Migrations Prisma exécutées (si nécessaire)

---

## 🎯 Résultat Attendu

Une fois tout configuré correctement :

- ✅ **URL** : `https://td-tech.vercel.app` (propre, sans "xxxx")
- ✅ **Page d'accueil** : "Des solutions modernes pour vos ambitions digitales"
- ✅ **Navbar** : Logo TDTech + navigation
- ✅ **Présentation** : Section "Tidiane Diallo - Développeur Fullstack"
- ✅ **Langue** : Français (pas portugais)
- ✅ **Prêt à partager** avec ton mentor 🎉

---

## 🐛 Dépannage

### "Used Phones" s'affiche toujours

- ❌ **Mauvais repository déployé**
- ✅ **Solution** : Vérifie Settings → General → Repository = `TIDIALLO/td-tech`

### Erreur 404

- ❌ **Déploiement pas terminé** ou **mauvais URL**
- ✅ **Solution** : Utilise l'URL exacte du dashboard Vercel

### Erreur de Build

- ❌ **Variables manquantes** ou **erreur de code**
- ✅ **Solution** : Vérifie les logs et corrige

---

**Suis ces étapes dans l'ordre et ton site sera correctement déployé !** 🚀

