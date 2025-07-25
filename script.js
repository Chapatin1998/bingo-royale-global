// script.js

// Asegúrate de que window.auth y window.db estén disponibles desde firebase-config.js
// Accederemos a ellos a través de window.auth y window.db
// Para autenticación, se asume que firebase.auth() y firebase.auth().signInWithEmailAndPassword
// están disponibles globalmente debido a la carga de firebase-auth-compat.js

document.addEventListener('DOMContentLoaded', () => {
    const loadingBarContainer = document.getElementById('loading-bar-container');
    const loadingBar = document.getElementById('loading-bar');
    const loadingPercentage = document.getElementById('loading-percentage');
    const startButton = document.getElementById('startButton'); // Botón INICIAR JUEGO
    const authSection = document.getElementById('auth-section'); // La sección con el formulario de login/registro
    
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

    // Elementos de texto para cambio de idioma
    const welcomeTitle = document.getElementById('welcomeTitle');
    const sloganText = document.getElementById('sloganText');
    const loadingMessage = document.getElementById('loadingMessage');
    const langSelect = document.getElementById('langSelect');
    const supportText = document.getElementById('supportText');
    const legalText1 = document.getElementById('legalText1');
    const legalText2 = document.getElementById('legalText2');

    // --- Diccionario de idiomas ---
    const translations = {
        es: {
            welcomeTitle: '¡Bienvenido a Bingo VIP Bolivia!',
            sloganText: 'Tu experiencia de bingo premium comienza aquí.',
            loadingMessage: 'Cargando tu experiencia VIP...',
            startButton: 'INICIAR JUEGO',
            emailPlaceholder: 'Correo electrónico',
            passwordPlaceholder: 'Contraseña',
            btnIniciar: 'Iniciar Sesión',
            btnRegistrar: 'Registrarse',
            supportText: '¿Necesitas ayuda? Contacto con soporte',
            legalText1: 'Este juego es solo para mayores de 18 años. Una sola cuenta por persona.',
            legalText2: 'Juega con responsabilidad.'
        },
        en: {
            welcomeTitle: 'Welcome to Bingo VIP Bolivia!',
            sloganText: 'Your premium bingo experience starts here.',
            loadingMessage: 'Loading your VIP experience...',
            startButton: 'START GAME',
            emailPlaceholder: 'Email',
            passwordPlaceholder: 'Password',
            btnIniciar: 'Sign In',
            btnRegistrar: 'Register',
            supportText: 'Need help? Contact support',
            legalText1: 'This game is for ages 18+ only. One account per person.',
            legalText2: 'Play responsibly.'
        },
        pt: {
            welcomeTitle: 'Bem-vindo ao Bingo VIP Bolívia!',
            sloganText: 'Sua experiência de bingo premium começa aqui.',
            loadingMessage: 'Carregando sua experiência VIP...',
            startButton: 'INICIAR JOGO',
            emailPlaceholder: 'Email',
            passwordPlaceholder: 'Senha',
            btnIniciar: 'Entrar',
            btnRegistrar: 'Registrar',
            supportText: 'Precisa de ajuda? Contate o suporte',
            legalText1: 'Este jogo é apenas para maiores de 18 anos. Uma conta por pessoa.',
            legalText2: 'Jogue com responsabilidade.'
        }
    };

    // Función para actualizar textos según el idioma
    function updateTexts(lang) {
        const t = translations[lang];
        if (welcomeTitle) welcomeTitle.textContent = t.welcomeTitle;
        if (sloganText) sloganText.textContent = t.sloganText;
        if (loadingMessage) loadingMessage.textContent = t.loadingMessage;
        if (startButton) startButton.textContent = t.startButton;
        if (emailInput) emailInput.placeholder = t.emailPlaceholder;
        if (passwordInput) passwordInput.placeholder = t.passwordPlaceholder;
        if (btnIniciar) btnIniciar.textContent = t.btnIniciar;
        if (btnRegistrar) btnRegistrar.textContent = t.btnRegistrar;
        if (supportText) supportText.innerHTML = t.supportText.replace('Contacto con soporte', '<a href="#" id="linkSoporte">Contacto con soporte</a>');
        if (legalText1) legalText1.textContent = t.legalText1;
        if (legalText2) legalText2.textContent = t.legalText2;
        // Re-asignar listener al linkSoporte porque el innerHTML lo remueve
        if (linkSoporte) {
             linkSoporte.removeEventListener('click', handleSupportClick); // Eliminar el viejo
             linkSoporte.addEventListener('click', handleSupportClick); // Añadir el nuevo
        }
    }

    // Manejador para el link de soporte
    function handleSupportClick(e) {
        e.preventDefault();
        alert('Para soporte, por favor envía un correo a soporte@bingovipbolivia.com.');
    }


    // --- Lógica de la barra de carga ---
    let percentage = 0;
    const loadInterval = setInterval(() => {
        percentage += 2; // Carga un poco más lenta
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
        }
    }, 150); // Velocidad de la barra de carga (más lenta)

    // --- Lógica del botón INICIAR JUEGO (primera interacción del usuario) ---
    if (startButton) {
        startButton.addEventListener('click', () => {
            // Reproducir video/música al hacer clic en INICIAR JUEGO
            if (backgroundVideo) {
                backgroundVideo.play().catch(e => console.warn("No se pudo iniciar el video al hacer clic:", e));
            }
            if (backgroundMusic) {
                backgroundMusic.play().catch(e => console.warn("No se pudo iniciar la música al hacer clic:", e));
                isMusicPlaying = true;
                musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>'; // Actualiza icono
            }

            // Ocultar el botón INICIAR JUEGO y mostrar el formulario de autenticación
            if (startButton) startButton.classList.add('hidden');
            if (authSection) authSection.classList.remove('hidden');
        });
    }

    // --- Lógica de Inicio de Sesión / Registro (dentro de auth-section) ---

    // Lógica del botón INICIAR SESIÓN
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
                if (!window.auth) { // Preferible usar window.auth si se exporta así desde config.js
                    console.error("Firebase Auth no está inicializado. Recarga la página.");
                    authErrorDisplay.textContent = "Error de autenticación. Intenta de nuevo más tarde.";
                    return;
                }
                
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

    // Lógica del botón REGISTRARSE
    if (btnRegistrar) {
        btnRegistrar.addEventListener('click', () => {
            window.location.href = 'registro.html'; // Redirige a la página de registro
        });
    }

    // Lógica del enlace de Soporte
    if (linkSoporte) {
        linkSoporte.addEventListener('click', handleSupportClick);
    }

    // --- Lógica del control de música (independiente del inicio de sesión) ---
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
            // También activa el video aquí con el mismo clic del usuario si está pausado
            if (backgroundVideo && backgroundVideo.paused) { 
                backgroundVideo.play().catch(e => console.error("Error al reproducir video:", e));
            }
        });
    }

    // --- Lógica del selector de idioma ---
    if (langSelect) {
        // Establecer idioma inicial (si ya hay una preferencia guardada o el idioma por defecto del navegador)
        const initialLang = localStorage.getItem('appLang') || 'es'; // 'es' como defecto
        langSelect.value = initialLang;
        updateTexts(initialLang); // Actualizar textos al cargar

        langSelect.addEventListener('change', (event) => {
            const selectedLang = event.target.value;
            localStorage.setItem('appLang', selectedLang); // Guardar preferencia
            updateTexts(selectedLang);
        });
    }
});
