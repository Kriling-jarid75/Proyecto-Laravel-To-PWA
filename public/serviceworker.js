var staticCacheName = "pwa-v" + new Date().getTime();
var filesToCache = [
    '/offline',
    '/css/app.css',
    '/estilos/estiloPricipal.css',
    '/estilos/EstiloSinConexion.css',
    '/js/app.js',
    '/images/icons/icon-72x72.png',
    '/images/icons/icon-96x96.png',
    '/images/icons/icon-128x128.png',
    '/images/icons/icon-144x144.png',
    '/images/icons/icon-152x152.png',
    '/images/icons/icon-192x192.png',
    '/images/icons/icon-384x384.png',
    '/images/icons/icon-512x512.png',
    '/imagenes/arquitecto.png',
    '/imagenes/artes-marciales.png',
    '/imagenes/facebook.png',
    '/imagenes/game-console.png',
    '/imagenes/instagram.png',
    '/imagenes/jugadores-de-futbol.png',
    '/imagenes/pelota-de-futbol.png',
    '/imagenes/youtube.png',
    'https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap'

];
/*
// Cache on install
self.addEventListener("install", event => {
    this.skipWaiting();
    event.waitUntil(
        caches.open(staticCacheName)
            .then(cache => {
                return cache.addAll(filesToCache);
            })
    )
});
*/

/*
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(staticCacheName)
            .then(async cache => {
                await cache.addAll(filesToCache);
                self.skipWaiting();
            })
            .catch(err => console.log('No se ha registrado el cache', err))
    )


});
*/

//APP SHELL -> Lo que se requiere para que funcione la aplicación offline
self.addEventListener('install', e => {
    console.log('se instalo correctamente')
    const cacheProme = caches.open(staticCacheName)
        .then(cache => {
            return cache.addAll(filesToCache);
        });
    e.waitUntil(cacheProme);
});

/* 
// Clear cache on activate
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(cacheName => (cacheName.startsWith("pwa-")))
                    .filter(cacheName => (cacheName !== staticCacheName))
                    .map(cacheName => caches.delete(cacheName))
            );
        })
    );
}); */



//Evento activate
//Para que la app funcione sin conexion a internet

self.addEventListener('activate', e => {

    const cacheWhiteList = [staticCacheName];

    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheWhiteList.indexOf(cacheName) === -1) {
                            //Elementos que no se necesiten
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                //Activar la cache del dispositivo
                self.clients.claim();
            })
    )
});



















// Serve from Cache
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
            .catch(() => {
                return caches.match('offline');
            })
    )
});