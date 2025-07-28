// Importamos todo lo que necesitamos de Firebase al principio
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";

// Tu configuración de Firebase (asegúrate de que esta sea la llave MÁS RECIENTE)
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

// Inicializamos todos los servicios de Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// --- LÓGICA DE LA APLICACIÓN ---

// Esta función se ejecuta cuando toda la página se ha cargado
document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica para el formulario de registro ---
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = registerForm.email.value;
            const password = registerForm.password.value;
            
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log("Usuario registrado, redirigiendo a completar perfil...");
                    // ORDEN #1: IR A COMPLETAR PERFIL
                    window.location.href = 'complete-profile.html';
                })
                .catch((error) => {
                    alert("Error en el registro: " + error.message);
                });
        });
    }

    // --- Lógica para el formulario de login ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = loginForm.email.value;
            const password = loginForm.password.value;

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log("Usuario conectado, redirigiendo al lobby...");
                    window.location.href = 'lobby.html';
                })
                .catch((error) => {
                    alert("Error al iniciar sesión: " + error.message);
                });
        });
    }

    // --- Lógica para el botón de logout ---
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            signOut(auth).then(() => {
                window.location.href = 'index.html';
            }).catch((error) => {
                alert("Error al cerrar sesión: " + error.message);
            });
        });
    }
    
    // --- Lógica para el formulario de perfil ---
    // (Esta es la lógica de profile.js que ahora vivirá aquí)
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const user = auth.currentUser;

            if (!user) {
                alert("Error de sesión, por favor inicia sesión de nuevo.");
                window.location.href = 'login.html';
                return;
            }

            const submitButton = profileForm.querySelector('button');
            submitButton.disabled = true;
            submitButton.textContent = 'Guardando...';

            try {
                // (Aquí iría la lógica para subir las 3 fotos, la añadiremos después)
                // Por ahora, solo guardaremos el nombre y teléfono
                
                const fullName = profileForm.fullName.value;
                const phoneNumber = profileForm.phoneNumber.value;
                
                const userProfile = {
                    uid: user.uid,
                    email: user.email,
                    fullName: fullName,
                    phoneNumber: phoneNumber,
                    isVerified: false,
                    createdAt: new Date()
                };

                await setDoc(doc(db, "users", user.uid), userProfile);
                
                console.log("Perfil guardado, redirigiendo al lobby...");
                window.location.href = 'lobby.html';

            } catch (error) {
                alert("Error al guardar el perfil: " + error.message);
                submitButton.disabled = false;
                submitButton.textContent = 'Guardar Perfil y Entrar';
            }
        });
    }
});


// --- GUARDIA DE SEGURIDAD (onAuthStateChanged) MEJORADO ---
// Esta es la parte que hemos corregido
onAuthStateChanged(auth, (user) => {
    const currentPage = window.location.pathname.split("/").pop();
    const protectedPages = ['lobby.html', 'complete-profile.html'];

    if (user) {
        // Usuario CONECTADO
        // La única regla es que si un usuario conectado intenta volver a la página principal,
        // lo mandamos al lobby para que no vea los botones de "login/registro" de nuevo.
        if (currentPage === 'index.html' || currentPage === '') {
            window.location.href = 'lobby.html';
        }
    } else {
        // Usuario NO CONECTADO
        // Si intenta entrar a una página protegida, lo mandamos al login
        if (protectedPages.includes(currentPage)) {
            window.location.href = 'login.html';
        }
    }
});

