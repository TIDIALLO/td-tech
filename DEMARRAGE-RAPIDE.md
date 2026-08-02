# 🚀 Démarrage Rapide - 5 minutes

## Étape 1: Installer PostgreSQL

### Option A: PostgreSQL local (Windows)
Télécharge et installe PostgreSQL : https://www.postgresql.org/download/windows/

### Option B: Docker (Recommandé)
```bash
docker run --name portfolio-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=portfolio_db -p 5432:5432 -d postgres:16-alpine
```

## Étape 2: Configurer AUTH_SECRET

Ouvre le fichier `.env` et remplace la ligne :
```
AUTH_SECRET="your-secret-key-here-generate-with-openssl-rand-base64-32"
```

Par une vraie clé secrète. Sur PowerShell :
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

Copie le résultat et colle-le dans `.env`.

## Étape 3: Initialiser la base de données

```bash
npx prisma migrate dev --name init
npx prisma db seed
```

## Étape 4: Lancer l'application

```bash
npm run dev
```

## Étape 5: Se connecter

1. Ouvre http://localhost:3000
2. Clique sur "Connexion" (en haut à droite)
3. Utilise ces identifiants :
   - **Email**: admin@tidianediallo.com
   - **Mot de passe**: [MOT_DE_PASSE_ADMIN_REVOQUE]
4. Tu es maintenant sur le dashboard admin !

---

## 🎯 Que faire ensuite ?

### 1. Explore le dashboard admin
- Va sur http://localhost:3000/admin
- Clique sur "Projets" pour voir les projets d'exemple
- Clique sur "Nouveau projet" pour en créer un

### 2. Personnalise le site
- Modifie `src/app/page.tsx` pour changer les textes de la page d'accueil
- Modifie `src/components/navbar.tsx` pour changer ton nom
- Modifie `src/components/footer.tsx` pour tes infos de contact

### 3. Ajoute tes vrais projets
- Supprime les projets d'exemple dans l'admin
- Crée tes propres projets avec tes vraies informations

### 4. Personnalise les couleurs
- Édite `src/app/globals.css` (lignes 4-60) pour changer les couleurs du thème

---

## 📊 Voir les données en base

```bash
npx prisma studio
```

Cela ouvre une interface graphique pour voir et modifier toutes tes données.

---

## ❓ Problèmes courants

### "Cannot connect to database"
→ Vérifie que PostgreSQL est démarré
→ Vérifie que `DATABASE_URL` dans `.env` est correct

### "Prisma Client not generated"
→ Lance `npx prisma generate`

### Page blanche
→ Ouvre la console du navigateur (F12) pour voir les erreurs
→ Vérifie que `npm run dev` n'affiche pas d'erreurs

---

## 📚 Documentation complète

- **README.md** - Installation détaillée
- **INSTRUCTIONS.md** - Guide débutant avec explications
- **PROJET-COMPLET.md** - Récapitulatif de toutes les fonctionnalités
- **RESUME-IMPLEMENTATION.md** - Checklist de ce qui a été fait

---

## 🎉 C'est tout !

Ton site est maintenant fonctionnel. Explore, personnalise, et amuse-toi ! 🚀

Si tu as des questions, consulte les autres fichiers de documentation.

