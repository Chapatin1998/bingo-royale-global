const continueBtn = document.getElementById("continue-btn");
const loaderContainer = document.getElementById("loader-container");
const progressBar = document.getElementById("progress-bar");
const welcomeMessage = document.getElementById("welcome-message");
const clickSound = document.getElementById("click-sound");
const bgMusic = document.getElementById("bg-music");
const muteBtn = document.getElementById("mute-btn");

let isMuted = false;

muteBtn.addEventListener("click", () => {
  isMuted = !isMuted;
  bgMusic.muted = isMuted;
  muteBtn.textContent = isMuted ? "🔇" : "🔊";
});

const handleContinue = () => {
  if (!isMuted) {
    clickSound.play();
    bgMusic.play();
  }

  continueBtn.disabled = true;
  loaderContainer.classList.remove("hidden");

  let width = 0;
  const interval = setInterval(() => {
    width += 1;
    progressBar.style.width = width + "%";

    if (width >= 100) {
      clearInterval(interval);
      loaderContainer.style.display = "none";
      welcomeMessage.classList.remove("hidden");

      setTimeout(() => {
        window.location.href = "home.html";
      }, 2000);
    }
  }, 30);
};

// Solo el botón dispara el sonido y carga
continueBtn.addEventListener("click", handleContinue);
continueBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  handleContinue();
});
