import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
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

const translations = {
    es: { startBtn: "Iniciar Juego", warning: "⚠️ Juego para mayores de 18 años.", flag: "🇧🇴 Español", loginTitle: "Iniciar Sesión", emailPlaceholder: "Correo Electrónico", passwordPlaceholder: "Contraseña", loginButton: "Entrar", registerText: "¿No tienes una cuenta? <a href='register.html'>Regístrate</a>", registerTitle: "Crear Cuenta", registerButton: "Registrarme", passwordPlaceholderRegister: "Contraseña (mínimo 6 caracteres)", loginText: "¿Ya tienes una cuenta? <a href='login.html'>Inicia sesión</a>" },
    en: { startBtn: "Start Game", warning: "⚠️ Game for ages 18+.", flag: "🇺🇸 English", loginTitle: "Login", emailPlaceholder: "Email Address", passwordPlaceholder: "Password", loginButton: "Enter", registerText: "Don't have an account? <a href='register.html'>Sign Up</a>", registerTitle: "Create Account", registerButton: "Sign Me Up", passwordPlaceholderRegister: "Password (6+ characters)", loginText: "Already have an account? <a href='login.html'>Log In</a>" },
    pt: { startBtn: "Iniciar Jogo", warning: "⚠️ Jogo para maiores de 18 anos.", flag: "🇧🇷 Português", loginTitle: "Entrar", emailPlaceholder: "Endereço de e-mail", passwordPlaceholder: "Senha", loginButton: "Entrar", registerText: "Não tem uma conta? <a href='register.html'>Cadastre-se</a>", registerTitle: "Criar Conta", registerButton: "Inscrever-se", passwordPlaceholderRegister: "Senha (mínimo 6 caracteres)", loginText: "Já tem uma conta? <a href='login.html'>Entrar</a>" }
};

document.addEventListener('DOMContentLoaded', () => {
    let currentLang = localStorage.getItem('userLanguage') || 'es';
    function applyTranslations() {
        const t = translations[currentLang];
        // Index
        if (document.getElementById('start-button')) document.getElementById('start-button').textContent = t.startBtn;
        if (document.getElementById('warning-text')) document.getElementById('warning-text').textContent = t.warning;
        // Login
        if (document.getElementById('login-title')) document.getElementById('login-title').textContent = t.loginTitle;
        if (document.querySelector('input[name="email"]')) document.querySelector('input[name="email"]').placeholder = t.emailPlaceholder;
        if (document.getElementById('login-button')) document.getElementById('login-button').textContent = t.loginButton;
        if (document.getElementById('register-text')) document.getElementById('register-text').innerHTML = t.registerText;
        // Register
        if (document.getElementById('register-title')) document.getElementById('register-title').textContent = t.registerTitle;
        if (document.getElementById('register-button')) document.getElementById('register-button').textContent = t.registerButton;
        if (document.getElementById('login-text')) document.getElementById('login-text').innerHTML = t.loginText;
        // Contraseña (para ambas páginas)
        const passField = document.getElementById('password-field');
        if (passField && document.getElementById('login-form')) passField.placeholder = t.passwordPlaceholder;
        if (passField && document.getElementById('register-form')) passField.placeholder = t.passwordPlaceholderRegister;
        // Idioma
        if (document.getElementById('language-button')) document.getElementById('language-button').textContent = t.flag;
    }
    applyTranslations();

    const languageButton = document.getElementById('language-button');
    const languageMenu = document.getElementById('language-menu');
    if(languageButton) languageButton.addEventListener('click', () => languageMenu.classList.toggle('hidden'));
    if(languageMenu) languageMenu.addEventListener('click', e => {
        if (e.target.tagName === 'A') {
            currentLang = e.target.dataset.lang;
            localStorage.setItem('userLanguage', currentLang);
            applyTranslations();
            languageMenu.classList.add('hidden');
        }
    });

    const backgroundMusic = document.getElementById('background-music');
    if (backgroundMusic) {
        document.body.addEventListener('click', () => {
            if(backgroundMusic.paused) {
                backgroundMusic.volume = 0.2;
                backgroundMusic.play().catch(e => {});
            }
        }, { once: true });
    }

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
            }, 70);
        });
    }

    const togglePassword = document.querySelector('.toggle-password');
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const passField = document.getElementById('password-field');
            const type = passField.getAttribute('type') === 'password' ? 'text' : 'password';
            passField.setAttribute('type', type);
            this.textContent = type === 'password' ? '👁️' : '🙈';
        });
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', e => {
            e.preventDefault();
            signInWithEmailAndPassword(auth, e.target.email.value, e.target.password.value)
                .then(() => alert('¡Login Exitoso!'))
                .catch(error => alert(error.message));
        });
    }

    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', e => {
            e.preventDefault();
            createUserWithEmailAndPassword(auth, e.target.email.value, e.target.password.value)
                .then(() => alert('¡Registro Exitoso!'))
                .catch(error => alert(error.message));
        });
    }
});
