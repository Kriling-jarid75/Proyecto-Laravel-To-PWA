var staticCacheName = "pwa-v" + new Date().getTime();
const filesToCache = [
    './offline',
    './css/app.css',
    './estilos/estiloPricipal.css',
    './estilos/estilosCVDavid.css',
    './estilos/estiilosCVKriling.css',
    './estilos/estilosCVManuel.css',
    './estilos/EstiloSinConexion.css',
    './js/app.js',
    './images/icons/icon-72x72.png',
    './images/icons/icon-96x96.png',
    './images/icons/icon-128x128.png',
    './images/icons/icon-144x144.png',
    './images/icons/icon-152x152.png',
    './images/icons/icon-192x192.png',
    './images/icons/icon-384x384.png',
    './images/icons/icon-512x512.png',
    './imagenes/arquitecto.png',
    './imagenes/artes-marciales.png',
    './imagenes/facebook.png',
    './imagenes/game-console.png',
    './imagenes/instagram.png',
    './imagenes/jugadores-de-futbol.png',
    './imagenes/pelota-de-futbol.png',
    './imagenes/youtube.png',
    './imagenes/Avatar.jpg',
    './imagenes/avatar1.jpg',
    './imagenes/imgKriling.jpg',
    './imagenes/tazaCafe.jpg',
    './curriculums/CV_KrilingJaridGarciaEspinoza.pdf'

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


self.addEventListener('install', e => {
    console.log('The service is already installed');
    e.waitUntil(
        caches.open(staticCacheName)
            .then(async cache => {
                await cache.addAll(filesToCache);
                self.skipWaiting();
            })
            .catch(err => console.log('No se ha registrado el cache', err))
    )


});

/* 
//APP SHELL -> Lo que se requiere para que funcione la aplicación offline
self.addEventListener('install', e => {
    console.log('se instalo correctamente')
    const cacheProme = caches.open(staticCacheName)
        .then(cache => {
            return cache.addAll(filesToCache);
        });
    e.waitUntil((async () => {
        cacheProme
    })());
}); */

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
/* 
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
}); */




self.addEventListener('activate', (event) => {
    console.log('[Service Worker] activate');

    event.waitUntil((async () => {
        // Enable navigation preload if it's supported.
        // See https://developers.google.com/web/updates/2017/02/navigation-preload
        if ('navigationPreload' in self.registration) {
            await self.registration.navigationPreload.enable();
        }
    })());

    // Tell the active service worker to take control of the page immediately.
    self.clients.claim();
});

// Serve from Cache
self.addEventListener("fetch", event => {
    console.log('[The fetch] activate successfully');
    event.respondWith(checkResponse(event.request)
    .catch(function () {
        return returnFromCache(event.request);
    }));
    event.waitUntil(addToCache(event.request));



       /*  caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
            .catch(() => {
                return caches.match('offline');
            })
    ) */
});

var checkResponse = function (request) {
    return new Promise(function (fulfill, reject) {
        fetch(request).then(function (response) {
            if (response.status !== 404) {
                fulfill(response);
            } else {
                reject();
            }
        }, reject);
    });
};

var addToCache = async function (request) {
    const cache = await caches.open("offline");
    const response = await fetch(request);
    return await cache.put(request, response);
};

var returnFromCache = async function (request) {
    const cache = await caches.open("offline");
    const matching = await cache.match(request);
    if (!matching || matching.status == 404) {
        return cache.match("offline");
    } else {
        return matching;
    }
};