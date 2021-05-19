





var CACHE_NAME = 'static-cache';
var urlsToCache = [
  '.',
  '/404.html'
];
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});




self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      return response || fetchAndCache(event.request);
    })
  );
});

function fetchAndCache(url) {
  return fetch(url)
  .then(function(response) {
    // Check if we received a valid response
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return caches.open(CACHE_NAME)
    .then(function(cache) {
      cache.put(url, response.clone());
      return response;
    });
  })
  .catch(function(error) {
    console.log('Request failed:', error);
    return 404;
  });
}







// const toCache = [
//     '/',
//     '404.html'
// ];



// self.addEventListener('install', function(event) {
//     console.log('Installed')
//     event.waitUntil(
//         caches.open('cache-name')
//           .then(function(cache) {
//              cache.addAll(toCache)
//           })
//           .then(self.skipWaiting())
//       )
//   })
  
//   self.addEventListener('fetch', function(event) {
//     console.log("Fetched");
//     event.respondWith(
//         fetch(event.request)
//           .catch(() => {
//             return caches.open('cache-name')
//               .then((cache) => {
//                 return cache.match(event.request)
//               })
//           })
//       )

//     })
  
//   self.addEventListener('activate', function(event) {
//     console.log("Activated");  
//     event.waitUntil(
//       caches.keys()
//         .then((keyList) => {
//           return Promise.all(keyList.map((key) => {
//             if (key !== 'cache-name') {
//               console.log('[ServiceWorker] Removing old cache', key)
//               return caches.delete(key)
//             }
//           }))
//         })
//         .then(() => self.clients.claim())
//     )
// })