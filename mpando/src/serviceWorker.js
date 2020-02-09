// REGISTER SW

/*
 LEARNING NOTES

 URL Constructor
 Fetch API
*/


/*
  Local URL Types
*/
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  // [::1] is the IPv6 localhost address.
  window.location.hostname === '[::1]' ||
  // 127.0.0.0/8 are considered localhost for IPv4.
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
);

/*
 CHECKS IF SW EXIST [CAN BE FOUND]
 If cannot be found: Reload page.

  Takes two params
    1. sw file
    2. config file
*/
function checkValidSW(swUrl, config) {
  fetch(swUrl,
    {
      headers: { 'Service-Worker': 'script' }
    }
  ).then(response => {
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get('content-type');
      if (response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // No service worker found.
        // Probably a different app.
        // Reload the page.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found.
        // b) INSTALL SW
        registerValidSW(swUrl, config);
      }
    }
  ).catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    }
  );
}




/*
 SERVICE WORKER::

  REGISTER VALID SW
*/
const CACHE_NAME = 'v1' ;
const CACHE_FILE = [
  './',
  './offline.html',
  './images/**/*',
  './css/index.css'
];

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      //TO TEST
      window.addEventListener('install', function(event) {
        event.waitUntil(
          caches.open(CACHE_NAME)
            .then(function(cache) {
              return cache.addAll(CACHE_FILE);
            })
        );
      });

      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }

        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.
              console.log(
                'New content is available and will be used when all ' +
                  'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
              );

              // Execute callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log('Content is cached for offline use.');

              // Execute callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
      // Success Message
      console.log('ServiceWorker succesfully registered');
    }).catch((err) => {
      //Error Message
      console.error('Error during service worker registration:', err);
    });
}


/**
 * 
 * REGISTER SW
*/
export function register(config) {
  //process.env.NODE_ENV === 'production' &&
  if ('serviceWorker' in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      console.log('PUBLIC_URL is on a different origin ie. CDN is serving assets');
      return;
    }
    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
      if (isLocalhost) {
        checkValidSW(swUrl, config);
        // Is localhost
        navigator.serviceWorker.ready.then(() => {
          console.log('Cache-first SW -' +
          'To learn more, visit https://bit.ly/CRA-PWA');
        });
      } else {
        // Is not localhost INSTALL SW
        registerValidSW(swUrl, config);
      }
    });
  } else {
    console.log('Service Worker is not supported by browser.');
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
