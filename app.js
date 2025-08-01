// =================================================================
// BINGO VIP BOLIVIA - CÓDIGO MAESTRO DE LÓGICA
// =================================================================

// --- 1. IMPORTACIÓN DE MÓDULOS DE FIREBASE ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";

// --- 2. CONFIGURACIÓN DE FIREBASE ---
const firebaseConfig = {
    apiKey: "AIzaSyDREqTx0PpnRDmE4J-wQlYR1JkqaJvHI4Y",
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
const storage = getStorage(app);

// --- 4. TRADUCCIONES ---
const translations = {
    es: { 
        startBtn: "Iniciar Juego", 
        warning: "⚠️ Al continuar, confirmas ser mayor de 18 años y aceptas nuestros Términos y Condiciones.", 
        flag: "🇧🇴 Español",
        loginTitle: "Iniciar Sesión",
        emailPlaceholder: "Correo Electrónico",
        passwordPlaceholder: "Contraseña",
        loginButton: "Entrar",
        registerText: "¿No tienes una cuenta? <a href='register.html'>Regístrate</a>",
        registerTitle: "Crear Cuenta",
        registerButton: "Registrarme",
        passwordPlaceholderRegister: "Contraseña (mínimo 6 caracteres)",
        loginText: "¿Ya tienes una cuenta? <a href='login.html'>Inicia sesión</a>"
    },
    en: { 
        startBtn: "Start Game", 
        warning: "⚠️ By continuing, you confirm you are over 18 and accept our Terms & Conditions.", 
        flag: "🇺🇸 English",
        loginTitle: "Login",
        emailPlaceholder: "Email Address",
        passwordPlaceholder: "Password",
        loginButton: "Enter",
        registerText: "Don't have an account? <a href='register.html'>Sign Up</a>",
        registerTitle: "Create Account",
        registerButton: "Sign Me Up",
        passwordPlaceholderRegister: "Password (6+ characters)",
        loginText: "Already have an account? <a href='login.html'>Log In</a>"
    },
    pt: { 
        startBtn: "Iniciar Jogo", 
        warning: "⚠️ Ao continuar, você confirma que tem mais de 18 anos e aceita nossos Termos e Condições.", 
        flag: "🇧🇷 Português",
        loginTitle: "Entrar",
        emailPlaceholder: "Endereço de e-mail",
        passwordPlaceholder: "Senha",
        loginButton: "Entrar",
        registerText: "Não tem uma conta? <a href='register.html'>Cadastre-se</a>",
        registerTitle: "Criar Conta",
        registerButton: "Inscrever-se",
        passwordPlaceholderRegister: "Senha (mínimo 6 caracteres)",
        loginText: "Já tem uma conta? <a href='login.html'>Entrar</a>"
    }
};

// --- 5. LÓGICA PRINCIPAL (SE EJECUTA CUANDO LA PÁGINA CARGA) ---
document.addEventListener('DOMContentLoaded', () => {
    
    let currentLang = localStorage.getItem('userLanguage') || 'es';

    function applyTranslations() {
        const t = translations[currentLang];
        if (document.getElementById('start-button')) document.getElementById('start-button').textContent = t.startBtn;
        if (document.getElementById('warning-text')) document.getElementById('warning-text').textContent = t.warning;
        if (document.getElementById('login-title')) document.getElementById('login-title').textContent = t.loginTitle;
        if (document.querySelector('input[name="email"]')) document.querySelector('input[name="email"]').placeholder = t.emailPlaceholder;
        if (document.getElementById('login-button')) document.getElementById('login-button').textContent = t.loginButton;
        if (document.getElementById('register-text')) document.getElementById('register-text').innerHTML = t.registerText;
        if (document.getElementById('register-title')) document.getElementById('register-title').textContent = t.registerTitle;
        if (document.getElementById('register-button')) document.getElementById('register-button').textContent = t.registerButton;
        if (document.getElementById('login-text')) document.getElementById('login-text').innerHTML = t.loginText;
        const passField = document.getElementById('password-field');
        if (passField && document.getElementById('login-form')) passField.placeholder = t.passwordPlaceholder;
        if (passField && document.getElementById('register-form')) passField.placeholder = t.passwordPlaceholderRegister;
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
            const passwordField = this.previousElementSibling;
            const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordField.setAttribute('type', type);
            this.textContent = type === 'password' ? '👁️' : '🙈';
        });
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            signInWithEmailAndPassword(auth, e.target.email.value, e.target.password.value)
                .catch(error => alert(error.message));
        });
    }

    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            createUserWithEmailAndPassword(auth, e.target.email.value, e.target.password.value)
                .catch(error => alert(error.message));
        });
    }

    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        async function uploadFile(user, file, folder) { if (!file) return null; const storageRef = ref(storage, `${folder}/${user.uid}/${file.name}`); await uploadBytes(storageRef, file); return await getDownloadURL(storageRef); }
        profileForm.addEventListener('submit', async (e) => {
            e.preventDefault(); const user = auth.currentUser; if (!user) return;
            const btn = e.target.querySelector('button'); btn.disabled = true; btn.textContent = 'Guardando...';
            try {
                const [frontUrl, backUrl, selfieUrl] = await Promise.all([ uploadFile(user, e.target.idFront.files[0], 'id_front'), uploadFile(user, e.target.idBack.files[0], 'id_back'), uploadFile(user, e.target.selfie.files[0], 'id_selfie') ]);
                await setDoc(doc(db, "users", user.uid), { uid: user.uid, email: user.email, fullName: e.target.fullName.value, phone: e.target.phone.value, idNumber: e.target.idNumber.value, idFrontUrl, backUrl, selfieUrl, balance: 0, isVerified: false, createdAt: new Date() });
            } catch (error) { alert(error.message); btn.disabled = false; btn.textContent = 'Guardar y Entrar'; }
        });
    }

    const backgroundMusic = document.getElementById('background-music');
    if (backgroundMusic) {
        document.body.addEventListener('click', () => {
            if(backgroundMusic.paused) {
                backgroundMusic.volume = 0.2;
                backgroundMusic.play().catch(e => {});
            }
        }, { once: true });
    }
});

// --- ROUTER / GUARDIA DE SEGURIDAD ---
onAuthStateChanged(auth, async (user) => {
    const currentPage = window.location.pathname.split("/").pop();
    const protectedPages = ['lobby.html', 'complete-profile.html'];
    if (user) {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        if (!docSnap.exists() && currentPage !== 'complete-profile.html') {
            window.location.href = 'complete-profile.html';
        } else if (docSnap.exists() && currentPage !== 'lobby.html') {
            window.location.href = 'lobby.html';
        }
    } else {
        if (protectedPages.includes(currentPage)) {
            window.location.href = 'login.html';
        }
    }
});
