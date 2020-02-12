
//Provides the build instructions for the custom Service Worker generation.
/*
https://karannagupta.com/using-custom-workbox-service-workers-with-create-react-app/

https://medium.com/@chinmaya.cp/custom-service-worker-in-cra-create-react-app-3b401d24b875
https://developers.google.com/web/tools/workbox/modules/workbox-sw
https://developers.google.com/web/tools/workbox/guides/precache-files/workbox-build#call_injectmanifest
*/

const workboxBuild = require("workbox-build");
const buildSW = () => {
  workboxBuild.injectManifest({
    swSrc: "src/sw-custom.js", // CUSTOME SW Rules
    swDest: "build/sw.js", // SW generated build step OUTPUT in => build/sw.js file
    globDirectory: "build",
    globPatterns: [
      "**/*.{js,css,html,png}"
    ],
    maximumFileSizeToCacheInBytes: 5 * 1024 * 1024
  }).then(({ count, size, warnings }) => {
    warnings.forEach(console.warn);
    console.info(`${count} files will be precached,totaling ${size/(1024 * 1024)} MBs.`);
  }).catch((err) => {
    console.log(`${err}`);
    return;
  });
};buildSW();
