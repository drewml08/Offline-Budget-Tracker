const CACHE_NAME = "static-budget-app";

self.addEventListener('install', event => {
    event.waitUntil(
      caches.open(CACHE_NAME).then( cache => {
        return cache.addAll([
          '/',
          '/index.html',
          '/index.js',
          '/styles.css',
          '/manifest.webmanifest',
          '/icons/icon-192x192.png',
          '/icons/icon-512x512.png',
        ]);
      })
    );
    console.log('Install');
    self.skipWaiting();
  });
  
  // retrieve assets from cache
  self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open(CACHE_NAME).then(cache => {
          return cache.match(event.request).then(response => {
            return response || fetch(event.request);
          });
        })
      );
  });