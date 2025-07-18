document.addEventListener("DOMContentLoaded", () => {
  const continueBtn = document.getElementById("continue-btn");
  const loaderContainer = document.getElementById("loader-container");
  const welcomeMessage = document.getElementById("welcome-message");
  const bgMusic = document.getElementById("bg-music");
  const clickSound = document.getElementById("click-sound");
  const progressBar = document.getElementById("progress-bar");
  const muteBtn = document.getElementById("mute-btn");

  let isMuted = false;

  muteBtn.addEventListener("click", () => {
    isMuted = !isMuted;
    bgMusic.muted = isMuted;
    clickSound.muted = isMuted;
    muteBtn.textContent = isMuted ? "🔇" : "🔊";
  });

  continueBtn.addEventListener("touchstart", playIntro);
  continueBtn.addEventListener("click", playIntro);

  function playIntro() {
    clickSound.play().catch(() => {});
    bgMusic.play().catch(() => {});

    continueBtn.style.display = "none";
    loaderContainer.classList.remove("hidden");

    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      progressBar.style.width = progress + "%";

      if (progress >= 100) {
        clearInterval(interval);
        loaderContainer.classList.add("hidden");
        welcomeMessage.classList.remove("hidden");

        setTimeout(() => {
          window.location.href = "home.html";
        }, 2000);
      }
    }, 25);
  }
});
