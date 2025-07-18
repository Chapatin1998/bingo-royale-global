document.addEventListener('DOMContentLoaded', () => {
  const audio = new Audio('intro-music.mp3');
  audio.loop = true;
  audio.volume = 0.6;

  const soundToggle = document.getElementById('soundToggle');
  const continueButton = document.getElementById('continueButton');

  let isMuted = false;

  soundToggle.addEventListener('click', () => {
    if (isMuted) {
      audio.play();
      soundToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
      audio.pause();
      soundToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
    isMuted = !isMuted;
  });

  continueButton.addEventListener('click', () => {
    audio.play();
    window.location.href = 'home.html'; // Asegúrate que home.html exista
  });

  // Autoplay workaround para móviles (primer toque)
  document.body.addEventListener('click', () => {
    if (!audio.played.length) {
      audio.play().catch(() => {});
    }
  }, { once: true });
});
