import { Workbox } from "workbox-window";

const SW_VERSION = '1';
const CACHE_NAME = 'mpando_sw';

export function register(config) {
  if ('serviceWorker' in navigator) {
    /*
      !IMPORTANT
      SERVE SW ON SAME DOMAIN
    */
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      console.log('Cross Domain Restriction');
      return;
    }
    /*
      SW - WINDOW LOAD
    */
    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/sw.js`;
      const wb = new Workbox(swUrl);

      // FETCHING OF SW
      fetch(swUrl, {
        headers: { 'Service-Worker': 'script'}
      }).then(response => {
        const contentType = response.headers.get('content-type');
        if (response.status === 404 ||
          (contentType != null && contentType.indexOf('javascript') === -1)
        ){
          navigator.serviceWorker.ready.then(registration => {
            registration.unregister().then(() => {
              window.location.reload();
            });
          });
        } else {
          let updateButton = document.getElementById("app-update");
          /*
            !IMPORTANT
              Fires when the registered SERVICE WORKER is
              Installed but is WAITING to Activate.
          */

          // https://developers.google.com/web/tools/workbox/modules/workbox-window#example-first-active
          wb.addEventListener('activated', (event) => {
            // `event.isUpdate` will be true if another version of the service
            // worker was controlling the page when this version was registered.
            if (!event.isUpdate) {
              console.log('Service worker activated for the first time!');
              // If your service worker is configured to precache assets, those
              // assets should all be available now?
            }
          });


          // https://developers.google.com/web/tools/workbox/modules/workbox-window#example-waiting
          wb.addEventListener("waiting", event => {
            updateButton.className = "show";
            updateButton.addEventListener("click", () => {
              // Set up a listener that will reload the page as
              // soon as the previously waiting service worker has taken control.
              wb.addEventListener("controlling", event => {
                window.location.reload();
              });
              // Send a message telling the service worker to skip waiting.
              // This will trigger the `CONTROLLING` event handler above.
              wb.messageSW({ type: "SKIP_WAITING" });
            });
          });

          // https://developers.google.com/web/tools/workbox/modules/workbox-window#example-broadcast-updates
          wb.addEventListener('message', (event) => {
            console.log(event.data,'::' ,event.type);
            if (event.data.type === 'CACHE_UPDATED') {
              const {updatedURL} = event.data.payload;
              console.log(`A newer version of ${updatedURL} is available!`);
            }
          });

          // REGISTER SW
          wb.register();
          //const swVersion = await wb.messageSW({type: 'GET_VERSION'});
          //console.log('Service Worker version:', swVersion);
        }
      }).catch((err) => {
        console.log(`No internet connection found. App is running in offline mode:: ${err}`);
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
