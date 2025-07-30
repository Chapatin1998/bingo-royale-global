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
        async function uploadFileAndGetURL(user, file, folder) {
            if (!file) return null;
            const storageRef = ref(storage, `${folder}/${user.uid}/${file.name}`);
            const snapshot = await uploadBytes(storageRef, file);
            return await getDownloadURL(snapshot.ref);
        }
        profileForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const user = auth.currentUser;
            if (!user) { window.location.href = 'login.html'; return; }

            const submitButton = profileForm.querySelector('button');
            submitButton.disabled = true;
            submitButton.textContent = 'Guardando...';

            try {
                const fullName = profileForm.fullName.value;
                const phoneNumber = profileForm.countryCode.value + profileForm.phoneNumber.value;
                const idFrontFile = profileForm.idFrontUpload.files[0];
                const idBackFile = profileForm.idBackUpload.files[0];
                const selfieFile = profileForm.selfieUpload.files[0];

                const [idFrontUrl, idBackUrl, selfieUrl] = await Promise.all([
                    uploadFileAndGetURL(user, idFrontFile, 'id_front'),
                    uploadFileAndGetURL(user, idBackFile, 'id_back'),
                    uploadFileAndGetURL(user, selfieFile, 'id_selfie')
                ]);

                const userProfile = {
                    uid: user.uid, email: user.email, fullName: fullName, phoneNumber: phoneNumber,
                    idFrontImageUrl: idFrontUrl, idBackImageUrl: idBackUrl, selfieWithIdUrl: selfieUrl,
                    balance: 0, isVerified: false, createdAt: new Date()
                };
                await setDoc(doc(db, "users", user.uid), userProfile);
            } catch (error) {
                alert("Error al guardar el perfil: " + error.message);
                submitButton.disabled = false;
                submitButton.textContent = 'Guardar y Entrar';
            }
        });
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
