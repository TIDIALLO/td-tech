# 🔗 Comment Obtenir les Liens de Ton Site Vercel

## 📍 Méthode 1 : Depuis le Dashboard Vercel (Le plus simple)

### Étape 1 : Accéder au Dashboard
1. **Va sur** : [vercel.com/dashboard](https://vercel.com/dashboard)
2. **Connecte-toi** avec ton compte GitHub
3. **Sélectionne ton projet** `td-tech` (ou le nom de ton projet)

### Étape 2 : Trouver les Liens
Sur la page principale de ton projet, tu verras :

**🔗 Production URL** :
- Format : `https://td-tech-xxxxx.vercel.app`
- C'est le lien principal de ton site
- Mis à jour à chaque push sur `main`

**🔗 Preview URLs** :
- Format : `https://td-tech-git-xxxxx.vercel.app`
- Créées automatiquement pour chaque Pull Request ou branche
- Temporaires (supprimées après merge)

### Étape 3 : Copier le Lien
- **Clique sur le lien** pour l'ouvrir
- **Ou copie-le** pour le partager avec ton mentor

---

## 📍 Méthode 2 : Via Vercel CLI

Si tu as Vercel CLI installé :

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Lier le projet
vercel link

# Voir les informations du projet (inclut les URLs)
vercel inspect
```

---

## 📍 Méthode 3 : Depuis les Logs de Déploiement

1. **Va sur** : [vercel.com/dashboard](https://vercel.com/dashboard)
2. **Sélectionne ton projet**
3. **Clique sur "Deployments"** (ou un déploiement spécifique)
4. **Dans les logs**, tu verras l'URL à la fin :
   ```
   ✅ Production: https://td-tech-xxxxx.vercel.app
   ```

---

## 🔍 Si le Projet n'est Pas Encore Déployé

### Créer le Projet sur Vercel

1. **Va sur** : [vercel.com/new](https://vercel.com/new)
2. **Importe ton repository** `td-tech` depuis GitHub
3. **Configure les variables d'environnement** (voir `env.vercel.txt`)
4. **Clique sur "Deploy"**
5. **Attends 2-5 minutes**
6. **L'URL sera affichée** une fois le déploiement terminé

---

## ✅ Checklist pour Obtenir les Liens

- [ ] Compte Vercel créé et connecté avec GitHub
- [ ] Projet importé depuis GitHub
- [ ] Variables d'environnement configurées
- [ ] Déploiement réussi
- [ ] URL de production visible dans le dashboard

---

## 📝 Format des URLs Vercel

**Production** :
```
https://[nom-projet]-[hash].vercel.app
https://td-tech-abc123xyz.vercel.app
```

**Preview** :
```
https://[nom-projet]-git-[branche]-[hash].vercel.app
https://td-tech-git-feature-abc123xyz.vercel.app
```

**Domaine personnalisé** (si configuré) :
```
https://tidianediallo.com
```

---

## 🎯 Une Fois que Tu as le Lien

1. **Teste le site** en ouvrant l'URL
2. **Vérifie que tout fonctionne** (page d'accueil, navigation, etc.)
3. **Partage le lien avec ton mentor** 🎉

---

**💡 Astuce** : Vercel génère automatiquement un lien pour chaque déploiement. Tu peux toujours retrouver les anciens déploiements dans l'onglet "Deployments".

