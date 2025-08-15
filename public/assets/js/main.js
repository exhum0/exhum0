import langData from './lang.json';
import portfolioData from './portfolio.json';

const currentLang = localStorage.getItem('lang') || 'ru'; // или получаем из URL
const portfolioSection = document.querySelector('.work-container');

function renderPortfolio() {
  const projects = portfolioData[currentLang];

  portfolioSection.innerHTML = projects.map(project => `
    <div class="work-card mix ${project.category}">
      <img src="${project.image}" alt="${project.title}" class="work-img" />
      <h3 class="work-title">${project.title}</h3>
      <span class="work-button">
        ${langData[currentLang].buttons.view}<i class="uil uil-arrow-right work-button-icon"></i>
      </span>

      <div class="portfolio-item-details">
        <h3 class="details-title">${project.detailsTitle}</h3>
        <p class="details-description">${project.detailsDescription}</p>
        <ul class="details-info">
          <li>${langData[currentLang].portfolio.stack} - <span>${project.stack}</span></li>
          <li>
            Демо - <span><a href="${project.demo}" target="_blank">${project.demo}</a></span>
          </li>
        </ul>
      </div>
    </div>
  `).join('');
}

renderPortfolio();
