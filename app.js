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
// ... (Toda la parte de importación y configuración de Firebase se mantiene igual) ...
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
// ... etc

const firebaseConfig = {
  // ... tu configuración ...
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// ... etc

document.addEventListener('DOMContentLoaded', () => {

    // --- ¡NUEVO! Lógica de Entrada Cinematográfica ---
    const enterButton = document.getElementById('enter-button');
    const initialContent = document.getElementById('initial-content');
    const authButtons = document.getElementById('auth-buttons');
    const musicControl = document.getElementById('music-control');
    const backgroundMusic = document.getElementById('background-music');
    let isMusicPlaying = false;

    if (enterButton) {
        enterButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Iniciar música
            if (backgroundMusic) {
                backgroundMusic.play().then(() => {
                    isMusicPlaying = true;
                    musicControl.style.display = 'flex'; // Muestra el botón de control
                    musicControl.classList.add('playing');
                }).catch(err => console.log("Error al reproducir música:", err));
            }

            // Efecto de transición
            initialContent.classList.add('fade-out');
            setTimeout(() => {
                initialContent.style.display = 'none';
                authButtons.style.display = 'flex';
                authButtons.classList.add('fade-in');
            }, 500); // 500ms = 0.5s, igual que la duración de la animación en CSS
        });
    }
    
    if (musicControl && backgroundMusic) {
        musicControl.addEventListener('click', () => {
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

    // ... (Aquí va toda la lógica que ya teníamos: togglePassword, registerForm, loginForm, etc.)
    // ... Asegúrate de pegar el resto de tu código de app.js aquí ...
});


// ... (Aquí va el onAuthStateChanged, se mantiene igual) ...



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
