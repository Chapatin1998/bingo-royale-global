// script.js

// Ya no importamos 'auth' y 'db' de firebase-config.js
// Accederemos a ellos a través de 'window.auth' y 'window.db'
// Asegúrate de que Firebase se cargue antes que este script en index.html

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
            // Intenta iniciar la música de fondo al final de la carga (navegadores pueden bloquear autoplay)
            if (backgroundMusic) {
                backgroundMusic.play().catch(e => {
                    console.warn("No se pudo iniciar la música automáticamente:", e);
                    // Puedes mostrar un mensaje al usuario para que toque la pantalla
                });
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
});
