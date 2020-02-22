  // Global workbox
  if (workbox) {
    // Disable logging
    console.log("Workbox is loaded");

    // addEventListener("message", event => {
    //   if (event.data && event.data.type === "SKIP_WAITING") {
    //     skipWaiting();
    // });

    workbox.setConfig({ debug: true });
    workbox.core.setCacheNameDetails({
      prefix: "mpando",
      suffix: "v1"
    });

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

    workbox.routing.registerRoute(
      new RegExp("https://fonts.(?:.googlepis|gstatic).com/(.*)"),
      workbox.strategies.cacheFirst({
        cacheName: "googleapis",
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 3
          })
        ]
      })
    );

    workbox.precaching.precacheAndRoute(self.__precacheManifest);
  } else {
    console.error("Workbox could not be loaded. No offline support");
  }
