const btnIniciar = document.getElementById('btnIniciar');
const pantallaInicio = document.querySelector('.pantalla-inicio');
const pantallaTransicion = document.getElementById('pantallaTransicion');

btnIniciar.addEventListener('click', () => {
  pantallaInicio.style.display = 'none';
  pantallaTransicion.style.display = 'flex';

  setTimeout(() => {
    window.location.href = "main.html"; // Cambia esto al archivo real del juego
  }, 3000);
});
