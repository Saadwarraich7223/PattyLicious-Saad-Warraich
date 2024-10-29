/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

/*Show Nav Function*/
navToggle.addEventListener("click", function () {
  navMenu.classList.add("show-menu");
});
navClose.addEventListener("click", function () {
  navMenu.classList.remove("show-menu");
});

/*=============== REMOVE MENU MOBILE ===============*/

/* NOTE: nigga you have to convet variable into an array to make foreach method work because its only work on objects or arrays */
const arrayLike = document.querySelectorAll(".nav-link");
const arr = Array.from(arrayLike);

arr.forEach((i) => {
  i.addEventListener("click", function () {
    navMenu.classList.remove("show-menu");
  });
});

/*================ ADD SHADOW HEADER ===============*/

const shadowHeader = () => {
  const header = document.getElementById("header");
  this.scrollY >= 50
    ? header.classList.add("shadow-header")
    : header.classList.remove("shadow-header");
};
window.addEventListener("scroll", shadowHeader);
/*=============== SHOW SCROLL UP ===============*/
const scrolUp = () => {
  const arrowUp = document.getElementById("scrol-up");
  this.scrollY >= 350
    ? arrowUp.classList.add("show-scroll")
    : arrowUp.classList.remove("show-scroll");
};
window.addEventListener("scroll", scrolUp);
/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const section = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollDown = window.scrollY;
  section.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id"),
      sectionClass = document.querySelector(
        ".nav-menu a[href*=" + sectionId + "]"
      );

    if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
      sectionClass.classList.add("active-link");
    } else {
      sectionClass.classList.remove("active-link");
    }
  });
};
window.addEventListener("scroll", scrollActive);
/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 300,
});
sr.reveal(`.home-data , .footer`);
sr.reveal(`.home-dish`, { delay: 500, distance: "100px", origin: "bottom" });
sr.reveal(`.home-burger`, { delay: 1200, distance: "100px", duration: 1500 });
sr.reveal(`.home-ingredient`, { delay: 1600, interval: 100 });
sr.reveal(`.recipe-img , .delivery-img , .contact-img`, { origin: "left" });
sr.reveal(`.recipe-data , .delivery-data , .contact-data`, { origin: "right" });
sr.reveal(`.cart`, { interval: 100 });
sr.reveal(`.popular-container`, { interval: 100, delay: 500 });

/*================ Add-To-Cart ===============*/
/*----------------Main-Array------------------ */
const arrProducts = [
  {
    id: 1,
    name: "Chicken ",
    sbname: "Burger",
    image: "img/popular-burger-chicken.png",
    price: 6,
  },
  {
    id: 2,
    name: "Meat ",
    sbname: "Burger",
    image: "img/popular-burger-meat.png",
    price: 10,
  },
  {
    id: 3,
    name: "Grill ",
    sbname: "Burger",
    image: "img/popular-burger-grill.png",
    price: 12,
  },
  {
    id: 4,
    name: "Classic ",
    sbname: "Burger",
    image: "img/popular-burger-classic.png",
    price: 8,
  },
  {
    id: 5,
    name: "Barbeque ",
    sbname: "Burger",
    image: "img/popular-burger-big.png",
    price: 15,
  },
];
/*--------------Variables for cart ----------------- */
const wrapper = document.getElementById("popular-container");
const popularCard = document.getElementById("popular-card");
const addBtn = document.getElementById("add-cart-btn");
const closeBtn = document.getElementById("cart-btn-close");
const cartCard = document.getElementById("cart-card");
const cartData = document.getElementById("cart-card--data");
let cartQuantity = document.querySelector(".products-quantity");
let total = document.querySelector(".cart-btn-total");
let checkOutList = [];

/*----------------functions for buttons-------- */
addBtn.addEventListener("click", function () {
  cartCard.classList.toggle("cart-card-active");
});
closeBtn.addEventListener("click", function () {
  cartCard.classList.toggle("cart-card-active");
});

/*-------function to show products on document------ */
function ShowProducts() {
  arrProducts.forEach((item, key) => {
    let div = document.createElement("article");
    div.classList.add("popular-card");
    div.classList.add("popular-card-all");

    div.innerHTML = `<img
              src="${item.image}"
              alt=""
              class="popular-img"
            /> <div class="popular-title-price"> <h2 class="popular-title">
              ${item.name} <br />
              Burger
            </h2><span class="popular-price">$${item.price}</span></div>  <button class="popular-button" onclick ="addToCart(${key})">Add to cart
            </button>`;
    wrapper.appendChild(div);
  });
}
ShowProducts();

/*-------------------Add to cart Function----------------- */
function addToCart(id) {
  if (checkOutList[id] == null) {
    checkOutList[id] = arrProducts[id];
    checkOutList[id].cartQuantity = 1;
  } else {
    checkOutList[id].cartQuantity += 1;
  }
  reloadCart();
}
function reloadCart() {
  cartData.innerHTML = "";
  let count = 0;
  let totalPrice = 0;
  checkOutList.forEach((item, key) => {
    totalPrice += parseInt(item.price * item.cartQuantity);
    count += item.cartQuantity;
    let li = document.createElement("li");
    li.classList.add("cart-data-li");
    li.innerHTML = `<div class='li-img'><img
              src="${item.image}"
              alt=""
              class="cart-img"
            /><div>${item.name}</div></div>
          <div class='li-price'>${
            item.price
          } <span>$</span></div><div class="li-btns"><span onclick="changeQuantity(${key},${
      item.cartQuantity - 1
    })">-</span><div class="li-count">${
      item.cartQuantity
    }</div><span onclick="changeQuantity(${key},${
      item.cartQuantity + 1
    })">+</span></div> `;

    cartData.appendChild(li);
  });
  total.innerHTML = `<span class="cart-total"> (items ${count}) ${totalPrice}$</span>`;
  cartQuantity.innerHTML = count;
}
function changeQuantity(key, cartQuantity) {
  if (cartQuantity == 0) {
    delete checkOutList[key];
  } else {
    checkOutList[key].cartQuantity = cartQuantity;
  }
  reloadCart();
}
