// --- DICCIONARIO DE TRADUCCIONES ---
const translations = {
    es: { 
        startBtn: "Iniciar Juego", 
        warning: "⚠️ Juego para mayores de 18 años. Juega con responsabilidad.", 
        flag: "🇧🇴 Español",
        loginTitle: "Iniciar Sesión",
        emailPlaceholder: "Correo Electrónico",
        passwordPlaceholder: "Contraseña",
        loginButton: "Entrar",
        registerText: "¿No tienes una cuenta? <a href='register.html'>Regístrate</a>"
    },
    en: { 
        startBtn: "Start Game", 
        warning: "⚠️ Game for ages 18+. Play responsibly.", 
        flag: "🇺🇸 English",
        loginTitle: "Login",
        emailPlaceholder: "Email Address",
        passwordPlaceholder: "Password",
        loginButton: "Enter",
        registerText: "Don't have an account? <a href='register.html'>Sign Up</a>"
    },
    pt: { 
        startBtn: "Iniciar Jogo", 
        warning: "⚠️ Jogo para maiores de 18 anos. Jogue com responsabilidade.", 
        flag: "🇧🇷 Português",
        loginTitle: "Entrar",
        emailPlaceholder: "Endereço de e-mail",
        passwordPlaceholder: "Senha",
        loginButton: "Entrar",
        registerText: "Não tem uma conta? <a href='register.html'>Cadastre-se</a>"
    }
};

// --- FUNCIÓN PARA APLICAR TRADUCCIONES ---
function applyTranslations(lang) {
    if (!translations[lang]) lang = 'es';
    localStorage.setItem('userLanguage', lang);
    
    const t = translations[lang];
    // Elementos de index.html
    const startButton = document.getElementById('start-button');
    const warningText = document.getElementById('warning-text');
    // Elementos de login.html
    const loginTitleEl = document.getElementById('login-title');
    const emailInputEl = document.querySelector('input[name="email"]');
    const passwordInputEl = document.getElementById('password-field');
    const loginButtonEl = document.getElementById('login-button');
    const registerTextEl = document.getElementById('register-text');
    // Elemento común
    const languageButton = document.getElementById('language-button');
    
    if (startButton) startButton.textContent = t.startBtn;
    if (warningText) warningText.textContent = t.warning;
    if (loginTitleEl) loginTitleEl.textContent = t.loginTitle;
    if (emailInputEl) emailInputEl.placeholder = t.emailPlaceholder;
    if (passwordInputEl) passwordInputEl.placeholder = t.passwordPlaceholder;
    if (loginButtonEl) loginButtonEl.textContent = t.loginButton;
    if (registerTextEl) registerTextEl.innerHTML = t.registerText;
    if (languageButton) languageButton.textContent = t.flag;
}

// --- LÓGICA PRINCIPAL ---
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Lógica Común: Idioma ---
    const languageButton = document.getElementById('language-button');
    const languageMenu = document.getElementById('language-menu');
    const savedLang = localStorage.getItem('userLanguage') || 'es';
    applyTranslations(savedLang);

    if (languageButton) {
        languageButton.addEventListener('click', () => languageMenu.classList.toggle('hidden'));
    }
    if (languageMenu) {
        languageMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                const lang = e.target.dataset.lang;
                applyTranslations(lang);
                languageMenu.classList.add('hidden');
            }
        });
    }

    // --- Lógica Específica para INDEX.HTML ---
    const startButton = document.getElementById('start-button');
    if (startButton) {
        const loaderScreen = document.getElementById('loader-screen');
        const backgroundMusic = document.getElementById('background-music');

        startButton.addEventListener('click', () => {
            if (backgroundMusic) {
                backgroundMusic.volume = 0.2;
                backgroundMusic.play().catch(e => {});
            }
            if (loaderScreen) loaderScreen.classList.remove('hidden');
            
            const loaderBar = document.getElementById('loader-bar');
            const loaderPercentage = document.getElementById('loader-percentage');
            let progress = 0;
            const interval = setInterval(() => {
                progress++;
                if (progress > 100) progress = 100;
                if (loaderBar) loaderBar.style.width = progress + '%';
                if (loaderPercentage) loaderPercentage.textContent = progress + '%';
                if (progress === 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 500);
                }
            }, 50);
        });
    }

    // --- Lógica Específica para LOGIN.HTML ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        const togglePassword = document.querySelector('.toggle-password');
        if (togglePassword) {
            togglePassword.addEventListener('click', function() {
                const passwordField = document.getElementById('password-field');
                const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordField.setAttribute('type', type);
                this.textContent = type === 'password' ? '👁️' : '🙈';
            });
        }
        
        // Aquí conectaremos Firebase en el futuro
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('¡Funcionalidad de Login se conectará aquí!');
        });
    }
});
