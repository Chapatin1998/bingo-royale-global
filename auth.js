// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Your web app's Firebase configuration
// ¡ESTAS SON TUS LLAVES! YA LAS HE PUESTO AQUÍ.
const firebaseConfig = {
  apiKey: "AIzaSyDREqTx0PpnRDmE4J-wQlYR1JkqaJvHI4Y",
  authDomain: "bingo-vip-bolivia-df2db.firebaseapp.com",
  projectId: "bingo-vip-bolivia-df2db",
  storageBucket: "bingo-vip-bolivia-df2db.appspot.com",
  messagingSenderId: "310290230955",
  appId: "1:310290230955:web:3526c26c2800b43ffcd1ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// --- FUNCIONES QUE USAREMOS ---

// Función para registrar un nuevo usuario
window.registerUser = function(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Registro exitoso, redirigir al lobby
            console.log("Usuario registrado:", userCredential.user);
            window.location.href = 'lobby.html';
        })
        .catch((error) => {
            // Manejar errores
            alert("Error en el registro: " + error.message);
        });
}

// Función para iniciar sesión
window.loginUser = function(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Login exitoso, redirigir al lobby
            console.log("Usuario conectado:", userCredential.user);
            window.location.href = 'lobby.html';
        })
        .catch((error) => {
            // Manejar errores
            alert("Error al iniciar sesión: " + error.message);
        });
}

// Función para cerrar sesión
window.logoutUser = function() {
    signOut(auth).then(() => {
        // Cierre de sesión exitoso, redirigir a la página de inicio
        window.location.href = 'index.html';
    }).catch((error) => {
        alert("Error al cerrar sesión: " + error.message);
    });
}

// Escuchar cambios en el estado de autenticación
onAuthStateChanged(auth, (user) => {
    const currentPage = window.location.pathname.split("/").pop();
    if (user) {
        // El usuario está conectado
        // Si está en la página de login o registro, lo llevamos al lobby
        if (currentPage === 'login.html' || currentPage === 'register.html' || currentPage === 'index.html' || currentPage === '') {
            window.location.href = 'lobby.html';
        }
    } else {
        // El usuario no está conectado
        // Si intenta entrar al lobby, lo llevamos al login
        if (currentPage === 'lobby.html') {
            window.location.href = 'login.html';
        }
    }
});
