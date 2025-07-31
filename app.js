// DICCIONARIO DE TRADUCCIONES
const translations = {
    es: { startBtn: "Iniciar", warning: "Al continuar, confirmas que tienes más de 18 años y aceptas nuestros Términos y Condiciones.", flag: "🇧🇴 Español" },
    en: { startBtn: "Start", warning: "By continuing, you confirm you are over 18 and accept our Terms and Conditions.", flag: "🇺🇸 English" },
    pt: { startBtn: "Iniciar", warning: "Ao continuar, você confirma que tem mais de 18 anos e aceita nossos Termos e Condições.", flag: "🇧🇷 Português" }
};

// FUNCIÓN PARA APLICAR TRADUCCIONES
function applyTranslations(lang) {
    if (!translations[lang]) lang = 'es';
    localStorage.setItem('userLanguage', lang);
    const t = translations[lang];
    document.getElementById('start-button').textContent = t.startBtn;
    document.getElementById('warning-text').textContent = t.warning;
    document.getElementById('language-button').textContent = t.flag;
}

// LÓGICA PRINCIPAL
document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const loaderScreen = document.getElementById('loader-screen');
    const startButton = document.getElementById('start-button');
    const backgroundMusic = document.getElementById('background-music');
    const languageButton = document.getElementById('language-button');
    const languageMenu = document.getElementById('language-menu');
    
    const savedLang = localStorage.getItem('userLanguage') || 'es';
    applyTranslations(savedLang);

    languageButton.addEventListener('click', () => languageMenu.classList.toggle('hidden'));
    languageMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            applyTranslations(e.target.dataset.lang);
            languageMenu.classList.add('hidden');
        }
    });

    startButton.addEventListener('click', () => {
        if (backgroundMusic) {
            backgroundMusic.volume = 0.2;
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
        const loadTime = 6000; // 6 segundos de carga
        const interval = setInterval(() => {
            progress++;
            if(progress > 100) progress = 100;
            if(loaderBar) loaderBar.style.width = progress + '%';
            if(loaderPercentage) loaderPercentage.textContent = progress + '%';
            if (progress === 100) {
                clearInterval(interval);
                setTimeout(() => {
                    alert("¡Base perfecta y funcional! Ahora sí, al login.");
                    // window.location.href = 'login.html'; 
                }, 500);
            }
        }, loadTime / 100);
    });
});
