const startBtn = document.getElementById('startBtn');
const musicBtn = document.getElementById('musicBtn');
const notifBtn = document.getElementById('notifBtn');
const music = document.getElementById('bgMusic');
const progresoBar = document.getElementById('progresoBar');
const porcentaje = document.getElementById('porcentaje');
const logo = document.querySelector('.logo');

let musicOn = false;
let cargando = false;

// 🎮 Botón Iniciar
startBtn.addEventListener('click', () => {
  if (!cargando) {
    // Barra de carga con efecto
    let progreso = 0;
    cargando = true;
    logo.style.filter = "drop-shadow(0 0 10px #FFD700)";
    progresoBar.style.boxShadow = "0 0 15px #FFD700";

    const intervalo = setInterval(() => {
      if (progreso >= 100) {
        clearInterval(intervalo);
        cargando = false;
      } else {
        progreso++;
        progresoBar.style.width = `${progreso}%`;
        porcentaje.innerText = `${progreso}%`;
      }
    }, 50);

    // Música encendida si no estaba
    if (!musicOn) {
      music.play();
      musicOn = true;
    }
  }
});

// 🎵 Botón Música
musicBtn.addEventListener('click', () => {
  if (music.paused) {
    music.play();
    musicOn = true;
  } else {
    music.pause();
    musicOn = false;
  }
});

// 🔔 Botón Notificaciones
notifBtn.addEventListener('click', () => {
  alert("🔔 Recibirás notificaciones cuando el juego esté listo.");
});
