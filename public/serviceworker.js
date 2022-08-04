importScripts("https://www.gstatic.com/firebasejs/7.6.1/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/7.6.1/firebase-messaging.js")

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBGENTu2CsqIYvrE0l53f8LI2r9dXQJDn0",
    authDomain: "projectolaraveltopwa.firebaseapp.com",
    projectId: "projectolaraveltopwa",
    storageBucket: "projectolaraveltopwa.appspot.com",
    messagingSenderId: "955848763244",
    appId: "1:955848763244:web:4a7a2d06795c46d55e7549"
};


firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(payload => {
    console.log("Message Received");

    const notification = JSON.parse(payload.data.notification);
    const notificationTitle = notification.title;
    const notificationOptions = {
        body: notification.body
    };
    //Show the notification :)
    return self.registration.showNotification(
        notificationTitle,
        notificationOptions
    );
});


self.addEventListener('push', function (event) {
    console.log('[Service Worker] Push');
    var data = event.data.json();

    const title = data.Title;
    data.Data.actions = data.Actions;
    const options = {
        body: data.Message,
        data: data.Data
    };
    event.waitUntil(self.registration.showNotification(title, options));
});


var staticCacheName = "pwa-v" + new Date().getTime();
const filesToCache = [
    './welcome',
    './offline',
    './css/app.css',
    './estilos/estiloPrincipal.css',
    './estilos/estilosCVDavid.css',
    './estilos/estiilosCVKriling.css',
    './estilos/estilosCVManuel.css',
    './estilos/estilosCVPao.css',
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
    './imagenes/img.png',
    './imagenes/pao.jpg',
    './curriculums/CV_KrilingJaridGarciaEspinoza.pdf'

];


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


self.addEventListener('notificationclick', function (event) {
    console.log('On notification click: ', event.notification.tag);
    event.notification.close();

    // This looks to see if the current is already open and
    // focuses if it is
    event.waitUntil(clients.matchAll({
        type: "window"
    }).then(function (clientList) {
        for (var i = 0; i < clientList.length; i++) {

            var client = clientList[i];
            console.log(client.url);
            return client.focus();

        }
        //if (clients.openWindow)
        //return clients.openWindow('/');
    }));
});



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





self.addEventListener('fetch', (event) => {
    console.log('[Service Worker] fetch');

    /* event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if (response) {
                    return response;     // if valid response is found in cache return it
                } else {
                    return fetch(event.request)     //fetch from internet
                        .then(function (res) {
                            return caches.open(staticCacheName)
                                .then(function (cache) {
                                    cache.put(event.request.url, res.clone());    //save the response for future
                                    return res;   // return the fetched data
                                })
                        })
                        .catch(function (err) {       // fallback mechanism
                            return caches.open(filesToCache)
                                .then(function (cache) {
                                    return cache.match('./offline');
                                });
                        });
                }
            })
    ); */
    if (event.request.mode === 'navigate') {
        event.respondWith((async () => {
            try {
                // First, try to use the navigation preload response if it's supported.
                const preloadResponse = await event.preloadResponse;
                if (preloadResponse) {
                    return preloadResponse;
                } else {
                    return fetch(event.request)     //fetch from internet
                        .then(async function (res) {
                            const cache = await caches.open(staticCacheName);
                            cache.put(event.request.url, res.clone()); //save the response for future
                            return res;
                        })
                        .catch(async function (err) {       // fallback mechanism
                            const cache = await caches.open(filesToCache);
                            return await cache.match('./offline');
                        });
                }
                /* const networkResponse = await fetch(event.request);
                return networkResponse; */
            } catch (err) {       // fallback mechanism
                const cache = await caches.open(filesToCache);
                return await cache.match('offline');
            }
        })
            ());
    }



});





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





/*
// Serve from Cache
self.addEventListener("fetch", event => {
    console.log('[The fetch] activate successfully');
    event.respondWith(checkResponse(event.request)
    .catch(function () {
        return returnFromCache(event.request);
    }));
    event.waitUntil(addToCache(event.request));
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

var returnFromCache = async function (request) {
    const cache = await caches.open("offline");
    const matching = await cache.match(request);
    if (!matching || matching.status == 404) {
        return cache.match("offline");
    } else {
        return matching;
    }
};

var addToCache = async function (request) {
    const cache = await caches.open("offline");
    const response = await fetch(request);
    return await cache.put(request, response);
};

*/