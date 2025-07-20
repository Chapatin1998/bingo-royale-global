const musicBtn = document.getElementById('musicBtn');
const notifyBtn = document.getElementById('notifyBtn');
const startBtn = document.getElementById('startBtn');
const audio = document.getElementById('bgMusic');
const bar = document.getElementById('bar');
const percentText = document.getElementById('percentage');
const logo = document.getElementById('logo');
const buttons = document.querySelectorAll('.controls button');
const loader = document.getElementById('loader');

let musicOn = false;

musicBtn.addEventListener('click', () => {
  if (!musicOn) {
    audio.play();
    musicOn = true;
    toggleGlow(true);
  } else {
    audio.pause();
    musicOn = false;
    toggleGlow(false);
  }
});

notifyBtn.addEventListener('click', () => {
  audio.pause();
  musicOn = false;
  toggleGlow(false);
});

function toggleGlow(active) {
  if (active) {
    logo.classList.add('glow');
    loader.classList.add('glow');
    buttons.forEach(btn => btn.classList.add('glow'));
  } else {
    logo.classList.remove('glow');
    loader.classList.remove('glow');
    buttons.forEach(btn => btn.classList.remove('glow'));
  }
}

startBtn.addEventListener('click', () => {
  let count = 0;
  const interval = setInterval(() => {
    if (count >= 100) {
      clearInterval(interval);
      percentText.textContent = "100%";
      // Simulamos redirección o continuar
      // window.location.href = "registro.html";
    } else {
      count++;
      bar.style.width = count + '%';
      percentText.textContent = count + '%';
    }
  }, 50);
});
