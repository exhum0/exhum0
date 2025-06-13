"use strict";

document.querySelectorAll('.play-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var player = document.getElementById('player');
    player.src = '/audio/mippo.mp3'; // Подставляй путь динамически

    player.play();
  });
});