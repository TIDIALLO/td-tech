# Bibliothèques et Dépendances - Synap6ia

Ce document détaille toutes les bibliothèques utilisées dans le projet Synap6ia, leur rôle, et les raisons de leur choix.

---

## Dependencies (Production)

### Framework et Core

#### next (^16.0.10)
- **Rôle** : Framework React full-stack
- **Fonctionnalités utilisées** :
  - App Router (routing basé sur le système de fichiers)
  - Server Components et Client Components
  - API Routes pour le backend
  - Image et Font optimization automatiques
  - Static Generation et Server-Side Rendering
- **Pourquoi** : Standard de l'industrie pour les applications React modernes, excellent SEO, performance optimale

#### react (^19.2.3) et react-dom (^19.2.3)
- **Rôle** : Bibliothèque UI pour construire l'interface
- **Fonctionnalités** :
  - Server Components (nouvelle architecture React 19)
  - Hooks (useState, useEffect, etc.)
  - Composants réutilisables
- **Pourquoi** : Version la plus récente avec les dernières optimisations et fonctionnalités

---

### UI et Styling

#### tailwindcss (^3.4.1)
- **Rôle** : Framework CSS utility-first
- **Utilisation** :
  - Design system cohérent
  - Responsive design
  - Dark mode
  - Custom theme avec couleur primaire #10B981
- **Pourquoi** : Productivité élevée, bundle CSS optimisé, maintien facile

#### tailwind-merge (^2.6.0)
- **Rôle** : Fusion intelligente de classes Tailwind
- **Utilisation** : Éviter les conflits de classes CSS dans les composants
- **Exemple** : `cn("px-4", "px-2")` → `"px-2"` (dernière valeur prioritaire)

#### tailwindcss-animate (^1.0.7)
- **Rôle** : Plugin Tailwind pour les animations
- **Utilisation** : Classes d'animation prédéfinies (spin, ping, pulse, bounce)
- **Pourquoi** : Animations CSS performantes sans JavaScript

#### class-variance-authority (^0.7.1)
- **Rôle** : Gestion des variants de composants
- **Utilisation** : Créer des composants avec plusieurs variantes (size, color, etc.)
- **Exemple** :
  ```typescript
  const button = cva("base-styles", {
    variants: {
      size: { sm: "text-sm", lg: "text-lg" }
    }
  })
  ```

#### clsx (^2.1.1)
- **Rôle** : Construction conditionnelle de className
- **Utilisation** : Classes CSS conditionnelles
- **Exemple** : `clsx("base", { active: isActive })`

#### framer-motion (^11.11.17)
- **Rôle** : Bibliothèque d'animation React
- **Utilisation** :
  - Animations de page (fadeIn, slideUp)
  - Transitions fluides
  - Animations au scroll (whileInView)
  - Gestures (drag, hover)
- **Pourquoi** : API simple, performant, animations déclaratives

#### lucide-react (^0.462.0)
- **Rôle** : Bibliothèque d'icônes
- **Utilisation** : Icônes modernes et cohérentes
- **Avantages** :
  - Tree-shakeable (seulement les icônes utilisées sont bundlées)
  - Personnalisables (taille, couleur, stroke)
  - Plus de 1000+ icônes
- **Pourquoi** : Alternative moderne à react-icons, plus léger

#### next-themes (^0.4.3)
- **Rôle** : Gestion du dark mode pour Next.js
- **Utilisation** :
  - Toggle dark/light mode
  - Persistance du thème (localStorage)
  - Pas de flash au chargement
- **Pourquoi** : Solution clé en main pour le theming avec Next.js

---

### Composants UI (Shadcn/Radix)

Tous ces composants proviennent de **Radix UI** (primitives accessibles) et sont stylisés avec Tailwind via **Shadcn UI**.

#### @radix-ui/react-dialog (^1.1.2)
- **Rôle** : Composant Dialog/Modal
- **Utilisation** : Popups, modals, confirmations
- **Avantages** : Accessible (ARIA), focus trap, gestion ESC key

#### @radix-ui/react-dropdown-menu (^2.1.2)
- **Rôle** : Menu déroulant
- **Utilisation** : Menus de navigation, actions contextuelles
- **Avantages** : Keyboard navigation, accessible

#### @radix-ui/react-label (^2.1.1)
- **Rôle** : Label pour formulaires
- **Utilisation** : Associer labels et inputs
- **Avantages** : Accessible (for/id automatique)

#### @radix-ui/react-select (^2.1.2)
- **Rôle** : Select/Dropdown customisable
- **Utilisation** : Dropdowns dans les formulaires
- **Avantages** : Accessible, recherche, keyboard navigation

#### @radix-ui/react-separator (^1.1.1)
- **Rôle** : Séparateur visuel
- **Utilisation** : Diviser des sections
- **Avantages** : Accessible (role="separator")

#### @radix-ui/react-slot (^1.1.1)
- **Rôle** : Fusion de props entre composants
- **Utilisation** : Pattern asChild pour composants composables
- **Pourquoi** : Flexibilité dans la composition de composants

#### @radix-ui/react-switch (^1.1.1)
- **Rôle** : Toggle switch
- **Utilisation** : On/Off toggles (dark mode, settings)
- **Avantages** : Accessible (role="switch")

#### @radix-ui/react-tabs (^1.1.1)
- **Rôle** : Composant Tabs/Onglets
- **Utilisation** : Navigation par onglets
- **Avantages** : Accessible, keyboard navigation

#### @radix-ui/react-toast (^1.2.2)
- **Rôle** : Notifications toast
- **Utilisation** : Messages de succès/erreur
- **Avantages** : Accessible, auto-dismiss, stack multiple toasts

**Pourquoi Radix UI ?**
- Accessible par défaut (WCAG 2.1)
- Unstyled (contrôle total du design)
- Composable et flexible
- Bien maintenu et documenté

---

### Formulaires et Validation

#### react-hook-form (^7.53.2)
- **Rôle** : Gestion des formulaires React
- **Utilisation** : Tous les formulaires du site (contact, etc.)
- **Avantages** :
  - Performance (uncontrolled components)
  - Validation intégrée
  - Moins de re-renders
  - TypeScript support
- **Pourquoi** : Meilleure performance que Formik, API moderne

#### @hookform/resolvers (^3.9.1)
- **Rôle** : Adaptateurs de validation pour react-hook-form
- **Utilisation** : Intégration avec Zod
- **Exemple** :
  ```typescript
  useForm({
    resolver: zodResolver(contactSchema)
  })
  ```

#### zod (^3.23.8)
- **Rôle** : Validation de schémas TypeScript
- **Utilisation** :
  - Validation des formulaires
  - Validation des API routes
  - Type inference automatique
- **Avantages** :
  - Type-safe
  - Messages d'erreur personnalisables
  - Composable (schemas réutilisables)
- **Pourquoi** : Meilleure intégration TypeScript que Yup/Joi

---

### Base de Données et ORM

#### @prisma/client (^6.0.1)
- **Rôle** : Client de base de données généré par Prisma
- **Utilisation** :
  - Requêtes type-safe
  - CRUD operations
  - Relations entre tables
- **Avantages** :
  - Auto-completion complète
  - Type safety
  - Protection contre SQL injection

#### prisma (^6.0.1) [devDependency]
- **Rôle** : CLI et générateur Prisma
- **Utilisation** :
  - Migrations de base de données
  - Génération du client
  - Prisma Studio (GUI)
- **Pourquoi** : Meilleur DX (Developer Experience) que TypeORM ou Sequelize

---

### Authentification

#### next-auth (^5.0.0-beta.30)
- **Rôle** : Solution d'authentification pour Next.js
- **Utilisation** :
  - Login/logout
  - Sessions sécurisées
  - OAuth providers (Google, GitHub, etc.)
  - Credentials provider (email/password)
- **Avantages** :
  - Intégration Next.js native
  - Sécurisé par défaut
  - Support de multiples providers
- **Pourquoi** : Standard pour l'auth dans Next.js

#### @auth/prisma-adapter (^2.7.4)
- **Rôle** : Adapter Prisma pour NextAuth
- **Utilisation** : Persister les sessions et comptes dans PostgreSQL
- **Pourquoi** : Intégration parfaite Prisma + NextAuth

#### bcryptjs (^2.4.3)
- **Rôle** : Hachage de mots de passe
- **Utilisation** : Hash et compare des passwords
- **Avantages** :
  - Salting automatique
  - Résistant aux brute force (slow by design)
- **Pourquoi** : Sécurité éprouvée, version JS pure (pas de dépendances C++)

---

### Email

#### nodemailer (^7.0.7)
- **Rôle** : Envoi d'emails
- **Utilisation** :
  - Emails de contact
  - SMTP Gmail configuré
  - Templates HTML
- **Avantages** :
  - Flexible (support de multiples services)
  - Bien documenté
  - Gestion des pièces jointes
- **Pourquoi** : Standard de l'industrie, fiable

#### resend (^6.5.2)
- **Rôle** : Service d'email transactionnel (backup/alternative)
- **Utilisation** : Envoi d'emails via API Resend
- **Avantages** :
  - API simple
  - Analytics intégrés
  - React Email support
- **Pourquoi** : Alternative moderne à SendGrid/Mailgun, developer-friendly

---

### Upload de Fichiers

#### uploadthing (^7.2.0)
- **Rôle** : Solution d'upload de fichiers pour Next.js
- **Utilisation** : Upload d'images pour projets/formations
- **Avantages** :
  - Intégration Next.js facile
  - Gestion automatique du stockage
  - Optimisation d'images

#### @uploadthing/react (^7.2.0)
- **Rôle** : Composants React pour UploadThing
- **Utilisation** : UI pour l'upload de fichiers

---

### Utilitaires

#### date-fns (^4.1.0)
- **Rôle** : Manipulation de dates
- **Utilisation** :
  - Formatage de dates
  - Calculs de durée
  - Comparaisons de dates
- **Avantages** :
  - Tree-shakeable (import seulement ce dont on a besoin)
  - Immutable
  - TypeScript support natif
- **Pourquoi** : Plus léger et moderne que Moment.js

#### gray-matter (^4.0.3)
- **Rôle** : Parser de front matter (Markdown)
- **Utilisation** : Parsing des fichiers Markdown pour le blog
- **Format** :
  ```markdown
  ---
  title: Mon article
  date: 2024-01-01
  ---
  Contenu...
  ```

#### react-markdown (^9.0.1)
- **Rôle** : Rendu de Markdown en React
- **Utilisation** : Affichage du contenu blog en HTML
- **Avantages** :
  - Safe par défaut (pas de XSS)
  - Customisable (composants personnalisés)
  - Syntax highlighting possible

---

## DevDependencies (Développement)

### TypeScript

#### typescript (^5.6.3)
- **Rôle** : Compilateur TypeScript
- **Utilisation** : Type checking, compilation TS → JS
- **Pourquoi** : Type safety, meilleur DX

#### @types/node (^22.9.0)
- **Rôle** : Types TypeScript pour Node.js
- **Utilisation** : Types pour process, fs, path, etc.

#### @types/react (^19.0.1)
- **Rôle** : Types TypeScript pour React
- **Utilisation** : Types pour composants, hooks, events

#### @types/react-dom (^19.0.1)
- **Rôle** : Types TypeScript pour ReactDOM
- **Utilisation** : Types pour render, hydrate, etc.

#### @types/bcryptjs (^2.4.6)
- **Rôle** : Types pour bcryptjs
- **Utilisation** : Type safety pour hash/compare

#### @types/nodemailer (^7.0.0)
- **Rôle** : Types pour nodemailer
- **Utilisation** : Type safety pour envoi d'emails

#### ts-node (^10.9.2)
- **Rôle** : Exécuter TypeScript directement
- **Utilisation** : Scripts Prisma seed en TypeScript

---

### Build et Tooling

#### postcss (^8.4.35)
- **Rôle** : Transformateur CSS
- **Utilisation** : Requis par Tailwind CSS
- **Plugins** :
  - tailwindcss
  - autoprefixer

#### autoprefixer (^10.4.18)
- **Rôle** : Ajouter les vendor prefixes CSS automatiquement
- **Utilisation** : Compatibilité cross-browser
- **Exemple** : `display: flex` → `-webkit-box-flex` pour Safari

---

### Linting et Quality

#### eslint (^9.14.0)
- **Rôle** : Linter JavaScript/TypeScript
- **Utilisation** :
  - Détection d'erreurs
  - Enforcement des conventions de code
  - npm run lint

#### eslint-config-next (^15.0.3)
- **Rôle** : Configuration ESLint pour Next.js
- **Règles** :
  - Best practices Next.js
  - Hooks rules
  - Accessibility checks

---

## Dépendances Non Utilisées (à nettoyer)

Aucune dépendance inutilisée détectée. Toutes les bibliothèques listées sont activement utilisées dans le projet.

---

## Poids du Bundle

### Bibliothèques les plus lourdes

1. **framer-motion** (~150 KB) - Animations
2. **react-dom** (~130 KB) - React rendering
3. **@prisma/client** (~50 KB) - ORM client
4. **next-auth** (~40 KB) - Authentification
5. **react-hook-form** (~30 KB) - Formulaires

### Optimisations

- **Tree-shaking** : Toutes les bibliothèques modernes supportent le tree-shaking
- **Code splitting** : Next.js split automatiquement par route
- **Dynamic imports** : Composants lourds importés dynamiquement
- **Bundle analyzer** : Utilisable via `npm run analyze` (à ajouter si besoin)

---

## Mises à Jour et Maintenance

### Stratégie de mise à jour

1. **Minor updates** : Tous les mois
   ```bash
   npm update
   ```

2. **Major updates** : Revue trimestrielle
   - Lire les CHANGELOG
   - Tester en environnement de dev
   - Vérifier les breaking changes

3. **Security patches** : Immédiatement
   ```bash
   npm audit
   npm audit fix
   ```

### Compatibilité

- **Next.js** : Suivre les versions stables (éviter les canary)
- **React** : Rester sur la version majeure actuelle (19.x)
- **Prisma** : Mises à jour fréquentes (bonne rétrocompatibilité)
- **Tailwind** : Mises à jour mineures régulières

---

## Alternatives Considérées

### Pourquoi pas...

#### Formik au lieu de React Hook Form ?
- ❌ Plus lourd (20 KB vs 30 KB)
- ❌ Plus de re-renders
- ✅ RHF a une meilleure performance

#### Styled Components au lieu de Tailwind ?
- ❌ Runtime overhead
- ❌ Moins de standardisation
- ✅ Tailwind = CSS généré au build time

#### TypeORM au lieu de Prisma ?
- ❌ Moins de type safety
- ❌ DX moins bon
- ✅ Prisma = meilleure expérience développeur

#### Axios au lieu de Fetch ?
- ❌ Dépendance supplémentaire (4 KB)
- ✅ Fetch natif dans Next.js (built-in polyfill)

---

## Commandes Package Manager

### Installation

```bash
npm install                    # Installer toutes les dépendances
npm install <package>         # Ajouter une dépendance
npm install -D <package>      # Ajouter une devDependency
```

### Mise à jour

```bash
npm outdated                  # Voir les packages à mettre à jour
npm update                    # Mettre à jour les mineures
npm update <package>          # Mettre à jour un package spécifique
```

### Nettoyage

```bash
npm prune                     # Supprimer les dépendances inutilisées
npm dedupe                    # Dédupliquer les dépendances
rm -rf node_modules package-lock.json && npm install  # Réinstaller proprement
```

### Audit sécurité

```bash
npm audit                     # Vérifier les vulnérabilités
npm audit fix                 # Corriger automatiquement
npm audit fix --force         # Corriger avec breaking changes
```

---

## Ressources

- [npm Documentation](https://docs.npmjs.com/)
- [Package Comparison](https://npmtrends.com/)
- [Bundle Analyzer](https://bundlephobia.com/)
- [Snyk Advisor](https://snyk.io/advisor/) - Sécurité et qualité des packages

---

**Dernière mise à jour** : 2026-01-07
**Total dependencies** : 27 production + 10 dev = 37 packages
**Mainteneur** : Tidiane Diallo (Synap6ia)
