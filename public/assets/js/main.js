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

document.addEventListener("DOMContentLoaded", () => {
    // Находим контейнер с карточками
    const portfolioContainer = document.querySelector(".work-container");
    const linkWork = document.querySelectorAll(".work-item");

    // Инициализация MixItUp
    if (portfolioContainer && typeof mixitup !== "undefined") {
        mixitup(portfolioContainer, {
            selectors: { target: ".work-card" },
            animation: { duration: 300 }
        });
    } else {
        console.warn("MixItUp не найден или .work-container отсутствует");
    }

    // Переключение активной кнопки
    if (linkWork.length) {
        linkWork.forEach((link) => {
            link.addEventListener("click", function () {
                linkWork.forEach((l) => l.classList.remove("active-work"));
                this.classList.add("active-work");
            });
        });
    }
});
