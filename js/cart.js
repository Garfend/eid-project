
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

async function loadProducts() {
  const res = await fetch("data/products.json");
  return await res.json();
}

async function renderCart() {
  const user = getCurrentUser();
  if (!user) return;

  const products = await loadProducts();
  const cartContainer = document.querySelector(".cart-items");
  cartContainer.innerHTML = "";

  if (!user.cart || user.cart.length === 0) {
    cartContainer.innerHTML = "<p>🛒 السلة فارغة</p>";
    return;
  }

  let total = 0;
  let count = 0;

  user.cart.forEach(id => {
    const product = products.find(p => p.id === id);
    if (!product) return;

    total += product.price;
    count += 1;

    const item = document.createElement("div");
    item.classList.add("cart-item");
    item.innerHTML = `
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p><strong>السعر:</strong> $${product.price}</p>
      <button onclick="removeFromCart(${product.id})">🗑️ حذف</button>
      <hr>
    `;
    cartContainer.appendChild(item);
  });

  const summary = document.createElement("div");
  summary.classList.add("cart-summary");
  summary.innerHTML = `
    <h3>🧾 ملخص السلة</h3>
    <p>عدد المنتجات: ${count}</p>
    <p>الإجمالي: $${total.toFixed(2)}</p>
    <button onclick="checkout()">💳 إنهاء الشراء</button>
  `;
  cartContainer.appendChild(summary);
}

function removeFromCart(productId) {
  const user = getCurrentUser();
  if (!user) return;

  user.cart = user.cart.filter(id => id !== productId);
  setCurrentUser(user);

  const users = getUsers().map(u => u.id === user.id ? user : u);
  saveUsers(users);

  renderCart();
}

function setCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

function checkout() {
  alert("🎉 شكراً لتسوقك معنا! لقد تم إنهاء الشراء بنجاح.");
  const user = getCurrentUser();
  user.cart = [];
  setCurrentUser(user);

  const users = getUsers().map(u => u.id === user.id ? user : u);
  saveUsers(users);

  renderCart();
}

window.onload = renderCart;
