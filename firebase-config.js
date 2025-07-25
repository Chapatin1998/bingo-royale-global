// firebase-config.js

// Ya no necesitamos 'import' para initializeApp, getAuth, getFirestore aquí
// si los cargamos globalmente en index.html con la versión compat
// Pero SÍ necesitamos que las variables 'auth' y 'db' se configuren globalmente.

const firebaseConfig = {
  apiKey: "AIzaSyDhXhwJXEpeBBB23l49XRaxiRT2-9mz0KI", // Tu API Key
  authDomain: "bingo-vip-bolivia-df2db.firebaseapp.com",
  projectId: "bingo-vip-bolivia-df2db",
  storageBucket: "bingo-vip-bolivia-df2db.appspot.com",
  messagingSenderId: "1015694294025",
  appId: "1:1015694294025:web:5d254b0374e26210214842",
  measurementId: "G-G6402N020Z"
};

// Inicializa Firebase UNA SOLA VEZ
let app;
try {
    // Si firebase (el objeto global) ya existe y no hay apps inicializadas
    if (typeof firebase !== 'undefined' && (!firebase.apps || firebase.apps.length === 0)) {
        app = firebase.initializeApp(firebaseConfig);
        console.log("Firebase inicializado correctamente.");
    } else if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
        app = firebase.apps[0]; // Reutiliza la instancia existente
        console.log("Firebase ya estaba inicializado o se está reutilizando.");
    } else {
        // Esto podría ocurrir si firebase-app-compat.js no se cargó
        throw new Error("El objeto 'firebase' no está definido globalmente.");
    }
} catch (error) {
    console.error("Error al inicializar Firebase:", error);
    alert("Error crítico: No se pudo inicializar Firebase. Por favor, recarga la página. " + error.message);
}

// Hacemos 'auth' y 'db' disponibles globalmente
window.auth = app ? firebase.auth().getAuth(app) : null;
window.db = app ? firebase.firestore().getFirestore(app) : null;

// NOTA: No se usa 'export' en este archivo si los scripts se cargan sin type="module"
// y se accede a 'auth'/'db' via window.auth/window.db
