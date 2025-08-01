// =================================================================
// BINGO VIP BOLIVIA - CÓDIGO MAESTRO DE LÓGICA
// =================================================================

// --- DICCIONARIO DE TRADUCCIONES ---
const translations = {
    es: { 
        startBtn: "Iniciar Juego", 
        warning: "⚠️ Al continuar, confirmas ser mayor de 18 años y aceptas nuestros Términos y Condiciones.", 
        flag: "🇧🇴 Español" 
    },
    en: { 
        startBtn: "Start Game", 
        warning: "⚠️ By continuing, you confirm you are over 18 and accept our Terms & Conditions.", 
        flag: "🇺🇸 English" 
    },
    pt: { 
        startBtn: "Iniciar Jogo", 
        warning: "⚠️ Ao continuar, você confirma que tem mais de 18 anos e aceita nossos Termos e Condições.", 
        flag: "🇧🇷 Português" 
    }
};

// --- FUNCIÓN PARA APLICAR TRADUCCIONES ---
function applyTranslations(lang) {
    if (!translations[lang]) lang = 'es';
    localStorage.setItem('userLanguage', lang);
    
    const t = translations[lang];
    const startButton = document.getElementById('start-button');
    const warningText = document.getElementById('warning-text');
    const languageButton = document.getElementById('language-button');
    
    if (startButton) startButton.textContent = t.startBtn;
    if (warningText) warningText.textContent = t.warning;
    if (languageButton) languageButton.textContent = t.flag;
}

// --- LÓGICA PRINCIPAL (SE EJECUTA CUANDO LA PÁGINA CARGA) ---
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Lógica Común: Idioma ---
    const languageButton = document.getElementById('language-button');
    const languageMenu = document.getElementById('language-menu');
    const savedLang = localStorage.getItem('userLanguage') || 'es';
    applyTranslations(savedLang);

    if (languageButton) {
        languageButton.addEventListener('click', () => {
            if (languageMenu) languageMenu.classList.toggle('hidden');
        });
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
        const mainContent = document.getElementById('main-content');
        const loaderScreen = document.getElementById('loader-screen');
        const backgroundMusic = document.getElementById('background-music');

        startButton.addEventListener('click', () => {
            if (backgroundMusic) {
                backgroundMusic.volume = 0.2;
                backgroundMusic.play().catch(e => {});
            }
            if (mainContent) mainContent.style.opacity = '0';
            if (loaderScreen) loaderScreen.classList.remove('hidden');
            
            setTimeout(() => {
                if (mainContent) mainContent.style.display = 'none';
            }, 1200);

            const loaderBar = document.getElementById('loader-bar');
            const loaderPercentage = document.getElementById('loader-percentage');
            let progress = 0;
            const loadTime = 7000; // 7 segundos de carga
            const interval = setInterval(() => {
                progress++;
                if (progress > 100) progress = 100;
                if (loaderBar) loaderBar.style.width = progress + '%';
                if (loaderPercentage) loaderPercentage.textContent = progress + '%';
                if (progress === 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        // Por ahora, solo una alerta para confirmar que funciona
                        alert("¡Base perfecta! Próximo paso: conectar el login.");
                        // window.location.href = 'login.html'; 
                    }, 500);
                }
            }, loadTime / 100);
        });
    }
});
