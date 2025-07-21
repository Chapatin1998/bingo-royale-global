document.addEventListener('DOMContentLoaded', () => {
    const barraProgreso = document.getElementById('barraProgreso');
    const porcentajeCarga = document.getElementById('porcentajeCarga');
    const contenedorPrincipal = document.querySelector('.contenedor-principal'); // Para la animación de entrada

    let progreso = 0;
    const duracionCarga = 3000; // 3 segundos para simular la carga
    const intervalo = duracionCarga / 100; // Actualizar cada 1%

    // Función para simular el progreso de la carga
    function simularCarga() {
        const cargaInterval = setInterval(() => {
            if (progreso < 100) {
                progreso++;
                barraProgreso.style.width = progreso + '%';
                porcentajeCarga.textContent = progreso + '%';
            } else {
                clearInterval(cargaInterval);
                // Cuando la carga termina, puedes decidir qué hacer:
                // Por ejemplo, ocultar la barra de carga y mostrar el contenido principal
                // O redirigir a otra página.
                // Aquí, simplemente mostraremos el contenido principal si estaba oculto.
                
                // Si tienes una pantalla de carga separada que quieres ocultar:
                // document.querySelector('.pantalla-carga').style.display = 'none';
                
                // Si la página ya está visible y solo la barra progresa:
                // console.log("Carga completa, ¡listo para jugar!");
                
                // Animación de desvanecimiento de la barra de carga (opcional)
                barraProgreso.style.opacity = '0';
                porcentajeCarga.style.opacity = '0';
                barraProgreso.style.transition = 'opacity 0.5s ease-out';
                porcentajeCarga.style.transition = 'opacity 0.5s ease-out';
                
                // Opcional: Desactivar la animación de rayo después de la carga
                barraProgreso.querySelector('::before').style.animation = 'none';

                // Una vez que la carga finaliza, puedes habilitar el botón "Iniciar Juego"
                const botonIniciarJuego = document.querySelector('.boton-juego');
                if (botonIniciarJuego) {
                    botonIniciarJuego.removeAttribute('disabled'); // Asegúrate de que no esté deshabilitado inicialmente en HTML
                    botonIniciarJuego.style.cursor = 'pointer';
                    // Aquí podrías añadir una animación final o un efecto al botón
                }

                // Aquí podrías redirigir al juego o mostrar la interfaz principal del juego
                // window.location.href = 'pagina-del-juego.html'; 
            }
        }, intervalo);
    }

    // Iniciar la simulación de carga cuando la página se carga
    simularCarga();

    // Funcionalidad de los botones (ejemplo)
    const botonMusica = document.querySelector('.boton-musica');
    if (botonMusica) {
        let musicaEncendida = true; // Estado inicial
        botonMusica.addEventListener('click', () => {
            musicaEncendida = !musicaEncendida;
            const iconoMusica = botonMusica.querySelector('.fas');
            if (musicaEncendida) {
                iconoMusica.classList.remove('fa-volume-mute');
                iconoMusica.classList.add('fa-music');
                console.log('Música encendida');
                // Aquí iría la lógica para reproducir música
            } else {
                iconoMusica.classList.remove('fa-music');
                iconoMusica.classList.add('fa-volume-mute');
                console.log('Música apagada');
                // Aquí iría la lógica para pausar música
            }
        });
    }

    const botonNotificaciones = document.querySelector('.boton-notificaciones');
    if (botonNotificaciones) {
        botonNotificaciones.addEventListener('click', () => {
            alert('¡Nuevas notificaciones o alertas aquí!');
            // Aquí iría la lógica para mostrar notificaciones reales
        });
    }

    // Funcionalidad del botón Iniciar Juego (una vez que la carga termina)
    const botonIniciarJuego = document.querySelector('.boton-juego');
    if (botonIniciarJuego) {
        // Inicialmente, podrías deshabilitarlo en tu HTML: <button class="boton-juego" disabled>
        // Y lo habilitas cuando la carga termina en la función simularCarga()
        botonIniciarJuego.addEventListener('click', () => {
            alert('¡Iniciando el juego de Bingo!');
            // Aquí iría la lógica para cargar el juego o redirigir
            // window.location.href = 'juego-de-bingo.html';
        });
    }
});
