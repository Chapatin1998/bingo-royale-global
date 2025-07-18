document.addEventListener("DOMContentLoaded", () => {
  const continueBtn = document.getElementById("continueBtn");
  const introMusic = document.getElementById("introMusic");

  // Mostrar botón después de 6 segundos
  setTimeout(() => {
    continueBtn.classList.remove("opacity-0", "pointer-events-none");
  }, 6000);

  // Al hacer clic, reproducir música y redirigir
  continueBtn.addEventListener("click", () => {
    introMusic.play();
    continueBtn.textContent = "Cargando...";
    continueBtn.disabled = true;

    setTimeout(() => {
      window.location.href = "home.html";
    }, 5000); // 5 segundos de música antes de ir a la siguiente página
  });
});
