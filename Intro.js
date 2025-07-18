document.addEventListener('DOMContentLoaded', function () {
  const continueButton = document.getElementById('continue-btn');
  const audio = new Audio('intro-music.mp3');
  audio.loop = true;

  continueButton.addEventListener('click', function () {
    // Inicia la música cuando el usuario hace clic
    audio.play().catch((error) => {
      console.error("Error al reproducir la música:", error);
    });

    // Oculta la pantalla de bienvenida y muestra el contenido principal
    document.getElementById('intro').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
  });
});
