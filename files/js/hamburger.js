document.addEventListener("DOMContentLoaded", () => {
  const hamburgerMenu = document.querySelector(".fa.fa-bars");
  const mobileMenu = document.querySelector("#mobile-menu");

  hamburgerMenu.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
  });
});
