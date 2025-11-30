# 📝 Guide Étape par Étape - Déploiement Vercel

## 🎯 Objectif

Déployer ton site TDTech sur Vercel avec le bon repository et toutes les configurations.

---

## ✅ ÉTAPE 1 : Vérifier GitHub

**Va sur** : https://github.com/TIDIALLO/td-tech

**Vérifie** :
- ✅ Le repository existe
- ✅ La branche `main` contient ton code
- ✅ Les derniers commits sont visibles

---

## ✅ ÉTAPE 2 : Supprimer l'Ancien Projet Vercel

1. **Va sur** : https://vercel.com/dashboard
2. **Trouve le projet** qui correspond à `td-tech.vercel.app`
3. **Clique dessus**
4. **Settings** → **General** → Scroll en bas
5. **"Delete Project"** → Tape le nom du projet pour confirmer
6. **"Delete"** → Confirme

**⚠️ Note** : Si tu as des variables d'environnement importantes, note-les avant de supprimer.

---

## ✅ ÉTAPE 3 : Créer un Nouveau Projet

1. **Va sur** : https://vercel.com/new
2. **"Import Git Repository"**
3. **Cherche** : `td-tech`
4. **Sélectionne** : `TIDIALLO/td-tech` ✅
5. **"Import"**

---

## ✅ ÉTAPE 4 : Configurer le Projet

### Configuration de Base

**Project Name** :
- Change en : `td-tech`
- Cela donne l'URL : `https://td-tech.vercel.app` (propre, sans "xxxx")

**Framework Preset** :
- Next.js ✅ (détecté automatiquement)

**Root Directory** :
- `./` ✅

**Build Command** :
- `npm run build` ✅

**Output Directory** :
- `.next` ✅

**Install Command** :
- **IMPORTANT** : Change en `npm install --legacy-peer-deps`
- Cela résout les conflits de dépendances

---

## ✅ ÉTAPE 5 : Ajouter les Variables d'Environnement

**⚠️ CRUCIAL : Fais ça AVANT de cliquer sur "Deploy" !**

1. **Clique sur "Environment Variables"** (ou "Configure" → "Environment Variables")

2. **Ajoute chaque variable une par une** :

### Variable 1 : DATABASE_URL

- **Key** : `DATABASE_URL`
- **Value** : Copie-colle cette ligne complète :
  ```
  postgresql://neondb_owner:npg_IM9dq5hCxOyo@ep-holy-bar-adkfxk8a-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
  ```
- **Environments** : Coche ✅ **Production**
- **Save**

### Variable 2 : AUTH_SECRET

- **Key** : `AUTH_SECRET`
- **Value** : `yLsy9d/nkotK+ds/Jzaq+McZlB/lTU/c3jOsASZjDec=`
- **Environments** : Coche ✅ **Production**
- **Save**

### Variable 3 : AUTH_URL

- **Key** : `AUTH_URL`
- **Value** : `https://td-tech.vercel.app`
- **Environments** : Coche ✅ **Production**
- **Save**

### Variable 4 : RESEND_API_KEY (Optionnel)

- **Key** : `RESEND_API_KEY`
- **Value** : `re_Y6gWENxV_EoSQ3ErTiGAbhe5htT7TT2YG`
- **Environments** : Coche ✅ **Production**
- **Save**

### Variable 5 : RESEND_FROM_EMAIL (Optionnel)

- **Key** : `RESEND_FROM_EMAIL`
- **Value** : `onboarding@resend.dev`
- **Environments** : Coche ✅ **Production**
- **Save**

### Variable 6 : ADMIN_EMAIL (Optionnel)

- **Key** : `ADMIN_EMAIL`
- **Value** : `admin@tidianediallo.com`
- **Environments** : Coche ✅ **Production**
- **Save**

### Variable 7 : ADMIN_PASSWORD (Optionnel)

- **Key** : `ADMIN_PASSWORD`
- **Value** : `Admin123!`
- **Environments** : Coche ✅ **Production**
- **Save**

---

## ✅ ÉTAPE 6 : Déployer

1. **Vérifie que toutes les variables sont ajoutées** ✅
2. **Vérifie que "Install Command" = `npm install --legacy-peer-deps`** ✅
3. **Clique sur "Deploy"**
4. **Attends 2-5 minutes**

---

## ✅ ÉTAPE 7 : Vérifier le Déploiement

### Pendant le Build

1. **Surveille le statut** dans le dashboard
2. **Statut** : ⏳ Building → ✅ Ready (ou ❌ Error)

### Si Erreur

1. **Clique sur le déploiement**
2. **Onglet "Logs"** : Voir l'erreur
3. **Corrige** et redéploie

### Si Succès

1. **Copie l'URL** : `https://td-tech.vercel.app`
2. **Ouvre dans ton navigateur**
3. **Vérifie** :
   - ✅ Page d'accueil avec "TDTech"
   - ✅ "Tidiane Diallo - Développeur Fullstack"
   - ✅ En français
   - ✅ Plus de "Used Phones" ou portugais

---

## ✅ ÉTAPE 8 : Mettre à Jour AUTH_URL (Si Nécessaire)

Si l'URL réelle est différente de `td-tech.vercel.app` :

1. **Copie l'URL réelle** du dashboard Vercel
2. **Settings** → **Environment Variables**
3. **Modifie `AUTH_URL`** avec la vraie URL
4. **Redéploie** (ou attends le prochain push)

---

## ✅ ÉTAPE 9 : Exécuter les Migrations (Si Nécessaire)

Si le build réussit mais la base de données est vide :

```bash
npm install -g vercel
vercel login
vercel link
vercel env pull .env.local
npx prisma migrate deploy
npx prisma db seed
```

---

## 📋 Checklist Finale

- [ ] Ancien projet supprimé
- [ ] Nouveau projet créé
- [ ] Repository = `TIDIALLO/td-tech` ✅
- [ ] Project Name = `td-tech` ✅
- [ ] Install Command = `npm install --legacy-peer-deps` ✅
- [ ] Variables d'environnement ajoutées (3 minimum)
- [ ] Déploiement lancé
- [ ] Build réussi
- [ ] Site accessible
- [ ] Contenu correct (TDTech, français)

---

## 🎉 Résultat

Une fois terminé :
- ✅ URL : `https://td-tech.vercel.app`
- ✅ Site fonctionnel
- ✅ Prêt à partager avec ton mentor !

---

**Suis ces étapes dans l'ordre et tout devrait fonctionner !** 🚀

