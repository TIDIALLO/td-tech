# ⚡ Étapes Rapides pour Résoudre le 404 et Obtenir une URL Propre

## 🎯 Objectif

- ✅ Corriger l'erreur 404
- ✅ Obtenir une URL propre : `https://td-tech.vercel.app` (sans "xxxx")

---

## 📋 Étapes en 5 Minutes

### 1️⃣ Vérifier/Créer le Projet

**Va sur** : [vercel.com/dashboard](https://vercel.com/dashboard)

**Si le projet n'existe pas** :
- Clique sur **"Add New Project"**
- Importe `td-tech` depuis GitHub
- **IMPORTANT** : Nom du projet = `td-tech` (pour URL propre)

**Si le projet existe** :
- Va dans **Settings** → **General**
- Change **Project Name** en `td-tech`
- **Save**

---

### 2️⃣ Configurer les Variables (OBLIGATOIRE)

**Settings** → **Environment Variables** → **Add New**

**Copie-colle ces 3 variables OBLIGATOIRES** :

```
DATABASE_URL = postgresql://neondb_owner:npg_IM9dq5hCxOyo@ep-holy-bar-adkfxk8a-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

AUTH_SECRET = yLsy9d/nkotK+ds/Jzaq+McZlB/lTU/c3jOsASZjDec=

AUTH_URL = https://td-tech.vercel.app
```

**Pour chaque variable** : Coche ✅ **Production** → **Save**

---

### 3️⃣ Déployer

**Si nouveau projet** :
- Clique sur **"Deploy"**

**Si projet existant** :
- **Deployments** → **"Redeploy"**
- OU : `git push origin main` (redéploie automatiquement)

---

### 4️⃣ Attendre et Vérifier

1. **Attends 2-5 minutes** (build en cours)
2. **Vérifie le statut** :
   - ✅ **Ready** = Succès
   - ❌ **Error** = Voir les logs
3. **Copie l'URL** : `https://td-tech.vercel.app`
4. **Teste** : Ouvre l'URL dans ton navigateur

---

### 5️⃣ Si Toujours 404

**Vérifie** :
- [ ] Le build est "Ready" (pas "Error")
- [ ] Les 3 variables sont configurées
- [ ] L'URL utilisée est exactement celle du dashboard
- [ ] Le nom du projet est `td-tech`

**Si erreur de build** :
- Clique sur le déploiement
- **Logs** : Voir l'erreur
- Corrige et redéploie

---

## ✅ Résultat

Une fois terminé :
- ✅ URL : `https://td-tech.vercel.app` (propre, sans "xxxx")
- ✅ Pas d'erreur 404
- ✅ Site fonctionnel
- ✅ Prêt à partager ! 🎉

---

**Suis ces 5 étapes et ça devrait fonctionner !** 🚀

