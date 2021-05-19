var APP_PREFIX = 'RssTvndr'     // Identifier for this app (this needs to be consistent across every cache update)
var VERSION = 'version_01'              // Version of the off-line cache (change this value everytime you want to update cache)
var CACHE_NAME = APP_PREFIX + VERSION
var URLS = [                            // Add URL you want to cache in this list.
  '/RssNodeJsApp/'                     // If you have separate JS/CSS files            // add path to those files here
]

// Respond with cached resources
self.addEventListener('fetch', function (e) {
  console.log('fetch request : ' + e.request.url)
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) { // if cache is available, respond with cache
        console.log('responding with cache : ' + e.request.url)
        return request
      } else {       // if there are no cache, try fetching request
        console.log('file is not cached, fetching : ' + e.request.url)
        return fetch(e.request)
      }

      // You can omit if/else for console.log & put one line below like this too.
      // return request || fetch(e.request)
    })
  )
})

// Cache resources
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('installing cache : ' + CACHE_NAME)
      return cache.addAll(URLS)
    })
  )
})

// Delete outdated caches
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      // `keyList` contains all cache names under your username.github.io
      // filter out ones that has this app prefix to create white list
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX)
      })
      // add current cache name to white list
      cacheWhitelist.push(CACHE_NAME)

      return Promise.all(keyList.map(function (key, i) {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.log('deleting cache : ' + keyList[i] )
          return caches.delete(keyList[i])
        }
      }))
    })
  )
})

// var CACHE_NAME = 'static-cache';
// var urlsToCache = [
//   '.',
//   '/404.html'
// ];
// self.addEventListener('install', function(event) {
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//     .then(function(cache) {
//       return cache.addAll(urlsToCache);
//     })
//   );
// });




// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request)
//     .then(function(response) {
//       return response || fetchAndCache(event.request);
//     })
//   );
// });

// function fetchAndCache(url) {
//   return fetch(url)
//   .then(function(response) {
//     // Check if we received a valid response
//     if (!response.ok) {
//       throw Error(response.statusText);
//     }
//     return caches.open(CACHE_NAME)
//     .then(function(cache) {
//       cache.put(url, response.clone());
//       return response;
//     });
//   })
//   .catch(function(error) {
//     console.log('Request failed:', error);
//     return 404;
//   });
// }







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
