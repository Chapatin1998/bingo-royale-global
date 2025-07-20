const btnJugar = document.getElementById("btn-jugar");
const btnMusica = document.getElementById("btn-musica");
const btnNotificaciones = document.getElementById("btn-notificaciones");
const barra = document.getElementById("barra-carga");
const contenedorBarra = document.getElementById("barra-container");
const musica = document.getElementById("musica-fondo");

let musicaEncendida = false;

// Botón de música independiente
btnMusica.addEventListener("click", () => {
  if (musica.paused) {
    musica.play();
    musicaEncendida = true;
    btnMusica.textContent = "🔊";
  } else {
    musica.pause();
    musicaEncendida = false;
    btnMusica.textContent = "🎵";
  }
});

// Botón jugar con barra de carga
btnJugar.addEventListener("click", () => {
  contenedorBarra.style.display = "block";
  barra.style.width = "0%";

  let progreso = 0;
  const intervalo = setInterval(() => {
    if (progreso >= 100) {
      clearInterval(intervalo);
      alert("¡Bienvenido al juego!");
      // Aquí podrías redirigir: window.location.href = "menu.html";
    } else {
      progreso++;
      barra.style.width = progreso + "%";
    }
  }, 20);
});

// Botón notificaciones (placeholder)
btnNotificaciones.addEventListener("click", () => {
  alert("Activarás notificaciones del juego cuando estén disponibles.");
});
