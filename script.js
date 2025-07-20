const btnIniciar = document.getElementById('btnIniciar');
const btnMusica = document.getElementById('btnMusica');
const btnNotificaciones = document.getElementById('btnNotificaciones');
const musica = document.getElementById('musica');
const barra = document.getElementById('barraCarga');
const progreso = document.getElementById('progresoBarra');

let musicaActiva = false;

btnMusica.addEventListener('click', () => {
  if (!musicaActiva) {
    musica.play();
    btnMusica.textContent = '🔇';
    musicaActiva = true;
  } else {
    musica.pause();
    btnMusica.textContent = '🔊';
    musicaActiva = false;
  }
});

btnNotificaciones.addEventListener('click', async () => {
  if ("Notification" in window) {
    const permiso = await Notification.requestPermission();
    if (permiso === "granted") {
      new Notification("🔔 Notificaciones activadas para Bingo VIP Bolivia");
    }
  }
});

btnIniciar.addEventListener('click', () => {
  barra.style.display = 'block';
  let porcentaje = 0;

  const cargar = setInterval(() => {
    porcentaje += 5;
    progreso.style.width = porcentaje + "%";

    if (porcentaje >= 100) {
      clearInterval(cargar);
    }
  }, 100);
});
