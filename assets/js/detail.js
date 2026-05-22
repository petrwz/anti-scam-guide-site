import { scams } from "../data/scams.js?v=articles-20260522b";

const SITE_URL = "https://xn--80abl3aced5ao.xn--p1ai";
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

function updateMeta(name, content) {
  const element = document.querySelector(name);
  if (element) {
    element.setAttribute("content", content);
  }
}

function updateCanonical(url) {
  const link = document.querySelector("#canonical-link");
  if (link) {
    link.setAttribute("href", url);
  }
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
  const pageUrl = `${SITE_URL}/scheme.html?id=${encodeURIComponent(item.slug)}`;
  const pageTitle = `${item.title} | НетОбману.рф`;

  document.title = pageTitle;
  updateMeta("#meta-description", item.shortDescription);
  updateMeta("#og-title", pageTitle);
  updateMeta("#og-description", item.shortDescription);
  updateMeta("#og-url", pageUrl);
  updateMeta("#og-image", `${SITE_URL}/${item.image}`);
  updateCanonical(pageUrl);

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
