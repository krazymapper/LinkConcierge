// LinkConcierge - Main Application Logic

class LinkConcierge {
    constructor() {
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
        this.showSuccessMessage('Lien ajouté avec succès !');
    }

    deleteLink(id) {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce lien ?')) {
            this.links = this.links.filter(link => link.id !== id);
            this.saveLinks();
            this.renderLinks();
            this.updateCategoryFilter();
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
            emptyState.classList.remove('hidden');
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
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${links.map(link => this.renderLinkCard(link)).join('')}
                </div>
            </div>
        `).join('');
    }

    renderLinkCard(link) {
        const date = new Date(link.createdAt).toLocaleDateString('fr-FR');
        
        return `
            <div class="link-card bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow animate-scale-in" data-id="${link.id}">
                <div class="flex items-start justify-between mb-3">
                    <div class="flex items-center space-x-2">
                        <span class="text-2xl">${link.icon}</span>
                        <div class="flex-1 min-w-0">
                            <h4 class="text-sm font-medium text-gray-900 dark:text-white truncate">
                                ${this.escapeHtml(link.title)}
                            </h4>
                            <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
                                ${this.escapeHtml(link.domain)}
                            </p>
                        </div>
                    </div>
                    <button class="delete-link-btn text-gray-400 hover:text-red-500 transition-colors p-1" title="Supprimer">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </div>
                
                <a href="${this.escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer"
                   class="block text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 truncate mb-2">
                    ${this.escapeHtml(link.url)}
                </a>
                
                <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>${date}</span>
                    <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
                        ${this.escapeHtml(link.category)}
                    </span>
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
        
        this.showSuccessMessage('Export terminé !');
    }

    // Utility functions
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showSuccessMessage(message) {
        // Create a temporary success message
        const successDiv = document.createElement('div');
        successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50 animate-fade-in';
        successDiv.textContent = message;
        
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LinkConcierge();
}); 