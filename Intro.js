document.getElementById("continueBtn").addEventListener("click", function () {
  const music = document.getElementById("introMusic");
  music.play();

  let progress = 0;
  const progressBar = document.getElementById("progress");
  const interval = setInterval(() => {
    if (progress < 100) {
      progress += 1;
      progressBar.style.width = progress + "%";
    } else {
      clearInterval(interval);
      // Redirigir o hacer otra acción después de la carga si deseas
    }
  }, 50); // Duración total: 5 segundos
});
