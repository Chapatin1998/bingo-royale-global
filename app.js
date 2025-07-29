// =================================================================
// BINGO VIP BOLIVIA - CÓDIGO MAESTRO DE LA APLICACIÓN
// =================================================================

// --- 1. IMPORTACIÓN DE MÓDULOS DE FIREBASE ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js"; // LÍNEA CORREGIDA
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
    // ... (Aquí va toda la lógica de los botones: entrar, música, ojo, formularios, etc.)
    // Esta parte no cambia.
});

// --- 5. GUARDIA DE SEGURIDAD (ROUTER) ---
onAuthStateChanged(auth, async (user) => {
    const currentPage = window.location.pathname.split("/").pop();
    const publicPages = ['index.html', 'login.html', 'register.html', ''];
    const protectedPages = ['lobby.html', 'complete-profile.html', 'game.html'];
    
    if (user) {
        // Usuario CONECTADO
        const userDocRef = doc(db, "users", user.uid);
        const welcomeMessage = document.getElementById('welcome-message');

        try {
            const docSnap = await getDoc(userDocRef);
            
            // Si el documento del perfil no existe, significa que el registro no se ha completado
            if (!docSnap.exists() && currentPage !== 'complete-profile.html') {
                console.log("Perfil no encontrado, redirigiendo para completar.");
                window.location.href = 'complete-profile.html';
                return; // Detenemos la ejecución aquí para que la redirección ocurra
            }

            // Si el perfil sí existe y tenemos el mensaje de bienvenida, lo actualizamos
            if (docSnap.exists() && welcomeMessage) {
                welcomeMessage.textContent = `Bienvenido, ${docSnap.data().fullName.split(' ')[0]}`;
            }
            
            // Si el usuario está en una página pública, lo mandamos al lobby
            if (publicPages.includes(currentPage)) {
                window.location.href = 'lobby.html';
            }

        } catch (error) {
            console.error("Error en el guardia de seguridad:", error);
            signOut(auth); // Si hay un error, cerramos la sesión por seguridad
        }
    } else {
        // Usuario NO CONECTADO
        if (protectedPages.includes(currentPage)) {
            window.location.href = 'login.html';
        }
    }
});


// (Asegúrate de que la lógica de los formularios esté dentro del DOMContentLoaded como en el mensaje anterior)
