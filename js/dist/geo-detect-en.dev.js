"use strict";

(function _callee() {
  var res, data, country, allowedCountries;
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
          country = data.country.toLowerCase();
          allowedCountries = ["us", "ca", "gb", "au", "nz", "fr", "de", "it", "es", "pt", "nl", "be", "ch", "at", "se", "no", "fi", "dk", "ie", "lu"];

          if (blockedCountries.includes(country)) {
            window.location.href = "404.html";
          }

          if (!allowedCountries.includes(country)) {
            window.location.href = "404.html";
          }

          _context.next = 16;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          window.location.href = "404.html";

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 13]]);
})();