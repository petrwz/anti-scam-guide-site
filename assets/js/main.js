import { scams } from "../data/scams.js";

const cardsGrid = document.querySelector("#cards-grid");

function createCard(scam) {
  const card = document.createElement("article");
  card.className = "card";

  card.innerHTML = `
    <img class="card__image" src="${scam.image}" alt="${scam.imageAlt}" loading="lazy">
    <div class="card__body">
      <h3>${scam.title}</h3>
      <p>${scam.shortDescription}</p>
      <a class="button" href="./scheme.html?id=${encodeURIComponent(scam.slug)}">Подробнее</a>
    </div>
  `;

  return card;
}

cardsGrid.append(...scams.map(createCard));
