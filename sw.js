importScripts("/precache-manifest.7ce9fb1844db5c7a4dd430a5c15b48d7.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

// Global workbox

const SW_VERSION = 'v1';
const CACHE_NAME = 'mpando_sw';



if (workbox) {
  workbox.setConfig({ debug: false });
  workbox.core.setCacheNameDetails({
    prefix: CACHE_NAME,
    suffix: SW_VERSION
  });


  function matchFunction({ url }) {
    const pages = ['/', '/offline'];
    return pages.includes(url.pathname);
  }

  workbox.routing.registerRoute(
    matchFunction,
    new workbox.strategies.CacheFirst({
      cacheName: 'html-cache'
    })
  );

  workbox.routing.registerRoute(
    /\.css$/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'css-cache'
    })
  );
  workbox.routing.registerRoute(
    /\.js$/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'js-cache'
    })
  );
  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.networkFirst({
      cacheName: "images-cache",
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 5,
          maxAgeSeconds: 1 * 24 * 60 * 60 // Weekly cache
        })
      ]
    })
  );

  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(res => {
        if (res) {
          return res;
        }

        return fetch(event.request).then(res => {
          if(!res || res.status !== 200 || res.type !== 'basic') {
           return res;
          }

          let responseToCache = res.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          return res;
        });
      })
    );
  });

  workbox.precaching.precacheAndRoute(self.__precacheManifest);
} else {
  console.error("Workbox could not be loaded. No offline support");
}

