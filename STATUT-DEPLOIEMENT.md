# 📊 Vérifier le Statut du Déploiement Vercel

## 🔍 Méthode 1 : Dashboard Vercel (Le plus simple)

### Étape 1 : Accéder au Dashboard
1. **Va sur** : [vercel.com/dashboard](https://vercel.com/dashboard)
2. **Connecte-toi** avec GitHub
3. **Cherche ton projet** `td-tech` (ou le nom de ton projet)

### Étape 2 : Vérifier le Statut
Sur la page principale de ton projet :

**Statuts possibles** :
- ✅ **Ready** = Déploiement réussi
- ⏳ **Building** = En cours de build
- ❌ **Error** = Erreur (clique pour voir les logs)
- 🔄 **Queued** = En attente

### Étape 3 : Voir les Détails
1. **Clique sur un déploiement** pour voir les détails
2. **Onglet "Logs"** : Voir les logs de build
3. **Onglet "Functions"** : Voir les fonctions serverless
4. **Onglet "Analytics"** : Voir les statistiques

---

## 🔍 Méthode 2 : Vercel CLI

### Voir tous les projets
```bash
vercel ls
```

### Voir les déploiements d'un projet
```bash
# Si le projet est lié
vercel ls --scope [ton-username]

# Ou depuis le dossier du projet
cd D:\mon-site-perso
vercel ls
```

### Voir les détails d'un déploiement
```bash
vercel inspect [deployment-url]
```

### Voir les logs
```bash
vercel logs [deployment-url]
```

---

## 🔗 Obtenir les Liens

### Production URL
- **Format** : `https://td-tech-xxxxx.vercel.app`
- **Visible dans** : Dashboard → Page principale du projet
- **Mis à jour** : À chaque push sur `main`

### Preview URLs
- **Format** : `https://td-tech-git-xxxxx.vercel.app`
- **Créées pour** : Chaque Pull Request ou branche
- **Temporaires** : Supprimées après merge

---

## ✅ Checklist de Vérification

- [ ] Projet créé sur Vercel
- [ ] Variables d'environnement configurées
- [ ] Déploiement en cours ou terminé
- [ ] Statut = "Ready" (succès)
- [ ] URL de production disponible
- [ ] Site accessible (teste le lien)

---

## 🐛 Si le Déploiement Échoue

### Vérifier les Logs
1. **Dans le dashboard**, clique sur le déploiement en erreur
2. **Onglet "Logs"** : Voir l'erreur exacte
3. **Erreurs courantes** :
   - ❌ Variables d'environnement manquantes
   - ❌ Erreur de build (vérifie les logs)
   - ❌ Erreur de connexion à la base de données
   - ❌ Erreur Prisma (migrations non exécutées)

### Solutions

**Erreur "Cannot connect to database"** :
- ✅ Vérifie que `DATABASE_URL` est correcte
- ✅ Vérifie que la base de données Neon est active

**Erreur "Prisma Client not generated"** :
- ✅ Le script `postinstall` devrait le faire automatiquement
- ✅ Sinon, exécute : `npx prisma generate`

**Erreur "Environment variable missing"** :
- ✅ Vérifie que toutes les variables sont configurées
- ✅ Vérifie qu'elles sont cochées pour "Production"

---

## 🎯 Après un Déploiement Réussi

1. **Copie l'URL de production**
2. **Teste le site** (ouvre l'URL)
3. **Vérifie** :
   - Page d'accueil s'affiche ✅
   - Navigation fonctionne ✅
   - Formulaire de contact fonctionne ✅
4. **Partage le lien avec ton mentor** 🎉

---

## 📝 Commandes Utiles Vercel CLI

```bash
# Se connecter
vercel login

# Lier un projet
vercel link

# Déployer
vercel --prod

# Voir les projets
vercel ls

# Voir les variables d'environnement
vercel env ls

# Ajouter une variable
vercel env add <KEY> production

# Voir les logs en temps réel
vercel logs --follow
```

---

**Une fois le déploiement réussi, tu auras ton lien de production !** 🚀

