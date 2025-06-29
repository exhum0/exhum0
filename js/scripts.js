// Fade in-Out Page

document.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('#') && !href.startsWith('http')) {
      e.preventDefault();
      document.body.classList.add('fade-out');
      setTimeout(() => {
        window.location = href;
      }, 500);
    }
  });
});

// Accordion

document.querySelectorAll(".toggle-terms").forEach((btn) => {
  btn.addEventListener("click", () => {
    const usage = btn.nextElementSibling;
    usage.classList.toggle("active");
    btn.classList.toggle("active");

    if (usage.classList.contains("active")) {
      btn.innerHTML = "▲ Hide usage terms";
    } else {
      btn.innerHTML = "▼ Show usage terms";
    }
  });
});
