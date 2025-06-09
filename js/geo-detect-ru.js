
      (async function () {
        try {
          const res = await fetch("https://api.country.is/");
          const data = await res.json();
          const country = data.country.toLowerCase();

          const allowedCountries = ["ru"];

          if (!allowedCountries.includes(country)) {
            window.location.href = "404.html";
          }
        } catch (e) {
          window.location.href = "404.html";
        }
      })();
 