# 🔐 Variables d'Environnement

## Configuration Requise

Crée un fichier `.env` à la racine du projet avec les variables suivantes :

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/portfolio_db?schema=public"

# Auth.js - Générez une clé secrète avec: openssl rand -base64 32
AUTH_SECRET="votre-secret-key-ici"
AUTH_URL="http://localhost:3000"

# Resend - API Key pour l'envoi d'emails
RESEND_API_KEY="[RESEND_API_KEY_REVOQUE]"

# Resend - Adresse email d'expéditeur (optionnel)
# Si non défini, utilise 'onboarding@resend.dev' (mode test, emails non livrés)
# Pour recevoir les emails dans Gmail, vérifie un domaine sur Resend et utilise:
# RESEND_FROM_EMAIL="contact@tidianediallo.com"
# ou
# RESEND_FROM_EMAIL="Tidiane Diallo <contact@tidianediallo.com>"
# Voir RESEND-DOMAIN-SETUP.md pour les instructions complètes
RESEND_FROM_EMAIL="onboarding@resend.dev"

# Gmail SMTP - Solution sans domaine (optionnel)
# Pour utiliser Gmail directement au lieu de Resend (pas besoin de domaine)
# 1. Crée un App Password Gmail : https://myaccount.google.com/apppasswords
# 2. Active la validation en 2 étapes si pas déjà fait
# 3. Ajoute les variables ci-dessous
# Voir GMAIL-SMTP-SETUP.md pour les instructions complètes
USE_GMAIL_SMTP="false"
GMAIL_USER="diallotidiane014@gmail.com"
GMAIL_APP_PASSWORD=""  # App Password Gmail (16 caractères, pas le mot de passe normal)

# Uploadthing (optionnel)
UPLOADTHING_TOKEN="votre-token-uploadthing"

# Email (optionnel - pour Nodemailer si utilisé ailleurs)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="votre-email@gmail.com"
EMAIL_SERVER_PASSWORD="votre-mot-de-passe-app"
EMAIL_FROM="noreply@votredomaine.com"

# Admin credentials (pour le seed)
ADMIN_EMAIL="admin@tidianediallo.com"
ADMIN_PASSWORD="[MOT_DE_PASSE_ADMIN_REVOQUE]"
```

## Variables Importantes

### RESEND_API_KEY (Requis pour les emails)
- **Valeur** : `[RESEND_API_KEY_REVOQUE]`
- **Usage** : Envoi d'emails via Resend
- **Où l'obtenir** : https://resend.com/api-keys

### DATABASE_URL (Requis)
- **Format** : `postgresql://user:password@host:port/database?schema=public`
- **Usage** : Connexion à PostgreSQL

### AUTH_SECRET (Requis)
- **Génération** : `openssl rand -base64 32`
- **Usage** : Sécurité Auth.js

---

**⚠️ Important** : Ne jamais commiter le fichier `.env` ! Il est déjà dans `.gitignore`.

