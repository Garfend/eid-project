var xhr = new XMLHttpRequest();
console.log(xhr);
xhr.open("GET", "products.json", true);
console.log(xhr);
xhr.send();
console.log(xhr);

var cart = JSON.parse(localStorage.getItem("cart")) ||[];  


xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        console.log(this.responseText);
        var container = document.getElementById("products-container");
        var products = JSON.parse(this.responseText);
        console.log(products);

        container.innerHTML = "";
        
        for (var i = 0; i < products.length; i++) {
            var productHtml = `
                <div class="product-card">
                    <h2>${products[i].name}</h2>
                    <p><strong>الوصف:</strong> ${products[i].description}</p>
                    <p><strong>الفئة:</strong> ${products[i].category}</p>
                    <p><strong>التقييم:</strong> ${products[i].rating}</p>
                    <p><strong>السعر:</strong> ${products[i].price} جنيه</p>
                    <div class="images">
                        <img src="${products[i].images[0]}" alt="${products[i].name}" />

                    </div>
                    <button class="add-to-cart" data-index="${i}">🛒 أضف إلى السلة</button>
                </div>
            `;
            container.innerHTML += productHtml;
        }

        
        addCart(products);
    }
};


function addCart(products) {
    document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", function () {
            var index = this.getAttribute("data-index"); 
            cart.push(products[index]); // Add product to cart 
            localStorage.setItem("cart", JSON.stringify(cart)); // Add product to local storege
            console.log("🛒 السلة:", cart);
            alert(`${products[index].name} تمت إضافته إلى السلة!`);
        });
    });
}

