import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
// --- 2. CONFIGURACIÓN DE FIREBASE ---
const firebaseConfig = {
  apiKey: "AIzaSyCmWFaQv-iJ5LdfGXY1fmi_1KZmzFv3TSI",
  authDomain: "bingo-vip-bolivia-df2db.firebaseapp.com",
  projectId: "bingo-vip-bolivia-df2db",
  storageBucket: "bingo-vip-bolivia-df2db.firebasestorage.app",
  messagingSenderId: "310290230955",
  appId: "1:310290230955:web:3526c26c2800b43ffcd1ee",
  measurementId: "G-VRR7JSHY5G"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Lógica para la PÁGINA DE INICIO (index.html) ---
    const startButton = document.getElementById('start-button');
    if (startButton) {
        const startScreen = document.getElementById('start-screen');
        const loaderScreen = document.getElementById('loader-screen');
        const backgroundMusic = document.getElementById('background-music');

        startButton.addEventListener('click', () => {
            if (backgroundMusic) {
                backgroundMusic.volume = 0.2;
                backgroundMusic.play().catch(e => {});
            }
            if(startScreen) startScreen.style.opacity = '0';
            if (loaderScreen) loaderScreen.classList.remove('hidden');
            
            setTimeout(() => {
                if(startScreen) startScreen.style.display = 'none';
            }, 1200);

            const loaderBar = document.getElementById('loader-bar');
            const loaderPercentage = document.getElementById('loader-percentage');
            let progress = 0;
            const interval = setInterval(() => {
                progress++;
                if (progress > 100) progress = 100;
                if (loaderBar) loaderBar.style.width = progress + '%';
                if (loaderPercentage) loaderPercentage.textContent = progress + '%';
                if (progress === 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 500);
                }
            }, 50); // Barra de carga de 5 segundos
        });
    }

    // --- Lógica para la PÁGINA DE LOGIN (login.html) ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        const togglePassword = document.querySelector('.toggle-password');
        if (togglePassword) {
            togglePassword.addEventListener('click', function() {
                const passwordField = document.getElementById('password-field');
                const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordField.setAttribute('type', type);
                this.textContent = type === 'password' ? '👁️' : '🙈';
            });
        }
        
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = loginForm.email.value;
            const password = loginForm.password.value;
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    alert('¡Login Exitoso! Próximo paso: El Lobby.');
                    // window.location.href = '/lobby.html';
                })
                .catch((error) => alert("Error: " + error.message));
        });
    }
});
