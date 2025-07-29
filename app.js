// Importamos todo lo que necesitamos de Firebase al principio
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCmWFaQv-iJ5LdfGXY1fmi_1KZmzFv3TSI",
  authDomain: "bingo-vip-bolivia-df2db.firebaseapp.com",
  projectId: "bingo-vip-bolivia-df2db",
  storageBucket: "bingo-vip-bolivia-df2db.firebasestorage.app",
  messagingSenderId: "310290230955",
  appId: "1:310290230955:web:3526c26c2800b43ffcd1ee",
  measurementId: "G-VRR7JSHY5G"
};

// Inicializamos todos los servicios de Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// --- LÓGICA DE LA APLICACIÓN ---

document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica para mostrar/ocultar contraseña ---
    const togglePassword = document.querySelector('.toggle-password');
    const passwordField = document.getElementById('password-field');
    if (togglePassword && passwordField) {
        togglePassword.addEventListener('click', function () {
            const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordField.setAttribute('type', type);
            this.textContent = type === 'password' ? '👁️' : '🙈';
        });
    }

    // --- Lógica para la música de fondo ---
    const musicControl = document.getElementById('music-control');
    const backgroundMusic = document.getElementById('background-music');
    let isMusicPlaying = false;
    if (musicControl && backgroundMusic) {
        // Función para intentar iniciar la música
        const startMusic = () => {
            if (!isMusicPlaying) {
                backgroundMusic.play().then(() => {
                    isMusicPlaying = true;
                    musicControl.classList.add('playing');
                }).catch(e => console.log("El navegador necesita interacción del usuario para iniciar el audio."));
            }
        };
        // Intentamos iniciar la música con el primer toque en cualquier lugar
        document.body.addEventListener('click', startMusic, { once: true });

        musicControl.addEventListener('click', (e) => {
            e.stopPropagation();
            if (isMusicPlaying) {
                backgroundMusic.pause();
                musicControl.classList.remove('playing');
            } else {
                backgroundMusic.play();
                musicControl.classList.add('playing');
            }
            isMusicPlaying = !isMusicPlaying;
        });
    }

    // --- Lógica para el formulario de registro ---
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = registerForm.email.value;
            const password = registerForm.password.value;
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    // No hacemos nada aquí, el onAuthStateChanged se encargará de redirigir
                })
                .catch((error) => alert("Error en el registro: " + error.message));
        });
    }

    // --- Lógica para el formulario de login ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = loginForm.email.value;
            const password = loginForm.password.value;
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    // No hacemos nada aquí, el onAuthStateChanged se encargará de redirigir
                })
                .catch((error) => alert("Error al iniciar sesión: " + error.message));
        });
    }

    // --- Lógica para el botón de logout ---
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            signOut(auth); // onAuthStateChanged se encargará de redirigir
        });
    }
});

// --- GUARDIA DE SEGURIDAD (onAuthStateChanged) INTELIGENTE ---
onAuthStateChanged(auth, (user) => {
    const currentPage = window.location.pathname.split("/").pop();
    const publicPages = ['index.html', 'login.html', 'register.html', ''];

    if (user) {
        // Usuario CONECTADO
        console.log("Usuario conectado, redirigiendo al lobby...");
        // Si está en una página pública, lo mandamos al lobby
        if (publicPages.includes(currentPage)) {
            window.location.href = 'lobby.html';
        }
    } else {
        // Usuario NO CONECTADO
        console.log("Usuario no conectado, redirigiendo al login si es necesario...");
        // Si está en una página protegida, lo mandamos al login
        if (!publicPages.includes(currentPage)) {
            window.location.href = 'login.html';
        }
    }
});
