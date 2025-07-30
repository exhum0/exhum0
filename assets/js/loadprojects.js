let allProjects = [];
let visibleCount = 4;
const increment = 4;

const container = document.getElementById('projects-container');
const loadMoreBtn = document.getElementById('load-more-btn');

// Загружаем данные из JSON
fetch('projects.json')
  .then(response => response.json())
  .then(data => {
    allProjects = data;
    renderProjects();
  })
  .catch(error => {
    console.error('Ошибка при загрузке JSON:', error);
  });

// Функция отрисовки карточек
function renderProjects() {
  container.innerHTML = '';
  for (let i = 0; i < visibleCount && i < allProjects.length; i++) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <h3>${allProjects[i].title}</h3>
      <p>${allProjects[i].description}</p>
    `;
    container.appendChild(card);
  }

  if (visibleCount >= allProjects.length) {
    loadMoreBtn.style.display = 'none';
  }
}

// Обработчик кнопки
loadMoreBtn.addEventListener('click', () => {
  visibleCount += increment;
  renderProjects();
});
