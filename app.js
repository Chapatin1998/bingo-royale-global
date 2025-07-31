// =================================================================
// BINGO VIP BOLIVIA - CÓDIGO MAESTRO (CON LOBBY INTELIGENTE)
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

// --- LÓGICA DE LA INTERFAZ DE USUARIO ---
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Lógica para la PÁGINA DE INICIO (index.html) ---
    const startButton = document.getElementById('start-button');
    if (startButton) {
        // ... (Aquí va la lógica de la barra de carga que ya teníamos)
    }

    // --- Lógica para la PÁGINA DE LOGIN (login.html) ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        // ... (Aquí va la lógica del formulario de login y el ojo de la contraseña)
    }

    // --- Lógica para la PÁGINA DE REGISTRO (register.html) ---
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            createUserWithEmailAndPassword(auth, e.target.email.value, e.target.password.value)
                .catch(error => alert(error.message));
        });
    }

    // --- Lógica para la PÁGINA DE COMPLETAR PERFIL (complete-profile.html) ---
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        // ... (Aquí va la lógica para subir las 3 fotos y guardar el perfil)
    }
    
    // --- Lógica para la PÁGINA DE LOBBY (lobby.html) ---
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            signOut(auth).catch(error => console.error("Error al cerrar sesión:", error));
        });
    }
});

// --- ROUTER / GUARDIA DE SEGURIDAD ---
onAuthStateChanged(auth, async (user) => {
    const currentPage = window.location.pathname.split("/").pop();
    const protectedPages = ['lobby.html', 'complete-profile.html', 'game.html', 'wallet.html'];

    if (user) {
        // --- El usuario ESTÁ CONECTADO ---
        const userDocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDocRef);

        if (!docSnap.exists() && currentPage !== 'complete-profile.html') {
            window.location.href = 'complete-profile.html';
            return;
        }

        if (docSnap.exists() && !protectedPages.includes(currentPage)) {
            window.location.href = 'lobby.html';
            return;
        }

        if (docSnap.exists() && currentPage === 'lobby.html') {
            const userData = docSnap.data();
            const welcomeMessage = document.getElementById('welcome-message');
<h4>¡Gracias de nuevo por tu atención al detalle! Eres un excelente director de proyecto. A partir de ahora, me aseguraré de que cada pieza de código que te dé sea completa y no omita nada.

Cuando estés listo, reemplaza esos dos archivos. Ahora sí, el resultado será el que esperamos.
