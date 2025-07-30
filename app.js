// =================================================================
// BINGO VIP BOLIVIA - CÓDIGO MAESTRO DEFINITIVO
// =================================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";

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
const db = getFirestore(app);
const storage = getStorage(app);

document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DE LA PÁGINA DE INICIO (index.html) ---
    const startButton = document.getElementById('start-button');
    if (startButton) {
        const mainContent = document.getElementById('main-content');
        const loaderScreen = document.getElementById('loader-screen');
        const backgroundMusic = document.getElementById('background-music');

        startButton.addEventListener('click', () => {
            if (backgroundMusic) {
                backgroundMusic.volume = 0.2;
                backgroundMusic.play().catch(e => {});
            }
            if (mainContent) mainContent.style.opacity = '0';
            if (loaderScreen) loaderScreen.classList.remove('hidden');

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
            }, 70); // Barra de carga de 7 segundos
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
                .catch((error) => alert(error.message));
        });
    }
    
    // --- LÓGICA DE COMPLETAR PERFIL ---
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        // ... (La lógica completa de profile.js que ya teníamos)
    }

    // --- LÓGICA COMÚN: OJO DE CONTRASEÑA ---
    const togglePassword = document.querySelector('.toggle-password');
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const passwordField = this.previousElementSibling;
            const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordField.setAttribute('type', type);
            this.textContent = type === 'password' ? '👁️' : '🙈';
        });
    }
});

// --- ROUTER / GUARDIA DE SEGURIDAD ---
onAuthStateChanged(auth, async (user) => {
    const currentPage = window.location.pathname.split("/").pop();
    const protectedPages = ['lobby.html', 'complete-profile.html', 'game.html'];
    if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDocRef);
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
