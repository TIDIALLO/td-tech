# 🚀 Mettre le Projet sur GitHub

## ✅ Étape 1 : Git Initialisé

Le repository Git a été initialisé et le commit initial a été créé.

---

## 📋 Étape 2 : Créer le Repository sur GitHub

### Option A : Via l'Interface Web GitHub

1. **Aller sur GitHub** : https://github.com
2. **Cliquer sur le "+"** en haut à droite → "New repository"
3. **Remplir les informations** :
   - **Repository name** : `mon-site-perso` (ou le nom que tu veux)
   - **Description** : "Portfolio Pro - Site web personnel avec Next.js 15, TypeScript, Prisma et PostgreSQL"
   - **Visibilité** : Public ou Private (selon ton choix)
   - **NE PAS** cocher "Initialize with README" (on a déjà un README)
   - **NE PAS** ajouter .gitignore ou license (on a déjà)
4. **Cliquer sur "Create repository"**

### Option B : Via GitHub CLI (si installé)

```bash
gh repo create mon-site-perso --public --description "Portfolio Pro - Site web personnel avec Next.js 15"
```

---

## 🔗 Étape 3 : Connecter le Repository Local à GitHub

### Remplacer `<TON-USERNAME>` par ton nom d'utilisateur GitHub

```bash
# Ajouter le remote GitHub
git remote add origin https://github.com/<TON-USERNAME>/mon-site-perso.git

# Vérifier que le remote est bien ajouté
git remote -v
```

**Exemple** :
```bash
git remote add origin https://github.com/tidianediallo/mon-site-perso.git
```

---

## 📤 Étape 4 : Pousser le Code sur GitHub

```bash
# Renommer la branche principale en "main" (si nécessaire)
git branch -M main

# Pousser le code sur GitHub
git push -u origin main
```

Si tu as déjà une branche "master" :
```bash
git branch -M master main
git push -u origin main
```

---

## 🔐 Étape 5 : Authentification GitHub

### Si tu utilises HTTPS :

GitHub demandera tes identifiants. Tu peux utiliser :

1. **Token d'accès personnel** (recommandé) :
   - Aller sur GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Générer un nouveau token avec les permissions `repo`
   - Utiliser ce token comme mot de passe

2. **GitHub CLI** :
   ```bash
   gh auth login
   ```

### Si tu utilises SSH :

```bash
# Changer le remote en SSH
git remote set-url origin git@github.com:<TON-USERNAME>/mon-site-perso.git

# Pousser
git push -u origin main
```

---

## ✅ Vérification

Après avoir poussé, vérifie sur GitHub :
- ✅ Tous les fichiers sont présents
- ✅ Le README.md s'affiche correctement
- ✅ Le .gitignore fonctionne (pas de node_modules, .env, etc.)

---

## 🔄 Commandes Utiles pour Plus Tard

### Ajouter des modifications :

```bash
# Voir les fichiers modifiés
git status

# Ajouter tous les fichiers modifiés
git add .

# Créer un commit
git commit -m "Description des modifications"

# Pousser sur GitHub
git push
```

### Créer une nouvelle branche :

```bash
# Créer et basculer sur une nouvelle branche
git checkout -b feature/nouvelle-fonctionnalite

# Pousser la branche
git push -u origin feature/nouvelle-fonctionnalite
```

### Voir l'historique :

```bash
git log --oneline
```

---

## 🎯 Prochaines Étapes Recommandées

1. **Ajouter une description** sur la page GitHub du repo
2. **Ajouter des topics** : `nextjs`, `typescript`, `portfolio`, `prisma`, `postgresql`
3. **Créer un fichier LICENSE** si tu veux partager le code
4. **Configurer GitHub Actions** pour le CI/CD (déjà configuré dans `.github/workflows/deploy.yml`)
5. **Ajouter des secrets** dans GitHub Settings → Secrets pour le déploiement automatique

---

## 🚨 Fichiers à NE PAS Commiter

Le `.gitignore` est configuré pour exclure :
- ✅ `node_modules/`
- ✅ `.env` et `.env*.local`
- ✅ `.next/`
- ✅ `prisma/migrations/`
- ✅ Fichiers temporaires

**⚠️ Important** : Ne jamais commiter tes fichiers `.env` avec tes vraies clés secrètes !

---

## 📝 Résumé des Commandes

```bash
# 1. Créer le repo sur GitHub (via interface web)

# 2. Connecter le repo local
git remote add origin https://github.com/<TON-USERNAME>/mon-site-perso.git

# 3. Pousser le code
git branch -M main
git push -u origin main
```

---

**👉 Ton projet est maintenant prêt à être poussé sur GitHub ! 🚀**

