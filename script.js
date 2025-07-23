// script.js

// Importa las instancias de auth y db desde firebase-config.js
import { auth, db } from './firebase-config.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


document.addEventListener('DOMContentLoaded', () => {
    const btnIniciar = document.getElementById('btnIniciar');
    const btnRegistrar = document.getElementById('btnRegistrar');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Opcional: Lógica de barra de progreso si la tienes en tu CSS/HTML
    const progressBarContainer = document.getElementById('progress-bar-container');
    const progressBar = document.getElementById('progress-bar');

    // Función para mostrar la barra de progreso
    function showProgressBar() {
        if (progressBarContainer) {
            progressBarContainer.style.display = 'block';
            progressBar.style.width = '0%';
            let width = 0;
            const interval = setInterval(() => {
                if (width >= 100) {
                    clearInterval(interval);
                } else {
                    width++;
                    progressBar.style.width = width + '%';
                }
            }, 10); // Ajusta la velocidad si es necesario
        }
    }

    // Función para ocultar la barra de progreso
    function hideProgressBar() {
        if (progressBarContainer) {
            progressBarContainer.style.display = 'none';
            progressBar.style.width = '0%';
        }
    }

    if (btnIniciar) {
        btnIniciar.addEventListener('click', async () => {
            const email = emailInput.value;
            const password = passwordInput.value;

            if (!email || !password) {
                alert('Por favor, ingresa tu correo y contraseña.');
                return;
            }

            showProgressBar(); // Muestra la barra al iniciar sesión

            try {
                await signInWithEmailAndPassword(auth, email, password);
                alert('Inicio de sesión exitoso!');
                window.location.href = 'lobby.html'; // Redirige al lobby
            } catch (error) {
                console.error("Error al iniciar sesión:", error);
                let errorMessage = "Error al iniciar sesión. Por favor, intenta de nuevo.";
                if (error.code === 'auth/user-not-found') {
                    errorMessage = 'Usuario no encontrado. Por favor, regístrate.';
                } else if (error.code === 'auth/wrong-password') {
                    errorMessage = 'Contraseña incorrecta.';
                } else if (error.code === 'auth/invalid-email') {
                    errorMessage = 'Correo electrónico inválido.';
                } else if (error.code === 'auth/too-many-requests') {
                    errorMessage = 'Demasiados intentos fallidos. Intenta más tarde.';
                }
                alert(errorMessage);
            } finally {
                hideProgressBar(); // Oculta la barra al finalizar
            }
        });
    }

    if (btnRegistrar) {
        btnRegistrar.addEventListener('click', () => {
            window.location.href = 'registro.html'; // Redirige a la página de registro
        });
    }

    // Opcional: Verificar estado de autenticación al cargar la página
    // Esto es útil para redirigir automáticamente si el usuario ya está logueado
    auth.onAuthStateChanged(user => {
        if (user) {
            // Usuario ya autenticado, redirigir al lobby
            // console.log("Usuario ya autenticado:", user.email);
            // window.location.href = 'lobby.html';
        } else {
            // Usuario no autenticado, mostrar la interfaz de login/registro
            // console.log("Usuario no autenticado.");
        }
    });
});
