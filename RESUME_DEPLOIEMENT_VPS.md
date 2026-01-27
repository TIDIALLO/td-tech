# Résumé Complet du Déploiement VPS - Synap6ia

**Date** : 2026-01-07
**Durée totale** : ~2 heures
**Résultat** : ✅ Production réussie

---

## 🎯 Objectif

Déployer synap6ia.com sur un VPS Hostinger hébergeant déjà 3 sites (kheops-consulting.com, thercalenergies.com, n8n) **sans casser l'existant**.

---

## 📋 ÉTAPES COMPLÈTES (27 COMMANDES)

### PHASE 1 : PRÉPARATION (Étapes 1-3)

#### Étape 1 : Backup de Sécurité ⚠️

**Pourquoi ?** Toujours faire un backup avant toute modification

```bash
sudo cp -r /etc/nginx /etc/nginx.backup.$(date +%Y%m%d)
pm2 save
```

✅ **Résultat** : Backup nginx et PM2 créés

---

#### Étape 2 : Installation PostgreSQL 📦

**Pourquoi ?** La base de données n'était pas installée sur le VPS

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib -y
```

✅ **Résultat** : PostgreSQL 14+ installé

---

#### Étape 3 : Vérification PostgreSQL

```bash
sudo systemctl status postgresql --no-pager | head -15
```

✅ **Résultat** : `Active: active (exited)` - PostgreSQL fonctionne

---

### PHASE 2 : BASE DE DONNÉES (Étapes 4-6)

#### Étape 4 : Connexion à PostgreSQL

```bash
sudo -u postgres psql
```

✅ **Résultat** : Prompt `postgres=#` affiché

---

#### Étape 5 : Création Base et Utilisateur

**Dans PostgreSQL** :

```sql
CREATE DATABASE synap6ia_prod;
CREATE USER synap6ia_user WITH PASSWORD 'Synap6ia2026!SecureDB#';
GRANT ALL PRIVILEGES ON DATABASE synap6ia_prod TO synap6ia_user;
\c synap6ia_prod
GRANT ALL ON SCHEMA public TO synap6ia_user;
\q
```

✅ **Résultat** : Base `synap6ia_prod` et user `synap6ia_user` créés

**⚠️ Sécurité** : Mot de passe fort avec caractères spéciaux

---

#### Étape 6 : Vérification Création

```sql
\l    -- Liste des bases (voir synap6ia_prod)
\du   -- Liste des users (voir synap6ia_user)
\q    -- Quitter
```

✅ **Résultat** : Base et user confirmés

---

### PHASE 3 : ANALYSE INFRASTRUCTURE (Étapes 7-8)

#### Étape 7 : Identifier Ports Utilisés

**Pourquoi ?** Éviter les conflits de ports

```bash
sudo netstat -tlnp | grep LISTEN
```

✅ **Résultat trouvé** :
- Port 3000 : kheops (next-server)
- Port 3001 : thercal-energie (next-server)
- Port 5678 : n8n (docker)
- Port 5432 : PostgreSQL (localhost)
- Port 80/443 : nginx

**Décision** : Utiliser port **3002** pour synap6ia ✅

---

### PHASE 4 : DÉPLOIEMENT APPLICATION (Étapes 8-17)

#### Étape 8 : Cloner le Repository

```bash
cd /var/www
sudo mkdir -p synap6ia
cd synap6ia
sudo git clone https://github.com/TIDIALLO/td-tech.git .
```

✅ **Résultat** : Code cloné dans `/var/www/synap6ia`

**Note** : Repository public pour faciliter le clone (aucun secret dedans)

---

#### Étape 9 : Vérifier Absence de Secrets

```bash
ls -la /var/www/synap6ia/ | grep -E "\.env"
```

✅ **Résultat** : Aucun fichier `.env` (sécurité OK)

---

#### Étape 10 : Créer le Fichier .env

```bash
cd /var/www/synap6ia
nano .env
```

**Contenu** :

```env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://synap6ia.com
DATABASE_URL=postgresql://synap6ia_user:Synap6ia2026%21SecureDB%23@localhost:5432/synap6ia_prod?sslmode=require
AUTH_SECRET=a8Kj2mN4pQ6rS8tU0vW2xY4zA6bC8dE0fG2hI4jK6lM9oP1qR3sT5uV7wX9yZ
AUTH_URL=https://synap6ia.com
USE_GMAIL_SMTP=true
GMAIL_USER=diallotidiane014@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop
N8N_WEBHOOK_URL=https://n8n.srv787787.hstgr.cloud/webhook/contact-form
```

⚠️ **Points critiques** :
- Caractères spéciaux dans DATABASE_URL encodés (`!` → `%21`, `#` → `%23`)
- AUTH_SECRET : 32+ caractères aléatoires
- GMAIL_APP_PASSWORD : Code 16 caractères de Google (PAS le mot de passe Gmail)

✅ **Résultat** : `.env` créé (reste sur VPS, jamais commité)

---

#### Étape 11 : Installer les Dépendances

```bash
cd /var/www/synap6ia
npm ci --legacy-peer-deps
```

⏳ **Durée** : 1-3 minutes
✅ **Résultat** : 684 packages installés

---

#### Étape 12 : Générer Prisma Client

```bash
npx prisma generate
```

✅ **Résultat** : Client Prisma généré

---

#### Étape 13 : Appliquer Migrations (Premier essai - ÉCHEC)

```bash
npx prisma migrate deploy
```

❌ **Erreur** : `P1013: invalid port number`
**Cause** : Caractères spéciaux `!` et `#` non encodés dans DATABASE_URL

---

#### Étape 14 : Corriger DATABASE_URL

**Modifier `.env`** :

```bash
nano .env
```

Remplacer :
```
Synap6ia2026!SecureDB#
```

Par :
```
Synap6ia2026%21SecureDB%23
```

Puis réessayer :

```bash
npx prisma migrate deploy
```

✅ **Résultat** : "No pending migrations" (pas de fichiers migration/)

---

#### Étape 15 : Push le Schéma

```bash
npx prisma db push
```

✅ **Résultat** : "Your database is now in sync" - Tables créées :
- users
- accounts
- sessions
- projects
- services
- courses
- blog_posts
- contact_messages
- etc.

---

#### Étape 16 : Build Next.js

```bash
npm run build
```

⏳ **Durée** : 2-4 minutes
✅ **Résultat** : "Compiled successfully in 15.9s"

**Routes créées** :
- 24 routes (/, /services, /contact, /formations, etc.)
- Mix de Static, SSG, et Dynamic

---

#### Étape 17 : Configurer le Port

**Modifier `package.json`** :

```bash
nano package.json
```

Ligne 8, remplacer :
```json
"start": "next start",
```

Par :
```json
"start": "next start -p 3002",
```

✅ **Résultat** : App configurée pour port 3002

---

### PHASE 5 : PM2 (Étapes 18-19)

#### Étape 18 : Démarrer avec PM2

```bash
cd /var/www/synap6ia
pm2 start npm --name "synap6ia" -- start
```

✅ **Résultat** : Process ID 5, status "online"

**Liste PM2 après démarrage** :
```
│ 0  │ kheops             │ online    │
│ 5  │ synap6ia           │ online    │  ← NOUVEAU
│ 4  │ thercal-energie    │ online    │
```

---

#### Étape 19 : Sauvegarder PM2 et Vérifier Port

```bash
pm2 save
sudo netstat -tlnp | grep 3002
```

✅ **Résultat** :
- PM2 sauvegardé
- synap6ia écoute sur `:::3002` (IPv6)

---

### PHASE 6 : NGINX (Étapes 20-22)

#### Étape 20 : Créer Config nginx

```bash
sudo nano /etc/nginx/sites-available/synap6ia.com
```

**Contenu** :

```nginx
server {
    listen 80;
    listen [::]:80;
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
}
```

✅ **Résultat** : Config créée (HTTP uniquement pour l'instant)

---

#### Étape 21 : Activer le Site

```bash
sudo ln -s /etc/nginx/sites-available/synap6ia.com /etc/nginx/sites-enabled/
sudo nginx -t
```

✅ **Résultat** : "test is successful" ✅

⚠️ **Warning** : "protocol options redefined for [::]:443 in thercalenergies.conf" (non critique)

---

#### Étape 22 : Recharger nginx

```bash
sudo systemctl reload nginx
sudo systemctl status nginx --no-pager | head -5
```

✅ **Résultat** : "Active: active (running)"

---

### PHASE 7 : DNS (Étapes 23-24)

#### Étape 23 : Obtenir l'IP du VPS

```bash
curl -4 ifconfig.me && echo
```

✅ **Résultat** : `217.65.145.247`

---

#### Étape 24 : Configurer DNS Hostinger

**Interface** : https://hpanel.hostinger.com → synap6ia.com → DNS Records

**Actions** :
1. ❌ Supprimer record A ancien : `84.32.84.32` (IP parking)
2. ✅ Ajouter record A : `@ → 217.65.145.247`
3. ✅ Ajouter record A : `www → 217.65.145.247`

**Vérification** :

```bash
nslookup synap6ia.com
```

✅ **Résultat attendu** : `217.65.145.247`

**Temps propagation** : 5 minutes à 24h (généralement 1-6h)

---

### PHASE 8 : SSL/HTTPS (Étape 25)

#### Étape 25 : Générer Certificat Let's Encrypt

```bash
sudo certbot --nginx -d synap6ia.com -d www.synap6ia.com
```

**Questions Certbot** :
1. Email : Donner votre email
2. Accepter termes : `Y`
3. Partager email EFF : `N`
4. Redirect HTTP → HTTPS : `2` (redirect automatique)

✅ **Résultat** :
```
Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/synap6ia.com/fullchain.pem
Key is saved at: /etc/letsencrypt/live/synap6ia.com/privkey.pem
Expires: 2026-04-07 (90 jours)
Successfully deployed certificate
```

**Certbot a automatiquement** :
- Généré le certificat SSL
- Modifié `/etc/nginx/sites-available/synap6ia.com`
- Ajouté la section HTTPS (port 443)
- Configuré la redirection HTTP → HTTPS
- Configuré le renouvellement automatique (cron)

---

### PHASE 9 : CORRECTION EMAIL (Étape 26)

#### Étape 26 : Corriger Gmail App Password

**Problème initial** : `.env` contenait le mot de passe Gmail normal (`Diallo@06#`)

**Solution** :
1. Générer App Password : https://myaccount.google.com/apppasswords
2. Copier le code 16 caractères (ex: `abcdefghijklmnop`)
3. Modifier `.env` :

```bash
nano .env
```

Remplacer :
```
GMAIL_APP_PASSWORD=Diallo@06#
```

Par :
```
GMAIL_APP_PASSWORD=abcdefghijklmnop
```

4. Redémarrer :

```bash
pm2 restart synap6ia
```

✅ **Résultat** : Emails envoyés avec succès ✉️

---

### PHASE 10 : TESTS FINAUX (Étape 27)

#### Étape 27 : Vérifier TOUS les Sites

```bash
curl -I https://kheops-consulting.com && echo "---" && \
curl -I https://thercalenergies.com && echo "---" && \
curl -I https://n8n.srv787787.hstgr.cloud
```

✅ **Résultat** : Tous retournent `HTTP/2 200` ✅

**Confirmation** : Aucun site existant n'a été cassé !

---

## 🎉 RÉSULTAT FINAL

### URLs Fonctionnelles

| URL | Status |
|-----|--------|
| https://synap6ia.com | ✅ 200 OK (HTTPS) |
| https://www.synap6ia.com | ✅ 301 → synap6ia.com |
| http://synap6ia.com | ✅ 301 → https:// |
| https://kheops-consulting.com | ✅ 200 OK |
| https://thercalenergies.com | ✅ 200 OK |
| https://n8n.srv787787.hstgr.cloud | ✅ 200 OK |

### Fonctionnalités Testées

- ✅ **Formulaire contact** : Email + n8n + DB OK
- ✅ **Navigation** : Toutes les pages accessibles
- ✅ **SSL/HTTPS** : Certificat valide
- ✅ **Dark mode** : Fonctionne
- ✅ **Services pages** : automatisation, agents-ia OK

---

## 📊 ARCHITECTURE FINALE

```
Internet
    ↓
DNS (synap6ia.com → 217.65.145.247)
    ↓
VPS srv787787.hstgr.cloud
    ↓
nginx :80/:443
    ├─→ kheops-consulting.com → localhost:3000 (PM2 kheops)
    ├─→ thercalenergies.com → localhost:3001 (PM2 thercal-energie)
    ├─→ synap6ia.com → localhost:3002 (PM2 synap6ia) ← NOUVEAU
    └─→ n8n.srv787787.hstgr.cloud → localhost:5678 (Docker n8n)

Backend Services (localhost)
    ├─→ PostgreSQL :5432
    │   ├─ kheops_db (existant)
    │   ├─ thercal_db (existant)
    │   └─ synap6ia_prod (nouveau) ← NOUVEAU
    └─→ n8n :5678
```

---

## 🔒 SÉCURITÉ

### Mesures Appliquées

1. ✅ **SSL/HTTPS** : Let's Encrypt (renouvellement auto)
2. ✅ **Secrets** : `.env` jamais commité, reste sur VPS
3. ✅ **Database** : PostgreSQL localhost uniquement (pas exposé)
4. ✅ **Passwords** : Forts avec caractères spéciaux
5. ✅ **Gmail** : App Password (pas password principal)
6. ✅ **Rate limiting** : 3 req/min dans le code
7. ✅ **CORS** : Whitelist des origines autorisées
8. ✅ **XSS** : Sanitization des inputs

### Points à Améliorer (Optionnel)

- [ ] Activer UFW (firewall) - Actuellement désactivé
- [ ] Backup automatique PostgreSQL (cron quotidien)
- [ ] Monitoring (Uptime Robot, Sentry)
- [ ] Logs rotation (logrotate)

---

## 🛠️ MAINTENANCE

### Mises à Jour Application

```bash
cd /var/www/synap6ia
git pull origin main
npm ci --legacy-peer-deps
npx prisma generate
npx prisma migrate deploy  # Si nouvelles migrations
npm run build
pm2 restart synap6ia
```

### Vérifier Logs

```bash
pm2 logs synap6ia --lines 50
sudo tail -f /var/log/nginx/error.log
```

### Vérifier Certificat SSL

```bash
sudo certbot certificates
```

**Renouvellement** : Automatique tous les 90 jours (cron configuré par Certbot)

### Backup Réguliers

```bash
# PostgreSQL
pg_dump -U postgres synap6ia_prod > /backup/synap6ia_$(date +%Y%m%d).sql

# nginx
sudo cp -r /etc/nginx /backup/nginx_$(date +%Y%m%d)

# PM2
pm2 save
cp ~/.pm2/dump.pm2 /backup/pm2_$(date +%Y%m%d)
```

---

## ⚠️ DÉPANNAGE

### Problème : Site inaccessible

```bash
# Vérifier PM2
pm2 status
pm2 logs synap6ia

# Vérifier nginx
sudo nginx -t
sudo systemctl status nginx

# Vérifier port
sudo netstat -tlnp | grep 3002
```

### Problème : Email ne fonctionne pas

```bash
# Vérifier .env
cat /var/www/synap6ia/.env | grep GMAIL

# Tester connexion SMTP
telnet smtp.gmail.com 587
```

### Problème : Base de données

```bash
# Se connecter
sudo -u postgres psql synap6ia_prod

# Vérifier tables
\dt

# Vérifier connexions
SELECT * FROM pg_stat_activity WHERE datname = 'synap6ia_prod';
```

---

## 📈 STATISTIQUES DÉPLOIEMENT

- **Durée totale** : ~2 heures
- **Commandes exécutées** : 27 commandes principales
- **Fichiers modifiés** : 3 (`.env`, `package.json`, nginx config)
- **Services ajoutés** : 1 (PM2 synap6ia)
- **Bases créées** : 1 (synap6ia_prod)
- **Certificats SSL** : 1 (synap6ia.com + www)
- **Downtime autres sites** : 0 seconde ✅
- **Erreurs critiques** : 0 ✅

---

## 🎓 LEÇONS APPRISES

### Points Critiques à Retenir

1. **Toujours backup avant modification** (nginx, PM2, DB)
2. **Tester nginx AVANT reload** (`nginx -t`)
3. **Encoder caractères spéciaux dans URLs** (`!` → `%21`)
4. **Gmail App Password ≠ mot de passe Gmail**
5. **Vérifier ports disponibles** avant d'assigner
6. **DNS propagation prend du temps** (patience !)
7. **Certbot modifie automatiquement nginx** (bien comprendre)

### Commandes Essentielles à Connaître

```bash
pm2 list                    # Liste processus
pm2 logs <app> --lines 50   # Logs application
pm2 restart <app>           # Redémarrer app
sudo nginx -t               # Tester config nginx
sudo systemctl reload nginx # Recharger nginx
sudo certbot certificates   # Voir certificats SSL
nslookup <domaine>          # Vérifier DNS
sudo netstat -tlnp          # Voir ports utilisés
```

---

## 🚀 PROCHAINES ÉTAPES

### Améliorations Proposées

1. **Blog** : Section `/blog` pour partager :
   - Workflows n8n
   - Nouveautés Claude Code, Cursor
   - Tutoriels automatisation
   - Cas d'usage IA

2. **Responsive** : Vérifier affichage mobile/tablette

3. **Analytics** : Ajouter Google Analytics ou Plausible

4. **SEO** :
   - Sitemap.xml
   - Robots.txt
   - Meta descriptions
   - Open Graph images

5. **Performance** :
   - CDN pour images
   - Cache Redis (optionnel)
   - Image optimization

---

## 📞 SUPPORT

### Ressources Utiles

- **Next.js** : https://nextjs.org/docs
- **Prisma** : https://www.prisma.io/docs
- **nginx** : https://nginx.org/en/docs/
- **PM2** : https://pm2.keymetrics.io/docs/
- **Let's Encrypt** : https://letsencrypt.org/docs/
- **n8n** : https://docs.n8n.io/

### Contacts

- **Hébergeur** : Hostinger Support
- **Email** : diallotidiane014@gmail.com
- **VPS** : srv787787.hstgr.cloud

---

**Déploiement réalisé avec succès le 2026-01-07** ✅
**Site live** : https://synap6ia.com 🚀
**Aucun downtime des autres sites** ✅
