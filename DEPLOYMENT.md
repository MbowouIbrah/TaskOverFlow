# Guide de Déploiement - TaskOverflow

Ce document détaille l'ensemble des étapes et configurations nécessaires pour déployer l'application **TaskOverflow** (Frontend React, Backend Node/Express, Base de données PostgreSQL) en production.

---

## 🏗️ Architecture Globale

L'application est composée de trois parties distinctes à déployer :
1. **La Base de données** : Un serveur PostgreSQL.
2. **Le Backend API** : Serveur Node.js / Express (hébergé sur Render, Railway, Fly.io, ou un VPS).
3. **Le Frontend Web** : Application Single Page (SPA) React compilée par Vite (hébergée sur Vercel, Netlify, ou Render).

---

## 📡 Étape 1 : Déploiement de la Base de Données

L'application nécessite une instance de base de données **PostgreSQL** accessible en ligne.

### Choix de l'hébergeur (Exemples gratuits/accessibles) :
* [Neon.tech](https://neon.tech/) (Recommandé - Serverless Postgres rapide)
* [Supabase](https://supabase.com/) (Fournit une base Postgres managée)
* [Render PostgreSQL](https://render.com/)

### Procédure :
1. Créez une base de données PostgreSQL chez votre hébergeur.
2. Récupérez la **chaîne de connexion (Connection String)**. Elle doit ressembler à ceci :
   `postgresql://utilisateur:motdepasse@nom-hote.neon.tech/nom_bd?sslmode=require`

---

## ⚙️ Étape 2 : Variables d'Environnement (Configuration)

Vous devez configurer les variables d'environnement suivantes sur vos serveurs respectifs lors de leur déploiement.

### 1. Variables pour le Backend (API)
| Variable | Description | Exemple en Production |
| :--- | :--- | :--- |
| `PORT` | Le port sur lequel l'API va écouter (automatiquement injecté par la plupart des PaaS) | `5000` |
| `DATABASE_URL` | L'URL de connexion PostgreSQL récupérée à l'étape 1 | `postgresql://...` |
| `JWT_SECRET` | Une clé secrète longue et aléatoire pour signer les tokens de session | `votre_super_cle_secrete_aleatoire_generer_ici` |
| `FRONTEND_URL` | L'URL finale de votre site web Frontend (nécessaire pour autoriser les requêtes CORS et l'envoi d'e-mails) | `https://taskoverflow.vercel.app` |
| **Optionnel : Email (SMTP)** | | |
| `EMAIL_HOST` | Serveur SMTP pour l'envoi d'emails d'invitation | `smtp.gmail.com` |
| `EMAIL_PORT` | Port SMTP | `587` |
| `EMAIL_USER` | Votre adresse email expéditrice | `contact@votre-entreprise.com` |
| `EMAIL_PASS` | Mot de passe d'application ou d'accès SMTP | `motdepasseapplication` |

### 2. Variables pour le Frontend (React/Vite)
| Variable | Description | Exemple en Production |
| :--- | :--- | :--- |
| `VITE_APP_URL` | L'URL d'accès public de votre application Frontend | `https://taskoverflow.vercel.app` |
| `VITE_API_URL` | L'URL d'accès public de votre Backend API | `https://taskoverflow-api.onrender.com` |

> ⚠️ **IMPORTANT** : Ne poussez jamais les fichiers `.env` contenant vos mots de passe réels ou clés privées sur GitHub. Le fichier `.gitignore` configuré à la racine les exclut automatiquement. Renseignez ces valeurs dans l'interface d'administration de votre hébergeur.

---

## 🛡️ Étape 3 : Initialisation de la Base de Données

Une fois la base de données créée et l'URL d'environnement configurée, vous devez pousser le schéma Prisma et exécuter le seed initial depuis votre machine locale en ciblant la BD de production, ou configurer un script de pré-déploiement.

### Option A : Depuis votre machine locale (Recommandé pour débuter)
1. Modifiez temporairement votre fichier `backend/.env` local en remplaçant la valeur `DATABASE_URL` par celle de votre base de données de production en ligne.
2. Créez les tables sur la base de données distante :
   ```bash
   npx prisma db push --schema=backend/prisma/schema.prisma
   ```
3. Exécutez le script pour créer l'équipe fondatrice et les tâches par défaut :
   ```bash
   npm run seed --prefix backend
   ```
4. Remettez votre URL de base de données locale dans le fichier `backend/.env` pour le développement local.

### Option B : Script de déploiement automatique (CI/CD)
Sur votre hébergeur backend, configurez la commande de build pour qu'elle intègre la migration de la base de données :
```bash
npm install && npx prisma generate && npx prisma db push && npm run build
```

---

## 🚀 Étape 4 : Déploiement du Backend (API Node/Express)

Vous pouvez déployer l'API sur des plateformes comme **Render** ou **Railway**.

### Paramètres de déploiement :
* **Dépôt Git** : Connectez votre dépôt GitHub.
* **Sous-répertoire (Root Directory)** : `backend`
* **Environnement** : `Node`
* **Commande de Build** :
  ```bash
  npm install && npx prisma generate && npm run build
  ```
  *(La commande `npm run build` appelle le compilateur TypeScript `tsc` pour générer le code JavaScript de production dans le dossier `/dist`).*
* **Commande de démarrage (Start Command)** :
  ```bash
  npm start
  ```
  *(La commande exécute `node dist/server.js`).*
* **Variables d'environnement** : Renseignez les clés listées dans la section *Variables pour le Backend* (incluant la `DATABASE_URL` de production).

---

## 🖥️ Étape 5 : Déploiement du Frontend (React / Vite)

Vous pouvez héberger la partie statique sur **Vercel** ou **Netlify** (fortement recommandé car rapide, gratuit et optimisé).

### Paramètres de déploiement (exemple sur Vercel) :
* **Dépôt Git** : Connectez votre dépôt GitHub.
* **Framework Preset** : `Vite`
* **Dossier racine (Root Directory)** : `./` (la racine du projet)
* **Commande de Build** : `npm run build`
* **Répertoire de sortie (Output Directory)** : `dist`
* **Variables d'environnement** : Renseignez `VITE_APP_URL` et `VITE_API_URL`.

### ⚠️ Gestion du routage Single Page Application (SPA)
Puisque React utilise un routage côté client (`react-router-dom`), vous devez indiquer au serveur d'hébergement statique de rediriger toutes les URLs vers `index.html`.

#### Pour Vercel :
Créez un fichier `vercel.json` à la racine du projet avec ce contenu :
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

#### Pour Netlify :
Créez un fichier nommé `_redirects` dans le dossier `public/` contenant la ligne suivante :
```text
/*    /index.html   200
```

---

## 🏁 Étape 6 : Validation finale

Une fois le déploiement du Frontend et du Backend terminés :
1. Accédez à l'URL de votre Frontend (ex : `https://taskoverflow.vercel.app`).
2. Tentez de vous connecter avec l'email administrateur (`lawrynnjennifer@gmail.com`) et le mot de passe (`Trigenys2026!`).
3. Si la connexion réussit et que le tableau de bord charge vos tâches, félicitations, l'application est en ligne !
