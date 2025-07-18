document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startButton");
  const clickSound = document.getElementById("clickSound");
  const introMusic = document.getElementById("introMusic");

  // Iniciar música automáticamente (si el navegador lo permite)
  introMusic.volume = 0.5;
  introMusic.play().catch(() => {
    console.warn("Esperando interacción del usuario para iniciar la música.");
  });

  startButton.addEventListener("click", () => {
    clickSound.play();
    introMusic.pause();
    window.location.href = "home.html"; // Puedes cambiar esto por otra pantalla
  });
});
