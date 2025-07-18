document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("introMusic");
  const continueBtn = document.getElementById("continueBtn");
  const soundBtn = document.getElementById("soundBtn");

  let isPlaying = false;

  function playMusic() {
    music.volume = 0.5;
    music.play().then(() => {
      isPlaying = true;
    }).catch(err => {
      console.warn("Autoplay bloqueado hasta que el usuario interactúe");
    });
  }

  soundBtn.addEventListener("click", () => {
    if (isPlaying) {
      music.pause();
      isPlaying = false;
      soundBtn.textContent = "🔇";
    } else {
      playMusic();
      soundBtn.textContent = "🔊";
    }
  });

  continueBtn.addEventListener("click", () => {
    playMusic();
    window.location.href = "juego.html"; // o lo que quieras cargar
  });

  // Intentar reproducir cuando el usuario toca
  document.body.addEventListener("click", () => {
    if (!isPlaying) {
      playMusic();
    }
  }, { once: true });
});
