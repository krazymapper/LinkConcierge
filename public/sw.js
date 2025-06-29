// LinkConcierge Service Worker

const CACHE_NAME = 'linkconcierge-v1.0.0';
const STATIC_CACHE = 'linkconcierge-static-v1.0.0';
const DYNAMIC_CACHE = 'linkconcierge-dynamic-v1.0.0';

// Files to cache immediately
const STATIC_FILES = [
    './',
    './index.html',
    './manifest.json',
    './scripts/app.js',
    './scripts/pwa.js',
    'https://cdn.tailwindcss.com'
];

// Install event - cache static files
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('Service Worker: Caching static files');
                return cache.addAll(STATIC_FILES);
            })
            .then(() => {
                console.log('Service Worker: Static files cached');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('Service Worker: Error caching static files:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('Service Worker: Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker: Activated');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Handle API requests (if any) - always go to network
    if (url.pathname.startsWith('./api/')) {
        event.respondWith(fetch(request));
        return;
    }
    
    // Handle static files
    if (STATIC_FILES.includes(url.pathname) || url.origin === 'https://cdn.tailwindcss.com') {
        event.respondWith(
            caches.match(request)
                .then((response) => {
                    if (response) {
                        return response;
                    }
                    return fetch(request)
                        .then((fetchResponse) => {
                            // Cache the response for future use
                            if (fetchResponse.status === 200) {
                                const responseClone = fetchResponse.clone();
                                caches.open(STATIC_CACHE)
                                    .then((cache) => {
                                        cache.put(request, responseClone);
                                    });
                            }
                            return fetchResponse;
                        });
                })
        );
        return;
    }
    
    // Handle dynamic content (images, etc.)
    if (request.destination === 'image' || request.destination === 'font') {
        event.respondWith(
            caches.match(request)
                .then((response) => {
                    if (response) {
                        return response;
                    }
                    return fetch(request)
                        .then((fetchResponse) => {
                            if (fetchResponse.status === 200) {
                                const responseClone = fetchResponse.clone();
                                caches.open(DYNAMIC_CACHE)
                                    .then((cache) => {
                                        cache.put(request, responseClone);
                                    });
                            }
                            return fetchResponse;
                        })
                        .catch(() => {
                            // Return a fallback image if available
                            if (request.destination === 'image') {
                                return caches.match('./assets/icons/icon-192x192.png');
                            }
                        });
                })
        );
        return;
    }
    
    // Default strategy: Network first, then cache
    event.respondWith(
        fetch(request)
            .then((response) => {
                // Cache successful responses
                if (response.status === 200) {
                    const responseClone = response.clone();
                    caches.open(DYNAMIC_CACHE)
                        .then((cache) => {
                            cache.put(request, responseClone);
                        });
                }
                return response;
            })
            .catch(() => {
                // Fallback to cache
                return caches.match(request)
                    .then((response) => {
                        if (response) {
                            return response;
                        }
                        // Return offline page if available
                        if (request.destination === 'document') {
                            return caches.match('./index.html');
                        }
                    });
            })
    );
});

// Background sync (if supported)
self.addEventListener('sync', (event) => {
    console.log('Service Worker: Background sync triggered:', event.tag);
    
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

// Push notifications (if implemented)
self.addEventListener('push', (event) => {
    console.log('Service Worker: Push notification received');
    
    const options = {
        body: event.data ? event.data.text() : 'Nouvelle notification LinkConcierge',
        icon: './assets/icons/icon-192x192.png',
        badge: './assets/icons/icon-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Ouvrir',
                icon: './assets/icons/icon-72x72.png'
            },
            {
                action: 'close',
                title: 'Fermer',
                icon: './assets/icons/icon-72x72.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('LinkConcierge', options)
    );
});

// Notification click
self.addEventListener('notificationclick', (event) => {
    console.log('Service Worker: Notification clicked');
    
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('./')
        );
    }
});

// Background sync function
async function doBackgroundSync() {
    try {
        // Implement background sync logic here
        console.log('Service Worker: Background sync completed');
    } catch (error) {
        console.error('Service Worker: Background sync failed:', error);
    }
} 