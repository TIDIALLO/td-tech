# Configuration n8n - Agent IA WhatsApp TDTech

## Prérequis

1. **Instance n8n** (cloud.n8n.io ou self-hosted)
2. **Compte Twilio** avec WhatsApp Sandbox ou Business
3. **Site TDTech déployé** avec les API analytics

---

## Étape 1: Variables d'Environnement n8n

Dans n8n, allez dans **Settings → Variables** et ajoutez :

| Variable | Valeur | Description |
|----------|--------|-------------|
| `TDTECH_API_URL` | `https://votre-site.com` | URL de ton site (sans / à la fin) |
| `TWILIO_WHATSAPP_NUMBER` | `whatsapp:+14155238886` | Numéro WhatsApp Twilio |
| `ADMIN_WHATSAPP_NUMBER` | `whatsapp:+33612345678` | Ton numéro pour les rapports |

---

## Étape 2: Credentials n8n

### 2.1 TDTech API Key

1. Allez dans **Credentials → Add Credential**
2. Cherchez **Header Auth**
3. Configurez :
   - **Name**: `TDTech API Key`
   - **Header Name**: `x-api-key`
   - **Header Value**: `votre-cle-api-secrete` (même valeur que `N8N_API_KEY` dans .env du site)

### 2.2 Twilio (pour WhatsApp)

1. Allez dans **Credentials → Add Credential**
2. Cherchez **Twilio API**
3. Configurez :
   - **Account SID**: Trouvé dans Twilio Console
   - **Auth Token**: Trouvé dans Twilio Console

---

## Étape 3: Configurer Twilio WhatsApp

### Option A: WhatsApp Sandbox (Gratuit pour tester)

1. Connectez-vous à [Twilio Console](https://console.twilio.com)
2. Allez dans **Messaging → Try it out → Send a WhatsApp message**
3. Suivez les instructions pour activer le sandbox
4. Notez le numéro sandbox: `+14155238886`

### Option B: WhatsApp Business (Production)

1. Demandez l'accès WhatsApp Business dans Twilio
2. Configurez votre numéro de téléphone
3. Attendez l'approbation de Meta

---

## Étape 4: Configurer le Webhook Twilio

1. Dans Twilio Console, allez dans **Messaging → Settings → WhatsApp Sandbox Settings**
2. Dans **When a message comes in**, entrez l'URL de votre webhook n8n :
   ```
   https://votre-instance-n8n.com/webhook/twilio-whatsapp
   ```
3. Méthode: **POST**

---

## Étape 5: Importer les Workflows

### Workflow 1: Agent WhatsApp Interactif

1. Dans n8n, cliquez sur **Add Workflow**
2. Cliquez sur les 3 points → **Import from File**
3. Sélectionnez `agent-whatsapp-twilio.json`
4. Activez le workflow (toggle en haut à droite)

### Workflow 2: Rapport Quotidien

1. Importez `daily-report-whatsapp.json`
2. Modifiez l'heure du rapport si nécessaire
3. Activez le workflow

---

## Étape 6: Tester

### Test du Webhook

1. Envoyez un message WhatsApp au numéro Twilio
2. Exemples de messages à tester :
   - `Stats aujourd'hui`
   - `Combien de visiteurs ?`
   - `Top pages`
   - `Aide`

### Test de l'API directement

```bash
curl -X POST https://votre-site.com/api/n8n/whatsapp \
  -H "Content-Type: application/json" \
  -H "x-api-key: votre-cle-api" \
  -d '{"message": "Stats aujourd hui", "from": "+33612345678"}'
```

---

## Architecture du Système

```
┌──────────────────┐
│   WhatsApp       │
│   (Utilisateur)  │
└────────┬─────────┘
         │ Message
         ▼
┌──────────────────┐
│   Twilio         │
│   WhatsApp API   │
└────────┬─────────┘
         │ Webhook POST
         ▼
┌──────────────────┐
│   n8n            │
│   Workflow       │
└────────┬─────────┘
         │ HTTP Request
         ▼
┌──────────────────┐
│   TDTech API     │
│   /api/n8n/      │
│   whatsapp       │
└────────┬─────────┘
         │ Query
         ▼
┌──────────────────┐
│   PostgreSQL     │
│   Analytics DB   │
└────────┬─────────┘
         │ Data
         ▼
┌──────────────────┐
│   Agent IA       │
│   (Analyse +     │
│   Génération)    │
└────────┬─────────┘
         │ Réponse
         ▼
┌──────────────────┐
│   Twilio         │
│   Send Message   │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│   WhatsApp       │
│   (Réponse)      │
└──────────────────┘
```

---

## Commandes Disponibles

| Commande | Description | Exemple de réponse |
|----------|-------------|-------------------|
| `stats` / `stats aujourd'hui` | Résumé du jour | 👥 150 visiteurs, 📄 420 pages |
| `stats hier` | Résumé d'hier | Idem pour hier |
| `stats semaine` | 7 derniers jours | Stats cumulées |
| `top pages` | Pages populaires | 1. /portfolio (50 vues) |
| `conversions` | Dernières conversions | 🎯 5 conversions |
| `appareils` | Mobile vs Desktop | 📱 60% mobile |
| `sources` | Origine du trafic | Google, Direct, etc. |
| `aide` | Liste des commandes | Menu d'aide |

---

## Dépannage

### "Unauthorized" (401)

- Vérifiez que `N8N_API_KEY` est défini dans le `.env` du site
- Vérifiez que le credential "TDTech API Key" a la même valeur

### Pas de réponse WhatsApp

- Vérifiez que le workflow est actif (toggle vert)
- Vérifiez les exécutions dans n8n (onglet Executions)
- Vérifiez que le webhook Twilio pointe vers la bonne URL

### Stats vides

- Vérifiez que des visiteurs ont visité le site
- Lancez la migration Prisma : `npx prisma migrate dev`
- Vérifiez les logs de l'API dans Vercel/serveur

---

## Sécurité

1. **Toujours utiliser HTTPS** pour les webhooks
2. **Définir une API key forte** (32+ caractères)
3. **Limiter les IPs** si possible (Cloudflare, Vercel)
4. **Surveiller les logs** n8n pour détecter les abus

---

## Support

- Documentation n8n: https://docs.n8n.io
- Documentation Twilio WhatsApp: https://www.twilio.com/docs/whatsapp
- Contact: diallotidiane014@gmail.com
