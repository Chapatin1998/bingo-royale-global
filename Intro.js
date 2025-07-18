const continueBtn = document.getElementById("continue-btn");
const loaderContainer = document.getElementById("loader-container");
const progressBar = document.getElementById("progress-bar");
const welcomeMessage = document.getElementById("welcome-message");
const bgMusic = document.getElementById("bg-music");
const clickSound = document.getElementById("click-sound");

function startLoading() {
  clickSound.currentTime = 0;
  clickSound.play();

  continueBtn.disabled = true;
  loaderContainer.classList.remove("hidden");
  let width = 0;

  bgMusic.play();

  const interval = setInterval(() => {
    width += 1;
    progressBar.style.width = width + "%";
    if (width >= 100) {
      clearInterval(interval);
      loaderContainer.classList.add("hidden");
      welcomeMessage.classList.remove("hidden");
      setTimeout(() => window.location.href = "home.html", 2000);
    }
  }, 50);
}

continueBtn.addEventListener("click", startLoading);
continueBtn.addEventListener("touchstart", startLoading);
