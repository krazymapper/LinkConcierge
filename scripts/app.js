// LinkConcierge - Main Application Logic

import { sampleLinks } from '../sample-data.js';

class LinkConcierge {
    constructor() {
        // Initialisation automatique des données d'exemple si aucune donnée n'est présente
        if (!localStorage.getItem('linkconcierge-links')) {
            localStorage.setItem('linkconcierge-links', JSON.stringify(sampleLinks));
        }
        this.links = this.loadLinks();
        this.currentFilter = '';
        this.currentSort = 'date';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupTheme();
        this.renderLinks();
        this.updateCategoryFilter();
    }

    // Local Storage Management
    loadLinks() {
        const stored = localStorage.getItem('linkconcierge-links');
        return stored ? JSON.parse(stored) : [];
    }

    saveLinks() {
        localStorage.setItem('linkconcierge-links', JSON.stringify(this.links));
    }

    // Theme Management
    setupTheme() {
        const theme = localStorage.getItem('linkconcierge-theme') || 'light';
        this.setTheme(theme);
        this.updateThemeToggle();
    }

    setTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('linkconcierge-theme', theme);
    }

    toggleTheme() {
        const isDark = document.documentElement.classList.contains('dark');
        this.setTheme(isDark ? 'light' : 'dark');
        this.updateThemeToggle();
    }

    updateThemeToggle() {
        const isDark = document.documentElement.classList.contains('dark');
        const sunIcon = document.getElementById('sun-icon');
        const moonIcon = document.getElementById('moon-icon');

        if (isDark) {
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        } else {
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        }
    }

    // Event Listeners
    setupEventListeners() {
        // Form submission
        document.getElementById('add-link-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addLink();
        });

        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Search
        document.getElementById('search-input').addEventListener('input', (e) => {
            this.currentFilter = e.target.value;
            this.renderLinks();
        });

        // Category filter
        document.getElementById('category-filter').addEventListener('change', (e) => {
            this.currentFilter = e.target.value;
            this.renderLinks();
        });

        // Sort
        document.getElementById('sort-by').addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.renderLinks();
        });

        // Export
        document.getElementById('export-btn').addEventListener('click', () => {
            this.exportLinks();
        });

        // Test Data Button
        const testDataBtn = document.getElementById('test-data-btn');
        if (testDataBtn) {
            testDataBtn.addEventListener('click', () => {
                // Add sample data
                const sampleLinks = [
                    {
                        id: Date.now().toString(),
                        url: "https://github.com",
                        title: "GitHub - Where the world builds software",
                        category: "Développement",
                        icon: "🐙",
                        createdAt: new Date().toISOString(),
                        domain: "github.com"
                    },
                    {
                        id: (Date.now() + 1).toString(),
                        url: "https://stackoverflow.com",
                        title: "Stack Overflow - Where Developers Learn, Share, & Build Careers",
                        category: "Développement",
                        icon: "💻",
                        createdAt: new Date().toISOString(),
                        domain: "stackoverflow.com"
                    },
                    {
                        id: (Date.now() + 2).toString(),
                        url: "https://developer.mozilla.org",
                        title: "MDN Web Docs - Learn web development",
                        category: "Documentation",
                        icon: "📚",
                        createdAt: new Date().toISOString(),
                        domain: "developer.mozilla.org"
                    }
                ];

                this.links.unshift(...sampleLinks);
                this.saveLinks();
                this.renderLinks();
                this.updateCategoryFilter();
                this.showToast('Données de test ajoutées !');
            });
        }
    }

    // Link Management
    addLink() {
        const form = document.getElementById('add-link-form');
        const formData = new FormData(form);

        const url = formData.get('url').trim();
        const title = formData.get('title').trim();
        const category = formData.get('category').trim() || 'Général';
        const icon = formData.get('icon').trim() || '🔗';

        if (!url || !title) {
            alert('Veuillez remplir l\'URL et le titre');
            return;
        }

        if (!this.isValidUrl(url)) {
            alert('Veuillez entrer une URL valide');
            return;
        }

        const link = {
            id: Date.now().toString(),
            url,
            title,
            category,
            icon,
            createdAt: new Date().toISOString(),
            domain: this.extractDomain(url)
        };

        this.links.unshift(link);
        this.saveLinks();
        this.renderLinks();
        this.updateCategoryFilter();

        // Reset form
        form.reset();

        // Show success animation
        this.showToast('Lien ajouté avec succès !');
    }

    deleteLink(id) {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce lien ?')) {
            this.links = this.links.filter(link => link.id !== id);
            this.saveLinks();
            this.renderLinks();
            this.updateCategoryFilter();
            this.showToast('Lien supprimé.');
        }
    }

    // URL Validation and Domain Extraction
    isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    extractDomain(url) {
        try {
            return new URL(url).hostname.replace('www.', '');
        } catch {
            return 'unknown';
        }
    }

    // Rendering
    renderLinks() {
        const container = document.getElementById('links-container');
        const emptyState = document.getElementById('empty-state');

        let filteredLinks = this.filterLinks();
        filteredLinks = this.sortLinks(filteredLinks);

        if (filteredLinks.length === 0) {
            container.innerHTML = '';
            this.renderEmptyState();
            return;
        }

        emptyState.classList.add('hidden');

        const groupedLinks = this.groupLinksByCategory(filteredLinks);
        container.innerHTML = this.renderGroupedLinks(groupedLinks);

        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-link-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.closest('.link-card').dataset.id;
                this.deleteLink(id);
            });
        });
    }

    filterLinks() {
        let filtered = this.links;

        if (this.currentFilter) {
            const searchTerm = this.currentFilter.toLowerCase();
            filtered = filtered.filter(link =>
                link.title.toLowerCase().includes(searchTerm) ||
                link.url.toLowerCase().includes(searchTerm) ||
                link.category.toLowerCase().includes(searchTerm)
            );
        }

        return filtered;
    }

    sortLinks(links) {
        return links.sort((a, b) => {
            switch (this.currentSort) {
                case 'title':
                    return a.title.localeCompare(b.title);
                case 'category':
                    return a.category.localeCompare(b.category);
                case 'date':
                default:
                    return new Date(b.createdAt) - new Date(a.createdAt);
            }
        });
    }

    groupLinksByCategory(links) {
        const groups = {};
        links.forEach(link => {
            if (!groups[link.category]) {
                groups[link.category] = [];
            }
            groups[link.category].push(link);
        });
        return groups;
    }

    renderGroupedLinks(groupedLinks) {
        return Object.entries(groupedLinks).map(([category, links]) => `
            <div class="mb-8 animate-fade-in">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <span class="mr-2">📁</span>
                    ${category}
                    <span class="ml-2 text-sm text-gray-500 dark:text-gray-400">(${links.length})</span>
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    ${links.map(link => this.renderLinkCard(link)).join('')}
                </div>
            </div>
        `).join('');
    }

    renderLinkCard(link) {
        const date = new Date(link.createdAt).toLocaleDateString();
        return `
            <div class="bg-slate-900 border border-slate-700 rounded-lg shadow-sm p-4 flex flex-col gap-2 transition hover:shadow-lg">
                <div class="flex items-center gap-2 mb-1">
                    <span class="text-2xl">${this.escapeHtml(link.icon || '🔗')}</span>
                    <a href="${this.escapeHtml(link.url)}" target="_blank" rel="noopener" class="text-lg font-semibold text-emerald-500 hover:underline truncate" title="${this.escapeHtml(link.title)}">
                        ${this.escapeHtml(link.title)}
                    </a>
                </div>
                <div class="flex items-center justify-between text-xs">
                    <span class="text-slate-400">${date}</span>
                    <span class="px-2 py-1 bg-slate-800 text-emerald-500 border border-emerald-500 rounded-full text-xs ml-2">
                        ${this.escapeHtml(link.category)}
                    </span>
                </div>
                <div class="flex gap-2 mt-2">
                    <button class="px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md text-xs font-medium transition-colors active:scale-95 focus:outline-none" data-action="edit" data-id="${link.id}" aria-label="Éditer le lien ${this.escapeHtml(link.title)}">Éditer</button>
                    <button class="px-3 py-2 bg-slate-800 hover:bg-emerald-600 text-emerald-500 border border-emerald-500 rounded-md text-xs font-medium transition-colors active:scale-95 focus:outline-none" data-action="delete" data-id="${link.id}" aria-label="Supprimer le lien ${this.escapeHtml(link.title)}">Supprimer</button>
                </div>
            </div>
        `;
    }

    updateCategoryFilter() {
        const categories = [...new Set(this.links.map(link => link.category))].sort();
        const select = document.getElementById('category-filter');

        // Keep current selection
        const currentValue = select.value;

        // Clear existing options except the first one
        select.innerHTML = '<option value="">Toutes les catégories</option>';

        // Add category options
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            select.appendChild(option);
        });

        // Restore selection if it still exists
        if (categories.includes(currentValue)) {
            select.value = currentValue;
        }
    }

    // Export functionality
    exportLinks() {
        const data = {
            links: this.links,
            exportedAt: new Date().toISOString(),
            version: '1.0'
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `linkconcierge-export-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showToast('Export terminé !');
    }

    // Utility functions
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showToast(message) {
        let toast = document.getElementById('toast-feedback');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast-feedback';
            toast.className = 'fixed left-1/2 bottom-8 -translate-x-1/2 bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 text-base font-semibold animate-fade-in';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.remove('hidden');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 2000);
    }

    renderEmptyState() {
        const container = document.getElementById('empty-state');
        if (container) {
            container.innerHTML = `
                <div class="text-emerald-500 text-6xl mb-4">🔗</div>
                <h3 class="text-lg font-medium text-emerald-500 mb-2">Aucun lien sauvegardé</h3>
                <p class="text-slate-400">Commencez par ajouter votre premier lien ci-dessus !</p>
            `;
            container.classList.remove('hidden');
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize LinkConcierge on the main page
    if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
        new LinkConcierge();
    }
    
    const header = document.querySelector('header');
    if (header) {
        header.classList.add('sticky', 'top-0', 'z-40');
    }
});

// === Blog Editor Logic (blog.html) ===
if (window.location.pathname.includes('blog.html')) {
    // Helpers
    function getArticles() {
        return JSON.parse(localStorage.getItem('blogArticles') || '[]');
    }
    
    function saveArticles(articles) {
        localStorage.setItem('blogArticles', JSON.stringify(articles));
    }
    
    function escapeHtml(str) {
        return str.replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', '\'': '&#39;' }[c];
        });
    }
    
    function createWelcomeArticle() {
        const welcomeArticle = {
            title: "Bienvenue sur le blog LinkConcierge !",
            content: `Bienvenue sur le blog de **LinkConcierge** !

## Qu'est-ce que LinkConcierge ?

LinkConcierge est une application web moderne pour organiser et partager vos liens favoris. Elle vous permet de :

- **Sauvegarder** vos liens importants
- **Organiser** par catégories personnalisables
- **Rechercher** rapidement dans votre collection
- **Partager** vos collections avec d'autres
- **Exporter** vos données en JSON

## Fonctionnalités principales

- Interface moderne et responsive
- Thème sombre/clair
- Fonctionnement hors-ligne (PWA)
- Recherche et filtrage instantanés
- Export/Import de données
- Navigation intuitive

## Comment utiliser ce blog

Vous pouvez :
- **Publier** de nouveaux articles
- **Éditer** les articles existants
- **Supprimer** les articles
- Utiliser le **formatage Markdown** pour enrichir vos articles

*Bon blogging avec LinkConcierge !*`,
            html: `<strong>Bienvenue sur le blog de LinkConcierge !</strong><br><br><h2 class="text-lg font-semibold text-slate-100 mt-4 mb-2">Qu'est-ce que LinkConcierge ?</h2><br>LinkConcierge est une application web moderne pour organiser et partager vos liens favoris. Elle vous permet de :<br><br><ul class="list-disc pl-6 mb-2"><li>Sauvegarder vos liens importants</li></ul><ul class="list-disc pl-6 mb-2"><li>Organiser par catégories personnalisables</li></ul><ul class="list-disc pl-6 mb-2"><li>Rechercher rapidement dans votre collection</li></ul><ul class="list-disc pl-6 mb-2"><li>Partager vos collections avec d'autres</li></ul><ul class="list-disc pl-6 mb-2"><li>Exporter vos données en JSON</li></ul><br><h2 class="text-lg font-semibold text-slate-100 mt-4 mb-2">Fonctionnalités principales</h2><br><ul class="list-disc pl-6 mb-2"><li>Interface moderne et responsive</li></ul><ul class="list-disc pl-6 mb-2"><li>Thème sombre/clair</li></ul><ul class="list-disc pl-6 mb-2"><li>Fonctionnement hors-ligne (PWA)</li></ul><ul class="list-disc pl-6 mb-2"><li>Recherche et filtrage instantanés</li></ul><ul class="list-disc pl-6 mb-2"><li>Export/Import de données</li></ul><ul class="list-disc pl-6 mb-2"><li>Navigation intuitive</li></ul><br><h2 class="text-lg font-semibold text-slate-100 mt-4 mb-2">Comment utiliser ce blog</h2><br>Vous pouvez :<br><ul class="list-disc pl-6 mb-2"><li>Publier de nouveaux articles</li></ul><ul class="list-disc pl-6 mb-2"><li>Éditer les articles existants</li></ul><ul class="list-disc pl-6 mb-2"><li>Supprimer les articles</li></ul><ul class="list-disc pl-6 mb-2"><li>Utiliser le formatage Markdown pour enrichir vos articles</li></ul><br><em>Bon blogging avec LinkConcierge !</em>`,
            date: new Date('2024-01-15T10:00:00.000Z').toISOString()
        };
        return welcomeArticle;
    }
    
    function ensureWelcomeArticle() {
        const articles = getArticles();
        if (articles.length === 0) {
            const welcomeArticle = createWelcomeArticle();
            articles.push(welcomeArticle);
            saveArticles(articles);
            return true;
        }
        return false;
    }
    
    function updateCharCount() {
        const textarea = document.getElementById('article-content');
        const charCount = document.getElementById('char-count');
        if (textarea && charCount) {
            const count = textarea.value.length;
            charCount.textContent = count;
            
            // Change color based on length
            if (count > 1000) {
                charCount.className = 'text-red-400';
            } else if (count > 500) {
                charCount.className = 'text-yellow-400';
            } else {
                charCount.className = 'text-slate-400';
            }
        }
    }
    
    function updateArticlesCount() {
        const articles = getArticles();
        const countElement = document.getElementById('articles-count');
        if (countElement) {
            countElement.textContent = articles.length;
        }
    }
    
    function renderArticles() {
        const articles = getArticles().sort((a, b) => new Date(b.date) - new Date(a.date));
        const list = document.getElementById('articles-list');
        if (!list) return;
        
        if (articles.length === 0) {
            list.innerHTML = `
                <div class="text-center py-12 animate-fade-in">
                    <div class="text-6xl mb-4">📝</div>
                    <p class="text-slate-400 text-lg">Aucun article publié pour le moment.</p>
                    <p class="text-slate-500 text-sm mt-2">Commencez par rédiger votre premier article !</p>
                </div>
            `;
            return;
        }
        
        list.innerHTML = articles.map((article, idx) => `
            <article class="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-lg relative group hover:shadow-xl transition-all duration-300 animate-slide-up" style="animation-delay: ${idx * 0.1}s">
                <div class="flex items-start justify-between mb-4">
                    <h3 class="text-xl font-bold text-emerald-500 hover:text-emerald-400 transition-colors cursor-pointer">${escapeHtml(article.title)}</h3>
                    <div class="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button class="edit-article p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all transform hover:scale-105" data-idx="${idx}" title="Éditer">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                        </button>
                        <button class="delete-article p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-all transform hover:scale-105" data-idx="${idx}" title="Supprimer">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <div class="prose prose-sm prose-invert max-w-none mb-4 line-clamp-3">${article.html}</div>
                
                <div class="flex items-center justify-between text-sm text-slate-400 border-t border-slate-700 pt-4">
                    <div class="flex items-center space-x-4">
                        <span class="flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            ${new Date(article.date).toLocaleDateString('fr-FR', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </span>
                        <span class="flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                            </svg>
                            ${article.content.length} caractères
                        </span>
                    </div>
                </div>
            </article>
        `).join('');
        
        // Add event listeners for delete and edit buttons
        list.querySelectorAll('.delete-article').forEach(btn => {
            btn.addEventListener('click', function () {
                if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
                    const idx = parseInt(this.dataset.idx);
                    const articles = getArticles();
                    articles.splice(idx, 1);
                    saveArticles(articles);
                    renderArticles();
                    updateArticlesCount();
                    
                    // Show success message
                    showToast('Article supprimé avec succès !', 'success');
                }
            });
        });
        
        list.querySelectorAll('.edit-article').forEach(btn => {
            btn.addEventListener('click', function () {
                const idx = parseInt(this.dataset.idx);
                const articles = getArticles();
                const article = articles[idx];
                document.getElementById('article-title').value = article.title;
                document.getElementById('article-content').value = article.content;
                document.getElementById('publish-article').textContent = 'Mettre à jour';
                document.getElementById('publish-article').dataset.editIdx = idx;
                
                // Update character count
                updateCharCount();
                
                // Scroll to editor
                document.getElementById('blog-editor').scrollIntoView({ behavior: 'smooth' });
                
                // Focus on title
                document.getElementById('article-title').focus();
            });
        });
    }
    
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        const bgColor = type === 'success' ? 'bg-emerald-500' : 'bg-blue-500';
        toast.className = `fixed left-1/2 bottom-8 -translate-x-1/2 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 text-base font-semibold animate-bounce-in`;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
    
    // Format buttons with improved UX
    document.querySelectorAll('.format-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const textarea = document.getElementById('article-content');
            const format = this.dataset.format;
            const [start, end] = [textarea.selectionStart, textarea.selectionEnd];
            let before = textarea.value.substring(0, start);
            let selected = textarea.value.substring(start, end);
            let after = textarea.value.substring(end);
            
            if (format === 'bold') {
                textarea.value = before + '**' + selected + '**' + after;
            } else if (format === 'italic') {
                textarea.value = before + '*' + selected + '*' + after;
            } else if (format === 'h2') {
                textarea.value = before + '\n## ' + selected + '\n' + after;
            } else if (format === 'ul') {
                textarea.value = before + '\n- ' + selected + '\n' + after;
            }
            
            textarea.focus();
            textarea.setSelectionRange(start + 2, end + 2);
            updateCharCount();
            
            // Add visual feedback
            this.classList.add('bg-emerald-600');
            setTimeout(() => {
                this.classList.remove('bg-emerald-600');
            }, 200);
        });
    });
    
    // Toggle editor visibility
    const toggleBtn = document.getElementById('toggle-editor');
    const editorContent = document.getElementById('editor-content');
    if (toggleBtn && editorContent) {
        toggleBtn.addEventListener('click', function () {
            const isVisible = editorContent.style.display !== 'none';
            editorContent.style.display = isVisible ? 'none' : 'block';
            
            // Update icon
            const icon = this.querySelector('svg');
            if (isVisible) {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>';
            } else {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>';
            }
        });
    }
    
    // Character count update
    const textarea = document.getElementById('article-content');
    if (textarea) {
        textarea.addEventListener('input', updateCharCount);
        textarea.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key === 'Enter') {
                document.getElementById('publish-article').click();
            }
        });
    }
    
    // Publication button
    const publishBtn = document.getElementById('publish-article');
    if (publishBtn) {
        publishBtn.addEventListener('click', function () {
            const title = document.getElementById('article-title').value.trim();
            const content = document.getElementById('article-content').value.trim();
            
            if (!title || !content) {
                showToast('Veuillez remplir le titre et le contenu.', 'error');
                return;
            }
            
            // Convert markdown to HTML
            let html = content
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/^## (.*)$/gm, '<h2 class="text-lg font-semibold text-slate-100 mt-4 mb-2">$1</h2>')
                .replace(/^- (.*)$/gm, '<li>$1</li>')
                .replace(/\n/g, '<br>');
            
            // Fix list formatting
            html = html.replace(/(<li>.*?<\/li>)/gs, '<ul class="list-disc pl-6 mb-2">$1</ul>');
            html = html.replace(/<\/ul><br><ul>/g, '');
            
            const articles = getArticles();
            const editIdx = this.dataset.editIdx;
            
            if (editIdx !== undefined) {
                // Update existing article
                articles[editIdx] = {
                    ...articles[editIdx],
                    title,
                    content,
                    html,
                    date: new Date().toISOString()
                };
                delete this.dataset.editIdx;
                this.innerHTML = '<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>Publier';
                showToast('Article mis à jour avec succès !', 'success');
            } else {
                // Create new article
                const article = {
                    title,
                    content,
                    html,
                    date: new Date().toISOString()
                };
                articles.push(article);
                showToast('Article publié avec succès !', 'success');
            }
            
            saveArticles(articles);
            document.getElementById('article-title').value = '';
            document.getElementById('article-content').value = '';
            updateCharCount();
            renderArticles();
            updateArticlesCount();
        });
    }
    
    // Initial setup
    const welcomeAdded = ensureWelcomeArticle();
    renderArticles();
    updateArticlesCount();
    updateCharCount();
    
    // Show notification if welcome article was added
    if (welcomeAdded) {
        setTimeout(() => {
            showToast('Article de bienvenue restauré !', 'success');
        }, 500);
    }
}

// === Scroll-to-top button (mobile) ===
(function () {
    const btn = document.createElement('button');
    btn.id = 'scroll-to-top';
    btn.setAttribute('aria-label', 'Remonter en haut de page');
    btn.className = 'fixed bottom-6 right-4 z-50 bg-emerald-500 text-white rounded-full p-3 shadow-lg transition-all hover:bg-emerald-600 active:scale-95';
    btn.innerHTML = '<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/></svg>';
    btn.style.display = 'none';
    document.body.appendChild(btn);
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    window.addEventListener('scroll', () => {
        btn.style.display = window.scrollY > 200 ? 'block' : 'none';
    });
})();

// === Mobile Menu Logic (all pages) ===
(function () {
    const burgerBtn = document.getElementById('burger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (burgerBtn && mobileMenu) {
        // Toggle menu
        burgerBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            
            // Animate burger icon
            const icon = burgerBtn.querySelector('svg');
            if (mobileMenu.classList.contains('hidden')) {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />';
            } else {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />';
            }
        });
        
        // Close menu when clicking on a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = burgerBtn.querySelector('svg');
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!burgerBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                const icon = burgerBtn.querySelector('svg');
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />';
            }
        });
        
        // Close menu on window resize (if screen becomes large)
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) { // md breakpoint
                mobileMenu.classList.add('hidden');
                const icon = burgerBtn.querySelector('svg');
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />';
            }
        });
    }
})(); 