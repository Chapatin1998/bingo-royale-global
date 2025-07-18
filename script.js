const btn = document.getElementById('continuar-btn');
const barra = document.getElementById('barra-carga');
const progress = document.getElementById('progress-bar');
const porcentaje = document.getElementById('porcentaje');
const audio = document.getElementById('musica-fondo');

btn.addEventListener('click', () => {
  btn.style.display = 'none';
  barra.style.display = 'block';
  audio.play();

  let carga = 0;
  const intervalo = setInterval(() => {
    carga++;
    progress.style.width = `${carga}%`;
    porcentaje.innerText = `${carga}%`;

    if (carga >= 100) {
      clearInterval(intervalo);
      window.location.href = "bienvenido.html";
    }
  }, 50);
});

// Ocultar barra al inicio
barra.style.display = 'none';
