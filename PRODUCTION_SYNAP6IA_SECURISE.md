# Configuration Production Synap6ia - Guide Sécurisé Multi-Sites

⚠️ **ATTENTION** : Ce guide est conçu pour un VPS Hostinger hébergeant plusieurs sites, n8n, nginx et PM2.
Chaque commande est documentée pour éviter toute confusion ou casse.

---

## Table des Matières

1. [Architecture Recommandée](#architecture-recommandée)
2. [Précautions Importantes](#précautions-importantes)
3. [Audit Initial du VPS](#audit-initial-du-vps)
4. [Configuration DNS](#configuration-dns)
5. [Option A : Vercel (RECOMMANDÉ)](#option-a--vercel-recommandé)
6. [Option B : VPS avec nginx/PM2](#option-b--vps-avec-nginxpm2)
7. [Sécurité et Backup](#sécurité-et-backup)
8. [Checklist Finale](#checklist-finale)

---

## Architecture Recommandée

### Configuration Optimale pour Synap6ia

```
synap6ia.com (Frontend)
    ↓
Vercel (Next.js, Edge Functions)
    ↓
    ├─→ VPS PostgreSQL (srv787787.hstgr.cloud:5432)
    └─→ VPS n8n (n8n.srv787787.hstgr.cloud)

Autres sites sur VPS :
- site1.com (nginx → PM2 app1)
- site2.com (nginx → PM2 app2)
- n8n.srv787787.hstgr.cloud (nginx → n8n)
```

**Pourquoi Vercel pour le frontend ?**
- ✅ CDN global automatique
- ✅ SSL automatique
- ✅ Zero downtime deployments
- ✅ Pas de gestion nginx/PM2/certificats
- ✅ Ne touche pas aux autres sites sur VPS
- ✅ Coût : Gratuit (hobby plan)

**Le VPS reste pour :**
- PostgreSQL (base de données)
- n8n (automatisations)
- Autres sites existants

---

## Précautions Importantes

### ⚠️ RÈGLES D'OR

1. **TOUJOURS faire un backup avant toute modification**
   ```bash
   # Backup nginx config
   sudo cp -r /etc/nginx /etc/nginx.backup.$(date +%Y%m%d)

   # Backup PM2 list
   pm2 save
   cp ~/.pm2/dump.pm2 ~/.pm2/dump.pm2.backup.$(date +%Y%m%d)
   ```

2. **TOUJOURS tester nginx avant de recharger**
   ```bash
   sudo nginx -t  # DOIT afficher "test is successful"
   ```

3. **NE JAMAIS modifier** :
   - Les configs des autres sites dans `/etc/nginx/sites-available/`
   - Les processus PM2 des autres applications
   - La configuration globale nginx `/etc/nginx/nginx.conf`
   - Les certificats SSL existants dans `/etc/letsencrypt/`

4. **TOUJOURS vérifier** :
   - Que vous éditez le bon fichier
   - Que vous redémarrez le bon processus PM2
   - Que vous ne cassez pas les autres sites

---

## Audit Initial du VPS

### Étape 1 : Se connecter et analyser (LECTURE SEULE)

```bash
# Connexion SSH
ssh votre_user@srv787787.hstgr.cloud

# Vérifier l'utilisateur actuel
whoami

# Lister les sites nginx existants
ls -la /etc/nginx/sites-enabled/

# Lister les processus PM2 existants
pm2 list

# Vérifier les certificats SSL existants
sudo certbot certificates

# Vérifier l'état de n8n
curl -I https://n8n.srv787787.hstgr.cloud

# Vérifier PostgreSQL
sudo systemctl status postgresql
```

### Étape 2 : Noter les informations

**Créer un fichier d'inventaire** (sur votre machine locale) :

```bash
# D:\mon-site-perso\VPS_INVENTORY.md

## Sites Nginx Existants
- [ ] site1.com → /etc/nginx/sites-enabled/site1.com
- [ ] site2.com → /etc/nginx/sites-enabled/site2.com
- [ ] n8n.srv787787.hstgr.cloud → /etc/nginx/sites-enabled/n8n

## Processus PM2
- [ ] app1 (site1)
- [ ] app2 (site2)
- [ ] n8n

## Certificats SSL
- [ ] site1.com, www.site1.com
- [ ] site2.com
- [ ] n8n.srv787787.hstgr.cloud

## Bases PostgreSQL
- [ ] db1 (pour site1)
- [ ] db2 (pour site2)
- [ ] synap6ia_prod (à créer)
```

---

## Configuration DNS

### Hostinger DNS Management

**URL** : https://hpanel.hostinger.com → Domains → synap6ia.com → DNS

### Records DNS pour Vercel (RECOMMANDÉ)

#### Configuration 1 : A Record + CNAME

```
Type    Name    Value                       TTL      Priority
A       @       76.76.21.21                 14400    -
A       @       76.76.21.98                 14400    -  (Vercel secondary IP)
CNAME   www     cname.vercel-dns.com.       14400    -
```

**Vérifier les IPs Vercel actuelles** :
```bash
# Sur votre machine locale
nslookup cname.vercel-dns.com
# Noter les IPs retournées
```

#### Configuration 2 : CNAME uniquement (Alternative)

```
Type    Name    Value                       TTL      Priority
CNAME   @       cname.vercel-dns.com.       14400    -
CNAME   www     cname.vercel-dns.com.       14400    -
```

**Note** : Certains registrars n'acceptent pas CNAME sur le root (@). Si c'est le cas, utiliser Configuration 1.

### ⚠️ Records DNS Existants

**AVANT de modifier**, noter tous les records existants pour les autres domaines !

**Exemple de ce qu'il NE FAUT PAS TOUCHER** :
```
# Si vous avez d'autres domaines sur le même compte Hostinger
site1.com    A       1.2.3.4
site2.com    A       1.2.3.4
n8n          CNAME   srv787787.hstgr.cloud
```

### Vérification Propagation DNS

```bash
# Attendre 5-10 minutes après modification
nslookup synap6ia.com
# Devrait pointer vers Vercel IPs (76.76.21.*)

# Alternative avec dig
dig synap6ia.com +short
dig www.synap6ia.com +short
```

---

## Option A : Vercel (RECOMMANDÉ)

### Avantages

- ✅ Aucun risque pour les autres sites sur VPS
- ✅ SSL automatique
- ✅ CDN global
- ✅ Déploiement automatique
- ✅ VPS utilisé uniquement pour DB + n8n

### Étape 1 : Ajouter le Domaine sur Vercel

1. **Aller sur Dashboard Vercel**
   - URL : https://vercel.com/dashboard
   - Se connecter avec votre compte

2. **Sélectionner votre projet**
   - Trouver "mon-site-perso" ou "td-tech"
   - Cliquer dessus

3. **Settings → Domains**
   - Cliquer sur "Add"
   - Entrer : `synap6ia.com`
   - Cliquer sur "Add"

4. **Répéter pour www**
   - Cliquer sur "Add" à nouveau
   - Entrer : `www.synap6ia.com`
   - Cliquer sur "Add"

5. **Configurer la Redirection**
   - `www.synap6ia.com` → Redirect to `synap6ia.com`
   - (déjà fait dans `vercel.json`)

### Étape 2 : Vérifier la Configuration DNS

Vercel va afficher les instructions DNS. Vérifier qu'elles correspondent à ce que vous avez configuré dans Hostinger.

**Vercel devrait afficher** :
```
✅ synap6ia.com configured correctly
✅ www.synap6ia.com configured correctly
```

**Si erreur** :
- ⏳ Attendre la propagation DNS (jusqu'à 48h, généralement 1-6h)
- 🔄 Forcer le refresh : Settings → Domains → Refresh

### Étape 3 : Variables d'Environnement Production

**Dashboard Vercel** → **Settings** → **Environment Variables**

#### Variables à Ajouter (UNIQUEMENT Production)

| Variable | Value | Environment |
|----------|-------|-------------|
| `NODE_ENV` | `production` | Production |
| `NEXT_PUBLIC_SITE_URL` | `https://synap6ia.com` | Production, Preview, Development |
| `DATABASE_URL` | `postgresql://USER:PASS@srv787787.hstgr.cloud:5432/synap6ia_prod?sslmode=require` | Production |
| `AUTH_SECRET` | `<générer avec openssl>` | Production, Preview |
| `AUTH_URL` | `https://synap6ia.com` | Production |
| `USE_GMAIL_SMTP` | `true` | Production |
| `GMAIL_USER` | `diallotidiane014@gmail.com` | Production |
| `GMAIL_APP_PASSWORD` | `<16 caractères>` | Production |
| `N8N_WEBHOOK_URL` | `https://n8n.srv787787.hstgr.cloud/webhook/contact-form` | Production, Preview |

**⚠️ IMPORTANT : DATABASE_URL**

Remplacer `USER:PASS` par vos vrais credentials PostgreSQL :

```bash
# Format
postgresql://USERNAME:PASSWORD@srv787787.hstgr.cloud:5432/synap6ia_prod?sslmode=require

# Exemple (PAS les vrais credentials !)
postgresql://synap6ia_user:S3cur3P@ssw0rd@srv787787.hstgr.cloud:5432/synap6ia_prod?sslmode=require
```

**Comment obtenir AUTH_SECRET** :

```bash
# Sur votre machine Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))

# Copier le résultat (32+ caractères)
```

### Étape 4 : Créer la Base de Données sur VPS

```bash
# Se connecter au VPS
ssh votre_user@srv787787.hstgr.cloud

# Se connecter à PostgreSQL
sudo -u postgres psql

# Créer la base de données
CREATE DATABASE synap6ia_prod;

# Créer un utilisateur dédié
CREATE USER synap6ia_user WITH PASSWORD 'VotreMotDePasseSécurisé123!';

# Donner les permissions
GRANT ALL PRIVILEGES ON DATABASE synap6ia_prod TO synap6ia_user;

# Vérifier
\l    # Liste des bases
\du   # Liste des utilisateurs

# Quitter
\q
```

**Vérifier la connexion depuis Vercel** :

```bash
# Sur votre machine locale, tester la connexion
# (Installer psql si nécessaire)
psql "postgresql://synap6ia_user:VotreMotDePasseSécurisé123!@srv787787.hstgr.cloud:5432/synap6ia_prod?sslmode=require"

# Si ça marche, Ctrl+D pour quitter
```

**Si erreur "connection refused"**, configurer PostgreSQL :

```bash
# Sur le VPS
sudo nano /etc/postgresql/14/main/pg_hba.conf

# Ajouter UNIQUEMENT si pas déjà présent :
host    all             all             0.0.0.0/0               md5

# Sauvegarder et quitter (Ctrl+X, Y, Enter)

sudo nano /etc/postgresql/14/main/postgresql.conf

# Chercher listen_addresses et modifier :
listen_addresses = '*'

# Sauvegarder et redémarrer
sudo systemctl restart postgresql

# Vérifier le firewall
sudo ufw status
sudo ufw allow 5432/tcp  # Si pas déjà ouvert
```

### Étape 5 : Appliquer les Migrations

**Option 1 : Depuis votre machine locale**

```bash
cd D:\mon-site-perso

# Créer un fichier .env.production.local
# Contenu :
DATABASE_URL="postgresql://synap6ia_user:PASS@srv787787.hstgr.cloud:5432/synap6ia_prod?sslmode=require"

# Appliquer les migrations
npx prisma migrate deploy

# Si pas de migrations, push le schéma
npx prisma db push
```

**Option 2 : Via Vercel Function**

Vercel appliquera automatiquement les migrations au premier déploiement si vous avez configuré `postinstall` dans `package.json` :

```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

### Étape 6 : Déployer

```bash
cd D:\mon-site-perso

# Créer un commit vide pour forcer le redéploiement
git commit --allow-empty -m "Trigger production deployment to synap6ia.com"
git push origin main
```

**Suivre le déploiement** :
- Dashboard Vercel → Deployments
- Voir les logs en temps réel

### Étape 7 : Vérification Post-Déploiement

```bash
# Attendre 2-5 minutes

# Tester le site
curl -I https://synap6ia.com
# Devrait retourner 200 OK

# Tester www
curl -I https://www.synap6ia.com
# Devrait rediriger vers synap6ia.com (301)

# Tester le formulaire de contact
# Ouvrir https://synap6ia.com/contact dans le navigateur
# Envoyer un message de test
```

**Vérifier que les autres sites fonctionnent toujours** :
```bash
# Si vous avez d'autres sites
curl -I https://site1.com
curl -I https://site2.com
curl -I https://n8n.srv787787.hstgr.cloud
```

---

## Option B : VPS avec nginx/PM2

⚠️ **Utiliser UNIQUEMENT si vous ne pouvez pas utiliser Vercel**

Cette option est plus complexe et nécessite de manipuler nginx/PM2/SSL sur un VPS multi-sites.

### Prérequis

- Node.js 20.x installé
- PM2 installé globalement
- nginx installé
- Certbot installé

### Étape 1 : Préparer le Répertoire

```bash
# Se connecter au VPS
ssh votre_user@srv787787.hstgr.cloud

# Créer le répertoire SANS conflit avec les autres
sudo mkdir -p /var/www/synap6ia
sudo chown -R $USER:$USER /var/www/synap6ia

# Cloner le repository
cd /var/www/synap6ia
git clone https://github.com/TIDIALLO/td-tech.git .

# Vérifier qu'on est dans le bon répertoire
pwd  # Doit afficher /var/www/synap6ia
```

### Étape 2 : Configuration .env

```bash
cd /var/www/synap6ia

# Créer le fichier .env
nano .env
```

**Contenu** :

```bash
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://synap6ia.com
DATABASE_URL=postgresql://synap6ia_user:PASS@localhost:5432/synap6ia_prod?sslmode=require
AUTH_SECRET=<généré avec openssl>
AUTH_URL=https://synap6ia.com
USE_GMAIL_SMTP=true
GMAIL_USER=diallotidiane014@gmail.com
GMAIL_APP_PASSWORD=<16 caractères>
N8N_WEBHOOK_URL=https://n8n.srv787787.hstgr.cloud/webhook/contact-form
```

**Sauvegarder** : Ctrl+X, Y, Enter

### Étape 3 : Build et Installation

```bash
cd /var/www/synap6ia

# Installer les dépendances
npm ci --legacy-peer-deps

# Générer Prisma Client
npx prisma generate

# Appliquer les migrations
npx prisma migrate deploy

# Build Next.js
npm run build

# Vérifier que le build a réussi
ls -la .next/
```

### Étape 4 : Configuration PM2

```bash
# Vérifier les processus PM2 existants
pm2 list

# Démarrer Synap6ia (NOUVEAU processus, ne touche pas aux autres)
pm2 start npm --name "synap6ia" -- start

# Configurer le port (si 3000 déjà utilisé)
# Dans ce cas, utiliser un autre port, ex: 3001
# Modifier package.json :
# "start": "next start -p 3001"

# Sauvegarder la configuration PM2
pm2 save

# Vérifier
pm2 list
# Devrait afficher :
# - vos autres apps existantes (ne pas toucher)
# - synap6ia (nouveau)

# Voir les logs
pm2 logs synap6ia --lines 50
```

### Étape 5 : Configuration nginx

⚠️ **ATTENTION** : Ne pas toucher aux autres sites !

```bash
# Créer NOUVEAU fichier de config UNIQUEMENT pour synap6ia
sudo nano /etc/nginx/sites-available/synap6ia.com
```

**Contenu** :

```nginx
# Configuration Synap6ia
server {
    listen 80;
    listen [::]:80;
    server_name synap6ia.com www.synap6ia.com;

    # Redirection temporaire vers HTTPS (après certificat SSL)
    # Pour l'instant, proxy vers l'application

    location / {
        proxy_pass http://localhost:3000;  # ou 3001 si port différent
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

**Sauvegarder** : Ctrl+X, Y, Enter

```bash
# Créer le lien symbolique
sudo ln -s /etc/nginx/sites-available/synap6ia.com /etc/nginx/sites-enabled/

# VÉRIFIER la configuration nginx (CRITIQUE)
sudo nginx -t

# Si "test is successful", recharger
sudo systemctl reload nginx

# Si erreur, vérifier le fichier et corriger
```

### Étape 6 : Générer Certificat SSL

```bash
# Vérifier que le domaine pointe vers le VPS
nslookup synap6ia.com
# Devrait afficher l'IP du VPS

# Générer le certificat UNIQUEMENT pour synap6ia.com
sudo certbot --nginx -d synap6ia.com -d www.synap6ia.com

# Certbot va :
# 1. Générer le certificat
# 2. Modifier automatiquement la config nginx
# 3. Configurer le renouvellement automatique

# Vérifier les certificats
sudo certbot certificates

# Tester le renouvellement automatique
sudo certbot renew --dry-run
```

**Certbot va modifier `/etc/nginx/sites-available/synap6ia.com`** :

```nginx
# Configuration générée automatiquement par Certbot
server {
    server_name synap6ia.com www.synap6ia.com;

    location / {
        proxy_pass http://localhost:3000;
        # ... autres directives proxy
    }

    listen [::]:443 ssl ipv6only=on;
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

### Étape 7 : Redirection www → non-www

```bash
sudo nano /etc/nginx/sites-available/synap6ia.com

# Modifier la section server HTTPS :
server {
    server_name synap6ia.com www.synap6ia.com;

    # Ajouter AVANT location / :
    if ($host = 'www.synap6ia.com') {
        return 301 https://synap6ia.com$request_uri;
    }

    location / {
        # ... reste inchangé
    }

    # ... reste inchangé
}

# Sauvegarder et tester
sudo nginx -t
sudo systemctl reload nginx
```

### Étape 8 : Vérification Finale

```bash
# Tester HTTP → HTTPS redirect
curl -I http://synap6ia.com
# Devrait retourner 301 vers https://synap6ia.com

# Tester www → non-www redirect
curl -I https://www.synap6ia.com
# Devrait retourner 301 vers https://synap6ia.com

# Tester HTTPS
curl -I https://synap6ia.com
# Devrait retourner 200 OK

# Vérifier PM2
pm2 status
pm2 logs synap6ia --lines 20

# Vérifier que les AUTRES sites fonctionnent toujours
curl -I https://site1.com
curl -I https://n8n.srv787787.hstgr.cloud
```

---

## Sécurité et Backup

### Backup Pré-Déploiement

```bash
# Sur le VPS

# 1. Backup nginx
sudo cp -r /etc/nginx /etc/nginx.backup.$(date +%Y%m%d)

# 2. Backup PM2
pm2 save
cp ~/.pm2/dump.pm2 ~/.pm2/dump.pm2.backup.$(date +%Y%m%d)

# 3. Backup PostgreSQL (si vous avez déjà des données)
pg_dump -U postgres synap6ia_prod > synap6ia_backup_$(date +%Y%m%d).sql

# 4. Backup certificats SSL (optionnel)
sudo tar -czf letsencrypt_backup_$(date +%Y%m%d).tar.gz /etc/letsencrypt
```

### Rollback en Cas de Problème

#### Rollback nginx

```bash
# Désactiver le site
sudo rm /etc/nginx/sites-enabled/synap6ia.com

# Restaurer l'ancienne config
sudo cp -r /etc/nginx.backup.YYYYMMDD/* /etc/nginx/

# Tester et recharger
sudo nginx -t
sudo systemctl reload nginx
```

#### Rollback PM2

```bash
# Arrêter et supprimer le processus
pm2 stop synap6ia
pm2 delete synap6ia

# Restaurer l'ancienne liste
pm2 resurrect
```

#### Rollback Database

```bash
# Restaurer le dump
psql -U postgres synap6ia_prod < synap6ia_backup_YYYYMMDD.sql
```

### Sécurité PostgreSQL

```bash
# Vérifier que SEULES les connexions sécurisées sont autorisées
sudo nano /etc/postgresql/14/main/pg_hba.conf

# S'assurer que sslmode=require est forcé :
hostssl    all             all             0.0.0.0/0               md5

# Si vous avez modifié, redémarrer
sudo systemctl restart postgresql
```

### Firewall

```bash
# Vérifier le firewall
sudo ufw status

# Ports qui DOIVENT être ouverts :
# - 22 (SSH)
# - 80 (HTTP)
# - 443 (HTTPS)
# - 5432 (PostgreSQL) - seulement si connexions externes nécessaires
# - 5678 (n8n) - si déjà configuré

# Si vous utilisez Vercel, PostgreSQL doit être accessible de l'extérieur
sudo ufw allow 5432/tcp

# Ne PAS ouvrir de ports supplémentaires
```

---

## Checklist Finale

### Avant Déploiement

- [ ] Backup nginx complet
- [ ] Backup PM2 dump
- [ ] Backup PostgreSQL (si données existantes)
- [ ] Inventory des sites existants noté
- [ ] Tous les credentials notés en sécurité (pas sur le VPS)

### Configuration DNS

- [ ] Records DNS configurés sur Hostinger
- [ ] Propagation vérifiée (nslookup synap6ia.com)
- [ ] Records des autres domaines non touchés

### Configuration Vercel (Option A - Recommandé)

- [ ] Domaine ajouté sur Vercel
- [ ] Variables d'environnement configurées
- [ ] DATABASE_URL testé depuis machine locale
- [ ] Base de données créée sur VPS
- [ ] Migrations appliquées
- [ ] Déploiement déclenché
- [ ] Site accessible sur https://synap6ia.com
- [ ] Redirection www fonctionne
- [ ] Formulaire de contact testé
- [ ] n8n webhook testé

### Configuration VPS (Option B)

- [ ] Répertoire /var/www/synap6ia créé
- [ ] Code cloné et build réussi
- [ ] .env configuré avec credentials corrects
- [ ] PM2 démarré (processus "synap6ia")
- [ ] nginx config créée (/etc/nginx/sites-available/synap6ia.com)
- [ ] nginx -t réussi
- [ ] nginx rechargé sans erreur
- [ ] Certificat SSL généré avec Certbot
- [ ] HTTPS fonctionne
- [ ] Redirection www → non-www fonctionne
- [ ] Renouvellement SSL automatique configuré

### Vérification Post-Déploiement

- [ ] https://synap6ia.com accessible (200 OK)
- [ ] https://www.synap6ia.com redirige vers synap6ia.com
- [ ] http://synap6ia.com redirige vers https://synap6ia.com
- [ ] Formulaire de contact fonctionne
- [ ] Email reçu
- [ ] n8n webhook reçu
- [ ] Message sauvegardé en base de données
- [ ] Pas d'erreurs dans les logs
- [ ] **TOUS les autres sites fonctionnent toujours** ✅

### Sécurité

- [ ] .env contient les vrais credentials (pas les exemples)
- [ ] .env jamais commité sur Git
- [ ] DATABASE_URL avec sslmode=require
- [ ] Firewall correctement configuré
- [ ] Certificats SSL valides
- [ ] Rate limiting actif (3 req/min)
- [ ] CORS configuré (origins whitelistées)

---

## Dépannage

### Problème : "502 Bad Gateway" sur nginx

```bash
# Vérifier que PM2 tourne
pm2 status
pm2 logs synap6ia

# Vérifier le port dans nginx
cat /etc/nginx/sites-available/synap6ia.com | grep proxy_pass
# Doit matcher le port PM2

# Redémarrer PM2
pm2 restart synap6ia
```

### Problème : Certbot échoue

```bash
# Vérifier que le domaine pointe vers le VPS
nslookup synap6ia.com

# Vérifier que nginx écoute sur le port 80
sudo netstat -tlnp | grep :80

# Vérifier qu'aucun autre processus n'utilise le port 80
sudo lsof -i :80

# Si un autre service utilise le port, l'arrêter temporairement
```

### Problème : PostgreSQL refuse les connexions

```bash
# Vérifier que PostgreSQL écoute sur toutes les interfaces
sudo netstat -tlnp | grep 5432

# Devrait afficher 0.0.0.0:5432 (pas 127.0.0.1:5432)

# Si pas le cas :
sudo nano /etc/postgresql/14/main/postgresql.conf
# Modifier : listen_addresses = '*'
sudo systemctl restart postgresql
```

### Problème : Autres sites cassés après config

```bash
# Restaurer nginx backup
sudo rm /etc/nginx/sites-enabled/synap6ia.com
sudo cp -r /etc/nginx.backup.YYYYMMDD/* /etc/nginx/
sudo nginx -t
sudo systemctl reload nginx

# Les autres sites devraient reffonctionner immédiatement
```

---

## Résumé des Commandes Critiques

### Vérification État Actuel (SAFE)

```bash
pm2 list                              # Processus PM2
sudo nginx -t                         # Test config nginx
sudo certbot certificates             # Certificats SSL
sudo systemctl status postgresql      # PostgreSQL
```

### Backup (TOUJOURS faire avant modif)

```bash
sudo cp -r /etc/nginx /etc/nginx.backup.$(date +%Y%m%d)
pm2 save
```

### Rollback Rapide

```bash
# nginx
sudo rm /etc/nginx/sites-enabled/synap6ia.com
sudo systemctl reload nginx

# PM2
pm2 stop synap6ia
pm2 delete synap6ia
```

---

**Dernière mise à jour** : 2026-01-07
**Mode recommandé** : Vercel (Option A)
**Mainteneur** : Tidiane Diallo (Synap6ia)
