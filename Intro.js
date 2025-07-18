const continueBtn = document.getElementById('continue-btn');
const muteBtn = document.getElementById('mute-btn');
const bgMusic = document.getElementById('bg-music');
const clickSound = document.getElementById('click-sound');
const loader = document.getElementById('loader-container');
const progressBar = document.getElementById('progress-bar');
const welcomeMsg = document.getElementById('welcome-message');

let isMuted = false;

muteBtn.addEventListener('click', () => {
  isMuted = !isMuted;
  bgMusic.muted = isMuted;
  clickSound.muted = isMuted;
  muteBtn.innerHTML = `<i class="fas fa-volume-${isMuted ? 'mute' : 'up'}"></i>`;
});

continueBtn.addEventListener('touchstart', handleContinue, { passive: true });
continueBtn.addEventListener('click', handleContinue);

function handleContinue() {
  if (!isMuted) {
    bgMusic.play();
    clickSound.play();
  }

  continueBtn.style.display = 'none';
  loader.style.display = 'block';

  let progress = 0;
  const interval = setInterval(() => {
    progress += 1;
    progressBar.style.width = `${progress}%`;

    if (progress >= 100) {
      clearInterval(interval);
      loader.style.display = 'none';
      welcomeMsg.style.display = 'block';
      setTimeout(() => {
        window.location.href = 'home.html';
      }, 2000);
    }
  }, 40);
}
