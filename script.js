const music = document.getElementById("introMusic");
const musicBtn = document.getElementById("musicBtn");
const startBtn = document.getElementById("startBtn");
const progressBar = document.getElementById("progress-bar");
let isMusicMuted = true;

// Control independiente de música
musicBtn.addEventListener("click", () => {
  if (isMusicMuted) {
    music.play();
    isMusicMuted = false;
    musicBtn.textContent = "🎵 Música";
  } else {
    music.pause();
    isMusicMuted = true;
    musicBtn.textContent = "🔇 Música";
  }
});

// Simular activación desde el botón de INICIAR
startBtn.addEventListener("click", () => {
  progressBar.style.width = "100%";
  progressBar.classList.add("anim");
  
  // Solo activar música si no está silenciada
  if (!isMusicMuted && music.paused) {
    music.play();
  }

  // Opcional: efecto al botón
  startBtn.style.transform = "scale(0.95)";
  setTimeout(() => startBtn.style.transform = "scale(1)", 150);
});

// Notificaciones (simulado)
document.getElementById("notifyBtn").addEventListener("click", () => {
  alert("🔔 Notificaciones activadas para Bingo VIP Bolivia");
});
