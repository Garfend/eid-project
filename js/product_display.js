
async function loadProducts() {
  const res = await fetch("data/products.json");
  const products = await res.json();
  displayProducts(products);
}

function displayProducts(products) {
  const container = document.getElementById("products-container");
  container.innerHTML = "";

  for (let i = 0; i < products.length; i++) {
    const div = document.createElement("div");
    div.innerHTML = `
                <div class="product-card">
                    <!-- Badge -->
                    <div class="badge badge-sale">خصم %25</div>
                  
                    <!-- Product Image -->
                    <img src="${products[i].images[0]}" alt="${products[i].name}" class="product-image" />
                  
                    <!-- Content -->
                    <div class="content1">
                      <div class="category">${products[i].category}</div>
                      <div class="title">${products[i].name}</div>
                      <div class="desc">${products[i].description}</div>
                  
                      <div class="price-box">
                        <span class="original-price">${(products[i].price * 1.25).toFixed(2)} جنيه</span>
                        <span class="price">${products[i].price} جنيه</span>
                      </div>
                  
                      <!-- Buttons -->
                      <div class="buttons">
                        <button class="add-to-cart" onclick="addToCart(${products[i].id})">
                          🛒 أضف للسلة
                        </button>
                      </div>
                    </div>
                </div>
    `;
    container.appendChild(div);
  }
}

function addToCart(productId) {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) {
    alert("Please log in to add items to your cart.");
    return;
  }

  if (!user.cart.includes(productId)) {
    user.cart.push(productId);
    localStorage.setItem("currentUser", JSON.stringify(user));

    const users = JSON.parse(localStorage.getItem("users")).map(u =>
      u.id === user.id ? user : u
    );
    localStorage.setItem("users", JSON.stringify(users));

    alert("✅ Added to cart!");
  } else {
    alert("🛒 Already in cart.");
  }
}

loadProducts();