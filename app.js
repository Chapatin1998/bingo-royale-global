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
    
    // ... (El resto de la lógica de los formularios que ya teníamos) ...

    // --- ¡NUEVO! Lógica para mostrar/ocultar contraseña ---
    const togglePassword = document.querySelector('.toggle-password');
    const passwordField = document.getElementById('password-field');

    if (togglePassword && passwordField) {
        togglePassword.addEventListener('click', function () {
            const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordField.setAttribute('type', type);
            this.textContent = type === 'password' ? '👁️' : '🙈';
        });
    }

    // --- ¡NUEVO! Lógica para la música de fondo ---
    const musicControl = document.getElementById('music-control');
    const backgroundMusic = document.getElementById('background-music');
    let isMusicPlaying = false;

    if (musicControl && backgroundMusic) {
        // Para que la música pueda empezar, el usuario debe interactuar primero.
        // Haremos que la música intente empezar al primer clic en cualquier lugar.
        document.body.addEventListener('click', () => {
            if (!isMusicPlaying) {
                backgroundMusic.play().then(() => {
                    isMusicPlaying = true;
                    musicControl.textContent = '🔇';
                }).catch(e => console.log("El navegador bloqueó la reproducción automática."));
            }
        }, { once: true }); // 'once: true' hace que esto solo ocurra la primera vez.

        musicControl.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que el clic en el botón se propague al body.
            if (isMusicPlaying) {
                backgroundMusic.pause();
                musicControl.textContent = '🎵';
            } else {
                backgroundMusic.play();
                musicControl.textContent = '🔇';
            }
            isMusicPlaying = !isMusicPlaying;
        });
    }
});


// ... (Aquí va el resto del código de app.js: registerForm, loginForm, logoutButton, onAuthStateChanged, etc.
// Pega el resto de tu app.js aquí para mantener toda la funcionalidad)

