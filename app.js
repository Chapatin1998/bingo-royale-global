import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyDREqTx0PpnRDmE4J-wQlYR1JkqaJvHI4Y",
  authDomain: "bingo-vip-bolivia-df2db.firebaseapp.com",
  projectId: "bingo-vip-bolivia-df2db",
  storageBucket: "bingo-vip-bolivia-df2db.appspot.com",
  messagingSenderId: "310290230955",
  appId: "1:310290230955:web:3526c26c2800b43ffcd1ee"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {
    const translations = {
        es: { loginTitle: "Iniciar Sesión", registerText: "¿No tienes una cuenta? <a href='register.html'>Regístrate</a>", warning: "⚠️ Juego para mayores de 18 años.", flag: "🇧🇴 Español" },
        en: { loginTitle: "Login", registerText: "Don't have an account? <a href='register.html'>Sign Up</a>", warning: "⚠️ Game for ages 18+.", flag: "🇺🇸 English" },
        pt: { loginTitle: "Entrar", registerText: "Não tem uma conta? <a href='register.html'>Cadastre-se</a>", warning: "⚠️ Jogo para maiores de 18 anos.", flag: "🇧🇷 Português" }
    };
    function applyTranslations(lang) {
        if (!translations[lang]) lang = 'es';
        localStorage.setItem('userLanguage', lang);
        const t = translations[lang];
        if (document.getElementById('login-title')) document.getElementById('login-title').textContent = t.loginTitle;
        if (document.getElementById('register-text')) document.getElementById('register-text').innerHTML = t.registerText;
        if (document.getElementById('warning-text')) document.getElementById('warning-text').textContent = t.warning;
        if (document.getElementById('language-button')) document.getElementById('language-button').textContent = t.flag;
    }
    const savedLang = localStorage.getItem('userLanguage') || 'es';
    applyTranslations(savedLang);

    const languageButton = document.getElementById('language-button');
    const languageMenu = document.getElementById('language-menu');
    if(languageButton) languageButton.addEventListener('click', () => languageMenu.classList.toggle('hidden'));
    if(languageMenu) languageMenu.addEventListener('click', e => {
        if (e.target.tagName === 'A') {
            applyTranslations(e.target.dataset.lang);
            languageMenu.classList.add('hidden');
        }
    });

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

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        const backgroundMusic = document.getElementById('background-music');
        if (backgroundMusic) {
            backgroundMusic.volume = 0.2;
            backgroundMusic.play().catch(e => {});
        }
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
            signInWithEmailAndPassword(auth, e.target.email.value, e.target.password.value)
                .then(() => { alert('¡Login Exitoso!'); })
                .catch((error) => alert(error.message));
        });
    }
});
