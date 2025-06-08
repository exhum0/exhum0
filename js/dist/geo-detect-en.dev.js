"use strict";

(function _callee() {
  var res, data, country, russianCountries, lang;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch("https://api.country.is/"));

        case 3:
          res = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(res.json());

        case 6:
          data = _context.sent;
          country = data.country.toLowerCase(); // Список "русскоязычных" стран

          russianCountries = ["ru", "by", "kz", "kg", "ua", "uz", "tj", "am", "az"];

          if (russianCountries.includes(country)) {
            // Редиректим на русский сайт
            window.location.href = "https://ultrarealist.netlify.app";
          } // Иначе — остаётся на английском сайте (ничего не делаем)


          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          // Если ошибка — остаёмся на англоязычном сайте
          console.error("Geo detection failed", _context.t0);

        case 15:
          lang = navigator.language || navigator.userLanguage;

          if (lang.startsWith("ru")) {
            window.location.href = "https://ultrarealist.netlify.app";
          }

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
})();