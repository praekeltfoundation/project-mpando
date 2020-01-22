// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://bit.ly/CRA-PWA

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  // [::1] is the IPv6 localhost address.
  window.location.hostname === '[::1]' ||
  // 127.0.0.0/8 are considered localhost for IPv4.
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
);


/*You have to supply a name for your cache, this will
 allow us to remove an old one to avoid hitting disk
 space limits and displaying old resources
 */
const cacheName = 'v1';


/*Assets to cache
 The items to cache at this point should be something you don’t forsee 
 changing often, such as base styles, scripts, fonts, logos, etc.
*/

const assetsToCache = [
  `${process.env.PUBLIC_URL}/favicon.ico`,
  `${process.env.PUBLIC_URL}/css/index.css`,
  `${process.env.PUBLIC_URL}/images/logo.png`,
  `${process.env.PUBLIC_URL}/images/logo-app-icon.png`
];


export function register(config) {
  //process.env.NODE_ENV === 'production' &&
  if ('serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
      if (isLocalhost) {
        // This is running on localhost. Let's check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, config);
        
        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
              'worker. To learn more, visit https://bit.ly/CRA-PWA'
          );
        });
      } else {
        // Is not localhost. Just register service worker
        registerValidSW(swUrl, config);
      }
    });
  } else {
    console.log('Service Worker is not supported by browser.');
  }
}

window.addEventListener('install', function(event) {
  // waitUntil() ensures that the Service Worker will not
  // install until the code inside has successfully occurred
  event.waitUntil(
    // Create cache with the name supplied above and
    // return a promise for it
    caches.open(cacheName).then(function(cache) {
        // Important to `return` the promise here to have `skipWaiting()`
        // fire after the cache has been updated.
        return cache.addAll(assetsToCache);
    }).then(function() {
      // `skipWaiting()` forces the waiting ServiceWorker to become the
      // active ServiceWorker, triggering the `onactivate` event.
      // Together with `Clients.claim()` this allows a worker to take effect
      // immediately in the client(s).
      return window.skipWaiting();
    })
  );
});

// Activate event
// Be sure to call window.clients.claim()
window.addEventListener('activate', function(event) {
	// `claim()` sets this worker as the active worker for all clients that
	// match the workers scope and triggers an `oncontrollerchange` event for
	// the clients.
	return window.clients.claim();
});


window.addEventListener('fetch', function(event) {
  // Ignore non-get request like when accessing the admin panel
  if (event.request.method !== 'GET') { return; }
  // Don't try to handle non-secure assets because fetch will fail
  if (/http:/.test(event.request.url)) { return; }
  

  // Here's where we cache all the things!
  event.respondWith(
    // Open the cache created when install
    caches.open(cacheName).then(function(cache) {
      // Go to the network to ask for that resource
      return fetch(event.request).then(function(networkResponse) {
        // Add a copy of the response to the cache (updating the old version)
        cache.put(event.request, networkResponse.clone());
        // Respond with it
        return networkResponse;
      }).catch(function() {
        // If there is no internet connection, try to match the request
        // to some of our cached resources
        return cache.match(event.request);
      })
    })
  );
});

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
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
    })
    .catch((err) => {
      //Error Message
      console.error('Error during service worker registration:', err);
    });
}

function checkValidServiceWorker(swUrl, config) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' }
  }).then(response => {
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get('content-type');
      if (response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config);
      }
    }).catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
