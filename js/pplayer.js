const audio = document.getElementById("audio-player");
const playButtons = document.querySelectorAll(".play-btn");
const buyButtons = document.querySelectorAll(".buy-btn");
const downloadButtons = document.querySelectorAll(".download-btn");
const shareButtons = document.querySelectorAll(".share-btn");

let currentBtn = null;
let currentTrack = null;

playButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const trackEl = btn.closest(".track");
    const src = trackEl.getAttribute("data-src");

    // Если трек уже играет и повторно нажали — пауза
    if (audio.src.includes(src)) {
      if (audio.paused) {
        audio.play();
        btn.innerHTML = '<i class="fas fa-pause"></i>';
      } else {
        audio.pause();
        btn.innerHTML = '<i class="fas fa-play"></i>';
      }
    } else {
      // Переключение на новый трек
      if (currentBtn) {
        currentBtn.innerHTML = '<i class="fas fa-play"></i>';
      }
      audio.src = src;
      audio.play();
      btn.innerHTML = '<i class="fas fa-pause"></i>';
      currentBtn = btn;
      currentTrack = trackEl;
    }

    // Когда закончился
    audio.onended = () => {
      if (currentBtn) currentBtn.innerHTML = '<i class="fas fa-play"></i>';
    };
  });
});

// Покупка трека
buyButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const trackEl = btn.closest(".track");
    const title = trackEl.querySelector(".title").textContent;
    showLicensePopup(title);
  });
});

// Скачивание (если бесплатный)
downloadButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const trackEl = btn.closest(".track");
    const src = trackEl.getAttribute("data-src");
    const isFree = trackEl.getAttribute("data-free") === "true";

    if (isFree) {
      const link = document.createElement("a");
      link.href = src;
      link.download = "";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("This is track not free");
    }
  });
});

// Расшарить в соцсетях
shareButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const trackEl = btn.closest(".track");
    const title = trackEl.querySelector(".title").textContent;
    const src = trackEl.getAttribute("data-src");
    const shareUrl = `${window.location.origin}/${src}`; // путь до файла

    const shareText = encodeURIComponent(`Слушай трек "${title}"`);
    const shareLink = encodeURIComponent(shareUrl);

    const popupMenu = `
      <div class="popup-overlay" id="share-popup">
        <div class="popup">
          <h3>Share "${title}"</h3>
          <a href="https://t.me/share/url?url=${shareLink}&text=${shareText}" target="_blank">Telegram</a><br>
          <a href="https://twitter.com/intent/tweet?text=${shareText}&url=${shareLink}" target="_blank">X</a><br>
          <button onclick="closeSharePopup()">Close</button>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", popupMenu);
  });
});

// Попапы
function showLicensePopup(title) {
  const html = `
    <div class="popup-overlay" id="popup">
      <div class="popup">
        <h3>Select licence "${title}"</h3>
        <button onclick="selectLicense('lease')">Leasing – $29.99</button>
        <button onclick="selectLicense('exclusive')">Exclusive – $199.99</button>
        <button onclick="closePopup()">Cancel</button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", html);
}

function closePopup() {
  const popup = document.getElementById("popup");
  if (popup) popup.remove();
}

function closeSharePopup() {
  const popup = document.getElementById("share-popup");
  if (popup) popup.remove();
}

function selectLicense(type) {
  alert(`You're Licence: ${type}`);
  closePopup();
}