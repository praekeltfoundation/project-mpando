export function register(config) {
  //process.env.NODE_ENV === 'production' &&
  if ('serviceWorker' in navigator) {
    // SERVE SW ON SAME DOMAIN OTHERWISE FAIL ||
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      console.log('Cross Domain Restriction');
      return;
    }

    // ON WINDOW LOAD ||
    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/sw.js`;
      // Fetch SW - [Review Relevance & QA Behaviour]
      fetch(swUrl, {
        headers: { 'Service-Worker': 'script' }
      }).then(response => {
          const contentType = response.headers.get('content-type');
          console.log(contentType);
          if (response.status === 404 ||
            (contentType != null && contentType.indexOf('javascript') === -1)
          ) {
            // [If SW File Not Found - Fire SW unregister]
            navigator.serviceWorker.ready.then(registration => {
              registration.unregister().then(() => {
                window.location.reload();
              });
            });
          } else {
            // REGISTER SW ||
            navigator.serviceWorker.register(
              swUrl
            ).then((reg) => {
              console.log(`Service Worker Registered: ${reg}`);
            }).catch((err) => {
              console.log(`Error during service worker registration: ${err}`);
            });
          }
      }).catch(() => {
          console.log(
            'No internet connection found. App is running in offline mode.'
          );
      });
    });
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}


//[Currently Not being used - To review Installed App behaviour]
function registerValidSW(swUrlArg, config) {
  navigator.serviceWorker
    .register(swUrlArg)
    .then(registration => {
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
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}
