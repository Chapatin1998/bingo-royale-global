// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmWFaQv-iJ5LdfGXY1fmi_1KZmzFv3TSI",
  authDomain: "bingo-vip-bolivia-df2db.firebaseapp.com",
  projectId: "bingo-vip-bolivia-df2db",
  storageBucket: "bingo-vip-bolivia-df2db.firebasestorage.app",
  messagingSenderId: "310290230955",
  appId: "1:310290230955:web:3526c26c2800b43ffcd1ee",
  measurementId: "G-VRR7JSHY5G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// --- FUNCIONES QUE USAREMOS ---

// Función para registrar un nuevo usuario
window.registerUser = function(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Registro exitoso, AHORA REDIRIGE A COMPLETAR PERFIL
            console.log("Usuario registrado, completando perfil:", userCredential.user);
            window.location.href = 'complete-profile.html'; // <--- ¡CAMBIO IMPORTANTE!
        })
        .catch((error) => {
            alert("Error en el registro: " + error.message);
        });
}

// Función para iniciar sesión
window.loginUser = function(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("Usuario conectado:", userCredential.user);
            window.location.href = 'lobby.html';
        })
        .catch((error) => {
            alert("Error al iniciar sesión: " + error.message);
        });
}

// Función para cerrar sesión
window.logoutUser = function() {
    signOut(auth).then(() => {
        window.location.href = 'index.html';
    }).catch((error) => {
        alert("Error al cerrar sesión: " + error.message);
    });
}

// Escuchar cambios en el estado de autenticación
onAuthStateChanged(auth, (user) => {
    const currentPage = window.location.pathname.split("/").pop();
    if (user) {
        // El usuario está conectado
        const protectedPages = ['lobby.html', 'complete-profile.html'];
        const publicPages = ['login.html', 'register.html', 'index.html', ''];
        
        if (publicPages.includes(currentPage)) {
             // Si un usuario conectado está en una página pública, lo mandamos al lobby
             // Excepción: Si acaba de registrarse y no tiene perfil, se quedará en complete-profile.html
             // Esta lógica se puede mejorar después, por ahora lo dejamos así de simple.
            window.location.href = 'lobby.html';
        }
    } else {
        // El usuario no está conectado
        const protectedPages = ['lobby.html', 'complete-profile.html'];
        if (protectedPages.includes(currentPage)) {
            window.location.href = 'login.html';
        }
    }
});
