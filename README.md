# 🔗 LinkConcierge

Une application web statique pour sauvegarder, organiser et partager vos liens favoris. Fonctionne hors-ligne et est responsive.

## ✨ Fonctionnalités

- **Ajout/Suppression de liens** avec titre, URL, catégorie et icône
- **Organisation** par catégories personnalisables
- **Recherche et filtrage** instantané
- **Tri** par date, titre ou catégorie
- **Thème sombre/clair** avec toggle
- **Export** des données en JSON
- **PWA** (Progressive Web App) avec installation native
- **Fonctionnement hors-ligne** complet
- **Design responsive** et moderne

## 🚀 Installation et développement

### Prérequis

- Node.js (version 16 ou supérieure)
- npm ou yarn

### Installation locale

1. **Cloner le repository**
   ```bash
   git clone https://github.com/votre-username/linkconcierge.git
   cd linkconcierge
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer en mode développement**
   ```bash
   npm run dev
   ```
   
   L'application sera accessible sur `http://localhost:3000`

### Compilation pour production

```bash
npm run build
```

Les fichiers de production seront générés dans le dossier `dist/`.

### Prévisualisation de la production

```bash
npm run preview
```

## 📦 Déploiement sur GitHub Pages

### Configuration automatique

1. **Créer un repository GitHub** nommé `linkconcierge`

2. **Pousser le code**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. **Déployer**
   ```bash
   npm run deploy
   ```

4. **Configurer GitHub Pages**
   - Aller dans Settings > Pages
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Folder: / (root)

L'application sera accessible sur `https://votre-username.github.io/linkconcierge/`

### Configuration manuelle

Si vous préférez configurer manuellement :

1. **Compiler le projet**
   ```bash
   npm run build
   ```

2. **Créer une branche gh-pages**
   ```bash
   git checkout -b gh-pages
   git add dist -f
   git commit -m "Deploy to GitHub Pages"
   git push origin gh-pages
   ```

3. **Configurer GitHub Pages** comme ci-dessus

## 🏗️ Structure du projet

```
linkconcierge/
├── index.html              # Page principale
├── manifest.json           # Configuration PWA
├── sw.js                   # Service Worker
├── package.json            # Dépendances et scripts
├── vite.config.js          # Configuration Vite
├── tailwind.config.js      # Configuration Tailwind CSS
├── postcss.config.js       # Configuration PostCSS
├── scripts/
│   ├── app.js              # Logique principale de l'application
│   └── pwa.js              # Gestion PWA et installation
├── assets/
│   ├── icons/              # Icônes PWA (à créer)
│   └── screenshots/        # Captures d'écran (à créer)
└── README.md               # Ce fichier
```

## 💾 Structure des données

Les liens sont stockés dans le `localStorage` du navigateur avec la structure suivante :

```json
{
  "id": "1234567890",
  "url": "https://example.com",
  "title": "Titre du lien",
  "category": "Tech",
  "icon": "🔗",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "domain": "example.com"
}
```

### Clés localStorage

- `linkconcierge-links` : Liste des liens sauvegardés
- `linkconcierge-theme` : Thème actuel (light/dark)

## 🎨 Personnalisation

### Thèmes

L'application utilise Tailwind CSS avec un système de thème sombre/clair. Les couleurs principales sont définies dans `tailwind.config.js`.

### Icônes PWA

Pour personnaliser les icônes PWA :

1. Créer des icônes aux tailles suivantes :
   - 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512

2. Les placer dans `assets/icons/`

3. Mettre à jour `manifest.json` si nécessaire

## 🔧 Fonctionnalités PWA

### Installation

L'application peut être installée comme une application native sur :
- **Chrome/Edge** : Bouton d'installation dans la barre d'adresse
- **Safari** : Ajouter à l'écran d'accueil
- **Firefox** : Bouton d'installation dans le menu

### Fonctionnement hors-ligne

- **Cache statique** : HTML, CSS, JS, manifest
- **Cache dynamique** : Images et autres ressources
- **Stratégie** : Network first, fallback to cache

### Mises à jour

Le service worker détecte automatiquement les nouvelles versions et affiche une notification de mise à jour.

## 📱 Compatibilité

- **Navigateurs** : Chrome 60+, Firefox 55+, Safari 11+, Edge 79+
- **PWA** : Tous les navigateurs modernes
- **Responsive** : Mobile, tablette, desktop
- **Hors-ligne** : Fonctionne sans connexion internet

## 🚀 Améliorations futures

- [ ] Import de liens depuis d'autres services
- [ ] Partage de collections de liens
- [ ] Synchronisation cloud (optionnelle)
- [ ] Tags multiples par lien
- [ ] Recherche avancée
- [ ] Export en Markdown
- [ ] Thèmes personnalisables
- [ ] Notifications push
- [ ] Mode collaboratif

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- [Tailwind CSS](https://tailwindcss.com/) pour le framework CSS
- [Vite](https://vitejs.dev/) pour le bundler
- [PWA Builder](https://www.pwabuilder.com/) pour les bonnes pratiques PWA

---

**LinkConcierge** - Organisez vos liens, simplifiez votre navigation ! 🔗✨ 