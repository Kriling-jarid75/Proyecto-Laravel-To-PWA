<!-- Web Application Manifest -->
<link rel="manifest" href="{{ route('laravelpwa.manifest') }}">
<!-- Chrome for Android theme color -->
<meta name="theme-color" content="{{ $config['theme_color'] }}">

<!-- Add to homescreen for Chrome on Android -->
<meta name="mobile-web-app-capable" content="{{ $config['display'] == 'standalone' ? 'yes' : 'no' }}">
<meta name="application-name" content="{{ $config['short_name'] }}">
<link rel="icon" sizes="{{ data_get(end($config['icons']), 'sizes') }}"
    href="{{ data_get(end($config['icons']), 'src') }}">

<!-- Add to homescreen for Safari on iOS -->
<meta name="apple-mobile-web-app-capable" content="{{ $config['display'] == 'standalone' ? 'yes' : 'no' }}">
<meta name="apple-mobile-web-app-status-bar-style" content="{{  $config['status_bar'] }}">
<meta name="apple-mobile-web-app-title" content="{{ $config['short_name'] }}">
<link rel="apple-touch-icon" href="{{ data_get(end($config['icons']), 'src') }}">


<link href="{{ $config['splash']['640x1136'] }}"
    media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
    rel="apple-touch-startup-image" />
<link href="{{ $config['splash']['750x1334'] }}"
    media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
    rel="apple-touch-startup-image" />
<link href="{{ $config['splash']['1242x2208'] }}"
    media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)"
    rel="apple-touch-startup-image" />
<link href="{{ $config['splash']['1125x2436'] }}"
    media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
    rel="apple-touch-startup-image" />
<link href="{{ $config['splash']['828x1792'] }}"
    media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
    rel="apple-touch-startup-image" />
<link href="{{ $config['splash']['1242x2688'] }}"
    media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
    rel="apple-touch-startup-image" />
<link href="{{ $config['splash']['1536x2048'] }}"
    media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
    rel="apple-touch-startup-image" />
<link href="{{ $config['splash']['1668x2224'] }}"
    media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
    rel="apple-touch-startup-image" />
<link href="{{ $config['splash']['1668x2388'] }}"
    media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
    rel="apple-touch-startup-image" />
<link href="{{ $config['splash']['2048x2732'] }}"
    media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
    rel="apple-touch-startup-image" />

<!-- Tile for Win8 -->
<meta name="msapplication-TileColor" content="{{ $config['background_color'] }}">
<meta name="msapplication-TileImage" content="{{ data_get(end($config['icons']), 'src') }}">


<!--Librerias de firebase-->
<script src="https://www.gstatic.com/firebasejs/7.6.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.6.1/firebase-firestore.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.6.1/firebase-messaging.js"></script>


<script type="text/javascript">
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
messaging
    .requestPermission()
    .then(() => {
        console.log("Notifications allowed");
    })
    .catch(err => {
        console.log("No permission to send push", err);
    });

messaging.onMessage(function(payload) {

    console.log("Notifications onMessage");

    const title = payload.notification.title;
    const options = {
        body: payload.notification.body,
        icon: payload.notification.icon,
    };
    new Notification(title, options);
});

//console.log(messaging.getToken());

const db = firebase.firestore();


//onSnapshot

db.collection("notificacionesNuevas").where('leido', '==', false).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        const {
            titulo,
            mensaje
        } = doc.data();

        const notificationTitle = titulo;
        const notificationOptions = {
            body: mensaje
        };
        //Show the notification :)
        let notifi = new Notification(
            notificationTitle,
            notificationOptions
        );

        notifi.onclick = function() {
            window.parent.focus();
            notifi.close();
        }

        console.log(`${doc.id}`);
        console.log(`${titulo}`);
        console.log(`${mensaje}`);
    });
});

// Initialize the service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceworker.js', {
        scope: '.'
    }).then(function(registration) {
        // Registration was successful
        console.log('Laravel PWA: ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
        // registration failed :(
        console.log('Laravel PWA: ServiceWorker registration failed: ', err);
    });

}
</script>