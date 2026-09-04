/* New3D — Carrossel de imagens dos produtos (estilo "passa sozinho no hover")
   Usado tanto nos cards do catálogo quanto na página de detalhe do produto. */

/* Gera o HTML da "vitrine" de um produto: carrossel de fotos reais se existirem,
   ou o ícone SVG de contorno (fallback) enquanto a foto não for cadastrada. */
function productMediaHTML(produto, { size = "card" } = {}) {
  const imagens = getImagensProduto(produto);

  if (!imagens) {
    return `<div class="media-carousel media-fallback" data-size="${size}">${productIconSVG(produto.icone)}</div>`;
  }

  const slides = imagens
    .map(
      (src, i) =>
        `<img src="${src}" alt="${produto.nome} — foto ${i + 1}" class="media-slide${i === 0 ? " is-active" : ""}" loading="lazy" data-idx="${i}" onerror="this.style.display='none'">`
    )
    .join("");

  const dots =
    imagens.length > 1
      ? `<div class="media-dots">${imagens.map((_, i) => `<button type="button" class="media-dot${i === 0 ? " is-active" : ""}" data-idx="${i}" aria-label="Foto ${i + 1}"></button>`).join("")}</div>`
      : "";

  const arrows =
    imagens.length > 1 && size === "detail"
      ? `<button type="button" class="media-arrow media-arrow-prev" aria-label="Foto anterior">&#8249;</button>
         <button type="button" class="media-arrow media-arrow-next" aria-label="Próxima foto">&#8250;</button>`
      : "";

  return `<div class="media-carousel" data-size="${size}" data-count="${imagens.length}">
    <div class="media-track">${slides}</div>
    ${arrows}
    ${dots}
  </div>`;
}

function _setActiveSlide(carousel, idx) {
  const slides = carousel.querySelectorAll(".media-slide");
  const dots = carousel.querySelectorAll(".media-dot");
  slides.forEach((s) => s.classList.toggle("is-active", Number(s.dataset.idx) === idx));
  dots.forEach((d) => d.classList.toggle("is-active", Number(d.dataset.idx) === idx));
  carousel.dataset.active = idx;
}

/* Ativa, dentro de um container (grid de cards ou página de produto), o comportamento
   de troca automática de foto ao passar o mouse (estilo Mercado Livre), navegação por
   bolinhas e setas. Chame de novo sempre que renderizar novos cards na tela. */
function initMediaCarousels(root = document) {
  root.querySelectorAll(".media-carousel[data-count]").forEach((carousel) => {
    if (carousel.dataset.mediaInit) return;
    carousel.dataset.mediaInit = "1";

    const count = Number(carousel.dataset.count);
    if (!count || count < 2) return;
    let timer = null;

    const advance = () => {
      const current = Number(carousel.dataset.active || 0);
      _setActiveSlide(carousel, (current + 1) % count);
    };

    carousel.addEventListener("mouseenter", () => {
      if (carousel.dataset.size === "card") {
        timer = setInterval(advance, 750);
      }
    });
    carousel.addEventListener("mouseleave", () => {
      clearInterval(timer);
      if (carousel.dataset.size === "card") _setActiveSlide(carousel, 0);
    });

    carousel.querySelectorAll(".media-dot").forEach((dot) => {
      dot.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        _setActiveSlide(carousel, Number(dot.dataset.idx));
      });
      dot.addEventListener("mouseenter", () => {
        if (carousel.dataset.size === "detail") _setActiveSlide(carousel, Number(dot.dataset.idx));
      });
    });

    const prev = carousel.querySelector(".media-arrow-prev");
    const next = carousel.querySelector(".media-arrow-next");
    if (prev)
      prev.addEventListener("click", (e) => {
        e.preventDefault();
        const current = Number(carousel.dataset.active || 0);
        _setActiveSlide(carousel, (current - 1 + count) % count);
      });
    if (next)
      next.addEventListener("click", (e) => {
        e.preventDefault();
        advance();
      });
  });
}
