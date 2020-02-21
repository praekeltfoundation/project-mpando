importScripts("/precache-manifest.656c52e24654f7006fed86d8e529cacb.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

  // Global workbox
  if (workbox) {
    // Disable logging
    console.log("Workbox is loaded");
    workbox.setConfig({ debug: true });
    workbox.core.setCacheNameDetails({
      prefix: "mpando",
      suffix: "v1"
    });

    // Add an event listener to detect when the registered
    // service worker has installed but is waiting to activate
    self.addEventListener("waiting", (event) => {
      console.log('The event::',event);
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

