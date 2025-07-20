const startBtn = document.getElementById("startBtn");
const musicBtn = document.getElementById("musicBtn");
const notifyBtn = document.getElementById("notifyBtn");
const barra = document.querySelector(".barra");
const progreso = document.getElementById("progreso");
const mensaje = document.getElementById("mensaje");
const musica = document.getElementById("musica");

let musicaActiva = false;

musicBtn.addEventListener("click", () => {
  if (musicaActiva) {
    musica.pause();
  } else {
    musica.play();
  }
  musicaActiva = !musicaActiva;
});

notifyBtn.addEventListener("click", () => {
  Notification.requestPermission().then(permiso => {
    if (permiso === "granted") {
      new Notification("🔔 Te avisaremos cuando el juego empiece.");
    }
  });
});

startBtn.addEventListener("click", () => {
  barra.style.display = "block";
  mensaje.textContent = "Cargando juego...";
  let progresoActual = 0;
  const carga = setInterval(() => {
    progresoActual += 1;
    progreso.style.width = progresoActual + "%";
    if (progresoActual >= 100) {
      clearInterval(carga);
      mensaje.textContent = "¡Juego listo! 🎉";
    }
  }, 30);

  // Efecto visual opcional
  startBtn.style.boxShadow = "0 0 15px #ffd700";
  setTimeout(() => startBtn.style.boxShadow = "none", 2000);
});
