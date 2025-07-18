function toggleMusica() {
  const musica = document.getElementById("musicaFondo");
  const icono = document.getElementById("iconoMusica");

  if (musica.paused) {
    musica.play();
    icono.textContent = "🔊";
  } else {
    musica.pause();
    icono.textContent = "🔇";
  }
}

function mostrarMensaje() {
  alert("Cargando juego…");
}
