document.addEventListener("DOMContentLoaded", () => {
  const portfolioContainer = document.querySelector(".work-container");
  const filtersBar = document.querySelector(".work-filters");
  const popup = document.querySelector(".portfolio-popup");

  if (!portfolioContainer) {
    console.warn("Контейнер .work-container не найден");
    return;
  }

  // --- MixItUp ---
  let mixer = null;
  if (typeof window.mixitup === "function") {
    mixer = window.mixitup(portfolioContainer, {
      selectors: { target: ".work-card" },
      animation: { duration: 300 }
    });
  } else {
    console.warn("MixItUp не найден (проверь подключение CDN)");
  }

  // --- Фильтры (явно вызываем mixer.filter) ---
  if (filtersBar) {
    filtersBar.addEventListener("click", (e) => {
      const btn = e.target.closest(".work-item");
      if (!btn) return;

      const selector = btn.getAttribute("data-filter") || "all";
      if (mixer) mixer.filter(selector === "all" ? "all" : selector);

      filtersBar.querySelectorAll(".work-item").forEach((el) => {
        el.classList.toggle("active-work", el === btn);
      });
    });
  }

  // --- Popup ---