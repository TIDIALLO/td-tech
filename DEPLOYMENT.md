# Guide de Déploiement Synap6ia

## Déploiement Vercel (Automatique)

Le site est automatiquement déployé sur Vercel à chaque push sur la branche `main`.

### Configuration Vercel
- **URL de production**: https://synap6ia.com
- **Framework**: Next.js
- **Région**: cdg1 (Paris)
- **Build Command**: `npm run build`
- **Install Command**: `npm install --legacy-peer-deps`

### Variables d'environnement requises sur Vercel
```env
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=votre-secret
NEXTAUTH_URL=https://synap6ia.com
RESEND_API_KEY=re_...
UPLOADTHING_SECRET=sk_...
UPLOADTHING_APP_ID=...
```

---

## Déploiement VPS Hostinger

### Prérequis sur le VPS

1. **Node.js 18+**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

2. **PM2 (Process Manager)**
```bash
npm install -g pm2
```

3. **Nginx (Reverse Proxy)**
```bash
sudo apt install nginx
```

4. **Certbot (SSL)**
```bash
sudo apt install certbot python3-certbot-nginx
```

### Installation initiale sur le VPS

```bash
# Créer le dossier de l'application
sudo mkdir -p /var/www/synap6ia
sudo chown -R $USER:$USER /var/www/synap6ia

# Cloner le repository
cd /var/www/synap6ia
git clone https://github.com/TIDIALLO/td-tech.git .

# Créer le fichier .env
cp .env.example .env
nano .env  # Configurer les variables

# Installer les dépendances
npm install --legacy-peer-deps

# Configurer Prisma
npx prisma generate
npx prisma db push

# Build
npm run build

# Démarrer avec PM2
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

### Configuration Nginx

```nginx
# /etc/nginx/sites-available/synap6ia
server {
    listen 80;
    server_name votre-domaine.com www.votre-domaine.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Activer le site
sudo ln -s /etc/nginx/sites-available/synap6ia /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Installer SSL
sudo certbot --nginx -d votre-domaine.com -d www.votre-domaine.com
```

### Déploiement depuis votre machine locale

```bash
# Rendre le script exécutable
chmod +x deploy-hostinger.sh

# Configurer le script (éditer les variables en haut)
nano deploy-hostinger.sh

# Déploiement complet
./deploy-hostinger.sh

# Déploiement rapide (pull + build + reload)
./deploy-hostinger.sh --quick

# Redémarrer seulement
./deploy-hostinger.sh --restart

# Voir les logs
./deploy-hostinger.sh --logs

# Voir le statut
./deploy-hostinger.sh --status
```

### Commandes PM2 utiles

```bash
# Voir le statut
pm2 status

# Voir les logs
pm2 logs synap6ia

# Redémarrer
pm2 restart synap6ia

# Reload sans downtime
pm2 reload synap6ia

# Moniteur en temps réel
pm2 monit
```

---

## Structure des environnements

| Environnement | URL | Branche | Déploiement |
|--------------|-----|---------|-------------|
| Production (Vercel) | synap6ia.com | main | Automatique |
| VPS Hostinger | votre-vps.com | main | Manuel via script |
| Développement | localhost:3000 | * | Local |

---

## Checklist de déploiement

- [ ] Variables d'environnement configurées
- [ ] Base de données accessible
- [ ] Migrations Prisma à jour
- [ ] Build réussi
- [ ] PM2 configuré et en cours d'exécution
- [ ] Nginx configuré avec SSL
- [ ] DNS pointant vers le serveur
