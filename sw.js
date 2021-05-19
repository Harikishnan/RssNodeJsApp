
const toCache = [
    '/'
];



self.addEventListener('install', function(event) {
    console.log('Installed')
    event.waitUntil(
        caches.open('cache-name')
          .then(function(cache) {
             cache.addAll(toCache)
          })
          .then(self.skipWaiting())
      )
  })
  
  self.addEventListener('fetch', function(event) {
    console.log("Fetched");
    event.respondWith(
        fetch(event.request)
          .catch(() => {
            return caches.open('cache-name')
              .then((cache) => {
                return cache.match(event.request)
              })
          })
      )

    })
  
  self.addEventListener('activate', function(event) {
    console.log("Activated");  
    event.waitUntil(
      caches.keys()
        .then((keyList) => {
          return Promise.all(keyList.map((key) => {
            if (key !== 'cache-name') {
              console.log('[ServiceWorker] Removing old cache', key)
              return caches.delete(key)
            }
          }))
        })
        .then(() => self.clients.claim())
    )
})