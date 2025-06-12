(async function () {
  try {
    const res = await fetch("https://api.country.is/");
    const data = await res.json();
    const country = data.country.toLowerCase();

    const allowedCountries = [
      "us",
      "ca",
      "gb",
      "au",
      "nz",
      "fr",
      "de",
      "it",
      "es",
      "pt",
      "nl",
      "be",
      "ch",
      "at",
      "se",
      "no",
      "fi",
      "dk",
      "ie",
      "lu",
    ];

    if (blockedCountries.includes(country)) {
      window.location.href = "404.html";
    }

    if (!allowedCountries.includes(country)) {
      window.location.href = "404.html";
    }
  } catch (e) {
    window.location.href = "404.html";
  }
})();

