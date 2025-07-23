
// firebase-config.js

// Configuración de Firebase para el proyecto Bingo Vip Bolivia
// REEMPLAZA "TU_API_KEY_AQUI" CON LA CLAVE QUE ME ENVIASTE O LA DE TU CONSOLA.
const firebaseConfig = {
    apiKey: (AIzaSyDhXhwJXEpeBBB23l49XRaxiRT2-9mz0KI) // <--- ¡AQUÍ VA TU CLAVE API REAL! (AIzaSyDhXhwJXEpeBBB23l49XRaxiRT2-9mz0KI)
    authDomain: "bingo-vip-bolivia-df2db.firebaseapp.com",
    projectId: "bingo-vip-bolivia-df2db",
    storageBucket: "bingo-vip-bolivia-df2db.appspot.com", // Inferido del projectId
    messagingSenderId: "310290230955",
    appId: "1:310290230955:web:352fc25c280b42ff2c1ee"
};

// Inicializa Firebase (asegúrate de que esto se haga solo una vez)
if (typeof firebase === 'undefined' || !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
