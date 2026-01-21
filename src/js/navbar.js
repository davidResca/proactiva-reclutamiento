/* Navbar OBSERVER */
const navbar = document.querySelector(".nav-bar");
const sentinel = document.querySelector(".sentinel");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (navbar.classList.contains("nav-bar")) {
          navbar.classList.remove("scrolled");
        }
        // Si el sentinel es visible, estamos en la sección principal
        navbar.classList.remove("scrolled");
      } else {
        if (navbar.classList.contains("nav-bar")) {
          navbar.classList.add("scrolled");
        }
        // Si el sentinel NO es visible, ya pasamos el umbral
        navbar.classList.add("scrolled");
      }
    });
  },
  { threshold: 0 }
);

observer.observe(sentinel);