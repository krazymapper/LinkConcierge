# 🚀 Guide de déploiement LinkConcierge

## ✅ Problèmes résolus

Les problèmes de cartes qui n'apparaissaient pas sur GitHub Pages et Vercel ont été corrigés :

### **1. Chemins relatifs**
- ✅ Tous les chemins utilisent maintenant `./` au lieu de `/`
- ✅ Configuration Vite adaptée pour la production
- ✅ Service Worker avec chemins relatifs

### **2. Fichiers manquants**
- ✅ `manifest.json` copié à la racine du build
- ✅ `sw.js` copié à la racine du build
- ✅ Dossier `public/` configuré correctement

### **3. Configuration Vercel**
- ✅ `vercel.json` avec configuration complète
- ✅ Headers appropriés pour PWA
- ✅ Routes configurées pour SPA

## 📦 Déploiement GitHub Pages

### **Option 1 : Déploiement automatique**
```bash
npm run deploy
```

### **Option 2 : Déploiement manuel**
1. **Build du projet**
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

3. **Configurer GitHub Pages**
   - Aller dans Settings > Pages
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Folder: / (root)

## 🌐 Déploiement Vercel

### **Option 1 : Interface web**
1. Connectez-vous sur [vercel.com](https://vercel.com)
2. Importez votre repository GitHub
3. Vercel détectera automatiquement la configuration

### **Option 2 : CLI Vercel**
```bash
npm i -g vercel
vercel
```

## 🔧 Configuration spécifique

### **GitHub Pages**
- Base path : `./` (chemins relatifs)
- Dossier de build : `dist/`
- Fichiers statiques : `public/`

### **Vercel**
- Configuration : `vercel.json`
- Build command : `npm run build`
- Output directory : `dist`
- Headers PWA configurés

## 🧪 Test du déploiement

### **Fonctionnalités à vérifier**
1. ✅ **Chargement de la page** sans erreurs
2. ✅ **Bouton "🧪 Test Data"** fonctionne
3. ✅ **Ajout de liens** manuels
4. ✅ **Recherche et filtrage**
5. ✅ **Thème sombre/clair**
6. ✅ **Export JSON**
7. ✅ **PWA** (installation possible)

### **Console du navigateur**
Vérifiez qu'il n'y a pas d'erreurs :
- ✅ Service Worker enregistré
- ✅ Manifest chargé
- ✅ Scripts chargés

## 🐛 Dépannage

### **Si les cartes n'apparaissent toujours pas :**
1. **Vérifiez la console** pour les erreurs
2. **Testez le bouton "🧪 Test Data"**
3. **Vérifiez le localStorage** dans les outils développeur
4. **Rechargez la page** (Ctrl+F5)

### **Erreurs courantes :**
- **404 sur les scripts** : Vérifiez les chemins dans `dist/`
- **Service Worker non enregistré** : Vérifiez `sw.js` à la racine
- **Manifest non trouvé** : Vérifiez `manifest.json` à la racine

## 📱 PWA

### **Installation**
- **Chrome/Edge** : Bouton d'installation dans la barre d'adresse
- **Safari** : Ajouter à l'écran d'accueil
- **Firefox** : Bouton d'installation dans le menu

### **Fonctionnement hors-ligne**
- ✅ Cache des ressources statiques
- ✅ Fonctionnement sans connexion
- ✅ Mises à jour automatiques

## 🎉 Résultat

Votre LinkConcierge devrait maintenant fonctionner parfaitement sur :
- ✅ **GitHub Pages**
- ✅ **Vercel**
- ✅ **Netlify** (configuration similaire)
- ✅ **Tout autre hébergeur statique**

Les 44 liens de test (développement, topographie, Google Earth Engine, LiDAR, GIS) sont prêts à être utilisés ! 🚀 