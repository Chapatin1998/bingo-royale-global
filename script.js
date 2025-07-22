// Asegúrate de que Firebase auth y db estén disponibles desde el módulo en index.html
// window.auth y window.db se exportan desde el script type="module" en index.html

document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const btnIniciar = document.getElementById('btnIniciar');
    const btnRegistrar = document.getElementById('btnRegistrar');
    const linkSoporte = document.getElementById('linkSoporte');
    const musicaFondo = document.getElementById('musicaFondo');
    const botonMusica = document.getElementById('botonMusica');
    const botonNotificaciones = document.getElementById('botonNotificaciones');
    const progresoBar = document.getElementById('progreso');
    const porcentajeText = document.getElementById('porcentaje');

    let musicaReproduciendo = false; // Estado inicial de la música

    // Simulación de carga
    let progreso = 0;
    const intervaloCarga = setInterval(() => {
        progreso += 10;
        if (progreso <= 100) {
            progresoBar.style.width = `${progreso}%`;
            porcentajeText.textContent = `${progreso}%`;
        }
        if (progreso >= 100) {
            clearInterval(intervaloCarga);
            porcentajeText.textContent = '¡Listo!';
            // Opcional: Ocultar la barra de carga después de un tiempo
            setTimeout(() => {
                document.querySelector('.barra').style.display = 'none';
                porcentajeText.style.display = 'none';
            }, 500);
        }
    }, 100);

    // Lógica del botón de música
    if (botonMusica && musicaFondo) {
        botonMusica.addEventListener('click', () => {
            if (musicaReproduciendo) {
                musicaFondo.pause();
                botonMusica.innerHTML = '<i class="fas fa-volume-mute"></i>'; // Icono de mute
            } else {
                musicaFondo.play().catch(e => console.error("Error al reproducir música:", e));
                botonMusica.innerHTML = '<i class="fas fa-music"></i>'; // Icono de música
            }
            musicaReproduciendo = !musicaReproduciendo;
        });
    }

    // Lógica del botón de notificaciones (ejemplo simple)
    if (botonNotificaciones) {
        botonNotificaciones.addEventListener('click', () => {
            alert('No tienes notificaciones nuevas por ahora.');
        });
    }

    // Lógica para el botón de Iniciar Sesión
    if (btnIniciar) {
        btnIniciar.addEventListener('click', async () => {
            // AÑADIDO: Efecto de animación en el botón de música
            if (botonMusica) {
                botonMusica.classList.add('pulsando');
                setTimeout(() => {
                    botonMusica.classList.remove('pulsando');
                }, 500); // Elimina la clase después de medio segundo
            }

            const email = emailInput.value;
            const password = passwordInput.value;

            if (!email || !password) {
                alert('Por favor, ingresa tu correo y contraseña.');
                return;
            }

            try {
                // Importa signInWithEmailAndPassword aquí para asegurar su disponibilidad
                const { signInWithEmailAndPassword } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js");
                
                // Usa la instancia de auth que se exportó globalmente desde el módulo en index.html
                const userCredential = await signInWithEmailAndPassword(window.auth, email, password);
                const user = userCredential.user;
                console.log("Usuario ha iniciado sesión:", user.email);
                alert('¡Inicio de sesión exitoso! ¡Bienvenido de nuevo!');
                window.location.href = 'lobby.html'; // Redirige al lobby
            } catch (error) {
                console.error("Error al iniciar sesión:", error.code, error.message);
                let errorMessage = "Ocurrió un error al iniciar sesión.";
                
                errorMessage += "\n\nDetalle del error: " + error.message; 
                if (error.code) {
                    errorMessage += "\nCódigo del error: " + error.code;
                }

                if (error.code === 'auth/invalid-email') {
                    errorMessage = "El formato del correo electrónico es inválido.";
                } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                    errorMessage = "Credenciales incorrectas. Verifica tu correo y contraseña.";
                } else if (error.code === 'auth/too-many-requests') {
                    errorMessage = "Demasiados intentos de inicio de sesión fallidos. Inténtalo de nuevo más tarde.";
                }
                alert(errorMessage);
            }
        });
    }

    // Lógica para el botón de Registrarse
    if (btnRegistrar) {
        btnRegistrar.addEventListener('click', () => {
            window.location.href = 'registro.html'; // Redirige a la página de registro
        });
    }

    // Lógica para el link de Soporte
    if (linkSoporte) {
        linkSoporte.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Para soporte, por favor envía un correo a soporte@bingovipbolivia.com');
        });
    }
});
