# 🚀 Configuration CI/CD - GitHub Actions

## ✅ Workflows Créés

### 1. **CI Workflow** (`.github/workflows/ci.yml`)
- ✅ Tests et lint sur chaque Pull Request
- ✅ Build de vérification
- ✅ Type checking TypeScript

### 2. **Deploy Workflow** (`.github/workflows/deploy.yml`)
- ✅ Déploiement automatique sur push vers `master`/`main`
- ✅ Support VPS (SSH) et Vercel
- ✅ Tests avant déploiement

---

## 🔐 Configuration des Secrets GitHub

### Étape 1 : Accéder aux Secrets

1. Va sur ton repository GitHub : https://github.com/TIDIALLO/td-tech
2. Clique sur **Settings** (en haut à droite)
3. Dans le menu de gauche, clique sur **Secrets and variables** → **Actions**
4. Clique sur **New repository secret**

---

## 📋 Secrets Requis pour VPS

### Option A : Déploiement sur VPS (SSH)

#### 1. `VPS_HOST`
- **Description** : Adresse IP ou domaine de ton VPS
- **Exemple** : `123.456.789.0` ou `vps.tidianediallo.com`
- **Comment obtenir** : Vérifie dans ton panneau Hostinger

#### 2. `VPS_USERNAME`
- **Description** : Nom d'utilisateur SSH
- **Exemple** : `root` ou `ubuntu` ou `deploy`
- **Comment obtenir** : Utilisateur SSH configuré sur ton VPS

#### 3. `VPS_SSH_KEY`
- **Description** : Clé SSH privée pour se connecter au VPS
- **Comment créer** :
  ```bash
  # Sur ton ordinateur local
  ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_actions
  
  # Copier la clé PUBLIQUE sur le VPS
  ssh-copy-id -i ~/.ssh/github_actions.pub user@vps-host
  
  # Copier le contenu de la clé PRIVÉE pour GitHub
  cat ~/.ssh/github_actions
  ```
- **Important** : Copie TOUT le contenu, y compris `-----BEGIN OPENSSH PRIVATE KEY-----` et `-----END OPENSSH PRIVATE KEY-----`

#### 4. `VPS_PORT` (Optionnel)
- **Description** : Port SSH (par défaut : 22)
- **Exemple** : `22` ou `2222`

#### 5. `VPS_DEPLOY_PATH` (Optionnel)
- **Description** : Chemin du projet sur le VPS
- **Exemple** : `/var/www/td-tech` ou `/home/user/td-tech`
- **Par défaut** : `/var/www/td-tech`

#### 6. `VPS_URL` (Optionnel)
- **Description** : URL publique de ton site
- **Exemple** : `https://tidianediallo.com`

#### 7. `DATABASE_URL`
- **Description** : URL de connexion PostgreSQL
- **Format** : `postgresql://user:password@host:5432/database?schema=public`
- **Exemple** : `postgresql://postgres:mypassword@localhost:5432/portfolio_db?schema=public`

#### 8. `AUTH_SECRET`
- **Description** : Clé secrète pour Auth.js
- **Comment générer** :
  ```bash
  openssl rand -base64 32
  ```
- **Exemple** : `aBc123XyZ456...`

---

## 🌐 Secrets pour Vercel (Alternative)

### Option B : Déploiement sur Vercel

#### 1. `VERCEL_TOKEN`
- **Description** : Token d'API Vercel
- **Comment obtenir** :
  1. Va sur https://vercel.com/account/tokens
  2. Crée un nouveau token
  3. Copie le token

#### 2. `VERCEL_ORG_ID`
- **Description** : ID de ton organisation Vercel
- **Comment obtenir** :
  1. Va sur https://vercel.com/account
  2. Va dans Settings → General
  3. Copie l'Organization ID

#### 3. `VERCEL_PROJECT_ID`
- **Description** : ID du projet Vercel
- **Comment obtenir** :
  1. Crée un projet sur Vercel
  2. Va dans Settings → General
  3. Copie le Project ID

---

## 🔧 Configuration du VPS

### Prérequis sur le VPS

#### 1. Installer les dépendances

```bash
# Mettre à jour le système
sudo apt update && sudo apt upgrade -y

# Installer Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Installer Docker (optionnel mais recommandé)
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Installer Docker Compose
sudo apt install docker-compose -y

# Installer Git
sudo apt install git -y

# Installer PM2 (optionnel, pour gestion de processus)
sudo npm install -g pm2
```

#### 2. Cloner le projet

```bash
# Créer le répertoire
sudo mkdir -p /var/www
cd /var/www

# Cloner le repository
sudo git clone https://github.com/TIDIALLO/td-tech.git
cd td-tech

# Donner les permissions
sudo chown -R $USER:$USER /var/www/td-tech
```

#### 3. Configurer les variables d'environnement

```bash
cd /var/www/td-tech

# Créer le fichier .env
nano .env
```

Ajouter :
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/portfolio_db?schema=public"
AUTH_SECRET="ton-secret-key"
AUTH_URL="https://tidianediallo.com"
NODE_ENV="production"
```

#### 4. Configurer SSH pour GitHub Actions

```bash
# Créer un utilisateur pour le déploiement (optionnel mais recommandé)
sudo adduser deploy
sudo usermod -aG sudo deploy

# Configurer la clé SSH
sudo mkdir -p /home/deploy/.ssh
sudo nano /home/deploy/.ssh/authorized_keys
# Coller ta clé publique GitHub Actions

sudo chown -R deploy:deploy /home/deploy/.ssh
sudo chmod 700 /home/deploy/.ssh
sudo chmod 600 /home/deploy/.ssh/authorized_keys
```

---

## 🐳 Configuration Docker (Optionnel)

### Si tu utilises Docker :

```bash
cd /var/www/td-tech

# Créer le fichier .env pour Docker
nano .env

# Lancer avec Docker Compose
docker-compose up -d --build

# Voir les logs
docker-compose logs -f
```

---

## ✅ Test du CI/CD

### 1. Test du CI (Pull Request)

1. Crée une branche :
   ```bash
   git checkout -b test-ci
   ```

2. Fais une petite modification et commit :
   ```bash
   git add .
   git commit -m "Test CI"
   git push origin test-ci
   ```

3. Crée une Pull Request sur GitHub
4. Le workflow CI va s'exécuter automatiquement

### 2. Test du Déploiement

1. Push vers `master` :
   ```bash
   git checkout master
   git merge test-ci
   git push origin master
   ```

2. Le workflow de déploiement va s'exécuter
3. Vérifie les logs dans l'onglet **Actions** sur GitHub

---

## 🔍 Vérification des Workflows

### Sur GitHub :

1. Va sur https://github.com/TIDIALLO/td-tech
2. Clique sur l'onglet **Actions**
3. Tu verras tous les workflows exécutés
4. Clique sur un workflow pour voir les détails

### Commandes utiles sur le VPS :

```bash
# Vérifier que le code est à jour
cd /var/www/td-tech
git status

# Voir les logs Docker
docker-compose logs -f app

# Voir les processus PM2
pm2 list
pm2 logs td-tech

# Vérifier que l'application tourne
curl http://localhost:3000
```

---

## 🚨 Dépannage

### Erreur : "Permission denied (publickey)"

**Solution** :
- Vérifie que la clé SSH est bien configurée dans les secrets GitHub
- Vérifie que la clé publique est sur le VPS dans `~/.ssh/authorized_keys`
- Teste la connexion manuellement : `ssh -i ~/.ssh/github_actions user@vps-host`

### Erreur : "Directory not found"

**Solution** :
- Vérifie que `VPS_DEPLOY_PATH` est correct dans les secrets
- Crée le répertoire sur le VPS : `sudo mkdir -p /var/www/td-tech`

### Erreur : "Build failed"

**Solution** :
- Vérifie que `DATABASE_URL` et `AUTH_SECRET` sont bien configurés
- Vérifie les logs dans l'onglet Actions sur GitHub

### Erreur : "Migration failed"

**Solution** :
- Vérifie que PostgreSQL est accessible
- Vérifie que `DATABASE_URL` est correct
- Connecte-toi manuellement au VPS et lance : `npx prisma migrate deploy`

---

## 📊 Résumé des Secrets

### Pour VPS (Minimum requis) :
- ✅ `VPS_HOST`
- ✅ `VPS_USERNAME`
- ✅ `VPS_SSH_KEY`
- ✅ `DATABASE_URL`
- ✅ `AUTH_SECRET`

### Pour Vercel (Alternative) :
- ✅ `VERCEL_TOKEN`
- ✅ `VERCEL_ORG_ID`
- ✅ `VERCEL_PROJECT_ID`
- ✅ `DATABASE_URL`
- ✅ `AUTH_SECRET`

---

## 🎯 Prochaines Étapes

1. ✅ Configurer les secrets GitHub
2. ✅ Configurer le VPS (si déploiement VPS)
3. ✅ Tester avec une Pull Request
4. ✅ Faire un push vers `master` pour déclencher le déploiement
5. ✅ Vérifier que l'application est accessible

---

**👉 Ton CI/CD est maintenant configuré ! 🚀**
