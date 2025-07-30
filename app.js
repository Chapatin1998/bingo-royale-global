// =================================================================
// BINGO VIP BOLIVIA - CÓDIGO MAESTRO v10 (BASE SÓLIDA)
// =================================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
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

// --- DICCIONARIO DE TRADUCCIONES ---
const translations = {
    es: { 
        loginTitle: "Iniciar Sesión",
        emailPlaceholder: "Correo Electrónico",
        passwordPlaceholder: "Contraseña",
        loginButton: "Entrar",
        registerText: "¿No tienes una cuenta? <a href='register.html'>Regístrate</a>",
        warning: "⚠️ Juego para mayores de 18 años. Juega con responsabilidad.",
        flag: "🇧🇴 Español"
    },
    en: { 
        loginTitle: "Login",
        emailPlaceholder: "Email Address",
        passwordPlaceholder: "Password",
        loginButton: "Enter",
        registerText: "Don't have an account? <a href='register.html'>Sign Up</a>",
        warning: "⚠️ Game for ages 18+. Play responsibly.",
        flag: "🇺🇸 English"
    },
    pt: { 
        loginTitle: "Entrar",
        emailPlaceholder: "Endereço de e-mail",
        passwordPlaceholder: "Senha",
        loginButton: "Entrar",
        registerText: "Não tem uma conta? <a href='register.html'>Cadastre-se</a>",
        warning: "⚠️ Jogo para maiores de 18 anos. Jogue com responsabilidade.",
        flag: "🇧🇷 Português"
    }
};

// --- FUNCIÓN PARA APLICAR TRADUCCIONES ---
function applyTranslations(lang) {
    if (!translations[lang]) lang = 'es';
    localStorage.setItem('userLanguage', lang); // Guardamos la elección
    
    const t = translations[lang];
    document.getElementById('login-title').textContent = t.loginTitle;
    document.querySelector('input[name="email"]').placeholder = t.emailPlaceholder;
    document.getElementById('password-field').placeholder = t.passwordPlaceholder;
    document.getElementById('login-button').textContent = t.loginButton;
    document.getElementById('register-text').innerHTML = t.registerText;
    document.getElementById('warning-text').textContent = t.warning;
    document.getElementById('language-button').textContent = t.flag;
}

// --- LÓGICA PRINCIPAL ---
document.addEventListener('DOMContentLoaded', () => {
    const languageButton = document.getElementById('language-button');
    const languageMenu = document.getElementById('language-menu');
    
    // Aplicar idioma guardado al cargar la página
    const savedLang = localStorage.getItem('userLanguage') || 'es';
    applyTranslations(savedLang);

    // Lógica del menú de idiomas
    if (languageButton) {
        languageButton.addEventListener('click', () => {
            if(languageMenu) languageMenu.classList.toggle('hidden');
        });
    }
    if (languageMenu) {
        languageMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                const lang = e.target.dataset.lang;
                applyTranslations(lang);
                languageMenu.classList.add('hidden');
            }
        });
    }

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
                .then(() => {
                    window.location.href = '/lobby.html'; // Redirige al lobby si es exitoso
                })
                .catch((error) => alert("Error: " + error.message));
        });
    }
});
