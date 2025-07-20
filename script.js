const music = document.getElementById("introMusic");
const musicBtn = document.getElementById("musicBtn");
const progressBar = document.getElementById("progress-bar");
let isMusicMuted = true;

// Música: control independiente
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

// Notificaciones (simulado)
document.getElementById("notifyBtn").addEventListener("click", () => {
  alert("🔔 Notificaciones activadas para Bingo VIP Bolivia");
});

// Barra de progreso automática al cargar
window.addEventListener("load", () => {
  setTimeout(() => {
    progressBar.style.width = "100%";
  }, 300);
});
