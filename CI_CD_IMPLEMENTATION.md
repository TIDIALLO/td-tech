# CI/CD Implementation - Synap6ia

Documentation complète pour la mise en place et la compréhension du pipeline CI/CD de Synap6ia.

---

## Table des Matières

1. [Vue d'ensemble](#vue-densemble)
2. [Architecture du Pipeline](#architecture-du-pipeline)
3. [Configuration GitHub Actions](#configuration-github-actions)
4. [Configuration des Secrets](#configuration-des-secrets)
5. [Déploiement Vercel](#déploiement-vercel)
6. [Déploiement VPS (Optionnel)](#déploiement-vps-optionnel)
7. [Monitoring et Logs](#monitoring-et-logs)
8. [Dépannage](#dépannage)

---

## Vue d'ensemble

Le CI/CD de Synap6ia est basé sur **GitHub Actions** et supporte deux modes de déploiement :

1. **Vercel (Recommandé)** : Déploiement automatique via intégration Git native
2. **VPS (Optionnel)** : Déploiement sur serveur privé via SSH

### Déclencheurs

Le pipeline se déclenche automatiquement lors de :
- ✅ Push sur la branche `main`
- ✅ Déclenchement manuel via l'interface GitHub Actions

---

## Architecture du Pipeline

```
┌─────────────────────────────────────────────────────┐
│                   Push sur main                      │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│              Job 1: TEST & BUILD                     │
│  1. Checkout code                                    │
│  2. Setup Node.js 20                                 │
│  3. Install dependencies (npm ci)                    │
│  4. Generate Prisma Client                           │
│  5. Run ESLint                                       │
│  6. Build Next.js                                    │
└──────────────────┬──────────────────────────────────┘
                   │
                   ├──────────────┬──────────────┐
                   ▼              ▼              ▼
         ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
         │   Job 2:    │  │   Job 3:    │  │   Job 4:    │
         │ Deploy VPS  │  │Deploy Vercel│  │   Notify    │
         │ (si config) │  │ (si config) │  │   Status    │
         └─────────────┘  └─────────────┘  └─────────────┘
```

### Jobs

1. **test** : Validation du code (lint, build)
2. **deploy-vps** : Déploiement sur VPS (si secrets configurés)
3. **deploy-vercel** : Déploiement sur Vercel (si secrets configurés)
4. **notify** : Notification du statut de déploiement

---

## Configuration GitHub Actions

### Fichier de Workflow

**Emplacement** : `.github/workflows/deploy.yml`

### Structure du Workflow

```yaml
name: Deploy to Production

on:
  push:
    branches:
      - main
  workflow_dispatch: # Permet déclenchement manuel

env:
  NODE_ENV: production

jobs:
  # Jobs définis dans deploy.yml
```

### Variables d'Environnement Globales

```yaml
env:
  NODE_ENV: production
```

---

## Configuration des Secrets

### GitHub Secrets Requis

#### 1. Accéder aux Secrets

1. Aller sur votre repository GitHub
2. Cliquer sur **Settings** → **Secrets and variables** → **Actions**
3. Cliquer sur **New repository secret**

#### 2. Secrets pour Vercel (Mode Recommandé)

| Secret | Description | Comment l'obtenir |
|--------|-------------|-------------------|
| `VERCEL_TOKEN` | Token d'authentification Vercel | https://vercel.com/account/tokens |
| `VERCEL_ORG_ID` | ID de votre organisation/team Vercel | Fichier `.vercel/project.json` |
| `VERCEL_PROJECT_ID` | ID de votre projet Vercel | Fichier `.vercel/project.json` |

**Comment obtenir VERCEL_ORG_ID et VERCEL_PROJECT_ID :**

```bash
# Méthode 1 : Via Vercel CLI (locale)
cd D:\mon-site-perso
npx vercel link
# Ensuite regarder dans .vercel/project.json

# Méthode 2 : Via Dashboard Vercel
# Settings → General → Project ID
```

Exemple de `.vercel/project.json` :
```json
{
  "orgId": "team_YRUwfcBCl26MTll8Sfd3OO4l",
  "projectId": "prj_5r7TGUZ0eZDoOiH35gw04ymZnh4F"
}
```

#### 3. Secrets pour VPS (Mode Optionnel)

| Secret | Description | Exemple |
|--------|-------------|---------|
| `VPS_HOST` | Adresse IP ou domaine du VPS | `srv787787.hstgr.cloud` |
| `VPS_USERNAME` | Nom d'utilisateur SSH | `root` ou `deploy` |
| `VPS_SSH_KEY` | Clé privée SSH (format PEM) | Contenu de `~/.ssh/id_rsa` |
| `VPS_PORT` | Port SSH (optionnel, défaut: 22) | `22` |
| `VPS_DEPLOY_PATH` | Chemin de déploiement sur VPS | `/var/www/synap6ia` |
| `VPS_URL` | URL finale de l'application | `https://synap6ia.com` |

**Générer une clé SSH pour le VPS :**

```bash
# Sur votre machine locale
ssh-keygen -t rsa -b 4096 -C "github-actions@synap6ia.com" -f ~/.ssh/synap6ia_deploy

# Copier la clé publique sur le VPS
ssh-copy-id -i ~/.ssh/synap6ia_deploy.pub user@srv787787.hstgr.cloud

# Copier le contenu de la clé PRIVÉE dans GitHub Secret VPS_SSH_KEY
cat ~/.ssh/synap6ia_deploy
```

#### 4. Secrets pour l'Application

| Secret | Description | Comment générer |
|--------|-------------|-----------------|
| `DATABASE_URL` | URL de connexion PostgreSQL | `postgresql://user:pass@srv787787.hstgr.cloud:5432/synap6ia_prod?sslmode=require` |
| `AUTH_SECRET` | Secret pour NextAuth | `openssl rand -base64 32` |
| `AUTH_URL` | URL publique du site | `https://synap6ia.com` |
| `GMAIL_USER` | Email Gmail pour SMTP | `diallotidiane014@gmail.com` |
| `GMAIL_APP_PASSWORD` | App Password Gmail | https://myaccount.google.com/apppasswords |

**Générer AUTH_SECRET :**

```bash
# Sur Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))

# Sur Linux/Mac
openssl rand -base64 32
```

### Résumé des Secrets par Mode

#### Mode Vercel Uniquement (Recommandé)

```
✅ VERCEL_TOKEN
✅ VERCEL_ORG_ID
✅ VERCEL_PROJECT_ID
✅ DATABASE_URL
✅ AUTH_SECRET
✅ AUTH_URL
✅ GMAIL_USER (optionnel)
✅ GMAIL_APP_PASSWORD (optionnel)
```

#### Mode VPS Uniquement

```
✅ VPS_HOST
✅ VPS_USERNAME
✅ VPS_SSH_KEY
✅ VPS_DEPLOY_PATH
✅ DATABASE_URL
✅ AUTH_SECRET
✅ AUTH_URL
```

---

## Déploiement Vercel

### Configuration Recommandée

Synap6ia utilise **l'intégration Git native de Vercel** (déploiement automatique) plutôt que via GitHub Actions.

### Étapes de Configuration

#### 1. Connecter GitHub à Vercel

1. Aller sur https://vercel.com/new
2. Importer le repository `TIDIALLO/td-tech`
3. Vercel détecte automatiquement Next.js
4. Cliquer sur **Deploy**

#### 2. Configurer les Variables d'Environnement

**Dashboard Vercel** → **Settings** → **Environment Variables**

Ajouter les variables suivantes :

| Variable | Value | Environments |
|----------|-------|--------------|
| `NODE_ENV` | `production` | Production |
| `NEXT_PUBLIC_SITE_URL` | `https://synap6ia.com` | Production, Preview, Development |
| `DATABASE_URL` | `postgresql://user:pass@srv787787.hstgr.cloud:5432/synap6ia_prod?sslmode=require` | Production |
| `AUTH_SECRET` | `<généré avec openssl>` | Production, Preview |
| `AUTH_URL` | `https://synap6ia.com` | Production |
| `USE_GMAIL_SMTP` | `true` | Production |
| `GMAIL_USER` | `diallotidiane014@gmail.com` | Production |
| `GMAIL_APP_PASSWORD` | `<16 caractères>` | Production |
| `N8N_WEBHOOK_URL` | `https://n8n.srv787787.hstgr.cloud/webhook-test/contact-form` | Production, Preview |

#### 3. Configurer le Domaine

**Dashboard Vercel** → **Settings** → **Domains**

1. Ajouter `synap6ia.com`
2. Ajouter `www.synap6ia.com`
3. Configurer DNS chez Hostinger :

```
Type    Host    Value                       TTL
A       @       76.76.21.21                 14400
CNAME   www     cname.vercel-dns.com.       14400
```

4. Attendre propagation DNS (1-48h)
5. Vercel active automatiquement HTTPS (Let's Encrypt)

#### 4. Redirection www → non-www

Créer `vercel.json` à la racine :

```json
{
  "redirects": [
    {
      "source": "/:path*",
      "has": [{ "type": "host", "value": "www.synap6ia.com" }],
      "destination": "https://synap6ia.com/:path*",
      "permanent": true
    }
  ]
}
```

### Workflow de Déploiement Vercel

```
1. Push sur main
   ↓
2. GitHub Actions exécute job "test"
   ↓
3. Si tests OK, Vercel détecte le push
   ↓
4. Vercel build automatiquement
   ↓
5. Vercel déploie en production
   ↓
6. Disponible sur synap6ia.com
```

**Temps total** : 2-5 minutes

---

## Déploiement VPS (Optionnel)

### Prérequis VPS

- Linux (Ubuntu 22.04 ou Debian 11 recommandé)
- Node.js 20.x installé
- PostgreSQL 14+ installé et configuré
- Git installé
- PM2 ou Docker pour la gestion de processus
- Port 22 (SSH) ouvert
- Port 3000 (Next.js) ou 80/443 (Nginx) ouvert

### Préparation du VPS

#### 1. Installation de Node.js 20

```bash
# Se connecter au VPS
ssh user@srv787787.hstgr.cloud

# Installer Node.js 20 via nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20
node --version  # Devrait afficher v20.x.x
```

#### 2. Installation de PM2

```bash
npm install -g pm2
pm2 startup  # Configure PM2 au démarrage
```

#### 3. Configuration PostgreSQL

```bash
sudo -u postgres psql

CREATE DATABASE synap6ia_prod;
CREATE USER synap6ia WITH PASSWORD 'votre_mot_de_passe';
GRANT ALL PRIVILEGES ON DATABASE synap6ia_prod TO synap6ia;
\q
```

#### 4. Cloner le Repository

```bash
cd /var/www
git clone https://github.com/TIDIALLO/td-tech.git synap6ia
cd synap6ia
```

#### 5. Configuration .env

```bash
nano .env
```

Contenu :

```bash
NODE_ENV=production
DATABASE_URL=postgresql://synap6ia:password@localhost:5432/synap6ia_prod?sslmode=require
AUTH_SECRET=<généré>
AUTH_URL=https://synap6ia.com
NEXT_PUBLIC_SITE_URL=https://synap6ia.com
GMAIL_USER=diallotidiane014@gmail.com
GMAIL_APP_PASSWORD=<16 caractères>
N8N_WEBHOOK_URL=https://n8n.srv787787.hstgr.cloud/webhook-test/contact-form
```

#### 6. Installation et Build

```bash
npm ci --legacy-peer-deps
npx prisma generate
npx prisma migrate deploy
npm run build
```

#### 7. Démarrage avec PM2

```bash
pm2 start npm --name "synap6ia" -- start
pm2 save
pm2 list
```

### Configuration Nginx (Reverse Proxy)

```nginx
# /etc/nginx/sites-available/synap6ia.com

server {
    listen 80;
    server_name synap6ia.com www.synap6ia.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Activer le site :

```bash
sudo ln -s /etc/nginx/sites-available/synap6ia.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### SSL avec Certbot

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d synap6ia.com -d www.synap6ia.com
```

---

## Monitoring et Logs

### Vercel

#### Logs en Temps Réel

**Dashboard Vercel** → **Deployments** → Cliquer sur un déploiement → **Logs**

#### Analytics

**Dashboard Vercel** → **Analytics**
- Trafic
- Performance (Core Web Vitals)
- Erreurs

#### Monitoring des Erreurs

**Dashboard Vercel** → **Logs** → **Functions**
- Erreurs API Routes
- Timeouts
- Cold starts

### GitHub Actions

#### Voir l'Historique des Workflows

1. Aller sur le repository GitHub
2. Onglet **Actions**
3. Voir tous les runs

#### Logs Détaillés

1. Cliquer sur un workflow run
2. Cliquer sur un job (test, deploy-vps, etc.)
3. Dérouler les étapes pour voir les logs

#### Notifications

GitHub peut envoyer des emails en cas d'échec :
**Settings** → **Notifications** → **Actions**

### VPS (si utilisé)

#### Logs PM2

```bash
pm2 logs synap6ia        # Logs en temps réel
pm2 logs synap6ia --lines 100  # 100 dernières lignes
pm2 logs synap6ia --err  # Seulement les erreurs
```

#### Logs Nginx

```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

#### Monitoring PM2

```bash
pm2 monit                # Interface interactive
pm2 status               # Liste des processus
pm2 show synap6ia        # Détails du processus
```

---

## Dépannage

### Problème : Build échoue sur GitHub Actions

**Erreur** : `npm run build` failed

**Solutions** :

1. **Vérifier les variables d'environnement**
   ```bash
   # Dans deploy.yml, vérifier que DATABASE_URL et AUTH_SECRET sont définis
   ```

2. **Vérifier les erreurs TypeScript**
   ```bash
   # Localement
   npm run build
   ```

3. **Vérifier les logs GitHub Actions**
   - Aller dans Actions → Cliquer sur le run → Voir l'étape "Build Next.js"

### Problème : Déploiement Vercel ne démarre pas

**Causes possibles** :

1. **Vercel n'est pas connecté au repository**
   - Solution : Réimporter le projet sur Vercel

2. **Variables d'environnement manquantes**
   - Solution : Vérifier Settings → Environment Variables

3. **Build command incorrecte**
   - Solution : Settings → Build & Development Settings → Build Command doit être `npm run build`

### Problème : Erreurs Prisma en Production

**Erreur** : `PrismaClientInitializationError: Can't reach database server`

**Solutions** :

1. **Vérifier DATABASE_URL**
   ```bash
   # Doit inclure sslmode=require pour connexion externe
   postgresql://user:pass@srv787787.hstgr.cloud:5432/db?sslmode=require
   ```

2. **Vérifier que PostgreSQL accepte les connexions externes**
   ```bash
   # Sur le VPS
   sudo nano /etc/postgresql/14/main/pg_hba.conf
   # Ajouter :
   host    all             all             0.0.0.0/0               md5

   sudo nano /etc/postgresql/14/main/postgresql.conf
   # Modifier :
   listen_addresses = '*'

   sudo systemctl restart postgresql
   ```

3. **Vérifier le firewall**
   ```bash
   sudo ufw allow 5432/tcp
   ```

### Problème : n8n Webhook Timeout

**Erreur** : Timeout lors de l'appel au webhook n8n

**Solutions** :

1. **Vérifier que le workflow n8n est actif**
   - Aller sur n8n interface
   - Vérifier que le workflow est en mode "Production" (pas "Test")

2. **Vérifier l'URL du webhook**
   ```bash
   # Tester manuellement
   curl -X POST https://n8n.srv787787.hstgr.cloud/webhook-test/contact-form \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@test.com","message":"Test"}'
   ```

3. **Augmenter le timeout** (dans `src/app/api/contact/route.ts`)
   ```typescript
   signal: AbortSignal.timeout(10000) // 10 secondes au lieu de 5
   ```

### Problème : Rate Limiting trop Strict

**Erreur** : Utilisateurs légitimes bloqués par rate limiting

**Solution** : Ajuster le rate limiting dans `src/app/api/contact/route.ts`

```typescript
// Passer de 3 à 5 requêtes par minute
const MAX_REQUESTS = 5
const TIME_WINDOW = 60 * 1000 // 1 minute
```

### Problème : Domaine ne pointe pas vers Vercel

**Erreur** : DNS_PROBE_FINISHED_NXDOMAIN

**Solutions** :

1. **Vérifier la propagation DNS**
   ```bash
   nslookup synap6ia.com
   # Devrait pointer vers 76.76.21.21 (IP Vercel)
   ```

2. **Vérifier les records DNS chez Hostinger**
   - A record : @ → 76.76.21.21
   - CNAME : www → cname.vercel-dns.com

3. **Attendre la propagation** (jusqu'à 48h)

---

## Checklist Pré-Déploiement

### Avant le Premier Push

- [ ] Tous les secrets GitHub configurés
- [ ] Variables d'environnement Vercel configurées
- [ ] `.env.local` en `.gitignore`
- [ ] Build local réussit (`npm run build`)
- [ ] Lint passe (`npm run lint`)
- [ ] Prisma migrations créées
- [ ] Tests fonctionnels passent

### Avant Mise en Production

- [ ] DNS configuré et propagé
- [ ] SSL/HTTPS actif
- [ ] Domaine personnalisé fonctionne
- [ ] Formulaire de contact testé
- [ ] n8n webhook testé
- [ ] Database backup configuré
- [ ] Monitoring activé
- [ ] Analytics activé

---

## Rollback en Cas de Problème

### Vercel

**Méthode 1 : Dashboard Vercel (< 30 secondes)**
1. Dashboard Vercel → **Deployments**
2. Trouver la dernière version stable
3. Cliquer sur **⋯** → **Promote to Production**

**Méthode 2 : Git Revert**
```bash
git log --oneline
git revert <commit-hash>
git push origin main
```

### VPS

**Rollback Git**
```bash
ssh user@srv787787.hstgr.cloud
cd /var/www/synap6ia
git log --oneline
git reset --hard <commit-hash>
npm ci --legacy-peer-deps
npm run build
pm2 restart synap6ia
```

---

## Améliorations Futures

### À Implémenter

1. **Tests Automatisés**
   - Unit tests (Jest)
   - E2E tests (Playwright/Cypress)
   - Visual regression tests

2. **Staging Environment**
   - Déploiement automatique des branches feature
   - Preview deployments Vercel

3. **Monitoring Avancé**
   - Sentry pour error tracking
   - Uptime monitoring (UptimeRobot)
   - Performance monitoring (Vercel Analytics Pro)

4. **Notifications**
   - Slack/Discord webhook en cas d'échec
   - Email sur déploiement réussi

5. **Backup Automatisé**
   - Backup quotidien de la DB
   - Backup des .env
   - Stockage sur S3/Backblaze

---

## Ressources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Documentation](https://vercel.com/docs)
- [PM2 Documentation](https://pm2.keymetrics.io/docs)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Let's Encrypt Certbot](https://certbot.eff.org/)

---

**Dernière mise à jour** : 2026-01-07
**Pipeline actif** : GitHub Actions → Vercel (mode recommandé)
**Mainteneur** : Tidiane Diallo (Synap6ia)
