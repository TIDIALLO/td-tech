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
RESEND_API_KEY="re_Y6gWENxV_EoSQ3ErTiGAbhe5htT7TT2YG"

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
ADMIN_PASSWORD="Admin123!"
```

## Variables Importantes

### RESEND_API_KEY (Requis pour les emails)
- **Valeur** : `re_Y6gWENxV_EoSQ3ErTiGAbhe5htT7TT2YG`
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

