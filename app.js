// Lógica que se ejecuta cuando la página está lista
document.addEventListener('DOMContentLoaded', () => {
    // --- Elementos de la página ---
    const loaderScreen = document.getElementById('loader-screen');
    const loaderBar = document.getElementById('loader-bar');
    const loaderPercentage = document.getElementById('loader-percentage');
    const mainContent = document.getElementById('main-content');
    const startButton = document.getElementById('start-button');
    const backgroundMusic = document.getElementById('background-music');

    // --- Lógica de la Barra de Carga ---
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 5) + 1; // Suma un número aleatorio para que no sea monótono
        if (progress > 100) progress = 100;
        
        // Actualizamos los elementos visuales de la carga
        if (loaderBar) loaderBar.style.width = progress + '%';
        if (loaderPercentage) loaderPercentage.textContent = progress + '%';
        
        // Cuando la carga llega al 100%
        if (progress === 100) {
            clearInterval(interval); // Detenemos el contador
            setTimeout(() => {
                // Hacemos desaparecer la pantalla de carga con una transición suave
                if (loaderScreen) loaderScreen.style.opacity = '0';
                setTimeout(() => {
                    // La ocultamos por completo y mostramos el contenido principal
                    if (loaderScreen) loaderScreen.style.display = 'none';
                    if (mainContent) mainContent.classList.remove('hidden');
                }, 1000); // 1 segundo de transición
            }, 500); // Pequeña pausa antes de desaparecer
        }
    }, 80); // Velocidad de la carga

    // --- Lógica del Botón de Inicio ---
    if (startButton) {
        startButton.addEventListener('click', () => {
            // Activar música
            if (backgroundMusic) {
                backgroundMusic.volume = 0.3;
                backgroundMusic.play().catch(e => console.error("Música bloqueada por el navegador."));
            }
            // Muestra una alerta para confirmar que funciona
            alert("¡Pieza terminada! Próximo paso: construir la página de login.");
            
            // En el futuro, esta línea nos llevará a la siguiente página
            // window.location.href = 'login.html'; 
        });
    }
});
