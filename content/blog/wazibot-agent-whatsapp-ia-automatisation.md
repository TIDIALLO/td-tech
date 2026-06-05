---
title: "J'ai créé un agent IA WhatsApp qui répond automatiquement à vos clients 24h/24"
excerpt: "Comment j'ai buildé WaziBot, un agent WhatsApp dopé à l'IA qui gère les questions clients, prend les rendez-vous et répond en secondes — même à 2h du matin. Démo gratuite incluse."
date: "2026-06-04"
author: "Tidiane Diallo"
tags: ["WhatsApp", "IA", "Automatisation", "Claude AI", "Next.js", "Supabase"]
image: "/blog/wazibot-whatsapp-ia.jpg"
---

# J'ai créé un agent IA WhatsApp qui répond automatiquement à vos clients 24h/24

Il y a quelques semaines, un ami gérant d'un cabinet dentaire à Dakar m'a dit une chose qui m'a frappé :

> "Je perds au moins 3 patients par semaine parce que je ne peux pas répondre aux messages WhatsApp quand je suis en consultation."

WhatsApp Business reçoit des dizaines de messages chaque jour. Des questions simples : "C'est quoi vos horaires ?", "Combien coûte un détartrage ?", "J'ai une urgence, vous pouvez m'aider ?"

Ces questions méritent une réponse immédiate. Mais personne n'est disponible 24h/24.

**J'ai décidé de construire WaziBot.**

## Qu'est-ce que WaziBot ?

WaziBot est un agent IA connecté à WhatsApp Business. Il reçoit les messages de vos clients, comprend leurs demandes grâce à Claude (l'IA d'Anthropic), et répond instantanément — en moins de 2 secondes.

- Un client écrit "je voudrais un rendez-vous" → Sophie (l'assistante IA) répond, guide vers un créneau
- Un client demande les tarifs → Sophie donne les prix exacts
- Un client signale une douleur urgente → Sophie redirige vers le numéro d'urgence immédiatement

Et tout ça dans votre tableau de bord en temps réel.

**Tester la démo gratuite :**
- Envoyer "Bonjour" sur WhatsApp : [wa.me/221777330182](https://wa.me/221777330182?text=Bonjour%2C+je+veux+tester+l%27agent+IA)
- Dashboard : [https://whatsapp-dental-agent-production-4c84.up.railway.app](https://whatsapp-dental-agent-production-4c84.up.railway.app)
- Mot de passe : `Test@123#`

## La stack technique

J'aurais pu construire ça en quelques jours avec des outils no-code. Mais je voulais quelque chose de robuste, scalable et entièrement sous contrôle. Voici ce que j'ai utilisé :

### Frontend + Backend : Next.js 16
Next.js gère à la fois le dashboard React et toutes les API routes en TypeScript. Une seule codebase, déployée sur Railway en quelques minutes.

### Base de données : Supabase (PostgreSQL)
Toutes les conversations sont stockées en temps réel dans Supabase. Le dashboard se met à jour instantanément grâce aux subscriptions Realtime de Supabase — sans polling, sans latence.

### Intelligence artificielle : Claude (Anthropic) + OpenRouter
L'IA principale est **Claude Haiku** d'Anthropic — rapide, précis, excellent en français. En cas d'indisponibilité, OpenRouter prend le relai avec des modèles de fallback (meta-llama, gpt-oss).

```typescript
// Chaîne de fallback IA
async function getAIResponse(messages) {
  // 1. Claude Haiku (Anthropic) - prioritaire
  const claudeResponse = await tryAnthropic(messages);
  if (claudeResponse) return claudeResponse;

  // 2. OpenRouter free models en fallback
  for (const model of OPENROUTER_FALLBACK_MODELS) {
    const response = await tryOpenRouterModel(model, messages);
    if (response) return response;
  }
  
  return FALLBACK_MESSAGE;
}
```

### WhatsApp : Meta Cloud API
L'API officielle Meta WhatsApp Business. Zéro risque de ban, SLA garantie, webhooks en temps réel.

### Déploiement : Railway
Build automatique depuis GitHub, variables d'environnement gérées, redémarrage automatique en cas d'erreur.

## Le système de prompt — comment Sophie est "intelligente"

La vraie valeur d'un agent IA ne vient pas du modèle. Elle vient du **prompt système**.

Voici comment j'ai construit Sophie pour qu'elle réponde à n'importe quelle question client d'un cabinet dentaire :

```
Tu es Sophie, l'assistante virtuelle du Cabinet Dentaire Dakar.

RÈGLES ABSOLUES :
- Texte simple SANS markdown
- Messages courts, directs, naturels — comme un vrai SMS
- UNE seule question à la fois
- Jamais de diagnostic médical

TARIFS :
- Détartrage : 15 000 - 25 000 FCFA
- Implant dentaire : 250 000 - 400 000 FCFA
- Blanchiment : 60 000 - 120 000 FCFA
...

URGENCES :
Si douleur intense → "Appelez le +221 77 733 01 82 immédiatement"
```

Le résultat ? Des réponses comme ça :

> **Client** : Combien coûte un détartrage ?
> **Sophie** : Un détartrage coûte entre 15 000 et 25 000 FCFA selon l'état de vos dents. Souhaitez-vous prendre rendez-vous ?

> **Client** : J'ai une douleur intense depuis hier soir
> **Sophie** : Appelez le +221 77 733 01 82 immédiatement.

> **Client** : Vous acceptez Orange Money ?
> **Sophie** : Oui, nous acceptons Orange Money, Wave et les espèces.

## Le dashboard — reprendre la main à tout moment

L'un des modules que je préfère dans WaziBot, c'est le **mode humain/IA**.

D'un clic, tu bascules la conversation en mode "Vous" : l'IA s'arrête et tu réponds toi-même depuis le dashboard, comme un vrai agent de support. Puis tu rebascules en mode "IA" quand tu as fini.

```
┌─────────────────────────────────────┐
│  Conversations         [AI Mode ●]  │
├────────────────┬────────────────────┤
│ Mamadou D.  AI │  Bonjour ! Je suis │
│ Fatou S.    AI │  Sophie...         │
│ Ibrahim K.  ●  │                    │
└────────────────┴────────────────────┘
```

## Architecture du webhook — pourquoi c'est rapide

Meta impose que votre webhook réponde en moins de 20 secondes. Si vous appelez l'IA de façon synchrone, vous risquez un timeout.

Ma solution : **fire-and-forget avec traitement en arrière-plan**.

```typescript
export async function POST(request: NextRequest) {
  // 1. Valider le payload Meta (< 1ms)
  const message = parseMetaWebhook(await request.text());
  
  // 2. Lancer le traitement en arrière-plan
  processMessage(message).catch(console.error);
  
  // 3. Répondre immédiatement à Meta (< 10ms)
  return Response.json({ status: "ok" });
}
```

Meta reçoit sa réponse en millisecondes. L'IA tourne en parallèle et envoie la réponse au client dès qu'elle est prête.

## Les résultats

Depuis le déploiement sur le numéro de test :

- Temps de réponse moyen : **1.8 secondes**
- Disponibilité : **24h/24, 7j/7**
- Taux de réponse aux questions courantes : **95%** sans intervention humaine
- Questions les plus fréquentes gérées : horaires, tarifs, rendez-vous, urgences, paiements

## Ce que j'aurais fait différemment

### 1. Commencer avec un vrai numéro Meta dès le début
Le numéro sandbox Meta (+1 555-...) a des restrictions sur les webhooks entrants. Pour une démo complète, il faut un vrai numéro WhatsApp Business vérifié.

### 2. Prompt engineering dès le départ
J'ai mis du temps à réaliser que 80% de la qualité des réponses vient du prompt, pas du modèle. Commencer par un prompt exhaustif (horaires, tarifs, cas d'usage) avant de toucher au code.

### 3. Architecture multi-tenant dès le départ
WaziBot est actuellement mono-tenant (un cabinet = une instance). La prochaine version sera multi-tenant : plusieurs cabinets, un seul backend.

## Comment adapter WaziBot à votre business

WaziBot n'est pas réservé aux cabinets dentaires. La même architecture fonctionne pour :

- **Hôtels & lodges** : réservations, disponibilités, tarifs
- **Salons de beauté** : agenda, services, prix
- **Restaurants** : réservations, menu, horaires
- **E-commerce** : suivi commandes, retours, SAV
- **Cliniques médicales** : RDV, spécialités, tarifs

Il suffit de modifier le prompt système. En 30 minutes, Sophie devient un assistant pour n'importe quel type de business.

## Tester WaziBot maintenant

**Démo en direct :**
Envoyez "Bonjour" ou n'importe quelle question au numéro WhatsApp de démo :

👉 [Tester sur WhatsApp](https://wa.me/221777330182?text=Bonjour%2C+je+veux+tester+l%27agent+IA)

**Dashboard admin :**
- URL : [whatsapp-dental-agent-production-4c84.up.railway.app](https://whatsapp-dental-agent-production-4c84.up.railway.app)
- Mot de passe : `Test@123#`

**Code source :**
Le code est open-source sur GitHub. Fork et déploie en moins de 30 minutes.

👉 [Voir le code sur GitHub](https://github.com/tddiallo/whatsapp-ai-agent)

## Vous voulez WaziBot pour votre business ?

Je déploie WaziBot pour les entreprises sénégalaises et africaines qui veulent arrêter de perdre des clients à cause des messages sans réponse.

**Plans disponibles :**
- Starter : 25 000 FCFA/mois (1 numéro, 500 messages)
- Pro : 60 000 FCFA/mois (3 numéros, illimité)
- Enterprise : sur devis

Contactez-moi directement sur WhatsApp pour une démo personnalisée :

👉 [+221 77 733 01 82](https://wa.me/221777330182?text=Bonjour%2C+je+veux+une+d%C3%A9mo+WaziBot+pour+mon+business)

---

*Tidiane Diallo est développeur fullstack et fondateur de Synap6ia, spécialisé dans l'automatisation et l'IA pour les PME africaines.*
