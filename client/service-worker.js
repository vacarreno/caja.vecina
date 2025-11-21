self.addEventListener("install", event => {
  console.log("PWA instalado");
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  console.log("PWA activo");
});
