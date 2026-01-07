# Inventaire VPS Hostinger - srv787787.hstgr.cloud

Date de l'audit : 2026-01-07
Utilisateur connecté : root

---

## 1. Sites nginx Existants ✅

```
Sites configurés :
✅ kheops → /etc/nginx/sites-available/kheops
✅ n8n → /etc/nginx/sites-available/n8n
✅ thercalenergies.conf → /etc/nginx/sites-available/thercalenergies.conf
```

**⚠️ À NE PAS TOUCHER - Sites existants fonctionnels**

---

## 2. Processus PM2 ✅

```
┌────┬────────────────────┬─────────┬──────┬───────────┬──────────┐
│ id │ name               │ mode    │ ↺    │ status    │ uptime   │
├────┼────────────────────┼─────────┼──────┼───────────┼──────────┤
│ 0  │ kheops             │ fork    │ 0    │ online    │ 6M       │
│ 4  │ thercal-energie    │ fork    │ 3    │ online    │ 25D      │
└────┴────────────────────┴─────────┴──────┴───────────┴──────────┘
```

**⚠️ À NE PAS TOUCHER - Processus existants**

**Ports utilisés à vérifier** (voir étape suivante)

---

## 3. Certificats SSL ✅

```
Certificats actifs :
✅ kheops-consulting.com + www.kheops-consulting.com
   Expire : 2026-02-25 (VALIDE 49 jours)
   Type : ECDSA

✅ n8n.srv787787.hstgr.cloud
   Expire : 2026-03-05 (VALIDE 57 jours)
   Type : ECDSA

✅ thercalenergies.com + www.thercalenergies.com
   Expire : 2026-03-10 (VALIDE 61 jours)
   Type : ECDSA
```

**✅ Tous les certificats sont valides**

**⚠️ À NE PAS TOUCHER - Certificats existants**

---

## 4. Domaines Hébergés

```
Domaines actuels sur ce VPS :
✅ kheops-consulting.com (+ www)
✅ n8n.srv787787.hstgr.cloud
✅ thercalenergies.com (+ www)
🆕 synap6ia.com (à configurer)
```

---

## 5. À COMPLÉTER - Informations Manquantes

### Ports utilisés par les applications

**Commande à exécuter** :
```bash
sudo netstat -tlnp | grep node
```

Résultat attendu :
```
tcp  0.0.0.0:3000  LISTEN  113734/node  (kheops ?)
tcp  0.0.0.0:3001  LISTEN  927882/node  (thercal ?)
tcp  0.0.0.0:5678  LISTEN  xxxxxx/node  (n8n)
```

**Port disponible pour synap6ia** : 3002 (ou autre port libre)

---

### PostgreSQL

**Commande à exécuter** :
```bash
sudo systemctl status postgresql
sudo -u postgres psql -c "\l"
```

Bases de données existantes : (à compléter)

---

### Firewall (ufw)

**Commande à exécuter** :
```bash
sudo ufw status
```

Ports ouverts : (à compléter)

---

### Espace Disque

**Commande à exécuter** :
```bash
df -h
```

Espace disponible : (à compléter)

---

### Version Node.js

**Commande à exécuter** :
```bash
node --version
npm --version
```

Versions : (à compléter)

---

### Répertoires /var/www

**Commande à exécuter** :
```bash
ls -la /var/www/
```

Répertoires existants : (à compléter)

---

## RÉSUMÉ ACTUEL

**Infrastructure existante STABLE** :
- ✅ 3 sites en production
- ✅ 2 processus PM2 actifs
- ✅ 3 certificats SSL valides
- ✅ n8n fonctionnel

**Plan pour synap6ia** :
- 🆕 Nouveau site nginx : synap6ia.com
- 🆕 Nouveau processus PM2 : synap6ia
- 🆕 Nouveau certificat SSL : synap6ia.com
- 🆕 Nouvelle base PostgreSQL : synap6ia_prod
- 🆕 Nouveau répertoire : /var/www/synap6ia

**Garantie** : Aucun impact sur les sites existants ✅

---

## PROCHAINES COMMANDES À EXÉCUTER

Copier-coller ces commandes sur le VPS pour compléter l'audit :

```bash
# 1. Ports utilisés
echo "=== PORTS UTILISÉS ==="
sudo netstat -tlnp | grep node

# 2. PostgreSQL
echo "=== POSTGRESQL ==="
sudo systemctl status postgresql --no-pager
sudo -u postgres psql -c "\l"
sudo -u postgres psql -c "\du"

# 3. Firewall
echo "=== FIREWALL ==="
sudo ufw status

# 4. Espace disque
echo "=== ESPACE DISQUE ==="
df -h

# 5. Node.js
echo "=== NODE.JS ==="
node --version
npm --version

# 6. Répertoires /var/www
echo "=== RÉPERTOIRES ==="
ls -la /var/www/

# 7. Configuration nginx globale
echo "=== NGINX USER ==="
grep "^user" /etc/nginx/nginx.conf

# 8. Mémoire disponible
echo "=== MÉMOIRE ==="
free -h
```

Exécutez ces commandes et envoyez-moi les résultats pour que je complète l'inventaire.
