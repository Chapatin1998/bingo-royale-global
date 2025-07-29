// =================================================================
// BINGO VIP BOLIVIA - CÓDIGO MAESTRO DE LA APLICACIÓN v3
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
                       musicControl.style.display = 'flex';
                       musicControl.classList.add('playing');
                    }
                }).catch(err => console.log("Navegador bloqueó el audio hasta nueva interacción."));
            }
            if(initialContent) initialContent.classList.add('fade-out');
            setTimeout(() => {
                if(initialContent) initialContent.style.display = 'none';
                if(authButtons) {
                    authButtons.style.display = 'flex';
                    authButtons.classList.add('fade-in');
                }
            }, 500);
        });
    }
    
    if (musicControl) {
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
    
    // Lógica para mostrar/ocultar contraseña
    const togglePassword = document.querySelectorAll('.toggle-password');
    togglePassword.forEach(toggle => {
        toggle.addEventListener('click', function () {
            const passwordField = this.previousElementSibling;
            const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordField.setAttribute('type', type);
            this.textContent = type === 'password' ? '👁️' : '🙈';
        });
    });

    // Lógica para el formulario de registro
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = registerForm.email.value;
            const password = registerForm.password.value;
            createUserWithEmailAndPassword(auth, email, password)
                .catch((error) => alert("Error en el registro: " + error.message));
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
                .catch((error) => alert("Error al iniciar sesión: " + error.message));
        });
    }

    // Lógica para el botón de logout
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            signOut(auth);
        });
    }

    // Lógica para el formulario de perfil
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        async function uploadFileAndGetURL(user, file, folder) {
            if (!file) return null;
            const storageRef = ref(storage, `${folder}/${user.uid}/${file.name}`);
            const snapshot = await uploadBytes(storageRef, file);
            return await getDownloadURL(snapshot.ref);
        }

        profileForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const user = auth.currentUser;
            if (!user) {
                window.location.href = 'login.html';
                return;
            }

            const submitButton = profileForm.querySelector('button');
            submitButton.disabled = true;
            submitButton.textContent = 'Guardando...';

            try {
                const fullName = profileForm.fullName.value;
                const phoneNumber = profileForm.countryCode.value + profileForm.phoneNumber.value;
                const idFrontFile = profileForm.idFrontUpload.files[0];
                const idBackFile = profileForm.idBackUpload.files[0];
                const selfieFile = profileForm.selfieWithIdUpload.files[0];

                const [idFrontUrl, idBackUrl, selfieUrl] = await Promise.all([
                    uploadFileAndGetURL(user, idFrontFile, 'id_front'),
                    uploadFileAndGetURL(user, idBackFile, 'id_back'),
                    uploadFileAndGetURL(user, selfieFile, 'id_selfie')
                ]);

                const userProfile = {
                    uid: user.uid,
                    email: user.email,
                    fullName: fullName,
                    phoneNumber: phoneNumber,
                    idFrontImageUrl: idFrontUrl,
                    idBackImageUrl: idBackUrl,
                    selfieWithIdUrl: selfieUrl,
                    isVerified: false,
                    createdAt: new Date()
                };

                await setDoc(doc(db, "users", user.uid), userProfile);
                // No redirigimos aquí, onAuthStateChanged lo hará
            } catch (error) {
                alert("Error al guardar el perfil: " + error.message);
                submitButton.disabled = false;
                submitButton.textContent = 'Guardar Perfil y Entrar';
            }
        });
    }
});

// --- 5. GUARDIA DE SEGURIDAD (ROUTER) - VERSIÓN FINAL INTELIGENTE ---
onAuthStateChanged(auth, async (user) => {
    const currentPage = window.location.pathname.split("/").pop();
    const publicPages = ['index.html', 'login.html', 'register.html', ''];
    const protectedPages = ['lobby.html', 'complete-profile.html', 'game.html'];
    
    if (user) {
        // --- El usuario ESTÁ CONECTADO ---
        const userDocRef = doc(db, "users", user.uid);
        
        try {
            const docSnap = await getDoc(userDocRef);

            // CASO 1: El usuario se acaba de registrar y NO tiene perfil.
            // Lo forzamos a ir a la página de completar perfil.
            if (!docSnap.exists() && currentPage !== 'complete-profile.html') {
                console.log("Perfil no encontrado, redirigiendo para completar.");
                window.location.href = 'complete-profile.html';
                return; // Detenemos todo lo demás.
            }

            // CASO 2: El usuario SÍ tiene perfil y está en una página pública (login, register, etc.)
            // Lo mandamos al lobby porque ya no necesita estar ahí.
            if (docSnap.exists() && publicPages.includes(currentPage)) {
                console.log("Usuario con perfil en página pública. Redirigiendo al lobby.");
                window.location.href = 'lobby.html';
                return;
            }

            // ¡NUEVO! Mostrar mensaje de bienvenida en el lobby.
            const welcomeMessage = document.getElementById('welcome-message');
            if (docSnap.exists() && welcomeMessage) {
                // Muestra solo el primer nombre
                welcomeMessage.textContent = `Bienvenido, ${docSnap.data().fullName.split(' ')[0]}`;
            }

        } catch (error) {
            console.error("Error en el guardia de seguridad:", error);
            signOut(auth); // Si hay un error grave, cerramos la sesión por seguridad.
        }

    } else {
        // --- El usuario NO ESTÁ CONECTADO ---
        // Si intenta entrar a cualquier página protegida, lo mandamos al login.
        if (protectedPages.includes(currentPage)) {
            console.log("Usuario no conectado intentando acceder a página protegida. Redirigiendo a login.");
            window.location.href = 'login.html';
        }
    }
});
