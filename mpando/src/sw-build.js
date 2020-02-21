const workboxBuild = require("workbox-build");
const buildSW = () => {
  workboxBuild.injectManifest({
    swSrc: "src/sw-custom.js",
    swDest: "build/sw.js",
    globDirectory: "build",

    globPatterns: [
      "offline.html",
      "static/images/logo.png",
      "static/css/index.css",
      "static/js/*",
    ],
    maximumFileSizeToCacheInBytes: 5 * 1024 * 1024
  }).then(({count, size, warnings}) => {
    warnings.forEach(console.warn);
    console.log(`${count} files will be precached, totaling ${size} bytes.`);
  }).catch((err) => {
    console.log(`${err}`);
    return;
  });
};

buildSW();
