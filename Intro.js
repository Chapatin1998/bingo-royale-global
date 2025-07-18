document.addEventListener("DOMContentLoaded", () => {
  const continueBtn = document.getElementById("continue-btn");
  const bgMusic = document.getElementById("bg-music");
  const clickSound = document.getElementById("click-sound");
  const welcomeScreen = document.getElementById("welcome-screen");
  const loader = document.getElementById("loader-container");
  const progressBar = document.getElementById("progress-bar");

  continueBtn.addEventListener("click", () => {
    // Sonidos
    clickSound.play();
    bgMusic.play().catch(err => {
      console.warn("Autoplay bloqueado. Usuario debe interactuar:", err);
    });

    // Oculta pantalla bienvenida, muestra loader
    welcomeScreen.classList.add("hidden");
    loader.classList.remove("hidden");

    // Simula progreso (puedes cambiar esto por tu lógica real)
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      progressBar.style.width = `${progress}%`;

      if (progress >= 100) {
        clearInterval(interval);
        // Aquí podrías cargar la siguiente parte del juego
        alert("¡Listo para jugar! 🎲");
      }
    }, 100);
  });
});
