var productContainer = document.querySelector(".product-details .container");
var products = [];
var params = new URLSearchParams(window.location.search);
var productId = parseInt(params.get("id"));
var cart = JSON.parse(localStorage.getItem("cart")) || [];

fetch("../products.json")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    var product = products.find((product) => product.id == productId);
    if (!product) {
      productContainer.innerHTML = `<div class="not-found">
      <h1>Product not found</h1>
      <p>Sorry, the product you are looking for does not exist.</p>
      <a href="index.html">Back to Home</a>
      </div>`;
      return;
    }
    productContainer.innerHTML = `
     <div class="product">
                <div class="image-container">
                   
                    <div class="slider-images">
                    ${product.images
                      .map((image) => {
                        return `<img src=".${image}" alt="slider image" class="slider-image">`;
                      })
                      .join("")}
                    </div>
                    <div class="main-image">
                        <img src=".${
                          product.images[0]
                        }" alt="product image" id="main-image">
                    </div>
                </div>

                <div class="product-info">
                   <div class="product-header">
                    <h1 class="product-name">${product.name}</h1>
                    <p class="product-description">${product.description}</p>
                   </div>
                    <div class="product-footer">
                        <div class="product-rating-price">
                            <div class="product-rating">
                               <span>${product.rating}</span>
                               <i class="fa-solid fa-star fa-2x"></i> 
                            </div>
                            <div class="product-price">
                                <span>${product.price}</span>
                                <span>ج.م</span>
                             </div>
                        </div>
                        <div class="product-cart">
                            <div>
                                <span>حدد الكميه</span>
                               <span class="update-cart">
                                <button class="add-btn">+</button>
                                <span class="cart-number">1</span>
                                <button class="remove-btn">-</button>
                               </span>
                            </div>
                            <button class="add-to-cart" onclick="addToCart(${
                              product.id
                            })">
                                اضف للسله
                                <i class="fa-solid fa-cart-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
        </div>`;
        addToCart(product.id);
    const item = cart.find((i) => i.id === product.id);
    document.querySelector(".cart-number").innerHTML = item ? item.amount : 1;
    changeAmount(product.id);
    changeImage();
  })
  .catch((error) => console.error("Error fetching products:", error));

function changeImage() {
  var images = document.querySelectorAll(".slider-image");
  var mainImage = document.querySelectorAll("#main-image");
  images.forEach((image) => {
    image.addEventListener("click", (e) => {
      images.forEach((img) => img.classList.remove("active"));
      e.target.classList.add("active");
      mainImage[0].src = e.target.src;
    });
  });
}

function changeAmount(id) {
  const increment = document.querySelector(".add-btn");
  const decrement = document.querySelector(".remove-btn");
  const amountDisplay = document.querySelector(".cart-number");

  increment.addEventListener("click", () => {
    const item = cart.find((i) => i.id === id);
    if (item) {
      item.amount += 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      amountDisplay.innerHTML = item.amount;
    }
  });

  decrement.addEventListener("click", () => {
    const item = cart.find((i) => i.id === id);
    if (item && item.amount > 1) {
      item.amount -= 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      amountDisplay.innerHTML = item.amount;
    }
  });
}

function addToCart(id) {
  var product = products.find((p) => p.id === id);
  var existing = cart.find((item) => item.id === id);

  if (!existing) {
    cart.push({
      ...product,
      amount: 1,
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    document.querySelector(".cart-number").innerHTML = 1;
  }
}
