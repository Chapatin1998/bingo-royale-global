document.getElementById("continueBtn").addEventListener("click", function () {
  const music = document.getElementById("introMusic");
  music.play();
document.addEventListener('DOMContentLoaded', function () {
  const continueButton = document.getElementById('continue-btn');
  const toggleSoundButton = document.getElementById('toggle-sound-btn');
  const audio = new Audio('intro-music.mp3');
  audio.loop = true;
  let isPlaying = false;

  continueButton.addEventListener('click', function () {
    audio.play().then(() => {
      isPlaying = true;
      toggleSoundButton.style.display = 'inline-block';
    }).catch((error) => {
      console.error("Error al reproducir la música:", error);
    });

    document.getElementById('intro').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
  });

  toggleSoundButton.addEventListener('click', function () {
    if (isPlaying) {
      audio.pause();
      isPlaying = false;
      toggleSoundButton.textContent = '🔈 Encender Música';
    } else {
      audio.play().then(() => {
        isPlaying = true;
        toggleSoundButton.textContent = '🔇 Apagar Música';
      });
    }
  });
});
  let progress = 0;
  const progressBar = document.getElementById("progress");
  const interval = setInterval(() => {
    if (progress < 100) {
      progress += 1;
      progressBar.style.width = progress + "%";
    } else {
      clearInterval(interval);
      // Redirigir o hacer otra acción después de la carga si deseas
    }
  }, 50); // Duración total: 5 segundos
});
