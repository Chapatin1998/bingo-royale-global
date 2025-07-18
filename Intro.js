document.addEventListener("DOMContentLoaded", function () {
  const continueButton = document.getElementById("continueBtn");
  const progressBar = document.getElementById("progress-bar");
  const music = new Audio("intro-music.mp3");

  continueButton.addEventListener("click", () => {
    // Ocultar botón después de hacer clic
    continueButton.style.display = "none";

    // Iniciar música
    music.play();

    // Simular barra de carga
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      progressBar.style.width = progress + "%";
      if (progress >= 100) {
        clearInterval(interval);
        window.location.href = "home.html";
      }
    }, 30);
  });
});
