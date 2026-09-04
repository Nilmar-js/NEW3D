/* Autenticação simples para fins didáticos.
   IMPORTANTE: isto é um projeto escolar. Senhas ficam salvas em texto puro no
   localStorage do navegador — nunca faça isso em um site real. Um site de
   verdade precisa de um backend com hash de senha (bcrypt/argon2) e um banco
   de dados seguro. */

const USERS_KEY = "new3d_users";
const SESSION_KEY = "new3d_session";

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function registerUser({ nome, email, senha }) {
  const users = getUsers();
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return { ok: false, msg: "Já existe uma conta com esse e-mail." };
  }
  users.push({ nome, email, senha, criadoEm: new Date().toISOString() });
  saveUsers(users);
  return { ok: true };
}

function loginUser({ email, senha }) {
  const users = getUsers();
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.senha === senha
  );
  if (!user) return { ok: false, msg: "E-mail ou senha incorretos." };
  localStorage.setItem(SESSION_KEY, JSON.stringify({ email: user.email, nome: user.nome }));
  return { ok: true };
}

function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
}
