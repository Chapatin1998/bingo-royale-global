// script.js

// Importa las funciones necesarias de Firebase SDK
// NOTA: initializeApp, getAuth, getFirestore no se importan aquí directamente si se cargan globalmente en index.html
// y se accede a 'auth' y 'db' a través de window.auth y window.db.
// Para signInWithEmailAndPassword, sí necesitas importarlo si lo usas en este archivo.
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


document.addEventListener('DOMContentLoaded', () => {
    const loadingBarContainer = document.getElementById('loading-bar-container');
    const loadingBar = document.getElementById('loading-bar');
    const loadingPercentage = document.getElementById('loading-percentage');
    const startButton = document.getElementById('startButton');
    const backgroundVideo = document.getElementById('background-video'); // Agregado: Referencia al video
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

                // CAMBIO AQUÍ: Intenta reproducir video y música cuando el botón INICIAR JUEGO aparece
                // Esto puede funcionar si el navegador ya permite autoplay muted, o si el usuario luego interactúa.
                if (backgroundVideo) {
                    backgroundVideo.play().catch(e => console.warn("No se pudo iniciar el video automáticamente:", e));
                }
                if (backgroundMusic) {
                    backgroundMusic.play().catch(e => console.warn("No se pudo iniciar la música automáticamente:", e));
                }
            }
        }
    }, 100); // Velocidad de la barra de carga (cada 100ms)

    // Lógica del botón INICIAR JUEGO
    if (startButton) {
        startButton.addEventListener('click', () => {
            // Aquí redirigimos a la pantalla de Login/Registro o Bienvenida
            window.location.href = 'login.html'; // Redirige a login.html
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
