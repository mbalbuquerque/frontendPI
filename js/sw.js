const CACHE_NAME = 'up-digital-v1';
const assets = [
  '/',
  '/index.html',
  '/style.css',
  '/path/to/your/icones' // Adicione aqui o caminho das suas imagens
];

// Instalação: Salva arquivos no cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Intercepta as chamadas para servir do cache se estiver offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});