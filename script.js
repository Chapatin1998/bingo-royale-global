const audio = document.getElementById("introMusic");
const toggleMusic = document.getElementById("toggleMusic");

let musicaActiva = false;

// Botón música: independiente del botón INICIAR
toggleMusic.addEventListener("click", () => {
  if (musicaActiva) {
    audio.pause();
    toggleMusic.textContent = "🔇 Música";
  } else {
    audio.play();
    toggleMusic.textContent = "🔊 Música";
  }
  musicaActiva = !musicaActiva;
});

// Botón INICIAR (efecto visual de carga, pero no toca la música)
document.getElementById("startButton").addEventListener("click", () => {
  document.getElementById("barraRelleno").style.animation = "brillar 3s infinite linear";
  alert("¡Bienvenido a Bingo VIP Bolivia!");
});
