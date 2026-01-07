# Inventaire VPS Complet - srv787787.hstgr.cloud

Date : 2026-01-07
Statut : ✅ AUDIT TERMINÉ

---

## 📊 RÉSUMÉ INFRASTRUCTURE

### Sites Actifs
✅ **3 sites en production** :
- kheops-consulting.com (+ www)
- thercalenergies.com (+ www)
- n8n.srv787787.hstgr.cloud

### Processus PM2
✅ **2 applications** :
- `kheops` (ID 0, online)
- `thercal-energie` (ID 4, online)

### Certificats SSL
✅ **3 certificats valides** (expiration : fév-mars 2026)

---

## 💾 RESSOURCES SYSTÈME

### Espace Disque
```
/dev/sda1    96G   20G   77G   21% /
```
✅ **77 GB disponibles** - Largement suffisant

### Node.js
```
Node.js : v22.17.0
npm     : 10.9.2
```
✅ **Version récente** - Compatible Next.js 16

### Mémoire
(À vérifier avec `free -h` si besoin)

---

## 🔴 POINTS CRITIQUES IDENTIFIÉS

### 1. PostgreSQL NON INSTALLÉ ⚠️

```
Unit postgresql.service could not be found.
sudo: unknown user postgres
```

**IMPACT** : Il faudra installer PostgreSQL avant de déployer synap6ia

**SOLUTION** :
```bash
# Installation PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib -y
```

### 2. Firewall DÉSACTIVÉ ⚠️

```
Status: inactive
```

**IMPACT** : Tous les ports sont ouverts (risque sécurité)

**NOTE** : Pas bloquant pour le déploiement, mais à considérer

**SOLUTION (optionnelle)** :
```bash
# Activer UFW après déploiement
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
```

### 3. Ports Applications Inconnues

```
sudo netstat -tlnp | grep node
(aucun résultat)
```

**OBSERVATION** : Les processus PM2 ne semblent pas être des apps Node.js classiques, ou utilisent un nom de processus différent

**À VÉRIFIER** :
```bash
sudo netstat -tlnp | grep LISTEN
```

---

## 📁 RÉPERTOIRES /var/www

```
drwxr-xr-x  6 root     root     4096 Dec  9 22:19 .
drwxr-xr-x  2 root     root     4096 Jun 20  2025 certbot
drwxr-xr-x  2 root     root     4096 Jun 20  2025 html
drwxr-xr-x 14 root     root     4096 Jul  8  2025 kheops
drwxr-xr-x  9 www-data www-data 4096 Dec 12 15:50 thercal-energie
```

**OBSERVATIONS** :
- `kheops` appartient à **root**
- `thercal-energie` appartient à **www-data**

**DÉCISION pour synap6ia** :
- Créer `/var/www/synap6ia` avec owner **root** (comme kheops)
- Ou utiliser **www-data** (comme thercal-energie)

**RECOMMANDATION** : Utiliser **root** pour cohérence avec kheops

---

## 🎯 PLAN DE DÉPLOIEMENT SYNAP6IA

### Phase 1 : Installation PostgreSQL (NOUVEAU)

```bash
# 1. Installer PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib -y

# 2. Vérifier l'installation
sudo systemctl status postgresql

# 3. Démarrer si nécessaire
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Phase 2 : Configuration PostgreSQL

```bash
# 4. Se connecter à PostgreSQL
sudo -u postgres psql

# 5. Créer la base et l'utilisateur
CREATE DATABASE synap6ia_prod;
CREATE USER synap6ia_user WITH PASSWORD 'VotreMotDePasseTresSecurise123!';
GRANT ALL PRIVILEGES ON DATABASE synap6ia_prod TO synap6ia_user;
\c synap6ia_prod
GRANT ALL ON SCHEMA public TO synap6ia_user;
\q
```

### Phase 3 : Cloner et Configurer synap6ia

```bash
# 6. Créer le répertoire
sudo mkdir -p /var/www/synap6ia
sudo chown -R root:root /var/www/synap6ia

# 7. Cloner le repository
cd /var/www/synap6ia
git clone https://github.com/TIDIALLO/td-tech.git .

# 8. Installer les dépendances
npm ci --legacy-peer-deps

# 9. Créer le fichier .env
nano .env
```

### Phase 4 : Build et PM2

```bash
# 10. Build Next.js
npm run build

# 11. Trouver un port libre (vérifier d'abord)
sudo netstat -tlnp | grep LISTEN

# 12. Démarrer avec PM2 (utiliser port libre, ex: 3002)
# Si port 3000 libre :
pm2 start npm --name "synap6ia" -- start

# Sinon, modifier package.json pour utiliser port 3002 :
# "start": "next start -p 3002"

# 13. Sauvegarder PM2
pm2 save
```

### Phase 5 : Nginx et SSL

```bash
# 14. Créer config nginx
sudo nano /etc/nginx/sites-available/synap6ia.com

# 15. Activer le site
sudo ln -s /etc/nginx/sites-available/synap6ia.com /etc/nginx/sites-enabled/

# 16. Tester nginx
sudo nginx -t

# 17. Recharger nginx
sudo systemctl reload nginx

# 18. Générer certificat SSL
sudo certbot --nginx -d synap6ia.com -d www.synap6ia.com
```

---

## ⚠️ POINTS DE VIGILANCE

### Ne PAS toucher

- ❌ `/etc/nginx/sites-available/kheops`
- ❌ `/etc/nginx/sites-available/n8n`
- ❌ `/etc/nginx/sites-available/thercalenergies.conf`
- ❌ PM2 processus : kheops, thercal-energie
- ❌ Certificats SSL existants

### Backup AVANT toute modification

```bash
# Backup nginx
sudo cp -r /etc/nginx /etc/nginx.backup.$(date +%Y%m%d)

# Backup PM2
pm2 save
cp ~/.pm2/dump.pm2 ~/.pm2/dump.pm2.backup.$(date +%Y%m%d)
```

---

## 🔒 SÉCURITÉ POST-DÉPLOIEMENT

### Optionnel : Activer UFW

```bash
# Configurer firewall (APRÈS déploiement réussi)
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable

# Vérifier
sudo ufw status
```

### Optionnel : Limiter PostgreSQL

Si PostgreSQL ne doit être accessible que localement :

```bash
sudo nano /etc/postgresql/*/main/postgresql.conf
# listen_addresses = 'localhost'  # Au lieu de '*'

sudo systemctl restart postgresql
```

---

## 📋 CHECKLIST AVANT DÉPLOIEMENT

- [x] Audit VPS terminé
- [x] Infrastructure existante documentée
- [x] Espace disque vérifié (77 GB disponibles)
- [x] Node.js compatible (v22.17.0)
- [ ] PostgreSQL à installer
- [ ] Port disponible identifié (à vérifier)
- [ ] Backup nginx à faire
- [ ] Backup PM2 à faire

---

## 🚀 PRÊT POUR LE DÉPLOIEMENT

**Statut** : ✅ Audit terminé, prêt à démarrer

**Prochaine étape** : Installer PostgreSQL

**Temps estimé** :
- Installation PostgreSQL : 5 minutes
- Configuration et déploiement : 30 minutes
- Tests : 15 minutes
- **TOTAL : ~50 minutes**

---

**Mise à jour** : 2026-01-07
**Validé par** : Audit complet VPS
