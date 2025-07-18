document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startButton");
  const clickSound = document.getElementById("clickSound");
  const introMusic = document.getElementById("introMusic");

  // Reproducir música automáticamente si el navegador lo permite
  function tryPlayMusic() {
    const playPromise = introMusic.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log("Música de introducción reproduciéndose.");
        })
        .catch((error) => {
          console.warn("Reproducción automática bloqueada. Esperando interacción.");
        });
    }
  }

  // Al presionar el botón
  startButton.addEventListener("click", () => {
    clickSound.play();
    introMusic.play();
    window.location.href = "juego.html"; // Redirige al juego
  });

  tryPlayMusic(); // Intentar reproducir al cargar
});
