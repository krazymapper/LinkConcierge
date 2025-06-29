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
    }
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