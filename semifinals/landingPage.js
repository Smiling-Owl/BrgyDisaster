const toggleBtn = document.getElementById("toggleBtn");
const sidebar = document.getElementById("sidebar");
const hero = document.querySelector(".hero");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
  hero.classList.toggle("collapsed");
});
