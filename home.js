// Música de fondo
const music = new Audio('audio/casino-theme.mp3');
music.loop = true;

// Botón para iniciar música manualmente en móviles
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('#startMusic');
  if (btn) {
    btn.addEventListener('click', () => {
      music.play().catch(err => console.log("Error de música:", err));
      btn.style.display = 'none';
    });
  } else {
    music.play().catch(err => console.log("Error de música:", err));
  }
});

// Generar bolas con números
const container = document.querySelector('.balls-container');
if (container) {
  for (let i = 0; i < 6; i++) {
    const ball = document.createElement('div');
    ball.classList.add('ball');
    ball.textContent = Math.floor(Math.random() * 75) + 1;
    container.appendChild(ball);
  }
}
