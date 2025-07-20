const startBtn = document.getElementById("startBtn");
const musicToggle = document.getElementById("musicToggle");
const notifyBtn = document.getElementById("notifyBtn");
const music = document.getElementById("backgroundMusic");

let isMusicPlaying = false;

// Cargar con barra
let progress = 0;
const fill = document.querySelector(".progress-fill");
const loader = document.getElementById("loader");
const main = document.getElementById("main");

const loading = setInterval(() => {
  if (progress >= 100) {
    clearInterval(loading);
    loader.style.display = "none";
    main.classList.remove("hidden");
  } else {
    progress += 1;
    fill.style.width = progress + "%";
  }
}, 30);

// Botón de música
musicToggle.addEventListener("click", () => {
  if (isMusicPlaying) {
    music.pause();
    isMusicPlaying = false;
    musicToggle.textContent = "🔊";
  } else {
    music.play();
    isMusicPlaying = true;
    musicToggle.textContent = "🔈";
  }
});

// Botón de notificación
notifyBtn.addEventListener("click", () => {
  alert("Recibirás notificaciones del juego cuando estén disponibles.");
});

// Botón iniciar (efectos visuales)
startBtn.addEventListener("click", () => {
  startBtn.style.boxShadow = "0 0 30px #00ffcc";
  document.body.style.backgroundColor = "#000000";
  alert("Juego iniciado 🎲 (interfaz en desarrollo)");
});
