// Importamos todo lo que necesitamos de Firebase al principio
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";

// Tu configuración de Firebase (asegúrate de que esta sea la llave MÁS RECIENTE)
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhXhwJXEpeBBB23l49XRaxiRT2-9mz0KI,
  authDomain: "bingo-vip-bolivia-df2db.firebaseapp.com",
  projectId: "bingo-vip-bolivia-df2db",
  storageBucket: "bingo-vip-bolivia-df2db.firebasestorage.app",
  messagingSenderId: "310290230955",
  appId: "1:310290230955:web:3526c26c2800b43ffcd1ee",
  measurementId: "G-VRR7JSHY5G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicializamos todos los servicios de Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// --- LÓGICA DE LA APLICACIÓN ---

// Esta función se ejecuta cuando toda la página se ha cargado
document.addEventListener('DOMContentLoaded', () => {

    // Lógica para el formulario de registro
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita que la página se recargue
            const email = registerForm.email.value;
            const password = registerForm.password.value;
            
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log("Usuario registrado, completando perfil:", userCredential.user);
                    window.location.href = 'complete-profile.html';
                })
                .catch((error) => {
                    alert("Error en el registro: " + error.message);
                });
        });
    }

    // Lógica para el formulario de login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = loginForm.email.value;
            const password = loginForm.password.value;

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log("Usuario conectado:", userCredential.user);
                    window.location.href = 'lobby.html';
                })
                .catch((error) => {
                    alert("Error al iniciar sesión: " + error.message);
                });
        });
    }

    // Lógica para el botón de logout
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            signOut(auth).then(() => {
                window.location.href = 'index.html';
            }).catch((error) => {
                alert("Error al cerrar sesión: " + error.message);
            });
        });
    }
});


// ¡ATENCIÓN! La lógica de la página de perfil ahora necesita estar en este archivo también
// Por ahora, para no complicarlo, la dejaremos fuera. Primero hagamos que el registro funcione.

// Escuchar cambios en el estado de autenticación (Protección de rutas)
onAuthStateChanged(auth, (user) => {
    const currentPage = window.location.pathname.split("/").pop();
    const protectedPages = ['lobby.html', 'complete-profile.html'];

    if (user) {
        // Usuario conectado: si está en una página pública, llévalo al lobby
        if (!protectedPages.includes(currentPage)) {
            window.location.href = 'lobby.html';
        }
    } else {
        // Usuario NO conectado: si intenta entrar a una página protegida, llévalo al login
        if (protectedPages.includes(currentPage)) {
            window.location.href = 'login.html';
        }
    }
});
