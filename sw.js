const cacheName = 'v1.0.1';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll([
        '/pdfjs-wth-sw/web/viewer.html',
        '/pdfjs-wth-sw/web/viewer.js',
        '/pdfjs-wth-sw/web/viewer.css',
        '/pdfjs-wth-sw/build/pdf.js',
        '/pdfjs-wth-sw/build/pdf.worker.js',
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    if (response !== undefined) {
      return response;
    } else {
      return fetch(event.request).then(function (response) {
        let responseClone = response.clone();
        caches.open(cacheName).then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        // return caches.match('/sw-test/gallery/myLittleVader.jpg');
      });
    }
  }));
});
