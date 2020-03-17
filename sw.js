importScripts("/precache-manifest.37c39113702935e955baf336c152d8d9.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

// Global workbox

const SW_VERSION = 'v1';
const CACHE_NAME = 'mpando_sw';
let OFFLINE_CACHE = [
  '/',
  `${process.env.PUBLIC_URL}/offline.html`,
  `${process.env.PUBLIC_URL}/static/images/logo.png`,
  `${process.env.PUBLIC_URL}/static/css/index.css`,
  `${process.env.PUBLIC_URL}/static/images/theme-spindle/ms-icon-144x144.png`,
  `${process.env.PUBLIC_URL}/static/images/theme-spindle/apple-icon-72x72.png`,
  `${process.env.PUBLIC_URL}/static/images/theme-spindle/apple-icon-152x152.png`,
  `${process.env.PUBLIC_URL}/static/images/theme-spindle/apple-icon-152x152.png`,
];

if (workbox) {
  self.addEventListener("message", event => {
    console.log('MESSAGE SW-CUSTOM',event.data,'::' ,event.type);
    // if (event.data && event.data.type === "SKIP_WAITING") {
    //   skipWaiting();
    // }
  });
  //const swVersion = await wb.messageSW({type: 'GET_VERSION'});
  //console.log('Service Worker version:', swVersion);

  self.addEventListener('install', event => {
    console.log('INSTALL',event);
    // Perform install steps
    event.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        console.log('Opened cache');
        return cace.addAll(OFFLINE_CACHE);
      })
    );
  });


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

