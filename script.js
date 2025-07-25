// script.js

// Importa las funciones necesarias de Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Tu configuración de Firebase (asegúrate que estos datos son CORRECTOS y EXACTOS de tu consola)
const firebaseConfig = {
    apiKey: "AIzaSyDhXhwJXEpeBBB23l49XRaxiRT2-9mz0KI", // Tu API Key
    authDomain: "bingo-vip-bolivia-df2db.firebaseapp.com",
    projectId: "bingo-vip-bolivia-df2db",
    storageBucket: "bingo-vip-bolivia-df2db.appspot.com",
    messagingSenderId: "1015694294025",
    appId: "1:1015694294025:web:5d254b0374e26210214842",
    measurementId: "G-G6402N020Z"
};

// Inicializa Firebase UNA SOLA VEZ
let app;
try {
    if (!firebase.apps.length) { // Solo inicializa si no hay apps de Firebase inicializadas
        app = initializeApp(firebaseConfig);
        console.log("Firebase inicializado correctamente.");
    } else {
        app = firebase.apps[0]; // Reutiliza la instancia existente
        console.log("Firebase ya estaba inicializado o se está reutilizando.");
    }
} catch (error) {
    console.error("Error al inicializar Firebase:", error);
    alert("Error crítico: No se pudo inicializar Firebase. Por favor, recarga la página. " + error.message);
}

// Exporta las instancias de Auth y Firestore para uso global o en otros módulos
export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;

// Lógica de la página de inicio
document.addEventListener('DOMContentLoaded', () => {
    const loadingBarContainer = document.getElementById('loading-bar-container');
    const loadingBar = document.getElementById('loading-bar');
    const loadingPercentage = document.getElementById('loading-percentage');
    const startButton = document.getElementById('startButton');
    const backgroundMusic = document.getElementById('background-music');
    const musicToggle = document.getElementById('musicToggle');

    let percentage = 0;

    // Simulación de carga
    const loadInterval = setInterval(() => {
        percentage += 5; // Incrementa el 5% cada vez
        if (loadingBar) loadingBar.style.width = percentage + '%';
        if (loadingPercentage) loadingPercentage.textContent = percentage + '%';

        if (percentage >= 100) {
            clearInterval(loadInterval);
            if (loadingBarContainer) {
                loadingBarContainer.style.display = 'none'; // Oculta la barra de carga
            }
            if (startButton) {
                startButton.classList.remove('hidden'); // Muestra el botón INICIAR JUEGO
            }
            // Inicia la música de fondo si existe y no está ya sonando
            if (backgroundMusic && !backgroundMusic.paused) { // Check if not already playing from a previous load
                backgroundMusic.play().catch(e => {
                    console.warn("No se pudo iniciar la música automáticamente:", e);
                    // El navegador puede requerir interacción del usuario para reproducir audio/video
                });
            }
        }
    }, 100); // Velocidad de la barra de carga (cada 100ms)

    // Lógica del botón INICIAR JUEGO
    if (startButton) {
        startButton.addEventListener('click', () => {
            // Aquí redirigimos a la pantalla de Login/Registro o Bienvenida
            // Según tu flujo, la siguiente pantalla es la de Registro/Login
            window.location.href = 'login.html'; // Suponiendo que tienes un login.html
            // Si tu login/registro está en index.html, podrías mostrar/ocultar divs
        });
    }

    // Lógica del control de música
    let isMusicPlaying = false; // Estado inicial, asumimos que no suena al cargar

    if (musicToggle) {
        musicToggle.addEventListener('click', () => {
            if (backgroundMusic) {
                if (isMusicPlaying) {
                    backgroundMusic.pause();
                    musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>'; // Icono de mute
                } else {
                    backgroundMusic.play().catch(e => console.error("Error al reproducir música:", e));
                    musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>'; // Icono de volumen
                }
                isMusicPlaying = !isMusicPlaying;
            }
        });
    }

    // Intenta reproducir la música al inicio si no se reproduce automáticamente
    // Necesitas una interacción del usuario, por eso se enlaza al final de la carga o a un clic.
    // También se puede intentar dentro de un setTimeout para no bloquear.
    // backgroundMusic.play().catch(e => console.log("Música no se pudo reproducir automáticamente:", e));
});
