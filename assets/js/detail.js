import { scams } from "../data/scams.js?v=articles-20260522b";

const container = document.querySelector("#scheme-detail");
const params = new URLSearchParams(window.location.search);
const slug = params.get("id");
const scam = scams.find((item) => item.slug === slug);

function renderParagraphs(text) {
  return text
    .split("\n\n")
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("");
}

function renderArticleBlocks(blocks = []) {
  if (!blocks.length) {
    return "";
  }

  return blocks
    .map((block) => {
      if (block.type === "heading") {
        return `<h2 class="article__subheading">${block.text}</h2>`;
      }

      return `<p>${block.html ?? block.text}</p>`;
    })
    .join("");
}

function renderNotFound() {
  container.innerHTML = `
    <section class="not-found">
      <p class="eyebrow">Материал не найден</p>
      <h1>Такой схемы нет в каталоге</h1>
      <p>Проверьте ссылку или вернитесь на главную страницу, чтобы выбрать материал из списка.</p>
    </section>
  `;
}

function renderDetail(item) {
  document.title = `${item.title} | НетОбмана.рф`;

  container.innerHTML = `
    <section class="detail-hero" aria-labelledby="scheme-title">
      <div class="detail-hero__text">
        <h1 id="scheme-title">${item.title}</h1>
        <p>${item.shortDescription}</p>
      </div>
      <figure class="detail-hero__image">
        <img src="${item.image}" alt="${item.imageAlt}">
      </figure>
    </section>

    <section class="article-grid" aria-label="Подробная информация">
      <article class="article">
        ${item.articleBlocks ? renderArticleBlocks(item.articleBlocks) : renderParagraphs(item.fullText)}
      </article>
    </section>
  `;
}

if (scam) {
  renderDetail(scam);
} else {
  renderNotFound();
}
