# 🔗 Obtenir la Connection String PostgreSQL depuis Neon

## ⚠️ Différence importante

- **API Key** : Utilisée pour l'API Neon (gestion programmatique)
- **Connection String** : Utilisée pour se connecter à PostgreSQL (ce dont tu as besoin pour Vercel)

**Tu as besoin de la Connection String, pas de l'API Key !**

---

## 📍 Comment obtenir la Connection String

### Méthode 1 : Depuis le Dashboard Neon

1. **Va sur** : [console.neon.tech](https://console.neon.tech)
2. **Connecte-toi** avec GitHub
3. **Sélectionne ton projet**
4. **Sur la page principale**, cherche une section qui dit :
   - **"Connection Details"**
   - **"Connection String"**
   - **"Postgres connection string"**
   - **"Connect"** (bouton)

5. **Clique sur "Show"** ou **"Copy"** à côté de la connection string

### Méthode 2 : Depuis l'onglet Connection Details

1. **Dans ton projet Neon**, cherche un onglet ou un lien **"Connection Details"**
2. **Tu verras plusieurs options** :
   - **Connection String** ← **C'est celui-là qu'il te faut !**
   - **Pooled connection** (optionnel)
   - **Postgres connection string**

3. **Sélectionne "Connection String"** (le premier, pas "Pooled")
4. **Clique sur "Copy"**

### Méthode 3 : Si tu ne vois pas de base de données

Si tu viens de créer le projet, tu dois peut-être créer une base de données :

1. **Dans le dashboard**, cherche **"Databases"** ou **"Create Database"**
2. **Crée une nouvelle base** (ex: `portfolio_db` ou `tdtech_db`)
3. **Une fois créée**, la connection string apparaîtra automatiquement

---

## 🔍 À quoi ressemble une Connection String Neon ?

```
postgresql://username:password@ep-cool-darkness-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
```

**Format typique** :
- Commence par `postgresql://`
- Contient `@ep-xxxx-xxxx` (endpoint Neon)
- Contient `.aws.neon.tech` ou `.neon.tech`
- Se termine par `?sslmode=require`

---

## 📸 Où chercher dans l'interface ?

**Emplacements possibles** :

1. **Page d'accueil du projet** → Section en haut ou au centre
2. **Onglet "Connection Details"** → En haut du dashboard
3. **Onglet "Databases"** → Clique sur ta base → Détails
4. **Bouton "Connect"** → Ouvre un modal avec la connection string

---

## 💡 Si tu ne trouves toujours pas

### Option A : Créer un nouveau projet

1. **Clique sur "New Project"** (ou "Create Project")
2. **Donne un nom** (ex: `tdtech-production`)
3. **Sélectionne une région** (ex: `Europe (Frankfurt)`)
4. **Clique sur "Create Project"**
5. **La connection string s'affichera** juste après la création
6. **Clique sur "Copy"** pour la copier

### Option B : Utiliser l'API Neon (si tu as l'API key)

Si tu veux utiliser l'API key que tu as, tu peux récupérer la connection string via l'API, mais c'est plus compliqué. Il est plus simple de la trouver dans l'interface.

---

## ✅ Une fois que tu as la Connection String

1. **Copie-la complètement** (tout le texte de `postgresql://` jusqu'à la fin)
2. **Va sur Vercel** → Ton projet → **"Settings"** → **"Environment Variables"**
3. **Ajoute une variable** :
   - **Name** : `DATABASE_URL`
   - **Value** : Colle la connection string complète
   - **Environments** : Coche ✅ **Production**
4. **Clique sur "Save"**

---

## 🚨 Important

- **Ne partage JAMAIS** ta connection string publiquement
- **Ne la commite JAMAIS** dans Git (elle est déjà dans `.gitignore`)
- **L'API key** que tu as peut être utile pour d'autres choses, mais **pas pour Vercel**

---

**Si tu as toujours du mal à la trouver, dis-moi ce que tu vois exactement dans ton dashboard Neon et je t'aiderai à la localiser !** 🔍

