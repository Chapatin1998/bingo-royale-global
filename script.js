const loader = document.getElementById("loader");
const loadingText = document.getElementById("loading-text");
const music = document.getElementById("intro-music");
const startBtn = document.getElementById("start-btn");
const musicBtn = document.getElementById("music-btn");
const notifyBtn = document.getElementById("notify-btn");

let progress = 0;
let isPlaying = false;

const loadingInterval = setInterval(() => {
  progress += 2;
  loadingText.innerText = `Cargando... ${progress}%`;

  if (progress >= 100) {
    clearInterval(loadingInterval);
    setTimeout(() => {
      loader.style.display = "none";
      document.getElementById("main-content").style.display = "flex";
      music.play();
      isPlaying = true;
      musicBtn.innerText = "🔊 Música";
    }, 500);
  }
}, 100);

musicBtn.addEventListener("click", () => {
  if (isPlaying) {
    music.pause();
    isPlaying = false;
    musicBtn.innerText = "🔇 Música";
  } else {
    music.play();
    isPlaying = true;
    musicBtn.innerText = "🔊 Música";
  }
});

notifyBtn.addEventListener("click", () => {
  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      new Notification("🔔 Bingo VIP Bolivia activó tus notificaciones.");
    }
  });
});

startBtn.addEventListener("click", () => {
  alert("¡Juego iniciado! (aquí iría la siguiente pantalla)");
});
