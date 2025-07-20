const musicBtn = document.getElementById("musicBtn");
const notifBtn = document.getElementById("notifBtn");
const startBtn = document.getElementById("startBtn");
const music = document.getElementById("bgMusic");
const progressBar = document.getElementById("progressBar");

let isPlaying = false;

musicBtn.addEventListener("click", () => {
  isPlaying ? music.pause() : music.play();
  isPlaying = !isPlaying;
});

notifBtn.addEventListener("click", () => {
  music.pause();
  isPlaying = false;
  alert("🔕 Notificaciones silenciadas");
});

startBtn.addEventListener("click", () => {
  music.play();
  isPlaying = true;
  startProgressBar();
});

function startProgressBar() {
  let progress = 0;
  const interval = setInterval(() => {
    progress += 1;
    progressBar.style.width = `${progress}%`;
    progressBar.innerText = `${progress}%`;

    if (progress >= 100) clearInterval(interval);
  }, 50);
}
