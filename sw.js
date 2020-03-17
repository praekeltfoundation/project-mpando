importScripts("/precache-manifest.7f1f12a42939ab84d12031978586d36b.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

// Global workbox
if (workbox) {

  self.addEventListener("message", event => {
    console.log(event.data, event.type);
    // if (event.data && event.data.type === "SKIP_WAITING") {
    //   skipWaiting();
    // }
  });


  workbox.setConfig({ debug: true });
  workbox.core.setCacheNameDetails({
    prefix: "mpando",
    suffix: "v1"
  });
  workbox.routing.registerRoute(
    /\.css$/,
    new workbox.strategies.staleWhileRevalidate({
      cacheName: 'css-cache'
    })
  );
  workbox.routing.registerRoute(
    /\.js$/,
    new workbox.strategies.staleWhileRevalidate({
      cacheName: 'js-cache'
    })
  );
  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    new workbox.strategies.networkFirst({
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
    new workbox.strategies.cacheFirst({
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

