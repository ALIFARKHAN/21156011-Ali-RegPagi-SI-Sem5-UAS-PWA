// Nama cache untuk menyimpan sumber daya
const CACHE_NAME = 'firstpwa-v1.0';

// Daftar sumber daya yang akan disimpan di cache
const urlsToCache = [
  "/",
  "/index.html"



  // IMAGES:
  

];

 // Install service worker dan menyimpan sumber daya di cache
self.addEventListener("install", event => {
  event.waitUntil(
      caches.open(CACHE_NAME).then(function (cache) {
          return cache.addAll(urlsToCache);
      })
  );
});

//menggunakan file yang ada di cache
self.addEventListener("fetch", function(event) {
    event.respondWith(
      caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(response => {
          // Menggunakan sumber daya dari cache jika tersedia
          if (response) {
            console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
            return response;
          }
   
          // Mengambil sumber daya dari server jika tidak ada di cache
          console.log(
            "ServiceWorker: Memuat aset dari server: ",
            event.request.url
          );
          return fetch(event.request);
        })
    );
});
  
// menghapus cache lama
self.addEventListener("activate", function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName !== CACHE_NAME) {
              console.log("ServiceWorker: cache " + cacheName + " dihapus");
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
});