import { Workbox } from "workbox-window";


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
      const wb = new Workbox(swUrl);;

      // Fetch SW - [Review Relevance & QA Behaviour]
      fetch(swUrl, {
        headers: { 'Service-Worker': 'script' }
      }).then(response => {
          const contentType = response.headers.get('content-type');

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



            //Add before the wb.register()
            const updateButton = document.getElementById("app-update");
            // Fires when the registered service worker has installed but is waiting to activate.
            wb.addEventListener("waiting", event => {
                updateButton.classList.add("show");
                updateButton.addEventListener("click", () => {
                // Set up a listener that will reload the page as
                // soon as the previously waiting service worker has taken control.
                wb.addEventListener("controlling", event => {
                  window.location.reload();
                });

                // Send a message telling the service worker to skip waiting.
                // This will trigger the `controlling` event handler above.
                wb.messageSW({ type: "SKIP_WAITING" });
                });
            });



            // REGISTER SW ||
            wb.register().then((reg) => {
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
