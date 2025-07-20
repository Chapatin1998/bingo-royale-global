const inicioBtn = document.getElementById("inicioBtn");
const barraCarga = document.getElementById("barra-carga");
const barraCargaContainer = document.getElementById("barra-carga-container");
const musicaBtn = document.getElementById("musicaBtn");
const notificacionesBtn = document.getElementById("notificacionesBtn");
const introAudio = document.getElementById("introAudio");

let musicaActiva = true;

inicioBtn.addEventListener("click", () => {
  barraCargaContainer.style.display = "block";
  barraCarga.style.width = "0%";
  let progreso = 0;

  const cargaInterval = setInterval(() => {
    progreso += 10;
    barraCarga.style.width = `${progreso}%`;

    if (progreso >= 100) {
      clearInterval(cargaInterval);
      // Aquí podrías redirigir o hacer otra acción
    }
  }, 300);
});

musicaBtn.addEventListener("click", () => {
  if (musicaActiva) {
    introAudio.pause();
    musicaBtn.textContent = "🔈 Música";
  } else {
    introAudio.play();
    musicaBtn.textContent = "🔊 Música";
  }
  musicaActiva = !musicaActiva;
});

notificacionesBtn.addEventListener("click", () => {
  alert("Notificaciones activadas (simulado)");
});
