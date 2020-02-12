if ("function" === typeof importScripts) {
  importScripts("https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-window.prod.mjs");
  //"https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js",

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

    // Manual injection point for manifest files.
    // All assets under build/ and 5MB sizes are precached.
     workbox.precaching.precacheAndRoute([
  {
    "url": "favicon-theme-spindle.png",
    "revision": "bc1395725bc5dd4ad2c42b4fec110ac9"
  },
  {
    "url": "index.html",
    "revision": "4a461882e21fdf4ccafe22d9745837a0"
  },
  {
    "url": "offline.html",
    "revision": "a0c2c898b138c21bc8771400782ad0c6"
  },
  {
    "url": "precache-manifest.5504f56a708ffa59a74b3808e1a5df48.js",
    "revision": "5504f56a708ffa59a74b3808e1a5df48"
  },
  {
    "url": "service-worker.js",
    "revision": "fb3119a9e1935d4d112619c48e9aaeff"
  },
  {
    "url": "static/css/index.css",
    "revision": "806e78ea570f8ccc782873964b17e0b6"
  },
  {
    "url": "static/css/main.5c3ee6c3.chunk.css",
    "revision": "98868d4bc20f5a90cf922e5ad90c3bcc"
  },
  {
    "url": "static/images/logo.png",
    "revision": "8895bf9504e422cc41442e4682efd59a"
  },
  {
    "url": "static/images/theme-regal/android-icon-144x144.png",
    "revision": "bf6feeaf6c3f3d8513c4700ec2f8ee8b"
  },
  {
    "url": "static/images/theme-regal/android-icon-192x192.png",
    "revision": "3efee3793860b39f380d359dd343085a"
  },
  {
    "url": "static/images/theme-regal/android-icon-48x48.png",
    "revision": "c1619cd8237e262dba31ddf724522beb"
  },
  {
    "url": "static/images/theme-regal/android-icon-72x72.png",
    "revision": "9d5427f839001696cbdae9be045f9c20"
  },
  {
    "url": "static/images/theme-regal/android-icon-96x96.png",
    "revision": "d6914376393b16762a770d675baa5da6"
  },
  {
    "url": "static/images/theme-regal/apple-icon-114x114.png",
    "revision": "e23dc1b040f799b9252fd3b291ae7414"
  },
  {
    "url": "static/images/theme-regal/apple-icon-120x120.png",
    "revision": "c72814e92207df9f7215c85becb13f72"
  },
  {
    "url": "static/images/theme-regal/apple-icon-144x144.png",
    "revision": "bf6feeaf6c3f3d8513c4700ec2f8ee8b"
  },
  {
    "url": "static/images/theme-regal/apple-icon-152x152.png",
    "revision": "d28c6f01b2ba2f42eef1dde9360be5ac"
  },
  {
    "url": "static/images/theme-regal/apple-icon-180x180.png",
    "revision": "cf1ec494e2ed121b75f820b09a629d16"
  },
  {
    "url": "static/images/theme-regal/apple-icon-76x76.png",
    "revision": "f429e58340ac583cc1155baee64e7c68"
  },
  {
    "url": "static/images/theme-regal/logo-app-icon.png",
    "revision": "87b4a77e30c21263854c905e4a6bdf25"
  },
  {
    "url": "static/images/theme-regal/ms-icon-144x144.png",
    "revision": "bf6feeaf6c3f3d8513c4700ec2f8ee8b"
  },
  {
    "url": "static/images/theme-regal/ms-icon-150x150.png",
    "revision": "efa07401642da27defeae9775ebf8588"
  },
  {
    "url": "static/images/theme-regal/ms-icon-310x310.png",
    "revision": "6806e646c68b99a0b71757d0db5f7403"
  },
  {
    "url": "static/images/theme-spindle/android-icon-144x144.png",
    "revision": "347c88805eb5b9ce85a8fa9888584ca2"
  },
  {
    "url": "static/images/theme-spindle/android-icon-192x192.png",
    "revision": "2b4a74771f724a12addf4db76e410ccb"
  },
  {
    "url": "static/images/theme-spindle/android-icon-48x48.png",
    "revision": "f56d80e456ba52807425c24e40365552"
  },
  {
    "url": "static/images/theme-spindle/android-icon-72x72.png",
    "revision": "8b5d75d940c6c3a6b45b5081d1e73eda"
  },
  {
    "url": "static/images/theme-spindle/android-icon-96x96.png",
    "revision": "941a23f71fe82e6ede4827bd9e96ebdd"
  },
  {
    "url": "static/images/theme-spindle/apple-icon-114x114.png",
    "revision": "2459b1caaa3f8b72aaa2315c963e09e0"
  },
  {
    "url": "static/images/theme-spindle/apple-icon-120x120.png",
    "revision": "144eb752b362a805ac7dbed535a6c611"
  },
  {
    "url": "static/images/theme-spindle/apple-icon-144x144.png",
    "revision": "347c88805eb5b9ce85a8fa9888584ca2"
  },
  {
    "url": "static/images/theme-spindle/apple-icon-152x152.png",
    "revision": "b6b8c4b0b53832bd895868eea0394039"
  },
  {
    "url": "static/images/theme-spindle/apple-icon-180x180.png",
    "revision": "843a9d9d5b89cacb19f9e39aa0d41a5e"
  },
  {
    "url": "static/images/theme-spindle/apple-icon-76x76.png",
    "revision": "f6a13c74c31b31b1f38d93775b9a5af2"
  },
  {
    "url": "static/images/theme-spindle/logo-app-icon-2.png",
    "revision": "c28a314d797ba51cde827ae4b0ab0383"
  },
  {
    "url": "static/images/theme-spindle/ms-icon-144x144.png",
    "revision": "347c88805eb5b9ce85a8fa9888584ca2"
  },
  {
    "url": "static/images/theme-spindle/ms-icon-150x150.png",
    "revision": "1c6c32a403438fa935b155313ce4a1c3"
  },
  {
    "url": "static/images/theme-spindle/ms-icon-310x310.png",
    "revision": "02d696d5d8520d6ef91cb3c12b42d554"
  },
  {
    "url": "static/js/2.a0aa9681.chunk.js",
    "revision": "073c9fe0ca6a90d2d1fb01d17bfdee6a"
  },
  {
    "url": "static/js/main.2742757f.chunk.js",
    "revision": "3d90fc44e1c02e34b78a967c6e548ed6"
  },
  {
    "url": "static/js/runtime-main.5274d17f.js",
    "revision": "500d76c9345a2cfaef351e5e6e14f0e9"
  },
  {
    "url": "static/media/image-one.3d6a91a9.png",
    "revision": "3d6a91a9113ea745f565e5d46ee7ea8f"
  },
  {
    "url": "static/media/ndoh-logo.b2da18c7.png",
    "revision": "b2da18c73b949c6742b772891e09dbb6"
  }
]);
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
