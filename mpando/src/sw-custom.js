if ("function" === typeof importScripts) {
  //importScripts("https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-window.prod.mjs");
  "https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js",

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

    workbox.precaching.precacheAndRoute([]);
    workbox.routing.registerRoute(
      //new RegExp('\.png$'),
      /\.html$/,
      workbox.strategies.cacheFirst({
        cacheName: "offline",
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
          })
        ]
      })
    );

    // Manual injection point for manifest files.
    // All assets under build/ and 5MB sizes are precached.

    // workbox.routing.registerRoute(
    //   new RegExp("https://fonts.(?:.googlepis|gstatic).com/(.*)"),
    //   workbox.strategies.cacheFirst({
    //     cacheName: "googleapis",
    //     plugins: [
    //       new workbox.expiration.Plugin({
    //         maxEntries: 30
    //       })
    //     ]
    //   })
    // );

    // Image caching
    // workbox.routing.registerRoute(
    //   /\.(?:png|gif|jpg|jpeg|svg)$/,
    //   workbox.strategies.cacheFirst({
    //     cacheName: "images",
    //     plugins: [
    //       new workbox.expiration.Plugin({
    //         maxEntries: 60,
    //         maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
    //       })
    //     ]
    //   })
    // );

    // JS, CSS caching
    // workbox.routing.registerRoute(
    //   /\.(?:js|css)$/,
    //   workbox.strategies.staleWhileRevalidate({
    //     cacheName: "static-resources",
    //     plugins: [
    //       new workbox.expiration.Plugin({
    //         maxEntries: 60,
    //         maxAgeSeconds: 20 * 24 * 60 * 60 // 20 Days
    //       })
    //     ]
    //   })
    // );

  } else {
    console.error("Workbox could not be loaded. No offline support");
  }
}
