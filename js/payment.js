/* New3D — Pagamento fictício (Pix ou cartão) usado só pra dar a opção no checkout.
   Nada aqui processa pagamento de verdade: é só uma simulação pro projeto escolar. */

const NEW3D_PIX_CHAVE = "62984738740"; // chave pix fictícia da loja (telefone)

/* Gera um "QR code" visual (não é um QR de verdade, só decorativo) a partir de um texto,
   sempre com o mesmo padrão pro mesmo texto. */
function _fakeQRSVG(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const size = 11;
  const cells = [];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      h = (h * 1103515245 + 12345) >>> 0;
      const isFinder =
        (x < 3 && y < 3) || (x > size - 4 && y < 3) || (x < 3 && y > size - 4);
      const on = isFinder ? (x === 1 && y === 1 ? true : (x + y) % 3 !== 0) : (h >> 3) % 2 === 0;
      if (on) cells.push(`<rect x="${x}" y="${y}" width="1" height="1"/>`);
    }
  }
  return `<svg viewBox="0 0 ${size} ${size}" class="fake-qr" fill="#0f1113">
    <rect x="0" y="0" width="${size}" height="${size}" fill="#eceef0"/>
    ${cells.join("")}
  </svg>`;
}

/* Monta a mensagem do pedido e abre o WhatsApp da loja com tudo preenchido */
function buildWhatsappOrderMessage(order, user) {
  const linhas = [];
  linhas.push("Olá! Quero confirmar meu pedido feito no site da New 3D:");
  linhas.push("");
  order.itens.forEach((i) => {
    let linha = `• ${i.qtd}x ${i.nome} — ${formatBRL(i.preco * i.qtd)}`;
    if (i.personalizacao) linha += ` (personalização: "${i.personalizacao}")`;
    linhas.push(linha);
  });
  linhas.push("");
  linhas.push(`Total: ${formatBRL(order.total)}`);
  linhas.push(`Pagamento: ${order.pagamento.metodo === "pix" ? "Pix" : "Cartão terminado em " + (order.pagamento.detalhes.final || "----")}`);
  linhas.push(`Cliente: ${user.nome} (${user.email})`);
  return linhas.join("\n");
}

function openWhatsappOrder(order, user) {
  const msg = buildWhatsappOrderMessage(order, user);
  const url = `https://wa.me/${NEW3D_CONTATO.whatsapp}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank", "noopener");
}

/* Abre o modal de pagamento. onConfirm(info) é chamado quando o "pagamento" for concluído,
   com info = { metodo: "pix" | "cartao", detalhes } */
function openPaymentModal({ total, onConfirm }) {
  const existing = document.getElementById("paymentOverlay");
  if (existing) existing.remove();

  const overlay = document.createElement("div");
  overlay.id = "paymentOverlay";
  overlay.className = "payment-overlay";
  overlay.innerHTML = `
    <div class="payment-modal" role="dialog" aria-modal="true" aria-label="Escolher pagamento">
      <div class="payment-head">
        <h3>Finalizar pagamento</h3>
        <button type="button" class="payment-close" aria-label="Fechar">&times;</button>
      </div>
      <div class="payment-total">Total: <strong>${formatBRL(total)}</strong></div>

      <div class="payment-tabs">
        <button type="button" class="payment-tab is-active" data-tab="pix">Pix</button>
        <button type="button" class="payment-tab" data-tab="cartao">Cartão</button>
      </div>

      <div class="payment-panel" data-panel="pix">
        <div class="pix-box">
          <div class="fake-qr-wrap">${_fakeQRSVG(NEW3D_PIX_CHAVE + total)}</div>
          <p class="pix-hint">Escaneie o QR code fictício ou copie a chave Pix da New 3D abaixo:</p>
          <div class="pix-key-row">
            <code id="pixKey">${NEW3D_PIX_CHAVE}</code>
            <button type="button" class="btn btn-outline btn-sm" id="pixCopyBtn">Copiar chave</button>
          </div>
        </div>
        <button type="button" class="btn btn-primary btn-block" id="pixConfirmBtn">Já paguei</button>
        <p class="payment-note">Pagamento simulado — projeto escolar, nenhum valor real é cobrado.</p>
      </div>

      <div class="payment-panel" data-panel="cartao" hidden>
        <form id="cardForm" novalidate>
          <div class="field">
            <label for="cardNumero">Número do cartão</label>
            <input type="text" id="cardNumero" inputmode="numeric" maxlength="19" placeholder="0000 0000 0000 0000" required>
          </div>
          <div class="field">
            <label for="cardNome">Nome impresso no cartão</label>
            <input type="text" id="cardNome" placeholder="Como está no cartão" required>
          </div>
          <div class="field-row">
            <div class="field">
              <label for="cardValidade">Validade</label>
              <input type="text" id="cardValidade" maxlength="5" placeholder="MM/AA" required>
            </div>
            <div class="field">
              <label for="cardCvv">CVV</label>
              <input type="text" id="cardCvv" inputmode="numeric" maxlength="4" placeholder="123" required>
            </div>
          </div>
          <button type="submit" class="btn btn-primary btn-block">Confirmar pagamento</button>
        </form>
        <p class="payment-note">Pagamento simulado — projeto escolar, nenhum dado de cartão é validado ou salvo.</p>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const close = () => overlay.remove();
  overlay.querySelector(".payment-close").addEventListener("click", close);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });

  overlay.querySelectorAll(".payment-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      overlay.querySelectorAll(".payment-tab").forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      overlay.querySelectorAll(".payment-panel").forEach((p) => (p.hidden = p.dataset.panel !== tab.dataset.tab));
    });
  });

  overlay.querySelector("#pixCopyBtn").addEventListener("click", () => {
    navigator.clipboard?.writeText(NEW3D_PIX_CHAVE).catch(() => {});
    showToast("Chave Pix copiada");
  });

  overlay.querySelector("#pixConfirmBtn").addEventListener("click", () => {
    close();
    onConfirm({ metodo: "pix", detalhes: { chave: NEW3D_PIX_CHAVE } });
  });

  overlay.querySelector("#cardForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const numero = document.getElementById("cardNumero").value.trim();
    const nome = document.getElementById("cardNome").value.trim();
    const validade = document.getElementById("cardValidade").value.trim();
    const cvv = document.getElementById("cardCvv").value.trim();
    if (!numero || !nome || !validade || !cvv) return;
    const ultimosDigitos = numero.replace(/\D/g, "").slice(-4);
    close();
    onConfirm({ metodo: "cartao", detalhes: { nome, final: ultimosDigitos } });
  });
}
