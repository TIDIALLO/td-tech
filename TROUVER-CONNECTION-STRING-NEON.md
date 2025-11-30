# 🔗 Comment Trouver la Connection String sur Neon

## 📍 Méthode 1 : Depuis le Dashboard Neon

### Étape 1 : Accéder au Dashboard
1. **Va sur** : [console.neon.tech](https://console.neon.tech)
2. **Connecte-toi** avec ton compte GitHub
3. **Sélectionne ton projet** (celui lié à ton repo)

### Étape 2 : Trouver la Connection String
1. **Dans le dashboard**, tu verras une section **"Connection Details"** ou **"Connection String"**
2. **Clique sur "Show Connection String"** ou **"Copy"**
3. **La connection string ressemble à** :
   ```
   postgresql://username:password@ep-xxxx-xxxx.region.aws.neon.tech/database?sslmode=require
   ```

### Étape 3 : Copier la Connection String
- **Clique sur le bouton "Copy"** à côté de la connection string
- **✅ Note-la** : Tu en auras besoin pour Vercel

---

## 📍 Méthode 2 : Depuis l'onglet "Connection Details"

1. **Dans ton projet Neon**, va dans l'onglet **"Connection Details"** (ou **"Settings"**)
2. **Tu verras plusieurs formats** :
   - **Connection String** (c'est celui-là qu'il te faut)
   - **Postgres connection string**
   - **Pooled connection** (optionnel, pour les connexions multiples)

3. **Sélectionne "Connection String"** (pas "Pooled")
4. **Clique sur "Copy"**

---

## 📍 Méthode 3 : Si tu ne vois pas la Connection String

### Créer une nouvelle base de données
1. **Dans le dashboard Neon**, clique sur **"Create Database"** ou **"New Database"**
2. **Donne un nom** (ex: `portfolio_db` ou `tdtech_db`)
3. **Une fois créée**, la connection string apparaîtra automatiquement

### Ou créer un nouveau projet
1. **Clique sur "New Project"**
2. **Donne un nom au projet**
3. **Sélectionne une région** (ex: `Europe (Frankfurt)`)
4. **Clique sur "Create Project"**
5. **La connection string sera affichée** juste après la création

---

## 🔍 À quoi ressemble une Connection String Neon ?

```
postgresql://username:password@ep-cool-darkness-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
```

**Composants** :
- `postgresql://` - Protocole
- `username:password` - Identifiants (générés automatiquement)
- `ep-xxxx-xxxx.region.aws.neon.tech` - Serveur Neon
- `neondb` - Nom de la base de données
- `?sslmode=require` - Mode SSL (obligatoire pour Neon)

---

## ✅ Vérification

**Une bonne connection string Neon** :
- ✅ Commence par `postgresql://`
- ✅ Contient `@ep-` (endpoint Neon)
- ✅ Contient `.aws.neon.tech` ou `.neon.tech`
- ✅ Se termine par `?sslmode=require`

---

## 🚨 Important

- **Ne partage JAMAIS** ta connection string publiquement
- **Ne la commite JAMAIS** dans Git (elle est déjà dans `.gitignore`)
- **Utilise-la uniquement** dans les variables d'environnement Vercel

---

## 📸 Où trouver dans l'interface Neon ?

**Emplacements possibles** :
1. **Page d'accueil du projet** → Section "Connection Details"
2. **Onglet "Settings"** → "Connection String"
3. **Onglet "Databases"** → Clique sur ta base → "Connection String"
4. **Après création d'un projet** → Affichée directement

---

## 💡 Astuce

Si tu ne trouves toujours pas :
1. **Clique sur ton nom d'utilisateur** (en haut à droite)
2. **Va dans "Projects"**
3. **Sélectionne ton projet**
4. **La connection string devrait être visible** sur la page principale

---

**Une fois que tu as la connection string, copie-la et ajoute-la comme variable `DATABASE_URL` dans Vercel !** 🚀

