import { scams } from "../data/scams.js?v=articles-20260520";

const cardsGrid = document.querySelector("#cards-grid");

function createCard(scam) {
  const card = document.createElement("article");
  card.className = "card";

  card.innerHTML = `
    <a class="card__link" href="./scheme.html?id=${encodeURIComponent(scam.slug)}" aria-label="${scam.title}">
      <img class="card__image" src="${scam.image}" alt="${scam.imageAlt}" loading="lazy">
      <div class="card__body">
        <h3>${scam.title}</h3>
        <p>${scam.shortDescription}</p>
      </div>
    </a>
  `;

  return card;
}

cardsGrid.append(...scams.map(createCard));
