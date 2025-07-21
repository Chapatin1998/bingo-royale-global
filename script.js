document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos del DOM
    const barraProgreso = document.getElementById('progreso'); // ID corregido
    const porcentajeCarga = document.getElementById('porcentaje'); // ID corregido
    const botonIniciarJuego = document.getElementById('btnIniciar'); // ID original de tu HTML
    const musicaFondo = document.getElementById('musicaFondo'); // Referencia al elemento de audio
    const botonMusica = document.getElementById('botonMusica'); // Referencia al botón de música
    const botonNotificaciones = document.getElementById('botonNotificaciones'); // Referencia al botón de notificaciones
    const fraseBienvenidaAdicional = document.querySelector('.frase-bienvenida-adicional');

    let progreso = 0;
    const duracionCarga = 3000; // 3 segundos para simular la carga
    const intervalo = duracionCarga / 100; // Actualizar cada 1%

    // Deshabilitar el botón de iniciar juego y botones de música/notificaciones al principio
    botonIniciarJuego.setAttribute('disabled', true);
    botonMusica.setAttribute('disabled', true);
    botonNotificaciones.setAttribute('disabled', true);

    // Ocultar la frase de bienvenida adicional al principio
    if (fraseBienvenidaAdicional) {
        fraseBienvenidaAdicional.style.opacity = '0';
    }


    // Función para simular el progreso de la carga
    function simularCarga() {
        const cargaInterval = setInterval(() => {
            if (progreso < 100) {
                progreso++;
                barraProgreso.style.width = progreso + '%';
                porcentajeCarga.textContent = progreso + '%';
            } else {
                clearInterval(cargaInterval); // Detener la simulación de carga

                // Ocultar la barra de carga y el porcentaje suavemente
                barraProgreso.style.opacity = '0';
                porcentajeCarga.style.opacity = '0';
                barraProgreso.style.transition = 'opacity 0.5s ease-out';
                porcentajeCarga.style.transition = 'opacity 0.5s ease-out';
                
                // Asegurarse de que la animación del rayo se detenga (opcional pero bueno para rendimiento)
                const rayoElement = barraProgreso.querySelector('::before');
                if (rayoElement) { // Verifica si el pseudo-elemento existe
                   // rayoElement.style.animation = 'none'; // Desactiva la animación
                }


                // Habilitar los botones
                botonIniciarJuego.removeAttribute('disabled');
                botonMusica.removeAttribute('disabled');
                botonNotificaciones.removeAttribute('disabled');

                botonIniciarJuego.style.cursor = 'pointer';
                botonMusica.style.cursor = 'pointer';
                botonNotificaciones.style.cursor = 'pointer';

                // Mostrar la frase de bienvenida adicional
                if (fraseBienvenidaAdicional) {
                    fraseBienvenidaAdicional.style.opacity = '1';
                    fraseBienvenidaAdicional.style.transition = 'opacity 1s ease-in-out';
                }

                // Iniciar la música automáticamente si es el comportamiento deseado
                if (musicaFondo && !musicaFondo.paused) { // Solo si ya estaba reproduciéndose o quieres que inicie
                    // Si la música debe iniciar al final de la carga
                     musicaFondo.play().catch(error => {
                        console.log("La reproducción automática de audio fue bloqueada:", error);
                        // Informar al usuario que necesita interactuar para activar el audio
                        // Por ejemplo, mostrar un botón de "Activar Sonido"
                    });
                }
                
                // Opcional: Redirigir o mostrar contenido principal del juego
                // console.log("Carga completa, ¡listo para jugar!");
                // window.location.href = 'pagina-del-juego.html'; 
            }
        }, intervalo);
    }

    // Iniciar la simulación de carga cuando la página se carga
    simularCarga();

    // --- Funcionalidad de los botones ---

    // Botón Iniciar Juego
    if (botonIniciarJuego) {
        botonIniciarJuego.addEventListener('click', () => {
            // alert('¡Iniciando el juego de Bingo!');
            // Aquí iría la lógica para cargar el juego o redirigir
            // Ya tenías un setTimeout para redirigir, lo puedes usar aquí:
            setTimeout(() => {
                 window.location.href = 'main.html'; // Cambia esto al archivo real del juego
            }, 300); // Pequeño retraso para una transición suave
        });
    }

    // Botón de Música
    if (botonMusica && musicaFondo) {
        let musicaActiva = false; // Estado inicial, asumiendo que empieza pausada
        
        // Intentar reproducir automáticamente (puede ser bloqueado por el navegador)
        musicaFondo.play().then(() => {
            musicaActiva = true;
            botonMusica.querySelector('.fas').classList.remove('fa-volume-mute');
            botonMusica.querySelector('.fas').classList.add('fa-music');
        }).catch(error => {
            console.log("Autoplay de música bloqueado. El usuario debe interactuar.", error);
            musicaActiva = false; // Asegurar que el estado es "pausado"
            botonMusica.querySelector('.fas').classList.remove('fa-music');
            botonMusica.querySelector('.fas').classList.add('fa-volume-mute');
        });

        botonMusica.addEventListener('click', () => {
            if (musicaActiva) {
                musicaFondo.pause();
                botonMusica.querySelector('.fas').classList.remove('fa-music');
                botonMusica.querySelector('.fas').classList.add('fa-volume-mute');
                musicaActiva = false;
            } else {
                musicaFondo.play().catch(error => {
                    console.log("Error al intentar reproducir música por interacción del usuario:", error);
                    // Podrías mostrar un mensaje al usuario aquí
                });
                botonMusica.querySelector('.fas').classList.remove('fa-volume-mute');
                botonMusica.querySelector('.fas').classList.add('fa-music');
                musicaActiva = true;
            }
        });
    }

    // Botón de Notificaciones
    if (botonNotificaciones) {
        botonNotificaciones.addEventListener('click', () => {
            alert('¡Nuevas notificaciones o alertas aquí!');
            // Aquí iría la lógica real para mostrar notificaciones, como un modal o un toast
        });
    }
});
