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
  if (popup) {
    const popupClose = popup.querySelector(".portfolio-popup-close");
    const popupImg = popup.querySelector(".portfolio-popup-img");
    const popupSubtitle = popup.querySelector(".portfolio-popup-subtitle span");
    const popupTitle = popup.querySelector(".details-title");
    const popupDesc = popup.querySelector(".details-description");
    const popupStack = popup.querySelector(".details-info li:nth-child(1) span");
    const popupDemoLink = popup.querySelector(".details-info li:nth-child(2) span a");

    // Открытие: кликаем по кнопке в карточке (делегирование на контейнер)
    portfolioContainer.addEventListener("click", (e) => {
      const btn = e.target.closest(".work-button");
      if (!btn) return;

      const card = btn.closest(".work-card");
      if (!card) return;

      // картинка
      const imgEl = card.querySelector(".work-img");
      if (imgEl && popupImg) popupImg.src = imgEl.src;

      // подзаголовок = категория
      let subtitle = card.dataset.category;
      if (!subtitle) {
        // Берём первый класс, который не work-card/mix
        subtitle =
          Array.from(card.classList).find((c) => c !== "work-card" && c !== "mix") || "";
      }
      if (popupSubtitle) popupSubtitle.textContent = subtitle;

      // заголовок из карточки
      const titleEl = card.querySelector(".work-title");
      if (titleEl && popupTitle) popupTitle.textContent = titleEl.textContent;

      // детали из скрытого блока карточки
      const details = card.querySelector(".portfolio-item-details");
      if (details) {
        const dTitle = details.querySelector(".details-title");
        const dDesc = details.querySelector(".details-description");
        const dStack = details.querySelector(".details-info li:nth-child(1) span");
        const dDemo = details.querySelector(".details-info li:nth-child(2) span a");

        if (dTitle && popupTitle) popupTitle.textContent = dTitle.textContent;
        if (dDesc && popupDesc) popupDesc.textContent = dDesc.textContent;
        if (dStack && popupStack) popupStack.textContent = dStack.textContent;
        if (dDemo && popupDemoLink) {
          popupDemoLink.href = dDemo.href;
          popupDemoLink.textContent = dDemo.textContent;
        }
      }

      popup.classList.add("open");
    });

    // Закрытие (крестик, клик по фону, Esc)
    if (popupClose) {
      popupClose.addEventListener("click", () => popup.classList.remove("open"));
    }
    popup.addEventListener("click", (e) => {
      if (e.target === popup) popup.classList.remove("open");
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") popup.classList.remove("open");
    });
  }
});
