// registro.js

// Asegúrate de que 'auth' y 'db' estén disponibles globalmente desde firebase-config.js
// como window.auth y window.db, o importados si usas módulos estrictos.

document.addEventListener('DOMContentLoaded', () => {
    const nombreCompletoInput = document.getElementById('nombreCompleto');
    const emailRegistroInput = document.getElementById('emailRegistro');
    const passwordRegistroInput = document.getElementById('passwordRegistro');
    const confirmPasswordRegistroInput = document.getElementById('confirmPasswordRegistro');
    const btnCrearCuenta = document.getElementById('btnCrearCuenta');
    const registerErrorDisplay = document.getElementById('registerError');
    const backgroundVideo = document.getElementById('background-video-registro'); // Video de fondo específico para esta página

    // Asegurarse de que el video de fondo se reproduzca si está presente
    if (backgroundVideo) {
        backgroundVideo.play().catch(e => console.warn("No se pudo iniciar el video de registro automáticamente:", e));
    }


    if (btnCrearCuenta) {
        btnCrearCuenta.addEventListener('click', async () => {
            const nombreCompleto = nombreCompletoInput.value;
            const email = emailRegistroInput.value;
            const password = passwordRegistroInput.value;
            const confirmPassword = confirmPasswordRegistroInput.value;
            registerErrorDisplay.textContent = ''; // Limpiar errores previos

            if (!nombreCompleto || !email || !password || !confirmPassword) {
                registerErrorDisplay.textContent = 'Por favor, rellena todos los campos.';
                return;
            }

            if (password !== confirmPassword) {
                registerErrorDisplay.textContent = 'Las contraseñas no coinciden.';
                return;
            }

            if (password.length < 6) {
                registerErrorDisplay.textContent = 'La contraseña debe tener al menos 6 caracteres.';
                return;
            }

            try {
                // Asegúrate de que window.auth y window.db estén disponibles
                if (!window.auth || !window.db) {
                    throw new Error("Firebase no está inicializado. Recarga la página.");
                }

                // Crear usuario en Firebase Authentication
                const userCredential = await window.auth.createUserWithEmailAndPassword(email, password);
                const user = userCredential.user;

                // Guardar información adicional del usuario en Firestore
                await window.db.collection('users').doc(user.uid).set({
                    nombreCompleto: nombreCompleto,
                    email: email,
                    avatar: 'avatar_default.png', // Avatar por defecto
                    balance: 500, // Bono de registro inicial, como en tu plan
                    createAt: firebase.firestore.FieldValue.serverTimestamp() // Fecha de creación
                });

                alert('¡Registro exitoso! ¡Bienvenido a Bingo VIP Bolivia!');
                window.location.href = 'lobby.html'; // Redirige al lobby después del registro

            } catch (error) {
                console.error("Error al registrar:", error.code, error.message);
                let errorMessage = 'Ocurrió un error al registrar el usuario. Por favor, intenta de nuevo.';

                switch (error.code) {
                    case 'auth/email-already-in-use':
                        errorMessage = 'Este correo electrónico ya está en uso. Por favor, usa otro o inicia sesión.';
                        break;
                    case 'auth/invalid-email':
                        errorMessage = 'El formato del correo electrónico es inválido.';
                        break;
                    case 'auth/weak-password':
                        errorMessage = 'La contraseña es demasiado débil. Usa al menos 6 caracteres.';
                        break;
                    case 'auth/operation-not-allowed':
                        errorMessage = 'El registro con correo y contraseña no está habilitado en Firebase.';
                        break;
                    default:
                        errorMessage = `Error: ${error.message}`;
                        break;
                }
                registerErrorDisplay.textContent = errorMessage;
            }
        });
    }

    // Lógica para el enlace "Iniciar Sesión" al pie
    const linkIniciarSesion = document.querySelector('.link-text a[href="index.html"]'); // Selector para el link de "Iniciar Sesión"
    if (linkIniciarSesion) {
        linkIniciarSesion.addEventListener('click', (e) => {
            e.preventDefault(); // Evita la navegación por defecto
            window.location.href = 'index.html'; // Redirige a la página principal (login)
        });
    }
});
