// Function to filter products based on search input
document.getElementById('search').addEventListener('keyup', function() {
    var input = this.value.toLowerCase();
    var products = document.querySelectorAll('.products li');

    products.forEach(function(product) {
        var productName = product.querySelector('.product_bottom p').textContent.toLowerCase();
        if (productName.includes(input)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
});

// click to search
const search_button = document.getElementById('serch_bar')
const search_input = document.getElementById('search_mobile')
search_button.addEventListener('click', () => {
    search_input.style.display = "block"
})

// click to view menu
const mobile_button = document.getElementById('filter');
const menu = document.getElementById('mobile_view');
const  overlay = document.getElementById('overlay')
mobile_button.addEventListener("click", ()=>{  
    if (menu.style.display === "none"){
        menu.style.display = "block"
        mobile_button.innerText = "Hide"
        overlay.style.display = "block"
        overlay.addEventListener("click", () => {
            menu.style.display = "none"
            mobile_button.innerText = "Filter"
            overlay.style.display = "none"
        })

    }else{
        menu.style.display = "none"
        mobile_button.innerText = "Filter"
        overlay.style.display = "none"
    }
})

// mobile search
document.getElementById('search_mobile').addEventListener('keyup', function() {
    var input = this.value.toLowerCase();
    var products = document.querySelectorAll('.products li');

    products.forEach(function(product) {
        var productName = product.querySelector('.product_bottom p').textContent.toLowerCase();
        if (productName.includes(input)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
});

// the products fetched can be only display on live servers (vscode live server,http-server,python -m http.server)
// due to the way web browsers handle requests for local files
const productlist = document.getElementById("product_list");
window.addEventListener("load", function() {
    fetch('js/products.json').then(response => {
        if (!response.ok) {
            throw new Error('Error in network response');
        }
        return response.json();
    }).then(data => {
        const listitems = data.products.map(product => {
            const listitem = document.createElement("li");
            listitem.innerHTML = `<div class="product_top" style="background-image:url(${product.image});">
                                        <div class="top">
                                            <span class="offer">${product.offer}%</span>
                                            <img src="images/Vector (8).svg" alt="images"/>
                                        </div>
                                        <div class="select">
                                            <span class="orange"></span>
                                            <span class="white"></span>
                                        </div>
                                        <span class="organic">
                                            <img src="images/organic.svg" alt="image"/>
                                            ORGANIC
                                        </span>
                                    </div>
                                    <div class="product_bottom">
                                        <p>${product.name}</p>
                                        <span class="rating">
                                            <img src="${product.star}" alt="star"/>
                                            <small>${product.rating}</small>
                                        </span>
                                        <span class="price">
                                            <h3>$${product.price}</h3>
                                            <del>$${product.deleted_price}</del>
                                        </span>
                                        <span class="stock">
                                            <span class="cart"><img src="images/cart white.svg" alt="image"/></span>
                                            <small class="instock">IN STOCK</small>
                                        </span>
                                    </div>`;
            return listitem;
        });
        productlist.append(...listitems);
    })
    .catch(error => {
        console.log("Error:", error);
    });
});