// script.js

// Importa las funciones necesarias para autenticación si se requiere, aunque con compat ya están globales.
// window.auth y window.db se accederán directamente si se configuran en firebase-config.js
// como window.auth = firebase.auth();
// Para signInWithEmailAndPassword, usamos firebase.auth().signInWithEmailAndPassword
// Ya no necesitamos import { signInWithEmailAndPassword } from "...";

document.addEventListener('DOMContentLoaded', () => {
    const loadingBarContainer = document.getElementById('loading-bar-container');
    const loadingBar = document.getElementById('loading-bar');
    const loadingPercentage = document.getElementById('loading-percentage');
    const authSection = document.getElementById('auth-section'); // La sección con el formulario
    
    // Elementos del formulario de autenticación
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const btnIniciar = document.getElementById('btnIniciar');
    const btnRegistrar = document.getElementById('btnRegistrar');
    const authErrorDisplay = document.getElementById('authError'); // Para mostrar errores
    const linkSoporte = document.getElementById('linkSoporte'); // Enlace de soporte

    // Controles de medios
    const backgroundVideo = document.getElementById('background-video');
    const backgroundMusic = document.getElementById('background-music');
    const musicToggle = document.getElementById('musicToggle');
    let isMusicPlaying = false; // Estado de la música

    let percentage = 0;

    // --- Lógica de la barra de carga ---
    const loadInterval = setInterval(() => {
        percentage += 5; // Incrementa el 5% cada vez
        if (loadingBar) loadingBar.style.width = percentage + '%';
        if (loadingPercentage) loadingPercentage.textContent = percentage + '%';

        if (percentage >= 100) {
            clearInterval(loadInterval);
            if (loadingBarContainer) {
                loadingBarContainer.style.display = 'none'; // Oculta la barra de carga
            }
            if (authSection) {
                authSection.classList.remove('hidden'); // Muestra el formulario de inicio de sesión
            }

            // --- Intentar reproducir video y música después de la carga ---
            // Esto solo es un intento, navegadores pueden requerir interacción del usuario.
            if (backgroundVideo) {
                backgroundVideo.play().catch(e => console.warn("No se pudo iniciar el video automáticamente:", e));
            }
            if (backgroundMusic) {
                backgroundMusic.play().catch(e => console.warn("No se pudo iniciar la música automáticamente:", e));
                isMusicPlaying = true; // Asumimos que intentamos reproducir
            }
            // Actualizar icono de música si se reprodujo
            if (musicToggle && isMusicPlaying) {
                 musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
            }
        }
    }, 100); // Velocidad de la barra de carga (cada 100ms)

    // --- Lógica del botón INICIAR SESIÓN ---
    if (btnIniciar) {
        btnIniciar.addEventListener('click', async () => {
            const email = emailInput.value;
            const password = passwordInput.value;
            authErrorDisplay.textContent = ''; // Limpiar errores previos

            if (!email || !password) {
                authErrorDisplay.textContent = 'Por favor, ingresa tu correo y contraseña.';
                return;
            }

            try {
                // Accede a 'auth' a través de window.auth (definido en firebase-config.js)
                // Asegúrate de que window.auth esté disponible
                if (!window.auth) {
                    console.error("Firebase Auth no está inicializado. Recarga la página.");
                    authErrorDisplay.textContent = "Error de autenticación. Intenta de nuevo más tarde.";
                    return;
                }
                
                // Usar la función de Firebase Auth globalmente disponible
                await window.auth.signInWithEmailAndPassword(email, password);
                alert('Inicio de sesión exitoso!');
                window.location.href = 'lobby.html'; // Redirige al lobby

            } catch (error) {
                console.error("Error al iniciar sesión:", error.code, error.message);
                let errorMessage = 'Ocurrió un error al iniciar sesión. Por favor, intenta de nuevo.';

                switch (error.code) {
                    case 'auth/invalid-email':
                        errorMessage = 'El formato del correo electrónico es inválido.';
                        break;
                    case 'auth/user-not-found':
                    case 'auth/wrong-password':
                        errorMessage = 'Correo o contraseña incorrectos.';
                        break;
                    case 'auth/user-disabled':
                        errorMessage = 'Tu cuenta ha sido deshabilitada.';
                        break;
                    case 'auth/too-many-requests':
                        errorMessage = 'Demasiados intentos de inicio de sesión. Intenta de nuevo más tarde.';
                        break;
                    case 'auth/invalid-credential':
                        errorMessage = 'Las credenciales proporcionadas son inválidas.';
                        break;
                    default:
                        errorMessage = `Error: ${error.message}`;
                        break;
                }
                authErrorDisplay.textContent = errorMessage;
            }
        });
    }

    // --- Lógica del botón REGISTRARSE ---
    if (btnRegistrar) {
        btnRegistrar.addEventListener('click', () => {
            window.location.href = 'registro.html'; // Redirige a la página de registro
        });
    }

    // --- Lógica del enlace de Soporte ---
    if (linkSoporte) {
        linkSoporte.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Para soporte, por favor envía un correo a soporte@bingovipbolivia.com.');
        });
    }

    // --- Lógica del control de música ---
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
