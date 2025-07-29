// =================================================================
// BINGO VIP BOLIVIA - CÓDIGO MAESTRO DEFINITIVO v4
// =================================================================

// --- 1. IMPORTACIÓN DE MÓDULOS DE FIREBASE ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
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
      // --- LÓGICA DEL LOBBY MULTIJUGADOR ---
    const playerList = document.getElementById('callejon-player-list');
    const joinButton = document.getElementById('join-callejon-btn');

    if (playerList && joinButton) {
        const user = auth.currentUser;
        if (user) {
            const roomRef = doc(db, "game_rooms", "callejon");
            const playersRef = collection(roomRef, "players");

            // Escuchar cambios en la lista de jugadores EN TIEMPO REAL
            onSnapshot(playersRef, (snapshot) => {
                playerList.innerHTML = ''; // Limpiamos la lista
                snapshot.forEach((doc) => {
                    const playerName = doc.data().name;
                    const playerElement = document.createElement('li');
                    playerElement.textContent = `👤 ${playerName}`;
                    playerList.appendChild(playerElement);
                });
            });

            // Acción al pulsar "Unirse a la Mesa"
            joinButton.addEventListener('click', (e) => {
                e.preventDefault(); // Evitamos que navegue inmediatamente
                const userDocRef = doc(db, "users", user.uid);
                getDoc(userDocRef).then(docSnap => {
                    if (docSnap.exists()) {
                        const playerName = docSnap.data().fullName;
                        // Añadimos al jugador a la sala
                        setDoc(doc(playersRef, user.uid), { name: playerName, joinedAt: new Date() })
                            .then(() => {
                                // Una vez añadido, ahora sí vamos a la página del juego
                                window.location.href = joinButton.href;
                            });
                    }
                });
            });
        }
    }



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
                }).catch(err => console.log("Navegador bloqueó el audio."));
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
    
    // Lógica para mostrar/ocultar contraseña
    const togglePasswords = document.querySelectorAll('.toggle-password');
    togglePasswords.forEach(toggle => {
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
            if (!user) { window.location.href = 'login.html'; return; }

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
                    uid: user.uid, email: user.email, fullName: fullName, phoneNumber: phoneNumber,
                    idFrontImageUrl: idFrontUrl, idBackImageUrl: idBackUrl, selfieWithIdUrl: selfieUrl,
                    balance: 0, isVerified: false, createdAt: new Date()
                };

                await setDoc(doc(db, "users", user.uid), userProfile);
                // La redirección la manejará onAuthStateChanged
            } catch (error) {
                alert("Error al guardar el perfil: " + error.message);
                submitButton.disabled = false;
                submitButton.textContent = 'Guardar Perfil y Entrar';
            }
        });
    }

    // Lógica del Motor del Juego
    const gameContainer = document.getElementById('game-container');
    if (gameContainer) {
        const bingoCard = document.getElementById('bingo-card');
        const callBallButton = document.getElementById('call-ball-button');
        const currentBallDisplay = document.getElementById('current-ball');
        const calledBallsList = document.getElementById('called-balls-list');
        let balls = [];
        
        function getRandomNumber(min, max, exclude) {
            let num;
            do { num = Math.floor(Math.random() * (max - min + 1)) + min; } while (exclude.includes(num));
            return num;
        }

        function generateCard() {
            bingoCard.innerHTML = '';
            const headers = ['B', 'I', 'N', 'G', 'O'];
            headers.forEach(header => {
                const cell = document.createElement('div');
                cell.classList.add('bingo-cell', 'bingo-header');
                cell.textContent = header;
                bingoCard.appendChild(cell);
            });

            const ranges = { B: [1, 15], I: [16, 30], N: [31, 45], G: [46, 60], O: [61, 75] };
            let cardNumbers = {};

            for (const letter of headers) {
                let columnNumbers = [];
                for (let i = 0; i < 5; i++) {
                    if (letter === 'N' && i === 2) { columnNumbers.push('FREE'); continue; }
                    const num = getRandomNumber(ranges[letter][0], ranges[letter][1], columnNumbers);
                    columnNumbers.push(num);
                }
                cardNumbers[letter] = columnNumbers;
            }

            for (let i = 0; i < 5; i++) {
                for (const letter of headers) {
                    const num = cardNumbers[letter][i];
                    const cell = document.createElement('div');
                    cell.classList.add('bingo-cell');
                    cell.textContent = num;
                    if (num === 'FREE') { cell.classList.add('marked'); }
                    else { cell.addEventListener('click', () => cell.classList.toggle('marked')); }
                    bingoCard.appendChild(cell);
                }
            }
        }
        
        function callNextBall() {
            if (balls.length === 0) {
                currentBallDisplay.textContent = 'FIN';
                callBallButton.disabled = true;
                return;
            }
            const ballIndex = Math.floor(Math.random() * balls.length);
            const ball = balls.splice(ballIndex, 1)[0];
            currentBallDisplay.textContent = ball;
            const ballElement = document.createElement('div');
            ballElement.classList.add('called-ball');
            ballElement.textContent = ball;
            calledBallsList.prepend(ballElement);
        }

        function initGame() {
            balls = Array.from({ length: 75 }, (_, i) => i + 1);
            calledBallsList.innerHTML = '';
            currentBallDisplay.textContent = '--';
            callBallButton.disabled = false;
            generateCard();
        }
        
        callBallButton.addEventListener('click', callNextBall);
        initGame();
    }
});


// --- 5. GUARDIA DE SEGURIDAD (ROUTER) ---
onAuthStateChanged(auth, async (user) => {
    const currentPage = window.location.pathname.split("/").pop();
    const publicPages = ['index.html', 'login.html', 'register.html', ''];
    const protectedPages = ['lobby.html', 'complete-profile.html', 'game.html', 'wallet.html'];
    
    if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDocRef);

        if (!docSnap.exists() && currentPage !== 'complete-profile.html') {
            window.location.href = 'complete-profile.html';
            return;
        }

        if (docSnap.exists() && publicPages.includes(currentPage)) {
             window.location.href = 'lobby.html';
             return;
        }

        if(docSnap.exists() && currentPage === 'lobby.html'){
            const welcomeMessage = document.getElementById('welcome-message');
            if (welcomeMessage) {
                welcomeMessage.textContent = `Bienvenido, ${docSnap.data().fullName.split(' ')[0]}`;
            }
            const lobbyBalance = document.getElementById('lobby-balance');
            if (lobbyBalance) {
                lobbyBalance.textContent = docSnap.data().balance.toFixed(2);
            }
        }
        
        if(docSnap.exists() && currentPage === 'wallet.html'){
            const balanceAmount = document.getElementById('balance-amount');
            if (balanceAmount) {
                balanceAmount.textContent = `${docSnap.data().balance.toFixed(2)} Bs.`;
            }
        }

    } else {
        if (protectedPages.includes(currentPage)) {
            window.location.href = 'login.html';
        }
    }
});
