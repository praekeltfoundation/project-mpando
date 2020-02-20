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
