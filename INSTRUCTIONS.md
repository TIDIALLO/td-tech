# 🚀 Instructions de démarrage rapide

## Étape 1: Vérifier PostgreSQL

Assurez-vous que PostgreSQL est installé et en cours d'exécution sur votre machine.

```bash
# Windows (avec PostgreSQL installé)
# Vérifiez que le service PostgreSQL est démarré

# Ou utilisez Docker
docker run --name portfolio-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=portfolio_db -p 5432:5432 -d postgres:16-alpine
```

## Étape 2: Configurer les variables d'environnement

Le fichier `.env` est déjà créé avec des valeurs par défaut. Vous devez générer un `AUTH_SECRET` :

```bash
# Sur Linux/Mac
openssl rand -base64 32

# Sur Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

Copiez le résultat et remplacez `your-secret-key-here-generate-with-openssl-rand-base64-32` dans le fichier `.env`.

## Étape 3: Initialiser la base de données

```bash
# Créer les tables
npx prisma migrate dev --name init

# Peupler avec des données d'exemple
npx prisma db seed
```

## Étape 4: Lancer l'application

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000)

## Étape 5: Se connecter en tant qu'admin

- URL: [http://localhost:3000/auth/signin](http://localhost:3000/auth/signin)
- Email: `admin@tidianediallo.com`
- Mot de passe: `[MOT_DE_PASSE_ADMIN_REVOQUE]`

Puis accédez au dashboard: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 📝 Explications pour débutant

### Qu'est-ce que ce projet ?

C'est un **site web complet** qui combine :
1. **Un portfolio public** - Pour montrer tes projets
2. **Une page de services** - Pour présenter ce que tu proposes
3. **Une plateforme de formations** - Pour vendre/partager des cours
4. **Un blog** - Pour écrire des articles
5. **Un dashboard admin** - Pour gérer tout le contenu facilement

### Comment ça fonctionne ?

#### Frontend (ce que les visiteurs voient)
- **Next.js 15** : Framework React moderne qui génère des pages rapides
- **TailwindCSS** : Pour le style (couleurs, espacements, responsive)
- **shadcn/ui** : Composants UI pré-faits (boutons, cartes, formulaires)
- **Framer Motion** : Pour les animations fluides

#### Backend (la logique et les données)
- **Prisma** : ORM qui facilite la communication avec la base de données
- **PostgreSQL** : Base de données qui stocke tout (projets, utilisateurs, formations...)
- **Auth.js** : Gère l'authentification (connexion/déconnexion)
- **API Routes** : Points d'entrée pour créer/modifier/supprimer des données

### Structure des fichiers importants

```
src/
├── app/                    # Pages de ton site
│   ├── page.tsx           # Page d'accueil (/)
│   ├── portfolio/         # Pages portfolio (/portfolio)
│   ├── services/          # Pages services (/services)
│   ├── formations/        # Pages formations (/formations)
│   ├── blog/              # Pages blog (/blog)
│   ├── contact/           # Page contact (/contact)
│   ├── admin/             # Dashboard admin (/admin)
│   └── api/               # API pour CRUD
│
├── components/            # Composants réutilisables
│   ├── navbar.tsx         # Barre de navigation
│   ├── footer.tsx         # Pied de page
│   ├── ui/                # Composants UI (boutons, cartes...)
│   └── admin/             # Composants spécifiques admin
│
├── lib/                   # Utilitaires
│   ├── prisma.ts          # Connexion à la base de données
│   └── utils.ts           # Fonctions utiles
│
├── auth.ts                # Configuration de l'authentification
└── middleware.ts          # Protection des routes admin
```

### Base de données (Prisma Schema)

Le fichier `prisma/schema.prisma` définit la structure de ta base de données :

- **User** : Utilisateurs (admin, étudiants)
- **Project** : Projets de ton portfolio
- **Service** : Services que tu proposes
- **Course** : Formations
- **CourseModule** : Modules d'une formation
- **CourseFile** : Fichiers PDF/ZIP téléchargeables
- **CourseVideo** : Vidéos d'une formation
- **BlogPost** : Articles de blog
- **ContactMessage** : Messages du formulaire de contact

### Workflow typique

1. **Un visiteur arrive sur ton site** → Il voit la page d'accueil
2. **Il clique sur "Portfolio"** → Next.js charge `/portfolio/page.tsx`
3. **Cette page fait une requête à la DB** → Prisma récupère les projets depuis PostgreSQL
4. **Les projets s'affichent** → Avec un design moderne (TailwindCSS + shadcn/ui)

5. **Tu veux ajouter un projet ?**
   - Tu te connectes sur `/auth/signin`
   - Tu vas sur `/admin/projects`
   - Tu cliques "Nouveau projet"
   - Tu remplis le formulaire
   - Le formulaire envoie les données à `/api/admin/projects` (POST)
   - L'API sauvegarde dans la DB via Prisma
   - Le projet apparaît sur le site public

### Commandes utiles

```bash
# Développement
npm run dev              # Lance le serveur de développement

# Base de données
npx prisma studio        # Interface graphique pour voir/modifier la DB
npx prisma migrate dev   # Créer une nouvelle migration après changement du schema
npx prisma db seed       # Remplir la DB avec des données d'exemple

# Production
npm run build            # Compile l'application pour la production
npm run start            # Lance l'application en mode production
```

### Personnalisation

#### Changer les couleurs
Modifie `src/app/globals.css` (lignes 4-60) pour changer les couleurs du thème.

#### Ajouter une nouvelle page
1. Crée un fichier dans `src/app/` (ex: `src/app/about/page.tsx`)
2. Ajoute le lien dans `src/components/navbar.tsx`

#### Modifier le contenu
Connecte-toi sur `/admin` et utilise l'interface pour tout gérer.

---

## ⚠️ Problèmes courants

### Erreur "DATABASE_URL not found"
→ Vérifie que le fichier `.env` existe et contient `DATABASE_URL`

### Erreur "Prisma Client not generated"
→ Lance `npx prisma generate`

### Erreur de connexion PostgreSQL
→ Vérifie que PostgreSQL est démarré et que les credentials dans `.env` sont corrects

### Page blanche après `npm run dev`
→ Vérifie la console du navigateur (F12) pour voir les erreurs

---

## 🎯 Prochaines étapes

1. ✅ Lancer l'application en local
2. ✅ Te connecter en tant qu'admin
3. ✅ Ajouter tes vrais projets
4. ✅ Personnaliser les textes et couleurs
5. ✅ Ajouter tes formations
6. ✅ Configurer l'upload de fichiers (Uploadthing)
7. ✅ Déployer sur un VPS

Bon développement ! 🚀

