const music = document.getElementById("bg-music");
const toggleBtn = document.getElementById("music-toggle");
const startBtn = document.getElementById("start-btn");
const loader = document.getElementById("loader");
const bar = document.querySelector(".bar");
const percentage = document.getElementById("percentage");

// Música ON/OFF
toggleBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    toggleBtn.textContent = "🔊";
  } else {
    music.pause();
    toggleBtn.textContent = "🔇";
  }
});

// Iniciar juego con barra de carga
startBtn.addEventListener("click", () => {
  loader.classList.remove("hidden");
  let progress = 0;
  const interval = setInterval(() => {
    if (progress >= 100) {
      clearInterval(interval);
      // Aquí puedes redirigir o iniciar el juego real
    } else {
      progress++;
      bar.style.width = progress + "%";
      percentage.textContent = progress + "%";
    }
  }, 30);
});
