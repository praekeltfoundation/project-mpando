if ("function" === typeof importScripts) {
  importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js');
  // Global workbox
  if (workbox) {
    console.log("Workbox is loaded");    // Disable logging
    workbox.setConfig({ debug: true });

    // Add an event listener to detect when the registered
    // service worker has installed but is waiting to activate
    self.addEventListener("waiting", (event) => {
      // `event.wasWaitingBeforeRegister` will be false if this is
      // the first time the updated service worker is waiting.
      // When `event.wasWaitingBeforeRegister` is true, a previously
      // updated same service worker is still waiting.
      // You may want to customize the UI prompt accordingly.
      const prompt = createUIPrompt({
        onAccept: async () => {
          // Assuming the user accepted the update, set up a listener
          // that will reload the page as soon as the previously waiting
          // service worker has taken control.
          self.addEventListener("controlling", (event) => {
            window.location.reload();
          });
          // Send a message telling the service worker to skip waiting.
          // This will trigger the `controlling` event handler above.
          // Note: for this to work, you have to add a message
          // listener in your service worker. See below.
          self.addEventListener("message", (event) => {
            if(event.data && event.data.type === "SKIP_WAITING"){
              skipWaiting();
            }
          });
        },
        onReject: () => {
          prompt.dismiss();
        }
      })
    });

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
    "url": "static/js/main.a7f8d78b.chunk.js",
    "revision": "2241c94cdf9783a8adbec8b439da793d"
  },
  {
    "url": "static/js/main.a7f8d78b.chunk.js.map",
    "revision": "23b73a82556a9c936542109968ead7d2"
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
