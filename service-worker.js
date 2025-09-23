const CACHE_NAME = "habit-tracker-v2.0";
const STATIC_CACHE_NAME = "habit-tracker-static-v2.0";
const DYNAMIC_CACHE_NAME = "habit-tracker-dynamic-v2.0";

const STATIC_FILES = [
  "/",
  "/index.html",
  "/gallery.html",
  "/style.css",
  "/app.js",
  "/gallery.js",
  "/manifest.json",
  "https://www.gstatic.com/firebasejs/10.12.3/firebase-app-compat.js",
  "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore-compat.js",
  "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage-compat.js"
];

const DYNAMIC_FILES = [
  "https://firestore.googleapis.com",
  "https://firebase.googleapis.com",
  "https://firebasestorage.googleapis.com"
];

// Install event - cache static files
self.addEventListener("install", event => {
  console.log("Service Worker installing...");
  
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE_NAME).then(cache => {
        console.log("Caching static files");
        return cache.addAll(STATIC_FILES.map(url => {
          return new Request(url, { mode: 'no-cors' });
        })).catch(err => {
          console.log("Error caching static files:", err);
          // Try adding files individually
          return Promise.all(
            STATIC_FILES.map(url => 
              cache.add(url).catch(err => console.log("Failed to cache:", url))
            )
          );
        });
      }),
      self.skipWaiting()
    ])
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", event => {
  console.log("Service Worker activating...");
  
  event.waitUntil(
    Promise.all([
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
              console.log("Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      self.clients.claim()
    ])
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Handle different types of requests
  if (request.method !== 'GET') {
    // Don't cache non-GET requests
    return;
  }
  
  // Handle static files
  if (STATIC_FILES.some(staticUrl => request.url.includes(staticUrl.replace('/', '')))) {
    event.respondWith(cacheFirst(request, STATIC_CACHE_NAME));
    return;
  }
  
  // Handle Firebase/Firestore requests
  if (url.hostname.includes('firebase') || url.hostname.includes('firestore') || url.hostname.includes('gstatic')) {
    event.respondWith(networkFirst(request, DYNAMIC_CACHE_NAME));
    return;
  }
  
  // Handle image/video uploads and other dynamic content
  if (url.pathname.includes('/proofs/') || request.destination === 'image' || request.destination === 'video') {
    event.respondWith(cacheFirst(request, DYNAMIC_CACHE_NAME));
    return;
  }
  
  // Default strategy for other requests
  event.respondWith(networkFirst(request, DYNAMIC_CACHE_NAME));
});

// Cache first strategy
async function cacheFirst(request, cacheName) {
  try {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    
    if (cached) {
      // Update cache in background
      fetchAndCache(request, cache);
      return cached;
    }
    
    const response = await fetch(request);
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.log("Cache first failed:", error);
    return new Response("Offline - Content not available", {
      status: 503,
      statusText: "Service Unavailable"
    });
  }
}

// Network first strategy
async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    
    if (response.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    console.log("Network first failed, trying cache:", error);
    
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    
    if (cached) {
      return cached;
    }
    
    // Return offline fallback
    if (request.destination === 'document') {
      return new Response(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Offline - Habit Tracker</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              text-align: center; 
              padding: 2rem;
              background: linear-gradient(135deg, #fff0f6, #ffe0f0);
            }
            .offline-message {
              background: white;
              padding: 2rem;
              border-radius: 20px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.1);
              display: inline-block;
            }
          </style>
        </head>
        <body>
          <div class="offline-message">
            <h1>🌸 You're Offline</h1>
            <p>Please check your internet connection and try again.</p>
            <button onclick="window.location.reload()">Try Again</button>
          </div>
        </body>
        </html>
      `, {
        headers: { 'Content-Type': 'text/html' }
      });
    }
    
    return new Response("Offline", { status: 503 });
  }
}

// Background fetch and cache
async function fetchAndCache(request, cache) {
  try {
    const response = await fetch(request);
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
  } catch (error) {
    console.log("Background fetch failed:", error);
  }
}

// Handle background sync
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  console.log("Background sync triggered");
  // Implement any background sync logic here
}

// Handle push notifications (future feature)
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/icons/icon-192.png',
      badge: '/icons/icon-96.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
      actions: [
        {
          action: 'explore',
          title: 'View Habits',
          icon: '/icons/checkmark.png'
        },
        {
          action: 'close',
          title: 'Close',
          icon: '/icons/close.png'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Handle notification click
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  } else if (event.action === 'close') {
    // Just close the notification
  } else {
    // Default action
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Skip waiting
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
