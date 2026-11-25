// JOHN VINCENT UHLENHOPP — PORTFOLIO INTERACTIONS

const themeToggle = document.getElementById("theme-toggle");
const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll(".nav-link");

// Change and remember the color theme.
if (localStorage.getItem("portfolio-theme") === "light") {
  document.body.classList.add("light");
  themeToggle.textContent = "☀";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  themeToggle.textContent = isLight ? "☀" : "☾";
  localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
});

// Open and close the mobile navigation menu.
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Highlight the navigation link for the section currently in view.
const sections = document.querySelectorAll("main section[id]");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach(section => observer.observe(section));

// Animated role text.
const roles = ["Beginner Web Developer", "Aspiring Programmer", "Creative Learner"];
const typingText = document.getElementById("typing-text");
let roleIndex = 0;
let letterIndex = 0;
let deleting = false;

function typeRole() {
  const currentRole = roles[roleIndex];
  typingText.textContent = currentRole.substring(0, letterIndex);

  if (!deleting && letterIndex < currentRole.length) {
    letterIndex++;
    setTimeout(typeRole, 85);
  } else if (deleting && letterIndex > 0) {
    letterIndex--;
    setTimeout(typeRole, 42);
  } else {
    deleting = !deleting;
    if (!deleting) roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeRole, deleting ? 1100 : 250);
  }
}
typeRole();

// Filter the project cards.
const filterButtons = document.querySelectorAll(".filter");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");

    const selectedFilter = button.dataset.filter;
    projectCards.forEach(card => {
      const matches = selectedFilter === "all" ||
        card.dataset.category === selectedFilter;
      card.classList.toggle("hidden", !matches);
    });
  });
});

// Keep the project count and footer year current.
document.getElementById("project-count").textContent = projectCards.length;
document.getElementById("year").textContent = new Date().getFullYear();

