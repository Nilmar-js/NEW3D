/* Dados de contato da loja, usados no rodapé e no redirecionamento de pedidos pro WhatsApp */
const NEW3D_CONTATO = {
  whatsapp: "5562984738740",
  whatsappDisplay: "(62) 98473-8740",
  email: "Nilmar.js@hotmail.com",
  instagram: "new3d_br",
};

function renderHeader(active) {
  const header = document.getElementById("header");
  if (!header) return;
  const user = getCurrentUser();
  const count = getCartCount();

  const navItem = (href, label, key) =>
    `<a href="${href}" class="${active === key ? "active" : ""}">${label}</a>`;

  header.innerHTML = `
    <div class="container">
      <a href="index.html" class="logo">
        <img src="img/logo-wordmark.png" alt="New 3D" class="logo-img">
      </a>
      <nav class="main-nav">
        ${navItem("index.html", "Catálogo", "catalogo")}
        ${navItem("index.html#categorias", "Categorias", "categorias")}
      </nav>
      <div class="header-actions">
        ${
          user
            ? `<a href="conta.html" class="user-chip">${user.nome.split(" ")[0]}</a>`
            : `<a href="login.html" class="user-chip">Entrar</a>`
        }
        <a href="carrinho.html" class="icon-btn" aria-label="Carrinho">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="21" r="1.4"/><circle cx="18" cy="21" r="1.4"/><path d="M2.5 3h2l2.6 12.6a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L21 7H6"/></svg>
          ${count > 0 ? `<span class="cart-count">${count}</span>` : ""}
        </a>
      </div>
    </div>
  `;
}

function renderFooter() {
  const footer = document.getElementById("footer");
  if (!footer) return;
  const waLink = `https://wa.me/${NEW3D_CONTATO.whatsapp}`;
  footer.innerHTML = `
    <div class="container footer-grid">
      <div class="footer-about">
        <img src="img/logo-wordmark.png" alt="New 3D" class="footer-logo">
        <p>New 3D — peças impressas em 3D. Projeto escolar, catálogo e loja fictícios.</p>
        <p>Feito com filamento, camadas e um pouco de código.</p>
      </div>
      <div class="footer-contact">
        <h3>Fale com a gente</h3>
        <a href="mailto:${NEW3D_CONTATO.email}" class="footer-contact-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="M3 6l9 7 9-7"/></svg>
          ${NEW3D_CONTATO.email}
        </a>
        <a href="https://instagram.com/${NEW3D_CONTATO.instagram}" target="_blank" rel="noopener" class="footer-contact-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1"/></svg>
          @${NEW3D_CONTATO.instagram}
        </a>
        <a href="${waLink}" target="_blank" rel="noopener" class="footer-contact-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 20l1.3-4.2A8 8 0 1 1 8.4 19L4 20Z"/><path d="M8.5 9.3c0 3.4 2.8 6.2 6.2 6.2"/></svg>
          ${NEW3D_CONTATO.whatsappDisplay}
        </a>
      </div>
    </div>
  `;
}

function showToast(msg) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function initPage(active) {
  renderHeader(active);
  renderFooter();
  initAccessibilityPanel();
}
