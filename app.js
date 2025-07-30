// DICCIONARIO DE TRADUCCIONES
const translations = {
    es: { 
        startBtn: "Iniciar", 
        warning: "⚠️ Juego para mayores de 18 años. Juega con responsabilidad. Una sola cuenta por persona.", 
        flag: "🇧🇴 Español" 
    },
    en: { 
        startBtn: "Start", 
        warning: "⚠️ Game for ages 18+. Play responsibly. One account per person.", 
        flag: "🇺🇸 English" 
    },
    pt: { 
        startBtn: "Iniciar", 
        warning: "⚠️ Jogo para maiores de 18 anos. Jogue com responsabilidade. Uma conta por pessoa.", 
        flag: "🇧🇷 Português" 
    }
};

// FUNCIÓN PARA APLICAR TRADUCCIONES
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

// LÓGICA PRINCIPAL DE LA PÁGINA
document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const loaderScreen = document.getElementById('loader-screen');
    const startButton = document.getElementById('start-button');
    const backgroundMusic = document.getElementById('background-music');
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

    if (startButton) {
        startButton.addEventListener('click', () => {
            if (backgroundMusic) {
                backgroundMusic.volume = 0.3;
                backgroundMusic.play().catch(e => {});
            }

            startScreen.style.opacity = '0';
            loaderScreen.classList.remove('hidden');
            
            setTimeout(() => {
                startScreen.style.display = 'none';
            }, 1200);

            const loaderBar = document.getElementById('loader-bar');
            const loaderPercentage = document.getElementById('loader-percentage');
            let progress = 0;
            const loadTime = 7000; 
            const interval = setInterval(() => {
                progress++;
                if (progress > 100) progress = 100;
                
                if(loaderBar) loaderBar.style.width = progress + '%';
                if(loaderPercentage) loaderPercentage.textContent = progress + '%';
                
                if (progress === 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        alert("¡Base reconstruida! Próximo paso: login.");
                        // window.location.href = 'login.html'; 
                    }, 1000);
                }
            }, loadTime / 100);
        });
    }
});
