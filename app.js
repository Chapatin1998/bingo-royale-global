// =================================================================
// BINGO VIP BOLIVIA - CÓDIGO MAESTRO v8 (EL DEFINITIVO)
// =================================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyDREqTx0PpnRDmE4J-wQlYR1JkqaJvHI4Y", // Tu llave API correcta
  authDomain: "bingo-vip-bolivia-df2db.firebaseapp.com",
  projectId: "bingo-vip-bolivia-df2db",
  storageBucket: "bingo-vip-bolivia-df2db.appspot.com",
  messagingSenderId: "310290230955",
  appId: "1:310290230955:web:3526c26c2800b43ffcd1ee"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {
    // Lógica para mostrar/ocultar contraseña
    const togglePassword = document.querySelector('.toggle-password');
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const passwordField = document.getElementById('password-field');
            const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordField.setAttribute('type', type);
            this.textContent = type === 'password' ? '👁️' : '🙈';
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
                .catch((error) => alert(error.message));
        });
    }

    // Lógica para el formulario de registro
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = registerForm.email.value;
            const password = registerForm.password.value;
            createUserWithEmailAndPassword(auth, email, password)
                .catch((error) => alert(error.message));
        });
    }

    // Lógica de la Música
    const musicControl = document.getElementById('music-control');
    const backgroundMusic = document.getElementById('background-music');
    if (musicControl && backgroundMusic) {
        let isMusicPlaying = false;
        document.body.addEventListener('click', () => {
            if (!isMusicPlaying) {
                backgroundMusic.volume = 0.2;
                backgroundMusic.play();
                isMusicPlaying = true;
                musicControl.classList.add('playing');
            }
        }, { once: true });

        musicControl.addEventListener('click', () => {
            if (isMusicPlaying) {
                backgroundMusic.pause();
            } else {
                backgroundMusic.play();
            }
            isMusicPlaying = !isMusicPlaying;
            musicControl.classList.toggle('playing');
        });
    }
});

// Guardia de seguridad (Router)
onAuthStateChanged(auth, (user) => {
    const protectedPages = ['lobby.html']; // Añade aquí las páginas protegidas
    const currentPage = window.location.pathname.split("/").pop();
    if (user) {
        // Si el usuario está logueado y no está en una página protegida, llévalo al lobby
        if (!protectedPages.includes(currentPage)) {
            // window.location.href = 'lobby.html'; // Lo activaremos después
        }
    } else {
        // Si el usuario no está logueado y trata de acceder a una página protegida
        if (protectedPages.includes(currentPage)) {
            window.location.href = 'login.html';
        }
    }
});
