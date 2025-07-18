// Intro.js
function showIntro() {
  const introContainer = document.getElementById("intro");
  const mainContent = document.getElementById("main-content");
  const audio = new Audio("intro-music.mp3"); // Asegúrate que el archivo esté en raíz o carpeta pública

  // Mostrar intro
  introContainer.style.display = "flex";
  mainContent.style.display = "none";

  // Al hacer clic en continuar, ocultar intro y mostrar contenido principal
  document.getElementById("continue-button").addEventListener("click", () => {
    introContainer.style.display = "none";
    mainContent.style.display = "block";
    audio.play(); // Reproduce la música al hacer clic
  });
}

document.addEventListener("DOMContentLoaded", showIntro);
