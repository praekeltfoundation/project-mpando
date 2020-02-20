if ("function" === typeof importScripts) {
  importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js');
  // Global workbox
  if (workbox) {
    console.log("Workbox is loaded");    // Disable logging
    workbox.setConfig({ debug: true });

    //`generateSW` and `generateSWString` provide the option
    // to force update an exiting service worker.
    // Since we're using `injectManifest` to build SW,
    // manually overriding the skipWaiting();
    self.addEventListener("install", event => {
      self.skipWaiting();
      window.location.reload();
    });

    workbox.precaching.precacheAndRoute([
  {
    "url": "offline.html",
    "revision": "a0c2c898b138c21bc8771400782ad0c6"
  },
  {
    "url": "static/images/logo.png",
    "revision": "8895bf9504e422cc41442e4682efd59a"
  },
  {
    "url": "static/css/index.css",
    "revision": "806e78ea570f8ccc782873964b17e0b6"
  }
]);

    workbox.routing.registerRoute(
      'offline.html',
      workbox.strategies.cacheFirst({
        cacheName: 'offline-cache'
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
      workbox.strategies.cacheFirst({
        cacheName: "images-cache",
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 20,
            maxAgeSeconds: 7 * 24 * 60 * 60 // Weekly cache
          })
        ]
      })
    );

    workbox.routing.registerRoute(
      new RegExp("https://fonts.(?:.googlepis|gstatic).com/(.*)"),
      workbox.strategies.cacheFirst({
        cacheName: "googleapis",
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 30
          })
        ]
      })
    );

  } else {
    console.error("Workbox could not be loaded. No offline support");
  }
}
