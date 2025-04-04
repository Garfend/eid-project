// js/cart.js

const cartContainer = document.querySelector(".cart-container");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  if (cart.length === 0) {
    cartContainer.innerHTML = "<h2>السلة فارغة 🛍️</h2>";
    return;
  }
  console.log(cart);

  cartContainer.innerHTML = cart
    .map(
      (item) => `
    <div class="cart-item">
      <img src=".${item.images[0]}" alt="${item.name}" width="100">
      <div class="item-info">
        <div>
        <h3>${item.name}</h3>
        <p>السعر: ${item.price} ج.م</p>
        </div>
         <div>
            <span>حدد الكميه</span>
            <span class="update-cart">
            <button class="add-btn" data-id="${item.id}">+</button>
            <span class="cart-number" data-id="${item.id}">${item.amount}</span>
            <button class="remove-btn" data-id="${item.id}">-</button>
            </span>
        </div>
       <div>
        <p class="total-price">الإجمالي: ${new Intl.NumberFormat(
          "ar-EG"
        ).format(item.price * item.amount)} ج.م</p>
        </div>
        <button onclick="removeFromCart(${item.id})" class="remove-from-cart">
        حذف 
        <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  `
    )
    .join("");

  const total = cart.reduce((sum, item) => sum + item.price * item.amount, 0);
  cartContainer.innerHTML += `<h2>الإجمالي الكلي: ${new Intl.NumberFormat(
    "ar-EG"
  ).format(total)} ج.م</h2>`;
  changeAmount();
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function changeAmount() {
  const incrementBtns = document.querySelectorAll(".add-btn");
  const decrementBtns = document.querySelectorAll(".remove-btn");

  incrementBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      updateAmount(id, "increment");
    });
  });

  decrementBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      updateAmount(id, "decrement");
    });
  });
}

function updateAmount(id, action) {
  const item = cart.find((i) => i.id === id);
  if (!item) return;

  if (action === "increment") {
    item.amount += 1;
  } else if (action === "decrement" && item.amount > 1) {
    item.amount -= 1;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  changeAmount();
}

renderCart();
changeAmount();
