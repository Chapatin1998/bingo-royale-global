document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos del DOM
    const barraProgreso = document.getElementById('progreso');
    const porcentajeCarga = document.getElementById('porcentaje');
    const btnIniciar = document.getElementById('btnIniciar'); // Botón "Iniciar Sesión"
    const btnRegistrar = document.getElementById('btnRegistrar'); // Nuevo botón "Registrarse"
    const linkSoporte = document.getElementById('linkSoporte'); // Enlace "Contacta con soporte"
    const musicaFondo = document.getElementById('musicaFondo');
    const botonMusica = document.getElementById('botonMusica');
    const botonNotificaciones = document.getElementById('botonNotificaciones');
    const fraseBienvenidaPrincipal = document.querySelector('.frase-bienvenida-principal');
    const logoElement = document.querySelector('.logo'); // Para el efecto de logo

    let progreso = 0;
    const duracionCarga = 3000; // 3 segundos para simular la carga
    const intervalo = duracionCarga / 100; // Actualizar cada 1%

    // Deshabilitar botones y ocultar elementos al principio
    btnIniciar.setAttribute('disabled', true);
    btnRegistrar.setAttribute('disabled', true);
    botonMusica.setAttribute('disabled', true);
    botonNotificaciones.setAttribute('disabled', true);
    if (fraseBienvenidaPrincipal) {
        fraseBienvenidaPrincipal.style.opacity = '0';
    }
    // Ocultar la barra de carga y el porcentaje al inicio si quieres que aparezcan con la animación
    // barraProgreso.style.opacity = '0';
    // porcentajeCarga.style.opacity = '0';

    // Función para simular el progreso de la carga
    function simularCarga() {
        const cargaInterval = setInterval(() => {
            if (progreso < 100) {
                progreso++;
                barraProgreso.style.width = progreso + '%';
                porcentajeCarga.textContent = progreso + '%';
            } else {
                clearInterval(cargaInterval);

                // Ocultar la barra de carga y el porcentaje suavemente
                barraProgreso.style.opacity = '0';
                porcentajeCarga.style.opacity = '0';
                barraProgreso.style.transition = 'opacity 0.5s ease-out';
                porcentajeCarga.style.transition = 'opacity 0.5s ease-out';
                
                // Habilitar los botones
                btnIniciar.removeAttribute('disabled');
                btnRegistrar.removeAttribute('disabled');
                botonMusica.removeAttribute('disabled');
                botonNotificaciones.removeAttribute('disabled');

                btnIniciar.style.cursor = 'pointer';
                btnRegistrar.style.cursor = 'pointer';
                botonMusica.style.cursor = 'pointer';
                botonNotificaciones.style.cursor = 'pointer';

                // Mostrar la frase de bienvenida principal
                if (fraseBienvenidaPrincipal) {
                    fraseBienvenidaPrincipal.style.opacity = '1';
                    fraseBienvenidaPrincipal.style.transition = 'opacity 1s ease-in-out';
                }

                // Intentar reproducir la música automáticamente
                if (musicaFondo) {
                    musicaFondo.play().then(() => {
                        console.log("Música reproduciéndose automáticamente.");
                        // Actualizar ícono a "música" si se reproduce
                        botonMusica.querySelector('.fas').classList.remove('fa-volume-mute');
                        botonMusica.querySelector('.fas').classList.add('fa-music');
                    }).catch(error => {
                        console.log("La reproducción automática de audio fue bloqueada por el navegador:", error);
                        console.log("El usuario deberá interactuar con la página (ej. hacer clic en el botón de música) para que el audio se reproduzca.");
                        // Actualizar ícono a "mute" si no se reproduce
                        botonMusica.querySelector('.fas').classList.remove('fa-music');
                        botonMusica.querySelector('.fas').classList.add('fa-volume-mute');
                    });
                }
            }
        }, intervalo);
    }

    // Iniciar la simulación de carga cuando la página se carga
    simularCarga();

    // --- Funcionalidad de los botones ---

    // Botón "Iniciar Sesión"
    if (btnIniciar) {
        btnIniciar.addEventListener('click', () => {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            if (email && password) {
                alert(`Intentando iniciar sesión con: ${email} / ${password}`);
                // Aquí iría la lógica de autenticación real
                // Si la autenticación es exitosa, redirigir:
                // setTimeout(() => {
                //      window.location.href = 'main.html';
                // }, 300);
            } else {
                alert('Por favor, ingresa tu correo y contraseña.');
            }
        });
    }

    // Botón "Registrarse"
    if (btnRegistrar) {
        btnRegistrar.addEventListener('click', () => {
            alert('Redirigiendo a la página de registro...');
            // Aquí iría la lógica para redirigir a la página de registro
            // window.location.href = 'registro.html';
        });
    }

    // Enlace "Contacta con soporte"
    if (linkSoporte) {
        linkSoporte.addEventListener('click', (e) => {
            e.preventDefault(); // Previene la acción por defecto del enlace
            alert('Redirigiendo a la página de soporte o abriendo chat de ayuda...');
            // Aquí iría la lógica para redirigir a la página de soporte o abrir un widget de chat
            // window.location.href = 'soporte.html';
        });
    }

    // Botón de Música
    if (botonMusica && musicaFondo) {
        let musicaActiva = false; // Estado inicial, se actualizará al intentar autoplay

        botonMusica.addEventListener('click', () => {
            if (musicaFondo.paused) {
                musicaFondo.play().then(() => {
                    botonMusica.querySelector('.fas').classList.remove('fa-volume-mute');
                    botonMusica.querySelector('.fas').classList.add('fa-music');
                    musicaActiva = true;
                }).catch(error => {
                    console.log("Error al reproducir música por interacción:", error);
                    alert("No se pudo reproducir la música. Asegúrate de que tu navegador lo permita.");
                });
            } else {
                musicaFondo.pause();
                botonMusica.querySelector('.fas').classList.remove('fa-music');
                botonMusica.querySelector('.fas').classList.add('fa-volume-mute');
                musicaActiva = false;
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
