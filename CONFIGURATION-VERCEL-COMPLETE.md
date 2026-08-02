# 🔧 Configuration Complète Vercel - Variables d'Environnement

## 📋 Variables à Configurer

Voici toutes les variables d'environnement à ajouter dans Vercel :

### Variables OBLIGATOIRES :

#### 1. DATABASE_URL
```
postgresql://[REVOQUE-VOIR-.env-LOCAL]
```

#### 2. AUTH_SECRET
**Génère une clé secrète** :
- En ligne : https://generate-secret.vercel.app/32
- Ou utilise la clé générée ci-dessous

#### 3. AUTH_URL
```
https://td-tech.vercel.app
```
**Note** : Mettre à jour après le déploiement avec l'URL réelle de Vercel

### Variables OPTIONNELLES :

#### 4. RESEND_API_KEY
```
[RESEND_API_KEY_REVOQUE]
```

#### 5. RESEND_FROM_EMAIL
```
onboarding@resend.dev
```

#### 6. ADMIN_EMAIL
```
admin@tidianediallo.com
```

#### 7. ADMIN_PASSWORD
```
[MOT_DE_PASSE_ADMIN_REVOQUE]
```

---

## 🚀 Comment Configurer dans Vercel

### Méthode 1 : Interface Web (Recommandé)

1. **Va sur** : [vercel.com/dashboard](https://vercel.com/dashboard)
2. **Sélectionne ton projet** `td-tech` (ou crée-le si nécessaire)
3. **Va dans** : **Settings** → **Environment Variables**
4. **Pour chaque variable** :
   - Clique sur **"Add New"**
   - **Key** : Nom de la variable (ex: `DATABASE_URL`)
   - **Value** : Colle la valeur
   - **Environments** : Coche ✅ **Production**
   - Clique sur **"Save"**

### Méthode 2 : Vercel CLI

```bash
# 1. Se connecter
vercel login

# 2. Lier le projet
vercel link

# 3. Ajouter chaque variable
vercel env add DATABASE_URL production
# Colle la valeur quand demandé

vercel env add AUTH_SECRET production
# Colle la clé générée

vercel env add AUTH_URL production
# Colle: https://td-tech.vercel.app

vercel env add RESEND_API_KEY production
vercel env add RESEND_FROM_EMAIL production
vercel env add ADMIN_EMAIL production
vercel env add ADMIN_PASSWORD production
```

---

## ✅ Vérification du Statut du Déploiement

### Depuis le Dashboard Vercel

1. **Va sur** : [vercel.com/dashboard](https://vercel.com/dashboard)
2. **Sélectionne ton projet**
3. **Onglet "Deployments"** :
   - ✅ **Ready** = Déploiement réussi
   - ⏳ **Building** = En cours
   - ❌ **Error** = Erreur (voir les logs)

### Depuis Vercel CLI

```bash
# Voir les déploiements
vercel ls

# Voir les détails d'un déploiement
vercel inspect

# Voir les logs
vercel logs
```

---

## 🔗 Obtenir les Liens

Une fois le déploiement réussi :

1. **Dans le dashboard Vercel**, sur la page principale du projet
2. **Tu verras** : **Production URL**
   - Format : `https://td-tech-xxxxx.vercel.app`
3. **Clique sur le lien** pour ouvrir ton site

---

## 🎯 Prochaines Étapes

1. ✅ Configurer les variables d'environnement
2. ✅ Déployer (ou redéployer si déjà déployé)
3. ✅ Vérifier le statut
4. ✅ Obtenir le lien de production
5. ✅ Partager avec ton mentor 🎉

---

## 🐛 Si le Déploiement Échoue

1. **Vérifie les logs** dans Vercel Dashboard
2. **Vérifie que toutes les variables sont configurées**
3. **Vérifie que `DATABASE_URL` est correcte**
4. **Vérifie que `AUTH_SECRET` est généré**

---

**Une fois configuré, le déploiement devrait réussir !** 🚀

