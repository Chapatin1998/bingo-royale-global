// =================================================================
// BINGO VIP BOLIVIA - CÓDIGO MAESTRO DE LÓGICA
// =================================================================

// --- 1. IMPORTACIÓN DE MÓDULOS DE FIREBASE ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// --- 2. CONFIGURACIÓN DE FIREBASE ---
const firebaseConfig = {
  apiKey: "AIzaSyDREqTx0PpnRDmE4J-wQlYR1JkqaJvHI4Y", // Tu llave API correcta
  authDomain: "bingo-vip-bolivia-df2db.firebaseapp.com",
  projectId: "bingo-vip-bolivia-df2db",
  storageBucket: "bingo-vip-bolivia-df2db.appspot.com",
  messagingSenderId: "310290230955",
  appId: "1:310290230955:web:3526c26c2800b43ffcd1ee"
};

// --- 3. INICIALIZACIÓN DE SERVICIOS DE FIREBASE ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// --- 4. DICCIONARIO DE TRADUCCIONES ---
const translations = {
    es: {
        // index.html
        startBtn: "Iniciar",
        warning: "⚠️ Juego para mayores de 18 años. Juega con responsabilidad.",
        flag: "🇧🇴 Español",
        // login.html
        loginTitle: "Iniciar Sesión",
        emailPlaceholder: "Correo Electrónico",
        passwordPlaceholder: "Contraseña",
        loginButton: "Entrar",
        registerText: "¿No tienes una cuenta? <a href='register.html'>Regístrate</a>"
    },
    en: {
        startBtn: "Start",
        warning: "⚠️ Game for ages 18+. Play responsibly.",
        flag: "🇺🇸 English",
        loginTitle: "Login",
        emailPlaceholder: "Email Address",
        passwordPlaceholder: "Password",
        loginButton: "Enter",
        registerText: "Don't have an account? <a href='register.html'>Sign Up</a>"
    },
    pt: {
        startBtn: "Iniciar",
        warning: "⚠️ Jogo para maiores de 18 anos. Jogue com responsabilidade.",
        flag: "🇧🇷 Português",
        loginTitle: "Entrar",
        emailPlaceholder: "Endereço de e-mail",
        passwordPlaceholder: "Senha",
        loginButton: "Entrar",
        registerText: "Não tem uma conta? <a href='register.html'>Cadastre-se</a>"
    }
};

// --- 5. LÓGICA PRINCIPAL (SE EJECUTA CUANDO LA PÁGINA CARGA) ---
document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica Común: Idioma ---
    const languageButton = document.getElementById('language-button');
    const languageMenu = document.getElementById('language-menu');
    let currentLang = localStorage.getItem('userLanguage') || 'es';

    function applyTranslations() {
        const t = translations[currentLang];
        // Aplicar a index.html
        if (document.getElementById('start-button')) document.getElementById('start-button').textContent = t.startBtn;
        if (document.getElementById('warning-text')) document.getElementById('warning-text').textContent = t.warning;
        // Aplicar a login.html
        if (document.getElementById('login-title')) document.getElementById('login-title').textContent = t.loginTitle;
        if (document.querySelector('input[name="email"]')) document.querySelector('input[name="email"]').placeholder = t.emailPlaceholder;
        if (document.getElementById('password-field')) document.getElementById('password-field').placeholder = t.passwordPlaceholder;
        if (document.getElementById('login-button')) document.getElementById('login-button').textContent = t.loginButton;
        if (document.getElementById('register-text')) document.getElementById('register-text').innerHTML = t.registerText;
        // Aplicar a ambos
        if (languageButton) languageButton.textContent = t.flag;
    }
    applyTranslations(); // Aplicar al cargar la página

    if (languageButton) {
        languageButton.addEventListener('click', () => languageMenu.classList.toggle('hidden'));
    }
    if (languageMenu) {
        languageMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                currentLang = e.target.dataset.lang;
                applyTranslations();
                languageMenu.classList.add('hidden');
            }
        });
    }

    // --- Lógica Específica para INDEX.HTML ---
    const startButton = document.getElementById('start-button');
    if (startButton) {
        const loaderScreen = document.getElementById('loader-screen');
        const backgroundMusic = document.getElementById('background-music');

        startButton.addEventListener('click', () => {
            if (backgroundMusic) {
                backgroundMusic.volume = 0.2;
                backgroundMusic.play().catch(e => {});
            }
            if (loaderScreen) loaderScreen.classList.remove('hidden');
            // ... (Aquí iría la lógica de la barra de carga que añadiremos después)
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 100); // Redirección rápida por ahora
        });
    }

    // --- Lógica Específica para LOGIN.HTML ---
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
                    alert('¡Login exitoso!');
                    // window.location.href = '/lobby.html';
                })
                .catch((error) => alert(error.message));
        });
    }
});
