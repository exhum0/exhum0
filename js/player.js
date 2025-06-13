document.querySelectorAll('.play-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const player = document.getElementById('player');
    player.src = '/audio/mippo.mp3'; // Подставляй путь динамически
    player.play();
  });
});
