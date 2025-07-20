let music = document.getElementById("introMusic");
let musicBtn = document.getElementById("musicBtn");
let startBtn = document.getElementById("startBtn");
let loader = document.getElementById("loader");
let loadingText = document.getElementById("loading-text");
let rayBar = document.querySelector(".ray-bar");

let progress = 0;
let loadingInterval = setInterval(() => {
  progress += Math.floor(Math.random() * 5) + 2;
  if (progress > 100) progress = 100;
  loadingText.innerText = `Cargando... ${progress}%`;
  rayBar.style.width = `${progress}%`;

  if (progress >= 100) {
    clearInterval(loadingInterval);
    setTimeout(() => {
      loader.style.display = "none";
      document.getElementById("main-content").style.display = "flex";
    }, 500);
  }
}, 100);

// Botón de música
let isPlaying = false;
musicBtn.addEventListener("click", () => {
  if (isPlaying) {
    music.pause();
    musicBtn.innerText = "🔇 Música";
  } else {
    music.play();
    musicBtn.innerText = "🔊 Música";
  }
  isPlaying = !isPlaying;
});

// Botón de iniciar juego
startBtn.addEventListener("click", () => {
  startBtn.innerText = "🎮 ¡Cargando Juego!";
  startBtn.disabled = true;
  startBtn.style.backgroundColor = "#aaa";
  // Aquí puedes enlazar con la siguiente pantalla o juego
});

// Botón de notificaciones
document.getElementById("notifyBtn").addEventListener("click", () => {
  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      new Notification("✅ Notificaciones activadas para Bingo VIP Bolivia");
    }
  });
});
