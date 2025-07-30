// =================================================================
// BINGO VIP BOLIVIA - CÓDIGO MAESTRO (INCLUYE LOGIN)
// =================================================================

// --- 1. IMPORTACIÓN DE FIREBASE ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// --- 2. CONFIGURACIÓN DE FIREBASE ---
const firebaseConfig = {
  apiKey: "AIzaSyDREqTx0PpnRDmE4J-wQlYR1JkqaJvHI4Y", // Tu llave API correcta
  authDomain: "bingo-vip-bolivia-df2db.firebaseapp.com",
  projectId: "bingo-vip-bolivia-df2db",
  storageBucket: "bingo-vip-bolivia-df2db.appspot.com",
  messagingSenderId: "310290230955",
  appId: "1:310290230955:web:3526c26c2800b43ffcd1ee"
};

// --- 3. INICIALIZACIÓN DE FIREBASE ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// --- 4. TRADUCCIONES ---
const translations = {
    es: { 
        startBtn: "Iniciar Juego", 
        warning: "⚠️ Juego para mayores de 18 años. Juega con responsabilidad.", 
        flag: "🇧🇴 Español",
        loginTitle: "Iniciar Sesión",
        emailPlaceholder: "Correo Electrónico",
        passwordPlaceholder: "Contraseña",
        loginButton: "Entrar",
        registerText: "¿No tienes una cuenta? <a href='register.html'>Regístrate</a>"
    },
    en: { 
        startBtn: "Start Game", 
        warning: "⚠️ Game for ages 18+. Play responsibly.", 
        flag: "🇺🇸 English",
        loginTitle: "Login",
        emailPlaceholder: "Email Address",
        passwordPlaceholder: "Password",
        loginButton: "Enter",
        registerText: "Don't have an account? <a href='register.html'>Sign Up</a>"
    },
    pt: { 
        startBtn: "Iniciar Jogo", 
        warning: "⚠️ Jogo para maiores de 18 anos. Jogue com responsabilidade.", 
        flag: "🇧🇷 Português",
        loginTitle: "Entrar",
        emailPlaceholder: "Endereço de e-mail",
        passwordPlaceholder: "Senha",
        loginButton: "Entrar",
        registerText: "Não tem uma conta? <a href='register.html'>Cadastre-se</a>"
    }
};

// --- 5. LÓGICA PRINCIPAL ---
document.addEventListener('DOMContentLoaded', () => {
    
    let currentLang = localStorage.getItem('userLanguage') || 'es';

    function applyTranslations() {
        const t = translations[currentLang];
        // Elementos de index.html
        if (document.getElementById('start-button')) document.getElementById('start-button').textContent = t.startBtn;
        if (document.getElementById('warning-text')) document.getElementById('warning-text').textContent = t.warning;
        // Elementos de login.html
        if (document.getElementById('login-title')) document.getElementById('login-title').textContent = t.loginTitle;
        if (document.querySelector('input[name="email"]')) document.querySelector('input[name="email"]').placeholder = t.emailPlaceholder;
        if (document.getElementById('password-field')) document.getElementById('password-field').placeholder = t.passwordPlaceholder;
        if (document.getElementById('login-button')) document.getElementById('login-button').textContent = t.loginButton;
        if (document.getElementById('register-text')) document.getElementById('register-text').innerHTML = t.registerText;
        // Elemento común
        if (document.getElementById('language-button')) document.getElementById('language-button').textContent = t.flag;
    }
    applyTranslations();

    const languageMenu = document.getElementById('language-menu');
    const languageButton = document.getElementById('language-button');
    if (languageButton) {
        languageButton.addEventListener('click', () => languageMenu.classList.toggle('hidden'));
    }
    if (languageMenu) {
        languageMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                currentLang = e.target.dataset.lang;
                localStorage.setItem('userLanguage', currentLang);
                applyTranslations();
                languageMenu.classList.add('hidden');
            }
        });
    }

    // Lógica para INDEX.HTML
    const startButton = document.getElementById('start-button');
    if (startButton) {
        startButton.addEventListener('click', () => {
            const backgroundMusic = document.getElementById('background-music');
            if (backgroundMusic) {
                backgroundMusic.volume = 0.2;
                backgroundMusic.play().catch(e => {});
            }
            document.getElementById('loader-screen').classList.remove('hidden');
            let progress = 0;
            const interval = setInterval(() => {
                progress++;
                if (progress > 100) progress = 100;
                document.getElementById('loader-bar').style.width = progress + '%';
                document.getElementById('loader-percentage').textContent = progress + '%';
                if (progress === 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 500);
                }
            }, 50);
        });
    }

    // Lógica para LOGIN.HTML
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
                    alert('¡Login exitoso! Próximo paso: El Lobby.');
                    // window.location.href = '/lobby.html';
                })
                .catch((error) => alert("Error: " + error.message));
        });
    }
});
