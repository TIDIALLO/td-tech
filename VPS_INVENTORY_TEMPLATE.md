# Inventaire VPS Hostinger - srv787787.hstgr.cloud

⚠️ **REMPLIR CE FICHIER AVANT TOUTE MODIFICATION**

Date de l'audit : _______________
Utilisateur connecté : _______________

---

## 1. Sites nginx Existants

Commande : `ls -la /etc/nginx/sites-enabled/`

```
Fichiers trouvés :
- [ ] _____________________________
- [ ] _____________________________
- [ ] _____________________________
- [ ] n8n (si présent)
```

---

## 2. Processus PM2

Commande : `pm2 list`

```
┌─────┬────────┬─────────┬──────┬─────┐
│ id  │ name   │ mode    │ port │ ↺   │
├─────┼────────┼─────────┼──────┼─────┤
│  0  │ ______ │ fork    │ ____ │ ___ │
│  1  │ ______ │ fork    │ ____ │ ___ │
│  2  │ ______ │ fork    │ ____ │ ___ │
│  3  │ n8n    │ fork    │ 5678 │ ___ │
└─────┴────────┴─────────┴──────┴─────┘
```

**Ports utilisés** :
- Port 3000 : _____________ (libre / utilisé par _______)
- Port 3001 : _____________ (libre / utilisé par _______)
- Port 5678 : n8n
- Autre : _____________

---

## 3. Certificats SSL

Commande : `sudo certbot certificates`

```
Certificats trouvés :
- [ ] _____________________ (expire le : _______)
- [ ] _____________________ (expire le : _______)
- [ ] _____________________ (expire le : _______)
- [ ] n8n.srv787787.hstgr.cloud (expire le : _______)
```

---

## 4. Bases de Données PostgreSQL

Commande : `sudo -u postgres psql -c "\l"`

```
Bases trouvées :
- [ ] postgres (système)
- [ ] template0 (système)
- [ ] template1 (système)
- [ ] _____________________ (application : _______)
- [ ] _____________________ (application : _______)
- [ ] synap6ia_prod (à créer)
```

Commande : `sudo -u postgres psql -c "\du"`

```
Utilisateurs trouvés :
- [ ] postgres (superuser)
- [ ] _____________________ (owner de : _______)
- [ ] _____________________ (owner de : _______)
- [ ] synap6ia_user (à créer)
```

---

## 5. Ports Ouverts (Firewall)

Commande : `sudo ufw status`

```
Status: _____________

     To                         Action      From
     --                         ------      ----
[ ]  22/tcp                     ALLOW       Anywhere
[ ]  80/tcp                     ALLOW       Anywhere
[ ]  443/tcp                    ALLOW       Anywhere
[ ]  5432/tcp                   ALLOW       Anywhere (PostgreSQL)
[ ]  5678/tcp                   ALLOW       Anywhere (n8n)
[ ]  _______                    ALLOW       Anywhere
```

---

## 6. Services Actifs

Commande : `sudo systemctl list-units --type=service --state=running`

```
Services critiques :
- [ ] nginx.service          - ACTIVE
- [ ] postgresql.service     - ACTIVE (version : _____)
- [ ] ssh.service            - ACTIVE
- [ ] ufw.service            - ACTIVE
- [ ] _____________________  - ACTIVE
```

---

## 7. Espace Disque

Commande : `df -h`

```
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1       ____  ____  ____ ___% /
```

**Espace disponible** : _________ GB

---

## 8. Version Node.js et npm

Commandes :
```bash
node --version
npm --version
```

```
Node.js : v_______
npm     : _______
```

---

## 9. Répertoires /var/www

Commande : `ls -la /var/www/`

```
Répertoires trouvés :
- [ ] html (défaut nginx)
- [ ] _____________________
- [ ] _____________________
- [ ] synap6ia (à créer)
```

---

## 10. Configuration n8n

```
URL : https://n8n.srv787787.hstgr.cloud
Port : 5678
Status : _______ (actif / inactif)

Webhooks configurés :
- [ ] /webhook-test/contact-form (synap6ia)
- [ ] ___________________________
- [ ] ___________________________
```

---

## 11. Autres Domaines sur ce VPS

```
Domaines hébergés :
- [ ] _____________________ → /var/www/_____
- [ ] _____________________ → /var/www/_____
- [ ] n8n.srv787787.hstgr.cloud → (service n8n)
- [ ] synap6ia.com (à configurer)
```

---

## 12. Backup Existants

Commande : `find /home -name "*.backup" -o -name "*.sql" 2>/dev/null | head -20`

```
Backups trouvés :
- [ ] _____________________________
- [ ] _____________________________
- [ ] _____________________________
```

**Emplacement backups** : _______________________

---

## 13. Cron Jobs

Commande : `crontab -l`

```
Cron jobs configurés :
- [ ] _____________________________
- [ ] _____________________________
- [ ] Certbot renew (automatique)
```

---

## 14. Variables d'Environnement Sensibles

⚠️ **NE PAS noter les valeurs ici, seulement vérifier qu'elles existent**

```
PostgreSQL :
- [ ] Mot de passe root postgres : ✅ connu / ❌ à retrouver
- [ ] Mot de passe utilisateurs DB : ✅ connu / ❌ à retrouver

n8n :
- [ ] Credentials admin : ✅ connu / ❌ à retrouver
- [ ] URL webhook : ✅ testé / ❌ à tester

Autres :
- [ ] ___________________________
```

---

## 15. Logs Récents

Commandes :
```bash
sudo tail -n 20 /var/log/nginx/error.log
pm2 logs --lines 20
sudo journalctl -u postgresql -n 20
```

**Erreurs critiques trouvées** : OUI / NON

Si OUI, détails :
```
_____________________________
_____________________________
```

---

## 16. Utilisateurs Système

Commande : `cat /etc/passwd | grep -v nologin | grep -v false`

```
Utilisateurs avec shell :
- [ ] root
- [ ] _____________________
- [ ] _____________________
```

**Utilisateur principal pour déploiement** : _______________________

---

## 17. Clés SSH Configurées

Commande : `ls -la ~/.ssh/`

```
Clés trouvées :
- [ ] authorized_keys (nombre de clés : ____)
- [ ] id_rsa / id_ed25519 (clé privée présente)
- [ ] _____________________
```

---

## 18. Configuration nginx Globale

Fichier : `/etc/nginx/nginx.conf`

**User** : _______________________
**Worker processes** : _______________________
**Client_max_body_size** : _______________________ (important pour uploads)

---

## NOTES IMPORTANTES

```
Date des dernières mises à jour système : _____________________

Problèmes connus :
- _____________________________
- _____________________________

Configurations spéciales :
- _____________________________
- _____________________________

Contacts :
- Hébergeur : Hostinger
- Support : _____________________
```

---

## Checklist Sécurité Avant Modifications

- [ ] Backup nginx complet fait
- [ ] Backup PM2 dump fait
- [ ] Backup PostgreSQL fait (si données importantes)
- [ ] Liste des ports ouverts notée
- [ ] Liste des sites existants notée
- [ ] Tous les credentials en sécurité
- [ ] Plan de rollback préparé

**Validation** : _____________________ (signature / date)

---

**GARDER CE FICHIER À JOUR après chaque modification majeure**
