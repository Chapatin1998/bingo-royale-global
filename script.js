// Referencias
const music = document.getElementById("background-music");
const musicButton = document.getElementById("music-button");
const startButton = document.getElementById("start-button");
const notifyButton = document.getElementById("notify-button");
const loadingScreen = document.getElementById("loading-screen");
const loadingBar = document.getElementById("loading-bar");
const loadingText = document.getElementById("loading-text");

let musicPlaying = false;

// Música ON/OFF
musicButton.addEventListener("click", () => {
  if (musicPlaying) {
    music.pause();
    musicPlaying = false;
    musicButton.textContent = "🎵";
  } else {
    music.play();
    musicPlaying = true;
    musicButton.textContent = "🔇";
  }
});

// Notificaciones
notifyButton.addEventListener("click", async () => {
  if ("Notification" in window) {
    let perm = await Notification.requestPermission();
    if (perm === "granted") {
      new Notification("¡Te avisaremos cuando empiece el próximo juego!");
    }
  } else {
    alert("Tu navegador no admite notificaciones.");
  }
});

// Botón iniciar: solo activa animaciones visuales
startButton.addEventListener("click", () => {
  // Iluminar logo y botones
  document.getElementById("logo").style.filter = "drop-shadow(0 0 24px gold)";
  startButton.style.boxShadow = "0 0 24px yellow";
  musicButton.style.boxShadow = "0 0 12px yellow";
  notifyButton.style.boxShadow = "0 0 12px yellow";
});

// Simulación de carga inicial (barra)
let percent = 0;
const fakeLoad = setInterval(() => {
  if (percent >= 100) {
    clearInterval(fakeLoad);
    loadingScreen.style.display = "none";
  } else {
    percent += 1;
    loadingBar.style.width = percent + "%";
    loadingText.textContent = "Cargando... " + percent + "%";
  }
}, 40);
