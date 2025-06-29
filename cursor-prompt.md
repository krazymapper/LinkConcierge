# 🚀 Cursor AI Prompt – Projet LinkConcierge

## 🎯 Objectif
Développer un site statique nommé **LinkConcierge**, hébergé sur **GitHub Pages**, permettant aux utilisateurs de **sauvegarder, organiser et partager des liens web**. L'application doit être responsive, mobile-friendly et fonctionner hors-ligne (PWA).

---

## 🧑‍💻 Stack technique

- **Frontend** : HTML5 + Tailwind CSS (via CDN ou build Vite)
- **JavaScript** : Vanilla ES6+
- **Interactivité (bonus)** : Alpine.js ou Preact (léger)
- **Persistance des données** : `localStorage` (aucun backend)
- **Outils** : Vite.js pour bundling & déploiement GitHub Pages

---

## ✅ Fonctionnalités principales

### 1. Ajout / Suppression de liens
- Formulaire avec champs :
  - `URL`
  - `Titre`
  - `Catégorie`
  - `Icône` (optionnelle)
- Validation simple des URLs (`URL()` ou regex)
- Bouton pour supprimer un lien

### 2. Organisation
- Catégories personnalisables (ex : "Voyage", "Tech", etc.)
- Recherche et filtrage instantané
- Tri par date, titre, ou catégorie

### 3. Partage
- Génération d’une URL partageable (e.g. `/share/12345`)
- Export des données en JSON ou Markdown

### 4. UI/UX
- Design inspiré de [Raindrop.io](https://raindrop.io) / [LinkAce](https://www.linkace.org)
- Thème sombre/clair (toggle CSS)
- Animations Tailwind (transitions, effets au survol)

### 5. PWA
- Manifest.json avec nom, icônes, thème
- Service Worker (`sw.js`) pour mise en cache
- Fonctionnement hors-ligne
- Installation "Ajouter à l'écran d'accueil"

### 6. SEO
- HTML sémantique (`<main>`, `<section>`, etc.)
- Meta tags (`title`, `description`, `og:*`, etc.)

---

## 📁 Arborescence attendue

/linkconcierge/
├── index.html
├── styles/
│ └── main.css # Tailwind CSS compilé
├── scripts/
│ ├── app.js # Logique gestion des liens
│ └── pwa.js # Logiciel PWA (sw/manifest)
├── assets/
│ └── icons/ # Icônes PWA + favicon
├── manifest.json # Déclaration PWA
├── sw.js # Service Worker
└── README.md # Instructions projet

---

## 📘 README.md attendu

Le fichier `README.md` doit contenir :
- Présentation du projet
- Instructions pour :
  - Installation locale avec `Vite`
  - Lancer en mode dev
  - Compiler pour production
  - Déployer sur GitHub Pages
- Détails sur le fonctionnement PWA
- Infos sur l'export JSON/Markdown
- Infos sur la structure des données locales

---

## 🔁 Bonus

- Préparer une base pour la traduction (i18n simple, FR/EN)
- Génération de données encodées dans l’URL (`base64`)
- Animation légère à l’ajout d’un lien (fade/scale in)

---

## ⚙️ Instructions pour Cursor

1. Crée tous les fichiers de l’arborescence.
2. Implémente un formulaire d’ajout fonctionnel.
3. Utilise Tailwind pour un design clair et responsive.
4. Génère un `manifest.json` basique et un `sw.js` vide prêt à étendre.
5. Rédige un `README.md` clair pour onboarding rapide.
