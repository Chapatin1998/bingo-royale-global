const music = document.getElementById("backgroundMusic");
const toggleMusicBtn = document.getElementById("toggleMusicBtn");
const startBtn = document.getElementById("startBtn");
const progressBar = document.getElementById("progressBar");
const notifyBtn = document.getElementById("notifyBtn");

let musicPlaying = true;

toggleMusicBtn.addEventListener("click", () => {
  if (musicPlaying) {
    music.pause();
    toggleMusicBtn.textContent = "🔈 Música";
  } else {
    music.play();
    toggleMusicBtn.textContent = "🔇 Música";
  }
  musicPlaying = !musicPlaying;
});

startBtn.addEventListener("click", () => {
  progressBar.style.width = "100%";

  startBtn.textContent = "Cargando...";
  startBtn.disabled = true;

  // Simular carga antes de ir a otra pantalla
  setTimeout(() => {
    startBtn.textContent = "INICIAR";
    startBtn.disabled = false;
    progressBar.style.width = "0%";
    alert("¡Listo para comenzar el juego!");
  }, 3000);
});

// Botón de notificaciones visual
let notifyActive = true;
notifyBtn.addEventListener("click", () => {
  notifyActive = !notifyActive;
  notifyBtn.textContent = notifyActive ? "🔔 Notificaciones" : "🔕 Notificaciones";
});
