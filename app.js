// =================================================================
// BINGO VIP BOLIVIA - CÓDIGO MAESTRO (CON LOBBY INTELIGENTE)
// =================================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

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

// --- LÓGICA DE LA INTERFAZ DE USUARIO ---
document.addEventListener('DOMContentLoaded', () => {
    // La lógica de las páginas de inicio, login y registro se moverá aquí cuando las necesitemos.
    // Por ahora, nos centramos en el lobby.

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
    // Definimos las páginas que son solo para usuarios logueados
    const protectedPages = ['lobby.html', 'complete-profile.html', 'game.html', 'wallet.html'];

    if (user) {
        // --- El usuario ESTÁ CONECTADO ---
        const userDocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDocRef);

        // Si no tiene perfil, lo mandamos a crearlo
        if (!docSnap.exists() && currentPage !== 'complete-profile.html') {
            window.location.href = 'complete-profile.html';
            return;
        }

        // Si ya tiene perfil y está en una página pública, lo mandamos al lobby
        if (docSnap.exists() && !protectedPages.includes(currentPage)) {
            window.location.href = 'lobby.html';
            return;
        }

        // Si estamos en el lobby, mostramos la información personalizada
        if (docSnap.exists() && currentPage === 'lobby.html') {
            const userData = docSnap.data();
            const welcomeMessage = document.getElementById('welcome-message');
            const lobbyBalance = document.getElementById('lobby-balance');

            if (welcomeMessage) {
                // Muestra solo el primer nombre
                welcomeMessage.textContent = `Bienvenido, ${userData.fullName.split(' ')[0]}`;
            }
            if (lobbyBalance) {
                lobbyBalance.textContent = userData.balance.toFixed(2);
            }
        }
    } else {
        // --- El usuario NO ESTÁ CONECTADO ---
        // Si intenta entrar a una página protegida, lo mandamos al login
        if (protectedPages.includes(currentPage)) {
            window.location.href = 'login.html';
        }
    }
});
