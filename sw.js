importScripts("/precache-manifest.37c39113702935e955baf336c152d8d9.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

// Global workbox

const SW_VERSION = 'v1';
const CACHE_NAME = 'mpando_sw';



if (workbox) {
  workbox.setConfig({ debug: true });
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

  self.addEventListener("message", event => {
    console.log('MESSAGE SW-CUSTOM',event.data,'::' ,event.type);
    // if (event.data && event.data.type === "SKIP_WAITING") {
    //   skipWaiting();
    // }
  });


  self.addEventListener('fetch', event => {
    console.log('FETCH',event);
    event.respondWith(fetch(event.request).catch(() => {
      return caches.open(CACHE_NAME).then(cache => {
        return cache.match('/offline.html');
      });
    }));
  });



  workbox.precaching.precacheAndRoute(self.__precacheManifest);
} else {
  console.error("Workbox could not be loaded. No offline support");
}

