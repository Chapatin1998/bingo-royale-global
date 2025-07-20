let musica = document.getElementById("musicaFondo");
let barra = document.getElementById("barraCarga");
let barraContainer = document.getElementById("barraContainer");

function toggleMusica() {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
}

function recibirNotificacion() {
  alert("¡Activaste notificaciones del juego!");
}

function iniciarJuego() {
  barraContainer.style.display = "block";
  let progreso = 0;
  barra.style.width = "0%";

  let cargar = setInterval(() => {
    if (progreso >= 100) {
      clearInterval(cargar);
      alert("¡Juego listo para comenzar!");
    } else {
      progreso += 1;
      barra.style.width = progreso + "%";
    }
  }, 40);
}
