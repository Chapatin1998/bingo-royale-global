const music = document.getElementById("music");
const clickSound = document.getElementById("click-sound");
const continueBtn = document.getElementById("continue-btn");
const loader = document.getElementById("loader");
const percentage = document.getElementById("percentage");
const bar = document.querySelector(".bar");

// Activar/desactivar sonido
function toggleSound() {
  if (music.paused) music.play();
  else music.pause();
}

continueBtn.addEventListener("click", () => {
  clickSound.currentTime = 0;
  clickSound.play();

  music.play();
  continueBtn.style.display = "none";
  loader.style.display = "flex";

  let progress = 0;
  const interval = setInterval(() => {
    progress += 1;
    percentage.textContent = progress + "%";
    bar.style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(interval);
      document.body.style.transition = "opacity 1s ease";
      document.body.style.opacity = 0;
      setTimeout(() => {
        window.location.href = "home.html";
      }, 1000);
    }
  }, 70); // más lento que antes
});
