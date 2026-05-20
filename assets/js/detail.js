import { scams } from "../data/scams.js?v=articles-20260520";

const container = document.querySelector("#scheme-detail");
const params = new URLSearchParams(window.location.search);
const slug = params.get("id");
const scam = scams.find((item) => item.slug === slug);

function renderList(items) {
  return items.map((item) => `<li>${item}</li>`).join("");
}

function renderParagraphs(text) {
  return text
    .split("\n\n")
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("");
}

function renderNotFound() {
  container.innerHTML = `
    <section class="not-found">
      <p class="eyebrow">Материал не найден</p>
      <h1>Такой схемы нет в каталоге</h1>
      <p>Проверьте ссылку или вернитесь на главную страницу, чтобы выбрать материал из списка.</p>
      <a class="button" href="./index.html#schemes">Назад на главную</a>
    </section>
  `;
}

function renderDetail(item) {
  document.title = `${item.title} | Стоп Обман`;

  container.innerHTML = `
    <section class="detail-hero" aria-labelledby="scheme-title">
      <div class="detail-hero__text">
        <p class="eyebrow">Разбор схемы</p>
        <h1 id="scheme-title">${item.title}</h1>
        <p>${item.shortDescription}</p>
        <a class="button button--secondary" href="./index.html#schemes">Назад на главную</a>
      </div>
      <figure class="detail-hero__image">
        <img src="${item.image}" alt="${item.imageAlt}">
      </figure>
    </section>

    <section class="article-grid" aria-label="Подробная информация">
      <article class="article">
        ${renderParagraphs(item.fullText)}
      </article>
      <aside class="advice-panel" aria-label="Как распознать и что делать">
        <div>
          <h2>Как распознать</h2>
          <ul>${renderList(item.howToRecognize)}</ul>
        </div>
        <div>
          <h2>Что делать, если столкнулись</h2>
          <ul>${renderList(item.whatToDo)}</ul>
        </div>
      </aside>
    </section>
  `;
}

if (scam) {
  renderDetail(scam);
} else {
  renderNotFound();
}
