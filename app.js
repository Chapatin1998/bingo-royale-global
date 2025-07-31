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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DE INICIO ---
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
        loginForm.addEventListener('submit', (e) => e.preventDefault(); signInWithEmailAndPassword(auth, e.target.email.value, e.target.password.value).catch(error => alert(error.message)));
    }

    // --- LÓGICA DE REGISTRO ---
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => e.preventDefault(); createUserWithEmailAndPassword(auth, e.target.email.value, e.target.password.value).catch(error => alert(error.message)));
    }
    
    // --- LÓGICA DE COMPLETAR PERFIL ---
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        async function uploadFile(user, file, folder) { if (!file) return null; const storageRef = ref(storage, `${folder}/${user.uid}/${file.name}`); await uploadBytes(storageRef, file); return await getDownloadURL(storageRef); }
        profileForm.addEventListener('submit', async (e) => {
            e.preventDefault(); const user = auth.currentUser; if (!user) return;
            const btn = e.target.querySelector('button'); btn.disabled = true; btn.textContent = 'Guardando...';
            try {
                const [frontUrl, backUrl, selfieUrl] = await Promise.all([ uploadFile(user, e.target.idFront.files[0], 'id_front'), uploadFile(user, e.target.idBack.files[0], 'id_back'), uploadFile(user, e.target.selfie.files[0], 'id_selfie') ]);
                await setDoc(doc(db, "users", user.uid), { uid: user.uid, email: user.email, fullName: e.target.fullName.value, phone: e.target.phone.value, idNumber: e.target.idNumber.value, idFrontUrl, idBackUrl, selfieUrl, balance: 0, isVerified: false, createdAt: new Date() });
            } catch (error) { alert(error.message); btn.disabled = false; btn.textContent = 'Guardar y Entrar'; }
        });
    }

    // --- LÓGICA COMÚN: OJO DE CONTRASEÑA ---
    const togglePassword = document.querySelector('.toggle-password');
    if (togglePassword) {
        togglePassword.addEventListener('click', function() { this.previousElementSibling.type = this.previousElementSibling.type === 'password' ? 'text' : 'password'; this.textContent = this.previousElementSibling.type === 'password' ? '👁️' : '🙈'; });
    }
});

// --- ROUTER / GUARDIA DE SEGURIDAD ---
onAuthStateChanged(auth, async (user) => {
    const currentPage = window.location.pathname.split("/").pop();
    const protectedPages = ['lobby.html', 'complete-profile.html'];
    if (user) {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        if (!docSnap.exists() && currentPage !== 'complete-profile.html') { window.location.href = 'complete-profile.html'; }
        else if (docSnap.exists() && currentPage !== 'lobby.html') { window.location.href = 'lobby.html'; }
    } else {
        if (protectedPages.includes(currentPage)) { window.location.href = 'login.html'; }
    }
});
