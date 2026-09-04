/* Painel de acessibilidade — aba fixa na lateral que abre um menu com
   opções de leitura, semelhante ao encontrado em sites como gov.br. */

const A11Y_KEY = "new3d_a11y";

const A11Y_DEFAULTS = {
  fontSize: 0,        // 0 = normal, 1 = +1, 2 = +2
  contraste: false,
  escalaCinza: false,
  sublinharLinks: false,
  fonteLegivel: false,
};

function getA11ySettings() {
  return { ...A11Y_DEFAULTS, ...JSON.parse(localStorage.getItem(A11Y_KEY) || "{}") };
}

function saveA11ySettings(settings) {
  localStorage.setItem(A11Y_KEY, JSON.stringify(settings));
}

function applyA11ySettings(settings) {
  const root = document.documentElement;
  root.classList.remove("a11y-font-plus1", "a11y-font-plus2");
  if (settings.fontSize === 1) root.classList.add("a11y-font-plus1");
  if (settings.fontSize === 2) root.classList.add("a11y-font-plus2");

  root.classList.toggle("a11y-contrast", settings.contraste);
  root.classList.toggle("a11y-grayscale", settings.escalaCinza);
  root.classList.toggle("a11y-underline", settings.sublinharLinks);
  root.classList.toggle("a11y-readable", settings.fonteLegivel);
}

function initAccessibilityPanel() {
  const settings = getA11ySettings();
  applyA11ySettings(settings);

  const root = document.getElementById("a11y-root");
  if (!root) return;

  root.innerHTML = `
    <button class="a11y-tab" id="a11yTabBtn" aria-haspopup="true" aria-expanded="false">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="5" r="2"/><path d="M4 9c3 1.5 13 1.5 16 0M12 9v5l-3 7M12 14l3 7"/></svg>
      Acessibilidade
    </button>
    <div class="a11y-overlay" id="a11yOverlay"></div>
    <aside class="a11y-panel" id="a11yPanel" role="dialog" aria-label="Menu de acessibilidade">
      <div class="a11y-panel-head">
        <h2>Acessibilidade</h2>
        <button id="a11yCloseBtn" aria-label="Fechar menu de acessibilidade">&times;</button>
      </div>
      <p class="desc">Ajuste a exibição do site para melhorar sua experiência de leitura e navegação.</p>

      <div class="a11y-group">
        <h3>Tamanho do texto</h3>
        <button class="a11y-option" data-action="font-normal" aria-pressed="${settings.fontSize === 0}">Tamanho padrão <span class="chk"></span></button>
        <button class="a11y-option" data-action="font-plus1" aria-pressed="${settings.fontSize === 1}">Aumentar texto <span class="chk"></span></button>
        <button class="a11y-option" data-action="font-plus2" aria-pressed="${settings.fontSize === 2}">Aumentar mais <span class="chk"></span></button>
      </div>

      <div class="a11y-group">
        <h3>Exibição</h3>
        <button class="a11y-option" data-action="contraste" aria-pressed="${settings.contraste}">Alto contraste <span class="chk"></span></button>
        <button class="a11y-option" data-action="grayscale" aria-pressed="${settings.escalaCinza}">Escala de cinza <span class="chk"></span></button>
        <button class="a11y-option" data-action="underline" aria-pressed="${settings.sublinharLinks}">Sublinhar links <span class="chk"></span></button>
        <button class="a11y-option" data-action="readable" aria-pressed="${settings.fonteLegivel}">Fonte de leitura facilitada <span class="chk"></span></button>
      </div>

      <button class="btn btn-outline btn-block" id="a11yResetBtn">Restaurar padrão</button>
    </aside>
  `;

  const panel = document.getElementById("a11yPanel");
  const overlay = document.getElementById("a11yOverlay");
  const tabBtn = document.getElementById("a11yTabBtn");

  function openPanel() {
    panel.classList.add("open");
    overlay.classList.add("open");
    tabBtn.setAttribute("aria-expanded", "true");
  }
  function closePanel() {
    panel.classList.remove("open");
    overlay.classList.remove("open");
    tabBtn.setAttribute("aria-expanded", "false");
  }

  tabBtn.addEventListener("click", openPanel);
  overlay.addEventListener("click", closePanel);
  document.getElementById("a11yCloseBtn").addEventListener("click", closePanel);

  root.querySelectorAll(".a11y-option").forEach((btn) => {
    btn.addEventListener("click", () => {
      const current = getA11ySettings();
      const action = btn.dataset.action;
      if (action === "font-normal") current.fontSize = 0;
      if (action === "font-plus1") current.fontSize = current.fontSize === 1 ? 0 : 1;
      if (action === "font-plus2") current.fontSize = current.fontSize === 2 ? 0 : 2;
      if (action === "contraste") current.contraste = !current.contraste;
      if (action === "grayscale") current.escalaCinza = !current.escalaCinza;
      if (action === "underline") current.sublinharLinks = !current.sublinharLinks;
      if (action === "readable") current.fonteLegivel = !current.fonteLegivel;
      saveA11ySettings(current);
      applyA11ySettings(current);
      initAccessibilityPanel(); // re-render para atualizar estados aria-pressed
      document.getElementById("a11yPanel").classList.add("open");
      document.getElementById("a11yOverlay").classList.add("open");
    });
  });

  document.getElementById("a11yResetBtn").addEventListener("click", () => {
    saveA11ySettings({ ...A11Y_DEFAULTS });
    applyA11ySettings({ ...A11Y_DEFAULTS });
    initAccessibilityPanel();
    document.getElementById("a11yPanel").classList.add("open");
    document.getElementById("a11yOverlay").classList.add("open");
  });
}

/* Aplica as configurações salvas assim que possível, antes mesmo do painel
   ser construído, para evitar "flash" de conteúdo sem o estilo aplicado. */
applyA11ySettings(getA11ySettings());
