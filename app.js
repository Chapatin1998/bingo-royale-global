// --- IMPORTACIONES DE FIREBASE ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// --- CONFIGURACIÓN DE FIREBASE ---
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

// --- LÓGICA PRINCIPAL ---
document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DE LA PÁGINA DE INICIO (index.html) ---
    const startButton = document.getElementById('start-button');
    if (startButton) {
        startButton.addEventListener('click', () => {
            document.getElementById('main-content').style.opacity = '0';
            document.getElementById('loader-screen').classList.remove('hidden');
            let progress = 0;
            const interval = setInterval(() => {
                progress++;
                if(progress > 100) progress = 100;
                document.getElementById('loader-bar').style.width = progress + '%';
                document.getElementById('loader-percentage').textContent = progress + '%';
                if (progress === 100) {
                    clearInterval(interval);
                    setTimeout(() => window.location.href = 'login.html', 500);
                }
            }, 50);
        });
    }

    // --- LÓGICA DE LOGIN ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = loginForm.email.value;
            const password = loginForm.password.value;
            signInWithEmailAndPassword(auth, email, password)
                .then(() => { alert('¡Login Exitoso!'); /* Redirigir al lobby */ })
                .catch((error) => alert(error.message));
        });
    }

    // --- LÓGICA DE REGISTRO ---
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = registerForm.email.value;
            const password = registerForm.password.value;
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => { alert('¡Registro Exitoso!'); /* Redirigir a completar perfil */ })
                .catch((error) => alert(error.message));
        });
    }
});
