document.addEventListener("DOMContentLoaded", () => {
  const popup = document.querySelector(".portfolio-popup");
  const popupClose = popup.querySelector(".portfolio-popup-close");

  // Элементы внутри popup
  const popupImg = popup.querySelector(".portfolio-popup-img");
  const popupSubtitle = popup.querySelector(".portfolio-popup-subtitle span");
  const popupTitle = popup.querySelector(".details-title");
  const popupDesc = popup.querySelector(".details-description");
  const popupStack = popup.querySelector(".details-info li:nth-child(1) span");
  const popupDemoLink = popup.querySelector(".details-info li:nth-child(2) span a");

  // Открытие popup
  document.querySelectorAll(".work-card").forEach(card => {
    const btn = card.querySelector(".work-button");
    btn.addEventListener("click", () => {
      const img = card.querySelector(".work-img").src;
      const subtitle = card.dataset.category || card.className.replace("work-card mix ", "");
      const title = card.querySelector(".work-title").textContent;
      const details = card.querySelector(".portfolio-item-details");

      popupImg.src = img;
      popupSubtitle.textContent = subtitle;
      popupTitle.textContent = details.querySelector(".details-title").textContent;
      popupDesc.textContent = details.querySelector(".details-description").textContent;
      popupStack.textContent = details.querySelector(".details-info li:nth-child(1) span").textContent;
      popupDemoLink.href = details.querySelector(".details-info li:nth-child(2) span a").href;
      popupDemoLink.textContent = details.querySelector(".details-info li:nth-child(2) span a").textContent;

      popup.classList.add("open");
    });
  });

  // Закрытие popup
  popupClose.addEventListener("click", () => {
    popup.classList.remove("open");
  });

  // Клик по фону для закрытия
  popup.addEventListener("click", e => {
    if (e.target === popup) {
      popup.classList.remove("open");
    }
  });
});

// /assets/js/portfolio-filters.js
(function () {
  function init() {
    const container = document.querySelector(".work-container");
    if (!container) {
      console.warn("Контейнер .work-container не найден");
      return;
    }

    if (typeof window.mixitup !== "function") {
      console.warn("MixItUp не найден (проверьте подключение скрипта CDN)");
      return;
    }

    // Инициализируем MixItUp
    const mixer = window.mixitup(container, {
      selectors: { target: ".work-card" },
      animation: { duration: 300 }
    });

    // Делегирование кликов по фильтрам
    const filtersBar = document.querySelector(".work-filters");
    if (!filtersBar) return;

    filtersBar.addEventListener("click", (e) => {
      const btn = e.target.closest(".work-item");
      if (!btn) return;

      const selector = btn.getAttribute("data-filter") || "all";

      // Применяем фильтр
      mixer.filter(selector === "all" ? "all" : selector);

      // Переключаем активное состояние кнопок
      filtersBar.querySelectorAll(".work-item").forEach((el) => {
        el.classList.toggle("active-work", el === btn);
      });
    });
  }

  // Ждем DOM и (на всякий) сам MixItUp
  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  }

  ready(() => {
    if (typeof window.mixitup === "function") {
      init();
    } else {
      // Если CDN подгружается позднее — дождёмся
      const scriptEl = document.querySelector('script[src*="mixitup"]');
      if (scriptEl) {
        scriptEl.addEventListener("load", init, { once: true });
      } else {
        // Фолбэк-проверка несколько раз
        let tries = 0;
        const id = setInterval(() => {
          tries++;
          if (typeof window.mixitup === "function") {
            clearInterval(id);
            init();
          } else if (tries > 40) {
            clearInterval(id);
            console.warn("MixItUp так и не загрузился");
          }
        }, 50);
      }
    }
  });
})();
