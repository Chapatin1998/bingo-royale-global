const continueBtn = document.getElementById("continue-btn");
const loaderContainer = document.getElementById("loader-container");
const progressBar = document.getElementById("progress-bar");
const welcomeMessage = document.getElementById("welcome-message");
const clickSound = document.getElementById("click-sound");

continueBtn.addEventListener("click", () => {
  clickSound.play();
  continueBtn.disabled = true;
  let width = 0;

  const interval = setInterval(() => {
    width += 1;
    progressBar.style.width = width + "%";

    if (width >= 100) {
      clearInterval(interval);
      loaderContainer.style.display = "none";
      welcomeMessage.style.display = "block";

      setTimeout(() => {
        window.location.href = "home.html";
      }, 2000);
    }
  }, 30);
});

// Para mejorar la respuesta táctil en móviles
continueBtn.addEventListener("touchstart", () => {
  clickSound.play();
});
