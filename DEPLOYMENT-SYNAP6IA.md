# Guide de Déploiement - synap6ia.com (Hostinger VPS)

Ce guide détaille le déploiement de votre site sur le VPS Hostinger pour synap6ia.com.

## 🎯 Architecture de Déploiement

- **Domaine**: synap6ia.com
- **Hébergeur**: Hostinger VPS
- **Stack**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Reverse Proxy**: Nginx
- **SSL**: Certbot (Let's Encrypt)

---

## 📋 Prérequis sur le VPS

### 1. Connexion SSH au VPS Hostinger

```bash
ssh root@<votre-ip-vps>
# ou
ssh <votre-utilisateur>@<votre-ip-vps>
```

### 2. Installation des dépendances (si pas déjà fait)

```bash
# Mise à jour du système
sudo apt update && sudo apt upgrade -y

# Installation de Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Installation de Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Vérification
docker --version
docker-compose --version

# Installation de Nginx
sudo apt install nginx -y

# Installation de Certbot pour SSL
sudo apt install certbot python3-certbot-nginx -y

# Installation de Git
sudo apt install git -y
```

---

## 🚀 Configuration Initiale du Projet

### 1. Créer le répertoire de déploiement

```bash
# Créer le répertoire
sudo mkdir -p /var/www/synap6ia
sudo chown -R $USER:$USER /var/www/synap6ia

# Cloner le projet
cd /var/www/synap6ia
git clone https://github.com/TIDIALLO/td-tech.git .

# Vérifier
ls -la
```

### 2. Configurer les variables d'environnement

```bash
# Créer le fichier .env
nano /var/www/synap6ia/.env
```

Contenu du fichier `.env` :

```env
# Database
DATABASE_URL="postgresql://postgres:VotreMotDePasseSecurise@postgres:5432/synap6ia_db?schema=public"

# Auth.js - Générez avec: openssl rand -base64 32
AUTH_SECRET="votre-secret-key-super-securise-ici"
AUTH_URL="https://synap6ia.com"

# Uploadthing (optionnel)
UPLOADTHING_TOKEN="votre-token-uploadthing"

# Email (optionnel)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="votre-email@gmail.com"
EMAIL_SERVER_PASSWORD="votre-mot-de-passe-app"
EMAIL_FROM="noreply@synap6ia.com"

# Admin credentials
ADMIN_EMAIL="admin@synap6ia.com"
ADMIN_PASSWORD="VotreMotDePasseAdmin!"

# Node Environment
NODE_ENV="production"
NEXT_PUBLIC_APP_URL="https://synap6ia.com"
```

**Générer un AUTH_SECRET sécurisé :**
```bash
openssl rand -base64 32
```

### 3. Configurer Docker Compose

Le fichier `docker-compose.yml` est déjà configuré. Vérifiez qu'il est présent :

```bash
cat docker-compose.yml
```

---

## 🌐 Configuration Nginx

### 1. Créer la configuration Nginx

```bash
sudo nano /etc/nginx/sites-available/synap6ia
```

Contenu du fichier :

```nginx
# Configuration initiale (HTTP seulement) - Certbot ajoutera HTTPS automatiquement
server {
    listen 80;
    listen [::]:80;
    server_name synap6ia.com www.synap6ia.com;

    # Logs
    access_log /var/log/nginx/synap6ia.access.log;
    error_log /var/log/nginx/synap6ia.error.log;

    # Headers de sécurité
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Proxy vers l'application Next.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Assets statiques Next.js (optionnel, pour optimisation)
    location /_next/static {
        proxy_cache_valid 60m;
        proxy_pass http://localhost:3000;
    }

    # Fichiers statiques publics
    location /static {
        proxy_cache_valid 60m;
        proxy_pass http://localhost:3000;
    }
}
```

### 2. Activer le site

```bash
# Créer le lien symbolique
sudo ln -s /etc/nginx/sites-available/synap6ia /etc/nginx/sites-enabled/

# Tester la configuration
sudo nginx -t

# Recharger Nginx
sudo systemctl reload nginx
```

### 3. Configurer SSL avec Certbot

```bash
# Obtenir le certificat SSL (automatique)
sudo certbot --nginx -d synap6ia.com -d www.synap6ia.com

# Suivre les instructions interactives
# Choisissez de rediriger HTTP vers HTTPS (option 2)

# Vérifier le renouvellement automatique
sudo certbot renew --dry-run
```

---

## 🐳 Déploiement avec Docker

### 1. Premier déploiement

```bash
cd /var/www/synap6ia

# Build et démarrage des conteneurs
docker-compose up -d --build

# Vérifier les logs
docker-compose logs -f app

# Vérifier que les conteneurs tournent
docker-compose ps
```

### 2. Configuration de la base de données

```bash
# Attendre que PostgreSQL soit prêt (quelques secondes)
sleep 10

# Appliquer les migrations
docker-compose exec app npx prisma migrate deploy

# Ou si pas de migrations, push le schéma
docker-compose exec app npx prisma db push

# Peupler la base de données (optionnel)
docker-compose exec app npx prisma db seed

# Peupler le blog avec les articles de démarrage (optionnel)
docker-compose exec app npx tsx prisma/seed-blog.ts
```

### 3. Commandes utiles

```bash
# Voir les logs en temps réel
docker-compose logs -f app

# Redémarrer l'application
docker-compose restart app

# Arrêter tous les conteneurs
docker-compose down

# Redémarrer avec rebuild
docker-compose down && docker-compose up -d --build

# Accéder au shell du conteneur
docker-compose exec app sh

# Voir l'utilisation des ressources
docker stats
```

---

## 🔄 Configuration CI/CD GitHub Actions

### 1. Secrets GitHub à configurer

Allez dans **Settings → Secrets and variables → Actions** de votre repo GitHub et ajoutez :

| Secret | Valeur | Description |
|--------|--------|-------------|
| `VPS_HOST` | `<ip-de-votre-vps>` | Adresse IP de votre VPS Hostinger |
| `VPS_USERNAME` | `root` ou `<votre-user>` | Utilisateur SSH |
| `VPS_SSH_KEY` | `<votre-clé-privée-ssh>` | Clé SSH privée pour l'authentification |
| `VPS_PORT` | `22` | Port SSH (22 par défaut) |
| `VPS_DEPLOY_PATH` | `/var/www/synap6ia` | Chemin de déploiement |
| `VPS_URL` | `https://synap6ia.com` | URL de votre site |
| `DATABASE_URL` | `postgresql://...` | URL de connexion PostgreSQL |
| `AUTH_SECRET` | `<votre-secret>` | Clé secrète Auth.js |

### 2. Générer une clé SSH pour le déploiement

Sur votre **machine locale** :

```bash
# Générer une nouvelle paire de clés SSH
ssh-keygen -t ed25519 -C "github-actions-synap6ia" -f ~/.ssh/github_actions_synap6ia

# Afficher la clé publique
cat ~/.ssh/github_actions_synap6ia.pub

# Afficher la clé privée (à copier dans GitHub Secrets)
cat ~/.ssh/github_actions_synap6ia
```

Sur votre **VPS** :

```bash
# Ajouter la clé publique aux clés autorisées
nano ~/.ssh/authorized_keys
# Collez la clé publique générée ci-dessus

# Vérifier les permissions
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

### 3. Tester le déploiement automatique

```bash
# Sur votre machine locale
cd /votre/repo/local

# Faire un changement et push vers main
echo "Test deployment" >> test.txt
git add test.txt
git commit -m "Test: Vérification du déploiement automatique"
git push origin main

# Vérifier sur GitHub Actions
# Allez dans : https://github.com/TIDIALLO/td-tech/actions
```

---

## 📊 Monitoring et Maintenance

### 1. Vérifier l'état de l'application

```bash
# Status des conteneurs
docker-compose ps

# Logs récents
docker-compose logs --tail=100 app

# Utilisation des ressources
docker stats --no-stream

# Tester l'application
curl -I https://synap6ia.com
```

### 2. Redémarrage manuel

```bash
cd /var/www/synap6ia

# Redémarrage complet
docker-compose down && docker-compose up -d --build

# Ou juste redémarrer l'app
docker-compose restart app
```

### 3. Mise à jour manuelle (sans CI/CD)

```bash
cd /var/www/synap6ia

# Pull les dernières modifications
git pull origin main

# Rebuild et redémarrer
docker-compose down
docker-compose up -d --build

# Appliquer les migrations si nécessaire
docker-compose exec app npx prisma migrate deploy
```

### 4. Sauvegardes de la base de données

```bash
# Créer un backup
docker-compose exec postgres pg_dump -U postgres synap6ia_db > backup_$(date +%Y%m%d_%H%M%S).sql

# Restaurer un backup
cat backup_20260109_120000.sql | docker-compose exec -T postgres psql -U postgres synap6ia_db
```

---

## 🔍 Dépannage

### Problème : Application inaccessible

```bash
# Vérifier Nginx
sudo systemctl status nginx
sudo nginx -t

# Vérifier Docker
docker-compose ps
docker-compose logs app

# Vérifier le port 3000
curl http://localhost:3000
```

### Problème : Erreur de base de données

```bash
# Vérifier PostgreSQL
docker-compose logs postgres

# Tester la connexion
docker-compose exec postgres psql -U postgres -d synap6ia_db -c "SELECT 1;"

# Réinitialiser si nécessaire
docker-compose exec app npx prisma db push --accept-data-loss
```

### Problème : Certificat SSL expiré

```bash
# Renouveler manuellement
sudo certbot renew

# Forcer le renouvellement
sudo certbot renew --force-renewal

# Redémarrer Nginx
sudo systemctl reload nginx
```

### Logs utiles

```bash
# Logs Nginx
sudo tail -f /var/log/nginx/synap6ia.error.log

# Logs Docker
docker-compose logs -f --tail=200

# Logs système
journalctl -xe
```

---

## ✅ Checklist Post-Déploiement

- [ ] Le site est accessible via https://synap6ia.com
- [ ] Le SSL est actif (cadenas vert dans le navigateur)
- [ ] La base de données est initialisée
- [ ] L'admin peut se connecter sur `/admin`
- [ ] Le blog est accessible sur `/blog`
- [ ] Les secrets GitHub Actions sont configurés
- [ ] Le déploiement automatique fonctionne
- [ ] Les logs ne montrent pas d'erreurs critiques
- [ ] La redirection www → non-www fonctionne (ou inverse)
- [ ] Les emails fonctionnent (si configurés)
- [ ] Le backup automatique est configuré

---

## 📞 Support

En cas de problème, vérifiez :
1. Les logs Docker : `docker-compose logs -f`
2. Les logs Nginx : `sudo tail -f /var/log/nginx/synap6ia.error.log`
3. Le status des services : `docker-compose ps`
4. Les GitHub Actions : https://github.com/TIDIALLO/td-tech/actions

---

## 🚀 Déploiements Futurs

Une fois la configuration initiale terminée, les déploiements futurs sont automatiques :

1. **Faire vos modifications en local**
2. **Commit et push vers `main`**
3. **GitHub Actions s'occupe du reste** :
   - Build et tests
   - Déploiement sur le VPS
   - Redémarrage de l'application

Le blog sera automatiquement mis à jour avec vos nouveaux articles ! 🎉
