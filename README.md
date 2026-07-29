# 📱 UniTable — Frontend Mobile

> **Une application mobile pour gérer votre organisation** — Une interface React Native/Expo avec Redux pour gérer les employés, services, équipes et plannings sur mobile.

[![Expo](https://img.shields.io/badge/Expo-54.0.1-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React_Native-0.81.5-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactnative.dev/)
[![Redux](https://img.shields.io/badge/Redux-2.11.2-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux.js.org/)
[![React Navigation](https://img.shields.io/badge/React_Navigation-6-673AB7?style=for-the-badge)](https://reactnavigation.org/)
[![FontAwesome](https://img.shields.io/badge/FontAwesome-7.2.0-538DD7?style=for-the-badge)](https://fontawesome.com/)
[![Day.js](https://img.shields.io/badge/Day.js-1.11.19-FF6B6B?style=for-the-badge)](https://day.js.org/)
[![License: BSL](https://img.shields.io/badge/License-BSL_1.1-orange.svg?style=for-the-badge)](https://mariadb.com/bsl11)

---

## 📜 À propos du projet

**UniTable** est un projet de fin de formation conçu en groupe, en 10 jours.
C'est une **application mobile** développée avec **Expo** et **React Native**. Elle offre une expérience utilisateur intuitive pour gérer :

- La connexion et l'authentification des employés
- La visualisation du planning personnel
- La gestion des informations personnelles
- L'accès aux informations de l'organisation

L'application est conçue pour être simple, rapide et agréable à utiliser sur mobile, avec une interface adaptée aux petits écrans.

---

## 🔧 Stack Technique

| Catégorie            | Technologie                                                                                  | Version | Rôle                                  |
| -------------------- | -------------------------------------------------------------------------------------------- | ------- | ------------------------------------- |
| **Framework**        | [Expo](https://expo.dev/)                                                                    | 54.0.1  | Framework React Native                |
| **Librairie UI**     | [React Native](https://reactnative.dev/)                                                     | 0.81.5  | Construction de l'interface mobile    |
| **State Management** | [Redux Toolkit](https://redux-toolkit.js.org/)                                               | 2.11.2  | Gestion centralisée de l'état         |
| **Persistance**      | [Redux Persist](https://github.com/rt2zz/redux-persist)                                      | 6.0.0   | Sauvegarde du state dans AsyncStorage |
| **Navigation**       | [React Navigation](https://reactnavigation.org/)                                             | 6       | Navigation entre écrans               |
| **Icons**            | [FontAwesome](https://fontawesome.com/)                                                      | 7.2.0   | Bibliothèque d'icônes                 |
| **Storage**          | [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)                  | 2.2.0   | Stockage local                        |
| **Authentification** | [expo-local-authentication](https://docs.expo.dev/versions/latest/sdk/local-authentication/) | 17.0.8  | Authentification biométrique          |
| **Dates**            | [Day.js](https://day.js.org/)                                                                | 1.11.19 | Manipulation des dates                |
| **Configuration**    | [react-native-config](https://github.com/lugg/react-native-config)                           | 1.6.1   | Gestion des variables d'environnement |
| **Déploiement**      | [Expo EAS](https://docs.expo.dev/eas/)                                                       | -       | Build et déploiement                  |

---

## ✨ Fonctionnalités

### 👤 Authentification

- Écran de connexion sécurisé
- Gestion des tokens JWT
- Stockage sécurisé des informations de connexion
- Déconnexion

### 🏠 Écran d'Accueil

- Vue d'ensemble de l'organisation
- Accès rapide aux fonctionnalités principales
- Statistiques et informations
- Navigation intuitive

### 📅 Planning

- Visualisation du planning personnel
- Affichage par jour/semaine/mois
- Détails des plannings
- Filtrage par date

### 👤 Mes Infos

- Affichage des informations personnelles

### 👤 Profil

- Gestion du profil utilisateur
- Modification des informations
- Changement de mot de passe

---

## 🚀 Installation

### Prérequis

- [Node.js](https://nodejs.org/) (version 18 ou supérieure)
- [Yarn](https://yarnpkg.com/) ou [npm](https://www.npmjs.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (optionnel pour le développement)
- [UniTable Backend](https://github.com/dankysten/unitable-backend) **en cours d'exécution**

### Étapes

1. **Cloner le dépôt**

   ```bash
   git clone https://github.com/dankysten/unitable-frontend-mobile.git
   cd unitable-frontend-mobile
   ```

2. **Installer les dépendances**

   ```bash
   yarn install
   # ou
   npm install
   ```

3. **Configurer l'environnement**
   Créer un fichier `.env` à la racine avec la variable suivante :

   ```env
   API_URL=http://localhost:4000
   ```

4. **Lancer l'application**

   ```bash
   # Mode développement
   yarn start
   # ou
   npm start

   # Sur Android
   yarn android
   # ou
   npm run android

   # Sur iOS
   yarn ios
   # ou
   npm run ios

   # Sur Web
   yarn web
   # ou
   npm run web
   ```

5. **Accéder à l'application**
   - Scannez le QR code avec l'application **Expo Go** (mobile)
   - Ou ouvrez `http://localhost:19006` dans votre navigateur (web)

---

## 📁 Structure du Projet

```
unitable-frontend-mobile/
├── App.js                     # Point d'entrée principal
├── index.js                  # Registration Expo
├── package.json              # Dépendances et scripts
├── app.json                  # Configuration Expo
├── app.config.js             # Configuration Expo supplémentaire
├── .env                      # Variables d'environnement
├── .gitignore                # Fichiers ignorés par Git
│
├── assets/                   # Ressources statiques
│
├── src/
│   ├── screens/              # Écrans de l'application
│   │   ├── LoginScreen.js   # Écran de connexion
│   │   ├── HomeScreen.js    # Écran d'accueil
│   │   ├── ForgotPasswordScreen.js # Mot de passe oublié
│   │   ├── PlanningScreen.js # Écran du planning
│   │   ├── MyInfosScreen.js  # Écran Mes infos
│   │   └── ProfileScreen.js  # Écran de profil
│   │
│   ├── reducers/             # Store Redux
│   │   ├── Auth.js           # Reducer d'authentification
│   │   └── Store.js          # Configuration du store
│   │
│   └── theme/                # Thème de l'application
│       └── colors.js         # Palette de couleurs
│
└── node_modules/             # Dépendances installées
```

---

## 🔌 Configuration Backend

L'application nécessite un backend fonctionnel. Par défaut, elle se connecte à :

```
http://localhost:4000
```

**Pour utiliser un backend déployé :**

1. Lancer le [UniTable Backend](../unitable-backend/README.md) ou utiliser l'URL déployée
2. Mettre à jour `.env` :
   ```env
   API_URL=https://unitable-backend.vercel.app
   ```

---

## 🎨 Personnalisation

### Thème

Le thème principal est défini dans `src/theme/colors.js` avec :

- **Couleur primaire** : Utilisée pour les éléments actifs
- **Couleur secondaires** : Pour les différents états
- **Couleurs d'accent** : Pour les boutons et actions

Tu peux modifier ces valeurs pour adapter le thème à ton style.

### Navigation

La configuration de la navigation est dans `App.js`. Tu peux y modifier :

- Les écrans disponibles
- Les icônes utilisées (FontAwesome)
- Les couleurs de la barre de navigation
- Les styles des labels

---

## 📱 Déploiement (Mobile)

### Avec Expo EAS

1. Configurer `app.json` avec les bonnes informations
2. Lancer le build :
   ```bash
   eas build --platform all
   ```
3. Déployer sur les stores (App Store, Google Play)

### En tant que PWA

1. Builder l'application web :
   ```bash
   yarn web
   ```
2. Déployer le dossier `dist/` sur un hébergement statique

---

## 📜 Licence

Ce projet est sous **[Business Source License 1.1 (BSL 1.1)](https://mariadb.com/bsl11)**.

### 🆓 Utilisation gratuite autorisée

- Usage **personnel** et **non-commercial**
- Éducation, formation et tests
- Évaluation du produit

### 💰 Utilisation commerciale

Toute utilisation **commerciale** nécessite une **licence payante** :

- Déploiement en production
- Intégration dans un produit ou service payant
- Utilisation dans un contexte générant des revenus (directement ou indirectement)

### ⏳ Transition vers l'open source

Ce projet passera automatiquement sous **licence Apache 2.0** le **1er janvier 2030** (4 ans après la première publication).

### 📄 Obtenir une licence commerciale

Pour une licence commerciale, contactez-nous : </br>
📧 **contact@unitable.fr**
🌐 [**unitable.fr**](https://www.unitable.fr)

---

## 👤 Auteurs

| 📌 **Romain Authier** </br> 📧 [dankysten](https://github.com/dankysten) | 📌 **Fabien D.** </br> 📧 [tunguskha](https://github.com/tunguskha) | 📌 **Yécine H.** </br> 📧 [yecinepro-dot](https://github.com/yecinepro-dot) |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------- | --------------------------------------------------------------------------- |

---

> _"Gérez votre organisation partout, à tout moment."_ 📱✨
