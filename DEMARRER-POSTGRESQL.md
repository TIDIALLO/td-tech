# 🔧 Comment démarrer PostgreSQL

## ❌ Erreur actuelle

```
Can't reach database server at `localhost:5432`
Please make sure your database server is running at `localhost:5432`.
```

**Cause** : PostgreSQL n'est pas démarré sur ton ordinateur.

---

## ✅ Solution 1 : Utiliser Docker (RECOMMANDÉ - Plus simple)

### Avantages
- ✅ Pas besoin d'installer PostgreSQL sur Windows
- ✅ Facile à démarrer/arrêter
- ✅ Isolé du système

### Commandes

```bash
# 1. Démarrer PostgreSQL avec Docker
docker run --name portfolio-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=portfolio_db -p 5432:5432 -d postgres:16-alpine

# 2. Vérifier que ça tourne
docker ps

# 3. Initialiser la base de données
npx prisma migrate dev --name init
npx prisma db seed

# 4. Redémarrer le serveur Next.js
npm run dev
```

### Pour arrêter PostgreSQL plus tard
```bash
docker stop portfolio-postgres
```

### Pour redémarrer PostgreSQL
```bash
docker start portfolio-postgres
```

---

## ✅ Solution 2 : Installer PostgreSQL sur Windows

### Si tu n'as pas encore PostgreSQL installé

1. **Télécharge PostgreSQL** : https://www.postgresql.org/download/windows/
2. **Installe-le** avec les paramètres par défaut
3. **Note le mot de passe** que tu définis pendant l'installation

### Si PostgreSQL est déjà installé mais pas démarré

#### Option A : Via les Services Windows

1. Appuie sur `Windows + R`
2. Tape `services.msc` et appuie sur Entrée
3. Cherche **"postgresql"** dans la liste
4. Clique droit → **Démarrer**

#### Option B : Via la ligne de commande (PowerShell en Admin)

```powershell
# Démarrer le service PostgreSQL
Start-Service postgresql-x64-16

# Vérifier le statut
Get-Service postgresql-x64-16
```

**Note** : Le nom du service peut varier selon ta version (postgresql-x64-14, postgresql-x64-15, etc.)

### Créer la base de données

```bash
# 1. Se connecter à PostgreSQL
psql -U postgres

# 2. Créer la base de données
CREATE DATABASE portfolio_db;

# 3. Quitter psql
\q

# 4. Initialiser avec Prisma
npx prisma migrate dev --name init
npx prisma db seed

# 5. Redémarrer Next.js
npm run dev
```

---

## ✅ Solution 3 : Utiliser Docker Compose (Automatique)

### Avantage
Démarre PostgreSQL ET l'application Next.js ensemble.

### Commandes

```bash
# 1. Démarrer tout (PostgreSQL + Next.js)
docker-compose up -d

# 2. Initialiser la base de données
docker-compose exec app npx prisma migrate dev --name init
docker-compose exec app npx prisma db seed

# 3. Voir les logs
docker-compose logs -f app
```

### Accéder à l'application
- **Application** : http://localhost:3000
- **PostgreSQL** : localhost:5432

### Arrêter tout
```bash
docker-compose down
```

---

## 🔍 Vérifier que PostgreSQL fonctionne

### Test de connexion

```bash
# Avec psql (si installé)
psql -U postgres -h localhost -p 5432

# Avec Docker
docker exec -it portfolio-postgres psql -U postgres
```

Si tu peux te connecter, PostgreSQL fonctionne ! ✅

---

## 📝 Modifier la connexion à la base de données

Si tu utilises un mot de passe différent ou un port différent, modifie `.env.local` :

```env
# Exemple avec un mot de passe personnalisé
DATABASE_URL="postgresql://postgres:TON_MOT_DE_PASSE@localhost:5432/portfolio_db?schema=public"

# Exemple avec un port différent
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/portfolio_db?schema=public"
```

---

## 🎯 Quelle solution choisir ?

| Solution | Avantages | Inconvénients |
|----------|-----------|---------------|
| **Docker** (Solution 1) | ✅ Simple<br>✅ Rapide<br>✅ Isolé | ⚠️ Nécessite Docker |
| **PostgreSQL Windows** (Solution 2) | ✅ Natif<br>✅ Permanent | ⚠️ Installation requise<br>⚠️ Plus complexe |
| **Docker Compose** (Solution 3) | ✅ Tout automatique<br>✅ Production-ready | ⚠️ Nécessite Docker |

**Recommandation** : Utilise **Docker** (Solution 1) si tu as Docker installé. C'est le plus simple !

---

## 🚀 Après avoir démarré PostgreSQL

```bash
# 1. Créer les tables
npx prisma migrate dev --name init

# 2. Peupler avec des données d'exemple
npx prisma db seed

# 3. Redémarrer Next.js
npm run dev

# 4. Ouvrir l'application
# http://localhost:3000
```

---

## ❓ Problèmes courants

### "docker: command not found"
→ Docker n'est pas installé. Télécharge-le : https://www.docker.com/products/docker-desktop/

### "Port 5432 is already in use"
→ PostgreSQL est déjà démarré ailleurs. Utilise `docker ps` ou vérifie les services Windows.

### "password authentication failed"
→ Vérifie le mot de passe dans `.env.local`

### "database 'portfolio_db' does not exist"
→ Crée la base : `CREATE DATABASE portfolio_db;` dans psql

---

## ✅ Une fois PostgreSQL démarré

Tu verras ce message dans les logs Next.js :

```
✓ Compiled / in 2s
GET / 200 in 500ms
```

Au lieu de :

```
❌ Can't reach database server at `localhost:5432`
```

---

**Choisis une solution et suis les étapes ! 🚀**


