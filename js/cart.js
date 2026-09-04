const CART_KEY = "new3d_cart";
const ORDERS_KEY = "new3d_orders";

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/* item: { id, qtd, personalizacao } */
function addToCart(id, qtd, personalizacao) {
  const cart = getCart();
  const existing = cart.find((i) => i.id === id && (i.personalizacao || "") === (personalizacao || ""));
  if (existing) {
    existing.qtd += qtd;
  } else {
    cart.push({ id, qtd, personalizacao: personalizacao || "" });
  }
  saveCart(cart);
}

function updateCartQty(index, qtd) {
  const cart = getCart();
  if (!cart[index]) return;
  cart[index].qtd = Math.max(1, qtd);
  saveCart(cart);
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
}

function clearCart() {
  saveCart([]);
}

function getCartWithDetails() {
  return getCart()
    .map((item, index) => {
      const produto = getProdutoPorId(item.id);
      if (!produto) return null;
      return { ...item, index, produto, subtotal: produto.preco * item.qtd };
    })
    .filter(Boolean);
}

function getCartTotal() {
  return getCartWithDetails().reduce((sum, i) => sum + i.subtotal, 0);
}

function getCartCount() {
  return getCart().reduce((sum, i) => sum + i.qtd, 0);
}

/* Pedidos (histórico), agrupados por e-mail do usuário */
function getOrders(email) {
  const all = JSON.parse(localStorage.getItem(ORDERS_KEY) || "{}");
  return all[email] || [];
}

function saveOrder(email, order) {
  const all = JSON.parse(localStorage.getItem(ORDERS_KEY) || "{}");
  if (!all[email]) all[email] = [];
  all[email].unshift(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(all));
}

function formatBRL(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
