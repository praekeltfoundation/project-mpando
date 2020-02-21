// Global workbox
console.log(workbox);
  if (workbox) {
    // Disable logging
    console.log("Workbox is loaded");
    workbox.precaching.precacheAndRoute(self.__precacheManifest);
  } else {
    console.error("Workbox could not be loaded. No offline support");
  }
