# 📧 Configuration Gmail SMTP - Solution Sans Domaine

## ✅ Solution Simple : Utiliser Gmail Directement

Tu n'as pas besoin de domaine ! Tu peux utiliser Gmail directement avec Nodemailer.

**Avantages** :
- ✅ Fonctionne immédiatement
- ✅ Pas besoin de domaine
- ✅ Emails livrés directement dans Gmail
- ✅ Gratuit (500 emails/jour)
- ✅ Déjà installé dans le projet (`nodemailer`)

---

## 🔧 Configuration en 3 Étapes

### Étape 1 : Créer un "App Password" Gmail

1. **Va sur** : https://myaccount.google.com/
2. **Sécurité** → **Validation en 2 étapes** (active-la si pas déjà fait)
3. **Sécurité** → **Mots de passe des applications**
4. **Sélectionne** : "Autre (nom personnalisé)"
5. **Nom** : "Portfolio Contact Form"
6. **Génère** le mot de passe
7. **Copie** le mot de passe (16 caractères, ex: `abcd efgh ijkl mnop`)

⚠️ **Important** : C'est un mot de passe spécial, pas ton mot de passe Gmail normal !

---

### Étape 2 : Ajouter dans `.env`

Ajoute ces variables dans ton fichier `.env` :

```env
# Gmail SMTP (pour envoyer sans domaine)
GMAIL_USER="diallotidiane014@gmail.com"
GMAIL_APP_PASSWORD="abcd efgh ijkl mnop"  # Le mot de passe généré à l'étape 1

# Optionnel : Utiliser Gmail au lieu de Resend
USE_GMAIL_SMTP="true"
```

**Note** : Enlève les espaces du mot de passe si nécessaire.

---

### Étape 3 : Redémarrer le Serveur

```bash
npm run dev
```

---

## 🎯 Comment ça Fonctionne

Le code va maintenant :
1. **Vérifier** si `USE_GMAIL_SMTP="true"` dans `.env`
2. **Si oui** : Utiliser Gmail SMTP (emails livrés dans Gmail)
3. **Si non** : Utiliser Resend (comme avant)

---

## ✅ Test

1. **Envoie un message** depuis le formulaire
2. **Vérifie Gmail** : L'email devrait arriver dans quelques secondes
3. **Vérifie aussi** : `tidiallo06@gmail.com` (copie automatique)

---

## 🔄 Basculer Entre Gmail et Resend

**Pour utiliser Gmail** :
```env
USE_GMAIL_SMTP="true"
```

**Pour utiliser Resend** :
```env
USE_GMAIL_SMTP="false"
# ou supprime la ligne
```

---

## ⚠️ Limitations Gmail

- **500 emails/jour** maximum (gratuit)
- **100 destinataires** par email maximum
- **25 MB** par email maximum

**Pour plus** : Utilise un compte Gmail Workspace (payant) ou un service comme Resend avec domaine.

---

## 🐛 Dépannage

### Erreur : "Invalid login"

**Solution** :
- Vérifie que tu utilises un **App Password**, pas ton mot de passe Gmail normal
- Vérifie que la validation en 2 étapes est activée
- Génère un nouveau App Password

### Erreur : "Less secure app access"

**Solution** :
- Les App Passwords remplacent "Less secure app access"
- Assure-toi d'utiliser un App Password, pas le mot de passe normal

### Email non reçu

**Solutions** :
- Vérifie le dossier spam
- Vérifie les logs du serveur
- Vérifie que `GMAIL_APP_PASSWORD` est correct dans `.env`

---

## 📝 Résumé

**Pour recevoir les emails dans Gmail sans domaine** :
1. ✅ Crée un App Password Gmail
2. ✅ Ajoute `GMAIL_USER` et `GMAIL_APP_PASSWORD` dans `.env`
3. ✅ Ajoute `USE_GMAIL_SMTP="true"` dans `.env`
4. ✅ Redémarre le serveur
5. ✅ Teste !

**C'est tout !** 🚀

