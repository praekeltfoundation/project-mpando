
if ("function" === typeof importScripts) {
  importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js');
  // Global workbox
  if (workbox) {
    console.log('Infor:::',workbox, self);
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
  },
  {
    "url": "static/js/2.a0aa9681.chunk.js",
    "revision": "073c9fe0ca6a90d2d1fb01d17bfdee6a"
  },
  {
    "url": "static/js/2.a0aa9681.chunk.js.LICENSE",
    "revision": "d7798c023baac53e2010f08a9edaab04"
  },
  {
    "url": "static/js/2.a0aa9681.chunk.js.map",
    "revision": "330f3295d9d0609cddbd72e31c08aa11"
  },
  {
    "url": "static/js/main.d9dc9f94.chunk.js",
    "revision": "b855f5fe8e3817eb766b3cd0afd904dd"
  },
  {
    "url": "static/js/main.d9dc9f94.chunk.js.map",
    "revision": "dfdcf521577b2b161218c34d521a954b"
  },
  {
    "url": "static/js/runtime-main.5274d17f.js",
    "revision": "500d76c9345a2cfaef351e5e6e14f0e9"
  },
  {
    "url": "static/js/runtime-main.5274d17f.js.map",
    "revision": "5a68cc398de81f4f930201fd29211f13"
  }
]);
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

    // Image caching
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
