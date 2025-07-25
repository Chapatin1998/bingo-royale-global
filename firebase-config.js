// firebase-config.js

// Importa las funciones necesarias del SDK de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta las instancias de Auth y Firestore para que puedan ser usadas en otros archivos
export const auth = getAuth(app);
export const db = getFirestore(app);

// Opcional: Para compatibilidad con código antiguo o si lo usas directamente en el HTML
// window.auth = auth;
// window.db = db;
