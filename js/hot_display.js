var xhr = new XMLHttpRequest();
console.log(xhr);
xhr.open("GET", "products.json", true);
console.log(xhr);
xhr.send();
console.log(xhr);

var cart = JSON.parse(localStorage.getItem("cart")) || [];

xhr.onload = function () {
    if (this.readyState === 4 && this.status === 200) {
        console.log(this.responseText);
        var products = JSON.parse(this.responseText);
        var collectionContainer = document.getElementById("collection");

        collectionContainer.innerHTML = "";


        var staticCollectionHtml = `
            <div class="content">
                <img src="${products[0].images[0]}" alt="img" />
                <div class="img-content">
                <p>${products[0].name} Collection</p>
                <button><a href="#sellers">SHOP NOW</a></button>
                </div>
            </div>
        `;
        collectionContainer.innerHTML += staticCollectionHtml;

        for (var i = 0; i < 3; i++) { 
            var collectionHtml = `
               
                    <div class="content">
                        <img src="${products[i].images[0]}" alt="img" />
                        <div class="img-content">
                            <p>${products[i].name} Collection</p>
                            <button><a href="#sellers">SHOP NOW</a></button>
                        </div>
                    </div>
                
            `;
            collectionContainer.innerHTML += collectionHtml;
        }
    }
};
function addCart(products) {
    document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", function () {
            var index = this.getAttribute("data-index");
            cart.push(products[index]); 
            localStorage.setItem("cart", JSON.stringify(cart)); 
            console.log("🛒 السلة:", cart);
            alert(`${products[index].name} تمت إضافته إلى السلة!`);
        });
    });
}