# Secretar.IA - Frontend

Application React pour Secretar.IA, agent IA téléphonique pour restaurants.

## Installation

La seule exigence est d'avoir Node.js & npm installés - [installer avec nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Suivez ces étapes :

```sh
# Étape 1 : Cloner le repository
git clone <YOUR_GIT_URL>

# Étape 2 : Naviguer vers le dossier du projet
cd <YOUR_PROJECT_NAME>

# Étape 3 : Installer les dépendances
npm i

# Étape 4 : Démarrer le serveur de développement
npm run dev
```

## Technologies utilisées

Ce projet est construit avec :

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- React Router
- Firebase (Auth & Firestore)

## Déploiement

Le projet peut être déployé sur Vercel, Netlify ou toute autre plateforme supportant les applications React.

Pour déployer sur Vercel :

```sh
npm run build
vercel --prod
```

## Domaine personnalisé

Le projet est configuré pour fonctionner avec le domaine `secretar-ia.fr`.

## Configuration des variables d'environnement

### URLs du projet

- **Frontend (React)** : `secretar-ia.fr`
- **Backend API (Next.js)** : `api.secretar-ia.fr` (déployé sur Vercel)

### Configuration de l'API

L'URL de base de l'API est configurée automatiquement selon l'environnement :

- **Production** : `https://api.secretar-ia.fr` (détecté automatiquement)
- **Développement local** : `http://localhost:3001` (par défaut)

### Variables d'environnement

Pour personnaliser l'URL de l'API, créez un fichier `.env.local` à la racine du dossier `front/` :

```env
# Pour le développement local
VITE_API_BASE_URL=http://localhost:3001

# Pour la production (si nécessaire)
# VITE_API_BASE_URL=https://api.secretar-ia.fr
```

**Note** : Les fichiers `.env.local` sont ignorés par Git (voir `.gitignore`).

### Déploiement

Lors du déploiement en production, assurez-vous que la variable d'environnement `VITE_API_BASE_URL` est définie à `https://api.secretar-ia.fr` dans votre plateforme de déploiement (Vercel, Netlify, etc.).

Si la variable n'est pas définie, le code utilisera automatiquement `https://api.secretar-ia.fr` en mode production.