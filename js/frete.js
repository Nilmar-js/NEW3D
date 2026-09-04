/* New3D — Cálculo de frete fictício, só de fachada (não é integrado com nenhuma
   transportadora de verdade). O resultado é sempre o mesmo pro mesmo CEP digitado. */

function _hashTexto(txt) {
  let h = 0;
  for (let i = 0; i < txt.length; i++) h = (h * 31 + txt.charCodeAt(i)) >>> 0;
  return h;
}

function calcularFreteFicticio(cep) {
  const h = _hashTexto(cep.replace(/\D/g, "") || cep);
  const gratis = h % 5 === 0; // ~1 em cada 5 CEPs cai em frete grátis, só de exemplo
  const dias = 3 + (h % 9); // entre 3 e 11 dias úteis
  const valor = gratis ? 0 : 12.9 + (h % 22); // entre R$12,90 e R$34,90
  return { gratis, dias, valor };
}

function initFreteWidget(root) {
  if (!root) return;
  root.innerHTML = `
    <div class="frete-widget">
      <label for="freteCep">Calcular frete e prazo</label>
      <div class="frete-row">
        <input type="text" id="freteCep" inputmode="numeric" maxlength="9" placeholder="Digite seu CEP">
        <button type="button" class="btn btn-outline btn-sm" id="freteBtn">Calcular</button>
      </div>
      <div class="frete-result" id="freteResult"></div>
      <a href="https://buscacepinter.correios.com.br/app/endereco/index.php" target="_blank" rel="noopener" class="frete-link">Não sei meu CEP</a>
    </div>
  `;

  const calcular = () => {
    const cep = document.getElementById("freteCep").value.trim();
    const resultEl = document.getElementById("freteResult");
    if (!cep) {
      resultEl.innerHTML = `<p class="frete-erro">Digite um CEP válido pra calcular.</p>`;
      return;
    }
    const { gratis, dias, valor } = calcularFreteFicticio(cep);
    resultEl.innerHTML = `
      <div class="frete-option">
        <span>Entrega pra ${cep}</span>
        <strong>${gratis ? "Grátis" : formatBRL(valor)}</strong>
      </div>
      <p class="frete-prazo">Chega em até ${dias} dias úteis</p>
    `;
  };

  document.getElementById("freteBtn").addEventListener("click", calcular);
  document.getElementById("freteCep").addEventListener("keydown", (e) => {
    if (e.key === "Enter") calcular();
  });
}
