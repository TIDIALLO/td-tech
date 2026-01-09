# Guide de Déploiement PM2 - synap6ia.com (Hostinger VPS)

Ce guide détaille le déploiement de votre site sur le VPS Hostinger avec PM2 et Nginx.

## 🎯 Configuration Actuelle

- **Domaine**: synap6ia.com
- **Hébergeur**: Hostinger VPS
- **Process Manager**: PM2
- **Reverse Proxy**: Nginx
- **Port Application**: 3002
- **SSL**: Certbot (Let's Encrypt) ✅ Déjà configuré

---

## 📋 Prérequis Déjà Installés

✅ Nginx configuré et fonctionnel
✅ SSL/HTTPS actif avec Certbot
✅ PM2 installé
✅ Configuration Nginx sur le port 3002

---

## 🚀 Déploiement via CI/CD GitHub Actions

### 1. Configurer les Secrets GitHub

Allez dans **Settings → Secrets and variables → Actions** :

| Secret | Valeur | Description |
|--------|--------|-------------|
| `VPS_HOST` | `<IP-VPS>` | IP de votre VPS Hostinger |
| `VPS_USERNAME` | `root` ou `<user>` | Utilisateur SSH |
| `VPS_SSH_KEY` | `<clé-privée>` | Clé SSH privée complète |
| `VPS_DEPLOY_PATH` | `/var/www/synap6ia` | Chemin du projet |
| `DATABASE_URL` | `postgresql://...` | URL PostgreSQL |
| `AUTH_SECRET` | `<secret>` | Généré avec `openssl rand -base64 32` |
| `PORT` | `3002` | Port de l'application (optionnel, défaut: 3002) |

### 2. Déploiement Automatique

Dès que vous pushez vers la branche `main`, GitHub Actions :

1. ✅ Build et teste l'application
2. 📥 Pull les dernières modifications sur le VPS
3. 📦 Installe les dépendances
4. 🏗️ Build l'application Next.js
5. 🗄️ Applique les migrations Prisma
6. 🔄 Redémarre l'app avec PM2

```bash
# Sur votre machine locale
git add .
git commit -m "Votre message"
git push origin main

# GitHub Actions déploie automatiquement !
```

---

## 🔧 Gestion Manuelle avec PM2

### Commandes PM2 Essentielles

```bash
# Sur le VPS (/var/www/synap6ia)

# Démarrer l'application
pm2 start ecosystem.config.js

# Redémarrer l'application
pm2 restart synap6ia

# Arrêter l'application
pm2 stop synap6ia

# Voir le statut
pm2 status
pm2 list

# Voir les logs en temps réel
pm2 logs synap6ia

# Voir les logs des 100 dernières lignes
pm2 logs synap6ia --lines 100

# Voir uniquement les erreurs
pm2 logs synap6ia --err

# Vider les logs
pm2 flush

# Monitorer les ressources
pm2 monit

# Informations détaillées
pm2 show synap6ia

# Sauvegarder la configuration actuelle
pm2 save

# Redémarrer au démarrage du serveur
pm2 startup
```

### Configuration PM2 (ecosystem.config.js)

Le fichier `ecosystem.config.js` contient la configuration PM2 :

```javascript
module.exports = {
  apps: [
    {
      name: 'synap6ia',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/synap6ia',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3002,
      },
      error_file: '/var/www/synap6ia/logs/pm2-error.log',
      out_file: '/var/www/synap6ia/logs/pm2-out.log',
    },
  ],
};
```

---

## 🔄 Déploiement Manuel (Sans CI/CD)

Si vous préférez déployer manuellement :

```bash
# 1. Connexion SSH au VPS
ssh <user>@<vps-ip>

# 2. Naviguer vers le projet
cd /var/www/synap6ia

# 3. Sauvegarder le .env (si nécessaire)
cp .env .env.backup.$(date +%Y%m%d_%H%M%S)

# 4. Pull les dernières modifications
git fetch origin
git pull origin main

# 5. Installer les dépendances
npm ci --legacy-peer-deps

# 6. Générer le client Prisma
npx prisma generate

# 7. Build l'application
npm run build

# 8. Appliquer les migrations de base de données
npx prisma migrate deploy
# OU si pas de migrations :
npx prisma db push

# 9. Redémarrer avec PM2
pm2 restart synap6ia

# 10. Vérifier le statut
pm2 status
pm2 logs synap6ia --lines 50
```

---

## 📝 Gestion du Blog

### Charger les Articles de Démarrage

```bash
cd /var/www/synap6ia

# Charger les 5 articles de blog
npx tsx prisma/seed-blog.ts

# Ou avec le seed complet
npx prisma db seed
```

### Créer un Nouvel Article

1. Allez sur `https://synap6ia.com/admin`
2. Connectez-vous avec vos identifiants admin
3. Cliquez sur "Blog" → "Nouvel article"
4. Remplissez le formulaire et publiez

---

## 🌐 Configuration Nginx (Déjà en Place)

Votre configuration Nginx actuelle (`/etc/nginx/sites-available/synap6ia.com`) :

```nginx
server {
    server_name synap6ia.com www.synap6ia.com;

    location / {
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    listen [::]:443 ssl;
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/synap6ia.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/synap6ia.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}

server {
    if ($host = www.synap6ia.com) {
        return 301 https://$host$request_uri;
    }

    if ($host = synap6ia.com) {
        return 301 https://$host$request_uri;
    }

    listen 80;
    listen [::]:80;
    server_name synap6ia.com www.synap6ia.com;
    return 404;
}
```

### Commandes Nginx Utiles

```bash
# Tester la configuration
sudo nginx -t

# Recharger Nginx
sudo systemctl reload nginx

# Redémarrer Nginx
sudo systemctl restart nginx

# Voir le statut
sudo systemctl status nginx

# Voir les logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

---

## 🗄️ Gestion de la Base de Données

### Migrations Prisma

```bash
cd /var/www/synap6ia

# Appliquer les migrations en production
npx prisma migrate deploy

# Push le schéma (si pas de migrations)
npx prisma db push

# Voir le statut des migrations
npx prisma migrate status

# Accéder à Prisma Studio (local uniquement)
npx prisma studio
```

### Sauvegardes PostgreSQL

```bash
# Créer un backup
pg_dump -U postgres -d synap6ia_db > backup_$(date +%Y%m%d_%H%M%S).sql

# Restaurer un backup
psql -U postgres -d synap6ia_db < backup_20260109_120000.sql

# Automatiser les backups (crontab)
crontab -e
# Ajouter :
# 0 2 * * * pg_dump -U postgres synap6ia_db > /var/backups/synap6ia_$(date +\%Y\%m\%d).sql
```

---

## 📊 Monitoring et Logs

### Logs PM2

```bash
# Logs en temps réel
pm2 logs synap6ia

# Logs des 200 dernières lignes
pm2 logs synap6ia --lines 200

# Seulement les erreurs
pm2 logs synap6ia --err

# Fichiers de logs
tail -f /var/www/synap6ia/logs/pm2-error.log
tail -f /var/www/synap6ia/logs/pm2-out.log
```

### Logs Nginx

```bash
# Logs d'accès
sudo tail -f /var/log/nginx/access.log

# Logs d'erreurs
sudo tail -f /var/log/nginx/error.log

# Chercher des erreurs spécifiques
sudo grep "error" /var/log/nginx/error.log
```

### Monitoring des Ressources

```bash
# Moniteur PM2 interactif
pm2 monit

# Utilisation CPU/RAM
top
htop

# Espace disque
df -h

# Mémoire
free -h
```

---

## 🔒 SSL/HTTPS (Certbot)

### Renouvellement SSL

```bash
# Renouveler manuellement
sudo certbot renew

# Test de renouvellement (dry run)
sudo certbot renew --dry-run

# Voir les certificats
sudo certbot certificates

# Le renouvellement automatique est configuré via cron
# Vérifier : sudo systemctl list-timers | grep certbot
```

---

## 🔍 Dépannage

### Application ne démarre pas

```bash
# Vérifier le statut PM2
pm2 status

# Voir les logs d'erreur
pm2 logs synap6ia --err

# Redémarrer
pm2 restart synap6ia

# Si problème persiste, arrêter et redémarrer
pm2 delete synap6ia
pm2 start ecosystem.config.js
```

### Site inaccessible

```bash
# Vérifier Nginx
sudo systemctl status nginx
sudo nginx -t

# Vérifier que l'app écoute sur le port 3002
netstat -tlnp | grep 3002
# ou
lsof -i :3002

# Vérifier les logs
sudo tail -f /var/log/nginx/error.log
pm2 logs synap6ia
```

### Erreurs de base de données

```bash
# Vérifier la connexion PostgreSQL
psql -U postgres -d synap6ia_db -c "SELECT 1;"

# Réinitialiser le schéma (ATTENTION: perte de données!)
npx prisma db push --accept-data-loss

# Vérifier les migrations
npx prisma migrate status
```

### Problèmes de build

```bash
# Nettoyer et rebuild
rm -rf .next
rm -rf node_modules
npm ci --legacy-peer-deps
npx prisma generate
npm run build
pm2 restart synap6ia
```

### Mémoire insuffisante

```bash
# Vérifier l'utilisation mémoire
pm2 list
free -h

# Augmenter la limite dans ecosystem.config.js
# max_memory_restart: '2G'

# Recharger la config
pm2 delete synap6ia
pm2 start ecosystem.config.js
pm2 save
```

---

## ✅ Checklist de Santé du Système

```bash
# Script de vérification rapide
cat > /var/www/synap6ia/check-health.sh << 'EOF'
#!/bin/bash
echo "=== Health Check synap6ia.com ==="
echo ""
echo "1. PM2 Status:"
pm2 list | grep synap6ia
echo ""
echo "2. Port 3002 listening:"
netstat -tlnp | grep 3002 || echo "  ⚠️  Port 3002 not listening!"
echo ""
echo "3. Nginx Status:"
sudo systemctl is-active nginx && echo "  ✅ Nginx is running" || echo "  ❌ Nginx is down!"
echo ""
echo "4. SSL Certificate:"
sudo certbot certificates | grep synap6ia.com
echo ""
echo "5. Disk Space:"
df -h | grep -E "Filesystem|/dev/sda"
echo ""
echo "6. Memory Usage:"
free -h
echo ""
echo "7. Recent Errors (last 10):"
pm2 logs synap6ia --err --lines 10 --nostream
EOF

chmod +x /var/www/synap6ia/check-health.sh

# Exécuter
bash /var/www/synap6ia/check-health.sh
```

---

## 🎯 Workflow de Mise à Jour Rapide

```bash
# Script de déploiement rapide
cd /var/www/synap6ia && \
git pull origin main && \
npm ci --legacy-peer-deps && \
npx prisma generate && \
npm run build && \
npx prisma migrate deploy && \
pm2 restart synap6ia && \
pm2 logs synap6ia --lines 50
```

---

## 📞 Résumé des Commandes Importantes

| Action | Commande |
|--------|----------|
| **Redémarrer l'app** | `pm2 restart synap6ia` |
| **Voir les logs** | `pm2 logs synap6ia` |
| **Status PM2** | `pm2 status` |
| **Déploiement manuel** | Voir section "Déploiement Manuel" |
| **Recharger Nginx** | `sudo systemctl reload nginx` |
| **Vérifier HTTPS** | `sudo certbot certificates` |
| **Backup DB** | `pg_dump -U postgres synap6ia_db > backup.sql` |
| **Health check** | `bash /var/www/synap6ia/check-health.sh` |

---

## 🚀 Prochaines Étapes

1. ✅ **Configurez les secrets GitHub Actions** (voir section 1)
2. 🔄 **Testez le déploiement automatique** (push vers main)
3. 📝 **Chargez les articles de blog** (voir section "Gestion du Blog")
4. 📊 **Configurez le monitoring** (optionnel)
5. 💾 **Automatisez les backups** (optionnel)

---

Votre site est maintenant prêt pour un déploiement continu automatisé ! 🎉
