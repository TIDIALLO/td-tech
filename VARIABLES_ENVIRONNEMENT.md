# Variables d'Environnement pour Vercel

## 📋 Liste complète des variables à configurer dans Vercel

### 🔴 OBLIGATOIRES (Critiques)

#### 1. Base de données (Prisma)
```
DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require
```
**Description** : URL de connexion à votre base de données PostgreSQL  
**Exemple** : `postgresql://user:pass@db.example.com:5432/mydb?sslmode=require`  
**Où l'obtenir** : Depuis votre fournisseur de base de données (Vercel Postgres, Supabase, Neon, etc.)

---

#### 2. Authentification (NextAuth)
```
AUTH_SECRET=votre_secret_aleatoire_tres_long_et_securise
```
**Description** : Secret utilisé pour signer les tokens JWT et les cookies de session  
**Comment générer** : Exécutez `openssl rand -base64 32` dans votre terminal  
**Exemple** : `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6`

```
AUTH_URL=https://votre-domaine.vercel.app
```
**Description** : URL publique de votre application déployée  
**Exemple** : `https://td-tech.vercel.app` ou `https://votre-domaine.com`

---

### 🟡 EMAIL - Option 1 : Gmail SMTP (Recommandé)

#### 3. Configuration Gmail
```
USE_GMAIL_SMTP=true
```
**Description** : Active l'utilisation de Gmail SMTP pour l'envoi d'emails

```
GMAIL_USER=diallotidiane014@gmail.com
```
**Description** : Votre adresse email Gmail

```
GMAIL_APP_PASSWORD=votre_app_password_gmail
```
**Description** : App Password Gmail (PAS votre mot de passe Gmail normal)  
**Comment créer un App Password** :
1. Allez sur https://myaccount.google.com/security
2. Activez la validation en 2 étapes si ce n'est pas déjà fait
3. Allez dans "Mots de passe des applications"
4. Créez un nouveau mot de passe pour "Autre (nom personnalisé)" → "Vercel"
5. Copiez le mot de passe généré (16 caractères sans espaces)

---

### 🟡 EMAIL - Option 2 : Resend (Alternative)

#### 4. Configuration Resend
```
RESEND_API_KEY=re_votre_cle_api_resend
```
**Description** : Clé API Resend (si vous n'utilisez pas Gmail SMTP)  
**Où l'obtenir** : https://resend.com/api-keys

```
RESEND_FROM_EMAIL=noreply@votre-domaine.com
```
**Description** : Email d'envoi pour Resend (doit être un domaine vérifié)  
**Note** : Si non configuré, utilise `onboarding@resend.dev` (mode test, emails limités)

---

### 🟢 OPTIONNELLES (Avec valeurs par défaut)

#### 5. Environnement
```
NODE_ENV=production
```
**Description** : Environnement d'exécution (généralement défini automatiquement par Vercel)

---

## 📝 Instructions de configuration dans Vercel

1. **Allez dans votre projet Vercel**
   - Dashboard Vercel → Votre projet → Settings → Environment Variables

2. **Ajoutez chaque variable** :
   - Cliquez sur "Add New"
   - Entrez le nom de la variable (ex: `DATABASE_URL`)
   - Entrez la valeur
   - Sélectionnez les environnements : Production, Preview, Development
   - Cliquez sur "Save"

3. **Variables à configurer pour tous les environnements** :
   - `DATABASE_URL`
   - `AUTH_SECRET`
   - `AUTH_URL`
   - `USE_GMAIL_SMTP` (ou `RESEND_API_KEY`)
   - `GMAIL_USER` et `GMAIL_APP_PASSWORD` (si Gmail)
   - `RESEND_FROM_EMAIL` (si Resend)

---

## ✅ Checklist de configuration

- [ ] `DATABASE_URL` configuré avec votre base de données PostgreSQL
- [ ] `AUTH_SECRET` généré et configuré (32+ caractères aléatoires)
- [ ] `AUTH_URL` configuré avec l'URL de production
- [ ] **Option Gmail** :
  - [ ] `USE_GMAIL_SMTP=true`
  - [ ] `GMAIL_USER=diallotidiane014@gmail.com`
  - [ ] `GMAIL_APP_PASSWORD` créé et configuré
- [ ] **OU Option Resend** :
  - [ ] `RESEND_API_KEY` configuré
  - [ ] `RESEND_FROM_EMAIL` configuré (domaine vérifié)

---

## 🔍 Vérification

Après avoir configuré les variables :
1. Redéployez votre application sur Vercel
2. Vérifiez les logs de déploiement pour confirmer que tout fonctionne
3. Testez l'envoi d'email via le formulaire de contact ou de réservation

---

## ⚠️ Notes importantes

- **Gmail App Password** : Ne partagez JAMAIS votre App Password. C'est un secret sensible.
- **AUTH_SECRET** : Doit être unique et aléatoire. Ne réutilisez pas le même secret pour plusieurs projets.
- **DATABASE_URL** : Assurez-vous que votre base de données accepte les connexions depuis Vercel (whitelist IP si nécessaire).
- **Variables sensibles** : Toutes ces variables sont automatiquement chiffrées par Vercel.

---

## 🆘 En cas de problème

Si les emails ne sont pas envoyés :
1. Vérifiez les logs Vercel pour voir les erreurs
2. Vérifiez que `USE_GMAIL_SMTP=true` si vous utilisez Gmail
3. Vérifiez que l'App Password Gmail est correct
4. Vérifiez que `AUTH_SECRET` est bien configuré (requis pour NextAuth)

