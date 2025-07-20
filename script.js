document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const bar = document.getElementById("loader-bar");
  const main = document.getElementById("main");
  const music = document.getElementById("intro-music");
  const musicBtn = document.getElementById("music-btn");
  const notifBtn = document.getElementById("notif-btn");
  const startBtn = document.getElementById("start-btn");

  // Simulación de carga
  let progress = 0;
  const interval = setInterval(() => {
    progress += 2;
    bar.style.width = `${progress}%`;
    if (progress >= 100) {
      clearInterval(interval);
      loader.style.display = "none";
      main.classList.remove("hidden");
    }
  }, 60);

  // Botón de música independiente
  let musicPlaying = false;
  musicBtn.addEventListener("click", () => {
    if (musicPlaying) {
      music.pause();
    } else {
      music.play();
    }
    musicPlaying = !musicPlaying;
    musicBtn.textContent = musicPlaying ? "🔈" : "🔊";
  });

  // Notificaciones (solo muestra alerta)
  notifBtn.addEventListener("click", () => {
    alert("Recibirás notificaciones del juego.");
  });

  // Botón de inicio (solo efectos visuales)
  startBtn.addEventListener("click", () => {
    startBtn.style.boxShadow = "0 0 15px #fff200";
    startBtn.style.borderColor = "#fff200";
    startBtn.style.color = "#fff200";
  });
});
