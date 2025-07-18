const music = document.getElementById("music");
const clickSound = document.getElementById("click-sound");
const continueBtn = document.getElementById("continue-btn");
const loader = document.getElementById("loader");
const percentage = document.getElementById("percentage");
const bar = document.querySelector(".bar");

continueBtn.addEventListener("click", () => {
  clickSound.currentTime = 0;
  clickSound.play();

  continueBtn.style.display = "none";
  loader.style.display = "block";
  
  let progress = 0;
  const interval = setInterval(() => {
    progress++;
    percentage.textContent = progress + "%";
    bar.style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(interval);
      window.location.href = "home.html";
    }
  }, 50); // dura 5 segundos
});
