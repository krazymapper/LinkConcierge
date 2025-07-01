// Données d'exemple pour tester LinkConcierge
// À exécuter dans la console du navigateur pour ajouter des liens de test

const sampleLinks = [
    {
        id: "1",
        url: "https://github.com",
        title: "GitHub - Where the world builds software",
        category: "Développement",
        icon: "🐙",
        createdAt: "2024-01-15T10:30:00.000Z",
        domain: "github.com"
    },
    {
        id: "2",
        url: "https://stackoverflow.com",
        title: "Stack Overflow - Where Developers Learn, Share, & Build Careers",
        category: "Développement",
        icon: "💻",
        createdAt: "2024-01-14T15:45:00.000Z",
        domain: "stackoverflow.com"
    },
    {
        id: "3",
        url: "https://developer.mozilla.org",
        title: "MDN Web Docs - Learn web development",
        category: "Documentation",
        icon: "📚",
        createdAt: "2024-01-13T09:20:00.000Z",
        domain: "developer.mozilla.org"
    },
    {
        id: "4",
        url: "https://css-tricks.com",
        title: "CSS-Tricks - Tips, Tricks, and Techniques on using Cascading Style Sheets",
        category: "CSS",
        icon: "🎨",
        createdAt: "2024-01-12T14:15:00.000Z",
        domain: "css-tricks.com"
    },
    {
        id: "5",
        url: "https://www.smashingmagazine.com",
        title: "Smashing Magazine — For Web Designers And Developers",
        category: "Design",
        icon: "💡",
        createdAt: "2024-01-11T11:30:00.000Z",
        domain: "smashingmagazine.com"
    },
    {
        id: "6",
        url: "https://www.youtube.com",
        title: "YouTube - Broadcast Yourself",
        category: "Vidéo",
        icon: "📺",
        createdAt: "2024-01-10T16:20:00.000Z",
        domain: "youtube.com"
    },
    {
        id: "7",
        url: "https://medium.com",
        title: "Medium – Where good ideas find you",
        category: "Lecture",
        icon: "📖",
        createdAt: "2024-01-09T13:45:00.000Z",
        domain: "medium.com"
    },
    {
        id: "8",
        url: "https://www.notion.so",
        title: "Notion – The all-in-one workspace for your notes, docs, wikis, and projects",
        category: "Productivité",
        icon: "📝",
        createdAt: "2024-01-08T08:30:00.000Z",
        domain: "notion.so"
    },
    // Tutoriels Google Earth Engine - Analyse des données climatiques
    {
        id: "gee-1",
        url: "https://lnkd.in/ddsKiA7x",
        title: "Drought Mapping - Google Earth Engine Tutorial",
        category: "Google Earth Engine",
        icon: "🌍",
        createdAt: "2024-01-20T10:00:00.000Z",
        domain: "lnkd.in"
    },
    {
        id: "gee-2",
        url: "https://lnkd.in/dif6sxKw",
        title: "Drought Monitoring - Google Earth Engine Tutorial",
        category: "Google Earth Engine",
        icon: "🌍",
        createdAt: "2024-01-20T10:01:00.000Z",
        domain: "lnkd.in"
    },
    {
        id: "gee-3",
        url: "https://lnkd.in/dEPn8qdb",
        title: "Drought Temporal Classification - Google Earth Engine Tutorial",
        category: "Google Earth Engine",
        icon: "🌍",
        createdAt: "2024-01-20T10:02:00.000Z",
        domain: "lnkd.in"
    },
    {
        id: "gee-4",
        url: "https://lnkd.in/dAy65aMb",
        title: "Precipitation Mapping - Google Earth Engine Tutorial",
        category: "Google Earth Engine",
        icon: "🌍",
        createdAt: "2024-01-20T10:03:00.000Z",
        domain: "lnkd.in"
    },
    {
        id: "gee-5",
        url: "https://lnkd.in/d74tJTbX",
        title: "Precipitation Downscaling - Google Earth Engine Tutorial",
        category: "Google Earth Engine",
        icon: "🌍",
        createdAt: "2024-01-20T10:04:00.000Z",
        domain: "lnkd.in"
    },
    {
        id: "gee-6",
        url: "https://lnkd.in/d33YicZ5",
        title: "Precipitation Anomaly - Google Earth Engine Tutorial",
        category: "Google Earth Engine",
        icon: "🌍",
        createdAt: "2024-01-20T10:05:00.000Z",
        domain: "lnkd.in"
    },
    {
        id: "gee-7",
        url: "https://lnkd.in/dzywG4id",
        title: "Preparing Precipitation Data - Google Earth Engine Tutorial",
        category: "Google Earth Engine",
        icon: "🌍",
        createdAt: "2024-01-20T10:06:00.000Z",
        domain: "lnkd.in"
    },
    {
        id: "gee-8",
        url: "https://lnkd.in/dRcu2P4T",
        title: "Number of Dry and Wet Days - Google Earth Engine Tutorial",
        category: "Google Earth Engine",
        icon: "🌍",
        createdAt: "2024-01-20T10:07:00.000Z",
        domain: "lnkd.in"
    },
    {
        id: "gee-9",
        url: "https://lnkd.in/dDc-AwYP",
        title: "Climate Data Classification - Google Earth Engine Tutorial",
        category: "Google Earth Engine",
        icon: "🌍",
        createdAt: "2024-01-20T10:08:00.000Z",
        domain: "lnkd.in"
    },
    {
        id: "gee-10",
        url: "https://lnkd.in/dvb_YYJF",
        title: "Temperature Downscaling - Google Earth Engine Tutorial",
        category: "Google Earth Engine",
        icon: "🌍",
        createdAt: "2024-01-20T10:09:00.000Z",
        domain: "lnkd.in"
    },
    {
        id: "gee-11",
        url: "https://lnkd.in/gaDnATcs",
        title: "Temperature Trend Analysis - Google Earth Engine Tutorial",
        category: "Google Earth Engine",
        icon: "🌍",
        createdAt: "2024-01-20T10:10:00.000Z",
        domain: "lnkd.in"
    },
    {
        id: "gee-12",
        url: "https://lnkd.in/dhZU69wZ",
        title: "Number of Frost Days - Google Earth Engine Tutorial",
        category: "Google Earth Engine",
        icon: "🌍",
        createdAt: "2024-01-20T10:11:00.000Z",
        domain: "lnkd.in"
    },
    // Sources gratuites de shapefiles
    {
        id: "shp-1",
        url: "https://lnkd.in/dt9HdxVU",
        title: "Geofabrik (OSM Extracts) – OpenStreetMap shapefile par continent et pays",
        category: "Sources de shapefiles",
        icon: "🗺️",
        createdAt: "2024-01-21T10:00:00.000Z",
        domain: "lnkd.in"
    },
    {
        id: "shp-2",
        url: "https://lnkd.in/d9UXnmiE",
        title: "DIVA-GIS – Limites administratives, routes, rivières, élévation, occupation du sol",
        category: "Sources de shapefiles",
        icon: "🗺️",
        createdAt: "2024-01-21T10:01:00.000Z",
        domain: "lnkd.in"
    },
    {
        id: "shp-3",
        url: "https://gadm.org",
        title: "GADM – Limites administratives mondiales détaillées",
        category: "Sources de shapefiles",
        icon: "🗺️",
        createdAt: "2024-01-21T10:02:00.000Z",
        domain: "gadm.org"
    },
    {
        id: "shp-4",
        url: "https://data.humdata.org",
        title: "Humanitarian Data Exchange (HDX) – Données SIG humanitaires et développement",
        category: "Sources de shapefiles",
        icon: "🗺️",
        createdAt: "2024-01-21T10:03:00.000Z",
        domain: "data.humdata.org"
    },
    {
        id: "shp-5",
        url: "https://overpass-turbo.eu",
        title: "OpenStreetMap (Overpass Turbo) – Extraction de données prêtes pour shapefile",
        category: "Sources de shapefiles",
        icon: "🗺️",
        createdAt: "2024-01-21T10:04:00.000Z",
        domain: "overpass-turbo.eu"
    },
    {
        id: "shp-6",
        url: "https://mapcruzin.com",
        title: "MapCruzin – Jeux de données shapefile environnement, démographie, infrastructures",
        category: "Sources de shapefiles",
        icon: "🗺️",
        createdAt: "2024-01-21T10:05:00.000Z",
        domain: "mapcruzin.com"
    },
    {
        id: "shp-7",
        url: "https://lnkd.in/dbbVC55x",
        title: "FAO/UNESCO – Données pédologiques mondiales à l'échelle 1:5 000 000",
        category: "Sources de shapefiles",
        icon: "🗺️",
        createdAt: "2024-01-21T10:06:00.000Z",
        domain: "lnkd.in"
    },
    {
        id: "shp-8",
        url: "https://lnkd.in/d7pdxhsA",
        title: "USGS – Données géologiques mondiales",
        category: "Sources de shapefiles",
        icon: "🗺️",
        createdAt: "2024-01-21T10:07:00.000Z",
        domain: "lnkd.in"
    },
    {
        id: "shp-9",
        url: "https://rsis.ramsar.org/",
        title: "Ramsar – Zones humides d'importance internationale (sites Ramsar)",
        category: "Sources de shapefiles",
        icon: "🗺️",
        createdAt: "2024-01-21T10:08:00.000Z",
        domain: "rsis.ramsar.org"
    },
    {
        id: "shp-10",
        url: "https://lnkd.in/dGCAPU_h",
        title: "World Bank Data Catalog – Données shapefile sur le développement, urbanisation, environnement",
        category: "Sources de shapefiles",
        icon: "🗺️",
        createdAt: "2024-01-21T10:09:00.000Z",
        domain: "lnkd.in"
    },
];

// Fonction pour ajouter les données d'exemple
function addSampleData() {
    console.log('📝 Ajout des données d\'exemple...');
    
    // Récupérer les liens existants
    const existingLinks = JSON.parse(localStorage.getItem('linkconcierge-links') || '[]');
    
    // Ajouter les nouveaux liens (éviter les doublons)
    const newLinks = sampleLinks.filter(sampleLink => 
        !existingLinks.some(existingLink => existingLink.url === sampleLink.url)
    );
    
    if (newLinks.length === 0) {
        console.log('ℹ️  Tous les liens d\'exemple sont déjà présents !');
        return;
    }
    
    // Ajouter les nouveaux liens
    const updatedLinks = [...newLinks, ...existingLinks];
    localStorage.setItem('linkconcierge-links', JSON.stringify(updatedLinks));
    
    console.log(`✅ ${newLinks.length} liens d'exemple ajoutés !`);
    console.log('🔄 Rechargez la page pour voir les nouveaux liens.');
    
    // Recharger la page automatiquement
    setTimeout(() => {
        window.location.reload();
    }, 1000);
}

// Fonction pour supprimer toutes les données
function clearAllData() {
    if (confirm('Êtes-vous sûr de vouloir supprimer tous les liens ?')) {
        localStorage.removeItem('linkconcierge-links');
        localStorage.removeItem('linkconcierge-theme');
        console.log('🗑️  Toutes les données ont été supprimées.');
        window.location.reload();
    }
}

// Fonction pour afficher les statistiques
function showStats() {
    const links = JSON.parse(localStorage.getItem('linkconcierge-links') || '[]');
    const categories = [...new Set(links.map(link => link.category))];
    
    console.log('📊 Statistiques LinkConcierge:');
    console.log(`📈 Nombre total de liens: ${links.length}`);
    console.log(`📁 Nombre de catégories: ${categories.length}`);
    console.log(`📅 Catégories: ${categories.join(', ')}`);
    
    if (links.length > 0) {
        const oldestLink = links[links.length - 1];
        const newestLink = links[0];
        console.log(`📅 Plus ancien lien: ${oldestLink.title} (${new Date(oldestLink.createdAt).toLocaleDateString()})`);
        console.log(`📅 Plus récent lien: ${newestLink.title} (${new Date(newestLink.createdAt).toLocaleDateString()})`);
    }
}

// Exposer les fonctions globalement
window.LinkConciergeUtils = {
    addSampleData,
    clearAllData,
    showStats
};

console.log('🔗 LinkConcierge - Utilitaires de test chargés !');
console.log('📝 Utilisez LinkConciergeUtils.addSampleData() pour ajouter des données d\'exemple');
console.log('🗑️  Utilisez LinkConciergeUtils.clearAllData() pour supprimer toutes les données');
console.log('📊 Utilisez LinkConciergeUtils.showStats() pour voir les statistiques'); 