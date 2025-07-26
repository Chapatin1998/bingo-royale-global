// firebase-config.js

// Importa las funciones necesarias del SDK de Firebase
// NOTA: Con la versión 'compat' en index.html, 'firebase' ya es global.
// Estas importaciones aquí son solo por si este archivo fuera un módulo independiente.
// import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
// import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
// import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// Tu configuración de Firebase (tomada de tus capturas)
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
    // Usamos el objeto global 'firebase' de la versión 'compat'
    if (typeof firebase !== 'undefined' && (!firebase.apps || firebase.apps.length === 0)) {
        app = firebase.initializeApp(firebaseConfig);
        console.log("Firebase inicializado correctamente.");
    } else if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
        app = firebase.apps[0]; // Reutiliza la instancia existente
        console.log("Firebase ya estaba inicializado o se está reutilizando.");
    } else {
        throw new Error("El objeto global 'firebase' no está definido. SDK no cargado.");
    }
} catch (error) {
    console.error("Error al inicializar Firebase en firebase-config.js:", error);
    alert("CRÍTICO: Error al inicializar Firebase. " + error.message);
}

// Hacemos 'auth' y 'db' disponibles globalmente a través de window
if (app) {
    try {
        window.auth = firebase.auth(); // Obtiene la instancia de Auth
        window.db = firebase.firestore(); // Obtiene la instancia de Firestore
        // alert("Firebase Auth y DB asignados a window."); // Diagnóstico
    } catch (error) {
        console.error("Error al obtener servicios de Firebase:", error);
        alert("CRÍTICO: No se pudieron obtener servicios de Firebase. " + error.message);
    }
} else {
    // alert("CRÍTICO: 'app' de Firebase no está definida para asignar servicios."); // Diagnóstico
}
