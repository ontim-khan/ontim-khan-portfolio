const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-link");

function closeMenu() {
  if (!menuToggle || !navLinks) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  navLinks.classList.remove("open");
  document.body.classList.remove("menu-open");
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    navLinks.classList.toggle("open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  navItems.forEach((item) => item.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 700) closeMenu();
  });
}

// Update the active navigation link based on the visible section.
const observedSections = document.querySelectorAll("main section[id]");
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navItems.forEach((link) => {
        const active = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

  observedSections.forEach((section) => sectionObserver.observe(section));
}

// Contact form: prepare an email in the visitor's default email application.
// Replace the placeholder address in index.html before publishing.
const contactForm = document.querySelector("#contact-form");
const feedback = document.querySelector("#form-feedback");
const emailLink = document.querySelector('.contact-item[href^="mailto:"]');

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const portfolioEmail = emailLink?.getAttribute("href")?.replace("mailto:", "");
    if (!portfolioEmail || portfolioEmail === "your.email@example.com") {
      feedback.textContent = "Please replace your.email@example.com with your real email address in index.html first.";
      feedback.style.color = "#ffd080";
      return;
    }

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const senderEmail = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !senderEmail || !message) {
      feedback.textContent = "Please complete all fields.";
      feedback.style.color = "#ffd080";
      return;
    }

    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${senderEmail}\n\nMessage:\n${message}`);
    feedback.textContent = "Opening your email application…";
    feedback.style.color = "#80f0bd";
    window.location.href = `mailto:${portfolioEmail}?subject=${subject}&body=${body}`;
  });
}

// Project cards use placeholder links until real repository/demo URLs are added.
document.querySelectorAll(".placeholder-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    const projectName = link.dataset.project || "this project";
    const messageField = document.querySelector("#message");
    if (messageField) {
      messageField.value = `Hello Ontim, I'd like to know more about ${projectName}.`;
    }
  });
});

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
