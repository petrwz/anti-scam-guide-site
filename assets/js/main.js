import { scams } from "../data/scams.js?v=articles-20260522b";

const cardsGrid = document.querySelector("#cards-grid");
const filtersRoot = document.querySelector("#topic-filters");
let activeFilter = "";

const topicFilters = [
  { id: "messengers", label: "Телеграм и мессенджеры" },
  { id: "iphone", label: "iPhone" },
  { id: "calls", label: "Звонки" },
  { id: "marketplaces", label: "Маркетплейсы" },
  { id: "services", label: "ЖКУ и Госуслуги" },
  { id: "offline", label: "Авто" },
];

const topicMap = {
  "fake-iphone-tester": ["iphone"],
  "friendly-fraud": ["messengers"],
  "bank-card-theft": ["calls"],
  "lebanese-loop-atm": ["calls"],
  "phone-scam-phrases": ["calls"],
  "avito-delivery-scam": ["marketplaces"],
  "intercom-replacement-scam": ["services"],
  "fake-gosuslugi-alert": ["services", "messengers"],
  "fake-boss-message": ["messengers"],
  "dating-site-scam": ["messengers"],
  "moving-company-blackmail": ["offline"],
  "used-iphone-scam": ["iphone", "marketplaces"],
  "pension-fund-scam": ["calls", "services"],
  "gaming-scam": ["messengers"],
  "marketplace-scam": ["marketplaces", "messengers"],
};

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

function getVisibleScams() {
  if (!activeFilter) {
    return scams;
  }

  return scams.filter((scam) => topicMap[scam.slug]?.includes(activeFilter));
}

function renderCards() {
  const visibleScams = getVisibleScams();
  cardsGrid.replaceChildren(...visibleScams.map(createCard));
}

function renderFilters() {
  if (!filtersRoot) {
    return;
  }

  filtersRoot.replaceChildren(
    ...topicFilters.map((filter) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `filter-chip${filter.id === activeFilter ? " filter-chip--active" : ""}`;
      button.textContent = filter.label;
      button.setAttribute("aria-pressed", String(filter.id === activeFilter));
      button.addEventListener("click", () => {
        activeFilter = filter.id;
        renderFilters();
        renderCards();
      });
      return button;
    }),
  );
}

renderFilters();
renderCards();
