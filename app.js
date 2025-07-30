document.addEventListener('DOMContentLoaded', () => {
    const languageButton = document.getElementById('language-button');
    const languageMenu = document.getElementById('language-menu');
    
    const translations = {
        es: { 
            loginTitle: "Iniciar Sesión",
            emailPlaceholder: "Correo Electrónico",
            passwordPlaceholder: "Contraseña",
            loginButton: "Entrar",
            registerText: "¿No tienes una cuenta? <a href='register.html'>Regístrate</a>",
            flag: "🇧🇴 Español"
        },
        en: { 
            loginTitle: "Login",
            emailPlaceholder: "Email Address",
            passwordPlaceholder: "Password",
            loginButton: "Enter",
            registerText: "Don't have an account? <a href='register.html'>Sign Up</a>",
            flag: "🇺🇸 English"
        },
        pt: { 
            loginTitle: "Entrar",
            emailPlaceholder: "Endereço de e-mail",
            passwordPlaceholder: "Senha",
            loginButton: "Entrar",
            registerText: "Não tem uma conta? <a href='register.html'>Cadastre-se</a>",
            flag: "🇧🇷 Português"
        }
    };

    function applyTranslations(lang) {
        if (!translations[lang]) return;

        const t = translations[lang];
        const loginTitleEl = document.querySelector('h1');
        const emailInputEl = document.querySelector('input[name="email"]');
        const passwordInputEl = document.querySelector('input[name="password"]');
        const loginButtonEl = document.querySelector('.cta-button');
        const registerTextEl = document.querySelector('.form-footer p');

        if (loginTitleEl) loginTitleEl.textContent = t.loginTitle;
        if (emailInputEl) emailInputEl.placeholder = t.emailPlaceholder;
        if (passwordInputEl) passwordInputEl.placeholder = t.passwordPlaceholder;
        if (loginButtonEl) loginButtonEl.textContent = t.loginButton;
        if (registerTextEl) registerTextEl.innerHTML = t.registerText;
        if (languageButton) languageButton.textContent = t.flag;
    }

    if (languageButton) {
        languageButton.addEventListener('click', () => {
            if(languageMenu) languageMenu.classList.toggle('hidden');
        });
    }

    if (languageMenu) {
        languageMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                const lang = e.target.dataset.lang;
                localStorage.setItem('userLanguage', lang); // Guardamos la elección
                applyTranslations(lang);
                languageMenu.classList.add('hidden');
            }
        });
    }

    // Al cargar la página, revisamos si hay un idioma guardado
    const savedLang = localStorage.getItem('userLanguage');
    if (savedLang) {
        applyTranslations(savedLang);
    }

    // Lógica para mostrar/ocultar contraseña
    const togglePassword = document.querySelector('.toggle-password');
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const passwordField = document.getElementById('password-field');
            if (passwordField) {
                const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordField.setAttribute('type', type);
                this.textContent = type === 'password' ? '👁️' : '🙈';
            }
        });
    }
});
