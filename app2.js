const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-btn");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");




let cart = [];

class Products{
async getProducts(){
    try{
        let result = await fetch('products.json')
        let data =  await result.json();
        let products = data.items;
        products = products.map(item =>{
            const {title,price} = item.fields;
            const {id} = item.sys
            const image = item.fields.image.fields.file.url;
            return {title,price,id,image}
        })
        return products;
    } catch (error){
            console.log(error);
    }

}
}

class UI {
    displayProducts(products){
        let result = '';
        products.forEach(product => {
            result +=`
            <article class="product">
            <div class="img-container">
                <img src=${product.image} alt="product" class="product-img">
                <button class="bag-btn" data-id=${product.id}>
                    <i class="fas fa-shopping-cart"></i>
                    add to bag
                </button>
            </div>
            <h3>${product.title}</h3>
            <h4>${product.price}</h4>
        </article>
            `;
        });
        productsDOM.innerHTML = result;
    }
    getBagButtons(){
        const buttons =[...document .querrySelectorAll(".bag-btn")];
        buttons.forEach(button =>{
            let id=button.dataset.id;
            let incart = cart.find(item => item.id === id);
            if(incart){
                button.innerText = "In Cart";
                button.disable=true;
            }
            else{
                button.addEventListener('clicks',(event)=>{
                    event.target.innerText = "In Cart";
                    event.target.disabled = true;
                });
            }
        });
    }
}

class Storage{
    static saveProducts(products){
        localStorage.setItem("products",JSON.stringify(products));
    }
}

document.addEventListener("DOMContentLoaded",()=>{
const ui = new UI();
const products = new products();

products.getProducts().then(products => {
    ui.displayProducts(products);
Storage.saveProducts(products);
}).then(()=>{
    ui.getBagButtons();
});
});