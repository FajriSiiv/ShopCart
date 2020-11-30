const carts = document.querySelectorAll("button");

let products = [
  {
    name: "Brown-Shirt",
    tag: "bajuCokelat",
    price: 35,
    inCart: 0,
  },
  {
    name: "Black-Shirt",
    tag: "bajuHitam",
    price: 38,
    inCart: 0,
  },
  {
    name: "Yellow-Shirt",
    tag: "bajuKuning",
    price: 19,
    inCart: 0,
  },
  {
    name: "Red-Shirt",
    tag: "bajuMerah",
    price: 21,
    inCart: 0,
  },
  {
    name: "Pink-Shirt",
    tag: "bajuPink",
    price: 29,
    inCart: 0,
  },
  {
    name: "White-Shirt",
    tag: "bajuPutih",
    price: 34,
    inCart: 0,
  },
];
//Klik Pada Buy di index.html,mengabil data dari object products
for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", function () {
    cartNum(products[i]);
    totalCost(products[i]);
  });
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNum");

  if (productNumbers) {
    document.querySelector(".pesan-cart span").textContent = productNumbers;
  }
}

function cartNum(product) {
  let productNumbers = localStorage.getItem("cartNum");
  productNumbers = parseInt(productNumbers);
  if (productNumbers) {
    localStorage.setItem("cartNum", productNumbers + 1);
    document.querySelector(".pesan-cart span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNum", 1);
    document.querySelector(".pesan-cart span").textContent = 1;
  }
  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product,
    };
  }
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
  //console.log("the Product price is ", product.price);
  let cartCost = localStorage.getItem("totalCost");
  console.log("My CartCost is", cartCost);

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".products");
  let cartCost = localStorage.getItem("totalCost");

  console.log(cartItems);
  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
      <div class="product">
        <img src="${item.tag}.jpg">
        <span>${item.name}</span>
      </div>
      <div class="price">$${item.price}</div>
      <div class="quantity">
        <span>${item.inCart}</span>
      </div>
      <div class="total">
       $${item.inCart * item.price},00
      </div>
      `;
    });

    productContainer.innerHTML += `
    <div class="basketTotalContainer">
        <h4 class="basketTotalTitle">
        Basket Total :
        </h4>
        <h4 class="basketTotal">
        $ ${cartCost},00
        </h4> 
    `;
  }
}

onLoadCartNumbers();
displayCart();
