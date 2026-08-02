# 📥 Guide : Importer les Variables dans Vercel

## 📋 Fichiers Créés

J'ai créé **2 fichiers** pour t'aider :

1. **`env.vercel.txt`** - Variables spécifiques pour Vercel (avec ta connection string Neon)
2. **`.env.example`** - Template général pour le développement local

---

## 🚀 Comment Utiliser env.vercel.txt

### Étape 1 : Ouvrir le fichier

Ouvre le fichier **`env.vercel.txt`** que je viens de créer.

### Étape 2 : Générer AUTH_SECRET

**Avant d'ajouter les variables dans Vercel**, génère une clé secrète :

**Option 1 - En ligne** (le plus simple) :
- Va sur : https://generate-secret.vercel.app/32
- Copie la clé générée

**Option 2 - PowerShell** :
```powershell
openssl rand -base64 32
```

### Étape 3 : Ajouter les Variables dans Vercel

1. **Va sur** : [vercel.com/dashboard](https://vercel.com/dashboard)
2. **Sélectionne ton projet** (ou crée-le si ce n'est pas fait)
3. **Clique sur "Settings"**
4. **Clique sur "Environment Variables"**
5. **Pour chaque variable dans `env.vercel.txt`** :

   **Variable 1 : DATABASE_URL**
   - **Key** : `DATABASE_URL`
   - **Value** : `postgresql://[REVOQUE-VOIR-.env-LOCAL]`
   - **Environments** : ✅ Production
   - **Save**

   **Variable 2 : AUTH_SECRET**
   - **Key** : `AUTH_SECRET`
   - **Value** : [Colle la clé que tu as générée]
   - **Environments** : ✅ Production
   - **Save**

   **Variable 3 : AUTH_URL**
   - **Key** : `AUTH_URL`
   - **Value** : `https://td-tech.vercel.app` (ou le nom réel de ton projet)
   - **Environments** : ✅ Production
   - **Save**

   **Variable 4 : RESEND_API_KEY** (Optionnel)
   - **Key** : `RESEND_API_KEY`
   - **Value** : `[RESEND_API_KEY_REVOQUE]`
   - **Environments** : ✅ Production
   - **Save**

   **Variable 5 : RESEND_FROM_EMAIL** (Optionnel)
   - **Key** : `RESEND_FROM_EMAIL`
   - **Value** : `onboarding@resend.dev`
   - **Environments** : ✅ Production
   - **Save**

   **Variable 6 : ADMIN_EMAIL** (Optionnel)
   - **Key** : `ADMIN_EMAIL`
   - **Value** : `admin@tidianediallo.com`
   - **Environments** : ✅ Production
   - **Save**

   **Variable 7 : ADMIN_PASSWORD** (Optionnel)
   - **Key** : `ADMIN_PASSWORD`
   - **Value** : `[MOT_DE_PASSE_ADMIN_REVOQUE]`
   - **Environments** : ✅ Production
   - **Save**

---

## ✅ Checklist

**Variables OBLIGATOIRES** :
- [ ] `DATABASE_URL` ✅ (tu l'as dans env.vercel.txt)
- [ ] `AUTH_SECRET` (à générer)
- [ ] `AUTH_URL` (URL temporaire, à mettre à jour après)

**Variables OPTIONNELLES** :
- [ ] `RESEND_API_KEY`
- [ ] `RESEND_FROM_EMAIL`
- [ ] `ADMIN_EMAIL`
- [ ] `ADMIN_PASSWORD`

---

## 🎯 Après avoir ajouté les variables

1. **Clique sur "Deploy"** dans Vercel
2. **Vercel va builder le projet** (2-5 minutes)
3. **Une fois terminé**, note l'URL réelle de ton site
4. **Mets à jour `AUTH_URL`** avec l'URL réelle dans Vercel

---

## 🔄 Mettre à jour AUTH_URL après le déploiement

Une fois que Vercel a généré l'URL de ton site :

1. **Copie l'URL réelle** (ex: `https://td-tech-xyz123.vercel.app`)
2. **Va dans Vercel** → Settings → Environment Variables
3. **Modifie `AUTH_URL`** avec la vraie URL
4. **Redéploie** (ou attends le prochain push)

---

## 💡 Astuce

**Vercel ne permet pas d'importer directement un fichier .env**, mais tu peux :
- **Copier-coller** les valeurs depuis `env.vercel.txt`
- **Ou utiliser Vercel CLI** pour synchroniser (mais c'est plus complexe)

**La méthode manuelle est la plus simple et la plus sûre !** ✅

---

**✅ Une fois toutes les variables ajoutées, tu peux déployer !** 🚀

