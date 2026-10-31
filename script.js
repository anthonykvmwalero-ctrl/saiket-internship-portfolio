
document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation elements
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-link");

  // Open and close the mobile dropdown menu
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
    });

    // Close the menu after a navigation link is selected
    navItems.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
      });
    });

    // Close the menu if the screen returns to desktop size
    window.addEventListener("resize", () => {
      if (window.innerWidth > 700) {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
      }
    });
  } else {
    console.error("Mobile navigation button or menu was not found.");
  }

  // Highlight the navigation link for the section in view
  const sections = document.querySelectorAll("main section[id]");

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navItems.forEach((link) => {
              const isActive =
                link.getAttribute("href") === `#${entry.target.id}`;

              link.classList.toggle("active", isActive);
            });
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
  }

  // Automatically display the current year in the footer
  const currentYear = document.getElementById("current-year");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
});
