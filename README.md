# 📱 UniTable — Application mobile

Application mobile des employés d'UniTable, une solution de gestion du personnel pour la restauration : chaque employé consulte ses services du jour et son planning de la semaine, établis par son manager depuis le back-office.

Réalisé en équipe de 3, en sprint de 10 jours.

| Repo | Rôle |
| ---- | ---- |
| [unitable-backend](https://github.com/romainauthier-1/unitable-backend) | API REST |
| [unitable-frontend-desktop](https://github.com/romainauthier-1/unitable-frontend-desktop) | back-office web des managers · [démo](https://unitable-frontend-desktop.vercel.app) |
| **unitable-frontend-mobile** (ce repo) | application mobile des employés · [démo](https://unitable-mobile.vercel.app) |

![Expo](https://img.shields.io/badge/Expo-54-000020?logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-0.81-61DAFB?logo=react&logoColor=black)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2-764ABC?logo=redux&logoColor=white)

---

## Fonctionnalités

- **Connexion de l'employé** avec le compte créé par son manager. La session est conservée entre deux ouvertures de l'app.
- **Accueil** : services du jour de l’employé (horaires et pause), ou « Repos » s’il ne travaille pas.
- **Planning** : vue de la semaine, navigation d'une semaine à l'autre.
- **Profil** : modification du prénom et déconnexion.
- **Multi-plateforme** : iOS, Android et web à partir d'une seule base de code.

## Stack technique

| Domaine | Choix |
| ------- | ----- |
| Framework | Expo 54, React Native 0.81, React 19, react-native-web |
| État | Redux Toolkit + redux-persist (AsyncStorage) |
| Navigation | React Navigation 6 (onglets) |
| Dates et icônes | Day.js, Font Awesome |

## Installation

Prérequis : Node.js 20+, [corepack](https://nodejs.org/api/corepack.html) (active la bonne version de Yarn), et l'[API UniTable](https://github.com/romainauthier-1/unitable-backend) lancée en local (ou l'URL déployée).

```bash
git clone https://github.com/romainauthier-1/unitable-frontend-mobile.git
cd unitable-frontend-mobile
corepack enable
yarn install
cp .env.example .env    # renseigner EXPO_PUBLIC_BACK_URL
yarn start              # puis : scanner le QR code avec Expo Go, ou touche "w" pour le web
```

| Variable | Rôle |
| -------- | ---- |
| `EXPO_PUBLIC_BACK_URL` | URL de l'API (ex. `http://localhost:3000`) |

## Structure

```
App.js            store Redux, navigation (connexion / onglets)
src/screens/      Login, Home, Planning, Profile
src/reducers/     authentification, store
src/theme/        couleurs
```

---

## 👤 Auteurs

| 📌 **Romain Authier** </br> 📧 [dankysten](https://github.com/dankysten) | 📌 **Fabien D.** </br> 📧 [tunguskha](https://github.com/tunguskha) | 📌 **Yécine H.** </br> 📧 [yecinepro-dot](https://github.com/yecinepro-dot) |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------- | --------------------------------------------------------------------------- |
