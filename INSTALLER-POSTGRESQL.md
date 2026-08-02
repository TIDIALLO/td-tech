# 🚀 Installation PostgreSQL - Guide Simple

## 📊 Situation actuelle

- ❌ Docker n'est pas installé
- ❌ PostgreSQL n'est pas installé
- ✅ L'application est prête à fonctionner

**Tu dois installer PostgreSQL pour que l'application fonctionne.**

---

## 🎯 Option 1 : Installer PostgreSQL (RECOMMANDÉ pour débutant)

### Étape 1 : Télécharger PostgreSQL

1. Va sur : https://www.postgresql.org/download/windows/
2. Clique sur **"Download the installer"**
3. Choisis la **dernière version** (16.x)
4. Télécharge le fichier pour Windows x86-64

### Étape 2 : Installer PostgreSQL

1. **Lance l'installateur** (double-clic sur le fichier téléchargé)
2. Clique sur **"Next"** plusieurs fois
3. **IMPORTANT** : Quand on te demande un mot de passe :
   - Utilise : `postgres`
   - Note-le quelque part !
4. **Port** : Laisse `5432` (par défaut)
5. Continue en cliquant sur **"Next"** jusqu'à la fin
6. Clique sur **"Finish"**

### Étape 3 : Vérifier l'installation

Ouvre PowerShell et tape :

```powershell
psql --version
```

Si tu vois un numéro de version, c'est bon ! ✅

### Étape 4 : Créer la base de données

```powershell
# 1. Se connecter à PostgreSQL
psql -U postgres

# 2. Entrer le mot de passe (celui que tu as défini)

# 3. Créer la base de données
CREATE DATABASE portfolio_db;

# 4. Vérifier
\l

# 5. Quitter
\q
```

### Étape 5 : Initialiser avec Prisma

```bash
# Créer les tables
npx prisma migrate dev --name init

# Peupler avec des données
npx prisma db seed

# Redémarrer Next.js
npm run dev
```

### Étape 6 : Tester

Ouvre http://localhost:3000 - Ça devrait fonctionner ! ✅

---

## 🐳 Option 2 : Installer Docker Desktop (Alternative)

### Avantages
- Plus simple à gérer
- Pas besoin d'installer PostgreSQL directement
- Facile à démarrer/arrêter

### Étape 1 : Télécharger Docker Desktop

1. Va sur : https://www.docker.com/products/docker-desktop/
2. Télécharge **Docker Desktop for Windows**
3. Installe-le (redémarrage requis)

### Étape 2 : Démarrer PostgreSQL avec Docker

```bash
# Démarrer PostgreSQL
docker run --name portfolio-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=portfolio_db -p 5432:5432 -d postgres:16-alpine

# Attendre 10 secondes que PostgreSQL démarre

# Initialiser la base
npx prisma migrate dev --name init
npx prisma db seed

# Redémarrer Next.js
npm run dev
```

---

## 🆚 Quelle option choisir ?

| Critère | PostgreSQL natif | Docker |
|---------|------------------|--------|
| **Simplicité** | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Taille** | ~200 MB | ~500 MB |
| **Démarrage auto** | ✅ Oui | ⚠️ Manuel |
| **Isolation** | ❌ Non | ✅ Oui |
| **Recommandé pour** | Débutants | Développeurs |

**Ma recommandation** : Si tu débutes, installe **PostgreSQL natif** (Option 1).

---

## 📝 Configuration après installation

### Si tu as utilisé un mot de passe différent

Modifie le fichier `.env.local` :

```env
DATABASE_URL="postgresql://postgres:TON_MOT_DE_PASSE@localhost:5432/portfolio_db?schema=public"
```

Remplace `TON_MOT_DE_PASSE` par le mot de passe que tu as choisi.

---

## ✅ Vérifier que tout fonctionne

### Test 1 : PostgreSQL est démarré

```powershell
# Avec PostgreSQL natif
Get-Service | Where-Object {$_.Name -like "*postgres*"}

# Avec Docker
docker ps
```

### Test 2 : Connexion à la base

```bash
# Avec PostgreSQL natif
psql -U postgres -d portfolio_db

# Avec Docker
docker exec -it portfolio-postgres psql -U postgres -d portfolio_db
```

### Test 3 : L'application fonctionne

```bash
npm run dev
```

Puis ouvre http://localhost:3000

Si tu vois la page d'accueil sans erreur, **c'est bon !** ✅

---

## 🎯 Résumé des commandes après installation

```bash
# 1. Créer les tables
npx prisma migrate dev --name init

# 2. Peupler avec des données d'exemple
npx prisma db seed

# 3. Lancer l'application
npm run dev

# 4. Se connecter en admin
# http://localhost:3000/auth/signin
# Email: admin@tidianediallo.com
# Password: [MOT_DE_PASSE_ADMIN_REVOQUE]
```

---

## ❓ Problèmes courants

### "psql: command not found"
→ Ajoute PostgreSQL au PATH ou utilise le chemin complet :
```
"C:\Program Files\PostgreSQL\16\bin\psql.exe" -U postgres
```

### "password authentication failed"
→ Vérifie le mot de passe dans `.env.local`

### "port 5432 is already in use"
→ PostgreSQL est déjà démarré, c'est bon !

### "FATAL: database 'portfolio_db' does not exist"
→ Crée la base avec : `CREATE DATABASE portfolio_db;`

---

## 🎉 Une fois installé

Tu n'auras plus besoin de réinstaller PostgreSQL. Il démarrera automatiquement avec Windows.

Pour gérer PostgreSQL :
- **Arrêter** : `Stop-Service postgresql-x64-16`
- **Démarrer** : `Start-Service postgresql-x64-16`
- **Statut** : `Get-Service postgresql-x64-16`

---

**Choisis une option et suis les étapes ! Ton application sera opérationnelle en 10 minutes ! 🚀**


