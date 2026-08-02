# 🔐 Configuration Resend - Vérification de Domaine

## ❌ Problème Actuel

Les emails apparaissent dans le dashboard Resend mais **ne sont pas livrés** dans Gmail.

**Raison** : `onboarding@resend.dev` est une adresse de **test uniquement**. Elle ne livre pas réellement les emails.

---

## ✅ Solution : Vérifier un Domaine

Pour recevoir les emails dans Gmail, tu dois vérifier un domaine sur Resend.

### Option 1 : Vérifier un Domaine Personnalisé (Recommandé)

Si tu as un domaine (ex: `tidianediallo.com`, `td-tech.com`, etc.) :

#### Étape 1 : Ajouter le Domaine dans Resend

1. Va sur : https://resend.com/domains
2. Clique sur **"Add Domain"**
3. Entre ton domaine (ex: `tidianediallo.com`)
4. Clique sur **"Add"**

#### Étape 2 : Configurer les DNS

Resend va te donner des enregistrements DNS à ajouter :

**Exemple d'enregistrements à ajouter** :

```
Type: TXT
Name: @
Value: v=spf1 include:resend.com ~all

Type: TXT
Name: resend._domainkey
Value: [clé DKIM fournie par Resend]

Type: CNAME
Name: resend
Value: [valeur fournie par Resend]
```

**Où ajouter ces DNS** :
- Si ton domaine est chez **OVH** : https://www.ovh.com/manager/web/
- Si ton domaine est chez **Namecheap** : https://www.namecheap.com/
- Si ton domaine est chez **GoDaddy** : https://www.godaddy.com/
- Si ton domaine est chez **Cloudflare** : https://dash.cloudflare.com/

#### Étape 3 : Attendre la Vérification

- ⏱️ **Temps d'attente** : 5-30 minutes (parfois jusqu'à 24h)
- ✅ **Vérification** : Le statut passe à "Verified" dans Resend

#### Étape 4 : Mettre à Jour le Code

Une fois vérifié, mets à jour `.env` :

```env
RESEND_API_KEY="[RESEND_API_KEY_REVOQUE]"
RESEND_FROM_EMAIL="contact@tidianediallo.com"
# ou
RESEND_FROM_EMAIL="Tidiane Diallo <contact@tidianediallo.com>"
```

Et le code utilisera automatiquement cette adresse.

---

### Option 2 : Utiliser un Sous-Domaine (Alternative)

Si tu n'as pas de domaine principal, tu peux créer un sous-domaine :

1. Crée un sous-domaine : `mail.tidianediallo.com`
2. Suis les mêmes étapes que l'Option 1
3. Utilise : `contact@mail.tidianediallo.com`

---

### Option 3 : Utiliser un Service de Domaine Gratuit (Temporaire)

Pour tester rapidement, tu peux utiliser un service comme :

- **Mailgun** (offre gratuite)
- **SendGrid** (offre gratuite)
- **Amazon SES** (offre gratuite)

Mais Resend reste le plus simple à configurer.

---

## 🚀 Mise à Jour du Code

Le code a été mis à jour pour utiliser une variable d'environnement `RESEND_FROM_EMAIL`.

### Configuration

1. **Ajoute dans `.env`** :
```env
RESEND_FROM_EMAIL="contact@tidianediallo.com"
```

2. **Si pas de domaine vérifié**, le code utilise `onboarding@resend.dev` par défaut.

3. **Redémarre le serveur** :
```bash
npm run dev
```

---

## ✅ Test

Une fois le domaine vérifié :

1. **Envoie un message** depuis le formulaire
2. **Vérifie Gmail** : L'email devrait arriver dans quelques secondes
3. **Vérifie le dashboard Resend** : Statut devrait être "delivered"

---

## 📊 Statuts dans Resend

- ✅ **sent** - Email envoyé par Resend
- ✅ **delivered** - Livré au serveur du destinataire (Gmail)
- ✅ **opened** - Email ouvert par le destinataire
- ⚠️ **bounced** - Rejeté (vérifie les DNS)
- ⚠️ **complained** - Marqué comme spam

---

## 🐛 Dépannage

### Le domaine n'est pas vérifié après 24h

**Solutions** :
- Vérifie que les DNS sont correctement configurés
- Utilise un outil comme https://mxtoolbox.com/ pour vérifier les enregistrements
- Contacte le support Resend : support@resend.com

### Les emails arrivent en spam

**Solutions** :
- Configure DMARC (Resend te donnera les instructions)
- Utilise un nom d'expéditeur clair : `Tidiane Diallo <contact@tidianediallo.com>`
- Évite les mots déclencheurs de spam dans le sujet

### Erreur : "Domain not verified"

**Solution** :
- Vérifie que le domaine est bien "Verified" dans Resend
- Vérifie que `RESEND_FROM_EMAIL` correspond au domaine vérifié

---

## 📝 Résumé

**Pour recevoir les emails dans Gmail** :
1. ✅ Vérifie un domaine sur Resend
2. ✅ Configure les DNS
3. ✅ Attends la vérification
4. ✅ Ajoute `RESEND_FROM_EMAIL` dans `.env`
5. ✅ Redémarre le serveur

**En attendant** : Les emails sont visibles dans le dashboard Resend pour les tests.

