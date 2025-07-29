// =================================================================
// BINGO VIP BOLIVIA - CÓDIGO MAESTRO DEFINITIVO v5
// =================================================================

// --- 1. IMPORTACIÓN DE MÓDULOS DE FIREBASE ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";

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

// --- 3. INICIALIZACIÓN DE SERVICIOS DE FIREBASE ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// --- 4. LÓGICA DE LA INTERFAZ DE USUARIO (UI) ---
document.addEventListener('DOMContentLoaded', () => {

    // Lógica de Entrada Cinematográfica
    const enterButton = document.getElementById('enter-button');
    const initialContent = document.getElementById('initial-content');
    const authButtons = document.getElementById('auth-buttons');
    const musicControl = document.getElementById('music-control');
    const backgroundMusic = document.getElementById('background-music');
    let isMusicPlaying = false;

    if (enterButton) {
        enterButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (backgroundMusic && !isMusicPlaying) {
                backgroundMusic.play().then(() => {
                    isMusicPlaying = true;
                    if(musicControl) {
                       musicControl.classList.remove('hidden');
                       musicControl.classList.add('playing');
                    }
                }).catch(err => console.log("Navegador bloqueó el audio."));
            }
            if(initialContent) initialContent.classList.add('fade-out');
            setTimeout(() => {
                if(initialContent) initialContent.classList.add('hidden');
                if(authButtons) {
                    authButtons.classList.remove('hidden');
                    authButtons.classList.add('fade-in');
                }
            }, 800);
        });
    }
    
    if (musicControl && backgroundMusic) {
        musicControl.addEventListener('click', () => {
             if (isMusicPlaying) {
                backgroundMusic.pause();
                musicControl.classList.remove('playing');
            } else {
                backgroundMusic.play();
                musicControl.classList.add('playing');
            }
            isMusicPlaying = !isMusicPlaying;
        });
    }

    // (Aquí va el resto de la lógica de los formularios: registro, login, perfil, etc.
    // Pega el resto de tu código de la sección DOMContentLoaded aquí)
});

// --- 5. GUARDIA DE SEGURIDAD (ROUTER) ---
// (Aquí va el onAuthStateChanged que ya teníamos. No cambia)
onAuthStateChanged(auth, async (user) => {
    // ...
});
