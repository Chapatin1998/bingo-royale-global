const music = document.getElementById('introMusic');
const musicBtn = document.getElementById('musicBtn');
const startBtn = document.getElementById('startBtn');
const loader = document.getElementById('loader');
let musicPlaying = false;

musicBtn.addEventListener('click', () => {
  if (musicPlaying) {
    music.pause();
    musicPlaying = false;
    musicBtn.innerHTML = '🔊 Música';
  } else {
    music.play();
    musicPlaying = true;
    musicBtn.innerHTML = '🔇 Música';
  }
});

startBtn.addEventListener('click', () => {
  loader.classList.remove('hidden');
  setTimeout(() => {
    loader.classList.add('hidden');
    alert('¡El juego comenzará pronto!');
  }, 3000);
});

document.getElementById('notifyBtn').addEventListener('click', () => {
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      new Notification("🔔 Estás suscrito a notificaciones del juego.");
    } else {
      alert("Las notificaciones están bloqueadas.");
    }
  });
});
