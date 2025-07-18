document.addEventListener("DOMContentLoaded", function () {
  const continueButton = document.getElementById("continueBtn");
  const toggleSoundButton = document.getElementById("toggle-sound-btn");
  const progressBar = document.getElementById("progress");
  const introSection = document.getElementById("intro");
  const mainContent = document.getElementById("main-content");

  let audio = new Audio("intro-music.mp3");
  let isPlaying = false;

  // Cuando se hace clic en "Continuar"
  continueButton.addEventListener("click", function () {
    audio
      .play()
      .then(() => {
        isPlaying = true;
        toggleSoundButton.style.display = "inline-block"; // Mostrar botón de sonido
        toggleSoundButton.textContent = "🔇 Apagar Música";

        introSection.style.display = "none";
        mainContent.style.display = "block";

        // Iniciar la animación de progreso
        let progress = 0;
        const interval = setInterval(() => {
          if (progress < 100) {
            progress++;
            progressBar.style.width = progress + "%";
          } else {
            clearInterval(interval);
            // Aquí puedes redirigir o hacer otra acción
          }
        }, 50); // 5 segundos total
      })
      .catch((error) => {
        console.error("Error al reproducir la música:", error);
      });
  });

  // Botón para encender o apagar la música
  toggleSoundButton.addEventListener("click", function () {
    if (isPlaying) {
      audio.pause();
      isPlaying = false;
      toggleSoundButton.textContent = "🎵 Encender Música";
    } else {
      audio
        .play()
        .then(() => {
          isPlaying = true;
          toggleSoundButton.textContent = "🔇 Apagar Música";
        })
        .catch((error) => {
          console.error("Error al intentar reproducir la música:", error);
        });
    }
  });
});
