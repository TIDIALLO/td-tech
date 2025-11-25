# 📸 Comment ajouter ta photo

## 🎯 Étape simple

### 1. Prépare ta photo
- Utilise la deuxième image que tu as fournie (celle avec le hoodie vert)
- Renomme-la en : `tidiane-photo.jpg`

### 2. Place la photo dans le dossier `public`
```
mon-site-perso/
  └── public/
      └── tidiane-photo.jpg  ← Place ta photo ici
```

### 3. C'est tout !
La page d'accueil utilisera automatiquement ta photo.

---

## 📐 Recommandations pour la photo

### Dimensions idéales
- **Largeur** : 500-800px
- **Hauteur** : 600-1000px
- **Format** : JPG ou PNG
- **Poids** : < 500 KB (pour un chargement rapide)

### Qualité
- ✅ Bonne luminosité
- ✅ Arrière-plan propre
- ✅ Visage bien visible
- ✅ Photo professionnelle

---

## 🎨 Ce qui a été créé

### Nouvelle page d'accueil inspirée de LearnWithHasan

✅ **Hero Section** avec :
- Titre accrocheur "Build & Sell Smarter Digital Products"
- Texte avec icône de check
- Formulaire d'inscription à la newsletter
- Ta photo à droite

✅ **Section Statistiques** :
- 13+ Années d'Expérience
- 9+ Années en Ligne
- 2310+ Membres Actifs
- 5125+ Avis 5 Étoiles

✅ **Section Témoignages** :
- 3 cartes avec avis clients
- Étoiles 5/5
- Citations authentiques

✅ **Section Expérience** :
- Présentation de ton parcours
- Liste de tes expertises
- Bouton CTA

✅ **Section Communauté** :
- 4 cartes avec icônes
- Fil Communautaire
- Forums de Discussion
- Partage de Résultats
- Support Direct

✅ **Section CTA finale** :
- Appel à l'action
- 2 boutons (Newsletter + Communauté)

---

## 🎨 Design moderne

### Couleurs
- Fond clair/sombre (selon le thème)
- Accent primaire pour les boutons
- Texte bien contrasté

### Typographie
- Titres grands et impactants
- Texte lisible
- Hiérarchie claire

### Layout
- Responsive (mobile, tablet, desktop)
- Grille moderne
- Espacements harmonieux

---

## 🔄 Personnalisation

### Modifier les textes

Ouvre `src/app/page.tsx` et modifie :
- Les titres
- Les descriptions
- Les statistiques
- Les témoignages

### Modifier les couleurs

Les couleurs sont définies dans `src/app/globals.css` (variables CSS).

---

## ✅ Après avoir ajouté ta photo

1. Redémarre le serveur si nécessaire :
```bash
npm run dev
```

2. Ouvre http://localhost:3000

3. Ta photo devrait apparaître dans la hero section ! 🎉

---

## 📝 Note importante

Si tu veux utiliser un nom de fichier différent, modifie cette ligne dans `src/app/page.tsx` :

```typescript
<Image
  src="/tidiane-photo.jpg"  ← Change le nom ici
  alt="Tidiane Diallo"
  width={500}
  height={600}
  className="rounded-2xl object-cover"
  priority
/>
```

---

**Place ta photo dans le dossier `public/` et c'est prêt ! 🚀**

